import typing
import dataclasses

from . import weave_types as types
from . import infer_types
from . import decorator_class

_py_type = type


def type(__override_name: str = None):
    def wrap(target):
        dc = dataclasses.dataclass(target)
        fields = dataclasses.fields(dc)
        target_name = target.__name__
        if __override_name is not None:
            target_name = __override_name

        TargetType = _py_type(f"{target_name}Type", (types.ObjectType,), {})
        TargetType.name = target_name
        TargetType.instance_classes = target
        TargetType.instance_class = target
        TargetType.NodeMethodsClass = dc

        type_vars: dict[str, types.Type] = {}
        static_property_types: dict[str, types.Type] = {}
        for field in fields:
            if isinstance(field.type, typing.TypeVar):
                # This is a Python type variable
                type_vars[field.name] = types.Any()
            else:
                weave_type = infer_types.python_type_to_type(field.type)
                weave_type_vars = weave_type.type_vars()
                if any(
                    isinstance((getattr(weave_type, var_name)), types.Any)
                    for var_name in weave_type_vars
                ):
                    # this is a Weave type with a type variable in it
                    type_vars[field.name] = weave_type
                else:
                    static_property_types[field.name] = weave_type

        if type_vars:
            setattr(TargetType, "__annotations__", {})
        for name, default_type in type_vars.items():
            setattr(TargetType, name, default_type)
            TargetType.__dict__["__annotations__"][name] = types.Type

        def property_types_method(self):
            property_types = {}
            for name in type_vars:
                property_types[name] = getattr(self, name)
            for name, prop_type in static_property_types.items():
                property_types[name] = prop_type
            return property_types

        if target.__bases__:
            # Add the first base classes as the type base.
            # TODO: should we add all bases?
            target_base0 = target.__bases__[0]
            if hasattr(target_base0, "WeaveType"):
                TargetType._base_type = target_base0.WeaveType()

        TargetType.property_types = property_types_method
        TargetType = dataclasses.dataclass(frozen=True)(TargetType)

        dc.WeaveType = TargetType
        decorator_class.weave_class(weave_type=TargetType)(dc)
        return dc

    return wrap
