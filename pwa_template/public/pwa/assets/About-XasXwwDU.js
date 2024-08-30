import{m as y,h as i,r as _,q as x,a as k,b as t,d as c,u as e,t as a,k as L,E as R,s as p,o as U,_ as d,v as B,x as $}from"./index-D6WzF6ad.js";import{_ as j}from"./Avatar.vue_vue_type_script_setup_true_lang-CIzqSjko.js";const o=n=>(B("data-v-13b3a24f"),n=n(),$(),n),I={class:"w-full sm:w-96 bg-white flex flex-col items-center h-screen overflow-hidden"},N={class:"w-full sm:w-96 bg-white h-14 shadow-lg fixed top-0 z-10 fixed"},S={class:"p-2 flex pt-3"},D=o(()=>t("p",{class:"font-semibold text-2xl pt-[6px] pr-2 truncate w-[10rem]"},"Profile",-1)),E={class:"w-full flex justify-end"},A={class:"p-1 pr-4"},C={class:"w-full flex-1 bg-gray-200 mt-14 overflow-hidden"},P={class:"p-4"},V={class:"w-full p-3 bg-white rounded-lg"},q={class:"w-full"},z={class:"mt-7 w-full justify-center flex"},G={class:"w-full flex justify-center"},M={class:"text-xl font-semibold text-black mt-2"},F={class:"p-2"},H={class:"w-full h-[12rem] rounded-md mt-1"},J=o(()=>t("hr",null,null,-1)),K={class:"flex ml-2 mt-1"},O=o(()=>t("p",{class:"text-[14px] text-gray-600 w-[5rem] truncate"},"Username",-1)),Q={class:"text-[14px] ml-auto"},T={class:"flex ml-2 mt-1"},W=o(()=>t("p",{class:"text-[14px] text-gray-600 w-[5rem] truncate"},"Email",-1)),X={class:"text-[14px] ml-auto"},Y={class:"flex ml-2 mt-1"},Z=o(()=>t("p",{class:"text-[14px] text-gray-600 w-[5rem] truncate"},"Mobile No",-1)),tt={class:"text-[14px] ml-auto"},et={class:"flex ml-2 mt-1"},st=o(()=>t("p",{class:"text-[14px] text-gray-600 w-[5rem] truncate"},"Gender",-1)),ot={class:"text-[14px] ml-auto"},at={class:"flex ml-2 mt-1"},lt=o(()=>t("p",{class:"text-[14px] text-gray-600 w-[5rem] truncate"},"Date of Birth",-1)),ct={class:"text-[14px] ml-auto"},nt={class:"flex ml-2 mt-1"},dt=o(()=>t("p",{class:"text-[14px] text-gray-600 w-[5rem] truncate"},"Role Profile",-1)),rt={class:"text-[14px] ml-auto"},it={class:"flex ml-2 mt-1"},_t=o(()=>t("p",{class:"text-[14px] text-gray-600 w-[5rem] truncate"},"Language",-1)),ut={class:"text-[14px] ml-auto"},mt={class:"w-full flex justify-center p-2"},ht={class:"h-full text-center flex justify-center"},xt=o(()=>t("p",{class:"text-red-400 mt-[2px] font-semibold ml-2"},"Logout",-1)),pt={__name:"About",setup(n){const f=L();R();const u=i(()=>p.user),r=_(""),m=_(window.location.href),h=_(""),s=x({doctype:"User",fields:["*"],filters:{name:u.value}}),v=()=>{p.logout.submit()},g=i(()=>{const l=new URL(m.value);return console.log(m.value),console.log(l),`${l.protocol}//${l.hostname}`}),w=i(()=>r.value?`${g.value}${r.value}`:"");s.reload().then(()=>{r.value=s.data[0].user_image||"";const l=x({doctype:"Language",fields:["*"],filters:{name:s.data[0].language}});l.reload().then(()=>{h.value=l.data[0].language_name})});const b=()=>{f.back()};return(l,ft)=>(U(),k("div",I,[t("div",N,[t("div",S,[c(e(d),{class:"w-8 h-8 text-gray-600 hover:text-black",name:"chevron-left",onClick:b}),D,t("div",E,[t("div",A,[c(e(d),{class:"w-6 h-6 text-gray-600 hover:text-black",name:"bell"})])])])]),t("div",C,[t("div",P,[t("div",V,[t("div",q,[c(e(d),{name:"edit",class:"w-5 h-5 ml-auto hover:cursor-pointer"})]),t("div",z,[c(e(j),{shape:"circle",image:w.value,label:u.value,class:"cursor-pointer w-[6rem] h-[6rem]"},null,8,["image","label"])]),t("div",G,[t("p",M,a(e(s).data[0].full_name),1)]),t("div",F,[t("div",H,[J,t("div",K,[O,t("p",Q,a(e(s).data[0].username),1)]),t("div",T,[W,t("p",X,a(e(s).data[0].email),1)]),t("div",Y,[Z,t("p",tt,a(e(s).data[0].mobile_no),1)]),t("div",et,[st,t("p",ot,a(e(s).data[0].gender),1)]),t("div",at,[lt,t("p",ct,a(e(s).data[0].birth_date),1)]),t("div",nt,[dt,t("p",rt,a(e(s).data[0].role_profile_name),1)]),t("div",it,[_t,t("p",ut,a(h.value),1)])])]),t("div",mt,[t("div",{onClick:v,class:"h-[2rem] bg-red-200 w-full rounded-md border-red-400 border-[0.5px] hover:cursor-pointer touchable"},[t("div",ht,[c(e(d),{name:"log-out",class:"w-5 h-5 font-semibold text-red-400 mt-1"}),xt])])])])])])]))}},wt=y(pt,[["__scopeId","data-v-13b3a24f"]]);export{wt as default};
