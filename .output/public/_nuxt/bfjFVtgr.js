import{N as ie,bL as X,dh as re,bI as ce,dl as de,aN as y,bt as ue,az as Z,bO as _,o as E,c as ee,w as s,bA as J,bp as G,bd as r,ah as W,bB as Y,b4 as S,bD as me,cV as j,ca as Q,ap as ve,u as _e,v as pe,c7 as ge}from"./BCYEZECI.js";import{u as he}from"./Gqi4VtZl.js";import"./3_nq1VaK.js";const fe={class:"txtBox"},be=s("span",{class:"icon iconfont icon-font-username"},null,-1),ye=["placeholder","title"],we={class:"txtBox"},ke=s("span",{class:"icon iconfont icon-font-password"},null,-1),xe=["placeholder","title"],Le=s("span",{id:"pwdEye",class:"icon iconfont icon-font-hide invisible"},null,-1),Me=s("div",{id:"lg_msg"},null,-1),Se={class:"row"},$e={class:"col-12"},Pe={class:"row"},Re={class:"col-12"},Te=ie({__name:"LoginForm.client",emits:["closeModalLogin","openModalRegister"],setup(se,{emit:$}){const{useLocale:O,$t:n}=X(),m=re(),P=ce(),x=he(),l=de(),R=y(!1),v=y(""),c=y(""),k=y(!1),o=y([]),N=$,oe=async()=>{var d,e,i,p,g,h,t,w,f,T,B,F,A,I,U,V,D,K,q,z,H;try{const{data:a,pending:C,error:u,refresh:De}=await j(Q.AUTH.LOGIN,{method:"POST",body:{nick_name:v.value,password:c.value}},"$JKyOLI6eHf");let M="";u!=null&&u.value&&(typeof((i=(e=(d=u.value)==null?void 0:d.data)==null?void 0:e.data)==null?void 0:i.detail)=="string"?(o.value=[{msg:(h=(g=(p=u.value)==null?void 0:p.data)==null?void 0:g.data)==null?void 0:h.detail}],(t=o.value)==null||t.forEach(b=>M+=b==null?void 0:b.msg)):(o.value=(T=(f=(w=u.value)==null?void 0:w.data)==null?void 0:f.data)==null?void 0:T.detail,(B=o.value)==null||B.forEach(b=>M+=b==null?void 0:b.msg))),M&&m.add({type:"error",text:M}),((F=a==null?void 0:a.value)==null?void 0:F.status)==="success"&&(_("accessToken").value=(A=a==null?void 0:a.value)==null?void 0:A.access_token,_("refreshToken").value=(I=a==null?void 0:a.value)==null?void 0:I.refresh_token,P.accessToken=(U=a==null?void 0:a.value)==null?void 0:U.access_token,k.value?(_("userNickname").value=v.value,_("userPassword").value=c.value):(_("userNickname").value=null,_("userPassword").value=null),x.authenticateUser(),te((V=a==null?void 0:a.value)==null?void 0:V.access_token),m.add({type:"success",text:n("Login successful")}),ve(()=>{k.value||le(),N("closeModalLogin",!0)}))}catch(a){(K=(D=a==null?void 0:a.response)==null?void 0:D._data)!=null&&K.detail?o.value=[{msg:n((z=(q=a==null?void 0:a.response)==null?void 0:q._data)==null?void 0:z.detail)}]:o.value=[{msg:n("An error occurred during login")}];let C="";o!=null&&o.value&&((H=o.value)==null||H.forEach(u=>C+=u==null?void 0:u.msg),m.add({type:"error",text:n(C)}))}},te=async d=>{var e,i,p,g,h;try{const{data:t,pending:w,error:f,refresh:T}=await j(Q.USER.ME,{headers:{Authorization:`${d}`}},"$1WP9YrV12w");t!=null&&t.value&&(P.userData=t==null?void 0:t.value,_("userData").value=JSON.stringify(t==null?void 0:t.value))}catch(t){(i=(e=t==null?void 0:t.response)==null?void 0:e._data)!=null&&i.detail?o.value=[{msg:(g=(p=t==null?void 0:t.response)==null?void 0:p._data)==null?void 0:g.detail}]:o.value=[{msg:"error."}];let w="";o!=null&&o.value&&((h=o.value)==null||h.forEach(f=>w+=f==null?void 0:f.msg),m.add({type:"error",text:w}))}},ae=d=>{var i,p,g,h,t;o.value=[];let e="";if(!((i=String(v.value))!=null&&i.trim()))return e=n("Account is required"),o.value.push({msg:e}),m.add({type:"error",text:e}),!1;if(!((p=String(c.value))!=null&&p.trim()))return e=n("Password is required"),o.value.push({msg:e}),m.add({type:"error",text:e}),!1;if(((h=(g=String(c.value))==null?void 0:g.trim())==null?void 0:h.length)<8)return e=n("Password at least 8 characters"),o.value.push({msg:e}),m.add({type:"error",text:e}),!1;if(!((t=o.value)!=null&&t.length))return!0},L=d=>{var e;ae(),(e=o.value)!=null&&e.length||oe()},ne=()=>{N("openModalRegister",!0)},le=()=>{v.value="",c.value=""};return ue(l,()=>{l!=null&&l.isOpenLoginForm&&(R.value=l==null?void 0:l.isOpenLoginForm)}),Z(()=>{const d=_("userNickname").value,e=_("userPassword").value;d&&e&&(v.value=d,c.value=e,k.value=!0)}),(d,e)=>(E(),ee("form",{id:"lg_form",name:"lg_form",method:"post",onSubmit:me(L,["prevent"])},[s("div",fe,[be,J(s("input",{id:"nickname","onUpdate:modelValue":e[0]||(e[0]=i=>W(v)?v.value=i:null),type:"text",placeholder:r(n)("Account"),title:r(n)("Account"),autocomplete:"name",autofocus:""},null,8,ye),[[G,r(v)]])]),s("div",we,[ke,J(s("input",{id:"password","onUpdate:modelValue":e[1]||(e[1]=i=>W(c)?c.value=i:null),autocomplete:"on",type:"password",placeholder:r(n)("Password"),title:r(n)("Password"),onKeyup:Y(L,["enter"]),onKeydown:Y(L,["enter"])},null,40,xe),[[G,r(c)]]),Le]),Me,s("div",Se,[s("div",$e,[s("div",{class:"button--max button--success col-12 inline",onClick:L},S(r(n)("Login")),1)])]),s("div",Pe,[s("div",Re,[s("div",{class:"button button--max col-12 inline",onClick:ne},S(r(n)("Register")),1)])])],32))}}),Ce=ge(Te),Ee={ref:"modalLogin",class:"modal fade",id:"modal_login",tabindex:"-1","aria-labelledby":"modal_login_label","aria-hidden":"true"},Oe={class:"modal-dialog modal-dialog-centered"},Ne={class:"modal-content"},Be={class:"modal-header d-none"},Fe={class:"modal-title",id:"modal_login_label"},Ae={id:"login_body",class:"regBox"},Ie={class:"title"},Ue=s("span",{class:""},null,-1),Ve={class:"mh2"},He={__name:"ModalLogin",emits:["openModalRegister"],setup(se,{emit:$}){const O=$,n=y(null),m=y(!0),{useLocale:P,$t:x}=X();Z(()=>{n.value=new bootstrap.Modal(document.getElementById("modal_login"),{}),n.value.show()});const l=async()=>{n.value&&n.value.hide()},R=()=>{l(),setTimeout(()=>{O("openModalRegister")},200)};return(v,c)=>{const k=Ce;return E(),ee("div",Ee,[s("div",Oe,[s("div",Ne,[s("div",Be,[s("div",Fe,S(r(x)("Login")),1),s("button",{type:"button",class:"btn-close",onClick:l,"aria-label":"Close"})]),s("div",Ae,[s("div",Ie,[Ue,s("div",Ve,S(r(x)("Login")),1),s("span",{class:"iconfont icon-close",onClick:l})]),r(m)?(E(),_e(k,{key:0,onCloseModalLogin:l,onOpenModalRegister:R})):pe("",!0)])])])],512)}}};export{He as default};
