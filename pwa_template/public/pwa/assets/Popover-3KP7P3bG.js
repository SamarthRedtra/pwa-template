import{r as it,n as xt,a6 as at,U as Ae,am as Pt,m as Et,o as Ye,a as Tt,b as he,H as Ce,I as me,J as ge,A as Ue,B as At,d as Ct,w as Dt,P as Bt,Q as kt,T as jt,ar as Mt,as as Rt}from"./index-D6WzF6ad.js";function Ge(e,t){if(e)return e;let r=t!=null?t:"button";if(typeof r=="string"&&r.toLowerCase()==="button")return"button"}function Ur(e,t){let r=it(Ge(e.value.type,e.value.as));return xt(()=>{r.value=Ge(e.value.type,e.value.as)}),at(()=>{var n;r.value||Ae(t)&&Ae(t)instanceof HTMLButtonElement&&!((n=Ae(t))!=null&&n.hasAttribute("type"))&&(r.value="button")}),r}function Je(e){return[e.screenX,e.screenY]}function Gr(){let e=it([-1,-1]);return{wasMoved(t){let r=Je(t);return e.value[0]===r[0]&&e.value[1]===r[1]?!1:(e.value=r,!0)},update(t){e.value=Je(t)}}}function Jr({container:e,accept:t,walk:r,enabled:n}){at(()=>{let i=e.value;if(!i||n!==void 0&&!n.value)return;let o=Pt(e);if(!o)return;let l=Object.assign(s=>t(s),{acceptNode:t}),a=o.createTreeWalker(i,NodeFilter.SHOW_ELEMENT,l,!1);for(;a.nextNode();)r(a.currentNode)})}function St(e){throw new Error("Unexpected object: "+e)}var Lt=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(Lt||{});function Kr(e,t){let r=t.resolveItems();if(r.length<=0)return null;let n=t.resolveActiveIndex(),i=n!=null?n:-1;switch(e.focus){case 0:{for(let o=0;o<r.length;++o)if(!t.resolveDisabled(r[o],o,r))return o;return n}case 1:{i===-1&&(i=r.length);for(let o=i-1;o>=0;--o)if(!t.resolveDisabled(r[o],o,r))return o;return n}case 2:{for(let o=i+1;o<r.length;++o)if(!t.resolveDisabled(r[o],o,r))return o;return n}case 3:{for(let o=r.length-1;o>=0;--o)if(!t.resolveDisabled(r[o],o,r))return o;return n}case 4:{for(let o=0;o<r.length;++o)if(t.resolveId(r[o],o,r)===e.id)return o;return n}case 5:return null;default:St(e)}}var B="top",S="bottom",L="right",k="left",ke="auto",le=[B,S,L,k],Q="start",ae="end",Wt="clippingParents",st="viewport",oe="popper",Nt="reference",Ke=le.reduce(function(e,t){return e.concat([t+"-"+Q,t+"-"+ae])},[]),lt=[].concat(le,[ke]).reduce(function(e,t){return e.concat([t,t+"-"+Q,t+"-"+ae])},[]),$t="beforeRead",Ht="read",Vt="afterRead",Ft="beforeMain",It="main",qt="afterMain",zt="beforeWrite",Xt="write",Yt="afterWrite",Ut=[$t,Ht,Vt,Ft,It,qt,zt,Xt,Yt];function H(e){return e?(e.nodeName||"").toLowerCase():null}function M(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function J(e){var t=M(e).Element;return e instanceof t||e instanceof Element}function R(e){var t=M(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function je(e){if(typeof ShadowRoot=="undefined")return!1;var t=M(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Gt(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var n=t.styles[r]||{},i=t.attributes[r]||{},o=t.elements[r];!R(o)||!H(o)||(Object.assign(o.style,n),Object.keys(i).forEach(function(l){var a=i[l];a===!1?o.removeAttribute(l):o.setAttribute(l,a===!0?"":a)}))})}function Jt(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(n){var i=t.elements[n],o=t.attributes[n]||{},l=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:r[n]),a=l.reduce(function(s,u){return s[u]="",s},{});!R(i)||!H(i)||(Object.assign(i.style,a),Object.keys(o).forEach(function(s){i.removeAttribute(s)}))})}}const Kt={name:"applyStyles",enabled:!0,phase:"write",fn:Gt,effect:Jt,requires:["computeStyles"]};function $(e){return e.split("-")[0]}var G=Math.max,we=Math.min,Z=Math.round;function De(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function pt(){return!/^((?!chrome|android).)*safari/i.test(De())}function _(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),i=1,o=1;t&&R(e)&&(i=e.offsetWidth>0&&Z(n.width)/e.offsetWidth||1,o=e.offsetHeight>0&&Z(n.height)/e.offsetHeight||1);var l=J(e)?M(e):window,a=l.visualViewport,s=!pt()&&r,u=(n.left+(s&&a?a.offsetLeft:0))/i,p=(n.top+(s&&a?a.offsetTop:0))/o,h=n.width/i,y=n.height/o;return{width:h,height:y,top:p,right:u+h,bottom:p+y,left:u,x:u,y:p}}function Me(e){var t=_(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function ut(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&je(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function V(e){return M(e).getComputedStyle(e)}function Qt(e){return["table","td","th"].indexOf(H(e))>=0}function I(e){return((J(e)?e.ownerDocument:e.document)||window.document).documentElement}function Oe(e){return H(e)==="html"?e:e.assignedSlot||e.parentNode||(je(e)?e.host:null)||I(e)}function Qe(e){return!R(e)||V(e).position==="fixed"?null:e.offsetParent}function Zt(e){var t=/firefox/i.test(De()),r=/Trident/i.test(De());if(r&&R(e)){var n=V(e);if(n.position==="fixed")return null}var i=Oe(e);for(je(i)&&(i=i.host);R(i)&&["html","body"].indexOf(H(i))<0;){var o=V(i);if(o.transform!=="none"||o.perspective!=="none"||o.contain==="paint"||["transform","perspective"].indexOf(o.willChange)!==-1||t&&o.willChange==="filter"||t&&o.filter&&o.filter!=="none")return i;i=i.parentNode}return null}function pe(e){for(var t=M(e),r=Qe(e);r&&Qt(r)&&V(r).position==="static";)r=Qe(r);return r&&(H(r)==="html"||H(r)==="body"&&V(r).position==="static")?t:r||Zt(e)||t}function Re(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function ne(e,t,r){return G(e,we(t,r))}function _t(e,t,r){var n=ne(e,t,r);return n>r?r:n}function ft(){return{top:0,right:0,bottom:0,left:0}}function ct(e){return Object.assign({},ft(),e)}function vt(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}var er=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,ct(typeof t!="number"?t:vt(t,le))};function tr(e){var t,r=e.state,n=e.name,i=e.options,o=r.elements.arrow,l=r.modifiersData.popperOffsets,a=$(r.placement),s=Re(a),u=[k,L].indexOf(a)>=0,p=u?"height":"width";if(!(!o||!l)){var h=er(i.padding,r),y=Me(o),f=s==="y"?B:k,w=s==="y"?S:L,d=r.rects.reference[p]+r.rects.reference[s]-l[s]-r.rects.popper[p],v=l[s]-r.rects.reference[s],b=pe(o),x=b?s==="y"?b.clientHeight||0:b.clientWidth||0:0,P=d/2-v/2,c=h[f],m=x-y[p]-h[w],g=x/2-y[p]/2+P,O=ne(c,g,m),A=s;r.modifiersData[n]=(t={},t[A]=O,t.centerOffset=O-g,t)}}function rr(e){var t=e.state,r=e.options,n=r.element,i=n===void 0?"[data-popper-arrow]":n;i!=null&&(typeof i=="string"&&(i=t.elements.popper.querySelector(i),!i)||ut(t.elements.popper,i)&&(t.elements.arrow=i))}const or={name:"arrow",enabled:!0,phase:"main",fn:tr,effect:rr,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ee(e){return e.split("-")[1]}var nr={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ir(e,t){var r=e.x,n=e.y,i=t.devicePixelRatio||1;return{x:Z(r*i)/i||0,y:Z(n*i)/i||0}}function Ze(e){var t,r=e.popper,n=e.popperRect,i=e.placement,o=e.variation,l=e.offsets,a=e.position,s=e.gpuAcceleration,u=e.adaptive,p=e.roundOffsets,h=e.isFixed,y=l.x,f=y===void 0?0:y,w=l.y,d=w===void 0?0:w,v=typeof p=="function"?p({x:f,y:d}):{x:f,y:d};f=v.x,d=v.y;var b=l.hasOwnProperty("x"),x=l.hasOwnProperty("y"),P=k,c=B,m=window;if(u){var g=pe(r),O="clientHeight",A="clientWidth";if(g===M(r)&&(g=I(r),V(g).position!=="static"&&a==="absolute"&&(O="scrollHeight",A="scrollWidth")),g=g,i===B||(i===k||i===L)&&o===ae){c=S;var T=h&&g===m&&m.visualViewport?m.visualViewport.height:g[O];d-=T-n.height,d*=s?1:-1}if(i===k||(i===B||i===S)&&o===ae){P=L;var E=h&&g===m&&m.visualViewport?m.visualViewport.width:g[A];f-=E-n.width,f*=s?1:-1}}var C=Object.assign({position:a},u&&nr),W=p===!0?ir({x:f,y:d},M(r)):{x:f,y:d};if(f=W.x,d=W.y,s){var D;return Object.assign({},C,(D={},D[c]=x?"0":"",D[P]=b?"0":"",D.transform=(m.devicePixelRatio||1)<=1?"translate("+f+"px, "+d+"px)":"translate3d("+f+"px, "+d+"px, 0)",D))}return Object.assign({},C,(t={},t[c]=x?d+"px":"",t[P]=b?f+"px":"",t.transform="",t))}function ar(e){var t=e.state,r=e.options,n=r.gpuAcceleration,i=n===void 0?!0:n,o=r.adaptive,l=o===void 0?!0:o,a=r.roundOffsets,s=a===void 0?!0:a,u={placement:$(t.placement),variation:ee(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:i,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Ze(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:l,roundOffsets:s})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ze(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:s})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const sr={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:ar,data:{}};var ye={passive:!0};function lr(e){var t=e.state,r=e.instance,n=e.options,i=n.scroll,o=i===void 0?!0:i,l=n.resize,a=l===void 0?!0:l,s=M(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return o&&u.forEach(function(p){p.addEventListener("scroll",r.update,ye)}),a&&s.addEventListener("resize",r.update,ye),function(){o&&u.forEach(function(p){p.removeEventListener("scroll",r.update,ye)}),a&&s.removeEventListener("resize",r.update,ye)}}const pr={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:lr,data:{}};var ur={left:"right",right:"left",bottom:"top",top:"bottom"};function be(e){return e.replace(/left|right|bottom|top/g,function(t){return ur[t]})}var fr={start:"end",end:"start"};function _e(e){return e.replace(/start|end/g,function(t){return fr[t]})}function Se(e){var t=M(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}function Le(e){return _(I(e)).left+Se(e).scrollLeft}function cr(e,t){var r=M(e),n=I(e),i=r.visualViewport,o=n.clientWidth,l=n.clientHeight,a=0,s=0;if(i){o=i.width,l=i.height;var u=pt();(u||!u&&t==="fixed")&&(a=i.offsetLeft,s=i.offsetTop)}return{width:o,height:l,x:a+Le(e),y:s}}function vr(e){var t,r=I(e),n=Se(e),i=(t=e.ownerDocument)==null?void 0:t.body,o=G(r.scrollWidth,r.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),l=G(r.scrollHeight,r.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),a=-n.scrollLeft+Le(e),s=-n.scrollTop;return V(i||r).direction==="rtl"&&(a+=G(r.clientWidth,i?i.clientWidth:0)-o),{width:o,height:l,x:a,y:s}}function We(e){var t=V(e),r=t.overflow,n=t.overflowX,i=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+i+n)}function dt(e){return["html","body","#document"].indexOf(H(e))>=0?e.ownerDocument.body:R(e)&&We(e)?e:dt(Oe(e))}function ie(e,t){var r;t===void 0&&(t=[]);var n=dt(e),i=n===((r=e.ownerDocument)==null?void 0:r.body),o=M(n),l=i?[o].concat(o.visualViewport||[],We(n)?n:[]):n,a=t.concat(l);return i?a:a.concat(ie(Oe(l)))}function Be(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function dr(e,t){var r=_(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function et(e,t,r){return t===st?Be(cr(e,r)):J(t)?dr(t,r):Be(vr(I(e)))}function hr(e){var t=ie(Oe(e)),r=["absolute","fixed"].indexOf(V(e).position)>=0,n=r&&R(e)?pe(e):e;return J(n)?t.filter(function(i){return J(i)&&ut(i,n)&&H(i)!=="body"}):[]}function mr(e,t,r,n){var i=t==="clippingParents"?hr(e):[].concat(t),o=[].concat(i,[r]),l=o[0],a=o.reduce(function(s,u){var p=et(e,u,n);return s.top=G(p.top,s.top),s.right=we(p.right,s.right),s.bottom=we(p.bottom,s.bottom),s.left=G(p.left,s.left),s},et(e,l,n));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function ht(e){var t=e.reference,r=e.element,n=e.placement,i=n?$(n):null,o=n?ee(n):null,l=t.x+t.width/2-r.width/2,a=t.y+t.height/2-r.height/2,s;switch(i){case B:s={x:l,y:t.y-r.height};break;case S:s={x:l,y:t.y+t.height};break;case L:s={x:t.x+t.width,y:a};break;case k:s={x:t.x-r.width,y:a};break;default:s={x:t.x,y:t.y}}var u=i?Re(i):null;if(u!=null){var p=u==="y"?"height":"width";switch(o){case Q:s[u]=s[u]-(t[p]/2-r[p]/2);break;case ae:s[u]=s[u]+(t[p]/2-r[p]/2);break}}return s}function se(e,t){t===void 0&&(t={});var r=t,n=r.placement,i=n===void 0?e.placement:n,o=r.strategy,l=o===void 0?e.strategy:o,a=r.boundary,s=a===void 0?Wt:a,u=r.rootBoundary,p=u===void 0?st:u,h=r.elementContext,y=h===void 0?oe:h,f=r.altBoundary,w=f===void 0?!1:f,d=r.padding,v=d===void 0?0:d,b=ct(typeof v!="number"?v:vt(v,le)),x=y===oe?Nt:oe,P=e.rects.popper,c=e.elements[w?x:y],m=mr(J(c)?c:c.contextElement||I(e.elements.popper),s,p,l),g=_(e.elements.reference),O=ht({reference:g,element:P,strategy:"absolute",placement:i}),A=Be(Object.assign({},P,O)),T=y===oe?A:g,E={top:m.top-T.top+b.top,bottom:T.bottom-m.bottom+b.bottom,left:m.left-T.left+b.left,right:T.right-m.right+b.right},C=e.modifiersData.offset;if(y===oe&&C){var W=C[i];Object.keys(E).forEach(function(D){var q=[L,S].indexOf(D)>=0?1:-1,z=[B,S].indexOf(D)>=0?"y":"x";E[D]+=W[z]*q})}return E}function gr(e,t){t===void 0&&(t={});var r=t,n=r.placement,i=r.boundary,o=r.rootBoundary,l=r.padding,a=r.flipVariations,s=r.allowedAutoPlacements,u=s===void 0?lt:s,p=ee(n),h=p?a?Ke:Ke.filter(function(w){return ee(w)===p}):le,y=h.filter(function(w){return u.indexOf(w)>=0});y.length===0&&(y=h);var f=y.reduce(function(w,d){return w[d]=se(e,{placement:d,boundary:i,rootBoundary:o,padding:l})[$(d)],w},{});return Object.keys(f).sort(function(w,d){return f[w]-f[d]})}function yr(e){if($(e)===ke)return[];var t=be(e);return[_e(e),t,_e(t)]}function br(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var i=r.mainAxis,o=i===void 0?!0:i,l=r.altAxis,a=l===void 0?!0:l,s=r.fallbackPlacements,u=r.padding,p=r.boundary,h=r.rootBoundary,y=r.altBoundary,f=r.flipVariations,w=f===void 0?!0:f,d=r.allowedAutoPlacements,v=t.options.placement,b=$(v),x=b===v,P=s||(x||!w?[be(v)]:yr(v)),c=[v].concat(P).reduce(function(K,F){return K.concat($(F)===ke?gr(t,{placement:F,boundary:p,rootBoundary:h,padding:u,flipVariations:w,allowedAutoPlacements:d}):F)},[]),m=t.rects.reference,g=t.rects.popper,O=new Map,A=!0,T=c[0],E=0;E<c.length;E++){var C=c[E],W=$(C),D=ee(C)===Q,q=[B,S].indexOf(W)>=0,z=q?"width":"height",j=se(t,{placement:C,boundary:p,rootBoundary:h,altBoundary:y,padding:u}),N=q?D?L:k:D?S:B;m[z]>g[z]&&(N=be(N));var ue=be(N),X=[];if(o&&X.push(j[W]<=0),a&&X.push(j[N]<=0,j[ue]<=0),X.every(function(K){return K})){T=C,A=!1;break}O.set(C,X)}if(A)for(var fe=w?3:1,xe=function(F){var re=c.find(function(ve){var Y=O.get(ve);if(Y)return Y.slice(0,F).every(function(Pe){return Pe})});if(re)return T=re,"break"},te=fe;te>0;te--){var ce=xe(te);if(ce==="break")break}t.placement!==T&&(t.modifiersData[n]._skip=!0,t.placement=T,t.reset=!0)}}const wr={name:"flip",enabled:!0,phase:"main",fn:br,requiresIfExists:["offset"],data:{_skip:!1}};function tt(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function rt(e){return[B,L,S,k].some(function(t){return e[t]>=0})}function Or(e){var t=e.state,r=e.name,n=t.rects.reference,i=t.rects.popper,o=t.modifiersData.preventOverflow,l=se(t,{elementContext:"reference"}),a=se(t,{altBoundary:!0}),s=tt(l,n),u=tt(a,i,o),p=rt(s),h=rt(u);t.modifiersData[r]={referenceClippingOffsets:s,popperEscapeOffsets:u,isReferenceHidden:p,hasPopperEscaped:h},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":h})}const xr={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Or};function Pr(e,t,r){var n=$(e),i=[k,B].indexOf(n)>=0?-1:1,o=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,l=o[0],a=o[1];return l=l||0,a=(a||0)*i,[k,L].indexOf(n)>=0?{x:a,y:l}:{x:l,y:a}}function Er(e){var t=e.state,r=e.options,n=e.name,i=r.offset,o=i===void 0?[0,0]:i,l=lt.reduce(function(p,h){return p[h]=Pr(h,t.rects,o),p},{}),a=l[t.placement],s=a.x,u=a.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=s,t.modifiersData.popperOffsets.y+=u),t.modifiersData[n]=l}const Tr={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Er};function Ar(e){var t=e.state,r=e.name;t.modifiersData[r]=ht({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Cr={name:"popperOffsets",enabled:!0,phase:"read",fn:Ar,data:{}};function Dr(e){return e==="x"?"y":"x"}function Br(e){var t=e.state,r=e.options,n=e.name,i=r.mainAxis,o=i===void 0?!0:i,l=r.altAxis,a=l===void 0?!1:l,s=r.boundary,u=r.rootBoundary,p=r.altBoundary,h=r.padding,y=r.tether,f=y===void 0?!0:y,w=r.tetherOffset,d=w===void 0?0:w,v=se(t,{boundary:s,rootBoundary:u,padding:h,altBoundary:p}),b=$(t.placement),x=ee(t.placement),P=!x,c=Re(b),m=Dr(c),g=t.modifiersData.popperOffsets,O=t.rects.reference,A=t.rects.popper,T=typeof d=="function"?d(Object.assign({},t.rects,{placement:t.placement})):d,E=typeof T=="number"?{mainAxis:T,altAxis:T}:Object.assign({mainAxis:0,altAxis:0},T),C=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,W={x:0,y:0};if(g){if(o){var D,q=c==="y"?B:k,z=c==="y"?S:L,j=c==="y"?"height":"width",N=g[c],ue=N+v[q],X=N-v[z],fe=f?-A[j]/2:0,xe=x===Q?O[j]:A[j],te=x===Q?-A[j]:-O[j],ce=t.elements.arrow,K=f&&ce?Me(ce):{width:0,height:0},F=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ft(),re=F[q],ve=F[z],Y=ne(0,O[j],K[j]),Pe=P?O[j]/2-fe-Y-re-E.mainAxis:xe-Y-re-E.mainAxis,mt=P?-O[j]/2+fe+Y+ve+E.mainAxis:te+Y+ve+E.mainAxis,Ee=t.elements.arrow&&pe(t.elements.arrow),gt=Ee?c==="y"?Ee.clientTop||0:Ee.clientLeft||0:0,Ne=(D=C==null?void 0:C[c])!=null?D:0,yt=N+Pe-Ne-gt,bt=N+mt-Ne,$e=ne(f?we(ue,yt):ue,N,f?G(X,bt):X);g[c]=$e,W[c]=$e-N}if(a){var He,wt=c==="x"?B:k,Ot=c==="x"?S:L,U=g[m],de=m==="y"?"height":"width",Ve=U+v[wt],Fe=U-v[Ot],Te=[B,k].indexOf(b)!==-1,Ie=(He=C==null?void 0:C[m])!=null?He:0,qe=Te?Ve:U-O[de]-A[de]-Ie+E.altAxis,ze=Te?U+O[de]+A[de]-Ie-E.altAxis:Fe,Xe=f&&Te?_t(qe,U,ze):ne(f?qe:Ve,U,f?ze:Fe);g[m]=Xe,W[m]=Xe-U}t.modifiersData[n]=W}}const kr={name:"preventOverflow",enabled:!0,phase:"main",fn:Br,requiresIfExists:["offset"]};function jr(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Mr(e){return e===M(e)||!R(e)?Se(e):jr(e)}function Rr(e){var t=e.getBoundingClientRect(),r=Z(t.width)/e.offsetWidth||1,n=Z(t.height)/e.offsetHeight||1;return r!==1||n!==1}function Sr(e,t,r){r===void 0&&(r=!1);var n=R(t),i=R(t)&&Rr(t),o=I(t),l=_(e,i,r),a={scrollLeft:0,scrollTop:0},s={x:0,y:0};return(n||!n&&!r)&&((H(t)!=="body"||We(o))&&(a=Mr(t)),R(t)?(s=_(t,!0),s.x+=t.clientLeft,s.y+=t.clientTop):o&&(s.x=Le(o))),{x:l.left+a.scrollLeft-s.x,y:l.top+a.scrollTop-s.y,width:l.width,height:l.height}}function Lr(e){var t=new Map,r=new Set,n=[];e.forEach(function(o){t.set(o.name,o)});function i(o){r.add(o.name);var l=[].concat(o.requires||[],o.requiresIfExists||[]);l.forEach(function(a){if(!r.has(a)){var s=t.get(a);s&&i(s)}}),n.push(o)}return e.forEach(function(o){r.has(o.name)||i(o)}),n}function Wr(e){var t=Lr(e);return Ut.reduce(function(r,n){return r.concat(t.filter(function(i){return i.phase===n}))},[])}function Nr(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function $r(e){var t=e.reduce(function(r,n){var i=r[n.name];return r[n.name]=i?Object.assign({},i,n,{options:Object.assign({},i.options,n.options),data:Object.assign({},i.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}var ot={placement:"bottom",modifiers:[],strategy:"absolute"};function nt(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function Hr(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,i=t.defaultOptions,o=i===void 0?ot:i;return function(a,s,u){u===void 0&&(u=o);var p={placement:"bottom",orderedModifiers:[],options:Object.assign({},ot,o),modifiersData:{},elements:{reference:a,popper:s},attributes:{},styles:{}},h=[],y=!1,f={state:p,setOptions:function(b){var x=typeof b=="function"?b(p.options):b;d(),p.options=Object.assign({},o,p.options,x),p.scrollParents={reference:J(a)?ie(a):a.contextElement?ie(a.contextElement):[],popper:ie(s)};var P=Wr($r([].concat(n,p.options.modifiers)));return p.orderedModifiers=P.filter(function(c){return c.enabled}),w(),f.update()},forceUpdate:function(){if(!y){var b=p.elements,x=b.reference,P=b.popper;if(nt(x,P)){p.rects={reference:Sr(x,pe(P),p.options.strategy==="fixed"),popper:Me(P)},p.reset=!1,p.placement=p.options.placement,p.orderedModifiers.forEach(function(E){return p.modifiersData[E.name]=Object.assign({},E.data)});for(var c=0;c<p.orderedModifiers.length;c++){if(p.reset===!0){p.reset=!1,c=-1;continue}var m=p.orderedModifiers[c],g=m.fn,O=m.options,A=O===void 0?{}:O,T=m.name;typeof g=="function"&&(p=g({state:p,options:A,name:T,instance:f})||p)}}}},update:Nr(function(){return new Promise(function(v){f.forceUpdate(),v(p)})}),destroy:function(){d(),y=!0}};if(!nt(a,s))return f;f.setOptions(u).then(function(v){!y&&u.onFirstUpdate&&u.onFirstUpdate(v)});function w(){p.orderedModifiers.forEach(function(v){var b=v.name,x=v.options,P=x===void 0?{}:x,c=v.effect;if(typeof c=="function"){var m=c({state:p,name:b,instance:f,options:P}),g=function(){};h.push(m||g)}})}function d(){h.forEach(function(v){return v()}),h=[]}return f}}var Vr=[pr,Cr,sr,Kt,Tr,wr,kr,or,xr],Fr=Hr({defaultModifiers:Vr});const Ir={name:"Popover",inheritAttrs:!1,props:{show:{default:void 0},trigger:{type:String,default:"click"},hoverDelay:{type:Number,default:0},leaveDelay:{type:Number,default:0},placement:{type:String,default:"bottom-start"},popoverClass:[String,Object,Array],transition:{default:null},hideOnBlur:{default:!0}},emits:["open","close","update:show"],expose:["open","close"],data(){return{popoverContainerClass:"body-container",showPopup:!1,targetWidth:null,pointerOverTargetOrPopup:!1}},watch:{show(e){e?this.open():this.close()}},created(){if(typeof window!="undefined"&&!document.getElementById("frappeui-popper-root")){const e=document.createElement("div");e.id="frappeui-popper-root",document.body.appendChild(e)}},mounted(){this.listener=e=>{const t=e.target,r=this.$refs.reference,n=this.$refs.popover;if(t===r||t===n||(r==null?void 0:r.contains(t))||(n==null?void 0:n.contains(t)))return;if(!document.getElementById("frappeui-popper-root").contains(t))return this.close();const a=`.${this.popoverContainerClass}`,s=t==null?void 0:t.closest(a),u=r==null?void 0:r.closest(a);s&&u&&s===u&&this.close()},this.hideOnBlur&&(document.addEventListener("click",this.listener),document.addEventListener("mousedown",this.listener)),this.$nextTick(()=>{this.targetWidth=this.$refs.target.clientWidth})},beforeDestroy(){this.popper&&this.popper.destroy(),document.removeEventListener("click",this.listener),document.removeEventListener("mousedown",this.listener)},computed:{showPropPassed(){return this.show!=null},isOpen:{get(){return this.showPropPassed?this.show:this.showPopup},set(e){e=!!e,this.showPropPassed?this.$emit("update:show",e):this.showPopup=e,e===!1?this.$emit("close"):e===!0&&this.$emit("open")}},popupTransition(){let e={default:{enterActiveClass:"transition duration-150 ease-out",enterFromClass:"translate-y-1 opacity-0",enterToClass:"translate-y-0 opacity-100",leaveActiveClass:"transition duration-150 ease-in",leaveFromClass:"translate-y-0 opacity-100",leaveToClass:"translate-y-1 opacity-0"}};return typeof this.transition=="string"?e[this.transition]:this.transition}},methods:{setupPopper(){this.popper?this.updatePosition():this.popper=Fr(this.$refs.reference,this.$refs.popover,{placement:this.placement})},updatePosition(){this.popper&&this.popper.update()},togglePopover(e){e instanceof Event&&(e=null),e==null&&(e=!this.isOpen),e=!!e,e?this.open():this.close()},open(){this.isOpen=!0,this.$nextTick(()=>this.setupPopper())},close(){this.isOpen=!1},onMouseover(){this.pointerOverTargetOrPopup=!0,this.leaveTimer&&(clearTimeout(this.leaveTimer),this.leaveTimer=null),this.trigger==="hover"&&(this.hoverDelay?this.hoverTimer=setTimeout(()=>{this.pointerOverTargetOrPopup&&this.open()},Number(this.hoverDelay)*1e3):this.open())},onMouseleave(e){this.pointerOverTargetOrPopup=!1,this.hoverTimer&&(clearTimeout(this.hoverTimer),this.hoverTimer=null),this.trigger==="hover"&&(this.leaveTimer&&clearTimeout(this.leaveTimer),this.leaveDelay?this.leaveTimer=setTimeout(()=>{this.pointerOverTargetOrPopup||this.close()},Number(this.leaveDelay)*1e3):this.pointerOverTargetOrPopup||this.close())}}},qr={ref:"reference"},zr={class:"rounded-lg border border-gray-100 bg-white shadow-xl"};function Xr(e,t,r,n,i,o){return Ye(),Tt("div",qr,[he("div",{ref:"target",class:Ue(["flex",e.$attrs.class]),onClick:t[0]||(t[0]=(...l)=>o.updatePosition&&o.updatePosition(...l)),onFocusin:t[1]||(t[1]=(...l)=>o.updatePosition&&o.updatePosition(...l)),onKeydown:t[2]||(t[2]=(...l)=>o.updatePosition&&o.updatePosition(...l)),onMouseover:t[3]||(t[3]=(...l)=>o.onMouseover&&o.onMouseover(...l)),onMouseleave:t[4]||(t[4]=(...l)=>o.onMouseleave&&o.onMouseleave(...l))},[Ce(e.$slots,"target",me(ge({togglePopover:o.togglePopover,updatePosition:o.updatePosition,open:o.open,close:o.close,isOpen:o.isOpen})))],34),(Ye(),At(Rt,{to:"#frappeui-popper-root"},[he("div",{ref:"popover",class:Ue(["relative z-[100]",[i.popoverContainerClass,r.popoverClass]]),style:Mt({minWidth:i.targetWidth?i.targetWidth+"px":null}),onMouseover:t[5]||(t[5]=l=>i.pointerOverTargetOrPopup=!0),onMouseleave:t[6]||(t[6]=(...l)=>o.onMouseleave&&o.onMouseleave(...l))},[Ct(jt,me(ge(o.popupTransition)),{default:Dt(()=>[Bt(he("div",null,[Ce(e.$slots,"body",me(ge({togglePopover:o.togglePopover,updatePosition:o.updatePosition,open:o.open,close:o.close,isOpen:o.isOpen})),()=>[he("div",zr,[Ce(e.$slots,"body-main",me(ge({togglePopover:o.togglePopover,updatePosition:o.updatePosition,open:o.open,close:o.close,isOpen:o.isOpen})))])])],512),[[kt,o.isOpen]])]),_:3},16)],38)]))],512)}const Qr=Et(Ir,[["render",Xr]]);export{Qr as P,Lt as c,Kr as f,Jr as i,Ur as s,Gr as u};
