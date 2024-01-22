"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[582],{2762:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>d});var n=o(5893),s=o(1151);const i={sidebar_position:3,hide_table_of_contents:!0},r="Models",a={id:"guides/core-types/models",title:"Models",description:"A Model is a combination of data (which can include configuration, trained model weights, or other information) and code that defines how the model operates. By structuring your code to be compatible with this API, you benefit from a structured way to version your application so you can more systematically keep track of your experiments.",source:"@site/docs/guides/core-types/models.md",sourceDirName:"guides/core-types",slug:"/guides/core-types/models",permalink:"/guides/core-types/models",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/guides/core-types/models.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,hide_table_of_contents:!0},sidebar:"documentationSidebar",previous:{title:"This is the index for Core Types",permalink:"/guides/core-types/"},next:{title:"Datasets",permalink:"/guides/core-types/datasets"}},c={},d=[];function l(e){const t={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"models",children:"Models"}),"\n",(0,n.jsxs)(t.p,{children:["A ",(0,n.jsx)(t.code,{children:"Model"})," is a combination of data (which can include configuration, trained model weights, or other information) and code that defines how the model operates. By structuring your code to be compatible with this API, you benefit from a structured way to version your application so you can more systematically keep track of your experiments."]}),"\n",(0,n.jsx)(t.p,{children:"To create a model in Weave, you need the following:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"@weave.type"})," decorator on a class that inherits from ",(0,n.jsx)(t.code,{children:"weaveflow.Model"})]}),"\n",(0,n.jsx)(t.li,{children:"type definitions on all attributes"}),"\n",(0,n.jsxs)(t.li,{children:["a typed ",(0,n.jsx)(t.code,{children:"predict"})," function with ",(0,n.jsx)(t.code,{children:"@weave.op()"})," decorator"]}),"\n"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"@weave.type()\nclass YourModel(weaveflow.Model):\n    attribute1: str\n    attribute2: int\n\n    @weave.op()\n    def predict(self, input_data: str) -> str:\n        # Model logic goes here\n        return prediction\n"})}),"\n",(0,n.jsxs)(t.p,{children:["Now, any time this model is used within a function that has a ",(0,n.jsx)(t.code,{children:"@weave.op()"})," decorator, it'll be tracked so you can evaluate how it's performing and inspect model outputs."]})]})}function u(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},1151:(e,t,o)=>{o.d(t,{Z:()=>a,a:()=>r});var n=o(7294);const s={},i=n.createContext(s);function r(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);