import{_ as X}from"./D6dhIOhx.js";import{_ as j}from"./B0K9VZkx.js";import{_ as F,q as P,r as s,b as Z,o as a,c,h as t,m as R,i as e,y as x,A as C,v as V,x as ee,k as O,bG as te,F as H,z,B as se,l as _,C as G,D as K,f as oe,w as D,g as ae,j as ce,K as ne,aa as le}from"./DWGr-Zqp.js";import{m as M,u as U}from"./owq-pGZu.js";import{useIntersectionObserver as q,onClickOutside as ie}from"./BN1EXK5Q.js";import{A as Y}from"./yrA-jQKW.js";import{g as L,j as re}from"./3bue5Vy1.js";import{s as de}from"./DpHY5NEn.js";import"./C5R4H73m.js";import"./CyO-JZlX.js";import"./Cbzb-SDH.js";import"./C4iS2aBk.js";import"./DRizsLw2.js";import"./DUjn5l1T.js";import"./DSYfm7We.js";import"./cGgey60k.js";const _e=u=>(G("data-v-548d5c96"),u=u(),K(),u),ue={class:"select-box"},pe={class:"select-box__value"},ve={class:"select-box__list"},me={class:"select-box__list-input"},he={class:"select-box__list-comp"},fe=["onClick"],ge={class:"select-box__option",for:"0","aria-hidden":"true"},ye={key:0},xe={class:"d-flex flex-column align-items-center mt-5"},we=_e(()=>t("p",{class:"fw-bold text-center mt-3"},"Chưa có dữ liệu",-1)),be={__name:"BaseDropdown",props:{info:{},infoModifiers:{},compActive:{},compActiveModifiers:{}},emits:["update:info","update:compActive"],setup(u){const T=P(u,"info"),h=s(!1),w=s(null),i=s(),v=s(null),f=s(1),r=s(""),n=P(u,"compActive"),E=Z(()=>r.value?T.value.filter(l=>l.comp_name.toLowerCase().includes(r.value.toLowerCase())):T.value.slice(0,f.value*20));return q(v,([{isIntersecting:l}])=>{l&&(r.value||(f.value=f.value+1))}),ie(w,()=>h.value=!1,{ignore:[i]}),(l,b)=>{var $,g,A,k;const y=j;return a(),c("div",ue,[t("div",{ref_key:"target",ref:w,onClick:b[0]||(b[0]=o=>h.value=!e(h)),class:"select-box__current",tabindex:"1"},[t("div",pe,[t("div",{class:R(["select-box__input-text",{"select-box__input-text--active":e(h)}])},[x(y,{src:(($=n.value)==null?void 0:$.id)!==1?("getLiveScoreImage"in l?l.getLiveScoreImage:e(M))((g=n.value)==null?void 0:g.comp_logo,"competition")+"!h20":n.value.comp_logo,alt:(A=n.value)==null?void 0:A.comp_name},null,8,["src","alt"]),t("div",null,C((k=n.value)==null?void 0:k.comp_name),1)],2)]),x(y,{class:R(["select-box__icon",{"select-box__icon--active":e(h)}]),src:"/img/dropdown.svg",alt:"Arrow Icon","aria-hidden":"true"},null,8,["class"])],512),V(t("ul",ve,[t("div",me,[V(t("input",{"onUpdate:modelValue":b[1]||(b[1]=o=>O(r)?r.value=o:null),ref_key:"ignoreElRef",ref:i,type:"text",class:"input-search mb-1",placeholder:"Nhập tên giải đấu..."},null,512),[[te,e(r)]])]),t("div",he,[(a(!0),c(H,null,z(e(E),(o,S)=>(a(),c("li",{onClick:B=>n.value=o,key:S,class:R({"item--active":n.value.id===o.id})},[t("div",ge,[x(y,{width:"15px",src:o.id!==1?("getLiveScoreImage"in l?l.getLiveScoreImage:e(M))(o==null?void 0:o.comp_logo,"competition")+"!h20":o.comp_logo,alt:(o==null?void 0:o.comp_name_vi)??(o==null?void 0:o.comp_name)},null,8,["src","alt"]),se(" "+C(o.comp_name),1)])],10,fe))),128)),e(E).length?_("",!0):(a(),c("div",ye,[t("div",xe,[x(y,{class:"nodata_pic",alt:"nodata pic",width:"150",height:"150",src:"/icon/nodata.svg"})]),we])),t("div",{ref_key:"el",ref:v,style:{opacity:"0"}},"-",512)])],512),[[ee,e(h)]])])}}},ke=F(be,[["__scopeId","data-v-548d5c96"]]),I=u=>(G("data-v-52bacf18"),u=u(),K(),u),Ie={class:"container bg-white team"},Se={class:"team__header"},Ce=I(()=>t("div",{class:"title"},"Đội Bóng Đá",-1)),Te={class:"team__header-right"},$e={class:"mt-3"},Ae={key:0,class:"team__item-img"},Ee={key:1,class:"card-text placeholder-glow"},Le=I(()=>t("span",{class:"placeholder bg-secondary",style:{width:"60px",height:"60px","border-radius":"50%"}},null,-1)),Oe=[Le],Re=["onClick"],Me={key:1,class:"card-text placeholder-glow"},Be=I(()=>t("span",{class:"placeholder bg-secondary",style:{width:"100px"}},null,-1)),Ne=[Be],Pe={key:2,class:"team__item-country"},Ve={key:3,class:"card-text placeholder-glow mb-2"},De=I(()=>t("span",{class:"placeholder bg-secondary",style:{width:"50px"}},null,-1)),Ue=[De],Ye={key:0,class:"team__loading"},je=I(()=>t("div",{class:"spinner-border text-success",role:"status"},[t("span",{class:"visually-hidden"},"Loading...")],-1)),Fe=[je],He={key:0,class:"loading mx-auto d-flex justify-content-center"},ze=I(()=>t("div",{class:"spinner-border text-success",role:"status"},[t("span",{class:"visually-hidden"},"Loading...")],-1)),Ge=[ze],Ke={key:1,class:"mt-5"},qe={class:"d-flex flex-column align-items-center"},We=I(()=>t("p",{class:"fw-bold text-center mt-3"},"Chưa có dữ liệu",-1)),Je={id:"content-page",class:"mt-5"},Qe={key:0,class:"page_title"},Xe={class:"text-center"},Ze={__name:"index",async setup(u){let T,h;const w=de(),i=s(!1),v=s([]),f=s(""),r=s(1),n=s([]),E=s(102),l=s(null),b=s(null),y=s(null),$=s(null),g=s({id:1,comp_name:"Tất cả",comp_logo:"/icon/player-statistics/1.png"}),A=s(null),k=s(!1);(async()=>{await U(Y.LIVESCORE.COMP_LIST_ALL,[]).then(d=>{d&&(v.value=d,v.value=[{id:1,comp_name:"Tất cả",comp_logo:"/icon/player-statistics/1.png"},...v.value])})})(),q(A,([{isIntersecting:d}])=>{try{d&&n.value.length>=100&&!k.value&&(r.value=r.value+1,S(!0))}catch{}});const S=async(d=!1)=>{d||(i.value=!0),d&&(k.value=!0),await U(`${Y.LIVESCORE.TEAM_LIST}?page=${r.value}&limit=${E.value}&competition-id=${g.value.id===1?"":g.value.id}&name=${f.value}`).then(m=>{m&&(d?n.value=[...n.value,...m]:n.value=m)}).finally(()=>{i.value=!1,k.value=!1})};[T,h]=oe(()=>S()),await T,h();const B=re(()=>{r.value=1,S()},300);return D(()=>f.value,()=>{B()}),D(()=>g.value,()=>{r.value=1,S()}),(()=>{try{l.value=L(w.configurations,"TEAM_TITLE_REPOSITORY"),y.value=L(w.configurations,"TEAM_DESCRIPTION_REPOSITORY"),$.value=L(w.configurations,"TEAM_KEYWORD_REPOSITORY"),b.value=L(w.configurations,"TEAM_CONTENT_REPOSITORY")}catch{}})(),ae({title:l.value,meta:[{name:"description",content:y.value},{property:"og:title",content:l.value},{property:"og:description",content:y.value},{name:"keywords",content:$.value}]}),(d,m)=>{const W=X,J=ke,N=j;return a(),c("div",Ie,[t("div",Se,[Ce,t("div",Te,[x(W,{search:e(f),"onUpdate:search":m[0]||(m[0]=p=>O(f)?f.value=p:null)},null,8,["search"]),e(v)?(a(),ce(J,{key:0,info:e(v),"onUpdate:info":m[1]||(m[1]=p=>O(v)?v.value=p:null),compActive:e(g),"onUpdate:compActive":m[2]||(m[2]=p=>O(g)?g.value=p:null)},null,8,["info","compActive"])):_("",!0)])]),t("div",$e,[x(le,{name:"list",tag:"div",class:"team__list"},{default:ne(()=>[(a(!0),c(H,null,z(e(n),(p,Q)=>(a(),c("div",{key:Q,class:"team__item"},[e(i)?_("",!0):(a(),c("div",Ae,[x(N,{src:("getLiveScoreImage"in d?d.getLiveScoreImage:e(M))(p.logo_o,"team")+"!h50",alt:p.logo_o,imgDefault:"/img/team-default.png"},null,8,["src","alt"])])),e(i)?(a(),c("p",Ee,Oe)):_("",!0),t("div",null,[e(i)?_("",!0):(a(),c("div",{key:0,onClick:tt=>d.$router.push(`/team/${p.id}`),class:"team__item-name"},C(p.name),9,Re)),e(i)?(a(),c("p",Me,Ne)):_("",!0),e(i)?_("",!0):(a(),c("div",Pe,C(p.country_name),1)),e(i)?(a(),c("p",Ve,Ue)):_("",!0)])]))),128))]),_:1}),!e(n).length&&e(i)?(a(),c("div",Ye,Fe)):_("",!0)]),e(k)?(a(),c("div",He,Ge)):_("",!0),t("div",{ref_key:"el",ref:A,style:{opacity:"0"}},"infiniti",512),!e(n).length&&!e(i)?(a(),c("div",Ke,[t("div",qe,[x(N,{class:"nodata_pic",alt:"nodata pic",width:"200",height:"200",src:"/icon/nodata.svg"})]),We])):_("",!0),t("div",Je,[e(l)?(a(),c("h1",Qe,C(e(l)),1)):_("",!0),t("div",Xe,C(e(b)),1)])])}}},gt=F(Ze,[["__scopeId","data-v-52bacf18"]]);export{gt as default};
