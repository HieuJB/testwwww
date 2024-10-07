import{dx as I,bH as _,bI as h,aN as A,bL as l,bJ as s,bR as o,dy as E,cR as D,c9 as C,ca as O}from"./BCYEZECI.js";const N=I(()=>{const T=_(),n=h(),u=A(null),R=A(null),i=A(null),{useLocale:d}=l();return{fetchObjectMeta:async(t,e)=>{try{let r=null,c=null,a=null;r=s(n.configurations,e.includes(o.COACH)?"COACH_TITLE":e.includes(o.PLAYER)?"PLAYER_TITLE":"TEAM_TITLE")?s(n.configurations,e.includes(o.COACH)?"COACH_TITLE":e.includes(o.PLAYER)?"PLAYER_TITLE":"TEAM_TITLE"):s(n.configurations,"SEO_META_TITLE"),r=E(r,t??""),R.value=r,c=s(n.configurations,e.includes(o.COACH)?"COACH_DESCRIPTION":e.includes(o.PLAYER)?"PLAYER_DESCRIPTION":"TEAM_DESCRIPTION")?s(n.configurations,e.includes(o.COACH)?"COACH_DESCRIPTION":e.includes(o.PLAYER)?"PLAYER_DESCRIPTION":"TEAM_DESCRIPTION"):s(n.configurations,"SEO_META_DESCRIPTION"),c=E(c,t??""),a=s(n.configurations,e.includes(o.COACH)?"COACH_KEYWORD":e.includes(o.PLAYER)?"PLAYER_KEYWORD":"TEAM_KEYWORD")?s(n.configurations,e.includes(o.COACH)?"COACH_KEYWORD":e.includes(o.PLAYER)?"PLAYER_KEYWORD":"TEAM_KEYWORD"):"",a=E(a,t??""),i.value=s(n.configurations,e.includes(o.COACH)?"COACH_CONTENT":e.includes(o.PLAYER)?"PLAYER_CONTENT":"TEAM_CONTENT"),i.value=E(i.value,t??""),D({title:r,meta:[{name:"description",content:c},{property:"og:title",content:r},{property:"og:description",content:c},{name:"keywords",content:a}]})}catch(r){console.log(r)}},fetchLineUpTeam:async t=>{try{return await C(`${O.LIVESCORE.LINEUP_TEAM}?team-id=${t??T.params.id}`)}catch(e){throw console.error("Error fetching line up team:",e),e}},fetchPlayerInfo:async t=>{try{return await C(`${O.LIVESCORE.PLAYER_DETAIL}?player-id=${t}&lang=${d.value.defaultLocale}`)}catch(e){throw e}},route:T,info:u,fetchCoachInfo:async t=>{try{return await C(`${O.LIVESCORE.COACH_INFO}?coach-id=${t}`)}catch(e){throw e}},fetchCoachHonor:async t=>{try{let e=await C(`${O.LIVESCORE.COACH_HONOR}?coach-id=${t}`);return e&&e[0]&&e[0].honors?e[0].honors.reduce((c,a)=>(Object.keys(c).includes(a.honor.id)||(c[a.honor.id]=e[0].honors.filter(L=>L.honor.id===a.honor.id)),c),{}):{}}catch(e){throw e}},h1Content:R,content:i}});export{N as u};
