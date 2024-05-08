import os

os.environ["WF_TRACE_SERVER_URL"] = "http://127.0.0.1:6345"


import weave


weave.init('2024-05-08_callstest')

@weave.op
def say_hello(name: str):
    print(f"hi {name}")
    return name + name

say_hello('jamie')
call = next(iter(say_hello.calls()))._val

# call.feedback.add('note', wassup="wassup with you")
# call.feedback.thumbs_up()

#x = call.feedback._repr_html_()
print(call.feedback)

#x = str(call.feedback)
#print(call.feedback)
