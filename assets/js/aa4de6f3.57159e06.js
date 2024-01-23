"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[577],{5379:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>r,toc:()=>d});var a=n(5893),o=n(1151);const s={sidebar_position:2,hide_table_of_contents:!0},i="Tutorial: Build an Evaluation pipeline",r={id:"tutorial-eval",title:"Tutorial: Build an Evaluation pipeline",description:"To iterate on an application, we need a way to evaluate if it's improving. To do so, a common practice is to test it against the same dataset when there is a change. Weave has a first-class way to track evaluations with Dataset, Model & Evaluation classes. We have the built the APIs to make minimal assumptions to allow for the flexibility to support a wide array of use-cases.",source:"@site/docs/tutorial-eval.md",sourceDirName:".",slug:"/tutorial-eval",permalink:"/weave/tutorial-eval",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/tutorial-eval.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,hide_table_of_contents:!0},sidebar:"documentationSidebar",previous:{title:"Quickstart",permalink:"/weave/quickstart"},next:{title:"Weave Core Types",permalink:"/weave/guides/core-types/"}},l={},d=[{value:"Upload a <code>Dataset</code>",id:"upload-a-dataset",level:3},{value:"Build a <code>Model</code>",id:"build-a-model",level:3},{value:"Evaluate a <code>Model</code> on a <code>Dataset</code>",id:"evaluate-a-model-on-a-dataset",level:3},{value:"Pulling it all together",id:"pulling-it-all-together",level:2}];function c(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"tutorial-build-an-evaluation-pipeline",children:"Tutorial: Build an Evaluation pipeline"}),"\n",(0,a.jsxs)(t.p,{children:["To iterate on an application, we need a way to evaluate if it's improving. To do so, a common practice is to test it against the same dataset when there is a change. Weave has a first-class way to track evaluations with ",(0,a.jsx)(t.code,{children:"Dataset"}),", ",(0,a.jsx)(t.code,{children:"Model"})," & ",(0,a.jsx)(t.code,{children:"Evaluation"})," classes. We have the built the APIs to make minimal assumptions to allow for the flexibility to support a wide array of use-cases."]}),"\n",(0,a.jsxs)(t.h3,{id:"upload-a-dataset",children:["Upload a ",(0,a.jsx)(t.code,{children:"Dataset"})]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"Dataset"}),"s enable you to store examples for evaluation. Weave automatically captures when it is used and updates the version when there are changes. ",(0,a.jsx)(t.code,{children:"Dataset"}),"s are created with lists of examples, where each example row is a dict."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:"import weave\nfrom weave import weaveflow\n\nweave.init('intro-example')\ndataset = weaveflow.Dataset([\n    {'id': '0', 'sentence': 'He no like ice cream.', 'correction': 'He does not like ice cream.'},\n    {'id': '1', 'sentence': 'She goed to the store.', 'correction': 'She went to the store.'},\n    {'id': '2', 'sentence': 'They plays video games all day.', 'correction': 'They play video games all day.'}\n])\ndataset_ref = weave.publish(dataset, 'grammar')\n"})}),"\n",(0,a.jsxs)(t.p,{children:["In a new script, run this code to publish a ",(0,a.jsx)(t.code,{children:"Dataset"})," and follow the link to view it in the UI.\nIf you make edits to the ",(0,a.jsx)(t.code,{children:"Dataset"})," in the UI, you can pull the latest version in code using:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:"dataset = weave.ref('grammar').get()\n"})}),"\n",(0,a.jsx)(t.admonition,{type:"note",children:(0,a.jsxs)(t.p,{children:["Checkout the ",(0,a.jsx)(t.a,{href:"/guides/core-types/datasets",children:"Datasets"})," guide to learn more."]})}),"\n",(0,a.jsxs)(t.h3,{id:"build-a-model",children:["Build a ",(0,a.jsx)(t.code,{children:"Model"})]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"Model"}),"s store and version information about your system, such as prompts, temperatures, and more.\nLike ",(0,a.jsx)(t.code,{children:"Dataset"}),"s, Weave automatically captures when it is used and update the version when there are changes."]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"Model"}),"s are declared by subclassing ",(0,a.jsx)(t.code,{children:"Model"})," and decorating them with ",(0,a.jsx)(t.code,{children:"@weave.type()"}),". ",(0,a.jsx)(t.code,{children:"Model"})," classes also need a ",(0,a.jsx)(t.code,{children:"predict"})," function definition, which take one example and return the response."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:'from weave.weaveflow import Model\n\n@weave.type()\nclass GrammarModel(Model):\n    system_message: str\n    model_name: str = "gpt-3.5-turbo"\n\n    @weave.op()\n    async def predict(self, sentence: str) -> str:\n        from openai import OpenAI\n        client = OpenAI()\n        response = client.chat.completions.create(\n            model=self.model_name,\n            messages=[\n                {\n                    "role": "system",\n                    "content": self.system_message\n                },\n                {\n                "role": "user",\n                "content": sentence\n                }\n            ],\n            temperature=0.7,\n            max_tokens=64\n        )\n        return response.choices[0].message.content\n'})}),"\n",(0,a.jsxs)(t.p,{children:["You can instantiate ",(0,a.jsx)(t.code,{children:"@weave.type()"})," objects like this."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:"model = GrammarModel('you fix grammar')\nawait model.predict('she go to the park')\n"})}),"\n",(0,a.jsx)(t.admonition,{type:"note",children:(0,a.jsxs)(t.p,{children:["Checkout the ",(0,a.jsx)(t.a,{href:"/guides/core-types/models",children:"Models"})," guide to learn more."]})}),"\n",(0,a.jsxs)(t.h3,{id:"evaluate-a-model-on-a-dataset",children:["Evaluate a ",(0,a.jsx)(t.code,{children:"Model"})," on a ",(0,a.jsx)(t.code,{children:"Dataset"})]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"Evaluation"}),"s assess a ",(0,a.jsx)(t.code,{children:"Model"}),"s performance on a ",(0,a.jsx)(t.code,{children:"Dataset"})," using specified scoring functions.\nThe scoring functions take an example row and the resulting prediction and return a dictionary of scores for that example.\n",(0,a.jsx)(t.code,{children:"example_to_model_input"})," tells ",(0,a.jsx)(t.code,{children:"evaluate"})," how to use an input from a given example row of the ",(0,a.jsx)(t.code,{children:"Dataset"}),"."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:"from weave.weaveflow import evaluate\n\n@weave.op()\ndef score(example: dict, prediction: str) -> dict:\n    # example is a row from the Dataset, prediction is the output of predict function\n    return {'correct': example['correction'] == prediction}\n\n@weave.op()\ndef example_to_model_input(example: dict) -> str:\n    # example is a row from the Dataset, the output of this function should be the input to model.predict\n    return example[\"sentence\"]\n\nevaluation = evaluate.Evaluation(\n    dataset, scores=[score], example_to_model_input=example_to_model_input\n)\nawait evaluation.evaluate(model)\n"})}),"\n",(0,a.jsx)(t.h2,{id:"pulling-it-all-together",children:"Pulling it all together"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:"import weave\nimport asyncio\nfrom weave.weaveflow import Model, evaluate, Dataset\n\n@weave.type()\nclass GrammarModel(Model):\n    system_message: str\n    model_name: str = \"gpt-3.5-turbo\"\n\n    @weave.op()\n    async def predict(self, sentence: str) -> str:\n        from openai import OpenAI\n        client = OpenAI()\n        response = client.chat.completions.create(\n            model=self.model_name,\n            messages=[\n                {\n                    \"role\": \"system\",\n                    \"content\": self.system_message\n                },\n                {\n                    \"role\": \"user\",\n                    \"content\": sentence\n                }\n            ],\n            temperature=0.7,\n            max_tokens=64,\n            top_p=1\n        )\n        return response.choices[0].message.content\n\n@weave.op()\ndef score(example: dict, prediction: str) -> dict:\n    return {'correct': example['correction'] == prediction}\n\nweave.init('intro-example')\nmodel = GrammarModel(\"You will be provided with statements, and your task is to convert them to standard English.\")\ndataset = Dataset([\n    {'id': '0', 'sentence': 'He no like ice cream.', 'correction': 'He does not like ice cream.'},\n    {'id': '1', 'sentence': 'She goed to the store.', 'correction': 'She went to the store.'},\n    {'id': '2', 'sentence': 'They plays video games all day.', 'correction': 'They play video games all day.'}\n])\n# If you have already published the Dataset, you can run:\n# dataset = weave.ref('grammar').get()\n@weave.op()\ndef example_to_model_input(example):\n    return example[\"sentence\"]\n\nevaluation = evaluate.Evaluation(\n    dataset, scores=[score], example_to_model_input=example_to_model_input\n)\nprint(asyncio.run(evaluation.evaluate(model)))\n# if you're in a Jupyter Notebook, run:\n# await evaluation.evaluate(model))\n"})})]})}function p(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>r,a:()=>i});var a=n(7294);const o={},s=a.createContext(o);function i(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);