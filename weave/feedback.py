import json
from datetime import datetime
from typing import Any, Collection, Optional

from rich.table import Table
from rich.console import Console

from . import graph_client_context
from weave.trace_server import trace_server_interface as tsi


class CallFeedback:

    call_id: str
    project_id: str
    items: Optional[list[tsi.Feedback]] = None

    def __init__(self, call_id: str, project_id: str):
        self.call_id = call_id
        self.project_id = project_id
        self.client = graph_client_context.require_graph_client()

    def _maybe_fetch(self):
        if self.items is None:
            # TODO: Caching logic
            self.refresh()

    def refresh(self):
        # print('fetching feedback for ' + self.call_id)
        self.items = self.query()

    def __getitem__(self, index):
        self._maybe_fetch()
        return self.items[index]

    def __iter__(self):
        self._maybe_fetch()
        self.current = 0
        return self

    def __next__(self):
        if self.current < len(self.items):
            item = self.items[self.current]
            self.current += 1
            return item
        raise StopIteration

    def __len__(self):
        self._maybe_fetch()
        return len(self.items)

    def add(self, feedback_type: str, notes: Optional[str] = None, feedback_dict: dict[str, Any] = None, **kwargs):
        # This is the public API.
        # It allows specifying kwargs or a dictionary.
        # It prevents use of our prefix.
        # print('adding feedback for ' + self.call_id)
        if feedback_type.startswith('wandb.'):
            raise ValueError('Feedback type cannot start with "wandb."')
        feedback = {}
        feedback.update(feedback_dict or {})
        feedback.update(kwargs)
        return self._add(feedback_type, notes, feedback)

    def _add(self, feedback_type: str, notes: Optional[str], feedback_dict: dict[str, Any]):
        self._maybe_fetch()
        # TODO: if type starts with wandb., lookup pydantic model to validate.
        # TODO: Ensure limits on feedback size
        freq = tsi.FeedbackCreateReq(
            project_id=self.project_id,
            call_id=self.call_id,
            feedback_type=feedback_type,
            notes=notes,
            feedback=feedback_dict
        )
        response = self.client.server.feedback_create(freq)

        # Add to internal items so we don't have to refresh
        feedback = tsi.Feedback(
            **freq.dict(),
            id=response.id,
            created_at=response.created_at,
            wb_user_id=response.wb_user_id,
        )
        self.items.append(feedback)
        return response.id


    def thumbs_up(self, notes: str = ""):
        return self._add("wandb.thumbs.1", notes, {
            "value": "up",
        })

    def thumbs_down(self, notes: str = ""):
        return self._add("wandb.thumbs.1", notes, {
            "value": "down",
        })

    def query(self,
              *,
              # TODO: filters - user, date range, etc
              # TODO: sort order,
              limit: Optional[int] = None):
        # TODO:
        req = tsi.FeedbackQueryReq(
            project_id=self.project_id,
#            call_id=self.call_id,
            limit=limit,
        )
        response = self.client.server.feedback_query(req)
        print(response)
        # Response is dicts because API allows user to specify fields, but we don't
        # expose that in this Python API.
        return [tsi.Feedback(**r) for r in response.rows]

    def purge(self, feedback_id: str) -> None:
        self.client.server.feedback_purge(tsi.FeedbackPurgeReq(id=feedback_id, project_id=self.project_id))
        self.items = [f for f in self.items if f.id != feedback_id]

    def _as_rich_table(self):
        self._maybe_fetch()
        table = Table(show_header=True, header_style="bold cyan")
        table.add_column("ID")
        table.add_column("Created")
        table.add_column("Username")
        table.add_column("Type", justify="center")
        table.add_column("Notes")
        table.add_column("Feedback")
        for feedback in self:
            typ = feedback.feedback_type

            if typ == "wandb.thumbs.1":
                typ = "👍" if feedback.feedback["value"] == "up" else "👎"

            content = json.dumps(feedback.feedback, indent=2)
            table.add_row(
                feedback.id,
                str(feedback.created_at),
                feedback.wb_user_id,
                typ,
                feedback.notes,
                content,
            )
        return table

    def __str__(self):
        table = self._as_rich_table()
        console = Console()
        with console.capture() as capture:
            console.print(table)
        x = capture.get()
        return x.strip()

    def _repr_pretty_(self, p, cycle):
        """Show a nicely formatted table in ipython."""
        print()
        print(self)
