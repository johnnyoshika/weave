"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[636],{3523:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>a,default:()=>p,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var o=t(5893),i=t(1151);const s={sidebar_position:1,hide_table_of_contents:!0},a="Ops",c={id:"guides/tracking/ops",title:"Ops",description:"A Weave op is a versioned function that automatically logs all calls.",source:"@site/docs/guides/tracking/ops.md",sourceDirName:"guides/tracking",slug:"/guides/tracking/ops",permalink:"/weave/guides/tracking/ops",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/guides/tracking/ops.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,hide_table_of_contents:!0},sidebar:"documentationSidebar",previous:{title:"Objects",permalink:"/weave/guides/tracking/objects"},next:{title:"Tracing",permalink:"/weave/guides/tracking/tracing"}},r={},d=[];function l(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"ops",children:"Ops"}),"\n",(0,o.jsx)(n.p,{children:"A Weave op is a versioned function that automatically logs all calls."}),"\n",(0,o.jsxs)(n.p,{children:["To create an op, decorate a python function with ",(0,o.jsx)(n.code,{children:"weave.op()"})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:"@weave.op()\ndef track_me(v):\n    return v + 5\n\nweave.init()\ntrack_me(15)\n"})}),"\n",(0,o.jsx)(n.p,{children:"Calling an op will created a new op version if the code has changed from the last call, and log the inputs and outputs of the function."}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:["Functions decorated with ",(0,o.jsx)(n.code,{children:"@weave.op()"})," will behave normally (without code versioning and tracking), if you don't call ",(0,o.jsx)(n.code,{children:"weave.init()"})," before calling them."]})}),"\n",(0,o.jsxs)(n.p,{children:["Ops can be ",(0,o.jsx)(n.a,{href:"/guides/tools/serve",children:"served"})," or ",(0,o.jsx)(n.a,{href:"/guides/tools/deploy",children:"deployed"})," using the Weave toolbelt."]})]})}function p(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>a});var o=t(7294);const i={},s=o.createContext(i);function a(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);