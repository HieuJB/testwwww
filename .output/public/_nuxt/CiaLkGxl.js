import{_ as Js}from"./C-bFYicT.js";import{c as Ks}from"./CF2VPTuC.js";import{_ as js}from"./CihfQNXw.js";import{s as Gs}from"./D0xLcGF1.js";import{d as xs,p as ms,r as c,u as sa,e as J,b as bs,q as as,s as gs,w as B,f as Os,t as aa,o as w,c as T,h as o,v as p,x as _,i as e,y as ws,F as os,z as ds,A as u,l as oa,B as Ts,m as M,C as da,D as na,E as la,_ as ea}from"./CnJNAMZb.js";import{O as Cs,b as F}from"./DRizsLw2.js";import{g as ta}from"./3bue5Vy1.js";import{A as Ns}from"./Bxk5PY0E.js";import{u as Ds,a as S,b as ns}from"./00yf2fq6.js";import{s as ca}from"./C_-dA3Th.js";import{u as ia}from"./sa_3Auql.js";import{useWindowSize as ra}from"./B2gsc1f-.js";import"./Cbzb-SDH.js";import"./C4iS2aBk.js";import"./DaEl2alL.js";import"./7sItJrXI.js";import"./DUjn5l1T.js";import"./DSYfm7We.js";import"./B0IwuF_2.js";const pa=Ks(js),h=C=>(da("data-v-34cac29b"),C=C(),na(),C),_a={id:"",class:"match-odds"},ua={id:""},ha={id:"CompanyOddsDiv",class:"company-comp"},va={class:"rankbox"},fa={class:"eTable adaptMt",id:"etable-header",width:"25%",cellspacing:"0",cellpadding:"0",style:{float:"left","min-width":"135px"}},ya=h(()=>o("tr",{class:"tr-title"},[o("th",{colspan:"1",rowspan:"2"},[o("b",null,"Công ty")])],-1)),ba=h(()=>o("tr",{class:"tb-bgcolor1"},[o("th")],-1)),ga={width:"100%",height:"30",class:"rb"},Oa={class:"rankdata w-100"},wa={class:"eTable adaptMt w-100",cellspacing:"0",cellpadding:"0",width:"100%"},Ta={class:"tr-title"},Ca={colspan:"3"},Na=h(()=>o("b",null,"Sớm",-1)),Da=[Na],Ma={colspan:"3"},Sa=h(()=>o("b",null,"Live",-1)),ka=[Sa],Aa=h(()=>o("th",{rowspan:"2",class:"middle-width"},[o("b",null,"Chi tiết")],-1)),Ea={class:"tr-title"},La=h(()=>o("th",null,"1X",-1)),Xa=h(()=>o("th",null,"12",-1)),Ua=h(()=>o("th",null,"X2",-1)),qa={width:"6%"},Va={width:"6%"},Ya={width:"6%"},Ia={class:"6%"},Ha={class:"6%"},Pa={class:"6%"},Ra={width:"3%"},Ba=["onClick"],Fa={id:"content-page",class:"mt-5"},za={key:0,class:"page_title"},Wa={class:"modal fade",id:"modal_detail_win",tabindex:"-1","aria-labelledby":"modal_detail_win_label","aria-hidden":"true"},$a={class:"modal-dialog modal-dialog-centered container"},Qa={class:"modal-content"},Za={class:"modal-header"},Ja={class:"modal-title",id:"modal_detail_win_label"},Ka={class:"modal-body"},ja={id:"",class:"layui-layer-content detail_win"},Ga={class:"popinfo"},xa={class:"modal fade",id:"modal_filter_comp",tabindex:"-1","aria-labelledby":"modal_filter_comp_label","aria-hidden":"true"},ma={class:"modal-dialog modal-dialog-centered"},so={class:"modal-content"},ao=h(()=>o("div",{class:"modal-title",id:"modal_filter_comp_label"}," Chọn công ty ",-1)),oo={class:"modal-body"},no={class:"layui-layer-content oddscomp-filterwin"},lo={id:"oddscompFilterWin",class:"popinfo"},eo=["value","onClick"],to=h(()=>o("i",{class:"check-circled"},null,-1)),co={id:"winTips",class:"tips"},io={class:"modal-footer",style:{display:"none"}},ro=["disabled"],po=xs({__name:"[match_id]",props:{matchTitle:{},matchTitleModifiers:{},matchContent:{},matchContentModifiers:{},initDataMatch:{},initDataMatchModifiers:{}},emits:ms(["socketData"],["update:matchTitle","update:matchContent","update:initDataMatch"]),async setup(C,{emit:Ms}){var _s,us;let z,W;const{width:Ss}=ra(),ks=Ms,K=Gs();ca();const $=ia(),As=c(),i=sa(),Es=c(!1),Ls=c([]),Xs=c(),Us=c(Cs),j=c("");c("ahDetail");const v=c(J("oCompanyOddSelected").value?J("oCompanyOddSelected").value:[]),Q=c([]),f=c([]),ls=c([]),qs=c([]);F.forEach(a=>{qs.value[a==null?void 0:a.id]=a,Q.value[a==null?void 0:a.id]=!!v.value.includes(a==null?void 0:a.id)});const Z=c(1),es=c(!1),ts=c(Date.now()),Vs=c([{id:1,name:"Sớm"},{id:2,name:"Live"}]),N=bs(()=>Ss.value<=768),g=bs(()=>({first:N.value?Z.value===1:!0,second:N.value?Z.value===2:!0})),cs=c();c([]),c([]);const is=c(),G=c([]),Ys=c(((_s=i==null?void 0:i.query)==null?void 0:_s.type)||""),rs=as(C,"matchTitle"),Is=as(C,"matchContent"),Hs=as(C,"initDataMatch"),x=gs({modal_detail_win:null}),Ps=async(a,t)=>{is.value=a,cs.value=t,ts.value=Date.now(),await Zs(),x.modal_detail_win.show()};function Rs(){x.modal_detail_win.hide()}const ps=gs({modal_filter_comp:null});function Bs(){ps.modal_filter_comp.hide()}const m=J("settingsData");c(ta(K==null?void 0:K.configurations,"TIMEZONE")||((us=m==null?void 0:m.value)==null?void 0:us.timeZone));const Fs=async()=>{var r;let a=Hs.value;Ls.value.match=a==null?void 0:a[0];const t=(r=a==null?void 0:a[0])==null?void 0:r.i_match_id;t&&zs(t,Us.value)},zs=async(a,t=Cs)=>{await Ds(Ns.LIVESCORE.ODDS_DETAIL,{i_match_id:a,i_company_id:t}).then(r=>{Xs.value=r})},Ws=a=>{var t;if(Q.value[a]=!Q.value[a],Q.value[a])(t=v.value)!=null&&t.includes(a)||v.value.push(a);else{const r=v.value.indexOf(a,0);r>-1&&v.value.splice(r,1)}J("oCompanyOddSelected").value=JSON.stringify(v.value)},$s=async()=>{await Ds(Ns.LIVESCORE.ODDS_DOUBLE_CHANCE+"?match_id="+j.value).then(a=>{G.value=a==null?void 0:a.data})};B(()=>i==null?void 0:i.query,()=>{var a;Ys.value=((a=i==null?void 0:i.query)==null?void 0:a.type)||""},{immediate:!0}),B(()=>i,a=>{var r;const t=(r=a==null?void 0:a.path)==null?void 0:r.match(/[^/-]+$/);j.value=t?t[0]:""},{immediate:!0}),B(()=>i.query,a=>{var t;Es.value=((t=i.query)==null?void 0:t.haft)==1},{immediate:!0}),B(()=>i.query,a=>{var A,d,O,y;const t=((A=i.query)==null?void 0:A.haft)==1?"europeanHaft":"europeOdds",r=((d=i.query)==null?void 0:d.haft)==1?"handicapHalf":"handicap",k=((O=i.query)==null?void 0:O.haft)==1?"overUnderHalf":"overUnder",n=[];(y=F)==null||y.forEach(s=>{var b,E,L,X,U,q,V,Y,I,H,ss,P,R,D,hs,vs,fs,ys;n[s==null?void 0:s.isportsapi]=[],n[s==null?void 0:s.isportsapi].id=s==null?void 0:s.id,n[s==null?void 0:s.isportsapi].isportsapi=s==null?void 0:s.isportsapi,n[s==null?void 0:s.isportsapi].name=s==null?void 0:s.name,n[s==null?void 0:s.isportsapi].handicap=[],n[s==null?void 0:s.isportsapi].handicap.first=(E=(b=f.value)==null?void 0:b.find(l=>l.i_company_id===(s==null?void 0:s.isportsapi)&&l.type===r))==null?void 0:E.initial,n[s==null?void 0:s.isportsapi].handicap.live=(X=(L=f.value)==null?void 0:L.find(l=>l.i_company_id===(s==null?void 0:s.isportsapi)&&l.type===r))==null?void 0:X.instant,n[s==null?void 0:s.isportsapi].handicap.run=(q=(U=f.value)==null?void 0:U.find(l=>l.i_company_id===(s==null?void 0:s.isportsapi)&&l.type===r))==null?void 0:q.inplay,n[s==null?void 0:s.isportsapi].europeOdds=[],n[s==null?void 0:s.isportsapi].europeOdds.first=(Y=(V=f.value)==null?void 0:V.find(l=>l.i_company_id===(s==null?void 0:s.isportsapi)&&l.type===t))==null?void 0:Y.initial,n[s==null?void 0:s.isportsapi].europeOdds.live=(H=(I=f.value)==null?void 0:I.find(l=>l.i_company_id===(s==null?void 0:s.isportsapi)&&l.type===t))==null?void 0:H.instant,n[s==null?void 0:s.isportsapi].europeOdds.run=(P=(ss=f.value)==null?void 0:ss.find(l=>l.i_company_id===(s==null?void 0:s.isportsapi)&&l.type===t))==null?void 0:P.inplay,n[s==null?void 0:s.isportsapi].overUnder=[],n[s==null?void 0:s.isportsapi].overUnder.first=(D=(R=f.value)==null?void 0:R.find(l=>l.i_company_id===(s==null?void 0:s.isportsapi)&&l.type===k))==null?void 0:D.initial,n[s==null?void 0:s.isportsapi].overUnder.live=(vs=(hs=f.value)==null?void 0:hs.find(l=>l.i_company_id===(s==null?void 0:s.isportsapi)&&l.type===k))==null?void 0:vs.instant,n[s==null?void 0:s.isportsapi].overUnder.run=(ys=(fs=f.value)==null?void 0:fs.find(l=>l.i_company_id===(s==null?void 0:s.isportsapi)&&l.type===k))==null?void 0:ys.inplay,typeof n[s==null?void 0:s.isportsapi].handicap.first>"u"&&typeof n[s==null?void 0:s.isportsapi].handicap.live>"u"&&typeof n[s==null?void 0:s.isportsapi].handicap.run>"u"&&typeof n[s==null?void 0:s.isportsapi].europeOdds.first>"u"&&typeof n[s==null?void 0:s.isportsapi].europeOdds.live>"u"&&typeof n[s==null?void 0:s.isportsapi].europeOdds.run>"u"&&typeof n[s==null?void 0:s.isportsapi].overUnder.first>"u"&&typeof n[s==null?void 0:s.isportsapi].overUnder.live>"u"&&typeof n[s==null?void 0:s.isportsapi].overUnder.run>"u"&&(n[s==null?void 0:s.isportsapi].isEmpty=!0)}),ls.value=n},{immediate:!0});const Qs=a=>{try{a&&(As.value=a,ks("socketData",a))}catch{return!1}};B($,()=>{Qs($==null?void 0:$.socketData)},{deep:!0,immediate:!0}),[z,W]=Os(()=>Fs()),await z,W(),[z,W]=Os(()=>$s()),await z,W();const Zs=async()=>{es.value||(es.value=!0,await la(),ps.modal_filter_comp=new bootstrap.Modal("#modal_filter_comp",{}),x.modal_detail_win=new bootstrap.Modal("#modal_detail_win",{}))};return aa(async()=>{}),(a,t)=>{var n,A;const r=Js,k=pa;return w(),T("div",_a,[o("div",ua,[o("div",ha,[p(ws(r,{isHideTitle:"",titleList:Vs.value,modelValue:Z.value,"onUpdate:modelValue":t[0]||(t[0]=d=>Z.value=d)},null,8,["titleList","modelValue"]),[[_,e(N)]]),o("div",va,[o("table",fa,[o("tbody",null,[ya,ba,(w(!0),T(os,null,ds(G.value,(d,O)=>{var y,s;return w(),T("tr",{name:"oddsTr",class:M((O%2!==0,"tb-bgcolor1"))},[o("td",ga,u((s=(y="ODD_COMPANYS"in a?a.ODD_COMPANYS:e(F))==null?void 0:y.find(b=>(b==null?void 0:b.isportsapi)===(d==null?void 0:d.i_company_id)))==null?void 0:s.name),1)],2)}),256))])]),o("div",Oa,[o("table",wa,[o("tbody",null,[o("tr",Ta,[p(o("th",Ca,Da,512),[[_,e(g).first]]),p(o("th",Ma,ka,512),[[_,e(g).second]]),Aa]),o("tr",Ea,[La,Xa,Ua,p(o("th",null,"1X",512),[[_,!e(N)]]),p(o("th",null,"12",512),[[_,!e(N)]]),p(o("th",null,"X2",512),[[_,!e(N)]])]),(w(!0),T(os,null,ds(G.value,(d,O)=>{var y,s,b,E,L,X,U,q,V,Y,I,H;return w(),T("tr",{name:"oddsTr",class:M((O%2!==0,"tb-bgcolor1"))},[p(o("td",qa,[o("span",null,u(("getOddNumberToNegativeTX"in a?a.getOddNumberToNegativeTX:e(S))((y=d==null?void 0:d.live_odds)==null?void 0:y.home_draw)),1)],512),[[_,e(g).first]]),p(o("td",Va,[o("span",null,u(("getOddNumberToNegativeTX"in a?a.getOddNumberToNegativeTX:e(S))((s=d==null?void 0:d.live_odds)==null?void 0:s.home_away)),1)],512),[[_,e(g).first]]),p(o("td",Ya,[o("span",null,u(("getOddNumberToNegativeTX"in a?a.getOddNumberToNegativeTX:e(S))((b=d==null?void 0:d.live_odds)==null?void 0:b.draw_away)),1)],512),[[_,e(g).first]]),p(o("td",Ia,[o("span",{class:M(("getOddChange"in a?a.getOddChange:e(ns))((E=d==null?void 0:d.live_odds)==null?void 0:E.home_draw,(L=d==null?void 0:d.early_odds)==null?void 0:L.home_draw))},u(("getOddNumberToNegativeTX"in a?a.getOddNumberToNegativeTX:e(S))((X=d==null?void 0:d.live_odds)==null?void 0:X.home_draw)),3)],512),[[_,e(g).second]]),p(o("td",Ha,[o("span",{class:M(("getOddChange"in a?a.getOddChange:e(ns))((U=d==null?void 0:d.live_odds)==null?void 0:U.home_away,(q=d==null?void 0:d.early_odds)==null?void 0:q.home_away))},u(("getOddNumberToNegativeTX"in a?a.getOddNumberToNegativeTX:e(S))((V=d==null?void 0:d.live_odds)==null?void 0:V.home_away)),3)],512),[[_,e(g).second]]),p(o("td",Pa,[o("span",{class:M(("getOddChange"in a?a.getOddChange:e(ns))((Y=d==null?void 0:d.live_odds)==null?void 0:Y.draw_away,(I=d==null?void 0:d.early_odds)==null?void 0:I.draw_away))},u(("getOddNumberToNegativeTX"in a?a.getOddNumberToNegativeTX:e(S))((H=d==null?void 0:d.live_odds)==null?void 0:H.draw_away)),3)],512),[[_,e(g).second]]),o("td",Ra,[o("span",{class:"odd_a",onClick:ss=>{var P,R;return Ps(d==null?void 0:d.i_company_id,(R=(P="ODD_COMPANYS"in a?a.ODD_COMPANYS:e(F))==null?void 0:P.find(D=>(D==null?void 0:D.isportsapi)===(d==null?void 0:d.i_company_id)))==null?void 0:R.name)}}," Thay đổi ",8,Ba)])],2)}),256))])])])])]),o("div",Fa,[rs.value?(w(),T("h1",za,u(rs.value),1)):oa("",!0),Ts(" "+u(Is.value),1)])]),o("div",Wa,[o("div",$a,[o("div",Qa,[o("div",Za,[o("div",Ja,u(cs.value)+" Tỷ lệ thay đổi ",1),o("button",{type:"button",class:"btn-close","aria-label":"Close",onClick:Rs})]),o("div",Ka,[o("div",ja,[o("div",Ga,[ws(k,{"odd-comp-id":is.value,"match-id":j.value,section:"doubleChance","odd-companys-list":ls.value,"refresh-time":ts.value},null,8,["odd-comp-id","match-id","odd-companys-list","refresh-time"])])])])])])]),o("div",xa,[o("div",ma,[o("div",so,[o("div",{class:"modal-header"},[ao,o("button",{type:"button",class:"btn-close","aria-label":"Close",onClick:Bs})]),o("div",oo,[o("div",no,[o("ul",lo,[(w(!0),T(os,null,ds("ODD_COMPANYS"in a?a.ODD_COMPANYS:e(F),(d,O)=>(w(),T("li",{class:M(["complist",v.value.includes(d==null?void 0:d.id)?"on":""]),key:O,value:d==null?void 0:d.id,onClick:y=>Ws(d==null?void 0:d.id)},[to,Ts(" "+u(d==null?void 0:d.name),1)],10,eo))),128))]),p(o("div",co,"*Chọn ít nhất 1 công ty",512),[[_,((n=v.value)==null?void 0:n.length)===0]])])]),o("div",io,[o("button",{type:"button",class:"btn btn-primary",disabled:((A=v.value)==null?void 0:A.length)===0},"OK",8,ro)])])])])])}}}),Lo=ea(po,[["__scopeId","data-v-34cac29b"]]);export{Lo as default};
