var R=Object.defineProperty,j=Object.defineProperties;var E=Object.getOwnPropertyDescriptors;var N=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable;var P=(l,a,s)=>a in l?R(l,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):l[a]=s,h=(l,a)=>{for(var s in a||(a={}))H.call(a,s)&&P(l,s,a[s]);if(N)for(var s of N(a))J.call(a,s)&&P(l,s,a[s]);return l},z=(l,a)=>j(l,E(a));import{A as L,_ as M}from"./TextInput.vue_vue_type_script_setup_true_lang-TNnHxwuu.js";import{g as B,M as S,h as n,o as i,a as b,b as D,N as c,u as t,A as x,t as $,j as V,O as Q,H as k,P as T,Q as q,F as G,p as K,R as U,B as C,S as I,w,I as F,J as W}from"./index-D6WzF6ad.js";let X=0;function Y(){return++X}function O(){return"frappe-ui-"+Y()}const Z=["disabled","id","checked"],_=["for"],ee=B({__name:"Checkbox",props:{size:{default:"sm"},label:{},checked:{type:Boolean},disabled:{type:Boolean},padding:{type:Boolean,default:!1},modelValue:{type:[Boolean,Number]},id:{}},setup(l){var p;const a=l,s=S(),u=(p=a.id)!=null?p:O(),g=n(()=>[{sm:"text-base font-medium",md:"text-lg font-medium"}[a.size],a.disabled?"text-gray-500":"text-gray-800","select-none"]),f=n(()=>{let e=a.disabled?"border-gray-300 bg-gray-50 text-gray-400":"border-gray-500 text-gray-900 hover:border-gray-600 focus:ring-offset-0 focus:border-gray-900 active:border-gray-700 transition",r=a.disabled?"":a.padding?"focus:ring-0":"hover:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400 active:bg-gray-100",d={sm:"w-3.5 h-3.5",md:"w-4 h-4"}[a.size];return[e,r,d]});return(e,r)=>(i(),b("div",{class:x(["inline-flex items-center space-x-2 rounded transition",{"px-2.5 py-1.5":e.padding&&e.size==="sm","px-3 py-2":e.padding&&e.size==="md","focus-within:bg-gray-100 focus-within:ring-2 focus-within:ring-gray-400 hover:bg-gray-200 active:bg-gray-300":e.padding&&!e.disabled}])},[D("input",c({class:["rounded-sm",f.value],type:"checkbox",disabled:e.disabled,id:t(u),checked:!!e.modelValue,onChange:r[0]||(r[0]=d=>e.$emit("update:modelValue",d.target.checked))},t(s)),null,16,Z),e.label?(i(),b("label",{key:0,class:x(["block",g.value]),for:t(u)},$(e.label),11,_)):V("",!0)],2))}}),se={class:"relative flex items-center"},ae=["disabled","id","value"],re=["value","disabled","selected"],le=B({inheritAttrs:!1,__name:"Select",props:{size:{default:"sm"},variant:{default:"subtle"},placeholder:{},disabled:{type:Boolean},id:{},modelValue:{},options:{}},emits:["update:modelValue"],setup(l,{emit:a}){const s=l,u=a;Q();const g=S();function f(o){u("update:modelValue",o.target.value)}const p=n(()=>{var o;return((o=s.options)==null?void 0:o.map(y=>typeof y=="string"?{label:y,value:y}:y).filter(Boolean))||[]}),e=n(()=>s.disabled?"text-gray-500":"text-gray-800"),r=n(()=>({sm:"text-base",md:"text-base",lg:"text-lg",xl:"text-xl"})[s.size]),d=n(()=>({sm:"px-2",md:"px-2.5",lg:"px-3",xl:"px-3"})[s.size]),m=n(()=>{let o={sm:"rounded h-7",md:"rounded h-8",lg:"rounded-md h-10",xl:"rounded-md h-10"}[s.size],y=s.disabled?"disabled":s.variant,v={subtle:"border border-gray-100 bg-gray-100 hover:border-gray-200 hover:bg-gray-200 focus:border-gray-500 focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400",outline:"border border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400",ghost:"bg-transparent border-transparent hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-500 focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400",disabled:["border",s.variant!=="ghost"?"bg-gray-50":"",s.variant==="outline"?"border-gray-300":"border-transparent"]}[y];return[o,r.value,d.value,v,e.value,"transition-colors w-full py-0"]});let A=n(()=>({sm:"pl-2",md:"pl-2.5",lg:"pl-3",xl:"pl-3"})[s.size]);return(o,y)=>(i(),b("div",se,[o.$slots.prefix?(i(),b("div",{key:0,class:x(["absolute inset-y-0 left-0 flex items-center",e.value,t(A)])},[k(o.$slots,"prefix")],2)):V("",!0),o.placeholder?T((i(),b("div",{key:1,class:x(["pointer-events-none absolute text-gray-500",[r.value,d.value]])},$(o.placeholder),3)),[[q,!o.modelValue]]):V("",!0),D("select",c({class:m.value,disabled:o.disabled,id:o.id,value:o.modelValue,onChange:f},t(g)),[(i(!0),b(G,null,K(p.value,v=>(i(),b("option",{key:v.value,value:v.value,disabled:v.disabled||!1,selected:o.modelValue===v.value},$(v.label),9,re))),128))],16,ae)]))}}),te=["placeholder","disabled","id","value","rows"],oe=B({__name:"Textarea",props:{size:{default:"sm"},variant:{default:"subtle"},placeholder:{},disabled:{type:Boolean},id:{},modelValue:{},debounce:{},rows:{default:3}},emits:["update:modelValue"],setup(l,{emit:a}){const s=l,u=a,g=S(),f=n(()=>{let r={sm:"text-base rounded",md:"text-base rounded",lg:"text-lg rounded-md",xl:"text-xl rounded-md"}[s.size],d={sm:["py-1.5 px-2"],md:["py-1.5 px-2.5"],lg:["py-1.5 px-3"],xl:["py-1.5 px-3"]}[s.size],m=s.disabled?"disabled":s.variant,A={subtle:"border border-gray-100 bg-gray-100 placeholder-gray-500 hover:border-gray-200 hover:bg-gray-200 focus:bg-white focus:border-gray-500 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400",outline:"border border-gray-300 bg-white placeholder-gray-500 hover:border-gray-400 hover:shadow-sm focus:bg-white focus:border-gray-500 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400",disabled:["border bg-gray-50 placeholder-gray-400",s.variant==="outline"?"border-gray-300":"border-transparent"]}[m];return[r,d,A,s.disabled?"text-gray-600":"text-gray-800","transition-colors w-full block"]});let p=r=>{u("update:modelValue",r)};s.debounce&&(p=U(p,s.debounce));let e=r=>{p(r.target.value)};return(r,d)=>(i(),b("textarea",c({placeholder:r.placeholder,class:f.value,disabled:r.disabled,id:r.id,value:r.modelValue,rows:r.rows,onInput:d[0]||(d[0]=(...m)=>t(e)&&t(e)(...m)),onChange:d[1]||(d[1]=(...m)=>t(e)&&t(e)(...m))},t(g)),null,16,te))}}),ie=["for"],de={inheritAttrs:!1},be=B(z(h({},de),{__name:"FormControl",props:{label:{},description:{},type:{default:"text"},size:{default:"sm"}},setup(l){const a=O(),s=l,u=S(),g=n(()=>{let e={};for(let r in u)r!=="class"&&r!=="style"&&(e[r]=u[r]);return e}),f=n(()=>[{sm:"text-xs",md:"text-base"}[s.size],"text-gray-600"]),p=n(()=>[{sm:"text-xs",md:"text-base"}[s.size],"text-gray-600"]);return(e,r)=>e.type!="checkbox"?(i(),b("div",{key:0,class:x(["space-y-1.5",t(u).class])},[e.label?(i(),b("label",{key:0,class:x(["block",f.value]),for:t(a)},$(e.label),11,ie)):V("",!0),e.type==="select"?(i(),C(le,c({key:1,id:t(a)},z(h({},g.value),{size:e.size})),I({_:2},[e.$slots.prefix?{name:"prefix",fn:w(()=>[k(e.$slots,"prefix")]),key:"0"}:void 0]),1040,["id"])):e.type==="autocomplete"?(i(),C(L,F(c({key:2},h({},g.value))),I({_:2},[e.$slots.prefix?{name:"prefix",fn:w(()=>[k(e.$slots,"prefix")]),key:"0"}:void 0,e.$slots["item-prefix"]?{name:"item-prefix",fn:w(d=>[k(e.$slots,"item-prefix",F(W(d)))]),key:"1"}:void 0]),1040)):e.type==="textarea"?(i(),C(oe,c({key:3,id:t(a)},z(h({},g.value),{size:e.size})),null,16,["id"])):(i(),C(M,c({key:4,id:t(a)},z(h({},g.value),{type:e.type,size:e.size})),I({_:2},[e.$slots.prefix?{name:"prefix",fn:w(()=>[k(e.$slots,"prefix")]),key:"0"}:void 0,e.$slots.suffix?{name:"suffix",fn:w(()=>[k(e.$slots,"suffix")]),key:"1"}:void 0]),1040,["id"])),k(e.$slots,"description",{},()=>[e.description?(i(),b("p",{key:0,class:x(p.value)},$(e.description),3)):V("",!0)])],2)):(i(),C(ee,c({key:1,id:t(a)},z(h({},g.value),{label:e.label,size:e.size,class:t(u).class})),null,16,["id"]))}}));export{be as _,ee as a};
