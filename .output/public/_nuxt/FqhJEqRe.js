import{bW as t,bQ as c}from"./DWGr-Zqp.js";const o=t("socket",{state:()=>({wssIntances:void 0,isLoadedWSS:!1}),actions:{connect(){this.wssIntances&&this.wssIntances.close();const s=c(),e=s.public.isEncodeChat=="true"?s.public.wssEncodeUri:s.public.wssUri;try{this.wssIntances=new WebSocket(e),this.isLoadedWSS=!0}catch{return this.isLoadedWSS=!0,!1}},close(){this.wssIntances&&this.wssIntances.close()}}});export{o as s};
