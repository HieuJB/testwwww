import{_ as oe}from"./D3V03eDM.js";import{_ as G,bh as W,aN as n,bL as Q,s as ae,cJ as j,df as le,o as v,c as h,w as e,aq as C,bd as o,J as m,bT as k,b4 as l,bA as J,bq as ne,ah as U,bp as ce,F as z,aQ as X,I as Z,v as $,bX as ee,bI as ie,bt as q,cR as re,u as _e,by as de,i as ue,c9 as F,ca as K,bJ as D,cQ as ve,aJ as pe,aG as ge,dg as he}from"./C0DZl7YE.js";const ye={class:"select-box"},me={class:"select-box__value"},fe={class:"select-box__list"},be={class:"select-box__list-input"},Se=["placeholder"],Ie={class:"select-box__list-comp"},Le=["onClick"],Re={class:"select-box__option",for:"0","aria-hidden":"true"},xe={key:0},Ee={class:"d-flex flex-column align-items-center mt-5"},$e={class:"fw-bold text-center mt-3"},we={__name:"dropdown",props:{info:{},infoModifiers:{},compActive:{},compActiveModifiers:{}},emits:["update:info","update:compActive"],setup(b){const T=W(b,"info"),p=n(!1),N=n(null),u=n(),S=n(null),R=n(1),g=n(""),_=W(b,"compActive"),{$t:I}=Q(),w=c=>{const i=`${c} team`,d=I(i);return d!==i?d:c},y=ae(()=>g.value?T.value.filter(c=>{var i;return(i=c.country_name)==null?void 0:i.toLowerCase().includes(g.value.toLowerCase())}):T.value.slice(0,R.value*20));return j(S,([{isIntersecting:c}])=>{c&&(g.value||(R.value=R.value+1))}),le(N,()=>p.value=!1,{ignore:[u]}),(c,i)=>{var f,O,x,A;const d=ee;return v(),h("div",ye,[e("div",{ref_key:"target",ref:N,onClick:i[0]||(i[0]=r=>p.value=!o(p)),class:"select-box__current",tabindex:"1"},[e("div",me,[e("div",{class:C(["select-box__input-text",{"select-box__input-text--active":o(p)}])},[m(d,{src:((f=_.value)==null?void 0:f.country_id)!==1?("getLiveScoreImage"in c?c.getLiveScoreImage:o(k))((O=_.value)==null?void 0:O.logo_o,"country")+"!h20":_.value.logo_league_o,alt:(x=_.value)==null?void 0:x.country_id},null,8,["src","alt"]),e("div",null,l((A=_.value)==null?void 0:A.country_name),1)],2)]),m(d,{class:C(["select-box__icon",{"select-box__icon--active":o(p)}]),src:"/img/dropdown.svg",alt:"Arrow Icon","aria-hidden":"true"},null,8,["class"])],512),J(e("ul",fe,[e("div",be,[J(e("input",{"onUpdate:modelValue":i[1]||(i[1]=r=>U(g)?g.value=r:null),ref_key:"ignoreElRef",ref:u,type:"text",class:"input-search mb-1",placeholder:w("Enter Country Name team")},null,8,Se),[[ce,o(g)]])]),e("div",Ie,[(v(!0),h(z,null,X(o(y),(r,B)=>{var L;return v(),h("li",{onClick:V=>_.value=r,key:B,class:C({"item--active":_.value.country_id===r.country_id})},[e("div",Re,[m(d,{src:r.country_id!==1?("getLiveScoreImage"in c?c.getLiveScoreImage:o(k))(r==null?void 0:r.logo_o,"country")+"!h20":r.logo_league_o,alt:(L=_.value)==null?void 0:L.country_id},null,8,["src","alt"]),Z(" "+l(r.country_name??r.country_name),1)])],10,Le)}),128)),o(y).length?$("",!0):(v(),h("div",xe,[e("div",Ee,[m(d,{class:"nodata_pic",alt:"nodata pic",width:"150",height:"150",src:"/icon/nodata.svg"})]),e("p",$e,l(w("No Data Available")),1)])),e("div",{ref_key:"el",ref:S,style:{opacity:"0"}},"-",512)])],512),[[ne,o(p)]])])}}},Oe=G(we,[["__scopeId","data-v-35df0283"]]),P=b=>(pe("data-v-c5d7c6b6"),b=b(),ge(),b),Ae={class:"container bg-white team"},Ce={class:"team__header"},ke={class:"title"},Pe={class:"team__header-right",style:{"margin-right":"8px"}},Te={class:"player__card"},Ne={class:"Image__Wrapper aspect-ratio--child"},Ye=P(()=>e("div",{class:"PlayerHeader__Overlay_Detail"},null,-1)),De=P(()=>e("div",{class:"PlayerHeader__Overlay PlayerHeader__Overlay--right PlayerHeader__Overlay--opaque"},null,-1)),Ue={class:"player__card-right"},Be={class:"player__card-name"},Ve=P(()=>e("br",null,null,-1)),He={class:"d-flex align-items-center gap-1 py-2"},Me={class:"team-name"},We=["onClick"],Je={class:"player__info"},qe={class:"player__info-item"},Fe={class:"player__info-item-left"},Ke={class:"player__info-item-right"},Ge={class:"player__info-item"},Qe={class:"player__info-item-left"},je={class:"player__info-item-right"},ze={class:"player__info-item"},Xe={class:"player__info-item-left"},Ze={class:"player__info-item-right"},et={key:1,class:"mx-auto d-flex justify-content-center"},tt=P(()=>e("div",{class:"spinner-border text-success",role:"status"},[e("span",{class:"visually-hidden"},"Loading...")],-1)),st=[tt],ot={key:2,class:"d-flex flex-column align-items-center mx-auto mt-5"},at={class:"fw-bold text-center mt-3"},lt={key:3,class:"loading"},nt=P(()=>e("div",{class:"spinner-border text-success",role:"status"},[e("span",{class:"visually-hidden"},"Loading...")],-1)),ct=[nt],it={id:"content-page",class:"mt-5"},rt={key:0,class:"page_title"},_t={class:"text-center"},dt={__name:"index",setup(b){const{$t:T,useLocale:p,isNavVisible:N}=Q();N.value=!1;const u=s=>{const a=`${s} team`,E=T(a);return E!==a?E:s},S=ie(),R=n(null),g=n(!1),_=n(""),I=n(1),w=n(12),y=n([]),c=n([]),i=n(!1),d=n({country_id:1,country_name:u("All"),logo_league_o:"/icon/player-statistics/1.png"}),f=n(null),O=n(null),x=n(null),A=n(null);function r(s){const a=s.indexOf(" ");return a===-1?["",s]:[s.slice(0,a),s.slice(a+1)]}j(R,([{isIntersecting:s}])=>{try{s&&y.value.length>=w.value&&!g.value&&(I.value=I.value+1,L(!0))}catch{}});const B=async()=>{await F(K.LIVESCORE.WAREHOUSE,{lang:p==null?void 0:p.value.defaultLocale}).then(s=>{s&&(c.value=s.reduce((a,E)=>(a=[...a,E.countries],a),[]).flat().filter(a=>a.country_id),c.value.unshift({country_id:1,country_name:u("All"),logo_league_o:"/icon/player-statistics/1.png"}))})},L=async(s=!1)=>{s||(i.value=!0),s&&(g.value=!0),await F(`${K.LIVESCORE.PLAYER_LIST}?page=${I.value}&limit=${w.value}&country-id=${d.value.country_id!==1?d.value.country_id:""}&name=${_.value}&lang=${p.value.defaultLocale}`).then(a=>{a&&(s?y.value=[...y.value,...a]:y.value=a)}).finally(()=>{i.value=!1,g.value=!1})};B(),L();const V=he(()=>{I.value=1,L()},300);return q(()=>_.value,()=>{V()}),q(()=>d.value,()=>{I.value=1,L()}),(()=>{try{f.value=D(S.configurations,"PLAYER_TITLE_REPOSITORY"),x.value=D(S.configurations,"PLAYER_DESCRIPTION_REPOSITORY"),A.value=D(S.configurations,"PLAYER_KEYWORD_REPOSITORY"),O.value=D(S.configurations,"PLAYER_CONTENT_REPOSITORY")}catch{}})(),re({title:f.value,meta:[{name:"description",content:x.value},{property:"og:title",content:f.value},{property:"og:description",content:x.value},{name:"keywords",content:A.value}]}),(s,a)=>{const E=oe,te=Oe,Y=ee;return v(),h("div",Ae,[e("div",Ce,[e("div",ke,l(u("Player List")),1),e("div",Pe,[m(E,{placeholder:u("Enter Player Name"),search:o(_),"onUpdate:search":a[0]||(a[0]=t=>U(_)?_.value=t:null)},null,8,["placeholder","search"]),m(te,{info:o(c),"onUpdate:info":a[1]||(a[1]=t=>U(c)?c.value=t:null),compActive:o(d),"onUpdate:compActive":a[2]||(a[2]=t=>U(d)?d.value=t:null)},null,8,["info","compActive"])])]),o(y).length?(v(),_e(ue,{key:0,name:"list",tag:"div",class:C(["player__list mt-4",{"opacity-0":o(i)}])},{default:de(()=>[(v(!0),h(z,null,X(o(y),(t,se)=>{var H,M;return v(),h("div",{class:"player__item",key:se},[e("div",Te,[e("div",Ne,[e("div",{class:C(["player__card-img",{"player__card-img-country":!t.team_logo_o&&t.country_logo}])},[m(Y,{alt:"Chelsea",class:"",imgDefault:"/img/team-default.png",src:("getLiveScoreImage"in s?s.getLiveScoreImage:o(k))(t.team_logo_o?t.team_logo_o:t.country_logo,t.team_logo_o?"team":"country")+"!h120"},null,8,["src"])],2),Ye,De,m(Y,{class:"player-avt",imgDefault:"/img/playericon.png",src:("getLiveScoreImage"in s?s.getLiveScoreImage:o(k))(t.logo_o,"player")+"!h80"},null,8,["src"])])]),e("div",Ue,[e("div",Be,[e("div",null,[Z(l(((H=r(t.name))==null?void 0:H[0])??"")+" ",1),Ve]),e("div",null,l(((M=r(t.name))==null?void 0:M[1])??""),1)]),e("div",He,[m(Y,{alt:"Chelsea",class:"","data-mptype":"image",width:"20px",src:("getLiveScoreImage"in s?s.getLiveScoreImage:o(k))(t.team_logo_o?t.team_logo_o:t.country_logo,t.team_logo_o?"team":"country")+"!h20"},null,8,["src"]),e("span",Me,l(t.team_name??t.country_name),1)]),e("button",{onClick:vt=>s.$router.push(`${("ROUTERS"in s?s.ROUTERS:o(ve)).PLAYER.toLowerCase()}/${t.id}`)},l(u("Details")),9,We)]),e("div",Je,[e("div",qe,[e("div",Fe,l(u("H/W"))+" : ",1),e("div",Ke,l(t.height??"-")+" cm, "+l(t.weight)+" kg ",1)]),e("div",Ge,[e("div",Qe,l(u("Date of Birth"))+" : ",1),e("div",je,l(t.birthday??"-")+" ("+l(t.age??"-")+") ",1)]),e("div",ze,[e("div",Xe,l(u("Country"))+" : ",1),e("div",Ze,l(t.country_name),1)])])])}),128))]),_:1},8,["class"])):$("",!0),o(g)?(v(),h("div",et,st)):$("",!0),e("div",{ref_key:"el",ref:R,style:{opacity:"0"}},"infiniti",512),!o(y).length&&!o(i)?(v(),h("div",ot,[e("div",null,[m(Y,{class:"nodata_pic",alt:"nodata pic",width:"200",height:"200",src:"/icon/nodata.svg"})]),e("p",at,l(u("No Data Available")),1)])):$("",!0),o(i)?(v(),h("div",lt,ct)):$("",!0),e("div",it,[o(f)?(v(),h("h1",rt,l(o(f)),1)):$("",!0),e("div",_t,l(o(O)),1)])])}}},ht=G(dt,[["__scopeId","data-v-c5d7c6b6"]]);export{ht as default};
