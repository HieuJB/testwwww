import{d as ve,J as Ee,u as fe,r as c,b as I,e as L,g as w,w as z,t as he,U as me,o as B,c as H,h as o,v as K,x as J,y as E,K as f,A as b,m as r,i as a,F as X,z as Oe,B as O,bc as Re,L as pe}from"./CnJNAMZb.js";import{u as Y}from"./9l8mKKbO.js";import{R as d,b as h,a as j,A as Q}from"./Bxk5PY0E.js";import{c as Z}from"./7sItJrXI.js";import{a as Te}from"./BiaKS2Ll.js";import{i as N}from"./DRizsLw2.js";import{s as Se}from"./D0xLcGF1.js";const Ae={id:"header-wrapper"},Ce={id:"top-tools"},Le={class:"top-tools-c container"},be={class:"row"},ye={class:"top-tools-left col-md-6"},ge=o("span",{id:"selectedOddsType"},"Hong Kong Odds",-1),Ue=o("i",null,null,-1),De={id:"ddlOddsType",style:{display:"none"}},ke=o("div",{class:"top-tools-left2 col-md-6"},[o("div",{class:"swiper-wrapper",id:"noteSwiper"})],-1),Ie={id:"top"},we=o("div",{id:"topAdDiv container"},null,-1),Be={class:"top container"},He={class:"row"},Ne={class:"col-md-12"},Me={class:"navbar navbar-expand-md py-3 navbar-dark"},Ve={class:"container"},Pe=["src","alt"],Fe={class:"d-none"},Ge={class:"navbarcollapse"},qe={class:"loginBox d-none d-md-flex"},We={id:"login_icon"},$e=o("span",{class:"sign_in_btn"},"Đăng nhập",-1),ze={class:"list_icon_mobile d-block d-md-none"},Ke=o("span",{id:"login_icon",class:"icon"},[o("a",{title:"Đăng nhập",class:"wd-white",href:"/dang-nhap"},[o("span",{class:"iconfont icon-font-username"})])],-1),Je=o("span",{class:"iconfont icon-font-search"},null,-1),Xe=[Je],Ye={id:"fulltab"},je={id:"newtop",class:"container"},Qe={class:"navigation",ref:"containerRef"},Ze={class:"nav__list menu2"},xe={class:"nav__item d-none d-sm-none d-md-inline-block"},eo={class:"nav__item d-inline-block d-md-none"},oo={class:"nav__item d-inline-block d-md-none"},so={class:"nav__item"},to=o("i",{class:"icon iconfont icon-font-collect-on"},null,-1),no={class:"nav__item"},ao={class:"nav__item"},lo={class:"nav__item d-none d-md-inline-block"},io=o("i",{class:"icon iconfont icon-font-heat hot"},null,-1),co={class:"nav__item d-none d-md-inline-block"},ro=o("div",{class:"crumbs container mb-4"},null,-1),uo=["innerHTML"],_o=o("div",{class:"icon-list_match-setting d-block d-sm-block d-md-none"},[o("div",{class:"list_match"},[o("a",{class:"btn-icon","data-bs-toggle":"offcanvas",href:"#offcanvasLeft",role:"button","aria-controls":"offcanvasLeft","aria-label":"Tournament list"},[o("i",{class:"icon iconfont icon-font-menu"})])])],-1),To=ve({__name:"error",setup(vo){var q,W;const x=Se(),m=Ee();fe();const C=c([]);c(),c();const i=c(""),M=c(""),y=c(""),ee=c("");c(!1);const oe=c([]),se=c([]),te=c(""),ne=c(""),V=c(""),P=c(!1),F=Y(),S=c(null),A=c(!1),g=c(!0),ae=I(()=>{var e;return S.value?S.value.name:((e=p.value)==null?void 0:e.length)>0?p.value[0].name:""}),le=I(()=>{var e;return S.value?"icon-font-"+S.value.icon:((e=p.value)==null?void 0:e.length)>0?"icon-font-"+p.value[0].icon:"icon-footballclass2"}),ie=e=>{S.value=e,A.value=!1},ce=()=>{A.value=!A.value},de=()=>{g.value=!g.value},p=c([]),U=c((q=L("favouritesData").value)!=null&&q.length?(W=L("favouritesData").value)==null?void 0:W.length:null);w({title:"Trang không tồn tại",meta:[{name:"description",content:""}]}),w(()=>({link:[{rel:"canonical",href:"https://"+F.hostname+F.pathname}]})),I(()=>h.LIVESCORE.includes(i.value)||i.value.includes(h.MATCH)||i.value.includes(h.ODDS)||i.value.includes(h.ASIAN_HANDICAP_ODDS)||i.value.includes(h.ODDS_1X2)||i.value.includes(h.OVER_UNDER_ODDS)||i.value.includes(h.CORNER_OU_ODDS)||i.value.includes(h.EURO_HANDICAP_ODDS)||i.value.includes(h.DOUBLE_CHANCE_ODDS)||i.value.includes(h.CORRECT_SCORE_ODDS));const n=e=>{var l,t,u,s;return e&&((t=(l=C.value)==null?void 0:l.filter(_=>_.code===e)[0])!=null&&t.value)?(s=(u=C.value)==null?void 0:u.filter(_=>_.code===e)[0])==null?void 0:s.value:""},G=async()=>{var e,l;try{const t=await j(Z(Q.CONFIGURATIONS),"$8deu89mYer");C.value=((e=t.data.value)==null?void 0:e.configurations)||[],x.configurations=((l=t.data.value)==null?void 0:l.configurations)||[],y.value=n("SEO_META_TITLE")?n("SEO_META_TITLE"):"",ee.value=n("SEO_META_DESCRIPTION")?n("SEO_META_DESCRIPTION"):"";const u=n("download_app");oe.value=u?JSON.parse(u):[];const s=n("icon_social");se.value=s?JSON.parse(s):[],te.value=n("code_header")?n("code_header"):"",ne.value=n("code_body")?n("code_body"):"",V.value=n("code_footer")?n("code_footer"):"",n("HIDDEN_TOP_TOOLS")=="True"&&(P.value=!0)}catch{}},re=async()=>{try{const e=await j(Z(Q.MENU),"$7N9eorbSnv");p.value=e.data.value}catch{}};return G(),re(),z(()=>{var e;return(e=m==null?void 0:m.currentRoute.value)==null?void 0:e.path},()=>{var l,t,u,s;i.value=(t=(l=m==null?void 0:m.currentRoute)==null?void 0:l.value)==null?void 0:t.path,M.value=(s=(u=m==null?void 0:m.currentRoute)==null?void 0:u.value)==null?void 0:s.name;const e=Y();w(()=>({link:[{rel:"canonical",href:"https://"+e.hostname+e.pathname}]}))},{deep:!0,immediate:!0}),z(()=>L("favouritesData"),()=>{var e;U.value=(e=L("favouritesData").value)==null?void 0:e.length},{deep:!0}),he(async()=>{C.value||G(),document.documentElement.style.setProperty("--primary",n("primaryColor")),document.documentElement.style.setProperty("--secondary",n("secondaryColor")),document.documentElement.style.setProperty("--textcolor",n("textColor")),document.documentElement.style.setProperty("--hovercolor",n("hoverColor")),document.documentElement.style.setProperty("--backgroundcolor",n("backgroundColor")),document.documentElement.style.setProperty("--backgroundfooter",n("backgroundfooterColor")),document.documentElement.style.setProperty("--toptools",n("toptoolsColor")),document.documentElement.style.setProperty("--livescore-header-table",n("livescoreHeaderTableColor"));const e=document.querySelector(".navigation");if(!e)return;const l=e.querySelector(".nav__list__more");if(!l)return;const t=l.querySelectorAll("li"),u=e.querySelectorAll("li"),s=primary.querySelector(".nav__item__more");if(!s)return;const _=s.querySelector("button");if(!_)return;const ue=T=>{T.preventDefault(),e.classList.toggle("nav__active"),_.setAttribute("aria-expanded",String(e.classList.contains("nav__active")))};_.addEventListener("click",ue);const D=()=>{u.forEach(R=>{R.classList.remove("nav__hidden")});let T=_.offsetWidth,v=[];const _e=primary.offsetWidth;primaryItems.forEach((R,k)=>{_e>=T+R.offsetWidth?T+=R.offsetWidth:(R.classList.add("nav__hidden"),v.push(k))}),v!=null&&v.length?t.forEach((R,k)=>{v.includes(k)||R.classList.add("nav__hidden")}):(s.classList.add("nav__hidden"),e.classList.remove("nav__active"),_.setAttribute("aria-expanded","false"))};D(),window.addEventListener("resize",D);const $=T=>{let v=T.target;for(;v;){if(v===l||v===_)return;v=v.parentElement}e.classList.remove("nav__active"),_.setAttribute("aria-expanded","false")};document.addEventListener("click",$),me(()=>{window.removeEventListener("resize",D),document.removeEventListener("click",$)})}),(e,l)=>{var u;const t=pe;return B(),H(X,null,[o("div",Ae,[K(o("div",Ce,[o("div",Le,[o("div",be,[o("div",ye,[o("div",{class:"Choose-tool d-inline-block",id:"chooseOddsType",onClick:l[1]||(l[1]=(...s)=>e.showHideOddsType&&e.showHideOddsType(...s))},[ge,Ue,o("ul",De,[o("li",{onClick:l[0]||(l[0]=s=>e.changeTopOddsType(4)),id:"oddsType_4"},"Decimal Odds")])])]),ke])])],512),[[J,!P.value]]),o("div",Ie,[we,o("div",Be,[o("div",He,[o("div",Ne,[o("nav",Me,[o("div",Ve,[E(t,{to:"/",class:"navbar-brand d-flex align-items-center"},{default:f(()=>[o("img",{src:n("logo"),alt:y.value,srcset:"",style:{"max-height":"45px"}},null,8,Pe),o("h1",Fe,b(y.value),1)]),_:1}),o("div",Ge,[o("div",{class:r(["menu_active d-block d-md-none",{on:A.value}]),onClick:ce},[o("i",{class:r("icon iconfont "+a(le))},null,2),o("span",null,b(a(ae)),1)],2),o("ul",{id:"menu",class:r(["navbar-nav me-auto",{"d-none d-md-flex":!A.value}])},[(B(!0),H(X,null,Oe(p.value,s=>(B(),H("li",{class:"nav-item",key:s==null?void 0:s.id},[E(t,{to:s==null?void 0:s.code,class:r(("active_class"in e?e.active_class:a(Te))(i.value,s==null?void 0:s.code,M.value)?"tab_on":""),onClick:_=>ie(s)},{default:f(()=>[o("i",{class:r(["icon iconfont","icon-font-"+(s==null?void 0:s.icon)])},null,2),O(b(s==null?void 0:s.name),1)]),_:2},1032,["to","class","onClick"])]))),128))],2),o("div",qe,[o("div",We,[E(t,{class:"wd-white",to:"/dang-nhap"},{default:f(()=>[$e]),_:1})])]),o("div",ze,[Ke,o("span",{class:"icon iconfont icon-font-setup2",onClick:l[2]||(l[2]=s=>e.toSetting())}),o("span",{id:"search_icon",class:"icon",onClick:l[3]||(l[3]=s=>e.openModalSearch(1))},Xe),o("span",{class:r(["icon iconfont icon-font-menu",{active:g.value}]),onClick:de},null,2)])])])])])])])]),o("div",Ye,[o("div",je,[o("nav",Qe,[o("ul",Ze,[o("li",xe,[E(t,{to:("ROUTERS"in e?e.ROUTERS:a(d)).HOMEPAGE,class:r(["nav__list",i.value===("ROUTERS"in e?e.ROUTERS:a(d)).HOMEPAGE?"on":""])},{default:f(()=>[O(" Tỷ lệ kèo ")]),_:1},8,["to","class"])]),o("li",eo,[E(t,{to:("ROUTERS"in e?e.ROUTERS:a(d)).HOMEPAGE,class:r(["nav__list",e.activeTab!==("LIVESCORE_ACTIVE_TAB"in e?e.LIVESCORE_ACTIVE_TAB:a(N)).HOT&&i.value===("ROUTERS"in e?e.ROUTERS:a(d)).HOMEPAGE?"on":""])},{default:f(()=>[O(" Tỷ lệ kèo ")]),_:1},8,["to","class"])]),o("li",oo,[E(t,{class:r(["sub1_2 nav__list",e.activeTab===("LIVESCORE_ACTIVE_TAB"in e?e.LIVESCORE_ACTIVE_TAB:a(N)).HOT&&i.value===("ROUTERS"in e?e.ROUTERS:a(d)).HOMEPAGE?"on":""]),to:("ROUTERS"in e?e.ROUTERS:a(d)).FOOTBALL_LIVESCORE_TAB+("LIVESCORE_ACTIVE_TAB"in e?e.LIVESCORE_ACTIVE_TAB:a(N)).HOT},{default:f(()=>[O(" Hot ")]),_:1},8,["class","to"])]),o("li",so,[E(t,{to:("ROUTERS"in e?e.ROUTERS:a(d)).FOOTBALL_FAVORITES,class:r(["sub1_2 nav__list",i.value===("ROUTERS"in e?e.ROUTERS:a(d)).FOOTBALL_FAVORITES?"on":""])},{default:f(()=>[to,O(" Theo dõi "),K(o("i",{id:"favCount",class:"fav_count"},b(U.value),513),[[J,U.value>0]])]),_:1},8,["to","class"])]),o("li",no,[E(t,{to:("ROUTERS"in e?e.ROUTERS:a(d)).FOOTBALL_RESULT,class:r(["sub1_2 nav__list",i.value===("ROUTERS"in e?e.ROUTERS:a(d)).FOOTBALL_RESULT?"on":""])},{default:f(()=>[O(" Kết quả ")]),_:1},8,["to","class"])]),o("li",ao,[E(t,{to:("ROUTERS"in e?e.ROUTERS:a(d)).FOOTBALL_SCHEDULE,class:r(["sub1_2 nav__list",i.value===("ROUTERS"in e?e.ROUTERS:a(d)).FOOTBALL_SCHEDULE?"on":""])},{default:f(()=>[O(" Lịch thi đấu ")]),_:1},8,["to","class"])]),o("li",lo,[E(t,{to:("ROUTERS"in e?e.ROUTERS:a(d)).NEWS_PAGE,class:r(["sub1_2 nav__list",i.value===("ROUTERS"in e?e.ROUTERS:a(d)).NEWS_PAGE?"on":""])},{default:f(()=>[O(" Tips "),io]),_:1},8,["to","class"])]),o("li",co,[E(t,{to:("ROUTERS"in e?e.ROUTERS:a(d)).LEAGUES,class:r(["sub1_2 nav__list",(u=i.value)!=null&&u.includes(("ROUTERS"in e?e.ROUTERS:a(d)).LEAGUES)?"on":""])},{default:f(()=>[O(" Kho dữ liệu ")]),_:1},8,["to","class"])])])],512)])])]),ro,Re(e.$slots,"default"),o("footer",{id:"bottom",innerHTML:V.value},null,8,uo),_o],64)}}});export{To as default};
