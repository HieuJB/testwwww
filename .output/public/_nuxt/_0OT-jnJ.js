import{_ as y,an as x,bL as k,bh as L,o as a,c as s,w as e,b4 as n,F as m,aQ as f,v as g,aq as S,J as w,bX as C,aJ as I,aG as N}from"./BCYEZECI.js";const b=t=>(I("data-v-1ee3be8a"),t=t(),N(),t),j={class:"team"},A={class:"team__title d-flex justify-content-center"},B={class:"season"},$={class:"season__list"},F=b(()=>e("td",null,null,-1)),M=b(()=>e("td",{style:{padding:"18px"}},null,-1)),O={key:0,style:{border:"1px solid #dee2e6","border-top":"none"}},V={class:"d-flex flex-column align-items-center"},D={class:"fw-bold text-center p-0"},J={__name:"TableHonor",props:x({info:Array,title:String},{isLoading:{},isLoadingModifiers:{}}),emits:["update:isLoading"],setup(t){const{$t:v}=k(),i=o=>{const h=`${o} team`,d=v(h);return d!==h?d:o},_=L(t,"isLoading"),p=o=>o.slice(2,4)+(o.length>7?`/${o.slice(7)}`:"");return(o,h)=>{const d=C;return a(),s("div",j,[e("div",A,n(t.title?t.title:i("Award")),1),e("table",{class:S(["team__table",{skeleton:_.value}])},[e("tr",null,[e("th",null,n(i("League")),1),e("th",null,n(i("Number of Championships")),1),e("th",null,n(i("First Championship Season/Year")),1)]),(a(!0),s(m,null,f(Object.keys(t.info),(c,l)=>(a(),s("tr",{key:l},[e("td",null,n(t.info[c][0].honor.name),1),e("td",null,n(t.info[c].length),1),e("td",B,[e("div",$,[(a(!0),s(m,null,f(t.info[c],(r,u)=>(a(),s("div",{key:u},n(p(r.season)),1))),128))])])]))),128)),_.value&&!Object.keys(t.info).length?(a(!0),s(m,{key:0},f(Array.from({length:3},(c,l)=>l+1),c=>{var l,r,u;return a(),s("tr",null,[F,M,e("td",null,n((u=(r=(l=t.info)==null?void 0:l.lineUpTeam)==null?void 0:r.team_info)==null?void 0:u.team_name),1)])}),256)):g("",!0)],2),!Object.keys(t.info).length&&!_.value?(a(),s("div",O,[e("div",V,[w(d,{class:"nodata_pic",alt:"nodata pic",width:"200",height:"200",src:"/icon/nodata.svg"})]),e("p",D,n(i("No Data Available")),1)])):g("",!0)])}}},q=y(J,[["__scopeId","data-v-1ee3be8a"]]);export{q as _};
