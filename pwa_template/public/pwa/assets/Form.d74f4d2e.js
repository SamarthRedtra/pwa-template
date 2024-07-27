var h=(s,a,l)=>new Promise((e,o)=>{var t=f=>{try{i(l.next(f))}catch(V){o(V)}},n=f=>{try{i(l.throw(f))}catch(V){o(V)}},i=f=>f.done?e(f.value):Promise.resolve(f.value).then(t,n);i((l=l.apply(s,a)).next())});import{p as y,q as M,r as v,v as m,o as c,a as r,d as u,u as d,x as p,A as x,w as H,e as I,t as $,y as q,z as G,k as R,B as w,n as J,i as N,b,F as z,C as O,E as S,G as j,H as P,h as Z,_ as F,I as K}from"./index.4c13865c.js";class Q{constructor(){this.callbacks={},this.callbacks.base={}}on(a,l){const e=this;return typeof a=="undefined"||a===""?(console.warn("wrong names"),!1):typeof l=="undefined"?(console.warn("wrong callback"),!1):(this.resolveNames(a).forEach(function(t){const n=e.resolveName(t);e.callbacks[n.namespace]instanceof Object||(e.callbacks[n.namespace]={}),e.callbacks[n.namespace][n.value]instanceof Array||(e.callbacks[n.namespace][n.value]=[]),e.callbacks[n.namespace][n.value].push(l)}),this)}off(a){const l=this;return typeof a=="undefined"||a===""?(console.warn("wrong name"),!1):(this.resolveNames(a).forEach(function(o){const t=l.resolveName(o);if(t.namespace!=="base"&&t.value==="")delete l.callbacks[t.namespace];else if(t.namespace==="base")for(const n in l.callbacks)l.callbacks[n]instanceof Object&&l.callbacks[n][t.value]instanceof Array&&(delete l.callbacks[n][t.value],Object.keys(l.callbacks[n]).length===0&&delete l.callbacks[n]);else l.callbacks[t.namespace]instanceof Object&&l.callbacks[t.namespace][t.value]instanceof Array&&(delete l.callbacks[t.namespace][t.value],Object.keys(l.callbacks[t.namespace]).length===0&&delete l.callbacks[t.namespace])}),this)}trigger(a,l){if(typeof a=="undefined"||a==="")return console.warn("wrong name"),!1;const e=this;let o=null;console.log("before args",l);const t=l instanceof Array?l:[l];console.log("after args",t);let n=this.resolveNames(a);if(n=this.resolveName(n[0]),n.namespace==="base")for(const i in e.callbacks)e.callbacks[i]instanceof Object&&e.callbacks[i][n.value]instanceof Array&&e.callbacks[i][n.value].forEach(function(f){f.apply(e,t)});else if(this.callbacks[n.namespace]instanceof Object){if(n.value==="")return console.warn("wrong name"),this;e.callbacks[n.namespace][n.value].forEach(function(i){i.apply(e,t)})}return o}resolveNames(a){let l=a;return l=l.replace(/[^a-zA-Z0-9 ,/.]/g,""),l=l.replace(/[,/]+/g," "),l=l.split(" "),l}resolveName(a){const l={},e=a.split(".");return l.original=a,l.value=e[0],l.namespace="base",e.length>1&&e[1]!==""&&(l.namespace=e[1]),l}}class W extends Q{constructor(a,l=null){super(),this.doctype=a,this.name=l,this.fields=y([]),this.dirty=!1,this.doc=y({}),this.on("name",e=>{console.log("Name changed to: ",e),this.dirty=!0})}initFields(){return h(this,null,function*(){const a=new Headers;a.append("Authorization","token d0149bda3bda82c:aadbcbf2a847ea2"),a.append("Content-Type","application/json"),a.append("Cookie","full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");const l=JSON.stringify({form:"Test Form",doctype:this.doctype}),e={method:"POST",headers:a,body:l,redirect:"follow"};try{const t=yield(yield fetch("http://192.168.1.20:8001/api/method/pwa_template.utils.get_form_meta",e)).json();this.fields=t.message.fields,console.log("Fields initialized: ",this.fields)}catch(o){console.error("Error fetching form metadata: ",o)}})}getValue(a){return this.doc[a]||null}setValue(a,l){this.dirty=!0,this.doc[a]=l,console.log(this.doc)}isNew(){return!!this.name}save(){this.validateMandatory()&&(this.dirty=!1,console.log("Form saved successfully!"))}submit(){this.validateMandatory()&&(this.dirty=!1,console.log("Form submitted successfully!"))}cancel(){}isDirty(){return this.dirty}validateMandatory(){for(let a of this.fields)if(a.reqd&&!this.doc[a.fieldname])return alert(`Error: ${this.doctype} has no value in ${a.label}`),!1;return!0}}const X=M("form",{state:()=>({form:y(new W("Customer"))}),actions:{initForm(){return h(this,null,function*(){yield this.form.initFields()})},setForm(s){this.form=y(s)}}}),Y={class:"p-2"},_={__name:"Text",props:["field","frm"],setup(s){const{field:a,frm:l}=s,e=v("");return m(e,o=>{l.setValue(a.fieldname,o)}),(o,t)=>(c(),r("div",Y,[u(d(p),{type:"text",size:"sm",variant:"subtle",placeholder:s.field.label,disabled:s.field.read_only,modelValue:e.value,"onUpdate:modelValue":t[0]||(t[0]=n=>e.value=n)},null,8,["placeholder","disabled","modelValue"])]))}},ee={class:"p-2"},k={__name:"Select",props:["field","frm"],setup(s){const{field:a,frm:l}=s;return m(()=>a.value,e=>{l.setValue(a.fieldname,e.value)}),(e,o)=>(c(),r("div",ee,[u(d(x),{options:s.field.options,modelValue:s.field.value,"onUpdate:modelValue":o[0]||(o[0]=t=>s.field.value=t),size:"sm",variant:"subtle",label:s.field.label,placeholder:s.field.label,disabled:s.field.read_only,"hide-search":"true"},null,8,["options","modelValue","label","placeholder","disabled"])]))}},le={class:"p-2"},B={__name:"Badge",props:["field","frm"],setup(s){const{field:a,frm:l}=s;return l.setValue(a.fieldname,a.label),(e,o)=>(c(),r("div",le,[u(d(q),{type:"text",size:"lg",theme:"gray",variant:"ghost",label:e.value},{default:H(()=>[I($(s.field.label),1)]),_:1},8,["label"])]))}},ae={class:"p-2"},A={__name:"Int",props:["field","frm"],setup(s){const{field:a,frm:l}=s,e=v("");return m(e,o=>{l.setValue(a.fieldname,o)}),(o,t)=>(c(),r("div",ae,[u(d(p),{type:"number",size:"sm",variant:"subtle",placeholder:s.field.label,disabled:s.field.read_only,modelValue:e.value,"onUpdate:modelValue":t[0]||(t[0]=n=>e.value=n)},null,8,["placeholder","disabled","modelValue"])]))}},te={class:"p-2"},D={__name:"DateTime",props:["field","frm"],setup(s){const{field:a,frm:l}=s,e=v(a.value||"");return m(e,o=>{l.setValue(a.fieldname,o)}),(o,t)=>(c(),r("div",te,[u(d(p),{modelValue:e.value,"onUpdate:modelValue":t[0]||(t[0]=n=>e.value=n),type:"datetime-local",size:"sm",variant:"subtle",label:s.field.label,placeholder:s.field.label,disabled:s.field.read_only},null,8,["modelValue","label","placeholder","disabled"])]))}},se={class:"p-2"},T={__name:"Autocomplete",props:["field","frm"],setup(s){const{field:a,frm:l}=s;return m(()=>a.value,e=>{l.setValue(a.fieldname,e.value)}),(e,o)=>(c(),r("div",se,[u(d(x),{options:s.field.options,modelValue:s.field.value,"onUpdate:modelValue":o[0]||(o[0]=t=>s.field.value=t),size:"sm",variant:"subtle",label:s.field.label,placeholder:s.field.label,disabled:s.field.read_only},null,8,["options","modelValue","label","placeholder","disabled"])]))}},ne={class:"p-2"},C={__name:"Date",props:["field","frm"],setup(s){const{field:a,frm:l}=s,e=v(a.value||"");return m(e,o=>{l.setValue(a.fieldname,o)}),(o,t)=>(c(),r("div",ne,[u(d(p),{modelValue:e.value,"onUpdate:modelValue":t[0]||(t[0]=n=>e.value=n),type:"date",size:"sm",variant:"subtle",label:s.field.label,placeholder:s.field.label,disabled:s.field.read_only},null,8,["modelValue","label","placeholder","disabled"])]))}},oe={class:"p-3"},E={__name:"Checkbox",props:{field:Object,frm:Object},setup(s){const a=s,l=v(a.field.value);return m(l,e=>{a.frm.setValue(a.field.fieldname,e)}),m(()=>a.field.value,e=>{e===0?l.value=1:l.value=e},{immediate:!0}),(e,o)=>(c(),r("div",oe,[u(d(G),{modelValue:l.value,"onUpdate:modelValue":o[0]||(o[0]=t=>l.value=t),size:"sm",label:s.field.label,disabled:s.field.read_only},null,8,["modelValue","label","disabled"])]))}},ie={class:"p-2"},g={__name:"Textarea",props:["field","frm"],setup(s){const{field:a,frm:l}=s,e=v("");return m(e,o=>{l.setValue(a.fieldname,o)}),(o,t)=>(c(),r("div",ie,[u(d(R),{type:"textarea",size:"sm",variant:"subtle",placeholder:s.field.label,disabled:s.field.read_only,modelValue:e.value,"onUpdate:modelValue":t[0]||(t[0]=n=>e.value=n)},null,8,["placeholder","disabled","modelValue"])]))}},ce={class:"p-2"},U={__name:"Float",props:["field","frm"],setup(s){const{field:a,frm:l}=s,e=v("");w(()=>{if(a.value!==void 0&&a.value!==null){const t=parseFloat(a.value);isNaN(t)||(e.value=t.toFixed(3))}}),m(e,t=>{const n=parseFloat(t);isNaN(n)||l.setValue(a.fieldname,n.toFixed(3))});const o=()=>{if(e.value!==""){const t=parseFloat(e.value);isNaN(t)||(e.value=t.toFixed(3))}};return(t,n)=>(c(),r("div",ce,[u(d(p),{type:"number",size:"sm",variant:"subtle",placeholder:s.field.label,disabled:s.field.read_only,modelValue:e.value,"onUpdate:modelValue":n[0]||(n[0]=i=>e.value=i),onBlur:o},null,8,["placeholder","disabled","modelValue"])]))}},de={class:"p-2"},L={__name:"Link",props:["field","frm"],setup(s){const{field:a,frm:l}=s,e=v([]),o=()=>h(this,null,function*(){const t=J({doctype:a.options,fields:["name"],orderBy:"creation desc"});t.reload().then(()=>{let n=t.data;n.length>0&&(e.value=n.map(i=>i.name),console.log(e.value))})});return w(()=>{o()}),m(()=>a.value,t=>{l.setValue(a.fieldname,t.value)}),(t,n)=>(c(),r("div",de,[u(d(x),{options:e.value,modelValue:s.field.value,"onUpdate:modelValue":n[0]||(n[0]=i=>s.field.value=i),size:"sm",variant:"subtle",label:s.field.label,placeholder:s.field.label,disabled:s.field.read_only,"hide-search":"true"},null,8,["options","modelValue","label","placeholder","disabled"])]))}},re={class:"p-2 border-2 border-gray-300 rounded-md mb-4"},ue={class:"font-semibold text-gray-600 mb-2"},fe={__name:"SectionBreak",props:["field","frm"],setup(s){const{field:a,frm:l}=s,e={Data:_,Select:k,Int:A,Autocomplete:T,Dynamic_Link:k,Heading:B,Datetime:D,"Section Break":null,Date:C,Check:E,Text:_,"Long Text":g,"Small Text":g,Float:U,Link:L},o=N(()=>{const t=l.fields,n=t.indexOf(a),i=[];for(let f=n+1;f<t.length&&t[f].fieldtype!=="Section Break";f++)i.push(t[f]);return i});return(t,n)=>(c(),r("div",re,[b("h1",ue,$(s.field.label),1),b("div",null,[(c(!0),r(z,null,O(o.value,i=>(c(),S(j(e[i.fieldtype]),{key:i.fieldname,field:i,frm:s.frm},null,8,["field","frm"]))),128))])]))}},me={__name:"form_builder",props:{frm:Object},setup(s){const a=s,l={Data:_,Select:k,Int:A,Autocomplete:T,Dynamic_Link:k,Heading:B,Datetime:D,Date:C,"Section Break":fe,Check:E,Text:_,"Long Text":g,"Small Text":g,Float:U,Link:L},e=v(0),o=N(()=>{const t=[];e.value=0;for(const n of a.frm.fields)n.fieldtype==="Section Break"?(e.value=e.value+1,t.push(n)):e.value===0&&t.push(n);return t});return(t,n)=>(c(),r("div",null,[(c(!0),r(z,null,O(o.value,i=>(c(),S(j(l[i.fieldtype]),{key:i.fieldname,field:i,frm:s.frm},null,8,["field","frm"]))),128))]))}};const be={class:"w-full sm:w-96 bg-white flex justify-center h-screen"},ve={class:"w-full flex flex-col"},he={class:"w-full bg-[#f4f5f7] h-10"},pe={class:"p-2 flex"},ye={class:"font-semibold w-full"},_e={class:"w-full flex justify-end"},ke={class:"p-1 pr-4"},ge={class:"w-full p-2 flex-1 overflow-y-auto custom-scrollbar"},Ve={__name:"Form",setup(s){const a=X(),l=a.form,e=Z(),o=()=>{e.back()};return w(()=>h(this,null,function*(){yield a.initForm()})),(t,n)=>(c(),r("div",be,[b("div",ve,[b("div",he,[b("div",pe,[u(d(F),{class:"w-6 h-6 text-gray-600 hover:text-black",name:"chevron-left",onClick:o}),b("p",ye,$(d(l).doctype),1),b("div",_e,[b("div",ke,[u(d(F),{class:"w-5 h-5 text-gray-600 hover:text-black",name:"bell"})]),u(d(K),{shape:"square",image:null,label:"Ravi",size:"lg"})])])]),b("div",ge,[u(me,{frm:d(l)},null,8,["frm"])])])]))}};var we=P(Ve,[["__scopeId","data-v-662cf0e6"]]);export{we as default};
