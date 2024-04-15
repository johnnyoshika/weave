"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[128],{2214:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var i=s(5893),t=s(1151);const r={slug:"/",sidebar_position:1,hide_table_of_contents:!0},o="Introduction",a={id:"introduction",title:"Introduction",description:"Weave is a lightweight toolkit for tracking and evaluating LLM applications, built by Weights & Biases.",source:"@site/docs/introduction.md",sourceDirName:".",slug:"/",permalink:"/weave/",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/introduction.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{slug:"/",sidebar_position:1,hide_table_of_contents:!0},sidebar:"documentationSidebar",next:{title:"Quickstart",permalink:"/weave/quickstart"}},c={},l=[{value:"Key concepts",id:"key-concepts",level:2},{value:"What&#39;s next?",id:"whats-next",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"introduction",children:"Introduction"}),"\n",(0,i.jsx)(n.p,{children:"Weave is a lightweight toolkit for tracking and evaluating LLM applications, built by Weights & Biases."}),"\n",(0,i.jsx)(n.p,{children:"Our goal is to bring rigor, best-practices, and composability to the inherently experimental process of developing AI applications, without introducing cognitive overhead."}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/quickstart",children:"Get started"})," by decorating Python functions with ",(0,i.jsx)(n.code,{children:"@weave.op()"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Seriously, try the \ud83c\udf6a ",(0,i.jsx)(n.a,{href:"/quickstart",children:"quickstart"})," \ud83c\udf6a first."]}),"\n",(0,i.jsx)(n.p,{children:"You can use Weave to:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Log and debug language model inputs, outputs, and traces"}),"\n",(0,i.jsx)(n.li,{children:"Build rigorous, apples-to-apples evaluations for language model use cases"}),"\n",(0,i.jsx)(n.li,{children:"Organize all the information generated across the LLM workflow, from experimentation to evaluations to production"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"key-concepts",children:"Key concepts"}),"\n",(0,i.jsxs)(n.p,{children:["Weave's ",(0,i.jsx)(n.strong,{children:"core types"})," layer contains everything you need for organizing Generative AI projects, with built-in lineage, tracking, and reproducibility."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.a,{href:"/guides/core-types/datasets",children:"Datasets"})}),": Version, store, and share rich tabular data."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.a,{href:"/guides/core-types/models",children:"Models"})}),": Version, store, and share parameterized functions."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.a,{href:"/guides/core-types/evaluations",children:"Evaluations"})}),": Test suites for AI models."]}),"\n",(0,i.jsx)(n.li,{children:"[soon] Agents: ..."}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Weave's ",(0,i.jsx)(n.strong,{children:"tracking"})," layer brings immutable tracing and versioning to your programs and experiments."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.a,{href:"/guides/tracking/objects",children:"Objects"})}),": Weave's extensible serialization lets you easily version, track, and share Python objects."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.a,{href:"/guides/tracking/ops",children:"Ops"})}),": Versioned, reproducible functions, with automatic tracing."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.a,{href:"/guides/tracking/tracing",children:"Tracing"})}),": Automatic organization of function calls and data lineage."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Weave's ",(0,i.jsx)(n.strong,{children:"ecosystem"})," is batteries included for other libraries, systems, and best practices."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.a,{href:"/guides/ecosystem/openai",children:"OpenAI"})}),": automatic tracking for openai api calls"]}),"\n",(0,i.jsx)(n.li,{children:"[soon] Langchain auto-logging"}),"\n",(0,i.jsx)(n.li,{children:"[soon] llama-index auto-logging"}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Weave's ",(0,i.jsx)(n.strong,{children:"tools"})," layer contains utilities for making use of Weave objects."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.a,{href:"/guides/tools/serve",children:"Serve"})}),": FastAPI server for Weave Ops and Models"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.a,{href:"/guides/tools/deploy",children:"Deploy"})}),": Deploy Weave Ops and Models to various targets"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"whats-next",children:"What's next?"}),"\n",(0,i.jsxs)(n.p,{children:["Try the ",(0,i.jsx)(n.a,{href:"/quickstart",children:"Quickstart"})," to see Weave in action."]})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>a,a:()=>o});var i=s(7294);const t={},r=i.createContext(t);function o(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);