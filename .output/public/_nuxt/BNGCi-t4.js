import{u as I,r as A,g as L}from"./CnJNAMZb.js";import{g as c}from"./3bue5Vy1.js";import{R as o,A as E}from"./Bxk5PY0E.js";import{N as C,u as O}from"./00yf2fq6.js";import{s as _}from"./D0xLcGF1.js";import{Y as m}from"./B0IwuF_2.js";const M=m(()=>{const T=I(),r=_(),u=A(null),R=A(null),i=A(null);return{fetchObjectMeta:async(t,e)=>{try{let n=null,s=null,a=null;n=c(r.configurations,e.includes(o.COACH)?"COACH_TITLE":e.includes(o.PLAYER)?"PLAYER_TITLE":"TEAM_TITLE")?c(r.configurations,e.includes(o.COACH)?"COACH_TITLE":e.includes(o.PLAYER)?"PLAYER_TITLE":"TEAM_TITLE"):c(r.configurations,"SEO_META_TITLE"),n=C(n,t??""),R.value=n,s=c(r.configurations,e.includes(o.COACH)?"COACH_DESCRIPTION":e.includes(o.PLAYER)?"PLAYER_DESCRIPTION":"TEAM_DESCRIPTION")?c(r.configurations,e.includes(o.COACH)?"COACH_DESCRIPTION":e.includes(o.PLAYER)?"PLAYER_DESCRIPTION":"TEAM_DESCRIPTION"):c(r.configurations,"SEO_META_DESCRIPTION"),s=C(s,t??""),a=c(r.configurations,e.includes(o.COACH)?"COACH_KEYWORD":e.includes(o.PLAYER)?"PLAYER_KEYWORD":"TEAM_KEYWORD")?c(r.configurations,e.includes(o.COACH)?"COACH_KEYWORD":e.includes(o.PLAYER)?"PLAYER_KEYWORD":"TEAM_KEYWORD"):"",a=C(a,t??""),i.value=c(r.configurations,e.includes(o.COACH)?"COACH_CONTENT":e.includes(o.PLAYER)?"PLAYER_CONTENT":"TEAM_CONTENT"),i.value=C(i.value,t??""),L({title:n,meta:[{name:"description",content:s},{property:"og:title",content:n},{property:"og:description",content:s},{name:"keywords",content:a}]})}catch(n){console.log(n)}},fetchLineUpTeam:async t=>{try{return await O(`${E.LIVESCORE.LINEUP_TEAM}?team-id=${t??T.params.id}`)}catch(e){throw console.error("Error fetching line up team:",e),e}},fetchPlayerInfo:async t=>{try{return await O(`${E.LIVESCORE.PLAYER_DETAIL}?player-id=${t}`)}catch(e){throw e}},route:T,info:u,fetchCoachInfo:async t=>{try{return await O(`${E.LIVESCORE.COACH_INFO}?coach-id=${t}`)}catch(e){throw e}},fetchCoachHonor:async t=>{try{let e=await O(`${E.LIVESCORE.COACH_HONOR}?coach-id=${t}`);return e&&e[0]&&e[0].honors?e[0].honors.reduce((s,a)=>(Object.keys(s).includes(a.honor.id)||(s[a.honor.id]=e[0].honors.filter(d=>d.honor.id===a.honor.id)),s),{}):{}}catch(e){throw e}},h1Content:R,content:i}});export{M as u};
