import{N as Fe,bI as Mt,bL as Re,aN as y,cX as nn,bG as $t,bJ as q,s as K,cY as U,bx as Ne,cR as ve,bt as on,az as At,o as L,c as C,J as W,w as g,b4 as j,F as Q,aQ as ie,by as jt,bd as I,cZ as Ft,aq as Rt,v as Y,cV as ce,ca as ae,cW as Le,cU as Nt,bW as Ht,bZ as sn,a6 as mt,bH as Bt,c$ as rn,c_ as ln,d0 as Ie,I as vt,u as Oe,bR as cn,d1 as an,d2 as un,bX as fn,aJ as dn,aG as hn,_ as pn,cN as gn}from"./C0DZl7YE.js";import{_ as mn,a as vn}from"./ETqEDMFE.js";const _n={class:"container"},bn={id:"main",class:"listpage"},yn={class:"newsbox"},wn={class:"Htitle",id:"tag"},xn={class:"news row d-flex",id:"alist"},Sn={class:"artimg"},In=["src","alt"],Tn={class:"match"},kn={class:"time"},Ln={key:0,class:"pagination-container mt-4 d-flex justify-content-center"},On=["disabled"],Pn=g("img",{src:mn,width:"20px",height:"20px"},null,-1),Cn=[Pn],En=["disabled","onClick"],Mn=["disabled"],$n=g("img",{src:vn,width:"20px",height:"20px"},null,-1),An=[$n],jn=["innerHTML"],Fn=Fe({__name:"CategoryPost",async setup(e){let t,n;const s=Mt(),{useLocale:o,$t:i,$trouter:r}=Re(),l=y([]),c=y(1),a=y(nn),u=y(0),p=$t(),v=y([]);y(!1);let f=p.currentRoute.value.params.category;f||(f=p.currentRoute.value.path,f=(f==null?void 0:f.indexOf("/"))==0?f==null?void 0:f.substring(1):f,(f==null?void 0:f.lastIndexOf("/"))!==-1&&(f=f==null?void 0:f.slice(0,f.lastIndexOf("/"))));const _=y([]),w=q(s.configurations,"image_size");_.value=w==null?void 0:w.split(",");const d=y(0),A=y(),$=y();y();const M=y(""),O=y([{label:"",to:"",last:"on"}]),G=K(()=>{var h,S,E;return d.value<U.MD&&((h=_==null?void 0:_.value)==null?void 0:h.length)>=1?_.value[1]:d.value>=U.MD&&d.value<U.LG&&((S=_==null?void 0:_.value)==null?void 0:S.length)>=2?_.value[2]:d.value>=U.LG&&d.value<U.XXL&&((E=_==null?void 0:_.value)==null?void 0:E.length)>=3?_.value[3]:""}),x=(h,S)=>{let E=h-2,T=h+2;E<1&&(E=1,T=Math.min(5,S)),T>S&&(T=S,E=Math.max(1,T-4));const H=[];for(let R=E;R<=T;R++)H.push(R);return H},P=K(()=>x(c.value,u.value)),N=h=>{c.value=h,B(f)},B=async h=>{var S,E;try{const{data:T}=await ce(ae.POST.LIST,{params:{category_code:h,limit:a.value,page:c.value}},"$47OYsaj8vY");l.value=(S=T==null?void 0:T.value)==null?void 0:S.posts,u.value=Math.ceil(((E=T==null?void 0:T.value)==null?void 0:E.count_all)/a.value)}catch(T){console.error(T)}},F=async h=>{try{await ce(Le(ae.POST.CATEGORY.DETAIL+h,{}),"$LMUUmalzmV").then(S=>{var E,T,H,R,b,V,z,ee,te;v.value=(E=S==null?void 0:S.data)==null?void 0:E.value,A.value=(T=v.value)==null?void 0:T.name,M.value=(H=v.value)==null?void 0:H.meta_title,$.value=((R=v.value)==null?void 0:R.meta_description)??((b=v.value)==null?void 0:b.name),O.value[0].label=(z=(V=S==null?void 0:S.data)==null?void 0:V.value)==null?void 0:z.name,O.value[0].to="/"+((te=(ee=S==null?void 0:S.data)==null?void 0:ee.value)==null?void 0:te.code)})}catch{}};[t,n]=Ne(()=>F(f)),await t,n(),ve({title:()=>M.value||A.value,meta:[{name:"description",content:()=>$.value},{property:"og:title",content:()=>A.value},{property:"og:description",content:()=>$.value}]}),on(()=>f,()=>{B(f)}),B(f);const Z=y("");return ve(()=>({meta:[{name:"robots",content:()=>Z.value}]})),Z.value=q(s.configurations,"robot_meta_news_category")?q(s.configurations,"robot_meta_news_category"):"index, follow",At(()=>{d.value=window.innerWidth,window.addEventListener("resize",()=>{d.value=window.innerWidth})}),(h,S)=>{var H,R;const E=Nt,T=Ht;return L(),C(Q,null,[W(E,{breadcrumbs:O.value},null,8,["breadcrumbs"]),g("div",_n,[g("div",bn,[g("div",yn,[g("h1",wn,j((H=v.value)==null?void 0:H.name),1),g("ul",xn,[(L(!0),C(Q,null,ie(l.value,b=>(L(),C("li",{key:b==null?void 0:b.id,class:"article mb-3 col-12 col-sm-6 col-lg-3"},[W(T,{to:"/"+(b==null?void 0:b.slug)},{default:jt(()=>{var V,z;return[g("div",Sn,[g("img",{src:I(G)?`${(V=b==null?void 0:b.thumbnail)==null?void 0:V.file_path}!${I(G)}`:(z=b==null?void 0:b.thumbnail)==null?void 0:z.file_path,alt:b.title},null,8,In)]),g("h2",Tn,j(b==null?void 0:b.title),1)]}),_:2},1032,["to"]),g("div",kn,[g("span",null,j(b!=null&&b.post_date?("formatTimeSince"in h?h.formatTimeSince:I(Ft))(b==null?void 0:b.post_date,I(o)):""),1)])]))),128))]),u.value>0?(L(),C("div",Ln,[g("button",{disabled:c.value<=1,onClick:S[0]||(S[0]=b=>N(c.value-1))},Cn,8,On),(L(!0),C(Q,null,ie(I(P),b=>(L(),C("button",{key:b,disabled:b===c.value,onClick:V=>N(b),class:Rt(b===c.value?"on":"")},j(b),11,En))),128)),g("button",{disabled:c.value>=u.value,onClick:S[1]||(S[1]=b=>N(c.value+1))},An,8,Mn)])):Y("",!0),g("div",{id:"content-page",innerHTML:(R=v.value)==null?void 0:R.content},null,8,jn)])])])],64)}}}),Rn=sn("/icon/user.svg"),le=/^[a-z0-9]+(-[a-z0-9]+)*$/,be=(e,t,n,s="")=>{const o=e.split(":");if(e.slice(0,1)==="@"){if(o.length<2||o.length>3)return null;s=o.shift().slice(1)}if(o.length>3||!o.length)return null;if(o.length>1){const l=o.pop(),c=o.pop(),a={provider:o.length>0?o[0]:s,prefix:c,name:l};return t&&!pe(a)?null:a}const i=o[0],r=i.split("-");if(r.length>1){const l={provider:s,prefix:r.shift(),name:r.join("-")};return t&&!pe(l)?null:l}if(n&&s===""){const l={provider:s,prefix:"",name:i};return t&&!pe(l,n)?null:l}return null},pe=(e,t)=>e?!!((e.provider===""||e.provider.match(le))&&(t&&e.prefix===""||e.prefix.match(le))&&e.name.match(le)):!1,Ut=Object.freeze({left:0,top:0,width:16,height:16}),_e=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),ye=Object.freeze({...Ut,..._e}),Pe=Object.freeze({...ye,body:"",hidden:!1});function Nn(e,t){const n={};!e.hFlip!=!t.hFlip&&(n.hFlip=!0),!e.vFlip!=!t.vFlip&&(n.vFlip=!0);const s=((e.rotate||0)+(t.rotate||0))%4;return s&&(n.rotate=s),n}function _t(e,t){const n=Nn(e,t);for(const s in Pe)s in _e?s in e&&!(s in n)&&(n[s]=_e[s]):s in t?n[s]=t[s]:s in e&&(n[s]=e[s]);return n}function Hn(e,t){const n=e.icons,s=e.aliases||Object.create(null),o=Object.create(null);function i(r){if(n[r])return o[r]=[];if(!(r in o)){o[r]=null;const l=s[r]&&s[r].parent,c=l&&i(l);c&&(o[r]=[l].concat(c))}return o[r]}return Object.keys(n).concat(Object.keys(s)).forEach(i),o}function Bn(e,t,n){const s=e.icons,o=e.aliases||Object.create(null);let i={};function r(l){i=_t(s[l]||o[l],i)}return r(t),n.forEach(r),_t(e,i)}function Gt(e,t){const n=[];if(typeof e!="object"||typeof e.icons!="object")return n;e.not_found instanceof Array&&e.not_found.forEach(o=>{t(o,null),n.push(o)});const s=Hn(e);for(const o in s){const i=s[o];i&&(t(o,Bn(e,o,i)),n.push(o))}return n}const Un={provider:"",aliases:{},not_found:{},...Ut};function Te(e,t){for(const n in t)if(n in e&&typeof e[n]!=typeof t[n])return!1;return!0}function Vt(e){if(typeof e!="object"||e===null)return null;const t=e;if(typeof t.prefix!="string"||!e.icons||typeof e.icons!="object"||!Te(e,Un))return null;const n=t.icons;for(const o in n){const i=n[o];if(!o.match(le)||typeof i.body!="string"||!Te(i,Pe))return null}const s=t.aliases||Object.create(null);for(const o in s){const i=s[o],r=i.parent;if(!o.match(le)||typeof r!="string"||!n[r]&&!s[r]||!Te(i,Pe))return null}return t}const bt=Object.create(null);function Gn(e,t){return{provider:e,prefix:t,icons:Object.create(null),missing:new Set}}function J(e,t){const n=bt[e]||(bt[e]=Object.create(null));return n[t]||(n[t]=Gn(e,t))}function He(e,t){return Vt(t)?Gt(t,(n,s)=>{s?e.icons[n]=s:e.missing.add(n)}):[]}function Vn(e,t,n){try{if(typeof n.body=="string")return e.icons[t]={...n},!0}catch{}return!1}let ue=!1;function Wt(e){return typeof e=="boolean"&&(ue=e),ue}function Wn(e){const t=typeof e=="string"?be(e,!0,ue):e;if(t){const n=J(t.provider,t.prefix),s=t.name;return n.icons[s]||(n.missing.has(s)?null:void 0)}}function Yn(e,t){const n=be(e,!0,ue);if(!n)return!1;const s=J(n.provider,n.prefix);return Vn(s,n.name,t)}function zn(e,t){if(typeof e!="object")return!1;if(typeof t!="string"&&(t=e.provider||""),ue&&!t&&!e.prefix){let o=!1;return Vt(e)&&(e.prefix="",Gt(e,(i,r)=>{r&&Yn(i,r)&&(o=!0)})),o}const n=e.prefix;if(!pe({provider:t,prefix:n,name:"a"}))return!1;const s=J(t,n);return!!He(s,e)}const Yt=Object.freeze({width:null,height:null}),zt=Object.freeze({...Yt,..._e}),Dn=/(-?[0-9.]*[0-9]+[0-9.]*)/g,qn=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function yt(e,t,n){if(t===1)return e;if(n=n||100,typeof e=="number")return Math.ceil(e*t*n)/n;if(typeof e!="string")return e;const s=e.split(Dn);if(s===null||!s.length)return e;const o=[];let i=s.shift(),r=qn.test(i);for(;;){if(r){const l=parseFloat(i);isNaN(l)?o.push(i):o.push(Math.ceil(l*t*n)/n)}else o.push(i);if(i=s.shift(),i===void 0)return o.join("");r=!r}}function Qn(e,t="defs"){let n="";const s=e.indexOf("<"+t);for(;s>=0;){const o=e.indexOf(">",s),i=e.indexOf("</"+t);if(o===-1||i===-1)break;const r=e.indexOf(">",i);if(r===-1)break;n+=e.slice(o+1,i).trim(),e=e.slice(0,s).trim()+e.slice(r+1)}return{defs:n,content:e}}function Jn(e,t){return e?"<defs>"+e+"</defs>"+t:t}function Xn(e,t,n){const s=Qn(e);return Jn(s.defs,t+s.content+n)}const Kn=e=>e==="unset"||e==="undefined"||e==="none";function Zn(e,t){const n={...ye,...e},s={...zt,...t},o={left:n.left,top:n.top,width:n.width,height:n.height};let i=n.body;[n,s].forEach(w=>{const d=[],A=w.hFlip,$=w.vFlip;let M=w.rotate;A?$?M+=2:(d.push("translate("+(o.width+o.left).toString()+" "+(0-o.top).toString()+")"),d.push("scale(-1 1)"),o.top=o.left=0):$&&(d.push("translate("+(0-o.left).toString()+" "+(o.height+o.top).toString()+")"),d.push("scale(1 -1)"),o.top=o.left=0);let O;switch(M<0&&(M-=Math.floor(M/4)*4),M=M%4,M){case 1:O=o.height/2+o.top,d.unshift("rotate(90 "+O.toString()+" "+O.toString()+")");break;case 2:d.unshift("rotate(180 "+(o.width/2+o.left).toString()+" "+(o.height/2+o.top).toString()+")");break;case 3:O=o.width/2+o.left,d.unshift("rotate(-90 "+O.toString()+" "+O.toString()+")");break}M%2===1&&(o.left!==o.top&&(O=o.left,o.left=o.top,o.top=O),o.width!==o.height&&(O=o.width,o.width=o.height,o.height=O)),d.length&&(i=Xn(i,'<g transform="'+d.join(" ")+'">',"</g>"))});const r=s.width,l=s.height,c=o.width,a=o.height;let u,p;r===null?(p=l===null?"1em":l==="auto"?a:l,u=yt(p,c/a)):(u=r==="auto"?c:r,p=l===null?yt(u,a/c):l==="auto"?a:l);const v={},f=(w,d)=>{Kn(d)||(v[w]=d.toString())};f("width",u),f("height",p);const _=[o.left,o.top,c,a];return v.viewBox=_.join(" "),{attributes:v,viewBox:_,body:i}}const eo=/\sid="(\S+)"/g,to="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let no=0;function oo(e,t=to){const n=[];let s;for(;s=eo.exec(e);)n.push(s[1]);if(!n.length)return e;const o="suffix"+(Math.random()*16777216|Date.now()).toString(16);return n.forEach(i=>{const r=typeof t=="function"?t(i):t+(no++).toString(),l=i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");e=e.replace(new RegExp('([#;"])('+l+')([")]|\\.[a-z])',"g"),"$1"+r+o+"$3")}),e=e.replace(new RegExp(o,"g"),""),e}const Ce=Object.create(null);function so(e,t){Ce[e]=t}function Ee(e){return Ce[e]||Ce[""]}function Be(e){let t;if(typeof e.resources=="string")t=[e.resources];else if(t=e.resources,!(t instanceof Array)||!t.length)return null;return{resources:t,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const Ue=Object.create(null),se=["https://api.simplesvg.com","https://api.unisvg.com"],ge=[];for(;se.length>0;)se.length===1||Math.random()>.5?ge.push(se.shift()):ge.push(se.pop());Ue[""]=Be({resources:["https://api.iconify.design"].concat(ge)});function ro(e,t){const n=Be(t);return n===null?!1:(Ue[e]=n,!0)}function Ge(e){return Ue[e]}const io=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}};let wt=io();function lo(e,t){const n=Ge(e);if(!n)return 0;let s;if(!n.maxURL)s=0;else{let o=0;n.resources.forEach(r=>{o=Math.max(o,r.length)});const i=t+".json?icons=";s=n.maxURL-o-n.path.length-i.length}return s}function co(e){return e===404}const ao=(e,t,n)=>{const s=[],o=lo(e,t),i="icons";let r={type:i,provider:e,prefix:t,icons:[]},l=0;return n.forEach((c,a)=>{l+=c.length+1,l>=o&&a>0&&(s.push(r),r={type:i,provider:e,prefix:t,icons:[]},l=c.length),r.icons.push(c)}),s.push(r),s};function uo(e){if(typeof e=="string"){const t=Ge(e);if(t)return t.path}return"/"}const fo=(e,t,n)=>{if(!wt){n("abort",424);return}let s=uo(t.provider);switch(t.type){case"icons":{const i=t.prefix,l=t.icons.join(","),c=new URLSearchParams({icons:l});s+=i+".json?"+c.toString();break}case"custom":{const i=t.uri;s+=i.slice(0,1)==="/"?i.slice(1):i;break}default:n("abort",400);return}let o=503;wt(e+s).then(i=>{const r=i.status;if(r!==200){setTimeout(()=>{n(co(r)?"abort":"next",r)});return}return o=501,i.json()}).then(i=>{if(typeof i!="object"||i===null){setTimeout(()=>{i===404?n("abort",i):n("next",o)});return}setTimeout(()=>{n("success",i)})}).catch(()=>{n("next",o)})},ho={prepare:ao,send:fo};function po(e){const t={loaded:[],missing:[],pending:[]},n=Object.create(null);e.sort((o,i)=>o.provider!==i.provider?o.provider.localeCompare(i.provider):o.prefix!==i.prefix?o.prefix.localeCompare(i.prefix):o.name.localeCompare(i.name));let s={provider:"",prefix:"",name:""};return e.forEach(o=>{if(s.name===o.name&&s.prefix===o.prefix&&s.provider===o.provider)return;s=o;const i=o.provider,r=o.prefix,l=o.name,c=n[i]||(n[i]=Object.create(null)),a=c[r]||(c[r]=J(i,r));let u;l in a.icons?u=t.loaded:r===""||a.missing.has(l)?u=t.missing:u=t.pending;const p={provider:i,prefix:r,name:l};u.push(p)}),t}function Dt(e,t){e.forEach(n=>{const s=n.loaderCallbacks;s&&(n.loaderCallbacks=s.filter(o=>o.id!==t))})}function go(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;const t=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!t.length)return;let n=!1;const s=e.provider,o=e.prefix;t.forEach(i=>{const r=i.icons,l=r.pending.length;r.pending=r.pending.filter(c=>{if(c.prefix!==o)return!0;const a=c.name;if(e.icons[a])r.loaded.push({provider:s,prefix:o,name:a});else if(e.missing.has(a))r.missing.push({provider:s,prefix:o,name:a});else return n=!0,!0;return!1}),r.pending.length!==l&&(n||Dt([e],i.id),i.callback(r.loaded.slice(0),r.missing.slice(0),r.pending.slice(0),i.abort))})}))}let mo=0;function vo(e,t,n){const s=mo++,o=Dt.bind(null,n,s);if(!t.pending.length)return o;const i={id:s,icons:t,callback:e,abort:o};return n.forEach(r=>{(r.loaderCallbacks||(r.loaderCallbacks=[])).push(i)}),o}function _o(e,t=!0,n=!1){const s=[];return e.forEach(o=>{const i=typeof o=="string"?be(o,t,n):o;i&&s.push(i)}),s}var bo={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function yo(e,t,n,s){const o=e.resources.length,i=e.random?Math.floor(Math.random()*o):e.index;let r;if(e.random){let x=e.resources.slice(0);for(r=[];x.length>1;){const P=Math.floor(Math.random()*x.length);r.push(x[P]),x=x.slice(0,P).concat(x.slice(P+1))}r=r.concat(x)}else r=e.resources.slice(i).concat(e.resources.slice(0,i));const l=Date.now();let c="pending",a=0,u,p=null,v=[],f=[];typeof s=="function"&&f.push(s);function _(){p&&(clearTimeout(p),p=null)}function w(){c==="pending"&&(c="aborted"),_(),v.forEach(x=>{x.status==="pending"&&(x.status="aborted")}),v=[]}function d(x,P){P&&(f=[]),typeof x=="function"&&f.push(x)}function A(){return{startTime:l,payload:t,status:c,queriesSent:a,queriesPending:v.length,subscribe:d,abort:w}}function $(){c="failed",f.forEach(x=>{x(void 0,u)})}function M(){v.forEach(x=>{x.status==="pending"&&(x.status="aborted")}),v=[]}function O(x,P,N){const B=P!=="success";switch(v=v.filter(F=>F!==x),c){case"pending":break;case"failed":if(B||!e.dataAfterTimeout)return;break;default:return}if(P==="abort"){u=N,$();return}if(B){u=N,v.length||(r.length?G():$());return}if(_(),M(),!e.random){const F=e.resources.indexOf(x.resource);F!==-1&&F!==e.index&&(e.index=F)}c="completed",f.forEach(F=>{F(N)})}function G(){if(c!=="pending")return;_();const x=r.shift();if(x===void 0){if(v.length){p=setTimeout(()=>{_(),c==="pending"&&(M(),$())},e.timeout);return}$();return}const P={status:"pending",resource:x,callback:(N,B)=>{O(P,N,B)}};v.push(P),a++,p=setTimeout(G,e.rotate),n(x,t,P.callback)}return setTimeout(G),A}function qt(e){const t={...bo,...e};let n=[];function s(){n=n.filter(l=>l().status==="pending")}function o(l,c,a){const u=yo(t,l,c,(p,v)=>{s(),a&&a(p,v)});return n.push(u),u}function i(l){return n.find(c=>l(c))||null}return{query:o,find:i,setIndex:l=>{t.index=l},getIndex:()=>t.index,cleanup:s}}function xt(){}const ke=Object.create(null);function wo(e){if(!ke[e]){const t=Ge(e);if(!t)return;const n=qt(t),s={config:t,redundancy:n};ke[e]=s}return ke[e]}function xo(e,t,n){let s,o;if(typeof e=="string"){const i=Ee(e);if(!i)return n(void 0,424),xt;o=i.send;const r=wo(e);r&&(s=r.redundancy)}else{const i=Be(e);if(i){s=qt(i);const r=e.resources?e.resources[0]:"",l=Ee(r);l&&(o=l.send)}}return!s||!o?(n(void 0,424),xt):s.query(t,o,n)().abort}const St="iconify2",fe="iconify",Qt=fe+"-count",It=fe+"-version",Jt=36e5,So=168,Io=50;function Me(e,t){try{return e.getItem(t)}catch{}}function Ve(e,t,n){try{return e.setItem(t,n),!0}catch{}}function Tt(e,t){try{e.removeItem(t)}catch{}}function $e(e,t){return Ve(e,Qt,t.toString())}function Ae(e){return parseInt(Me(e,Qt))||0}const we={local:!0,session:!0},Xt={local:new Set,session:new Set};let We=!1;function To(e){We=e}let he=typeof window>"u"?{}:window;function Kt(e){const t=e+"Storage";try{if(he&&he[t]&&typeof he[t].length=="number")return he[t]}catch{}we[e]=!1}function Zt(e,t){const n=Kt(e);if(!n)return;const s=Me(n,It);if(s!==St){if(s){const l=Ae(n);for(let c=0;c<l;c++)Tt(n,fe+c.toString())}Ve(n,It,St),$e(n,0);return}const o=Math.floor(Date.now()/Jt)-So,i=l=>{const c=fe+l.toString(),a=Me(n,c);if(typeof a=="string"){try{const u=JSON.parse(a);if(typeof u=="object"&&typeof u.cached=="number"&&u.cached>o&&typeof u.provider=="string"&&typeof u.data=="object"&&typeof u.data.prefix=="string"&&t(u,l))return!0}catch{}Tt(n,c)}};let r=Ae(n);for(let l=r-1;l>=0;l--)i(l)||(l===r-1?(r--,$e(n,r)):Xt[e].add(l))}function en(){if(!We){To(!0);for(const e in we)Zt(e,t=>{const n=t.data,s=t.provider,o=n.prefix,i=J(s,o);if(!He(i,n).length)return!1;const r=n.lastModified||-1;return i.lastModifiedCached=i.lastModifiedCached?Math.min(i.lastModifiedCached,r):r,!0})}}function ko(e,t){const n=e.lastModifiedCached;if(n&&n>=t)return n===t;if(e.lastModifiedCached=t,n)for(const s in we)Zt(s,o=>{const i=o.data;return o.provider!==e.provider||i.prefix!==e.prefix||i.lastModified===t});return!0}function Lo(e,t){We||en();function n(s){let o;if(!we[s]||!(o=Kt(s)))return;const i=Xt[s];let r;if(i.size)i.delete(r=Array.from(i).shift());else if(r=Ae(o),r>=Io||!$e(o,r+1))return;const l={cached:Math.floor(Date.now()/Jt),provider:e.provider,data:t};return Ve(o,fe+r.toString(),JSON.stringify(l))}t.lastModified&&!ko(e,t.lastModified)||Object.keys(t.icons).length&&(t.not_found&&(t=Object.assign({},t),delete t.not_found),n("local")||n("session"))}function kt(){}function Oo(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,go(e)}))}function Po(e,t){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(t).sort():e.iconsToLoad=t,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{e.iconsQueueFlag=!1;const{provider:n,prefix:s}=e,o=e.iconsToLoad;delete e.iconsToLoad;let i;if(!o||!(i=Ee(n)))return;i.prepare(n,s,o).forEach(l=>{xo(n,l,c=>{if(typeof c!="object")l.icons.forEach(a=>{e.missing.add(a)});else try{const a=He(e,c);if(!a.length)return;const u=e.pendingIcons;u&&a.forEach(p=>{u.delete(p)}),Lo(e,c)}catch(a){console.error(a)}Oo(e)})})}))}const Co=(e,t)=>{const n=_o(e,!0,Wt()),s=po(n);if(!s.pending.length){let c=!0;return t&&setTimeout(()=>{c&&t(s.loaded,s.missing,s.pending,kt)}),()=>{c=!1}}const o=Object.create(null),i=[];let r,l;return s.pending.forEach(c=>{const{provider:a,prefix:u}=c;if(u===l&&a===r)return;r=a,l=u,i.push(J(a,u));const p=o[a]||(o[a]=Object.create(null));p[u]||(p[u]=[])}),s.pending.forEach(c=>{const{provider:a,prefix:u,name:p}=c,v=J(a,u),f=v.pendingIcons||(v.pendingIcons=new Set);f.has(p)||(f.add(p),o[a][u].push(p))}),i.forEach(c=>{const{provider:a,prefix:u}=c;o[a][u].length&&Po(c,o[a][u])}),t?vo(t,s,i):kt};function Eo(e,t){const n={...e};for(const s in t){const o=t[s],i=typeof o;s in Yt?(o===null||o&&(i==="string"||i==="number"))&&(n[s]=o):i===typeof n[s]&&(n[s]=s==="rotate"?o%4:o)}return n}const Mo=/[\s,]+/;function $o(e,t){t.split(Mo).forEach(n=>{switch(n.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}function Ao(e,t=0){const n=e.replace(/^-?[0-9.]*/,"");function s(o){for(;o<0;)o+=4;return o%4}if(n===""){const o=parseInt(e);return isNaN(o)?0:s(o)}else if(n!==e){let o=0;switch(n){case"%":o=25;break;case"deg":o=90}if(o){let i=parseFloat(e.slice(0,e.length-n.length));return isNaN(i)?0:(i=i/o,i%1===0?s(i):0)}}return t}function jo(e,t){let n=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const s in t)n+=" "+s+'="'+t[s]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+e+"</svg>"}function Fo(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function Ro(e){return"data:image/svg+xml,"+Fo(e)}function No(e){return'url("'+Ro(e)+'")'}const Lt={...zt,inline:!1},Ho={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},Bo={display:"inline-block"},je={backgroundColor:"currentColor"},tn={backgroundColor:"transparent"},Ot={Image:"var(--svg)",Repeat:"no-repeat",Size:"100% 100%"},Pt={webkitMask:je,mask:je,background:tn};for(const e in Pt){const t=Pt[e];for(const n in Ot)t[e+n]=Ot[n]}const me={};["horizontal","vertical"].forEach(e=>{const t=e.slice(0,1)+"Flip";me[e+"-flip"]=t,me[e.slice(0,1)+"-flip"]=t,me[e+"Flip"]=t});function Ct(e){return e+(e.match(/^[-0-9.]+$/)?"px":"")}const Et=(e,t)=>{const n=Eo(Lt,t),s={...Ho},o=t.mode||"svg",i={},r=t.style,l=typeof r=="object"&&!(r instanceof Array)?r:{};for(let w in t){const d=t[w];if(d!==void 0)switch(w){case"icon":case"style":case"onLoad":case"mode":break;case"inline":case"hFlip":case"vFlip":n[w]=d===!0||d==="true"||d===1;break;case"flip":typeof d=="string"&&$o(n,d);break;case"color":i.color=d;break;case"rotate":typeof d=="string"?n[w]=Ao(d):typeof d=="number"&&(n[w]=d);break;case"ariaHidden":case"aria-hidden":d!==!0&&d!=="true"&&delete s["aria-hidden"];break;default:{const A=me[w];A?(d===!0||d==="true"||d===1)&&(n[A]=!0):Lt[w]===void 0&&(s[w]=d)}}}const c=Zn(e,n),a=c.attributes;if(n.inline&&(i.verticalAlign="-0.125em"),o==="svg"){s.style={...i,...l},Object.assign(s,a);let w=0,d=t.id;return typeof d=="string"&&(d=d.replace(/-/g,"_")),s.innerHTML=oo(c.body,d?()=>d+"ID"+w++:"iconifyVue"),mt("svg",s)}const{body:u,width:p,height:v}=e,f=o==="mask"||(o==="bg"?!1:u.indexOf("currentColor")!==-1),_=jo(u,{...a,width:p+"",height:v+""});return s.style={...i,"--svg":No(_),width:Ct(a.width),height:Ct(a.height),...Bo,...f?je:tn,...l},mt("span",s)};Wt(!0);so("",ho);if(typeof document<"u"&&typeof window<"u"){en();const e=window;if(e.IconifyPreload!==void 0){const t=e.IconifyPreload,n="Invalid IconifyPreload syntax.";typeof t=="object"&&t!==null&&(t instanceof Array?t:[t]).forEach(s=>{try{(typeof s!="object"||s===null||s instanceof Array||typeof s.icons!="object"||typeof s.prefix!="string"||!zn(s))&&console.error(n)}catch{console.error(n)}})}if(e.IconifyProviders!==void 0){const t=e.IconifyProviders;if(typeof t=="object"&&t!==null)for(let n in t){const s="IconifyProviders["+n+"] is invalid.";try{const o=t[n];if(typeof o!="object"||!o||o.resources===void 0)continue;ro(n,o)||console.error(s)}catch{console.error(s)}}}}const Uo={...ye,body:""},re=Fe({inheritAttrs:!1,data(){return{_name:"",_loadingIcon:null,iconMounted:!1,counter:0}},mounted(){this.iconMounted=!0},unmounted(){this.abortLoading()},methods:{abortLoading(){this._loadingIcon&&(this._loadingIcon.abort(),this._loadingIcon=null)},getIcon(e,t){if(typeof e=="object"&&e!==null&&typeof e.body=="string")return this._name="",this.abortLoading(),{data:e};let n;if(typeof e!="string"||(n=be(e,!1,!0))===null)return this.abortLoading(),null;const s=Wn(n);if(!s)return(!this._loadingIcon||this._loadingIcon.name!==e)&&(this.abortLoading(),this._name="",s!==null&&(this._loadingIcon={name:e,abort:Co([n],()=>{this.counter++})})),null;this.abortLoading(),this._name!==e&&(this._name=e,t&&t(e));const o=["iconify"];return n.prefix!==""&&o.push("iconify--"+n.prefix),n.provider!==""&&o.push("iconify--"+n.provider),{data:s,classes:o}}},render(){this.counter;const e=this.$attrs,t=this.iconMounted||e.ssr?this.getIcon(e.icon,e.onLoad):null;if(!t)return Et(Uo,e);let n=e;return t.classes&&(n={...e,class:(typeof e.class=="string"?e.class+" ":"")+t.classes.join(" ")}),Et({...ye,...t.data},n)}}),xe=e=>(dn("data-v-cbebf831"),e=e(),hn(),e),Go={class:"mcontent container"},Vo={key:0,id:"main",class:"articlebox row"},Wo={class:"Htitle col-12"},Yo={class:"d-flex justify-content-between align-items-center mt-2 mb-4 article-header"},zo={class:"d-flex gap-3 align-items-center mb-2"},Do={class:"d-flex gap-2 align-items-center"},qo=xe(()=>g("img",{src:Rn,width:"18px",height:"18px",alt:"user",title:"user"},null,-1)),Qo={class:""},Jo={key:0,class:"d-flex gap-3"},Xo={class:"fs-18 fw-500"},Ko=["href","alt","title","rel"],Zo={key:0,class:"d-flex align-items-center w-100"},es=xe(()=>g("br",null,null,-1)),ts=["innerHTML"],ns=["innerHTML"],os=xe(()=>g("br",null,null,-1)),ss={key:1,class:"d-flex gap-1 align-items-center share-social"},rs=["href"],is=["href"],ls=["href"],cs=["href"],as=xe(()=>g("br",null,null,-1)),us={key:0,class:"right col-12 col-md-4"},fs={key:0,class:"side-box"},ds={class:"box"},hs={class:"tagtitle"},ps={class:"side-box"},gs={class:"Htitle"},ms=["onClick"],vs={class:"artimg"},_s=["src","alt"],bs={class:"match"},ys=Fe({__name:"ContentPost",async setup(e){var E,T,H,R,b,V,z,ee,te,Ye,ze,De,qe,Qe,Je,Xe,Ke,Ze,et,tt;let t,n;const{useLocale:s,$t:o,$trouter:i}=Re(),r=y(null),l=y([]);y([]),y(1),y(!0);const c=Mt();$t();const a=Bt(),u=y(a.params.slug),p=y([{label:"",to:"",last:"off"},{label:"",to:"",last:"on"}]),v=K(()=>l.value.findIndex(k=>k.slug===r.value.slug));K(()=>l.value[v.value-1]),K(()=>l.value[v.value+1]);const f=y([]),_=q(c.configurations,"image_size");f.value=_==null?void 0:_.split(",");const w=y(0),d=y(),A=y();y();const $=y(),M=y(),O=y(),G=y(),x=rn(),P="https://"+x.hostname+x.pathname,N=y(q(c.configurations,"OPTION_FOLLOW_SOCIAL")),B=y(q(c.configurations,"OPTION_SHARE_SOCIAL"));let F=q(c.configurations,"followsocial");G.value=F?JSON.parse(F):[];const Z=K(()=>{var k,X,D;return w.value<U.MD&&((k=f==null?void 0:f.value)==null?void 0:k.length)>=1?f.value[1]:w.value>=U.MD&&w.value<U.LG&&((X=f==null?void 0:f.value)==null?void 0:X.length)>=2?f.value[2]:w.value>=U.LG&&w.value<U.XXL&&((D=f==null?void 0:f.value)==null?void 0:D.length)>=3?f.value[3]:""}),{data:h}=([t,n]=Ne(()=>ce(Le(ae.POST.SLUG+"?slug="+u.value,{}),"$9icYSM8L8v")),t=await t,n(),t);return h!=null&&h.value||ln({statusCode:404,statusMessage:o("Article does not exist")}),r.value=h==null?void 0:h.value,d.value=(E=r.value)==null?void 0:E.title,A.value=((T=r.value)==null?void 0:T.meta_description)??((H=r.value)==null?void 0:H.summary),$.value=(R=r.value)==null?void 0:R.type,M.value=(b=r.value)==null?void 0:b.keyword,O.value=(V=r.value)==null?void 0:V.is_index_flag,(te=(ee=(z=h==null?void 0:h.value)==null?void 0:z.post_brand_category)==null?void 0:ee[0])!=null&&te.slug?(p.value[0].label=(ze=(Ye=h==null?void 0:h.value)==null?void 0:Ye.post_brand_category)==null?void 0:ze[0].name,p.value[0].to=(Qe=(qe=(De=h==null?void 0:h.value)==null?void 0:De.post_brand_category)==null?void 0:qe[0])!=null&&Qe.slug?"/"+((Xe=(Je=h==null?void 0:h.value)==null?void 0:Je.post_brand_category)==null?void 0:Xe[0].slug):"",p.value[1].label=(Ke=h==null?void 0:h.value)==null?void 0:Ke.title,p.value[1].to="/"+((Ze=h==null?void 0:h.value)==null?void 0:Ze.slug)):(p.value[0].label=(et=h==null?void 0:h.value)==null?void 0:et.title,p.value[0].to="/"+((tt=h==null?void 0:h.value)==null?void 0:tt.slug),p.value[0].last="on",p.value=p.value.slice(0,1)),ve({title:()=>d.value,meta:[{name:"description",content:()=>A.value},{property:"og:title",content:()=>d.value},{property:"og:description",content:()=>A.value},{name:"keywords",content:()=>M.value}]}),ve(()=>({meta:[{name:"robots",content:O.value?"index, follow":"noindex, follow"}]})),(async()=>{try{await ce(Le(ae.POST.LIST,{query:{limit:un}}),"$pW41BUNvBH").then(k=>{var X,D,de;l.value=(de=(D=(X=k==null?void 0:k.data)==null?void 0:X.value)==null?void 0:D.posts)==null?void 0:de.filter(ne=>(ne==null?void 0:ne.slug)!==u.value)})}catch{}})(),At(()=>{w.value=window.innerWidth,window.addEventListener("resize",()=>{w.value=window.innerWidth})}),(k,X)=>{var nt,ot,st,rt,it,lt,ct,at,ut,ft,dt,ht,pt,gt;const D=Nt,de=fn,ne=Ht;return L(),C(Q,null,[W(D,{breadcrumbs:p.value},null,8,["breadcrumbs"]),g("div",Go,[r.value?(L(),C("div",Vo,[g("h1",Wo,j((nt=r.value)==null?void 0:nt.title),1),g("div",{class:Rt(["left",$.value===("POST_TYPE"in k?k.POST_TYPE:I(Ie)).POST?"col-12 col-md-8":"col-12 col-md-12"])},[g("div",Yo,[g("div",zo,[g("div",Do,[qo,g("small",null,j((st=(ot=r.value)==null?void 0:ot.user)==null?void 0:st.name),1)]),g("div",null,[g("small",Qo,j((rt=r.value)!=null&&rt.published_time?("formatTimeSince"in k?k.formatTimeSince:I(Ft))((it=r.value)==null?void 0:it.published_time,I(s)):""),1)])]),N.value==="True"?(L(),C("div",Jo,[g("div",Xo,j(I(o)("Follow"))+": ",1),(L(!0),C(Q,null,ie(G.value,(m,Se)=>{var oe;return L(),C("a",{class:"followsocial",href:m==null?void 0:m.url,alt:m==null?void 0:m.iconcode,title:(oe=r.value)==null?void 0:oe.title,rel:m!=null&&m.followurl?"dofollow":"nofollow",target:"_blank"},[W(I(re),{icon:m==null?void 0:m.iconcode,inline:!0,style:{fontSize:"25px"},class:"table-icon"},null,8,["icon"])],8,Ko)}),256))])):Y("",!0)]),$.value===("POST_TYPE"in k?k.POST_TYPE:I(Ie)).POST?(L(),C("div",Zo,[W(de,{src:(ct=(lt=r.value)==null?void 0:lt.thumbnail)==null?void 0:ct.file_path,alt:(at=r.value)==null?void 0:at.title,class:"w-100"},null,8,["src","alt"]),es])):Y("",!0),g("p",{class:"mt-3",innerHTML:(ut=r.value)==null?void 0:ut.summary,style:{"font-style":"italic"}},null,8,ts),g("div",{class:"mt-3",innerHTML:(ft=r.value)==null?void 0:ft.content},null,8,ns),os,B.value==="True"?(L(),C("div",ss,[vt(j(I(o)("Share"))+": ",1),g("a",{href:"https://www.facebook.com/sharer.php?u="+P,"data-label":"Facebook",onclick:"window.open(this.href,this.title,'width=500,height=500,top=300px,left=300px'); return false;",rel:"noopener noreferrer nofollow",target:"_blank",class:"fa fa-facebook","aria-label":"Share on Facebook"},[W(I(re),{icon:"tabler-brand-facebook",inline:!0,style:{fontSize:"25px"},color:"#fff"})],8,rs),g("a",{href:"https://twitter.com/share?url="+P,class:"fa fa-twitter","data-label":"Twitter",onclick:"window.open(this.href,this.title,'width=500,height=500,top=300px,left=300px'); return false;",rel:"noopener noreferrer nofollow",target:"_blank","aria-label":"Share on Twitter"},[W(I(re),{icon:"tabler:brand-x",inline:!0,style:{fontSize:"25px"},color:"#fff"})],8,is),g("a",{href:"https://t.me/share/url?url="+P+"&text="+((dt=r.value)==null?void 0:dt.title),class:"fa fa-telegram","data-label":"Telegram",onclick:"window.open(this.href,this.title,'width=500,height=500,top=300px,left=300px'); return false;",rel:"noopener noreferrer nofollow",target:"_blank","aria-label":"Share on Telegram"},[W(I(re),{icon:"tabler:brand-telegram",inline:!0,style:{fontSize:"25px"},color:"#fff"})],8,ls),g("a",{href:"https://www.linkedin.com/shareArticle?mini=true&url="+P,class:"fa fa-linkedin","data-label":"Linkedin",onclick:"window.open(this.href,this.title,'width=500,height=500,top=300px,left=300px'); return false;",rel:"noopener noreferrer nofollow",target:"_blank","aria-label":"Share on Linkedin"},[W(I(re),{icon:"tabler:brand-linkedin",inline:!0,style:{fontSize:"25px"},color:"#fff"})],8,cs)])):Y("",!0),as],2),$.value===("POST_TYPE"in k?k.POST_TYPE:I(Ie)).POST?(L(),C("div",us,[((pt=(ht=r.value)==null?void 0:ht.post_brand_tag)==null?void 0:pt.length)>0?(L(),C("div",fs,[g("div",ds,[g("div",hs,j(I(o)("TAGS")),1),(L(!0),C(Q,null,ie((gt=r.value)==null?void 0:gt.post_brand_tag,m=>(L(),Oe(ne,{key:m==null?void 0:m.id,class:"tags",to:("ROUTERS_OLD"in k?k.ROUTERS_OLD:I(cn)).NEWS_TAG+"/"+(m==null?void 0:m.code)},{default:jt(()=>[vt(j(m==null?void 0:m.name),1)]),_:2},1032,["to"]))),128))])])):Y("",!0),g("div",ps,[g("div",gs,j(I(o)("Latest News")),1),g("ul",null,[(L(!0),C(Q,null,ie(l.value,m=>{var Se,oe;return L(),C("li",{key:m==null?void 0:m.id,class:"article d-flex",onClick:Ss=>("locationHref"in k?k.locationHref:I(an))("/"+(m==null?void 0:m.slug))},[g("div",vs,[g("img",{src:Z.value?`${(Se=m==null?void 0:m.thumbnail)==null?void 0:Se.file_path}!${Z.value}`:(oe=m==null?void 0:m.thumbnail)==null?void 0:oe.file_path,alt:m.title},null,8,_s)]),g("div",bs,j(m==null?void 0:m.title),1)],8,ms)}),128))])])])):Y("",!0)])):Y("",!0)])],64)}}}),ws=pn(ys,[["__scopeId","data-v-cbebf831"]]),xs={style:{"min-height":"80vh"}},ks={__name:"[slug]",async setup(e){let t,n;const s=gn("category-state",()=>[]),o=Bt(),{isNavVisible:i}=Re();i.value=!1;const r=y(null),l=a=>{for(const u of a)u.code===o.params.slug&&(r.value=!0);r.value===null&&(r.value=!1)},c=async()=>{var a,u,p,v,f;try{if((a=s.value)!=null&&a.length){l(s.value);return}const{data:_}=await ce(ae.POST.CATEGORY.LIST,"$f42VrABMu9");(p=(u=_==null?void 0:_.value)==null?void 0:u.post_categories)!=null&&p.length&&(s.value=(v=_==null?void 0:_.value)==null?void 0:v.post_categories,l((f=_==null?void 0:_.value)==null?void 0:f.post_categories))}catch{}};return[t,n]=Ne(()=>c()),await t,n(),(a,u)=>{const p=Fn,v=ws;return L(),C("div",xs,[I(r)===!0?(L(),Oe(p,{key:0})):Y("",!0),I(r)===!1?(L(),Oe(v,{key:1})):Y("",!0)])}}};export{ks as default};
