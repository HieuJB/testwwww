import{ak as I,au as T,aE as v,a2 as f,ap as O,bd as L,az as w,bt as P,ah as C,al as M,N as W,s as k,b8 as A}from"./C0DZl7YE.js";function R(){let e=[];return{cleanup:()=>{e=e.filter(n=>(n(),!1))},onCleanup:n=>{e.push(n)}}}function _(e){let t=()=>{};const r=new Promise(o=>{t=()=>{e(),o()}});return{promise:r,resolvePromise:t,onResolvedPromise:o=>{r.then(o)}}}function z(e){const t=e.effect.fn,r=e.render;e.render=(...n)=>{e.effect.fn=()=>r(...n);const o=e.effect.run();return e.effect.fn=t,e.render=r,o}}const N=e=>typeof e=="function",S=e=>e!==null&&typeof e=="object";function d(e,t){if(I(e)&&(t(e),e.children!==null)){if(Array.isArray(e.children)){e.children.forEach(r=>d(r,t));return}S(e.children)&&Object.keys(e.children).forEach(r=>{if(!N(e.children[r]))return;const n=e.children[r]();if(Array.isArray(n)){n.forEach(o=>d(o,t));return}d(n,t)})}}function V(e){var t,r;return((t=e.type)==null?void 0:t.__asyncLoader)&&((r=e.type)==null?void 0:r.name)==="AsyncComponentWrapper"}function B({subTree:e},t){const r=[];if(d(e,n=>{V(n)&&r.push(n.type.__asyncLoader())}),r.length>0){Promise.all(r).then(t);return}t()}function j(e){if(!e||!e.subTree)return;const t=e.subTree.el,r=e.u;e.u===null&&(e.u=[]),e.u.push(()=>{e.subTree.el===null&&(e.subTree.el=t),e.u=r})}function F(){const e=f();if(!e||e.isMounted)throw new Error("useLazyHydration must be called from the setup method.");const t=e.vnode.el!==null;if(e.vnode.type.__isLazilyHydrated=!0,!t)return{willPerformHydration:t,onHydrated:()=>{}};const{cleanup:r,onCleanup:n}=R(),{promise:o,resolvePromise:i,onResolvedPromise:s}=_(r),c=a=>s(()=>O(()=>B(e,a)));return e.type.__asyncLoader=()=>o,j(e.parent),T(()=>{e.asyncDep=new Promise(a=>{a(!0)})}),s(()=>{z(e),e.asyncDep=null}),v(r),{willPerformHydration:t,hydrate:i,onHydrated:c,onCleanup:n}}function x({willPerformHydration:e,hydrate:t,onCleanup:r},n=2e3){if(!e)return;if(!f())throw new Error("useHydrateWhenIdle must be called from the setup or lifecycle hook methods.");if(!("requestIdleCallback"in window)){t();return}const o=requestIdleCallback(()=>{t()},{timeout:n});r(()=>{cancelIdleCallback(o)})}const E={ELEMENT:1,TEXT:3,COMMENT:8},p=e=>e&&e.nodeType===E.ELEMENT,g=e=>e&&e.nodeType===E.COMMENT,D=e=>g(e)&&(e==null?void 0:e.data)==="[",U=e=>g(e)&&(e==null?void 0:e.data)==="]";function H({vnode:e,subTree:t}){if(!e||e.el===null)return[];if(p(e.el))return[e.el];const r=[];if(t&&D(t.el)&&U(t.anchor)){let n=e.el.nextSibling;for(;n;){if(n&&p(n)&&r.push(n),n===t.anchor)return r;n=n.nextSibling}}return r}function q({willPerformHydration:e,hydrate:t,onCleanup:r},n=["focus"]){if(!e)return;const o=f();if(!o||o.isMounted)throw new Error("useHydrateOnInteraction must be called from the setup method.");const i=L(n);w(()=>{const s=H(o),c=s.length>1?s[0].parentElement||document:s[0],a={capture:!0,once:!1,passive:!0},y=u=>{u.stopPropagation();const m=u.composedPath&&u.composedPath()||u.path;if(!m){let l=u.target;for(;l;){if(s.includes(l)){t();return}if(l===c)return;l=l.parentElement}return}s.forEach(l=>{m.includes(l)&&t()})};i.forEach(u=>{c.addEventListener(u,y,a)}),r(()=>{i.forEach(u=>{c.removeEventListener(u,y,a)})})})}function J({willPerformHydration:e,hydrate:t,onCleanup:r},n){if(!e)return;if(!f())throw new Error("useHydrateWhenTriggered must be called from the setup or lifecycle hook methods.");const o=P(C(n)?n:()=>n,i=>{i&&t()},{immediate:!0});r(o)}const h=new Map;function K(e){const t=typeof IntersectionObserver<"u";if(!t)return{supported:t};const r=JSON.stringify(e);if(h.has(r))return{supported:t,observer:h.get(r)};const n=new IntersectionObserver(o=>{o.forEach(i=>{!(i.isIntersecting||i.intersectionRatio>0)||!i.target.hydrate||i.target.hydrate()})},e);return h.set(r,n),{supported:t,observer:n}}function X({willPerformHydration:e,hydrate:t,onCleanup:r},n){if(!e)return;const o=f();if(!o||o.isMounted)throw new Error("useHydrateWhenVisible must be called from the setup method.");const{supported:i,observer:s}=K(n);if(!i){t();return}w(()=>{const c=H(o);c.forEach(a=>{a.hydrate=t,s.observe(a)}),r(()=>{c.forEach(a=>{delete a.hydrate,s.unobserve(a)})})})}const b=e=>e.length===1?e[0]:e,$=W({name:"LazyHydrationWrapper",inheritAttrs:!1,suspensible:!1,props:{whenIdle:{default:!1,type:[Boolean,Number]},whenVisible:{default:!1,type:[Boolean,Object]},onInteraction:{default:!1,type:[Array,Boolean,String]},whenTriggered:{default:void 0,type:[Boolean,Object]}},emits:["hydrated"],setup(e,{slots:t,emit:r}){const n=F();if(!n.willPerformHydration)return()=>b(t.default());if(n.onHydrated(()=>r("hydrated")),e.whenIdle&&x(n,e.whenIdle!==!0?e.whenIdle:void 0),e.whenVisible&&X(n,e.whenVisible!==!0?e.whenVisible:void 0),e.onInteraction){let o;e.onInteraction!==!0&&(o=k(()=>Array.isArray(e.onInteraction)?e.onInteraction:[e.onInteraction]).value),q(n,o)}return e.whenTriggered!==void 0&&J(n,A(e,"whenTriggered")),()=>b(t.default())}}),Q=M($);export{Q as L};
