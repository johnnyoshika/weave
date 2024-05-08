from typing import Literal, Optional

from pydantic import BaseModel

Op = Literal[
    'eq',
    '!eq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in',
    '!in',
    # 'is',
    # '!is',
    # 'has',
   # '!has',
]

SortOrder = Literal[
    "asc",
    "desc",
]


Value = str | float | list[str] | list[float]


# class SimpleRepr(object):
#     """A mixin implementing a simple __repr__."""
#     def __repr__(self):
#         return "<{klass} @{id:x} {attrs}>".format(
#             klass=self.__class__.__name__,
#             id=id(self) & 0xFFFFFF,
#             attrs=" ".join("{}={!r}".format(k, v) for k, v in self.__dict__.items()),
#             )


class Filter(BaseModel):
    # TODO: Terminology. key? instead of field?
    field: str
    op: Op
    value: Value

    # def __init__(self, field: str, op: Op, value: Value):
    #     self.field = field
    #     self.op = op
    #     self.value = value

    def __str__(self) -> str:
        return f"{self.field}~{self.op}~{')'.join(self.value)}"

    # def __eq__(self, other):
    #     if not isinstance(other, Filter):
    #         # don't attempt to compare against unrelated types
    #         return NotImplemented

    #     # TODO: Should we ignore order when comparing lists?
    #     return (self.field == other.field) and (self.op == other.op) and (self.value == other.value)

    def to_sql(self) -> str:
        if self.op in ('eq', '!eq'):
            return f"{self.field} {'=' if self.op == 'eq' else '!='} {self.value}\n"
        elif self.op in ('lt', 'lte', 'gt', 'gte'):
            return f"{self.field} {self.op} {self.value}\n"
        elif self.op in ('in', '!in'):
            return f"{self.field} {'IN' if self.op == 'in' else 'NOT IN'} ({', '.join(self.value)})\n"

    @staticmethod
    def parse(encoded: str) -> 'Filter':
        pieces = encoded.split('~')
        if len(pieces) != 3:
            raise ValueError(f'Filter has wrong number of parts: {encoded}')
        if pieces[1] not in ('eq', '!eq', 'lt', 'lte', 'gt', 'gte', 'in', '!in'):
            raise ValueError(f'Filter has invalid op: {pieces[1]}')
        field, op, val = pieces
        if op in ('eq', '!eq'):
            value = val
        elif op in ('lt', 'lte', 'gt', 'gte'):
            value = val
        elif op in ('in', '!in'):
            value = val.split(')')
        return Filter(field, op, value)



class SortClause(BaseModel):
    field: str
    direction: SortOrder


class Filters:

    filters: list[Filter]

    def __init__(self, filters: Optional[list[Filter]] = None):
        self.filters = filters or []

    def __str__(self) -> str:
        return '*'.join(str(f) for f in self.filters)

    def to_sql(self) -> str:
        if not self.filters:
            return ''
        return 'WHERE ' + '\n  AND '.join(f.to_sql() for f in self.filters)

    @staticmethod
    def parse(encoded: str) -> 'Filters':
        filters = [Filter.parse(f) for f in encoded.split('*')]
        return Filters(filters)


ColumnType = Literal[
    'string',
    'datetime',
    'json',  # Represented at string in ClickHouse
]


class Column:
    name: str
    type: ColumnType
    nullable: bool
    # TODO: Description?
    # TODO: Default?

    def __init__(self, name: str, type: ColumnType, nullable: bool = False):
        self.name = name
        self.type = type
        self.nullable = nullable

    # created_at DateTime64(3) DEFAULT now64(3),

Columns = list[Column]


class Table:
    name: str
    cols: Columns

    def __init__(self, name: str, cols: Optional[Columns] = None):
        self.name = name
        self.cols = cols or []

    def select(self):
        return Select(self)

    # def add_columns(self, cols: list[Column]):
    #     self.cols.extend(cols)



def validate_field(field: str, col_types: dict[str, ColumnType]) -> bool:
    if field in col_types:
        return
    if '.' in field:
        col_name = field.split('.')[0]
        if col_name not in col_types:
            raise ValueError(f'Field {field} is unknown')
        if col_types[col_name] != 'json':
            raise ValueError(f'Field {field} is not a JSON column')
        return
    raise ValueError(f'Field {field} is unknown')


def field_expr(field: str) -> str:
    if '.' in field:
        col_name, rest = field.split('.', 1)
        return f"JSON_VALUE({col_name}, '$.{rest}')"
    return field


class Select:
    table: Table
    col_types: dict[str, ColumnType]
    _fields: list[str]
    _where: Filters
    _order_by: list[SortClause]
    _limit: Optional[int]
    _offset: Optional[int]

    def __init__(self, table: Table):
        self.table = table
        self.col_types = {c.name: c.type for c in table.cols}

        self._fields = []
        self._where = Filters()
        self._order_by = []
        self._limit = None
        self._offset = None

    def fields(self, fields: Optional[list[str]]) -> 'Select':
        if fields:
            for f in fields:
                validate_field(f, self.col_types)
        self._fields = fields
        return self

    def where(self, filters: Optional[list[Filter]]) -> 'Select':
        self._where = Filters()
        if filters:
            for f in filters:
                # TODO: We need to validate filter against table schema
                self._where.filters.append(f)
        return self

    def order_by(self, order_by: Optional[list[SortClause]]) -> 'Select':
        if order_by:
            for o in order_by:
                validate_field(o.field, self.col_types)
        self._order_by = order_by or []
        return self

    def limit(self, limit: Optional[int]) -> 'Select':
        if limit is not None and limit < 0:
            raise ValueError('Limit must be non-negative')
        self._limit = limit
        return self

    def offset(self, offset: Optional[int]) -> 'Select':
        if offset is not None and offset < 0:
            raise ValueError('Offset must be non-negative')
        self._offset = offset
        return self

    def prepare(self):
        fields = ''
        if self._fields:
            fs = [field_expr(f) for f in self._fields]
            fields = ', '.join(fs)
        else:
            fields = '*'

        sql = f"SELECT {fields}\nFROM {self.table.name}\n"

        sql += self._where.to_sql()

        if self._order_by:
            sql += 'ORDER BY ' + ', '.join(f"{field_expr(o.field)} {o.direction}" for o in self._order_by) + '\n'

        if self._limit is not None:
            sql += f"LIMIT {self._limit}\n"
        if self._offset is not None:
            sql += f"OFFSET {self._offset}\n"

        parameters = {}
        return sql, parameters
