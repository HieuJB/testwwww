import{a as h,A as C}from"./yrA-jQKW.js";import{g as t}from"./3bue5Vy1.js";import{d as O,r as s,b as A,f as P,E as y,g as T,P as L,o as R,c as V,h as M,y as w,i as m}from"./DWGr-Zqp.js";import{d as G}from"./DRizsLw2.js";import{useWindowSize as N}from"./BN1EXK5Q.js";import{s as k}from"./DpHY5NEn.js";import"./cGgey60k.js";const x={class:"mcontent"},B={id:"main",class:"row"},q=O({__name:"index",async setup(H){let r,E;const{width:I}=N(),e=k(),n=s(),i=s(),_=s(""),u=s(null);A(()=>I.value>768);const g=async()=>{try{await h(C.PAGE.HOME_PAGE,"$Gr1VhLfoVk").then(o=>{var a,c,l,p,d,f,v,S;n.value=((c=(a=o==null?void 0:o.data)==null?void 0:a.value)==null?void 0:c.meta_title)??t(e.configurations,"SEO_META_TITLE"),i.value=((p=(l=o==null?void 0:o.data)==null?void 0:l.value)==null?void 0:p.meta_description)??t(e.configurations,"SEO_META_DESCRIPTION"),_.value=(f=(d=o==null?void 0:o.data)==null?void 0:d.value)==null?void 0:f.content,u.value=(S=(v=o==null?void 0:o.data)==null?void 0:v.value)==null?void 0:S.title})}catch{n.value=t(e.configurations,"SEO_META_TITLE")?t(e.configurations,"SEO_META_TITLE"):"",i.value=t(e.configurations,"SEO_META_DESCRIPTION")?t(e.configurations,"SEO_META_DESCRIPTION"):""}};return[r,E]=P(()=>g()),await r,E(),y(async()=>{T({title:n.value,meta:[{name:"description",content:i.value},{property:"og:title",content:n.value},{property:"og:description",content:i.value}]})}),T(()=>({meta:[{name:"robots",content:"noindex"}]})),(o,a)=>{const c=L("LivescoreComponentIframe");return R(),V("div",x,[M("div",B,[w(c,{h1:m(u),page:("LIVESCORE_PAGE"in o?o.LIVESCORE_PAGE:m(G)).LIVESCORE,content:m(_)},null,8,["h1","page","content"])])])}}});export{q as default};
