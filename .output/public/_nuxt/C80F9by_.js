import{_ as N,an as ve,bL as x,bh as j,s as ne,o as _,c,w as e,b4 as t,aq as ee,bA as ae,bo as oe,F as z,aQ as D,v as y,bd as r,J as d,by as $,h as b,bX as F,bT as J,I as B,u as K,cM as le,bU as W,bW as te,aJ as _e,aG as ce,dc as ye,dd as X,de as pe,bO as ge,aN as U,as as $e,bS as Ae,bN as Ee,bH as de,bt as ie,bx as re,ah as I,c9 as Z,ca as G,c_ as Te,cO as be}from"./BCYEZECI.js";import{_ as Me}from"./_0OT-jnJ.js";import{u as we}from"./jVER9Gtp.js";const Le={class:"team"},Pe={class:"team__title"},ke={class:"team__list"},Ce=["value"],Re=["value"],Se={class:"team__item"},Ie={class:"team__item-position"},Ue={class:"team__item-detail"},Oe={class:"team__item-shirt"},Be={key:0,class:"team__item-name"},Ne={class:"team__item-detail"},xe={class:"team__item-shirt"},Fe={key:0,class:"team__item-name"},Ye={class:"team__item-detail"},Ve={class:"team__item-shirt"},je={key:0,class:"team__item-name"},Ke={class:"team__item-detail"},He={class:"team__item-shirt"},Ze={key:0,class:"team__item-name"},Ge={class:"team__item"},ze={class:"team__item-position"},Je={class:"team__item-detail"},We={class:"team__item-shirt"},qe={key:0,class:"team__item-name"},Qe={class:"team__item-detail"},Xe={class:"team__item-shirt"},De={key:0,class:"team__item-name"},et={class:"team__item-detail"},tt={class:"team__item-shirt"},st={key:0,class:"team__item-name"},at={class:"team__item-detail"},ot={class:"team__item-shirt"},it={key:0,class:"team__item-name"},nt={class:"team__item"},lt={class:"team__item-position"},_t={class:"team__item-detail"},ct={class:"team__item-shirt"},dt={key:0,class:"team__item-name"},rt={class:"team__item-detail"},mt={class:"team__item-shirt"},ut={key:0,class:"team__item-name"},ht={class:"team__item-detail"},ft={class:"team__item-shirt"},vt={key:0,class:"team__item-name"},yt={class:"team__item-detail"},pt={class:"team__item-shirt"},gt={key:0,class:"team__item-name"},$t={class:"team__item-detail"},At={class:"team__item-shirt"},Et={key:0,class:"team__item-name"},Tt={class:"team__item"},bt={class:"team__item-position"},Mt={class:"team__item-detail"},wt={class:"team__item-shirt"},Lt={key:0,class:"team__item-name"},Pt={class:"team__item-detail"},kt={class:"team__item-shirt"},Ct={key:0,class:"team__item-name"},Rt={class:"team__item-detail"},St={class:"team__item-shirt"},It={key:0,class:"team__item-name"},Ut={class:"team__item-detail"},Ot={class:"team__item-shirt"},Bt={key:0,class:"team__item-name"},Nt={class:"team__item-detail"},xt={class:"team__item-shirt"},Ft={key:0,class:"team__item-name"},Yt={class:"team__item"},Vt={class:"team__item-position"},jt={class:"team__item-detail"},Kt={class:"team__item-shirt"},Ht={key:0,class:"team__item-name"},Zt={class:"team__item-detail"},Gt={class:"team__item-shirt"},zt={key:0,class:"team__item-name"},Jt={class:"team__item-detail"},Wt={class:"team__item-shirt"},qt={key:0,class:"team__item-name"},Qt={class:"team__item"},Xt={class:"team__item-position"},Dt={class:"team__item-detail"},es={class:"team__item-shirt"},ts={key:0,class:"team__item-name"},ss={__name:"TeamInfo",props:ve({player:Array,playerId:String},{listCompetition:{},listCompetitionModifiers:{},competitionActive:{},competitionActiveModifiers:{},seasonList:{},seasonListModifiers:{},seasonActive:{},seasonActiveModifiers:{},playerPerformance:{},playerPerformanceModifiers:{},isLoading:{},isLoadingModifiers:{}}),emits:["update:listCompetition","update:competitionActive","update:seasonList","update:seasonActive","update:playerPerformance","update:isLoading"],setup(o){const{$t:w}=x(),l=p=>{const A=`${p} team`,n=w(A);return n!==A?n:p},i=j(o,"listCompetition"),L=j(o,"competitionActive"),v=j(o,"seasonList"),g=j(o,"seasonActive"),a=j(o,"playerPerformance"),m=j(o,"isLoading"),h=ne(()=>{try{return Array.from(new Map(v.value.map(p=>[p.id,p])).values())}catch{return[]}}),T=p=>p.length===9?p.slice(2,4)+"/"+p.slice(7):p;return(p,A)=>{var P,M,k,C;const n=F;return _(),c("div",Le,[e("div",Pe,t(l("Player Performance")),1),e("div",ke,[e("div",{class:ee(["d-flex gap-2",{"p-2":((P=i.value)==null?void 0:P.length)&&((M=v.value)==null?void 0:M.length)}])},[(k=i.value)!=null&&k.length?ae((_(),c("select",{key:0,"onUpdate:modelValue":A[0]||(A[0]=s=>L.value=s),class:"form-select form-select--left"},[(_(!0),c(z,null,D(i.value,(s,R)=>(_(),c("option",{value:s.competition_id,key:R},t(s.competition_name),9,Ce))),128))],512)),[[oe,L.value]]):y("",!0),(C=v.value)!=null&&C.length?ae((_(),c("select",{key:1,"onUpdate:modelValue":A[1]||(A[1]=s=>g.value=s),class:"form-select form-select--right"},[(_(!0),c(z,null,D(r(h),(s,R)=>(_(),c("option",{value:s.id,key:R},t(T(s.year)),9,Re))),128))],512)),[[oe,g.value]]):y("",!0)],2),e("div",Se,[e("div",Ie,[d(n,{src:"/img/arrow1_032.gif",alt:"position"}),e("div",null,t(l("Match")),1)]),e("div",Ue,[e("div",Oe,t(l("Number of Matches")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",Be,t(((s=a.value)==null?void 0:s.matches)??"-"),1))]}),_:1})]),e("div",Ne,[e("div",xe,t(l("Minutes Played")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",Fe,t(((s=a.value)==null?void 0:s.minutes_played)??"-"),1))]}),_:1})]),e("div",Ye,[e("div",Ve,t(l("Started From Beginning")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",je,t(((s=a.value)==null?void 0:s.first)??"-"),1))]}),_:1})]),e("div",Ke,[e("div",He,t(l("Appearances")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",Ze,t(((s=a.value)==null?void 0:s.court)??"-"),1))]}),_:1})])]),e("div",Ge,[e("div",ze,[d(n,{src:"/img/arrow1_032.gif",alt:"position"}),e("div",null,t(l("Attack")),1)]),e("div",Je,[e("div",We,t(l("Goals")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",qe,t(((s=a.value)==null?void 0:s.goals)??"-"),1))]}),_:1})]),e("div",Qe,[e("div",Xe,t(l("Shots")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",De,t(((s=a.value)==null?void 0:s.shots)??"-"),1))]}),_:1})]),e("div",et,[e("div",tt,t(l("Set Pieces")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",st,t(((s=a.value)==null?void 0:s.freekicks)??"-"),1))]}),_:1})]),e("div",at,[e("div",ot,t(l("Penalty Kicks")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",it,t(((s=a.value)==null?void 0:s.penalty)??"-"),1))]}),_:1})])]),e("div",nt,[e("div",lt,[d(n,{src:"/img/arrow1_032.gif",alt:"position"}),e("div",null,t(l("Passes")),1)]),e("div",_t,[e("div",ct,t(l("Assists")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",dt,t(((s=a.value)==null?void 0:s.assists)??"-"),1))]}),_:1})]),e("div",rt,[e("div",mt,t(l("Passes")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",ut,t(((s=a.value)==null?void 0:s.passes)??"-"),1))]}),_:1})]),e("div",ht,[e("div",ft,t(l("Key Passes")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",vt,t(((s=a.value)==null?void 0:s.key_passes)??"-"),1))]}),_:1})]),e("div",yt,[e("div",pt,t(l("Crosses")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",gt,t(((s=a.value)==null?void 0:s.crosses)??"-"),1))]}),_:1})]),e("div",$t,[e("div",At,t(l("Long Balls")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",Et,t(((s=a.value)==null?void 0:s.long_balls)??"-"),1))]}),_:1})])]),e("div",Tt,[e("div",bt,[d(n,{src:"/img/arrow1_032.gif",alt:"position"}),e("div",null,t(l("Defense")),1)]),e("div",Mt,[e("div",wt,t(l("Duels")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",Lt,t(((s=a.value)==null?void 0:s.duels)??"-"),1))]}),_:1})]),e("div",Pt,[e("div",kt,t(l("Shot Blocks")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",Ct,t(((s=a.value)==null?void 0:s.blocked_shots)??"-"),1))]}),_:1})]),e("div",Rt,[e("div",St,t(l("Tackles")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",It,t(((s=a.value)==null?void 0:s.tackles)??"-"),1))]}),_:1})]),e("div",Ut,[e("div",Ot,t(l("Fouls")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",Bt,t(((s=a.value)==null?void 0:s.fouls)??"-"),1))]}),_:1})]),e("div",Nt,[e("div",xt,t(l("Saves")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",Ft,t(((s=a.value)==null?void 0:s.saves)??"-"),1))]}),_:1})])]),e("div",Yt,[e("div",Vt,[d(n,{src:"/img/arrow1_032.gif",alt:"position"}),e("div",null,t(l("Cards")),1)]),e("div",jt,[e("div",Kt,t(l("Yellow Cards")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",Ht,t(((s=a.value)==null?void 0:s.yellow_cards)??"-"),1))]}),_:1})]),e("div",Zt,[e("div",Gt,t(l("Yellow Card to Red")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",zt,t(((s=a.value)==null?void 0:s.yellow2red_cards)??"-"),1))]}),_:1})]),e("div",Jt,[e("div",Wt,t(l("Red Cards")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",qt,t(((s=a.value)==null?void 0:s.red_cards)??"-"),1))]}),_:1})])]),e("div",Qt,[e("div",Xt,[d(n,{src:"/img/arrow1_032.gif",alt:"position"}),e("div",null,t(l("Others")),1)]),e("div",Dt,[e("div",es,t(l("Offside")),1),d(b,{name:"slide-fade"},{default:$(()=>{var s;return[m.value?y("",!0):(_(),c("div",ts,t(((s=a.value)==null?void 0:s.offsides)??"-"),1))]}),_:1})])])])])}}},as=N(ss,[["__scopeId","data-v-89ac36d9"]]),os={class:"player"},is={class:"player__img"},ns={class:"player__img-rounded"},ls={class:"player__img-rounded-img"},_s={class:"player__info-list"},cs={class:"player__info-item"},ds={class:"player__info-item-left"},rs={class:"player__info-item-right"},ms={class:"player__info-item"},us={class:"player__info-item-left"},hs={class:"player__info-item-right d-flex gap-2"},fs={style:{height:"20px",width:"auto"}},vs={class:"player__info-item"},ys={class:"player__info-item-left"},ps={class:"player__info-item-right"},gs={class:"player__info-item"},$s={class:"player__info-item-left"},As={class:"player__info-item-right"},Es={class:"player__info-item"},Ts={class:"player__info-item-left"},bs={class:"player__info-item-right"},Ms={class:"player__info-item"},ws={class:"player__info-item-left"},Ls={class:"player__info-item-right"},Ps={class:"player__info-item"},ks={class:"player__info-item-left player__info-item-left--border"},Cs={class:"player__info-item-right player__info-item-right--border"},Rs={class:"player__info-item player__info-item--last"},Ss={class:"player__info-item-left player__info-item-left--last"},Is={class:"player__info-item-right player__info-item-right--last"},Us={__name:"Personal",props:{info:Array},emits:["showModal"],setup(o,{emit:w}){const{$t:l}=x(),i=(g,a=null)=>{const m=`${g} ${a?"playertech":"team"}`,h=l(m);return h!==m?h:g},L=w,v=()=>{L("showModal")};return(g,a)=>{var h,T;const m=F;return _(),c("div",os,[e("div",is,[e("div",ns,[e("div",ls,[d(m,{src:("getLiveScoreImage"in g?g.getLiveScoreImage:r(J))(o.info.logo_o,"player")+"!h100",alt:o.info.logo_o,imgDefault:"/img/playericon.png"},null,8,["src","alt"])])])]),e("div",_s,[e("div",cs,[e("div",ds,t(i("Player"))+":",1),e("div",rs,t(o.info.name),1)]),e("div",ms,[e("div",us,t(i("Nationality"))+": ",1),e("div",hs,[B(t(((T=(h=o.info)==null?void 0:h.country)==null?void 0:T.name)??"-")+" ",1),e("div",fs,[o.info.country.logo_o?(_(),K(m,{key:0,src:("getLiveScoreImage"in g?g.getLiveScoreImage:r(J))(o.info.country.logo_o,"country")+"!h20",alt:o.info.country.logo_o},null,8,["src","alt"])):y("",!0)])])]),e("div",vs,[e("div",ys,t(i("Weight"))+":",1),e("div",ps,t(o.info.weight?o.info.weight+" Kg":"-"),1)]),e("div",gs,[e("div",$s,t(i("Height"))+":",1),e("div",As,t(o.info.height?o.info.height+" cm":"-"),1)]),e("div",Es,[e("div",Ts,t(i("Age"))+":",1),e("div",bs,[B(t(o.info.age?o.info.age:"-")+" ",1),e("span",null," "+t(o.info.age?`(${o.info.birthday})`:""),1)])]),e("div",Ms,[e("div",ws,t(i("Position"))+":",1),e("div",Ls,t(i(("getPlayerPosition"in g?g.getPlayerPosition:r(le))(o.info.position),"playertech")),1)]),e("div",Ps,[e("div",ks,t(i("Value"))+": ",1),e("div",Cs,t(o.info.market_value?o.info.market_value_currency+" "+Number(o.info.market_value).toLocaleString():"-"),1)]),e("div",Rs,[e("div",Ss,t(i("Player Performance"))+": ",1),e("div",Is,[e("button",{class:"btn-show-modal",onClick:v},t(i("Click here")),1)])])])])}}},Os=N(Us,[["__scopeId","data-v-16b95052"]]),Bs=o=>(_e("data-v-54235f85"),o=o(),ce(),o),Ns={class:"table"},xs={class:"table__title"},Fs={class:"table__content"},Ys={key:0},Vs=Bs(()=>e("td",null,"1",-1)),js={class:"d-flex",style:{"justify-content":"center"}},Ks={key:0,style:{border:"1px solid #dee2e6","border-top":"none"}},Hs={class:"d-flex flex-column align-items-center"},Zs={class:"fw-bold text-center p-0"},Gs={__name:"TablePayroll",props:{info:Object},setup(o){const{$t:w}=x(),l=(i,L=null)=>{const v=`${i} ${L?"playertech":"team"}`,g=w(v);return g!==v?g:i};return(i,L)=>{var a,m,h,T;const v=te,g=F;return _(),c("div",Ns,[e("div",xs,t(l("Under Contract")),1),e("div",Fs,[e("table",null,[e("tr",null,[e("th",null,t(l("No.")),1),e("th",null,t(l("Under Contract")),1),e("th",null,t(l("Position")),1)]),(m=(a=o.info)==null?void 0:a.team)!=null&&m.id?(_(),c("tr",Ys,[Vs,e("td",null,[e("div",js,[d(v,{to:`/${("ROUTER_TEAM_NAME"in i?i.ROUTER_TEAM_NAME:r(W)).TEAM}/${o.info.team.id}`},{default:$(()=>[B(t(o.info.team.name),1)]),_:1},8,["to"]),e("div",null,[d(g,{style:{width:"20px",height:"20px","object-fit":"contain"},src:("getLiveScoreImage"in i?i.getLiveScoreImage:r(J))(o.info.team.logo_o,"team")+"!h50",alt:o.info.team.name},null,8,["src","alt"])])])]),e("td",null,t(l(("getPlayerPosition"in i?i.getPlayerPosition:r(le))(o.info.position),"playertech")),1)])):y("",!0)]),(T=(h=o.info)==null?void 0:h.team)!=null&&T.id?y("",!0):(_(),c("div",Ks,[e("div",Hs,[d(g,{class:"nodata_pic",alt:"nodata pic",width:"200",height:"200",src:"/icon/nodata.svg"})]),e("p",Zs,t(l("No Data Available")),1)]))])])}}},zs=N(Gs,[["__scopeId","data-v-54235f85"]]),Js={class:"table"},Ws={class:"table__title"},qs={class:"table__content"},Qs={key:1},Xs={key:1},Ds={key:0,class:"d-flex flex-column align-items-center w-100",style:{border:"1px solid #dee2e6","border-top":"none"}},ea={class:"fw-bold text-center mt-3"},ta={__name:"Statistical",props:{info:Array},setup(o){const{$t:w}=x(),l=i=>{const L=`${i} team`,v=w(L);return v!==L?v:i};return(i,L)=>{const v=te,g=F;return _(),c("div",Js,[e("div",Ws,t(l("Transfer Statistics")),1),e("div",qs,[e("table",null,[e("tr",null,[e("th",null,t(l("Transfer Time")),1),e("th",null,t(l("From")),1),e("th",null,t(l("To")),1),e("th",null,t(l("Transfer Fee")),1),e("th",null,t(l("Transfer Type")),1)]),o.info?(_(!0),c(z,{key:0},D(o.info,(a,m)=>(_(),c("tr",{key:m,class:ee({"bg-gray":m%2!==0})},[e("td",null,t(("formatTimestamp"in i?i.formatTimestamp:r(ye))(a.transfer_time)),1),e("td",null,[a.from_team_id&&a.from_team_name!==("TABLE_TEAM"in i?i.TABLE_TEAM:r(X)).FREE_PLAYER?(_(),K(v,{key:0,to:a.from_team_id?`/${("ROUTER_TEAM_NAME"in i?i.ROUTER_TEAM_NAME:r(W)).TEAM}/${a.from_team_id}`:"#"},{default:$(()=>[B(t(a.from_team_name??"-"),1)]),_:2},1032,["to"])):(_(),c("span",Qs,t(a.from_team_name||a.from_team_name===("TABLE_TEAM"in i?i.TABLE_TEAM:r(X)).FREE_PLAYER?a.from_team_name:"-"),1))]),e("td",null,[a.to_team_id&&a.to_team_name!==("TABLE_TEAM"in i?i.TABLE_TEAM:r(X)).FREE_PLAYER?(_(),K(v,{key:0,to:a.to_team_id?`/${("ROUTER_TEAM_NAME"in i?i.ROUTER_TEAM_NAME:r(W)).TEAM}/${a.to_team_id}`:"#"},{default:$(()=>[B(t(a.to_team_name),1)]),_:2},1032,["to"])):(_(),c("span",Xs,t(a.to_team_name||a.to_team_name===("TABLE_TEAM"in i?i.TABLE_TEAM:r(X)).FREE_PLAYER?a.to_team_name:"-"),1))]),e("td",null,t(a.transfer_desc?a.transfer_desc:"-"),1),e("td",null,t(l(("getTransferType"in i?i.getTransferType:r(pe))(a.transfer_type))),1)],2))),128)):y("",!0)]),o.info?y("",!0):(_(),c("div",Ds,[d(g,{class:"nodata_pic p-0",alt:"nodata pic",width:"200",height:"200",src:"/icon/nodata.svg"}),e("p",ea,t(l("No Data Available")),1)]))])])}}},sa=N(ta,[["__scopeId","data-v-609ac440"]]),aa={class:"table"},oa={class:"table__title"},ia={class:"table__content",style:{"overflow-x":"auto"}},na={style:{width:"50px"}},la={class:"d-flex gap-1",style:{"min-width":"100px","justify-content":"center","align-items":"center"}},_a={style:{width:"20px",height:"20px","object-fit":"contain",flex:"0 0 35px"}},ca={class:"flex: 0 0 20px;"},da={style:{width:"20px",height:"20px","object-fit":"contain",flex:"0 0 35px"}},ra={key:0,class:"d-flex flex-column align-items-center w-100",style:{border:"1px solid #dee2e6","border-top":"none"}},ma={class:"fw-bold text-center p-0"},ua={__name:"StatisticalTwoYear",props:{info:Array},setup(o){var m;const w=ge("settingsData"),l=U(((m=w==null?void 0:w.value)==null?void 0:m.timeZone)||""),{info:i}=o,{$t:L}=x(),v=h=>{const T=`${h} team`,p=L(T);return p!==T?p:h},g=["#1F77B4","#FF7F0E","#2CA02C","#D62728","#9467BD","#8C564B","#E377C2","#7F7F7F","#BCBD22","#17BECF"],a=ne(()=>{const h={};return i.forEach(T=>{h[T.match_info.comp_short_name]||(h[T.match_info.comp_short_name]=g[Object.keys(h).length%g.length]),T.bgColor=h[T.match_info.comp_short_name]}),i});return(h,T)=>{const p=te,A=F;return _(),c("div",aa,[e("div",oa,t(v("Statistics for the Last 2 Years")),1),e("div",ia,[e("table",null,[e("tr",null,[e("th",null,t(v("Tournament")),1),e("th",null,t(v("Date")),1),e("th",null,t(v("Home Team")),1),e("th",na,t(v("Score")),1),e("th",null,t(v("Away Team")),1),e("th",null,t(v("Goals")),1),e("th",null,t(v("Assists")),1),e("th",null,t(v("Penalty Kicks")),1),e("th",null,t(v("Yellow Cards")),1),e("th",null,t(v("Red Cards")),1)]),r(a).length?(_(!0),c(z,{key:0},D(r(a),(n,P)=>{var M,k,C,s,R,Y,q,H;return _(),c("tr",{key:P,class:ee({"bg-gray":P%2!==0})},[e("td",{style:$e({backgroundColor:n.bgColor,color:"white"})},t(((M=n.match_info)==null?void 0:M.comp_name)??((k=n.match_info)==null?void 0:k.comp_short_name)),5),e("td",null,t(("formatDateMomentUTCTimeZone"in h?h.formatDateMomentUTCTimeZone:r(Ae))(n.match_info.match_time,"DD-MM-yyyy HH:mm",r(l))),1),e("td",null,[d(p,{to:`/${("ROUTER_TEAM_NAME"in h?h.ROUTER_TEAM_NAME:r(W)).TEAM}/${n.home_team_info.id}`},{default:$(()=>[B(t(n.home_team_info.name),1)]),_:2},1032,["to"])]),e("td",null,[e("div",la,[e("div",_a,[d(A,{style:{height:"100%",width:"auto","object-fit":"contain"},src:("getLiveScoreImage"in h?h.getLiveScoreImage:r(J))((C=n==null?void 0:n.home_team_info)!=null&&C.country_logo_o?(s=n==null?void 0:n.home_team_info)==null?void 0:s.country_logo_o:(R=n==null?void 0:n.home_team_info)==null?void 0:R.logo_o,"team")+"!h50",alt:"team-home"},null,8,["src"])]),e("span",ca,t(n.match_info.home_scores[0])+"-"+t(n.match_info.away_scores[0]),1),e("div",da,[d(A,{style:{height:"100%",width:"auto","object-fit":"contain"},src:("getLiveScoreImage"in h?h.getLiveScoreImage:r(J))((Y=n==null?void 0:n.away_team_info)!=null&&Y.country_logo_o?(q=n==null?void 0:n.away_team_info)==null?void 0:q.country_logo_o:(H=n==null?void 0:n.away_team_info)==null?void 0:H.logo_o,"team")+"!h50",alt:"team-away"},null,8,["src"])])])]),e("td",null,[d(p,{to:`/${("ROUTER_TEAM_NAME"in h?h.ROUTER_TEAM_NAME:r(W)).TEAM}/${n.away_team_info.id}`},{default:$(()=>[B(t(n.away_team_info.name),1)]),_:2},1032,["to"])]),e("td",null,t(n.goals),1),e("td",null,t(n.assists),1),e("td",null,t(n.penalty),1),e("td",null,t(n.yellow_cards),1),e("td",null,t(n.red_cards),1)],2)}),128)):y("",!0)]),r(a).length?y("",!0):(_(),c("div",ra,[d(A,{class:"nodata_pic p-0",alt:"nodata pic",width:"200",height:"200",src:"/icon/nodata.svg"}),e("p",ma,t(v("No Data Available")),1)]))])])}}},ha=N(ua,[["__scopeId","data-v-2534f3a3"]]),fa=o=>(_e("data-v-351a15b4"),o=o(),ce(),o),va={class:"player"},ya={class:"player__team"},pa={class:"player__info"},ga=fa(()=>e("button",{type:"button",class:"btn btn-primary d-none","data-bs-toggle":"modal","data-bs-target":"#exampleModal",id:"btn-open-modal"},null,-1)),$a={class:"modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},Aa={class:"modal-dialog"},Ea={class:"modal-content"},Ta={class:"modal-body"},ba={class:"modal-close-btn",type:"button","data-bs-toggle":"modal","data-bs-target":"#exampleModal"},Ma={__name:"index",props:{info:Object},async setup(o){var se;let w,l;const{initSchemaPlayer:i}=Ee(),{$t:L,useLocale:v}=x(),g=u=>{const f=`${u} team`,S=L(f);return S!==f?S:u},a=de(),m=U(null),h=U([]),T=U({}),p=U([]),A=U(!1),n=U({}),P=U([]),M=U(null),k=U({}),{info:C}=o,s=()=>{document.getElementById("btn-open-modal").click()},R=async()=>{await Z(`${G.LIVESCORE.PLAYER_TRANSFERS}?player-id=${a.params.id}`).then(u=>{u&&u[0]&&u[0].transfer&&(m.value=u[0].transfer)}).catch(u=>{console.log(u)})},Y=async()=>{await Z(`${G.LIVESCORE.PLAYER_MATCH}?player-id=${a.params.id}&lang=${v.value.defaultLocale}`).then(u=>{u&&(h.value=u)}).catch(u=>{console.log(u)})},q=async()=>{await Z(`${G.LIVESCORE.PLAYER_HONOR}?player-id=${a.params.id}`).then(u=>{if(u&&u[0]&&u[0].honors){const f=u[0].honors.reduce((S,O)=>(Object.keys(S).includes(O.honor.id)||(S[O.honor.id]=u[0].honors.filter(V=>V.honor.id===O.honor.id)),S),{});T.value=f}}).catch(u=>{console.log(u)})},H=async()=>{A.value=!0,await Z(`${G.LIVESCORE.PLAYER_PERFORMANCE}?player-id=${a.params.id}&season-id=${M.value}`).then(u=>{u&&u[0]&&(k.value=u[0])}).finally(()=>{A.value=!1})},me=async()=>{await Z(`${G.LIVESCORE.PLAYER_COMPETITIONS}?player-id=${a.params.id}&lang=${v.value.defaultLocale}`).then(u=>{var f,S,O,V,Q;u&&(p.value=u,n.value=(f=u==null?void 0:u[0])==null?void 0:f.competition_id,P.value=(S=u==null?void 0:u[0])==null?void 0:S.seasons,M.value=(Q=(V=(O=u==null?void 0:u[0])==null?void 0:O.seasons)==null?void 0:V[0])==null?void 0:Q.id,M.value?H():A.value=!1)})};return ie(()=>M.value,()=>{M.value&&H()}),ie(()=>n.value,()=>{var u;if(n.value){const f=p.value.find(S=>S.competition_id===n.value);P.value=f.seasons,M.value=(u=f.seasons)==null?void 0:u[0].id}}),me(),[w,l]=re(()=>Promise.all([R(),Y(),q()])),await w,l(),i({player:(se=C==null?void 0:C.player)==null?void 0:se[0],transfer:m.value,honor:T.value}),(u,f)=>{const S=as,O=Os,V=zs,Q=sa,ue=ha,he=Me,fe=F;return _(),c(z,null,[e("div",va,[e("div",ya,[d(S,{listCompetition:r(p),"onUpdate:listCompetition":f[0]||(f[0]=E=>I(p)?p.value=E:null),competitionActive:r(n),"onUpdate:competitionActive":f[1]||(f[1]=E=>I(n)?n.value=E:null),seasonList:r(P),"onUpdate:seasonList":f[2]||(f[2]=E=>I(P)?P.value=E:null),seasonActive:r(M),"onUpdate:seasonActive":f[3]||(f[3]=E=>I(M)?M.value=E:null),playerPerformance:r(k),"onUpdate:playerPerformance":f[4]||(f[4]=E=>I(k)?k.value=E:null),isLoading:r(A),"onUpdate:isLoading":f[5]||(f[5]=E=>I(A)?A.value=E:null)},null,8,["listCompetition","competitionActive","seasonList","seasonActive","playerPerformance","isLoading"])]),e("div",pa,[o.info&&o.info.player.length?(_(),K(O,{key:0,onShowModal:s,info:o.info.player[0]},null,8,["info"])):y("",!0),o.info&&o.info.player[0]?(_(),K(V,{key:1,info:o.info.player[0]},null,8,["info"])):y("",!0),d(Q,{info:r(m)},null,8,["info"]),d(ue,{info:r(h)},null,8,["info"]),d(he,{title:g("Award"),info:r(T)},null,8,["title","info"])])]),ga,e("div",$a,[e("div",Aa,[e("div",Ea,[e("div",Ta,[e("div",ba,[d(fe,{src:"/img/close.gif",alt:"closeModal"})]),d(S,{listCompetition:r(p),"onUpdate:listCompetition":f[6]||(f[6]=E=>I(p)?p.value=E:null),competitionActive:r(n),"onUpdate:competitionActive":f[7]||(f[7]=E=>I(n)?n.value=E:null),seasonList:r(P),"onUpdate:seasonList":f[8]||(f[8]=E=>I(P)?P.value=E:null),seasonActive:r(M),"onUpdate:seasonActive":f[9]||(f[9]=E=>I(M)?M.value=E:null),playerPerformance:r(k),"onUpdate:playerPerformance":f[10]||(f[10]=E=>I(k)?k.value=E:null),isLoading:r(A),"onUpdate:isLoading":f[11]||(f[11]=E=>I(A)?A.value=E:null)},null,8,["listCompetition","competitionActive","seasonList","seasonActive","playerPerformance","isLoading"])])])])])],64)}}},wa=N(Ma,[["__scopeId","data-v-351a15b4"]]),La={class:"container bg-white team"},Pa={key:1},ka={class:"d-flex flex-column align-items-center"},Ca={class:"fw-bold text-center mt-3"},Ra={id:"content-page",class:"mt-5"},Sa={key:0,class:"page_title"},Ia={class:"text-center"},Ua={__name:"[id]",async setup(o){var P,M,k;let w,l;const{info:i,fetchLineUpTeam:L,fetchPlayerInfo:v,fetchObjectMeta:g,h1Content:a,content:m}=we(),h=de(),{$t:T,isNavVisible:p}=x();p.value=!1;const A=C=>{const s=`${C} team`,R=T(s);return R!==s?R:C},{data:n}=([w,l]=re(async()=>be("player",async()=>{var C;try{const s=await v(h.params.id);if(Array.isArray(s)&&s.length){const[R]=await Promise.all([L(((C=s==null?void 0:s[0])==null?void 0:C.team.id)??"")]);return{player:s,lineUpTeam:R}}}catch(s){throw console.error("Error fetching all data:",s),s}})),w=await w,l(),w);return i.value=n.value,i.value||Te({statusCode:404,statusMessage:A("Player does not exist!")}),g((k=(M=(P=i.value)==null?void 0:P.player)==null?void 0:M[0])==null?void 0:k.name,h.fullPath),(C,s)=>{const R=wa,Y=F;return _(),c("div",La,[r(i)&&r(i).player?(_(),K(R,{key:0,info:r(i)},null,8,["info"])):(_(),c("div",Pa,[e("div",ka,[d(Y,{class:"nodata_pic",alt:"nodata pic",width:"200",height:"200",src:"/icon/nodata.svg"})]),e("p",Ca,t(A("No Data Available")),1)])),e("div",Ra,[r(a)?(_(),c("h1",Sa,t(r(a)),1)):y("",!0),e("div",Ia,t(r(m)),1)])])}}},xa=N(Ua,[["__scopeId","data-v-990417e1"]]);export{xa as default};