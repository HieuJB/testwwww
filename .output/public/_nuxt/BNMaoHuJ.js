import{r as u,e as k,q as W,u as Me,s as Ze,w as _e,t as Ee,E as Ne,o as L,c as $,h as o,m as d,i,B as me,A as Z,v as Be,x as He,F as fe,z as pe}from"./CnJNAMZb.js";import{O as Ce,b as E,j as ke}from"./DRizsLw2.js";import{R as X}from"./Bxk5PY0E.js";const Ae={id:"settingPopCtn"},Pe=o("div",{id:"popMask"},null,-1),Ue={class:"fadeInBottom",id:"settingPop"},We={class:"title"},Xe=o("span",null,"Cài đặt",-1),ze={class:"info"},Ie=o("div",{class:"name"},"Thứ tự trận đấu",-1),Ye={class:"setList",id:"set_order"},Ge=o("span",{class:"ro"},null,-1),Fe=o("span",{class:"ro"},null,-1),Je={style:{}},Ve=o("div",{class:"name"},"Công ty nhà cái",-1),je=o("i",{class:"more"},null,-1),qe={style:{}},Ke=o("div",{class:"name"},"Chọn giải đấu",-1),Qe=o("i",{class:"more"},null,-1),xe={id:"os_li",style:{}},ge=o("div",{class:"name"},"Hiển thị TL",-1),De={class:"setList",id:"set_Odds"},eo=o("div",{class:"name"},"Hiển thị trang",-1),oo={class:"setList",id:"set_pShow"},lo=o("li",{class:"subtitle"},"Hiện thông báo",-1),so=o("div",{class:"name"},null,-1),io={class:"setList",id:"set_pShow"},no=o("div",{class:"name"},null,-1),uo={class:"setList",id:"set_pShow"},ao=o("li",{class:"subtitle"},"Âm thanh ghi bàn",-1),to=o("div",{class:"name"},"Đội nhà",-1),vo={class:"setList sound-list",id:"set_pShow"},co=o("div",{class:"name"},"Đội khách",-1),ho={class:"setList sound-list",id:"set_pShow"},ro=o("li",{class:"subtitle"},"Cài đặt chung",-1),So=o("div",{class:"name"},"Múi giờ",-1),wo={id:"displayZone",class:"selectLabel cursor-pointer"},_o=o("i",{class:"more"},null,-1),mo={class:"modal fade",id:"modal_comp_bet",tabindex:"-1","aria-labelledby":"modal_comp_bet_label","aria-hidden":"true"},fo={class:"modal-dialog modal-dialog-centered container"},po={class:"modal-content"},Co=o("div",{class:"modal-header d-none"},[o("div",{class:"modal-title",id:"modal_comp_bet_label"},"Select Betting Company"),o("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),ko={id:"setting_popSel"},Oo=o("div",{class:"popMask2"},null,-1),To={class:"fadeInBottom",id:"setting_popSel"},bo={class:"selectpop",id:"selCompany"},yo=["value","onClick"],Ro={class:"modal fade",id:"modal_timezone",tabindex:"-1","aria-labelledby":"modal_timezone_label","aria-hidden":"true"},Lo={class:"modal-dialog modal-dialog-centered container"},$o={class:"modal-content"},Mo=o("div",{class:"modal-header d-none"},[o("div",{class:"modal-title",id:"modal_timezone_label"},"Select Time Zone"),o("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),Zo={id:"setting_popSel"},Eo=o("div",{class:"popMask2"},null,-1),No={class:"fadeInBottom",id:"setting_popSel"},Bo={class:"selectpop",id:"timeZoneList"},Ho=["value","onClick"],Wo={__name:"ModalSettingMobile",props:{showSetting:{},showSettingModifiers:{},timeZoneLabel:{},timeZoneLabelModifiers:{},timeZone:{},timeZoneModifiers:{}},emits:["update:showSetting","update:timeZoneLabel","update:timeZone"],setup(N){var G,F,J,V,j;const c=u(!1),e=k("settingsData"),Oe=W(N,"showSetting"),B=Me().path,M=u(Ce),H=E.find(({id:n})=>n===Ce),A=u(H==null?void 0:H.name),h=u(!0),r=u(!0),S=u(!1),w=u(!0),_=u(!0),m=u(!0),f=u(((G=e==null?void 0:e.value)==null?void 0:G.settingType)||1),p=u(((F=e==null?void 0:e.value)==null?void 0:F.isShowGoalWindow)||!0),C=u(((J=e==null?void 0:e.value)==null?void 0:J.isShowRedWindow)||!0),a=u(((V=e==null?void 0:e.value)==null?void 0:V.soundHome)||0),t=u(((j=e==null?void 0:e.value)==null?void 0:j.soundAway)||1),z=W(N,"timeZoneLabel"),v=W(N,"timeZone"),Te=n=>{v.value=n,O.modal_timezone.hide()},I=()=>{c.value=!c.value,e.value?(e.value.orderByTime=c.value,k("settingsData").value=JSON.stringify(e.value)):k("settingsData").value=JSON.stringify({settingsData:c.value})},O=Ze({modal_comp_bet:null,modal_timezone:null}),be=()=>{O.modal_comp_bet.show()},y=n=>{a.value=n},R=n=>{t.value=n},Y=n=>{f.value=n},ye=async()=>{O.modal_timezone.show()},Re=n=>{M.value=n;const l=E.find(({id:s})=>s===n);A.value=l==null?void 0:l.name,O.modal_comp_bet.hide(),e!=null&&e.value?(e.value.oddCompanySelected=n,k("settingsData").value=JSON.stringify(e.value)):k("settingsData").value=JSON.stringify({oddCompanySelected:n})},Le=()=>{var n,l,s,T,b,P,q,K,Q,x,g,D,ee,oe,le,se,ie,ne,de,ue,ae,te,ve,ce,he,re,Se,we;if(e!=null&&e.value){if(typeof((n=e==null?void 0:e.value)==null?void 0:n.isShowCardYellow)<"u"&&(w.value=(l=e==null?void 0:e.value)==null?void 0:l.isShowCardYellow),typeof((s=e==null?void 0:e.value)==null?void 0:s.isShowCardRed)<"u"&&(_.value=(T=e==null?void 0:e.value)==null?void 0:T.isShowCardRed),typeof((b=e==null?void 0:e.value)==null?void 0:b.isShowRanking)<"u"&&(m.value=(P=e==null?void 0:e.value)==null?void 0:P.isShowRanking),typeof((q=e==null?void 0:e.value)==null?void 0:q.orderByTime)<"u"&&(c.value=(K=e==null?void 0:e.value)==null?void 0:K.orderByTime),typeof((Q=e==null?void 0:e.value)==null?void 0:Q.oddCompanySelected)<"u"){M.value=(x=e==null?void 0:e.value)==null?void 0:x.oddCompanySelected;const U=E.find(({id:$e})=>$e===M.value);A.value=U==null?void 0:U.name}typeof((g=e==null?void 0:e.value)==null?void 0:g.isShowOddsHDP)<"u"&&(h.value=(D=e==null?void 0:e.value)==null?void 0:D.isShowOddsHDP),typeof((ee=e==null?void 0:e.value)==null?void 0:ee.isShowOddsTX)<"u"&&(r.value=(oe=e==null?void 0:e.value)==null?void 0:oe.isShowOddsTX),typeof((le=e==null?void 0:e.value)==null?void 0:le.isShowOdds1X2)<"u"&&(S.value=(se=e==null?void 0:e.value)==null?void 0:se.isShowOdds1X2),typeof((ie=e==null?void 0:e.value)==null?void 0:ie.settingType)<"u"&&(f.value=(ne=e==null?void 0:e.value)==null?void 0:ne.settingType),typeof((de=e==null?void 0:e.value)==null?void 0:de.isShowGoalWindow)<"u"&&(p.value=(ue=e==null?void 0:e.value)==null?void 0:ue.isShowGoalWindow),typeof((ae=e==null?void 0:e.value)==null?void 0:ae.isShowRedWindow)<"u"&&(C.value=(te=e==null?void 0:e.value)==null?void 0:te.isShowRedWindow),typeof((ve=e==null?void 0:e.value)==null?void 0:ve.soundHome)<"u"&&(a.value=(ce=e==null?void 0:e.value)==null?void 0:ce.soundHome),typeof((he=e==null?void 0:e.value)==null?void 0:he.soundAway)<"u"&&(t.value=(re=e==null?void 0:e.value)==null?void 0:re.soundAway),typeof((Se=e==null?void 0:e.value)==null?void 0:Se.timeZone)<"u"&&(v.value=(we=e==null?void 0:e.value)==null?void 0:we.timeZone)}};return _e(v,()=>{var n;z.value=(n=ke.find(l=>l.value===v.value))==null?void 0:n.key}),Ee(async()=>{await Ne(),setTimeout(()=>{O.modal_comp_bet=new bootstrap.Modal("#modal_comp_bet",{}),O.modal_timezone=new bootstrap.Modal("#modal_timezone",{})},100),Le()}),_e([h,r,S,w,_,m,f,p,C,a,t,v],()=>{e!=null&&e.value?(e.value.isShowOddsHDP=h.value,e.value.isShowOddsTX=r.value,e.value.isShowOdds1X2=S.value,e.value.isShowCardYellow=w.value,e.value.isShowCardRed=_.value,e.value.isShowRanking=m.value,e.value.timeZone=v.value,e.value.settingType=f.value,e.value.isShowGoalWindow=p.value,e.value.isShowRedWindow=C.value,e.value.soundHome=a.value,e.value.soundAway=t.value,k("settingsData").value=JSON.stringify(e.value)):k("settingsData").value=JSON.stringify({isShowOddsHDP:h.value,isShowOddsTX:r.value,isShowOdds1X2:S.value,isShowCardYellow:w.value,isShowCardRed:_.value,isShowRanking:m.value,timeZone:v.value,settingType:f.value,isShowGoalWindow:p.value,isShowRedWindow:C.value,soundHome:a.value,soundAway:t.value})}),(n,l)=>(L(),$("div",null,[o("div",Ae,[Pe,o("div",Ue,[o("div",We,[Xe,o("div",{class:"close_b",onClick:l[0]||(l[0]=s=>Oe.value=!1)})]),o("div",ze,[o("ul",null,[o("li",null,[Ie,o("ul",Ye,[o("li",{class:d(["chose",i(c)?"on":""]),onClick:l[1]||(l[1]=s=>I())},[Ge,me("Thời gian ")],2),o("li",{class:d(["chose",i(c)?"":"on"]),onClick:l[2]||(l[2]=s=>I())},[Fe,me("Giải đấu ")],2)])]),o("li",Je,[Ve,o("span",{id:"displayCompany",class:"selectLabel cursor-pointer",onClick:be},Z(i(A)),1),je]),Be(o("li",qe,[Ke,o("span",{id:"displayCompany",class:"selectLabel cursor-pointer",onClick:l[3]||(l[3]=s=>n.$emit("showFilterLeague"))},"Lựa chọn giải"),Qe],512),[[He,i(B)===("ROUTERS"in n?n.ROUTERS:i(X)).HOMEPAGE||i(B)===("ROUTERS"in n?n.ROUTERS:i(X)).FOOTBALL_RESULT||i(B)===("ROUTERS"in n?n.ROUTERS:i(X)).FOOTBALL_SCHEDULE]]),o("li",xe,[ge,o("ul",De,[o("li",{class:d(["chose",i(r)?"on":""]),onClick:l[4]||(l[4]=s=>r.value=!i(r))}," Tài/Xỉu ",2),o("li",{class:d(["chose",i(S)?"on":""]),onClick:l[5]||(l[5]=s=>S.value=!i(S))}," 1x2 ",2),o("li",{class:d(["chose",i(h)?"on":""]),onClick:l[6]||(l[6]=s=>h.value=!i(h))}," HDP ",2)])]),o("li",null,[eo,o("ul",oo,[o("li",{class:d(["chose",i(_)?"on":""]),onClick:l[7]||(l[7]=s=>_.value=!i(_))}," Thẻ đỏ ",2),o("li",{class:d(["chose",i(w)?"on":""]),onClick:l[8]||(l[8]=s=>w.value=!i(w))}," Thẻ vàng ",2),o("li",{class:d(["chose",i(m)?"on":""]),onClick:l[9]||(l[9]=s=>m.value=!i(m))}," Xếp hạng ",2)])]),lo,o("li",null,[so,o("ul",io,[o("li",{class:d(["chose",i(f)===1?"on":""]),onClick:l[10]||(l[10]=s=>Y(1))}," Theo dõi ",2),o("li",{class:d(["chose",i(f)===0?"on":""]),onClick:l[11]||(l[11]=s=>Y(0))}," Tất cả ",2)])]),o("li",null,[no,o("ul",uo,[o("li",{class:d(["chose",i(C)?"on":""]),onClick:l[12]||(l[12]=s=>C.value=!i(C))}," Cửa sổ thẻ đỏ ",2),o("li",{class:d(["chose",i(p)?"on":""]),onClick:l[13]||(l[13]=s=>p.value=!i(p))}," Cửa sổ bàn thắng ",2)])]),ao,o("li",null,[to,o("ul",vo,[o("li",{class:d(["chose",i(a)===4?"on":""]),onClick:l[14]||(l[14]=s=>y(4))}," NO ",2),o("li",{class:d(["chose",i(a)===3?"on":""]),onClick:l[15]||(l[15]=s=>y(3))},"   4   ",2),o("li",{class:d(["chose",i(a)===2?"on":""]),onClick:l[16]||(l[16]=s=>y(2))},"   3   ",2),o("li",{class:d(["chose",i(a)===1?"on":""]),onClick:l[17]||(l[17]=s=>y(1))},"   2   ",2),o("li",{class:d(["chose",i(a)===0?"on":""]),onClick:l[18]||(l[18]=s=>y(0))},"   1   ",2)])]),o("li",null,[co,o("ul",ho,[o("li",{class:d(["chose",i(t)===4?"on":""]),onClick:l[19]||(l[19]=s=>R(4))}," NO ",2),o("li",{class:d(["chose",i(t)===3?"on":""]),onClick:l[20]||(l[20]=s=>R(3))},"   4   ",2),o("li",{class:d(["chose",i(t)===2?"on":""]),onClick:l[21]||(l[21]=s=>R(2))},"   3   ",2),o("li",{class:d(["chose",i(t)===1?"on":""]),onClick:l[22]||(l[22]=s=>R(1))},"   2   ",2),o("li",{class:d(["chose",i(t)===0?"on":""]),onClick:l[23]||(l[23]=s=>R(0))},"   1   ",2)])]),ro,o("li",{onClick:ye},[So,o("span",wo,Z(z.value||"Tự động"),1),_o])])])])]),o("div",mo,[o("div",fo,[o("div",po,[Co,o("div",ko,[Oo,o("div",To,[o("ul",bo,[(L(!0),$(fe,null,pe("ODD_COMPANYS"in n?n.ODD_COMPANYS:i(E),(s,T)=>{var b;return L(),$("li",{key:T,value:s==null?void 0:s.id,class:d([i(M)===(s==null?void 0:s.id)?"on":"","odd_li"]),onClick:P=>Re(s==null?void 0:s.id)},Z((b=s==null?void 0:s.name)==null?void 0:b.toUpperCase()),11,yo)}),128))])])])])])]),o("div",Ro,[o("div",Lo,[o("div",$o,[Mo,o("div",Zo,[Eo,o("div",No,[o("ul",Bo,[(L(!0),$(fe,null,pe("TIME_ZONE_LIST"in n?n.TIME_ZONE_LIST:i(ke),(s,T)=>(L(),$("li",{key:T,class:d(["odd_li",v.value===(s==null?void 0:s.value)?"on":""]),value:s==null?void 0:s.value,onClick:b=>Te(s==null?void 0:s.value)},Z(s==null?void 0:s.key),11,Ho))),128))])])])])])])]))}};export{Wo as default};
