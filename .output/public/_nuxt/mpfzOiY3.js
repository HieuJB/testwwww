import{_ as la}from"./C-bFYicT.js";import{c as ra}from"./CF2VPTuC.js";import{_ as ea}from"./CihfQNXw.js";import{s as pa}from"./D0xLcGF1.js";import{d as ca,p as ua,r as _,u as ta,e as j,q as ls,b as As,s as qs,w as Q,f as ia,t as va,o as F,c as H,h as o,v as t,x as i,i as r,y as Vs,F as rs,z as es,A as g,l as ha,B as Is,E as _a,m as w}from"./CnJNAMZb.js";import{O as Rs,b as x}from"./DRizsLw2.js";import{g as fa,p as ya}from"./3bue5Vy1.js";import{A as Js}from"./Bxk5PY0E.js";import{u as Bs,f as ga,j as Y,k as z,d as ps,b as cs,l as N}from"./00yf2fq6.js";import{_ as Oa}from"./CbcL0TeM.js";import{u as ba}from"./sa_3Auql.js";import{useWindowSize as Ua}from"./B2gsc1f-.js";const Ca=ra(ea),wa={id:"",class:"match-odds"},Na={id:""},Ta={id:"CompanyOddsDiv",class:"company-comp"},Da={class:"rankbox"},Ma={class:"eTable adaptMt",id:"etable-header",width:"25%",cellspacing:"0",cellpadding:"0",style:{float:"left","min-width":"135px"}},Sa=o("b",null,"Công ty",-1),ka=o("th",null,null,-1),Ea=o("tr",{class:"tb-bgcolor1"},[o("th")],-1),La={rowspan:"1"},Aa={class:"rankdata w-100"},qa={class:"eTable adaptMt w-100",cellspacing:"0",cellpadding:"0",width:"100%"},Va={class:"tr-title"},Ia={colspan:"3"},Ra=o("b",null,"Sớm",-1),Ja=[Ra],Ba={colspan:"3"},Fa=o("b",null,"Live",-1),Ha=[Fa],Ka={colspan:"3"},Ya=o("b",null,"Run Odds",-1),za=[Ya],Pa={rowspan:"2"},Wa=o("b",null,"Chi tiết",-1),Xa=[Wa],$a={class:"tr-title"},ja=o("th",null,"Tài",-1),Qa=o("th",null,"Kèo",-1),Za=o("th",null,"Xỉu",-1),Ga={width:"6%"},xa={width:"6%"},ma={width:"6%",class:"rb"},sn={width:"6%"},an={width:"6%"},nn={width:"6%",class:"rb"},on={width:"6%"},dn={width:"6%"},ln={width:"6%",class:"rb"},rn={width:"10%",style:{"min-width":"60px"}},en=["onClick"],pn={id:"content-page",class:"mt-5"},cn={key:0,class:"page_title"},un={class:"modal fade",id:"modal_detail_win",tabindex:"-1","aria-labelledby":"modal_detail_win_label","aria-hidden":"true"},tn={class:"modal-dialog modal-dialog-centered container"},vn={class:"modal-content"},hn={class:"modal-header"},_n={class:"modal-title",id:"modal_detail_win_label"},fn={class:"modal-body"},yn={id:"",class:"layui-layer-content detail_win"},gn={class:"popinfo"},On={class:"modal fade",id:"modal_filter_comp",tabindex:"-1","aria-labelledby":"modal_filter_comp_label","aria-hidden":"true"},bn={class:"modal-dialog modal-dialog-centered"},Un={class:"modal-content"},Cn=o("div",{class:"modal-title",id:"modal_filter_comp_label"}," Chọn công ty ",-1),wn={class:"modal-body"},Nn={class:"layui-layer-content oddscomp-filterwin"},Tn={id:"oddscompFilterWin",class:"popinfo"},Dn=["value","onClick"],Mn=o("i",{class:"check-circled"},null,-1),Sn={id:"winTips",class:"tips"},kn={class:"modal-footer",style:{display:"none"}},En=["disabled"],Pn=ca({__name:"[match_id]",props:{matchTitle:{},matchTitleModifiers:{},matchContent:{},matchContentModifiers:{},initDataMatch:{},initDataMatchModifiers:{}},emits:ua(["socketData"],["update:matchTitle","update:matchContent","update:initDataMatch"]),async setup(m,{emit:Fs}){var Os,bs;let us,ts;const{width:Hs}=Ua(),Ks=Fs,ss=pa(),Z=ba(),Ys=_(),f=ta(),zs=_(!1),is=_([]),Ps=_(),Ws=_(Rs),as=_("");_("ahDetail");const O=_(j("oCompanyOddSelected").value?j("oCompanyOddSelected").value:[]),G=_([]),h=_([]),K=_([]);x.forEach(d=>{G.value[d==null?void 0:d.id]=!!O.value.includes(d==null?void 0:d.id)});const vs=_(),hs=_(),Xs=_(((Os=f==null?void 0:f.query)==null?void 0:Os.type)||""),P=_(1),_s=_(!1),fs=_(Date.now()),$s=_([{id:1,name:"Sớm"},{id:2,name:"Live"},{id:3,name:"Run Odds"}]),ys=ls(m,"matchTitle"),js=ls(m,"matchContent"),Qs=ls(m,"initDataMatch"),y=As(()=>Hs.value<=768),L=As(()=>({first:y.value?P.value===1:!0,second:y.value?P.value===2:!0,third:y.value?P.value===3:!0})),ns=qs({modal_detail_win:null}),Zs=async(d,u)=>{hs.value=d,vs.value=u,fs.value=Date.now(),await gs(),ns.modal_detail_win.show()};function Gs(){ns.modal_detail_win.hide()}const os=qs({modal_filter_comp:null}),xs=async()=>{await gs(),os.modal_filter_comp.show()};function ms(){os.modal_filter_comp.hide()}const ds=j("settingsData");_(fa(ss==null?void 0:ss.configurations,"TIMEZONE")||((bs=ds==null?void 0:ds.value)==null?void 0:bs.timeZone));const sa=async()=>{var l;let d=Qs.value;is.value.match=d==null?void 0:d[0];const u=(l=d==null?void 0:d[0])==null?void 0:l.i_match_id;u&&aa(u,Ws.value)},aa=async(d,u=Rs)=>{await Bs(Js.LIVESCORE.ODDS_DETAIL,{i_match_id:d,i_company_id:u}).then(l=>{Ps.value=l})},na=d=>{var u;if(G.value[d]=!G.value[d],G.value[d])(u=O.value)!=null&&u.includes(d)||O.value.push(d);else{const l=O.value.indexOf(d,0);l>-1&&O.value.splice(l,1)}j("oCompanyOddSelected").value=JSON.stringify(O.value)},oa=async d=>{await Bs(Js.LIVESCORE.ODDS_DETAIL+"?match_id="+d).then(async u=>{var T;h.value=ga(u);const l=[];(T=x)==null||T.forEach(s=>{var D,M,S,n,a,b,v,k,E,U,e,C,A,q,V,I,R,J,B;l[s==null?void 0:s.isportsapi]=[],l[s==null?void 0:s.isportsapi].id=s==null?void 0:s.id,l[s==null?void 0:s.isportsapi].isportsapi=s==null?void 0:s.isportsapi,l[s==null?void 0:s.isportsapi].name=s==null?void 0:s.name,l[s==null?void 0:s.isportsapi].handicap=[],l[s==null?void 0:s.isportsapi].handicap.first=(M=(D=h.value)==null?void 0:D.find(p=>p.i_company_id===(s==null?void 0:s.isportsapi)&&p.type==="handicap"))==null?void 0:M.initial,l[s==null?void 0:s.isportsapi].handicap.live=(n=(S=h.value)==null?void 0:S.find(p=>p.i_company_id===(s==null?void 0:s.isportsapi)&&p.type==="handicap"))==null?void 0:n.instant,l[s==null?void 0:s.isportsapi].handicap.run=(b=(a=h.value)==null?void 0:a.find(p=>p.i_company_id===(s==null?void 0:s.isportsapi)&&p.type==="handicap"))==null?void 0:b.inplay,l[s==null?void 0:s.isportsapi].europeOdds=[],l[s==null?void 0:s.isportsapi].europeOdds.first=(k=(v=h.value)==null?void 0:v.find(p=>p.i_company_id===(s==null?void 0:s.isportsapi)&&p.type==="europeOdds"))==null?void 0:k.initial,l[s==null?void 0:s.isportsapi].europeOdds.live=(U=(E=h.value)==null?void 0:E.find(p=>p.i_company_id===(s==null?void 0:s.isportsapi)&&p.type==="europeOdds"))==null?void 0:U.instant,l[s==null?void 0:s.isportsapi].europeOdds.run=(C=(e=h.value)==null?void 0:e.find(p=>p.i_company_id===(s==null?void 0:s.isportsapi)&&p.type==="europeOdds"))==null?void 0:C.inplay,l[s==null?void 0:s.isportsapi].overUnder=[],l[s==null?void 0:s.isportsapi].overUnder.first=(q=(A=h.value)==null?void 0:A.find(p=>p.i_company_id===(s==null?void 0:s.isportsapi)&&p.type==="overUnder"))==null?void 0:q.initial,l[s==null?void 0:s.isportsapi].overUnder.live=(I=(V=h.value)==null?void 0:V.find(p=>p.i_company_id===(s==null?void 0:s.isportsapi)&&p.type==="overUnder"))==null?void 0:I.instant,l[s==null?void 0:s.isportsapi].overUnder.run=(J=(R=h.value)==null?void 0:R.find(p=>p.i_company_id===(s==null?void 0:s.isportsapi)&&p.type==="overUnder"))==null?void 0:J.inplay,typeof l[s==null?void 0:s.isportsapi].handicap.first>"u"&&typeof l[s==null?void 0:s.isportsapi].handicap.live>"u"&&typeof l[s==null?void 0:s.isportsapi].handicap.run>"u"&&typeof l[s==null?void 0:s.isportsapi].europeOdds.first>"u"&&typeof l[s==null?void 0:s.isportsapi].europeOdds.live>"u"&&typeof l[s==null?void 0:s.isportsapi].europeOdds.run>"u"&&typeof l[s==null?void 0:s.isportsapi].overUnder.first>"u"&&typeof l[s==null?void 0:s.isportsapi].overUnder.live>"u"&&typeof l[s==null?void 0:s.isportsapi].overUnder.run>"u"&&(l[s==null?void 0:s.isportsapi].isEmpty=!0),!j("oCompanyOddSelected").value&&!((B=O.value)!=null&&B.includes(s==null?void 0:s.id))&&O.value.push(s==null?void 0:s.id)}),K.value=l})};Q(()=>f==null?void 0:f.query,()=>{var d;Xs.value=((d=f==null?void 0:f.query)==null?void 0:d.type)||""},{immediate:!0}),Q(()=>f,d=>{var l;const u=(l=d==null?void 0:d.path)==null?void 0:l.match(/[^/-]+$/);as.value=u?u[0]:""},{immediate:!0}),Q(()=>f.query,d=>{var u;zs.value=((u=f.query)==null?void 0:u.haft)==1},{immediate:!0}),Q(()=>f.query,d=>{var D,M,S,n;const u=((D=f.query)==null?void 0:D.haft)==1?"europeanHaft":"europeOdds",l=((M=f.query)==null?void 0:M.haft)==1?"handicapHalf":"handicap",T=((S=f.query)==null?void 0:S.haft)==1?"overUnderHalf":"overUnder",s=[];(n=x)==null||n.forEach(a=>{var b,v,k,E,U,e,C,A,q,V,I,R,J,B,p,W,X,$;s[a==null?void 0:a.isportsapi]=[],s[a==null?void 0:a.isportsapi].id=a==null?void 0:a.id,s[a==null?void 0:a.isportsapi].isportsapi=a==null?void 0:a.isportsapi,s[a==null?void 0:a.isportsapi].name=a==null?void 0:a.name,s[a==null?void 0:a.isportsapi].handicap=[],s[a==null?void 0:a.isportsapi].handicap.first=(v=(b=h.value)==null?void 0:b.find(c=>c.i_company_id===(a==null?void 0:a.isportsapi)&&c.type===l))==null?void 0:v.initial,s[a==null?void 0:a.isportsapi].handicap.live=(E=(k=h.value)==null?void 0:k.find(c=>c.i_company_id===(a==null?void 0:a.isportsapi)&&c.type===l))==null?void 0:E.instant,s[a==null?void 0:a.isportsapi].handicap.run=(e=(U=h.value)==null?void 0:U.find(c=>c.i_company_id===(a==null?void 0:a.isportsapi)&&c.type===l))==null?void 0:e.inplay,s[a==null?void 0:a.isportsapi].europeOdds=[],s[a==null?void 0:a.isportsapi].europeOdds.first=(A=(C=h.value)==null?void 0:C.find(c=>c.i_company_id===(a==null?void 0:a.isportsapi)&&c.type===u))==null?void 0:A.initial,s[a==null?void 0:a.isportsapi].europeOdds.live=(V=(q=h.value)==null?void 0:q.find(c=>c.i_company_id===(a==null?void 0:a.isportsapi)&&c.type===u))==null?void 0:V.instant,s[a==null?void 0:a.isportsapi].europeOdds.run=(R=(I=h.value)==null?void 0:I.find(c=>c.i_company_id===(a==null?void 0:a.isportsapi)&&c.type===u))==null?void 0:R.inplay,s[a==null?void 0:a.isportsapi].overUnder=[],s[a==null?void 0:a.isportsapi].overUnder.first=(B=(J=h.value)==null?void 0:J.find(c=>c.i_company_id===(a==null?void 0:a.isportsapi)&&c.type===T))==null?void 0:B.initial,s[a==null?void 0:a.isportsapi].overUnder.live=(W=(p=h.value)==null?void 0:p.find(c=>c.i_company_id===(a==null?void 0:a.isportsapi)&&c.type===T))==null?void 0:W.instant,s[a==null?void 0:a.isportsapi].overUnder.run=($=(X=h.value)==null?void 0:X.find(c=>c.i_company_id===(a==null?void 0:a.isportsapi)&&c.type===T))==null?void 0:$.inplay,typeof s[a==null?void 0:a.isportsapi].handicap.first>"u"&&typeof s[a==null?void 0:a.isportsapi].handicap.live>"u"&&typeof s[a==null?void 0:a.isportsapi].handicap.run>"u"&&typeof s[a==null?void 0:a.isportsapi].europeOdds.first>"u"&&typeof s[a==null?void 0:a.isportsapi].europeOdds.live>"u"&&typeof s[a==null?void 0:a.isportsapi].europeOdds.run>"u"&&typeof s[a==null?void 0:a.isportsapi].overUnder.first>"u"&&typeof s[a==null?void 0:a.isportsapi].overUnder.live>"u"&&typeof s[a==null?void 0:a.isportsapi].overUnder.run>"u"&&(s[a==null?void 0:a.isportsapi].isEmpty=!0)}),K.value=s},{immediate:!0});const da=d=>{var u,l,T,s,D,M,S;if(d)try{const n=d;if(Ys.value=n,Ks("socketData",n),n.payload.iodds){const a=n.payload.iodds,b=((u=f.query)==null?void 0:u.haft)==1?"overUnderHalf":"overUnder";if(a!=null&&a[b])for(const v of a==null?void 0:a[b]){const k=ya(N(v,0)),E=N(v,1),U=N(v,7);if(k==((T=(l=is.value)==null?void 0:l.match)==null?void 0:T.i_match_id)){const e=(s=K.value)==null?void 0:s.find(C=>(C==null?void 0:C.isportsapi)==E);e&&(e!=null&&e.overUnder||(e.overUnder=[],e.overUnder.first=[],e.overUnder.live=[],e.overUnder.run=[]),U==1?(e.overUnder.first_older=(D=e==null?void 0:e.overUnder)!=null&&D.first?JSON.parse(JSON.stringify(e.overUnder.first)):[],e.overUnder.first=[[N(v,2)],[N(v,3)],[N(v,4)]]):U==2?(e.overUnder.live_older=(M=e==null?void 0:e.overUnder)!=null&&M.live?JSON.parse(JSON.stringify(e.overUnder.live)):[],e.overUnder.live=[[N(v,2)],[N(v,3)],[N(v,4)]]):U==3&&(e.overUnder.run_older=(S=e==null?void 0:e.overUnder)!=null&&S.run?JSON.parse(JSON.stringify(e.overUnder.run)):[],e.overUnder.run=[[N(v,2)],[N(v,3)],[N(v,4)]]))}}}}catch{return!1}};Q(Z,()=>{da(Z==null?void 0:Z.socketData)},{deep:!0,immediate:!0}),[us,ts]=ia(()=>sa()),await us,ts(),oa(as.value);const gs=async()=>{_s.value||(_s.value=!0,await _a(),os.modal_filter_comp=new bootstrap.Modal("#modal_filter_comp",{}),ns.modal_detail_win=new bootstrap.Modal("#modal_detail_win",{}))};return va(async()=>{}),(d,u)=>{var s,D,M,S;const l=la,T=Ca;return F(),H("div",wa,[o("div",Na,[o("div",Ta,[t(Vs(l,{titleList:$s.value,modelValue:P.value,"onUpdate:modelValue":u[0]||(u[0]=n=>P.value=n)},null,8,["titleList","modelValue"]),[[i,r(y)]]),o("div",Da,[o("table",Ma,[o("tbody",null,[o("tr",{class:"tr-title"},[o("th",{colspan:"2",rowspan:"2"},[Sa,o("img",{src:Oa,alt:"plus",onClick:xs})]),ka]),Ea,(F(!0),H(rs,null,es((s=K.value)==null?void 0:s.filter(n=>n!==null&&!(n!=null&&n.isEmpty)&&O.value.includes(n==null?void 0:n.id)),(n,a)=>(F(),H("tr",{class:w((a%2!==0,"tb-bgcolor1"))},[o("td",La,[o("span",null,g(n==null?void 0:n.name),1)])],2))),256))])]),o("div",Aa,[o("table",qa,[o("tbody",null,[o("tr",Va,[t(o("th",Ia,Ja,512),[[i,!r(y)]]),t(o("th",Ba,Ha,512),[[i,!r(y)]]),t(o("th",Ka,za,512),[[i,!r(y)]]),t(o("th",Pa,Xa,512),[[i,!r(y)]])]),o("tr",$a,[ja,Qa,Za,t(o("th",null,"Tài",512),[[i,!r(y)]]),t(o("th",null,"Kèo",512),[[i,!r(y)]]),t(o("th",null,"Xỉu",512),[[i,!r(y)]]),t(o("th",null,"Tài",512),[[i,!r(y)]]),t(o("th",null,"Kèo",512),[[i,!r(y)]]),t(o("th",null,"Xỉu",512),[[i,!r(y)]]),t(o("th",null,"Chi tiết",512),[[i,r(y)]])]),(F(!0),H(rs,null,es((D=K.value)==null?void 0:D.filter(n=>n!==null&&!(n!=null&&n.isEmpty)&&O.value.includes(n==null?void 0:n.id)),(n,a)=>{var b,v,k,E,U,e,C,A,q,V,I,R,J,B,p,W,X,$,c,Us,Cs,ws,Ns,Ts,Ds,Ms,Ss,ks,Es,Ls;return F(),H("tr",{name:"oddsTr",style:{"text-align":"center"},cid:"3",class:w((a%2!==0,"tb-bgcolor1"))},[t(o("td",Ga,[o("span",{class:w(["",("getClassOddChange"in d?d.getClassOddChange:r(Y))(n==null?void 0:n.overUnder,1,1)])},g(("getOddNumberToNegative"in d?d.getOddNumberToNegative:r(z))((v=(b=n==null?void 0:n.overUnder)==null?void 0:b.first)==null?void 0:v[1])),3)],512),[[i,r(L).first]]),t(o("td",xa,[o("span",{class:w(["",("getClassOddChange"in d?d.getClassOddChange:r(Y))(n==null?void 0:n.overUnder,0,1)])},g(("getOddNumber"in d?d.getOddNumber:r(ps))((E=(k=n==null?void 0:n.overUnder)==null?void 0:k.first)==null?void 0:E[0])),3)],512),[[i,r(L).first]]),t(o("td",ma,[o("span",{class:w(("getClassOddChange"in d?d.getClassOddChange:r(Y))(n==null?void 0:n.overUnder,2,1))},g(("getOddNumberToNegative"in d?d.getOddNumberToNegative:r(z))((e=(U=n==null?void 0:n.overUnder)==null?void 0:U.first)==null?void 0:e[2])),3)],512),[[i,r(L).first]]),t(o("td",sn,[o("span",{class:w(["",("getOddChange"in d?d.getOddChange:r(cs))((A=(C=n==null?void 0:n.overUnder)==null?void 0:C.live)==null?void 0:A[1],(V=(q=n==null?void 0:n.overUnder)==null?void 0:q.first)==null?void 0:V[1])])},g(("getOddNumberToNegative"in d?d.getOddNumberToNegative:r(z))((R=(I=n==null?void 0:n.overUnder)==null?void 0:I.live)==null?void 0:R[1])),3)],512),[[i,r(L).second]]),t(o("td",an,[o("span",{class:w(["",("getOddChange"in d?d.getOddChange:r(cs))((B=(J=n==null?void 0:n.overUnder)==null?void 0:J.live)==null?void 0:B[0],(W=(p=n==null?void 0:n.overUnder)==null?void 0:p.first)==null?void 0:W[0])])},g(("getOddNumber"in d?d.getOddNumber:r(ps))(($=(X=n==null?void 0:n.overUnder)==null?void 0:X.live)==null?void 0:$[0])),3)],512),[[i,r(L).second]]),t(o("td",nn,[o("span",{class:w(("getOddChange"in d?d.getOddChange:r(cs))((Us=(c=n==null?void 0:n.overUnder)==null?void 0:c.live)==null?void 0:Us[2],(ws=(Cs=n==null?void 0:n.overUnder)==null?void 0:Cs.first)==null?void 0:ws[2]))},g(("getOddNumberToNegative"in d?d.getOddNumberToNegative:r(z))((Ts=(Ns=n==null?void 0:n.overUnder)==null?void 0:Ns.live)==null?void 0:Ts[2])),3)],512),[[i,r(L).second]]),t(o("td",on,[o("span",{class:w(["",("getClassOddChange"in d?d.getClassOddChange:r(Y))(n==null?void 0:n.overUnder,1)])},g(("getOddNumberToNegative"in d?d.getOddNumberToNegative:r(z))((Ms=(Ds=n==null?void 0:n.overUnder)==null?void 0:Ds.run)==null?void 0:Ms[1])),3)],512),[[i,r(L).third]]),t(o("td",dn,[o("span",{class:w(["",("getClassOddChange"in d?d.getClassOddChange:r(Y))(n==null?void 0:n.overUnder,0)])},g(("getOddNumber"in d?d.getOddNumber:r(ps))((ks=(Ss=n==null?void 0:n.overUnder)==null?void 0:Ss.run)==null?void 0:ks[0])),3)],512),[[i,r(L).third]]),t(o("td",ln,[o("span",{class:w(("getClassOddChange"in d?d.getClassOddChange:r(Y))(n==null?void 0:n.overUnder,2))},g(("getOddNumberToNegative"in d?d.getOddNumberToNegative:r(z))((Ls=(Es=n==null?void 0:n.overUnder)==null?void 0:Es.run)==null?void 0:Ls[2])),3)],512),[[i,r(L).third]]),o("td",rn,[o("span",{class:"odd_a",onClick:Ln=>Zs(n==null?void 0:n.isportsapi,n==null?void 0:n.name)},"Thay đổi",8,en)])],2)}),256))])])])])]),o("div",pn,[ys.value?(F(),H("h1",cn,g(ys.value),1)):ha("",!0),Is(" "+g(js.value),1)])]),o("div",un,[o("div",tn,[o("div",vn,[o("div",hn,[o("div",_n,g(vs.value)+" Tỷ lệ thay đổi ",1),o("button",{type:"button",class:"btn-close","aria-label":"Close",onClick:Gs})]),o("div",fn,[o("div",yn,[o("div",gn,[Vs(T,{"odd-comp-id":hs.value,"match-id":as.value,section:"ahDetail","odd-companys-list":K.value,"refresh-time":fs.value},null,8,["odd-comp-id","match-id","odd-companys-list","refresh-time"])])])])])])]),o("div",On,[o("div",bn,[o("div",Un,[o("div",{class:"modal-header"},[Cn,o("button",{type:"button",class:"btn-close","aria-label":"Close",onClick:ms})]),o("div",wn,[o("div",Nn,[o("ul",Tn,[(F(!0),H(rs,null,es("ODD_COMPANYS"in d?d.ODD_COMPANYS:r(x),(n,a)=>(F(),H("li",{class:w(["complist",O.value.includes(n==null?void 0:n.id)?"on":""]),key:a,value:n==null?void 0:n.id,onClick:b=>na(n==null?void 0:n.id)},[Mn,Is(" "+g(n==null?void 0:n.name),1)],10,Dn))),128))]),t(o("div",Sn,"*Chọn ít nhất 1 công ty",512),[[i,((M=O.value)==null?void 0:M.length)===0]])])]),o("div",kn,[o("button",{type:"button",class:"btn btn-primary",disabled:((S=O.value)==null?void 0:S.length)===0},"OK",8,En)])])])])])}}});export{Pn as _};
