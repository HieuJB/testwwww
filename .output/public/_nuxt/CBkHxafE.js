import{c as qs}from"./CVfOd3DW.js";import{_ as Rs}from"./4VlkVIgx.js";import{s as Ys}from"./DpHY5NEn.js";import{d as Is,p as Ps,r as p,u as Vs,e as A,q as I,s as us,w as N,f as hs,t as Fs,o as O,c as C,h as o,F as P,z as V,A as n,l as Bs,B as is,y as Hs,i as r,v as Ks,x as $s,m as F,C as zs,D as Qs,E as Ws,_ as Zs}from"./DWGr-Zqp.js";import{O as _s,b as D}from"./DRizsLw2.js";import{g as Js}from"./3bue5Vy1.js";import{A as fs}from"./yrA-jQKW.js";import{u as vs,c as e}from"./owq-pGZu.js";import{s as js}from"./FqhJEqRe.js";import{u as Gs}from"./DVfTkWZM.js";import"./Cbzb-SDH.js";import"./C4iS2aBk.js";import"./DaEl2alL.js";import"./CyO-JZlX.js";import"./DUjn5l1T.js";import"./DSYfm7We.js";const Xs=qs(Rs),M=g=>(zs("data-v-d1fd39a5"),g=g(),Qs(),g),xs={id:"",class:"match-odds"},ms={id:""},so={id:"CompanyOddsDiv",class:"company-comp"},oo={class:"rankbox"},ao={class:"eTable adaptMt",id:"etable-header",width:"25%",cellspacing:"0",cellpadding:"0",style:{float:"left","min-width":"135px"}},no=M(()=>o("tr",{class:"tr-title"},[o("th",{colspan:"2",rowspan:"1"},[o("b",null,"Công ty")]),o("th")],-1)),lo={width:"60%",height:"30",class:"rb"},ro=M(()=>o("td",null,[o("span",null,"Chủ"),o("span",null,"Khách")],-1)),co={class:"rankdata",width:"75%"},eo={class:"eTable adaptMt",cellspacing:"0",cellpadding:"0",width:"100%"},to=M(()=>o("tr",{class:"tr-title"},[o("th",{width:"5%"},[o("b",null,"1:0")]),o("th",{width:"5%"},[o("b",null,"2:0")]),o("th",{width:"5%"},[o("b",null,"2:1")]),o("th",{width:"5%"},[o("b",null,"3:0")]),o("th",{width:"5%"},[o("b",null,"3:1")]),o("th",{width:"5%"},[o("b",null,"3:2")]),o("th",{width:"5%"},[o("b",null,"4:0")]),o("th",{width:"5%"},[o("b",null,"4:1")]),o("th",{width:"5%"},[o("b",null,"4:2")]),o("th",{width:"5%"},[o("b",null,"4:3")]),o("th",{width:"5%"},[o("b",null,"0:0")]),o("th",{width:"5%"},[o("b",null,"1:1")]),o("th",{width:"5%"},[o("b",null,"2:2")]),o("th",{width:"5%"},[o("b",null,"3:3")]),o("th",{width:"5%"},[o("b",null,"4:4")]),o("th",{width:"5%"},[o("b",null,"Khác")]),o("th",{width:"6%"},[o("b",null,"Chi tiết")])],-1)),po={width:"3%"},uo={width:"3%"},ho={width:"3%"},io={width:"3%"},_o={width:"3%"},fo={width:"3%"},vo={width:"3%"},Oo={width:"3%"},Co={width:"3%"},go={width:"3%"},So={width:"3%"},yo={width:"3%"},wo={width:"3%"},bo={width:"3%"},Do={width:"3%"},Mo={width:"3%"},To={width:"3%"},ko=["onClick"],Eo={id:"content-page",class:"mt-5"},Ao={key:0,class:"page_title"},No={class:"modal fade",id:"modal_detail_win",tabindex:"-1","aria-labelledby":"modal_detail_win_label","aria-hidden":"true"},Uo={class:"modal-dialog modal-dialog-centered container"},Lo={class:"modal-content"},qo={class:"modal-header"},Ro={class:"modal-title",id:"modal_detail_win_label"},Yo={class:"modal-body"},Io={id:"",class:"layui-layer-content detail_win"},Po={class:"popinfo"},Vo={class:"modal fade",id:"modal_filter_comp",tabindex:"-1","aria-labelledby":"modal_filter_comp_label","aria-hidden":"true"},Fo={class:"modal-dialog modal-dialog-centered"},Bo={class:"modal-content"},Ho=M(()=>o("div",{class:"modal-title",id:"modal_filter_comp_label"}," Chọn công ty ",-1)),Ko={class:"modal-body"},$o={class:"layui-layer-content oddscomp-filterwin"},zo={id:"oddscompFilterWin",class:"popinfo"},Qo=["value","onClick"],Wo=M(()=>o("i",{class:"check-circled"},null,-1)),Zo={id:"winTips",class:"tips"},Jo={class:"modal-footer",style:{display:"none"}},jo=["disabled"],Go=Is({__name:"[match_id]",props:{matchTitle:{},matchTitleModifiers:{},matchContent:{},matchContentModifiers:{},initDataMatch:{},initDataMatchModifiers:{}},emits:Ps(["socketData"],["update:matchTitle","update:matchContent","update:initDataMatch"]),async setup(g,{emit:Xo}){var Z,J;let T,k;const U=Ys();js(),Gs(),p();const u=Vs(),Os=p(!1),Cs=p([]),gs=p(),Ss=p(_s),L=p("");p("ahDetail");const i=p(A("oCompanyOddSelected").value?A("oCompanyOddSelected").value:[]),E=p([]),_=p([]),B=p([]),ys=p([]);D.forEach(a=>{ys.value[a==null?void 0:a.id]=a,E.value[a==null?void 0:a.id]=!!i.value.includes(a==null?void 0:a.id)});const H=p();p([]);const q=p([]),K=p(),ws=p(((Z=u==null?void 0:u.query)==null?void 0:Z.type)||""),$=p(!1),z=p(Date.now()),Q=I(g,"matchTitle"),bs=I(g,"matchContent"),Ds=I(g,"initDataMatch"),R=us({modal_detail_win:null}),Ms=async(a,t)=>{K.value=a,H.value=t,z.value=Date.now(),await Ls(),R.modal_detail_win.show()};function Ts(){R.modal_detail_win.hide()}const W=us({modal_filter_comp:null});function ks(){W.modal_filter_comp.hide()}const Y=A("settingsData");p(Js(U==null?void 0:U.configurations,"TIMEZONE")||((J=Y==null?void 0:Y.value)==null?void 0:J.timeZone));const Es=async()=>{var h;let a=Ds.value;Cs.value.match=a==null?void 0:a[0];const t=(h=a==null?void 0:a[0])==null?void 0:h.i_match_id;t&&As(t,Ss.value)},As=async(a,t=_s)=>{await vs(fs.LIVESCORE.ODDS_DETAIL,{i_match_id:a,i_company_id:t}).then(h=>{gs.value=h})},Ns=a=>{var t;if(E.value[a]=!E.value[a],E.value[a])(t=i.value)!=null&&t.includes(a)||i.value.push(a);else{const h=i.value.indexOf(a,0);h>-1&&i.value.splice(h,1)}A("oCompanyOddSelected").value=JSON.stringify(i.value)},Us=async()=>{await vs(fs.LIVESCORE.ODDS_CORRECT_SCORE+"?match_id="+L.value).then(a=>{q.value=a==null?void 0:a.data})};N(()=>u==null?void 0:u.query,()=>{var a;ws.value=((a=u==null?void 0:u.query)==null?void 0:a.type)||""},{immediate:!0}),N(()=>u,a=>{var h;const t=(h=a==null?void 0:a.path)==null?void 0:h.match(/[^/-]+$/);L.value=t?t[0]:""},{immediate:!0}),N(()=>u.query,a=>{var t;Os.value=((t=u.query)==null?void 0:t.haft)==1},{immediate:!0}),N(()=>u.query,a=>{var d,v,f,y;const t=((d=u.query)==null?void 0:d.haft)==1?"europeanHaft":"europeOdds",h=((v=u.query)==null?void 0:v.haft)==1?"handicapHalf":"handicap",S=((f=u.query)==null?void 0:f.haft)==1?"overUnderHalf":"overUnder",l=[];(y=D)==null||y.forEach(s=>{var b,w,j,G,X,x,m,ss,os,ds,as,ns,ls,rs,cs,es,ts,ps;l[s==null?void 0:s.isportsapi]=[],l[s==null?void 0:s.isportsapi].id=s==null?void 0:s.id,l[s==null?void 0:s.isportsapi].isportsapi=s==null?void 0:s.isportsapi,l[s==null?void 0:s.isportsapi].name=s==null?void 0:s.name,l[s==null?void 0:s.isportsapi].handicap=[],l[s==null?void 0:s.isportsapi].handicap.first=(w=(b=_.value)==null?void 0:b.find(c=>c.i_company_id===(s==null?void 0:s.isportsapi)&&c.type===h))==null?void 0:w.initial,l[s==null?void 0:s.isportsapi].handicap.live=(G=(j=_.value)==null?void 0:j.find(c=>c.i_company_id===(s==null?void 0:s.isportsapi)&&c.type===h))==null?void 0:G.instant,l[s==null?void 0:s.isportsapi].handicap.run=(x=(X=_.value)==null?void 0:X.find(c=>c.i_company_id===(s==null?void 0:s.isportsapi)&&c.type===h))==null?void 0:x.inplay,l[s==null?void 0:s.isportsapi].europeOdds=[],l[s==null?void 0:s.isportsapi].europeOdds.first=(ss=(m=_.value)==null?void 0:m.find(c=>c.i_company_id===(s==null?void 0:s.isportsapi)&&c.type===t))==null?void 0:ss.initial,l[s==null?void 0:s.isportsapi].europeOdds.live=(ds=(os=_.value)==null?void 0:os.find(c=>c.i_company_id===(s==null?void 0:s.isportsapi)&&c.type===t))==null?void 0:ds.instant,l[s==null?void 0:s.isportsapi].europeOdds.run=(ns=(as=_.value)==null?void 0:as.find(c=>c.i_company_id===(s==null?void 0:s.isportsapi)&&c.type===t))==null?void 0:ns.inplay,l[s==null?void 0:s.isportsapi].overUnder=[],l[s==null?void 0:s.isportsapi].overUnder.first=(rs=(ls=_.value)==null?void 0:ls.find(c=>c.i_company_id===(s==null?void 0:s.isportsapi)&&c.type===S))==null?void 0:rs.initial,l[s==null?void 0:s.isportsapi].overUnder.live=(es=(cs=_.value)==null?void 0:cs.find(c=>c.i_company_id===(s==null?void 0:s.isportsapi)&&c.type===S))==null?void 0:es.instant,l[s==null?void 0:s.isportsapi].overUnder.run=(ps=(ts=_.value)==null?void 0:ts.find(c=>c.i_company_id===(s==null?void 0:s.isportsapi)&&c.type===S))==null?void 0:ps.inplay,typeof l[s==null?void 0:s.isportsapi].handicap.first>"u"&&typeof l[s==null?void 0:s.isportsapi].handicap.live>"u"&&typeof l[s==null?void 0:s.isportsapi].handicap.run>"u"&&typeof l[s==null?void 0:s.isportsapi].europeOdds.first>"u"&&typeof l[s==null?void 0:s.isportsapi].europeOdds.live>"u"&&typeof l[s==null?void 0:s.isportsapi].europeOdds.run>"u"&&typeof l[s==null?void 0:s.isportsapi].overUnder.first>"u"&&typeof l[s==null?void 0:s.isportsapi].overUnder.live>"u"&&typeof l[s==null?void 0:s.isportsapi].overUnder.run>"u"&&(l[s==null?void 0:s.isportsapi].isEmpty=!0)}),B.value=l},{immediate:!0}),[T,k]=hs(()=>Es()),await T,k(),[T,k]=hs(()=>Us()),await T,k();const Ls=async()=>{$.value||($.value=!0,await Ws(),W.modal_filter_comp=new bootstrap.Modal("#modal_filter_comp",{}),R.modal_detail_win=new bootstrap.Modal("#modal_detail_win",{}))};return Fs(async()=>{}),(a,t)=>{var S,l;const h=Xs;return O(),C("div",xs,[o("div",ms,[o("div",so,[o("div",oo,[o("table",ao,[o("tbody",null,[no,(O(!0),C(P,null,V(q.value,(d,v)=>{var f,y;return O(),C("tr",{name:"oddsTr",style:{"text-align":"center"},cid:"31",class:F((v%2===0,"tb-bgcolor1"))},[o("td",lo,n((y=(f="ODD_COMPANYS"in a?a.ODD_COMPANYS:r(D))==null?void 0:f.find(s=>(s==null?void 0:s.isportsapi)===(d==null?void 0:d.i_company_id)))==null?void 0:y.name),1),ro],2)}),256))])]),o("div",co,[o("table",eo,[o("tbody",null,[to,(O(!0),C(P,null,V(q.value,(d,v)=>{var f;return O(),C("tr",{name:"oddsTr",style:{"text-align":"center"},cid:"31",class:F((v%2===0,"tb-bgcolor1"))},[o("td",po,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,1,0)),1),o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,0,1)),1)]),o("td",uo,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,2,0)),1),o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,0,2)),1)]),o("td",ho,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,2,1)),1),o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,1,2)),1)]),o("td",io,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,3,0)),1),o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,0,3)),1)]),o("td",_o,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,3,1)),1),o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,1,3)),1)]),o("td",fo,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,3,2)),1),o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,2,3)),1)]),o("td",vo,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,4,0)),1),o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,0,4)),1)]),o("td",Oo,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,4,1)),1),o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,1,4)),1)]),o("td",Co,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,4,2)),1),o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,2,4)),1)]),o("td",go,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,4,3)),1),o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,3,4)),1)]),o("td",So,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,0,0)),1)]),o("td",yo,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,1,1)),1)]),o("td",wo,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,2,2)),1)]),o("td",bo,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,3,3)),1)]),o("td",Do,[o("span",null,n(("getOddsCorrectScore"in a?a.getOddsCorrectScore:r(e))(d==null?void 0:d.odds,4,4)),1)]),o("td",Mo,[o("span",null,n((f=d==null?void 0:d.odds)==null?void 0:f.otherScoresOdds),1)]),o("td",To,[o("span",{class:"odd_a",onClick:y=>{var s,b;return Ms(d==null?void 0:d.i_company_id,(b=(s="ODD_COMPANYS"in a?a.ODD_COMPANYS:r(D))==null?void 0:s.find(w=>(w==null?void 0:w.isportsapi)===(d==null?void 0:d.i_company_id)))==null?void 0:b.name)}}," Thay đổi ",8,ko)])],2)}),256))])])])])]),o("div",Eo,[Q.value?(O(),C("h1",Ao,n(Q.value),1)):Bs("",!0),is(" "+n(bs.value),1)])]),o("div",No,[o("div",Uo,[o("div",Lo,[o("div",qo,[o("div",Ro,n(H.value)+" Tỷ lệ thay đổi ",1),o("button",{type:"button",class:"btn-close","aria-label":"Close",onClick:Ts})]),o("div",Yo,[o("div",Io,[o("div",Po,[Hs(h,{"odd-comp-id":K.value,"match-id":L.value,section:"correctScore","odd-companys-list":B.value,"refresh-time":z.value},null,8,["odd-comp-id","match-id","odd-companys-list","refresh-time"])])])])])])]),o("div",Vo,[o("div",Fo,[o("div",Bo,[o("div",{class:"modal-header"},[Ho,o("button",{type:"button",class:"btn-close","aria-label":"Close",onClick:ks})]),o("div",Ko,[o("div",$o,[o("ul",zo,[(O(!0),C(P,null,V("ODD_COMPANYS"in a?a.ODD_COMPANYS:r(D),(d,v)=>(O(),C("li",{class:F(["complist",i.value.includes(d==null?void 0:d.id)?"on":""]),key:v,value:d==null?void 0:d.id,onClick:f=>Ns(d==null?void 0:d.id)},[Wo,is(" "+n(d==null?void 0:d.name),1)],10,Qo))),128))]),Ks(o("div",Zo,"*Chọn ít nhất 1 công ty",512),[[$s,((S=i.value)==null?void 0:S.length)===0]])])]),o("div",Jo,[o("button",{type:"button",class:"btn btn-primary",disabled:((l=i.value)==null?void 0:l.length)===0},"OK",8,jo)])])])])])}}}),_d=Zs(Go,[["__scopeId","data-v-d1fd39a5"]]);export{_d as default};
