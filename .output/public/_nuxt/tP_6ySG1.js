import{_ as te}from"./BjUJeP8R.js";import{_ as K,bL as q,bh as U,aN as o,s as se,cJ as G,df as oe,o as a,c as n,w as t,aq as V,bd as e,J as b,bT as P,b4 as f,bA as Y,bq as ae,ah as B,bp as le,F as j,aQ as z,I as ne,v,bX as Q,bI as ce,bx as ie,bt as F,cR as de,u as re,by as _e,i as ue,c9 as J,ca as H,bJ as N,aJ as ve,aG as pe,dg as me}from"./DOQYW4P8.js";const he={class:"select-box"},ge={class:"select-box__value"},fe={class:"select-box__list"},ye={class:"select-box__list-input"},be=["placeholder"],xe={class:"select-box__list-comp"},we=["onClick"],Ie={class:"select-box__option",for:"0","aria-hidden":"true"},Se={key:0},$e={class:"d-flex flex-column align-items-center mt-5"},ke={class:"fw-bold text-center mt-3"},Te={__name:"BaseDropdown",props:{info:{},infoModifiers:{},compActive:{},compActiveModifiers:{}},emits:["update:info","update:compActive"],setup(x){const{$t:C}=q(),k=s=>{const h=`${s} team`,_=C(h);return _!==h?_:s},E=U(x,"info"),m=o(!1),R=o(null),w=o(),I=o(null),i=o(1),d=o(""),r=U(x,"compActive"),y=se(()=>d.value?E.value.filter(s=>s.comp_name.toLowerCase().includes(d.value.toLowerCase())):E.value.slice(0,i.value*20));return G(I,([{isIntersecting:s}])=>{s&&(d.value||(i.value=i.value+1))}),oe(R,()=>m.value=!1,{ignore:[w]}),(s,h)=>{var T,S,L,g;const _=Q;return a(),n("div",he,[t("div",{ref_key:"target",ref:R,onClick:h[0]||(h[0]=l=>m.value=!e(m)),class:"select-box__current",tabindex:"1"},[t("div",ge,[t("div",{class:V(["select-box__input-text",{"select-box__input-text--active":e(m)}])},[b(_,{src:((T=r.value)==null?void 0:T.id)!==1?("getLiveScoreImage"in s?s.getLiveScoreImage:e(P))((S=r.value)==null?void 0:S.comp_logo,"competition")+"!h20":r.value.comp_logo,alt:(L=r.value)==null?void 0:L.comp_name},null,8,["src","alt"]),t("div",null,f((g=r.value)==null?void 0:g.comp_name),1)],2)]),b(_,{class:V(["select-box__icon",{"select-box__icon--active":e(m)}]),src:"/img/dropdown.svg",alt:"Arrow Icon","aria-hidden":"true"},null,8,["class"])],512),Y(t("ul",fe,[t("div",ye,[Y(t("input",{"onUpdate:modelValue":h[1]||(h[1]=l=>B(d)?d.value=l:null),ref_key:"ignoreElRef",ref:w,type:"text",class:"input-search mb-1",placeholder:k("Enter Tournament Name")},null,8,be),[[le,e(d)]])]),t("div",xe,[(a(!0),n(j,null,z(e(y),(l,$)=>(a(),n("li",{onClick:W=>r.value=l,key:$,class:V({"item--active":r.value.id===l.id})},[t("div",Ie,[b(_,{width:"15px",src:l.id!==1?("getLiveScoreImage"in s?s.getLiveScoreImage:e(P))(l==null?void 0:l.comp_logo,"competition")+"!h20":l.comp_logo,alt:l==null?void 0:l.comp_name},null,8,["src","alt"]),ne(" "+f(l.comp_name),1)])],10,we))),128)),e(y).length?v("",!0):(a(),n("div",Se,[t("div",$e,[b(_,{class:"nodata_pic",alt:"nodata pic",width:"150",height:"150",src:"/icon/nodata.svg"})]),t("p",ke,f(k("No Data Available")),1)])),t("div",{ref_key:"el",ref:I,style:{opacity:"0"}},"-",512)])],512),[[ae,e(m)]])])}}},Le=K(Te,[["__scopeId","data-v-1b50d0a4"]]),A=x=>(ve("data-v-9aac63ac"),x=x(),pe(),x),Ae={class:"container bg-white team"},Ce={class:"team__header"},Ee={class:"title"},Re={class:"team__header-right"},Oe={class:"mt-3"},Me={key:0,class:"team__item-img"},Ne={key:1,class:"card-text placeholder-glow"},Be=A(()=>t("span",{class:"placeholder bg-secondary",style:{width:"60px",height:"60px","border-radius":"50%"}},null,-1)),Ve=[Be],Pe=["onClick"],De={key:1,class:"card-text placeholder-glow"},Ue=A(()=>t("span",{class:"placeholder bg-secondary",style:{width:"100px"}},null,-1)),Ye=[Ue],Fe={key:2,class:"team__item-country"},Je={key:3,class:"card-text placeholder-glow mb-2"},He=A(()=>t("span",{class:"placeholder bg-secondary",style:{width:"50px"}},null,-1)),Ke=[He],qe={key:0,class:"team__loading"},Ge=A(()=>t("div",{class:"spinner-border text-success",role:"status"},[t("span",{class:"visually-hidden"},"Loading...")],-1)),je=[Ge],ze={key:0,class:"loading mx-auto d-flex justify-content-center"},Qe=A(()=>t("div",{class:"spinner-border text-success",role:"status"},[t("span",{class:"visually-hidden"},"Loading...")],-1)),We=[Qe],Xe={key:1,class:"mt-5"},Ze={class:"d-flex flex-column align-items-center"},et={class:"fw-bold text-center mt-3"},tt={id:"content-page",class:"mt-5"},st={key:0,class:"page_title"},ot={class:"text-center"},at={__name:"index",async setup(x){let C,k;const{$t:E,useLocale:m,isNavVisible:R}=q();R.value=!1;const w=c=>{const u=`${c} team`,M=E(u);return M!==u?M:c},I=ce(),i=o(!1),d=o([]),r=o(""),y=o(1),s=o([]),h=o(102),_=o(null),T=o(null),S=o(null),L=o(null),g=o({id:1,comp_name:w("All"),comp_logo:"/icon/player-statistics/1.png"}),l=o(null),$=o(!1);(async()=>{await J(H.LIVESCORE.COMP_LIST_ALL+`?lang=${m.value.defaultLocale}`).then(c=>{c&&(d.value=c,d.value=[{id:1,comp_name:w("All"),comp_logo:"/icon/player-statistics/1.png"},...d.value])})})(),G(l,([{isIntersecting:c}])=>{try{c&&s.value.length>=100&&!$.value&&(y.value=y.value+1,O(!0))}catch{}});const O=async(c=!1)=>{c||(i.value=!0),c&&($.value=!0),await J(`${H.LIVESCORE.TEAM_LIST}?page=${y.value}&limit=${h.value}&competition-id=${g.value.id===1?"":g.value.id}&name=${r.value}&lang=${m.value.defaultLocale}`).then(u=>{u&&(c?s.value=[...s.value,...u]:s.value=u)}).finally(()=>{i.value=!1,$.value=!1})};[C,k]=ie(()=>O()),await C,k();const X=me(()=>{y.value=1,O()},300);return F(()=>r.value,()=>{X()}),F(()=>g.value,()=>{y.value=1,O()}),(()=>{try{_.value=N(I.configurations,"TEAM_TITLE_REPOSITORY"),S.value=N(I.configurations,"TEAM_DESCRIPTION_REPOSITORY"),L.value=N(I.configurations,"TEAM_KEYWORD_REPOSITORY"),T.value=N(I.configurations,"TEAM_CONTENT_REPOSITORY")}catch{}})(),de({title:_.value,meta:[{name:"description",content:S.value},{property:"og:title",content:_.value},{property:"og:description",content:S.value},{name:"keywords",content:L.value}]}),(c,u)=>{const M=te,Z=Le,D=Q;return a(),n("div",Ae,[t("div",Ce,[t("div",Ee,f(w("Football Team")),1),t("div",Re,[b(M,{search:e(r),"onUpdate:search":u[0]||(u[0]=p=>B(r)?r.value=p:null)},null,8,["search"]),e(d)?(a(),re(Z,{key:0,info:e(d),"onUpdate:info":u[1]||(u[1]=p=>B(d)?d.value=p:null),compActive:e(g),"onUpdate:compActive":u[2]||(u[2]=p=>B(g)?g.value=p:null)},null,8,["info","compActive"])):v("",!0)])]),t("div",Oe,[b(ue,{name:"list",tag:"div",class:"team__list"},{default:_e(()=>[(a(!0),n(j,null,z(e(s),(p,ee)=>(a(),n("div",{key:ee,class:"team__item"},[e(i)?v("",!0):(a(),n("div",Me,[b(D,{src:("getLiveScoreImage"in c?c.getLiveScoreImage:e(P))(p.logo_o,"team")+"!h50",alt:p.logo_o,imgDefault:"/img/team-default.png"},null,8,["src","alt"])])),e(i)?(a(),n("p",Ne,Ve)):v("",!0),t("div",null,[e(i)?v("",!0):(a(),n("div",{key:0,onClick:nt=>c.$router.push(`/team/${p.id}`),class:"team__item-name"},f(p.name),9,Pe)),e(i)?(a(),n("p",De,Ye)):v("",!0),e(i)?v("",!0):(a(),n("div",Fe,f(p.country_name),1)),e(i)?(a(),n("p",Je,Ke)):v("",!0)])]))),128))]),_:1}),!e(s).length&&e(i)?(a(),n("div",qe,je)):v("",!0)]),e($)?(a(),n("div",ze,We)):v("",!0),t("div",{ref_key:"el",ref:l,style:{opacity:"0"}},"infiniti",512),!e(s).length&&!e(i)?(a(),n("div",Xe,[t("div",Ze,[b(D,{class:"nodata_pic",alt:"nodata pic",width:"200",height:"200",src:"/icon/nodata.svg"})]),t("p",et,f(w("No Data Available")),1)])):v("",!0),t("div",tt,[e(_)?(a(),n("h1",st,f(e(_)),1)):v("",!0),t("div",ot,f(e(T)),1)])])}}},dt=K(at,[["__scopeId","data-v-9aac63ac"]]);export{dt as default};
