import dataclasses
import typing

import weave
from .. import weave_internal
from .. import panel
from .. import graph


ChoiceType = typing.TypeVar("ChoiceType", bound=weave.Node)


@weave.type()
class ObjectPickerConfig(typing.Generic[ChoiceType]):
    choice: ChoiceType = dataclasses.field(default_factory=graph.VoidNode)


@weave.type()
class ObjectPicker(panel.Panel):
    id = "ObjectPicker"
    config: ObjectPickerConfig = dataclasses.field(default_factory=ObjectPickerConfig)

    def __post_init__(self):
        # I originally tried to use a VarNode here. With the following comment:
        #   Set choice to a VarNode of the correct type (an item in our input
        #   list). This ensures that ObjectPickers stored in variables have a
        #   choice attribute that can be correctly dot-chained. Ie we want
        #   to maintain that the type is always correct.
        # self.config.choice = weave_internal.make_var_node(
        #     self.input_node.type.object_type, "choice"
        # )
        # That works on the Python side, but then we send the VarNode to the frontend
        # as the default value, and it sends it back down in the first execute request
        # for a panel that makes use of this panel's choice attribute.
        #
        # TODO: we probably need a way to reprent a void value that exists where a given
        # type is expected ("a hole"). A variable seems like a good way to do this.
        #
        # But a variable would mean we need to inspect objects' contents to determine
        # if something is executable. Because here we have Const nodes that contain
        # VarNodes in expressions in their values.
        if isinstance(self.config.choice, graph.VoidNode):
            self.config.choice = self.input_node[0]
