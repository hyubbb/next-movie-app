(()=>{var e={};e.id=875,e.ids=[875],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},57441:e=>{"use strict";e.exports=require("sharp")},39491:e=>{"use strict";e.exports=require("assert")},50852:e=>{"use strict";e.exports=require("async_hooks")},14300:e=>{"use strict";e.exports=require("buffer")},96206:e=>{"use strict";e.exports=require("console")},6113:e=>{"use strict";e.exports=require("crypto")},67643:e=>{"use strict";e.exports=require("diagnostics_channel")},9523:e=>{"use strict";e.exports=require("dns")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},85158:e=>{"use strict";e.exports=require("http2")},41808:e=>{"use strict";e.exports=require("net")},15673:e=>{"use strict";e.exports=require("node:events")},84492:e=>{"use strict";e.exports=require("node:stream")},47261:e=>{"use strict";e.exports=require("node:util")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},4074:e=>{"use strict";e.exports=require("perf_hooks")},77282:e=>{"use strict";e.exports=require("process")},63477:e=>{"use strict";e.exports=require("querystring")},12781:e=>{"use strict";e.exports=require("stream")},35356:e=>{"use strict";e.exports=require("stream/web")},71576:e=>{"use strict";e.exports=require("string_decoder")},24404:e=>{"use strict";e.exports=require("tls")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},29830:e=>{"use strict";e.exports=require("util/types")},71267:e=>{"use strict";e.exports=require("worker_threads")},59796:e=>{"use strict";e.exports=require("zlib")},85616:(e,s,r)=>{"use strict";r.r(s),r.d(s,{GlobalError:()=>n.a,__next_app__:()=>d,originalPathname:()=>p,pages:()=>c,routeModule:()=>x,tree:()=>l});var t=r(50482),i=r(69108),a=r(62563),n=r.n(a),o=r(68300),u={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(u[e]=()=>o[e]);r.d(s,u);let l=["",{children:["(movies)",{children:["movies",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,26838)),"/Users/hyublee/Desktop/hyub/dev/learn-nextjs14/app/(movies)/movies/[id]/page.tsx"]}]},{error:[()=>Promise.resolve().then(r.bind(r,37438)),"/Users/hyublee/Desktop/hyub/dev/learn-nextjs14/app/(movies)/movies/[id]/error.tsx"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,82412)),"/Users/hyublee/Desktop/hyub/dev/learn-nextjs14/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,1429)),"/Users/hyublee/Desktop/hyub/dev/learn-nextjs14/app/not-found.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/Users/hyublee/Desktop/hyub/dev/learn-nextjs14/app/(movies)/movies/[id]/page.tsx"],p="/(movies)/movies/[id]/page",d={require:r,loadChunk:()=>Promise.resolve()},x=new t.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/(movies)/movies/[id]/page",pathname:"/movies/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},24344:(e,s,r)=>{Promise.resolve().then(r.bind(r,16413))},16413:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>i});var t=r(95344);function i(){return t.jsx("h1",{children:"Sorry, something error..."})}},37438:(e,s,r)=>{"use strict";r.r(s),r.d(s,{$$typeof:()=>a,__esModule:()=>i,default:()=>n});let t=(0,r(86843).createProxy)(String.raw`/Users/hyublee/Desktop/hyub/dev/learn-nextjs14/app/(movies)/movies/[id]/error.tsx`),{__esModule:i,$$typeof:a}=t,n=t.default},26838:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>b,generateMetadata:()=>y});var t=r(25036),i=r(40002),a=r.n(i),n=r(527),o=r(70173),u=r.n(o),l=r(10632),c=r(2813),p=r(29103),d=r(72119);let x=async({id:e,type:s})=>(await fetch(`${n.Ee}/${s}/${e}?append_to_response=credits&language=ko`,n.YM)).json();async function h({id:e,type:s}){let{title:r,poster_path:i,name:o,overview:h,homepage:m,vote_average:v,release_date:q,runtime:j,genres:y,credits:b}=await x({id:e,type:s}),g={width:0,height:0,base64:""};return i&&(g=await (0,p.Z)(`${n.bV}${i}`)),(0,t.jsxs)("div",{className:u().container,children:[t.jsx(c.default,{className:u().poster,src:`${n.bV}${i}`,alt:r||o,priority:!0,sizes:"500px",width:g.width,height:g.height,placeholder:"blur",blurDataURL:g.base64}),(0,t.jsxs)("div",{className:u().info,children:[(0,t.jsxs)("div",{className:u().titleBox,children:[(0,t.jsxs)("h1",{className:u().title,children:[r||o," "]}),t.jsx(d.ZP,{movieId:e,type:s})]}),t.jsx("div",{className:u().genres,children:y.map((e,s)=>(0,t.jsxs)(a().Fragment,{children:[t.jsx("div",{className:u().text,children:e.name},e.id),s!==y.length-1&&t.jsx("span",{children:" ・ "})]},s))}),(0,t.jsxs)("div",{className:u().description,children:[v>0&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("h3",{children:["⭐️",v.toFixed(1)]}),t.jsx("span",{children:"|"})]}),t.jsx("h3",{children:q}),t.jsx("span",{children:"|"}),(0,t.jsxs)("h3",{children:[j,"분"]})]}),t.jsx("div",{className:u().overview,children:h}),m&&t.jsx("a",{href:m,target:"_blank",children:"website"}),t.jsx(l.Z,{id:e,credits:b})]}),t.jsx(c.default,{className:u().blurredBg,src:`${n.bV}${i}`,alt:r,fill:!0,priority:!1,sizes:"300px"})]})}var m=r(78326),v=r(50874),q=r.n(v),j=r(98769);async function y({params:{id:e}}){let{title:s}=await x({id:e,type:"movie"});return{title:s}}let b=async({params:{id:e}})=>(0,t.jsxs)("div",{className:q().container,children:[t.jsx(i.Suspense,{fallback:t.jsx(j.Z,{}),children:t.jsx(h,{id:e,type:"movie"})}),t.jsx(i.Suspense,{fallback:t.jsx(j.Z,{}),children:t.jsx(m.ZP,{id:e,type:"movie"})})]})}};var s=require("../../../../webpack-runtime.js");s.C(e);var r=e=>s(s.s=e),t=s.X(0,[638,905,242,182,712],()=>r(85616));module.exports=t})();