import{c as bo}from"./CF2VPTuC.js";import{d as Io,r as c,c3 as wo,J as Xs,s as Ao,e as Ss,w as z,t as ao,o as h,c as S,h as t,v as D,bG as Uo,i as g,m as Ts,F as H,z as ss,x as K,y as V,K as os,B as ms,A as E,j as Do,V as Y,l as so,E as Vo,L as No,C as Fo,D as $o,R as Bo,_ as Po}from"./CnJNAMZb.js";import{_ as Ho}from"./CF8EZ_pR.js";import{i as as,O as Ko,c as J,b as Jo}from"./DRizsLw2.js";import{p as us,g as Go}from"./3bue5Vy1.js";import{A as G,R as ns}from"./Bxk5PY0E.js";import{s as Ls,u as q,P as qo,m as xo,O as zo,l as y}from"./00yf2fq6.js";import{m as es,f as jo,s as Wo}from"./Cbzb-SDH.js";import{useIntersectionObserver as oo}from"./B2gsc1f-.js";import{a as Yo}from"./DuHqTucL.js";import{s as Zo}from"./D0xLcGF1.js";import{s as Qo}from"./C_-dA3Th.js";import{u as Xo}from"./sa_3Auql.js";import"./DaEl2alL.js";import{u as mo}from"./B0IwuF_2.js";import"./7sItJrXI.js";import"./C4iS2aBk.js";import"./DUjn5l1T.js";import"./DSYfm7We.js";const N=Z=>(Fo("data-v-16e8a1d6"),Z=Z(),$o(),Z),sa={class:"modal-content searchWin"},oa={class:"modal-header"},aa=N(()=>t("div",{class:"modal-title d-none",id:"modal_search_label"},"Search",-1)),na={class:"popupbox sch hot"},ea={class:"popuptit"},la=N(()=>t("span",{class:"tit"},"Tìm kiếm",-1)),ta={class:"searchbox fl"},ca=["autofocus"],ia={class:"typebtn sort"},ua={class:"modal-body"},da={class:"layui-layer-content oddscomp-filterwin"},ra={id:"",class:"layui-layer-content"},va={class:"popupbox sch"},_a={id:"searchDiv",class:"popupinfo"},pa={key:0,id:"searchMatchDiv",class:"searchDiv searchDiv1"},fa={class:"leaguetit"},ha=["onClick"],ya=["onClick"],Sa={class:"mh2"},Ta={class:"scorelists","data-mlid":"2"},La=["onClick"],ga=["onClick"],Ea={class:"time"},Oa=["innerHTML"],Ca={class:"htname"},ka={class:"score ft"},Ra={class:"gtname"},Ma={key:1,class:"popupinfo searchwin_nodata nodata"},ba=N(()=>t("div",{class:"mh2"},"Không tìm thấy kết quả",-1)),Ia={key:1,id:"searchLeagueResultDiv",class:"searchDiv searchDiv2"},wa={key:0},Aa={class:"sch_box fl"},Ua={class:"remark"},Da=["onClick"],Va=["onClick"],Na={key:1,class:"popupinfo searchwin_nodata nodata"},Fa=N(()=>t("div",{class:"mh2"},"Không tìm thấy kết quả",-1)),$a={key:2,id:"searchTeamResultDiv",class:"searchDiv searchDiv3"},Ba={key:0},Pa={class:"sch_box fl"},Ha={class:"remark"},Ka=["onClick"],Ja=["onClick"],Ga={key:1,class:"popupinfo searchwin_nodata nodata"},qa=N(()=>t("div",{class:"mh2"},"Không tìm thấy kết quả",-1)),xa={key:1,class:"popupinfo searchwin_nodata nodata"},za=N(()=>t("div",{class:"mh2"},"Loading...",-1)),ja=[za],Wa={key:1,class:"popupinfo searchwin_nodata"},Ya=N(()=>t("div",{class:"mh2"},"Vui lòng nhập ít nhất 3 ký tự. Kết quả tìm kiếm sẽ ngay lập tức hiển thị ở đây",-1)),Za={class:"hotlist"},Qa=N(()=>t("div",{class:"title"},"Giải đấu hot",-1)),Xa=["src","alt"],ma=N(()=>t("div",{class:"modal-footer",style:{display:"none"}},[t("button",{type:"button",class:"btn btn-primary"},"OK")],-1)),ds=10,sn=Io({__name:"SearchPopupComponent.client",props:{page:{},isLoading:{type:Boolean},content:{},favorites:{}},setup(Z,{emit:rs}){var Ns,Fs,$s,Bs,Ps,Hs,Ks,Js;es.locale("vi");const F=Yo();Qo();const Q=Xo();c();const A=Zo();wo();const L=Xs();Xs();const no=c(""),vs=c(),j=c([]),gs=c([]);c([]);const ls=c([]),eo=c([]),lo=c(),ts=c([]),to=c([]),$=c(),O=c([]),Es=c([]),co=c(((Fs=(Ns=L==null?void 0:L.currentRoute)==null?void 0:Ns.value)==null?void 0:Fs.hash)==="#hot"?as.HOT:as.ALL),io=c(!1);c(!0);const uo=c(Ko),ro=c([]),vo=c(!0),_o=c(),b=c(),cs=c([]),_s=c([]),k=c(us((Ps=(Bs=($s=L==null?void 0:L.currentRoute)==null?void 0:$s.value)==null?void 0:Bs.params)==null?void 0:Ps.query)||1),Os=c([]),X=c([]),m=c(!1),W=c(),po=c([]),ps=c([]),Cs=c(null);c(null);const fo=c(null),ho=c(null),yo=c(ds),So=c(ds),B=c([]),I=c([]),P=c([]);c(null);const U=c(null),fs=c(1),hs=c(1),ks=Ao({modal_search:null}),To=async(o=1)=>{const{$loadScripts:a}=Bo();a().then(async()=>{await Vo(),ks.modal_search=new bootstrap.Modal("#modal_search",{}),W.value="",U.value="",ks.modal_search.show(),k.value=o,await Ro(Lo.value),await ko(),await Vs(),setTimeout(()=>{var f;const p=((f=U==null?void 0:U.value)==null?void 0:f.$el)||(U==null?void 0:U.value);p&&p.focus()},500)})},Rs=mo(()=>{var o,a;((a=(o=W.value)==null?void 0:o.trim())==null?void 0:a.length)>=3?b.value=W.value.trim():b.value=""},300),ys=async o=>{k.value=o,k.value===2?Vs():k.value===3&&(b.value!==""?(m.value=!0,await q(G.LIVESCORE.TEAMS+"?name="+b.value).then(a=>{a&&(X.value=a==null?void 0:a.results),m.value=!1})):X.value=[])},Ms=Ss("favouritesData",{maxAge:60*60*24}),bs=Ss("favouritesLeagues",{maxAge:60*60*24}),Is=Ss("favouritesTeams",{maxAge:60*60*24}),ws=(Js=(Ks=(Hs=L==null?void 0:L.currentRoute)==null?void 0:Hs.value)==null?void 0:Ks.query)==null?void 0:Js.date,Lo=c(ws||es().format("yyyy-MM-DD"));oo(fo,([{isIntersecting:o}])=>{o&&(yo.value+=ds)},{matchesList:Cs}),oo(ho,([{isIntersecting:o}])=>{o&&(So.value+=ds)},{matchesList:Cs});const go=o=>{var a;(a=B.value)!=null&&a.includes(o)||B.value.push(o),Ms.value=JSON.stringify(B.value)},Eo=o=>{const a=B.value.indexOf(o,0);a>-1&&B.value.splice(a,1),Ms.value=JSON.stringify(B.value)},As=o=>{var a;(a=I.value)!=null&&a.includes(o)||I.value.push(o),bs.value=JSON.stringify(I.value)},Us=o=>{const a=I.value.indexOf(o,0);a>-1&&I.value.splice(a,1),bs.value=JSON.stringify(I.value)},Oo=o=>{var a;(a=P.value)!=null&&a.includes(o)||P.value.push(o),Is.value=JSON.stringify(P.value)},Co=o=>{const a=P.value.indexOf(o,0);a>-1&&P.value.splice(a,1),Is.value=JSON.stringify(P.value)},ko=async()=>{await q(G.LIVESCORE.COUNTRIES).then(o=>{var a,p;ps.value=(a=o==null?void 0:o.results)==null?void 0:a.sort((f,v)=>f.name>v.name?1:v.name>f.name?-1:0),po.value=ps.value,(p=ps.value)==null||p.forEach(f=>{_s.value[f==null?void 0:f.id]=f})})},Ds=()=>{var v,w,R,C;j.value=Ls(ls.value,s=>s.id);let o=[],a=[];const p=(v=b.value)==null?void 0:v.toUpperCase();typeof b.value<"u"&&(cs.value=(w=ls.value)==null?void 0:w.filter(s=>{var _,r,u,n,l,i;return((r=(_=s==null?void 0:s.comp_name_vi_overwrite)==null?void 0:_.toUpperCase())==null?void 0:r.includes(p))||((n=(u=s==null?void 0:s.comp_name_vi)==null?void 0:u.toUpperCase())==null?void 0:n.includes(p))||((i=(l=s==null?void 0:s.comp_name)==null?void 0:l.toUpperCase())==null?void 0:i.includes(p))}),o=(R=cs.value)==null?void 0:R.map(s=>s.id),hs.value=(C=cs.value)==null?void 0:C.length),Object.keys($.value).map(s=>{var _,r,u,n,l,i,e,d,T;typeof b.value<"u"&&((n=(u=(r=(_=$.value[s])==null?void 0:_.home_team)==null?void 0:r.name)==null?void 0:u.toUpperCase())!=null&&n.includes(p)||(d=(e=(i=(l=$.value[s])==null?void 0:l.away_team)==null?void 0:i.name)==null?void 0:e.toUpperCase())!=null&&d.includes(p)||o.includes((T=$.value[s])==null?void 0:T.competition))&&a.push($.value[s])}),fs.value=a==null?void 0:a.length;let f=Wo(a,!1);f=zo(f),gs.value=f,io.value=!1},Ro=async(o=null)=>{var u;await q(G.LIVESCORE.COMP_LIST_ALL).then(n=>{ls.value=n,ts.value=n,to.value=n;const l=[];n.forEach(i=>{eo.value[i==null?void 0:i.id]=!0,l[i==null?void 0:i.id]=i}),lo.value=l});const a=[...J.IS_LIVE,...J.NOT_START,...J.NOT_LIVE,...J.IS_END].toString(),p={date:es().format("yyyy-MM-DD"),tz:String(Go(A==null?void 0:A.configurations,"TIMEZONE")??"GMT+07:00").slice(3)};a!==null&&(p.status=a);const[f,v,w]=await Promise.all([q(G.LIVESCORE.MATCHS_RECENT,{...p,date:es().clone().subtract(1,"days").format("yyyy-MM-DD")}),q(G.LIVESCORE.MATCHS_RECENT,p),q(G.LIVESCORE.MATCHS_RECENT,{...p,date:es().clone().add(1,"days").format("yyyy-MM-DD")})]),R=[...f,...v,...w].reduce((n,l)=>n.find(e=>e.id===l.id)?n:n.concat([l]),[]),C=[],s=R?[...Es.value,...R]:Es.value;s.forEach(n=>{var l;n.odds=((l=ro.value)==null?void 0:l[n.i_match_id])||[],C[n==null?void 0:n.id]=n}),O.value=C,$.value=Object.assign([],C);const _=Ls(s,n=>n.competition),r=[..._.keys()];ts.value=(u=ls.value)==null?void 0:u.filter(n=>r==null?void 0:r.includes(n==null?void 0:n.id)).map(n=>(n.matchs=_==null?void 0:_.get(n==null?void 0:n.id),n))},Vs=async()=>{await q(G.LIVESCORE.COMP_LIST,{limit:8,page:1,hot:"5"}).then(async o=>{Os.value=o})},Mo=o=>{var a,p,f,v,w,R,C,s;if(o)try{const _=Jo.find(({id:u})=>u===uo.value),r=o;if((a=r==null?void 0:r.payload)!=null&&a.match_live){const u=r.payload.match_live,n={3:"HT",8:"Fulltime",7:"PS",5:"OT",9:"Delay"};for(const l of u){const i=l.matchId,e=l.status,d=l.timestamp_kick_off,T=Math.floor(Date.now()/1e3);if(e!==1&&d!==0&&O.value[i]){let M=null;e===2?(M=`<i class="fas fa-circle blink-icon"></i><span class="countstatus">${Math.floor((T-d)/60+1)}</span>`,O.value[i].matchMinutes=M):(e===4&&(M=`<i class="fas fa-circle blink-icon"></i><span class="countstatus">${Math.floor((T-d)/60+45+1)}</span>`),O.value[i].matchMinutes=M)}}}else if((p=r==null?void 0:r.payload)!=null&&p.iodds){const u=r.payload.iodds,n=[];if(u!=null&&u.handicap)for(const l of u.handicap){const i=us(y(l,0)),e=y(l,1);if(e==(_==null?void 0:_.isportsapi)&&(n[i]||(n[i]=[]),n[i][0]=y(l,2)+","+y(l,3)+","+y(l,4),showWinScoreOdds.value&&((f=matchHover.value)==null?void 0:f.i_match_id)==i)){let d=(v=oddsDetail.value)==null?void 0:v.find(T=>T.i_company_id==e&&T.i_match_id==i&&T.type=="handicap");d&&(d.instant_older=JSON.parse(JSON.stringify(d.instant)),d.instant="["+y(l,2)+","+y(l,3)+","+y(l,4)+"]")}}if(u!=null&&u.overUnder)for(const l of u.overUnder){const i=us(y(l,0)),e=y(l,1);if(e==(_==null?void 0:_.isportsapi)){n[i]||(n[i]=[]),n[i][1]=y(l,2)+","+y(l,3)+","+y(l,4);let d=(w=oddsDetail.value)==null?void 0:w.find(T=>T.i_company_id==e&&T.i_match_id==i&&T.type=="overUnder");d&&(d.instant_older=JSON.parse(JSON.stringify(d.instant)),d.instant="["+y(l,2)+","+y(l,3)+","+y(l,4)+"]")}}if(u!=null&&u.europeOdds)for(const l of u.europeOdds){const i=us(y(l,0)),e=y(l,1);if(e==(_==null?void 0:_.isportsapi)){n[i]||(n[i]=[]),n[i][2]=y(l,2)+","+y(l,3)+","+y(l,4);let d=(R=oddsDetail.value)==null?void 0:R.find(T=>T.i_company_id==e&&T.i_match_id==i&&T.type=="europeOdds");d&&(d.instant_older=JSON.parse(JSON.stringify(d.instant)),d.instant="["+y(l,2)+","+y(l,3)+","+y(l,4)+"]")}}oddsIMainWS.value=n}else if(r!=null&&r.topic&&r.topic=="thesports/football/match/v1"){const u=r.payload;for(const n of u){const l=n.id;O.value[l]&&(n!=null&&n.score)&&(O.value[l].home_scores=(C=n==null?void 0:n.score)==null?void 0:C[2],O.value[l].away_scores=(s=n==null?void 0:n.score)==null?void 0:s[3])}}}catch{return!1}};return z(co,o=>{var a;if(_o.value=null,o===as.HOT){vs.value=(a=ts.value)==null?void 0:a.filter(v=>(v==null?void 0:v.number_hot)===5||(v==null?void 0:v.number_hot)===4||(v==null?void 0:v.number_hot)===3);const f=[...Ls(vs.value,v=>v.id).keys()];O.value=Object.values($.value).filter(v=>f.includes(v==null?void 0:v.competition))}else o===as.ALL?(vs.value=ts.value,O.value=$.value):as.LEAGUE}),z(b,async o=>{b.value!==""?(Ds(),k.value===3&&(m.value=!0,await q(G.LIVESCORE.TEAMS+"?name="+b.value).then(a=>{a&&(X.value=a==null?void 0:a.results),m.value=!1}))):(O.value=[],fs.value=0,hs.value=0)},{deep:!0}),z([O,vo],([o,a],[p,f])=>{Ds()},{deep:!0}),z(()=>{var o,a;return(a=(o=L==null?void 0:L.currentRoute)==null?void 0:o.value)==null?void 0:a.path},()=>{var o,a;no.value=(a=(o=L==null?void 0:L.currentRoute)==null?void 0:o.value)==null?void 0:a.path},{deep:!0,immediate:!0}),z(A,()=>{U.value=A==null?void 0:A.keywordSearch}),z(F,()=>{F!=null&&F.isOpenSearchForm&&To(F==null?void 0:F.isOpenSearchForm)},{deep:!0,immediate:!0}),z(Q,()=>{Mo(Q==null?void 0:Q.socketData)},{deep:!0,immediate:!0}),ao(async()=>{}),(o,a)=>{var v,w,R,C;const p=No,f=Ho;return h(),S("div",sa,[t("div",oa,[aa,t("div",na,[t("div",ea,[la,t("span",ta,[D(t("input",{"onUpdate:modelValue":a[0]||(a[0]=s=>W.value=s),ref_key:"searchInput",ref:U,type:"text",onInput:a[1]||(a[1]=(...s)=>g(Rs)&&g(Rs)(...s)),autofocus:o.isautofocus,autocomplete:"off",placeholder:"Giải đấu/Đội bóng",title:"Search"},null,40,ca),[[Uo,W.value]])]),t("ul",ia,[t("li",{id:"searchTab1",class:Ts(["nav-link searchTab",k.value===1?"on":""]),onClick:a[2]||(a[2]=s=>ys(1))},"Trận",2),t("li",{id:"searchTab2",class:Ts(["nav-link searchTab",k.value===2?"on":""]),onClick:a[3]||(a[3]=s=>ys(2))},"Giải đấu",2),t("li",{id:"searchTab3",class:Ts(["nav-link searchTab",k.value===3?"on":""]),onClick:a[4]||(a[4]=s=>ys(3))},"Đội",2)])])])]),t("div",ua,[t("div",da,[t("div",ra,[t("div",va,[t("div",_a,[((w=(v=W.value)==null?void 0:v.trim())==null?void 0:w.length)>=3?(h(),S(H,{key:0},[k.value===1?(h(),S("div",pa,[fs.value>0?(h(!0),S(H,{key:0},ss(gs.value,(s,_)=>{var r,u,n,l,i;return h(),S(H,{key:_},[t("div",fa,[D(t("i",{class:"icon iconfont icon-font-collect-off add-info-l l0 favL favL_25",title:"Theo dõi giải đấu",onClick:e=>{var d;return As((d=s==null?void 0:s[1])==null?void 0:d[0].competition)}},null,8,ha),[[K,!((u=I.value)!=null&&u.includes((r=s==null?void 0:s[1])==null?void 0:r[0].competition))]]),D(t("i",{class:"icon iconfont l0 favL favL_284 on icon-font-collect-on add-info-l2",onClick:e=>{var d;return Us((d=s==null?void 0:s[1])==null?void 0:d[0].competition)}},null,8,ya),[[K,(l=I.value)==null?void 0:l.includes((n=s==null?void 0:s[1])==null?void 0:n[0].competition)]]),t("div",Sa,[V(p,{to:("ROUTERS"in o?o.ROUTERS:g(ns)).LEAGUES+"/"+((i=s==null?void 0:s[1])==null?void 0:i[0].competition),target:"_blank",class:"match"},{default:os(()=>{var e,d,T,M,x,is,Gs,qs,xs,zs,js,Ws,Ys,Zs,Qs;return[ms(E(((T=(d=j.value.get((e=s==null?void 0:s[1])==null?void 0:e[0].competition))==null?void 0:d[0])==null?void 0:T.comp_name_vi_overwrite)||((is=(x=j.value.get((M=s==null?void 0:s[1])==null?void 0:M[0].competition))==null?void 0:x[0])==null?void 0:is.comp_name_vi)||((xs=(qs=j.value.get((Gs=s==null?void 0:s[1])==null?void 0:Gs[0].competition))==null?void 0:qs[0])==null?void 0:xs.comp_name))+" "+E((Ws=(js=j.value.get((zs=s==null?void 0:s[1])==null?void 0:zs[0].competition))==null?void 0:js[0])!=null&&Ws.season_year?" - "+((Qs=(Zs=j.value.get((Ys=s==null?void 0:s[1])==null?void 0:Ys[0].competition))==null?void 0:Zs[0])==null?void 0:Qs.season_year):""),1)]}),_:2},1032,["to"])])]),(h(!0),S(H,null,ss(s[1],e=>(h(),Do(p,{key:e==null?void 0:e.id,to:("ROUTERS"in o?o.ROUTERS:g(ns)).MATCH_DETAIL+(e==null?void 0:e.id),target:"_blank",class:"match"},{default:os(()=>{var d,T,M,x;return[t("div",Ta,[D(t("i",{class:"icon iconfont icon-font-collect-off add-info favM",title:"Theo dõi trận đấu",onClick:Y(is=>go(e==null?void 0:e.id),["prevent"])},null,8,La),[[K,!((d=B.value)!=null&&d.includes(e==null?void 0:e.id))]]),D(t("i",{class:"icon iconfont favM on icon-font-collect-on add-info2",onClick:Y(is=>Eo(e==null?void 0:e.id),["prevent"])},null,8,ga),[[K,(T=B.value)==null?void 0:T.includes(e==null?void 0:e.id)]]),t("span",Ea,E(g(jo)(e==null?void 0:e.match_time,"DD/MM HH:mm")),1),t("span",{class:"state",innerHTML:g(qo)(e,o.$t)},null,8,Oa),t("span",Ca,E((M=e==null?void 0:e.home_team)==null?void 0:M.name),1),t("span",ka,E([...("LIVESCORE_STATUS"in o?o.LIVESCORE_STATUS:g(J)).NOT_START,...("LIVESCORE_STATUS"in o?o.LIVESCORE_STATUS:g(J)).NOT_LIVE].includes(e.status)?"":typeof(e==null?void 0:e.home_scores[0])<"u"?e==null?void 0:e.home_scores[0]:"")+" - "+E([...("LIVESCORE_STATUS"in o?o.LIVESCORE_STATUS:g(J)).NOT_START,...("LIVESCORE_STATUS"in o?o.LIVESCORE_STATUS:g(J)).NOT_LIVE].includes(e.status)?"":typeof(e==null?void 0:e.away_scores[0])<"u"?e==null?void 0:e.away_scores[0]:""),1),t("span",Ra,E((x=e==null?void 0:e.away_team)==null?void 0:x.name),1)])]}),_:2},1032,["to"]))),128))],64)}),128)):(h(),S("div",Ma,[V(f,{loading:"lazy",class:"nodata_pic",alt:"nodata pic",width:"200",height:"200",src:"/icon/nodata.svg"}),ba]))])):k.value===2?(h(),S("div",Ia,[hs.value>0?(h(),S("ul",wa,[(h(!0),S(H,null,ss(cs.value,(s,_)=>(h(),S("li",{key:_,class:"sch_list"},[V(p,{to:("ROUTERS"in o?o.ROUTERS:g(ns)).LEAGUES+"/"+(s==null?void 0:s.id),target:"_blank",class:"match"},{default:os(()=>{var r,u,n,l;return[t("div",Aa,[t("b",null,E((s==null?void 0:s.comp_name_vi_overwrite)||(s==null?void 0:s.comp_name_vi)||(s==null?void 0:s.comp_name))+" "+E(s!=null&&s.season_year?" - "+(s==null?void 0:s.season_year):""),1),t("span",Ua,E(((u=(r=_s.value)==null?void 0:r[s==null?void 0:s.country])==null?void 0:u.name)??"Khác"),1)]),D(t("i",{class:"icon iconfont icon-font-collect-off add-info-l l0 favL favL_25",title:"Theo dõi giải đấu",onClick:Y(i=>As(s==null?void 0:s.id),["prevent"])},null,8,Da),[[K,!((n=I.value)!=null&&n.includes(s==null?void 0:s.id))]]),D(t("i",{class:"icon iconfont l0 favL favL_284 on icon-font-collect-on add-info-l2",onClick:Y(i=>Us(s==null?void 0:s.id),["prevent"])},null,8,Va),[[K,(l=I.value)==null?void 0:l.includes(s==null?void 0:s.id)]])]}),_:2},1032,["to"])]))),128))])):(h(),S("div",Na,[V(f,{loading:"lazy",class:"nodata_pic",alt:"nodata pic",width:"200",height:"200",src:"/icon/nodata.svg"}),Fa]))])):k.value===3?(h(),S("div",$a,[m.value?(h(),S("div",xa,ja)):(h(),S(H,{key:0},[((R=X.value)==null?void 0:R.length)>0?(h(),S("ul",Ba,[(h(!0),S(H,null,ss(X.value,(s,_)=>(h(),S("li",{key:_,class:"sch_list"},[V(p,{to:("ROUTERS"in o?o.ROUTERS:g(ns)).TEAM+(s==null?void 0:s.id),target:"_blank",class:"match"},{default:os(()=>{var r,u,n,l;return[t("div",Pa,[t("b",null,E(s==null?void 0:s.name),1),t("span",Ha,E(((u=(r=_s.value)==null?void 0:r[s==null?void 0:s.country])==null?void 0:u.name)??"Khác"),1)]),D(t("i",{class:"icon iconfont icon-font-collect-off add-info-l l0 favL favL_25",title:"Theo dõi giải đấu",onClick:Y(i=>Oo(s==null?void 0:s.id),["prevent"])},null,8,Ka),[[K,!((n=P.value)!=null&&n.includes(s==null?void 0:s.id))]]),D(t("i",{class:"icon iconfont l0 favL favL_284 on icon-font-collect-on add-info-l2",onClick:Y(i=>Co(s==null?void 0:s.id),["prevent"])},null,8,Ja),[[K,(l=P.value)==null?void 0:l.includes(s==null?void 0:s.id)]])]}),_:2},1032,["to"])]))),128))])):(h(),S("div",Ga,[V(f,{loading:"lazy",class:"nodata_pic",alt:"nodata pic",width:"200",height:"200",src:"/icon/nodata.svg"}),qa]))],64))])):so("",!0)],64)):(h(),S("div",Wa,[V(f,{loading:"lazy",class:"nodata_pic",alt:"nodata pic",width:"200",height:"200",src:"/icon/nodata.svg"}),Ya,t("div",Za,[Qa,t("ul",null,[(h(!0),S(H,null,ss((C=Os.value)==null?void 0:C.slice(0,8),(s,_)=>(h(),S("li",{key:_},[V(p,{to:("ROUTERS"in o?o.ROUTERS:g(ns)).LEAGUES+"/"+(s==null?void 0:s.id),class:"match",target:"_blank"},{default:os(()=>[s!=null&&s.comp_logo?(h(),S("img",{key:0,src:("getLiveScoreImage"in o?o.getLiveScoreImage:g(xo))(s==null?void 0:s.comp_logo,"competition")+"!h20",alt:(s==null?void 0:s.comp_name_vi)??(s==null?void 0:s.comp_name)},null,8,Xa)):so("",!0),ms(" "+E((s==null?void 0:s.comp_name_vi_overwrite)||(s==null?void 0:s.comp_name_vi)||(s==null?void 0:s.comp_name)),1)]),_:2},1032,["to"])]))),128))])])]))])])])])]),ma])}}}),on=Po(sn,[["__scopeId","data-v-16e8a1d6"]]),an=bo(on),nn={class:"modal fade",id:"modal_search",tabindex:"-1","aria-labelledby":"modal_search_label","aria-hidden":"true"},en={class:"modal-dialog modal-dialog-centered container"},kn={__name:"ModalSearch",setup(Z){const rs=c(null);return ao(()=>{rs.value=new bootstrap.Modal(document.getElementById("modal_search"),{}),rs.value.show()}),(F,Q)=>{const A=an;return h(),S("div",nn,[t("div",en,[V(A)])])}}};export{kn as default};
