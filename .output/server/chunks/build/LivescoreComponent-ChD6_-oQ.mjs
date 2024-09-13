import { p as publicAssetsURL, a as buildAssetsURL } from '../routes/renderer.mjs';
import { x as useLocalePath, g as useRuntimeConfig, b as useCookie, a as useState, e as useRouter, f as __nuxt_component_0$2, y as __nuxt_component_2$1, _ as _export_sfc } from './server.mjs';
import { _ as _sfc_main$2 } from './NuxtImg-z5Tschba.mjs';
import { defineComponent, ref, computed, reactive, watch, withAsyncContext, unref, withCtx, createVNode, toDisplayString, withDirectives, withModifiers, vShow, openBlock, createBlock, createCommentVNode, Fragment, createTextVNode, renderList, useSSRContext, nextTick, mergeProps } from 'vue';
import { ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { g as getConfig, p as parseFloatO, e as escapeRegExp, a as parseIntO } from './helper-CGhdpGxz.mjs';
import { i as LIVESCORE_ACTIVE_TAB, O as ODD_COMPANY_DEFAULT, b as ODD_COMPANYS, h as LIVESCORE_PAGE, F as FAVORITES_TYPE, g as LIVESCORE_STATUS, M as MATCH_TAB, j as TIME_ZONE_LIST } from './constants-DJp0NbxW.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { A as API_ROUTERS, R as ROUTERS } from './routers-Dr-sal51.mjs';
import { F as groupBy, H as groupByTimeAndComp, b as getStatusDisplay, I as getStatusDisplayMobile, k as getStats, J as getOdds, i as getIncidents, j as getIncidentsRight, f as getOddCornerValue, K as getCorner, e as getDetailOdds, L as getDetailOddsChange, M as getRecentResultTheSport, n as getDataObject, m as getValueByPosition } from './livescore_helper-4bdWaxk-.mjs';
import { a as useFetch } from './fetch-CC0zbYw2.mjs';
import { s as sortByTime, f as formatDateMomentUTCTimeZone } from './moment_helper-C2kP4D4M.mjs';
import { l as locationHref } from './router_helper-BQtO3to1.mjs';
import { useWindowSize, useWindowScroll, useIntersectionObserver, useDebounceFn } from '@vueuse/core';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import moment from 'moment-timezone';
import { s as socketStore } from './wsocket-BREvIJI8.mjs';
import { u as useMatchStore } from './useMatchStore-Dgc_MSrX.mjs';
import { a as actionsStore } from './useActions-CkrJjy4V.mjs';
import { useSound } from '@vueuse/sound';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@unhead/addons';
import 'vue3-snackbar';
import './createUrl-DyOxdY5I.mjs';
import 'crypto-js';
import 'pako';
import 'buffer';

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    style: { "height": "30px", "color": "#43951e !important", "width": "30px" },
    class: "spinner-grow text-success",
    role: "status"
  }, _attrs))} data-v-d416e21c></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Loading.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d416e21c"]]);
const _imports_0 = publicAssetsURL("/icon/in2.gif");
const _soundGoal0 = "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAP/DA+LGOQTv/mA0UGSDn/hYAwKYuE8qJwLhA0rC5f1ppgAhDpgbOBd3+pgbUD3At8E+hif9D3DzBiMTmIXEFxp/3+wFnhb4J8EJB5Fliif/78R2KXFnjTHMFHH/4yDAWyZ75jABm5gAZgyA6P///x2EXGQGPFxj7HGTAsY5AuAhn////5EDMZAdY4yGjjMBkyMHATQzCIuD//////x9i4yVIOgQcsEsBBAHyu7Q7TMAAEAwGi3YMZrU/2ZHmnKp6HsPnv/jIMAcGqs21n+HOQDMeiMe5l2QxTZjIRdEfccBx878SBOE/qASLgCxelTz4ChHF++Zmf8HEWbpjQzk3Yw08Az////MVzDG5k9jJhjb/9Dlf5iuY5hcxH8nI/yYX////////////rat/+MgwAwUKirEAcFoACetk0WZmRmReJITIS4LqC2hdR4iXCZDOPUS4ZhgxgRSEpG4LgF3GMEjJIRgoJpp6i4PQlDQzJcmGpQM0jnqOf///zAdSHeAiIiHf/14B8MVM9zy+pklvAcDFJz/4yDAFhFR3wsaaMSXQ2YSgMyN9zdU/JkRLzdio9JDVSrGu6FMXrptoZSkG/lek2oCoD/9Bjukkt3+kzWAh4d4iHd//FgFWF8+9mZ3d9zGWTwVajF+3SMipEhlOzKOfn0kOfefxJWQs//jIMArEUHbBxqYxpfsl///73QITnERC83cW8ABcn/IzTDVNd/Opfv//t9tEEsCtC472rdSakbksVVfO5Nn/RyBaqWREU0mI5pnsuz0VU9HbscY3pYIwAwCwsBQB4LAdhMaAjzQkFDy/+MgwEETgZb2XJjOlhvsrR8t///Lg+UNU5mYmJiXh4/iEdAB2EnFpJXQrWpNN6doV33U+ZWe9tWOVGm0slLlN0eu3/uo3P/cGDhE1Jq/////zf/0////0/9BWRVVIitgh3iIiIiP4AD/4yDAThFa8wseoI67SAHqWkU+ug6tNSkGS25EIUZsxCkMcARCzPlGdmYyfMy9/rUv+ZWORjkJ//////////////McZUikZP+Qh3iIiHeP8QQIARlabVtoGBcUpDIjMZFnh0JPIpyZVP/jIMBjEPL3Bx6QRLsIjPp6kzqVtfn/94RKQNeGDEH6gacJSLQ+A2Hzk5WDldzv////4deJSMWAhnZmt1tuZYcgE1uX61rHOlv/nnhjzWWC7Lei9SMRSyJoz5txVIwoAaC1J2pvudn+/+MgwHoSUUcHHmjGkjHVCVXu49El//9n7sS82UQ35+1ZPEkTnRokRzu2efMzMVUy8tstuN9k4GJO0kqR1ETwDBy4lmdos2l2hAgC00uE2ghd0ElM+szNYjI1yYD6FTtDh1E0hREITMH/4yDAixkqUur60My3MNpiul3o3Rf6lUTQyhnmzGs6qyluzLZm0tFoGMcwlnK1ET8hvR2MuhnKwYMEjxVe4GnsRYVYKnDJo9dkIZCL6S2aaALDQDFbOVvfGrzPichQwonITmHCjDJ4Qv/jIMCBGOKuwvygRLiELyFCEQhebUokszyiWvLTMYCAhRjdf6dAwExjLMBCn8pUM+UuWGASl8pTP/Q3qWhjGDARgoV8UV34T++FFTe/7vyOlRALDIwRmD4kCChQQMAOPWwyEhYVFXfF/+MgwHgYasqhvDBEuUWb////FWeMFhZJkJCwuIQqKiMSB4GQqKCwef9YqKirMeKigs3//WKAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAD/4yDAcQ+YNcQASIIkIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIP/jIMCNAAACWAAAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAA/wMDAAAAAf8DAwAAAAE=";
const _soundGoal1 = "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAPA0BYDGBu4DAQQg8LCAvp3xkhKBOf3BuoBggDCA2P/+Pax5EJxS//2BvALgNBOAnsNv/tvdwPCAAABoAJOGBAsoDt///hYABoAuDEfmQguLGQQcP///4YDE5h//4yDAWyTL5lABlJAAIIKDIBicd7jni5yJgFX////+OIqEEGuI/EeD7HeANYarFxjRDL4nMLgP//////Gg4g8mGDbyDkuACtfwQYQPSXv3eKRCFl7yTr7VeVzkut2zo1uzkIT2a76bvf/jIMAiE0pevAHIEAARrh2p6rpzva+mrf+dX732Q6vRXWEBA0DzWNGLYLWTiBA7rfORRaQilp/0APvpZoabBvRxKjGlS8E1iSUA+UVKuBgLJPm2XEyBX//7STO//730p9f6GY1D3Q9P/+MgwC8TE27hlBBE2U7T19P2PJokjKc+ukk51VL7NyVd6Nq+wc5RanD5AKJJJIJ+UqMRuhQMOCIxhZSkwBUBn1lx7+QB8ThZKy4kS5QAJuCIqZGxZf/tX58XNnCjpdxdjwwDixMEYRb/4yDAPRUIYy/+EMZKEFAm8oPIBxpiFWJCJLbetLlJVCKxgkSAjSZKTS2oAMxSZMVI1VMuKw8X+RqLl1/UvbN8rP/9WK6OUrS6JKNf9byUg+uVQ0e6LPOvrOryp3qw09YaXyaOWPFcRP/jIMBDESGfD/4YRJaJEOkluv2vARZqmOpZUd6ot2UaqbqR7VQvZKUfWqP6Xff0NW7VVfWlDUZPrBRM///9ACt2mt6lHtWnNgevlGfRuzdNRGmHU0CS6u2C20EQ88DIFFEGajBRgaEh/+MgwFkQwfbNlDiKtDmzFhNAfcQ9pEP8oY0lOXPodGjX/xBQEtwrEGXoZ9QuARZoWDsqAzj3JMb/QXe8akVg+gDWFBBnu6gGJE4PkBZLoqIxX0dwJHFxnePtO7V74pKWLcoYZ2frPhv/4yDAcRJQBuL+eAAAQQwydMqSqpv3CxoUNcRgs3+lShcM2JFSxIVAfzEJbl+wAsgACMRIHQofoUL84XX/4iABOLROr9mU5+R2IT0kU53JkqfZSPIieyECeD58MYPh9CgRC2UGvsUCBf/jIMCCEFAK4jQ4AADD158ED6NQYE//4gOA+I0QLlXPg1q8rKS2MGEqrZFw/L85T7hmPQy1b9C9KGNaimSrJej6di0M9cqKIta8a+E4udO1B0ROv8Ggqe6wVdGSKJNSZHplU9Eqp4iD/+MgwJsTaaL7/gjElKCWuNtM0TNg3DsNYPaV8MwIXU2hbP6mrmKamiKR13bvrdupUUvX2/Kn0iShY7OlcAlruVI648PKQ8aEnwLnTlVGKuImJV++JQ4kSh22JAZAllQUUlt2o2/ALrr/4yDAqBNZpu4UEMSUkqS0WRRTvlssK4UaIT8jM0Uj1WVdrucZHo1kUMYVW90Vkpt+uuD/0BrnaiC39uJ9J1e/JDmb5keoklrrRx7FckNAhmQ0cslsou+AC4g6rJnTe5utOGQmeQnEMP/jIMC1E5Gi7/4YipQ8n/Eanl6ylu5jstXdqM7MT+kp7WSyss/Cv/uMLRAVGVoPF6h5/etQKhsTi7mkwywKhORAJwcct00UoM0jO6cbElwBUpnV03PTFRkr4QySGq/z3Jl1+/tW/2TZ/+MgwMETEaLi/mhElN0VDXoKo9EM5W/Vpvt1lwr/6zKFveOYptUiuJWuHrO0oorcyifqXJiVyg7CYIiUKHSR42BNJpsSf5NAYUDSzsFQEeLAIGn+oOg0HSXgqWDQNElwVWWfPbKn1A3/4yDAzxTxotL+aESUWHSwVO/ogrlRoSDhGsZo/kRKAtR4riIKhup63hoO8kHZYkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/jIMDWFNmexj5oxJQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MgwN0SWArD/hAAAgAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACD/4yDA7gAAAlgAAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAP/jIMD/AAACWAAAAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAA/wMDAAAAAQ==";
const _soundGoal2 = "data:audio/mpeg;base64,/+MQwAAAAAJYAAAAAEGjU2ZMmf80/+aNGTJkyYNGjRof7wTeioPlAx8uCHByJ3/BMH8EAf/jEMAnBMAA9AAAAAD6nfBAMaMHw/g+f+D7/UGA/6SLZwnk3bNdvZXMU1vzGYxh+So4z/P/4xDAOwjgAjcrQAAADGPwIyceoRHf3+fc2cd/+YY3mt///z8wxj+h2RkxOUD/1OYgEQnk/+MQwD4NklroAYpQAZL///6B5v9FAewEEHMbUav///////////1mIUDQAADgAL/9gLDH///jEMAuCJoe2AHRaAH//t/+AQ7////////////8G4DAACAAav+sK1P///+jf/QMV///////4xDAMgcKIvaGOUS0/////v/+HNkA0AAAwAF2/6g6Jf///7f/UFj/////////////g6DA/+MQwDwHUh7x5mqEtwH/0y+D+Jw3///9v/MMBUSf////////////QqZQACQAAmgFEH/+pf/jEMBFBzIe8oZpxLSAUqcW9/yN/6bHAmKkU3xOQyHkHoLSX4IAMPu/+oBh8EHAZAsBgJf/4xDATwd6ItwHTVAAAADgAGqJig/+RFJEQPKT/////+M//QGBW////QDwBwARSF/jjPLD/+MQwFgL0Ps7hYUQRkCNrP/////2xu3/4Kgj/////s2dYLgAADQAF0OMH815wdb///2/5v/jEMBPB1ke+ofNKADAX//Bu/////lPe+ncAAAoDABjiEv4zCwCt///2/64U//4W7//////4xDAWAeZGulGC05y+t1w4NAAAACh+AGD/5u1EIR2///7f9nu3/4hf////3dvmJgAAJHt/+MQwGAHgRcHrgqEcvmQkZ////b+T+XeiwWah4oLA4HjQwWbqaaNVINPFtdBo0DxgDAEEP/jEMBpB6EW/i4JSnIm9/hCsnBTomQGbq////fH8aP9v2Gf+pgEQ2xwADYhk/gcpgPsN+P/4xDAcQeBFvLOC05wywRkb/////bHzeh/4kCd/1YRw6D8ACpprnfwEl1i9DfEi6C8X//+/+MQwHoJmANLxgAAAo3/Oxj+PvwcO/6xoGymAAByQ5/9AcRIhgKE+kBfn///7f87kz81/P/jEMB6B/lS6fArTpB3Fn/rFQpAmAAzhYxfwfE5fpit3/+qf/JfV//B/1g+D4fBB2XLg+D/4xDAgQfZTt3gLJSQ+D4IAgCAYMMEWV0O/i+Hj5/qH///++Iv/+NmRWtlZRYCG////EQ8/+MQwIgH+U7Z4DyUkOB4ADSv+IMij2sCuemSADST///9cp+v4nf/5Ut////UJagAAIItH//jEMCPCBlO2oBUWpD8DZIxEQ8LX8nATh7///03b6fqP/+NHf///4M4mwAAZmcv+ArrHwb/4xDAlQmwA0fOAAACBdwinyeEXS////lf1/ML//Klv///8MCqAAC7n/8KZOD2i4Rf1lwF/+MQwJUIGb8qGAiKlqn///9cn6fgh//gxv///8DAiQAAg9Cp/i2k8L8yITT1GQIFv///TP/jEMCbCAG65eA7TpRL8v4x//hY7///+oyXAACCOhz/4QuoiiUKYJP8fwkaTf//98b+/4X/4xDAoghpvuqIE0qUN/8Lb////BSqAAAAmnKqfoFEmAUrrCg9ZcCRJ///+uT9vzDf/Bv//+MQwKcIabrmgCtOlP//wQu4AACADkZP+B2TGYn0gofUTgZG///9MV+/4dv/kf////HAsP/jEMCsCBG65oA7RJQAAIOp3/UFrsZAis4Hb47wt6X///nxH9Pwv/8K////1ECgAAB0f/r/4xDAsgiBuuaIE0qUA5izCrMgAlfTLgBbP///7Yh+X8RH//Eh3///+CiwAABjf/g7LKI0/+MQwLcIsbriiDtKlDaEkQbreojgVDV///+mdvv+ID//qO////wcsAAAnv/1AS6Y0AqXcP/jEMC7CMG64pA7RJQKvxjgj6X///riP7fhT//Ud////UOAsAAAsv/QHDmGoDzRNgAlemT/4xDAvwhRuuKQK0SUoANJP///2xx/v+IP/1Lf///4rKAAANf/DZaOsLSjyANsfUXgqJ5//+MQwMQIcbraiDtKlP//piTfb8KHf/UM////qJCwAADT/qBE9QsQnCkQBpfGsBvm3///rv/jEMDJCKm61oBTSpQP9/0G/+DG////xIC4AADDsfX+gEDky4BxeBI+mSAK0v///y7P8n7/4xDAzQjxutaAPAqUo7/4W3///+PAkAAANZP/BWOREBa0y2A1Y/rMCBA8Jaf///pj36/h/+MQwNAImbrWgDtKlHb/4h//iwCwAAAAmnf9QkuiSQDCioAbW8TcCZm3///rjf3/CL//K//jEMDUCPG60oBTTpT////UEKAAACKWr/qD45wX4gEyALt+mRQBpJ///+2Ift+w//4QH///4xDA1wjputKAPIqU8QjAAACi/+AWWWLSFyEjUCWN1DWBGhVf/7f827ff8Kf/4V////w0/+MQwNoIibrWgDtElMAAACr/9QBS6Q7AHCfcAQ36Axwb6X///riP5Pwr/8YO////qHCwAP/jEMDeCNG62og7SpQA0f+oMCRiKcHrrPgFjqTJwA/G//7f8mEf6/hhv/xv///8KJAAANf/4xDA4QkJSsqAVM6Q/sDsWnCbBajVQAz+ofQLwVX/+3/Nmb6fuN/+N////gTAAABq/9Qk/+MQwOMJMbrSkFNKlJOwqhUEDUAAAewm4AbzZH///rg/1/Bjf/Qb////ErAAAEnf/qCgSf/jEMDlCOlSzohsSpAioD5NoGJ9SY5gNmk////bZ/p+Nb/8d////hqwAABj1/7ArHDoiAj/4xDA6AkxusqAPIqUCpm4AhOtAhwVCVX///6Yb8v4P/9Rv///8QCgAABSS/+sHSbqGOBe/+MQwOoJMbrOiDtKlMul4A21dQkYNmy8j///1xP9/xo//4W7/8QgkAAACuv/qB4dASMCRP/jEMDsCSm6xoBsRJR4uggpegZjKAHcb///+2T9vyD//hb////0HqAAAC0f/mgNjVIS0Lf/4xDA7gj5usaAPISUhI0BJKHQFqBGAqv///3zfv+FP/9h////9RaXAAC6qv9QAo6xAAVk/+MQwPEJObrGgFNElNjMBOJ9ATeGdl5H///rg/0/BN/8E////9RA/+s4E44UwiADizMngP/jEMDzCPm6woBsipTFG0NAzGyANKJNv//+mEPy/mDP/hX///+g0KAAAEGV/0QVsgmBFgb/4xDA9glZusKAVMSUXKpsBpc/UKcArAkUv//++Zvm/Djf/BN////igP/qMwHKMuEIQbWL/+MQwPcJmUq+gGyKkISwHbLPdAOjAjEvI+///m4n/N/ELf/KN////i2QAABl/+cA+JHByf/jEMD3Cbm6vohsipQFQF4ugbUPqMyCADeN////TZ/v+Fv/9G////x48AAIpjv/mgExNL7/4xDA9wnBur6IVMqUGOAKJImXgOy6CajwpIFcDwnQW///+G/b8G//wQ3///+I1AAkt2wj/+MQwPcJqbq6gFSElAlD/CozEGAjav/7ioy6W5YCkmBJ5VYxH2hIKgICkhKRJMHgJDDwwv/jEMD3CaG6rACFCpS4xaWuHpAJHzJmrLLAYYMDCPDaVIhEMnCNBOCaSyakwiKigsaNCov/4xDA9woRurKAbMSUNULC/irP1iwAAAAAAAAAAAAAIAAgACAAIAAgACAAIAAgACAAIAAg/+MQwPUJwbqoAGzOlAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAP/jEMD1Cam6soBsypQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACD/4xDA9QsBuq3oVMSUACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAA/+MQwPAMoFrrnghGKiAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIP/jEMDkCjiiBAAI0kwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAD/4xDA4gAAAlgAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAA/wMDAAAAAQ==";
const _soundGoal3 = "" + buildAssetsURL("sound3.5uI_3FNV.mp3");
const _soundRed = "" + buildAssetsURL("red.CmytILDI.mp3");
const ITEM_PER_PAGE = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LivescoreComponent",
  __ssrInlineRender: true,
  props: {
    page: {},
    isLoading: { type: Boolean },
    content: {},
    favorites: {},
    h1: {}
  },
  async setup(__props, { emit: __emit }) {
    var _a2, _b2, _c2;
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    let __temp, __restore;
    moment.locale("vi");
    const { width } = useWindowSize();
    useWindowScroll();
    const keyEncode = ref("");
    const storeSystems = systemsStore();
    useLocalePath();
    const useAction = actionsStore();
    const embedCode = ref("");
    const isIframeVisible = ref(false);
    const imageHeight = (_a2 = getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "LEAGUE_IMAGE_HEIGHT")) != null ? _a2 : "!h50";
    const liveScoresImage = computed(() => {
      return useRuntimeConfig().public.liveScoreImage + "/";
    });
    const props = __props;
    const isDesktop = computed(() => {
      return width.value > 768;
    });
    const settingsData = useCookie("settingsData");
    const isHidden = useState("my-shallow-state");
    const router = useRouter();
    useRouter();
    socketStore();
    const matchStore = useMatchStore();
    ref(false);
    ref([]);
    ref(1);
    const compKeysList = ref();
    const compsList = ref();
    const compsListByKey = ref();
    const renderTopList = ref();
    const compsDataList = ref([]);
    const compsDataFilterList = ref([]);
    const compsDataListByKey = ref();
    const compOriginsList = ref([]);
    const compChooseLeagueList = ref([]);
    ref([]);
    ref([]);
    ref();
    const matchsGroupList = ref();
    const matchOriginsList = ref();
    const matchsList = ref([]);
    const matchLivesList = ref([]);
    const matchRecentResult = ref([]);
    const activeTab = ref(LIVESCORE_ACTIVE_TAB.ALL);
    const isLoadingData = ref(true);
    ref(true);
    ref(false);
    const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
    const oddCompanyIsport = computed(() => {
      const oddCompany = ODD_COMPANYS.find(({ id }) => id === oddCompanySelected.value);
      return oddCompany == null ? void 0 : oddCompany.isportsapi;
    });
    const formattedContentPage = computed(() => {
      return `<h1 class="page_title">${props.h1}</h1>${props == null ? void 0 : props.content}`;
    });
    const winScorePositionCorner = ref({ top: "0px", left: "0px" });
    const showWinScoreCorner = ref(false);
    const orderByTime = ref(false);
    const winScorePositionOdds = ref({ top: "0px", left: "0px" });
    const showWinScoreOdds = ref(false);
    ref(false);
    const winScorePosition = ref({ top: 0, left: 0 });
    const showWinScore = ref(false);
    const showSubInfoSport = ref(false);
    const activeSection = ref("scoredConceded");
    const activeSectionTable = ref("ThirtyGames");
    const availableStreamUrl = getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "available_stream_url") || "";
    const onOffIframe = storeSystems == null ? void 0 : storeSystems.optionIframe;
    const matchSummary = ref([]);
    const matchCorner = ref([]);
    const matchOddsCorner = ref([]);
    const matchHover = ref();
    const oddsDetail = ref();
    const matchActiveLiveFlash = ref();
    ref(null);
    const qSearch = ref();
    ref([]);
    ref([]);
    const matchSearchList = ref([]);
    const matchSearchLength = ref(1);
    const compSearchLength = ref(1);
    ref();
    ref([]);
    const searchTab = ref(1);
    const compsDataListSearch = ref([]);
    ref([]);
    const teamsSearch = ref([]);
    const isLoadingSearch = ref(false);
    const matchsListLength = ref(0);
    const expand = ref(false);
    ref("");
    const showContentPage = ref(false);
    ref(false);
    ref("");
    const isShowOddsHDP = ref(true);
    const isShowOddsTX = ref(true);
    const isShowOdds1X2 = ref(false);
    const isShowCardYellow = ref(((_a = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _a.isShowCardYellow) || true);
    const isShowCardRed = ref(((_b = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _b.isShowCardRed) || true);
    const isShowRanking = ref(((_c = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _c.isShowRanking) || true);
    const isShowGoalWindow = ref(((_d = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _d.isShowGoalWindow) || true);
    const isScoreGoal = ref(null);
    const isScoreGoalMatchId = ref(null);
    const isShowRedWindow = ref(((_e = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _e.isShowRedWindow) || true);
    const timeoutID = ref();
    const settingType = ref(((_f = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _f.settingType) || 0);
    const scoreChangeType = ref(null);
    ref();
    const playbackRate = ref(1);
    const soundHome = ref(((_g = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _g.soundHome) || 0);
    const soundAway = ref(((_h = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _h.soundAway) || 1);
    const quickSearch = ref();
    ref(true);
    const isGroupByCountry = ref(false);
    const isGroupByAlphabet = ref(false);
    const contriesList = ref([]);
    const contriesOriginList = ref([]);
    const leagueTabStatus = ref(0);
    const toggleCompetition = ref([]);
    const favouritesList = ref([]);
    const favouritesLeagues = ref([]);
    const favouritesTeams = ref([]);
    const matchesAnalysis = ref([]);
    const shootTime = ref([]);
    const timeZone = ref((_c2 = (_b2 = (_i = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _i.timeZone) != null ? _b2 : getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE")) != null ? _c2 : "");
    const cFavouritesData = useCookie("favouritesData", {
      maxAge: 60 * 60 * 24
      // 30 days in seconds
    });
    useCookie("favouritesLeagues", {
      maxAge: 60 * 60 * 24
      // 30 days in seconds
    });
    useCookie("favouritesTeams", {
      maxAge: 60 * 60 * 24
      // 30 days in seconds
    });
    const matchesList = ref(null);
    const loaderMatcher = ref(null);
    const limitData = ref(ITEM_PER_PAGE);
    const oddsIMain = ref([]);
    const oddsIMainWS = ref([]);
    const oddsIMainList = ref([]);
    const datesList = ref([]);
    const datePara = (_l = (_k = (_j = router == null ? void 0 : router.currentRoute) == null ? void 0 : _j.value) == null ? void 0 : _k.query) == null ? void 0 : _l.date;
    const dateChoose = ref(datePara ? datePara : moment().format("yyyy-MM-DD"));
    const timeRefesh = ref(Date.now());
    useState("contriesState", () => null);
    useState("contriesState");
    ref([]);
    for (let i = -7; i < 8; i++) {
      datesList.value.push({
        day: moment().add(i, "days").format("DD"),
        dayValue: moment().add(i, "days").format("yyyy-MM-DD"),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        label: moment().add(i, "days").format("ddd")
      });
    }
    useIntersectionObserver(
      loaderMatcher,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          limitData.value += ITEM_PER_PAGE;
        }
      },
      { matchesList }
    );
    function formatTimeWithGMT(gmtString) {
      const offset = parseInt(gmtString.split("GMT")[1].split(":")[0], 10);
      const date = /* @__PURE__ */ new Date();
      const utcDate = new Date(date.getTime() + offset * 60 * 60 * 1e3);
      const formattedDate = utcDate.toISOString().split("T")[0];
      return formattedDate;
    }
    const activeFilterOdds = ref("oddsFilter1");
    const isFilterBoxLeague = ref(false);
    const isFilterBoxVisible = ref(false);
    reactive({
      modal_search: null
    });
    const soundGoal0 = useSound(_soundGoal0, {
      playbackRate,
      interrupt: true
    });
    const soundGoal1 = useSound(_soundGoal1, {
      playbackRate,
      interrupt: true
    });
    const soundGoal2 = useSound(_soundGoal2, {
      playbackRate,
      interrupt: true
    });
    const soundGoal3 = useSound(_soundGoal3, {
      playbackRate,
      interrupt: true
    });
    useSound(_soundRed, {
      playbackRate,
      interrupt: true
    });
    const reduceMatch = (match) => {
      var _a22, _b22;
      match[(_a22 = match == null ? void 0 : match.home_team) == null ? void 0 : _a22.i_team] = match == null ? void 0 : match.home_team;
      match[(_b22 = match == null ? void 0 : match.away_team) == null ? void 0 : _b22.i_team] = match == null ? void 0 : match.away_team;
      return match;
    };
    useDebounceFn(() => {
      var _a22, _b22;
      if (((_b22 = (_a22 = quickSearch.value) == null ? void 0 : _a22.trim()) == null ? void 0 : _b22.length) >= 3) {
        qSearch.value = quickSearch.value.trim();
      } else {
        qSearch.value = "";
      }
    }, 300);
    const handleClickCorner = async (event, match) => {
      if ((props == null ? void 0 : props.page) === LIVESCORE_PAGE.RESULTS || (props == null ? void 0 : props.page) === LIVESCORE_PAGE.SCHEDULE || [...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match == null ? void 0 : match.status)) {
        return;
      }
      matchHover.value = reduceMatch(match);
      const cornerSpanRect = event.target.getBoundingClientRect();
      winScorePositionCorner.value = {
        top: `${cornerSpanRect.top + (void 0).scrollY}px`,
        left: `${cornerSpanRect.left + (void 0).scrollX - 400}px`
      };
      showWinScoreCorner.value = true;
      await fetchMatchsCorner(match == null ? void 0 : match.id);
      await fetchOddsCorner(match == null ? void 0 : match.id);
    };
    const handleMouseOverOdds = async (event, match) => {
      var _a22, _b22;
      if ((props == null ? void 0 : props.page) === LIVESCORE_PAGE.RESULTS || (props == null ? void 0 : props.page) === LIVESCORE_PAGE.SCHEDULE) {
        return;
      }
      if (!(match == null ? void 0 : match.odds) || ((_a22 = match == null ? void 0 : match.odds) == null ? void 0 : _a22.length) === 0)
        return;
      matchHover.value = reduceMatch(match);
      ODD_COMPANYS.find(({ id }) => id === oddCompanySelected.value);
      const oddsTdRect = event.target.getBoundingClientRect();
      winScorePositionOdds.value = {
        top: `${oddsTdRect.top + (void 0).scrollY}px`,
        left: `${oddsTdRect.left + (void 0).scrollX - 555}px`
      };
      showWinScoreOdds.value = true;
      const currentTime = Date.now();
      if ((currentTime - timeRefesh.value) / 1e3 > 5) {
        timeRefesh.value = Date.now();
        await fetchOddsIMain(dateChoose.value);
        Object.keys(matchsList.value).map((index) => {
          var _a3, _b3, _c22;
          matchsList.value[index].odds_older = [];
          matchsList.value[index].odds = ((_c22 = oddsIMain.value) == null ? void 0 : _c22[(_b3 = (_a3 = matchsList.value) == null ? void 0 : _a3[index]) == null ? void 0 : _b3.i_match_id]) || [];
        });
      }
      oddsDetail.value = (_b22 = oddsIMainList.value) == null ? void 0 : _b22.filter((item) => (item == null ? void 0 : item.i_match_id) === (match == null ? void 0 : match.i_match_id));
    };
    const handleMouseLeaveOdds = () => {
      showWinScoreOdds.value = false;
    };
    const handleMouseOver = async (event, match) => {
      if ((props == null ? void 0 : props.page) === LIVESCORE_PAGE.RESULTS || (props == null ? void 0 : props.page) === LIVESCORE_PAGE.SCHEDULE || [...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match == null ? void 0 : match.status)) {
        return;
      }
      !LIVESCORE_STATUS.NOT_START.includes(match == null ? void 0 : match.status);
      showWinScore.value = true;
      const tipsTdRect = event.target.getBoundingClientRect();
      winScorePosition.value = {
        top: `${tipsTdRect.bottom + (void 0).scrollY}px`,
        left: `${tipsTdRect.left + (void 0).scrollX + tipsTdRect.width / 2 - 200}px`
      };
      await fetchMatchsLiveDetail(match == null ? void 0 : match.id);
    };
    const handleMouseLeave = () => {
      showWinScore.value = false;
    };
    const toggleSubInfoSport = async (event, match) => {
      activeSection.value = "scoredConceded";
      if (matchActiveLiveFlash.value === (match == null ? void 0 : match.id)) {
        showSubInfoSport.value = false;
        matchActiveLiveFlash.value = null;
      } else {
        showSubInfoSport.value = !showSubInfoSport.value;
        matchActiveLiveFlash.value = match == null ? void 0 : match.id;
      }
      await fetchMatchesAnalysis(match == null ? void 0 : match.id);
    };
    const setActiveSection = async (event, match, section) => {
      activeSection.value = section;
      if (section === "scoredConceded") {
        await fetchMatchesAnalysis(match == null ? void 0 : match.id);
      } else {
        await fetchMatchsLiveDetail(match == null ? void 0 : match.id);
        await fetchMatchAnalysis(match);
      }
    };
    const setActiveSectionTable = (table) => {
      activeSectionTable.value = table;
    };
    const addFavourites = (matchId) => {
      var _a22;
      if (!((_a22 = favouritesList.value) == null ? void 0 : _a22.includes(matchId))) {
        favouritesList.value.push(matchId);
      }
      cFavouritesData.value = JSON.stringify(favouritesList.value);
    };
    const removeFavourites = (matchId) => {
      const index = favouritesList.value.indexOf(matchId, 0);
      if (index > -1) {
        favouritesList.value.splice(index, 1);
      }
      cFavouritesData.value = JSON.stringify(favouritesList.value);
    };
    watch(
      [isGroupByCountry, leagueTabStatus],
      async ([nIsGroupByCountry, nLeagueTabStatus]) => {
        var _a22, _b22, _c22, _d2, _e2;
        let statusList = null;
        switch (nLeagueTabStatus) {
          case 0:
            statusList = null;
            break;
          case 1:
            statusList = ["2", "3", "4", "5", "6", "7"];
            break;
          case 2:
            statusList = ["8"];
            break;
          case 3:
            statusList = ["1"];
            break;
          default:
            statusList = null;
            break;
        }
        if (statusList !== null) {
          const matchesWithStatus = [];
          Object.keys(matchOriginsList.value).map((index) => {
            var _a3;
            if (statusList.includes((_a3 = matchOriginsList.value[index]) == null ? void 0 : _a3.status)) {
              matchesWithStatus.push(matchOriginsList.value[index]);
            }
          });
          const matchsGroup = groupBy(matchesWithStatus, (x) => x.competition);
          const matchsGroupKey = [...matchsGroup.keys()];
          compChooseLeagueList.value = (_a22 = compOriginsList.value) == null ? void 0 : _a22.filter((item) => {
            return matchsGroupKey == null ? void 0 : matchsGroupKey.includes(item == null ? void 0 : item.id);
          }).map((item) => {
            item.matchs = matchsGroup == null ? void 0 : matchsGroup.get(item == null ? void 0 : item.id);
            return item;
          });
        } else {
          const matchesWithStatus = [];
          Object.keys(matchOriginsList.value).map((index) => {
            matchesWithStatus.push(matchOriginsList.value[index]);
          });
          const matchsGroup = groupBy(matchesWithStatus, (x) => x.competition);
          [...matchsGroup.keys()];
          compChooseLeagueList.value = (_b22 = compOriginsList.value) == null ? void 0 : _b22.map((item) => {
            item.matchs = matchsGroup == null ? void 0 : matchsGroup.get(item == null ? void 0 : item.id);
            return item;
          });
        }
        const countriesHasKey = (_c22 = compChooseLeagueList.value) == null ? void 0 : _c22.map((item) => item == null ? void 0 : item.country);
        if (nIsGroupByCountry) {
          contriesList.value = (_d2 = contriesOriginList.value) == null ? void 0 : _d2.filter((item) => countriesHasKey.includes(item == null ? void 0 : item.id));
          const compsGroup = groupBy(compChooseLeagueList.value, (x) => x.country);
          [...compsGroup.keys()];
          contriesList.value = (_e2 = contriesList.value) == null ? void 0 : _e2.map((item) => {
            item.league = compsGroup == null ? void 0 : compsGroup.get(item == null ? void 0 : item.id);
            return item;
          });
        }
      },
      { deep: true }
    );
    const fetchMatchsLive = async (date = null) => {
      if (date && date === moment().format("yyyy-MM-DD") || !date) {
        useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_LIVE, {
          date: date ? date : moment().format("yyyy-MM-DD"),
          tz: moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format("Z")
        }).then((resData) => {
          matchLivesList.value = resData;
        });
      } else {
        matchLivesList.value = [];
      }
    };
    const fetchMatchAnalysis = async (match) => {
      useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_ANALYSIS + "/" + (match == null ? void 0 : match.id)).then((resData) => {
        var _a22, _b22, _c22, _d2, _e2, _f2;
        if (resData) {
          matchRecentResult.value[(_a22 = match == null ? void 0 : match.home_team) == null ? void 0 : _a22.id] = getRecentResultTheSport((_b22 = resData == null ? void 0 : resData.history) == null ? void 0 : _b22.home, (_c22 = match == null ? void 0 : match.home_team) == null ? void 0 : _c22.id, true);
          matchRecentResult.value[(_d2 = match == null ? void 0 : match.away_team) == null ? void 0 : _d2.id] = getRecentResultTheSport((_e2 = resData == null ? void 0 : resData.history) == null ? void 0 : _e2.away, (_f2 = match == null ? void 0 : match.away_team) == null ? void 0 : _f2.id);
        }
      });
    };
    const fetchMatch = async (date = null) => {
      var _a3, _b3;
      var _a22, _b22;
      let status = null;
      switch (props == null ? void 0 : props.page) {
        case LIVESCORE_PAGE.LIVESCORE:
          status = [...LIVESCORE_STATUS.IS_LIVE, ...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].toString();
          break;
        case LIVESCORE_PAGE.RESULTS:
          status = LIVESCORE_STATUS.IS_END.toString();
          break;
        case LIVESCORE_PAGE.FAVORITES:
          status = [...LIVESCORE_STATUS.IS_LIVE, ...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE, ...LIVESCORE_STATUS.IS_END].toString();
          break;
      }
      const timeZone2 = String((_a3 = getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE")) != null ? _a3 : "GMT+07:00").slice(3);
      const query = {
        date: date ? date : formatTimeWithGMT((_b3 = getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE")) != null ? _b3 : "+07:00"),
        tz: timeZone2,
        // limit: 20,
        // page: 1,
        decode: 1
      };
      if (status !== null) {
        query.status = status;
      }
      const resData = await useFetch(API_ROUTERS.LIVESCORE.MATCHS_RECENT, {
        query
      }, "$LDOzvlRNuV");
      return ((_b22 = (_a22 = resData == null ? void 0 : resData.data) == null ? void 0 : _a22.value) == null ? void 0 : _b22[0]) || [];
    };
    const fetchMatchsRecent = async (date) => {
      var _a22;
      let resData = await fetchMatch(date);
      resData = resData.map((item) => {
        if ((item.number_hot === 1 || item.number_hot === 2) && item.away_team.country === item.home_team.country && item.comp.country_logo) {
          item.isFlatCountry = true;
        }
        return item;
      });
      const arr = resData.reduce((acc, cur) => {
        const findKey = acc == null ? void 0 : acc.find((item) => (item == null ? void 0 : item.id) === cur.comp.id);
        if (!findKey) {
          acc.push(cur.comp);
        }
        return acc;
      }, []);
      compsDataList.value = arr;
      compOriginsList.value = arr;
      compChooseLeagueList.value = arr;
      const dataMcompsDataListByKey = [];
      arr == null ? void 0 : arr.forEach((item) => {
        compsDataFilterList.value[item == null ? void 0 : item.id] = true;
        dataMcompsDataListByKey[item == null ? void 0 : item.id] = item;
      });
      compsDataListByKey.value = dataMcompsDataListByKey;
      const matchsDataList = [];
      const matchData = resData ? [...matchLivesList.value, ...resData] : matchLivesList.value;
      matchData.forEach((item) => {
        var _a3;
        item.odds = ((_a3 = oddsIMain.value) == null ? void 0 : _a3[item.i_match_id]) || [];
        matchsDataList[item == null ? void 0 : item.id] = item;
      });
      matchsList.value = matchsDataList;
      matchOriginsList.value = Object.assign([], matchsDataList);
      const matchsGroup = groupBy(matchData, (x) => x.competition);
      const matchsGroupKey = [...matchsGroup.keys()];
      compOriginsList.value = (_a22 = compsDataList.value) == null ? void 0 : _a22.filter((item) => {
        return matchsGroupKey == null ? void 0 : matchsGroupKey.includes(item == null ? void 0 : item.id);
      }).map((item) => {
        item.matchs = matchsGroup == null ? void 0 : matchsGroup.get(item == null ? void 0 : item.id);
        return item;
      });
      renderDataList();
    };
    const fetchMatchsLiveDetail = async (match_id) => {
      useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_LIVE_DETAIL + "/" + match_id).then((resData) => {
        matchSummary.value = resData;
      });
    };
    const fetchMatchesAnalysis = async (match_id) => {
      useApiLiveScore(
        API_ROUTERS.LIVESCORE.MATCHES_ANALYSIS + "?match_id=" + match_id
      ).then((resData) => {
        var _a22, _b22, _c22, _d2, _e2, _f2, _g2;
        matchesAnalysis.value = getDataObject((_a22 = resData == null ? void 0 : resData.results) == null ? void 0 : _a22[0]);
        shootTime.value["sumHome"] = (_d2 = (_c22 = (_b22 = matchesAnalysis.value) == null ? void 0 : _b22.home_shoot_time) == null ? void 0 : _c22[0]) == null ? void 0 : _d2.reduce(
          (sumHome, val) => sumHome + parseInt(val),
          0
        );
        shootTime.value["sumAway"] = (_g2 = (_f2 = (_e2 = matchesAnalysis.value) == null ? void 0 : _e2.away_shoot_time) == null ? void 0 : _f2[0]) == null ? void 0 : _g2.reduce(
          (sumAway, val) => sumAway + parseInt(val),
          0
        );
      });
    };
    const fetchMatchsCorner = async (match_id) => {
      matchCorner.value = [];
      useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_CORNER, {
        match_id
      }).then((resData) => {
        var _a22, _b22;
        if ((resData == null ? void 0 : resData.length) > 0) {
          matchCorner.value = resData == null ? void 0 : resData[0];
          const eventList = JSON.parse((_b22 = (_a22 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a22.event_list) == null ? void 0 : _b22.replace(new RegExp(escapeRegExp("'"), "g"), '"'));
          matchCorner.value.event_list = eventList;
        }
      });
    };
    const fetchOddsCorner = async (match_id) => {
      useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_CORNER_MAIN, {
        match_id
      }).then((resData) => {
        matchOddsCorner.value = resData == null ? void 0 : resData.data;
      });
    };
    const fetchOddsIMain = async (date = null) => {
      const oddCompany = ODD_COMPANYS.find(({ id }) => id === oddCompanySelected.value);
      const query = {
        date: date ? date : moment().format("yyyy-MM-DD"),
        tz: moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format("Z"),
        i_company_id: oddCompany == null ? void 0 : oddCompany.isportsapi
      };
      useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_IMAIN, query).then((resData) => {
        var _a22;
        if (resData) {
          try {
            oddsIMainList.value = JSON.parse(JSON.stringify(resData));
            const oddsList2 = [];
            resData == null ? void 0 : resData.forEach((item) => {
              var _a3, _b22, _c22, _d2, _e2, _f2, _g2, _h2, _i2;
              if (!oddsList2[item.i_match_id]) {
                oddsList2[item.i_match_id] = [];
              }
              const handicap = resData == null ? void 0 : resData.find((odd) => odd.i_match_id === item.i_match_id && odd.type === "handicap");
              if (handicap) {
                handicap.initial = (_a3 = handicap == null ? void 0 : handicap.initial) == null ? void 0 : _a3.replace(/[^0-9.,]/g, "");
                handicap.inplay = (_b22 = handicap == null ? void 0 : handicap.inplay) == null ? void 0 : _b22.replace(/[^0-9.,]/g, "");
                handicap.instant = (_c22 = handicap == null ? void 0 : handicap.instant) == null ? void 0 : _c22.replace(/[^0-9.,]/g, "");
              }
              oddsList2[item.i_match_id][0] = (handicap == null ? void 0 : handicap.instant) || (handicap == null ? void 0 : handicap.inplay) || (handicap == null ? void 0 : handicap.initial) || null;
              const overUnder = resData == null ? void 0 : resData.find((odd) => odd.i_match_id === item.i_match_id && odd.type === "overUnder");
              if (overUnder) {
                overUnder.initial = (_d2 = overUnder == null ? void 0 : overUnder.initial) == null ? void 0 : _d2.replace(/[^0-9.,]/g, "");
                overUnder.inplay = (_e2 = overUnder == null ? void 0 : overUnder.inplay) == null ? void 0 : _e2.replace(/[^0-9.,]/g, "");
                overUnder.instant = (_f2 = overUnder == null ? void 0 : overUnder.instant) == null ? void 0 : _f2.replace(/[^0-9.,]/g, "");
              }
              oddsList2[item.i_match_id][1] = (overUnder == null ? void 0 : overUnder.instant) || (overUnder == null ? void 0 : overUnder.inplay) || (overUnder == null ? void 0 : overUnder.initial) || null;
              const europeOdds = resData == null ? void 0 : resData.find((odd) => odd.i_match_id === item.i_match_id && odd.type === "europeOdds");
              if (europeOdds) {
                europeOdds.initial = (_g2 = europeOdds == null ? void 0 : europeOdds.initial) == null ? void 0 : _g2.replace(/[^0-9.,]/g, "");
                europeOdds.inplay = (_h2 = europeOdds == null ? void 0 : europeOdds.inplay) == null ? void 0 : _h2.replace(/[^0-9.,]/g, "");
                europeOdds.instant = (_i2 = europeOdds == null ? void 0 : europeOdds.instant) == null ? void 0 : _i2.replace(/[^0-9.,]/g, "");
              }
              oddsList2[item.i_match_id][2] = (europeOdds == null ? void 0 : europeOdds.instant) || (europeOdds == null ? void 0 : europeOdds.inplay) || (europeOdds == null ? void 0 : europeOdds.initial) || null;
            });
            oddsIMain.value = oddsList2;
            (_a22 = Object.keys(matchsList.value)) == null ? void 0 : _a22.map((index) => {
              var _a3, _b22, _c22;
              matchsList.value[index].odds_older = [];
              matchsList.value[index].odds = ((_c22 = oddsIMain.value) == null ? void 0 : _c22[(_b22 = (_a3 = matchsList.value) == null ? void 0 : _a3[index]) == null ? void 0 : _b22.i_match_id]) || [];
            });
          } catch (e) {
            oddsIMain.value = oddsList;
          }
        }
      });
    };
    const wssMatch = (socketData) => {
      var _a3, _b3, _c3, _d3;
      var _a22, _b22, _c22, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m, _n, _o, _p, _q, _r, _s, _t;
      try {
        if (socketData) {
          try {
            const company = ODD_COMPANYS.find(({ id }) => id === oddCompanySelected.value);
            const wssItem = socketData;
            if (wssItem.payload.match_live) {
              const matchLive = wssItem.payload.match_live;
              const matchStatusMapping = {
                3: "HT",
                8: "Fulltime",
                7: "PS",
                5: "OT",
                9: "Delay"
              };
              let reduceMatchList = false;
              for (const match of matchLive) {
                const matchId = match.matchId;
                const status = match.status;
                const timestampKickOff = match.timestamp_kick_off;
                const currentTimestamp = Math.floor(Date.now() / 1e3);
                if (status !== 1 && timestampKickOff !== 0) {
                  if (matchsList.value[matchId]) {
                    let statusText = null;
                    let matchMinutes = 0;
                    if (status === 2) {
                      matchMinutes = Math.floor((currentTimestamp - timestampKickOff) / 60 + 1);
                      statusText = `<i class="fas fa-circle blink-icon"></i><span class="countstatus">${matchMinutes}</span>`;
                      matchsList.value[matchId].matchMinutes = statusText;
                    } else if (status === 4) {
                      matchMinutes = Math.floor((currentTimestamp - timestampKickOff) / 60 + 45 + 1);
                      statusText = `<i class="fas fa-circle blink-icon"></i><span class="countstatus">${matchMinutes}</span>`;
                      matchsList.value[matchId].matchMinutes = statusText;
                    } else {
                      matchsList.value[matchId].matchMinutes = statusText;
                    }
                    matchsList.value[matchId].since_timestamp_kick_off = matchMinutes;
                    if (((_a22 = matchOriginsList.value[matchId].status) == null ? void 0 : _a22.toString()) != status.toString()) {
                      matchOriginsList.value[matchId].status = status.toString();
                      matchOriginsList.value[matchId].matchMinutes = statusText;
                      matchsList.value[matchId].status = status.toString();
                      reduceMatchList = true;
                    }
                  }
                }
              }
              if (reduceMatchList === true) {
                renderDataList();
              }
            } else if (wssItem.payload.iodds) {
              const matchOdds = wssItem.payload.iodds;
              const oddsList2 = [];
              if (matchOdds == null ? void 0 : matchOdds.handicap) {
                for (const matchOdd of matchOdds.handicap) {
                  const matchId = parseIntO(getValueByPosition(matchOdd, 0));
                  const companyId = getValueByPosition(matchOdd, 1);
                  if (companyId == (company == null ? void 0 : company.isportsapi)) {
                    if (!oddsList2[matchId]) {
                      oddsList2[matchId] = [];
                    }
                    oddsList2[matchId][0] = getValueByPosition(matchOdd, 2) + "," + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4);
                    if (showWinScoreOdds.value && ((_b22 = matchHover.value) == null ? void 0 : _b22.i_match_id) == matchId) {
                      let odddetail = (_c22 = oddsDetail.value) == null ? void 0 : _c22.find((item) => item.i_company_id == companyId && item.i_match_id == matchId && item.type == "handicap");
                      if (odddetail) {
                        odddetail.instant_older = JSON.parse(JSON.stringify(odddetail.instant));
                        odddetail.instant = "[" + getValueByPosition(matchOdd, 2) + "," + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4) + "]";
                      }
                    }
                  }
                }
              }
              if (matchOdds == null ? void 0 : matchOdds.overUnder) {
                for (const matchOdd of matchOdds.overUnder) {
                  const matchId = parseIntO(getValueByPosition(matchOdd, 0));
                  const companyId = getValueByPosition(matchOdd, 1);
                  if (companyId == (company == null ? void 0 : company.isportsapi)) {
                    if (!oddsList2[matchId]) {
                      oddsList2[matchId] = [];
                    }
                    oddsList2[matchId][1] = getValueByPosition(matchOdd, 2) + "," + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4);
                    let odddetail = (_d2 = oddsDetail.value) == null ? void 0 : _d2.find((item) => item.i_company_id == companyId && item.i_match_id == matchId && item.type == "overUnder");
                    if (odddetail) {
                      odddetail.instant_older = JSON.parse(JSON.stringify(odddetail.instant));
                      odddetail.instant = "[" + getValueByPosition(matchOdd, 2) + "," + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4) + "]";
                    }
                  }
                }
              }
              if (matchOdds == null ? void 0 : matchOdds.europeOdds) {
                for (const matchOdd of matchOdds.europeOdds) {
                  const matchId = parseIntO(getValueByPosition(matchOdd, 0));
                  const companyId = getValueByPosition(matchOdd, 1);
                  if (companyId == (company == null ? void 0 : company.isportsapi)) {
                    if (!oddsList2[matchId]) {
                      oddsList2[matchId] = [];
                    }
                    oddsList2[matchId][2] = getValueByPosition(matchOdd, 2) + "," + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4);
                    let odddetail = (_e2 = oddsDetail.value) == null ? void 0 : _e2.find((item) => item.i_company_id == companyId && item.i_match_id == matchId && item.type == "europeOdds");
                    if (odddetail) {
                      odddetail.instant_older = JSON.parse(JSON.stringify(odddetail.instant));
                      odddetail.instant = "[" + getValueByPosition(matchOdd, 2) + "," + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4) + "]";
                    }
                  }
                }
              }
              oddsIMainWS.value = oddsList2;
            } else if (wssItem.topic == "thesports/football/match/v1") {
              const payloads = wssItem.payload;
              let reduceMatchList = false;
              const favouritesData = useCookie("favouritesData");
              for (const payload of payloads) {
                const matchId = payload == null ? void 0 : payload.id;
                if (payload == null ? void 0 : payload.score) {
                  if (matchsList.value[matchId]) {
                    if (((_f2 = matchOriginsList.value[matchId].status) == null ? void 0 : _f2.toString()) != ((_h2 = (_g2 = payload == null ? void 0 : payload.score) == null ? void 0 : _g2[1]) == null ? void 0 : _h2.toString())) {
                      matchOriginsList.value[matchId].status = (_j2 = (_i2 = payload == null ? void 0 : payload.score) == null ? void 0 : _i2[1]) == null ? void 0 : _j2.toString();
                      matchsList.value[matchId].status = (_l2 = (_k2 = payload == null ? void 0 : payload.score) == null ? void 0 : _k2[1]) == null ? void 0 : _l2.toString();
                      reduceMatchList = true;
                    }
                    matchsList.value[matchId].home_scores = (_m = payload == null ? void 0 : payload.score) == null ? void 0 : _m[2];
                    matchsList.value[matchId].away_scores = (_n = payload == null ? void 0 : payload.score) == null ? void 0 : _n[3];
                  }
                } else if (payload == null ? void 0 : payload.incidents) {
                  if (matchsList.value[matchId]) {
                    for (const incident of payload == null ? void 0 : payload.incidents) {
                      let matchMinutes = 0;
                      const status = (_p = (_o = matchsList.value[matchId]) == null ? void 0 : _o.status) == null ? void 0 : _p.toString();
                      if ((_q = matchsList.value[matchId]) == null ? void 0 : _q.since_timestamp_kick_off) {
                        matchMinutes = matchsList.value[matchId].since_timestamp_kick_off;
                      } else {
                        const timestampKickOff = moment((_r = matchsList.value[matchId]) == null ? void 0 : _r.match_time).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).unix();
                        const currentTimestamp = Math.floor(Date.now() / 1e3);
                        if (status == "2") {
                          matchMinutes = Math.floor((currentTimestamp - timestampKickOff) / 60 + 1);
                        } else if (status == "4" || status == "5") {
                          matchMinutes = Math.floor((currentTimestamp - timestampKickOff) / 60 + 45 + 1);
                        }
                      }
                      if (Math.abs(matchMinutes - (incident == null ? void 0 : incident.time)) <= 2) {
                        switch (incident == null ? void 0 : incident.type) {
                          case 1: {
                            let isMatch = false;
                            if (settingType.value === 1) {
                              if ((_s = favouritesData == null ? void 0 : favouritesData.value) == null ? void 0 : _s.includes(matchId)) {
                                isMatch = true;
                              }
                            } else {
                              isMatch = true;
                            }
                            if (isMatch) {
                              if (isShowGoalWindow.value) {
                                isScoreGoal.value = matchId;
                                isScoreGoalMatchId.value = matchId;
                                scoreChangeType.value = "/icon/goal.png";
                                matchOriginsList.value[matchId].matchMinutesEvent = incident == null ? void 0 : incident.time;
                                matchOriginsList.value[matchId].home_team.playerName = "";
                                matchOriginsList.value[matchId].away_team.playerName = "";
                                if ((incident == null ? void 0 : incident.position) == 1) {
                                  matchsList.value[matchId].home_scores[0] = (_a3 = incident == null ? void 0 : incident.home_score) != null ? _a3 : matchsList.value[matchId].home_scores[0];
                                  matchOriginsList.value[matchId].home_scores[0] = (_b3 = incident == null ? void 0 : incident.home_score) != null ? _b3 : matchsList.value[matchId].home_scores[0];
                                  matchOriginsList.value[matchId].home_team.playerName = incident == null ? void 0 : incident.player_name;
                                } else if ((incident == null ? void 0 : incident.position) == 2) {
                                  matchsList.value[matchId].away_scores[0] = (_c3 = incident == null ? void 0 : incident.away_score) != null ? _c3 : matchsList.value[matchId].away_scores[0];
                                  matchOriginsList.value[matchId].away_scores[0] = (_d3 = incident == null ? void 0 : incident.away_score) != null ? _d3 : matchsList.value[matchId].away_scores[0];
                                  matchOriginsList.value[matchId].away_team.playerName = incident == null ? void 0 : incident.player_name;
                                }
                              }
                              if ((incident == null ? void 0 : incident.position) == 1) {
                                if (soundHome.value === 0) {
                                  soundGoal0.play();
                                } else if (soundHome.value === 1) {
                                  soundGoal1.play();
                                } else if (soundHome.value === 2) {
                                  soundGoal2.play();
                                } else if (soundHome.value === 3) {
                                  soundGoal3.play();
                                }
                              } else if ((incident == null ? void 0 : incident.position) == 2) {
                                if (soundAway.value === 0) {
                                  soundGoal0.play();
                                } else if (soundAway.value === 1) {
                                  soundGoal1.play();
                                } else if (soundAway.value === 2) {
                                  soundGoal2.play();
                                } else if (soundAway.value === 3) {
                                  soundGoal3.play();
                                }
                              }
                            }
                            break;
                          }
                          case 4: {
                            if (isShowRedWindow.value) {
                              let isMatchShowRedWindow = false;
                              if (settingType.value === 1) {
                                if ((_t = favouritesData == null ? void 0 : favouritesData.value) == null ? void 0 : _t.includes(matchId)) {
                                  isMatchShowRedWindow = true;
                                }
                              } else {
                                isMatchShowRedWindow = true;
                              }
                              if (isMatchShowRedWindow) {
                                isScoreGoal.value = matchId;
                                isScoreGoalMatchId.value = matchId;
                                scoreChangeType.value = "/img/incident/4.png";
                                matchOriginsList.value[matchId].matchMinutesEvent = incident == null ? void 0 : incident.time;
                                matchOriginsList.value[matchId].home_team.playerName = "";
                                matchOriginsList.value[matchId].away_team.playerName = "";
                                if ((incident == null ? void 0 : incident.position) == 1) {
                                  matchOriginsList.value[matchId].home_team.playerName = (incident == null ? void 0 : incident.player_name) || "";
                                } else if ((incident == null ? void 0 : incident.position) == 2) {
                                  matchOriginsList.value[matchId].away_team.playerName = (incident == null ? void 0 : incident.player_name) || "";
                                }
                              }
                            }
                            break;
                          }
                        }
                      }
                    }
                  }
                }
              }
              if (reduceMatchList === true) {
                renderDataList();
              }
            }
          } catch (e) {
            return false;
          }
        }
      } catch (e) {
        return false;
      }
    };
    watch(
      isGroupByCountry,
      (isGroupByCountry2) => {
      }
    );
    watch(
      activeTab,
      (activeTab2) => {
        var _a22;
        matchActiveLiveFlash.value = null;
        toggleCompetition.value = [];
        if (activeTab2 === LIVESCORE_ACTIVE_TAB.HOT) {
          compsList.value = (_a22 = compOriginsList.value) == null ? void 0 : _a22.filter((item) => (item == null ? void 0 : item.number_hot) === 5 || (item == null ? void 0 : item.number_hot) === 4 || (item == null ? void 0 : item.number_hot) === 3);
          const matchsGroup = groupBy(compsList.value, (x) => x.id);
          const compKeysList2 = [...matchsGroup.keys()];
          matchsList.value = Object.values(matchOriginsList.value).filter((item) => compKeysList2.includes(item == null ? void 0 : item.competition));
        } else if (activeTab2 === LIVESCORE_ACTIVE_TAB.ALL) {
          compsList.value = compOriginsList.value;
          matchsList.value = matchOriginsList.value;
        } else if (activeTab2 === LIVESCORE_ACTIVE_TAB.LEAGUE)
          ;
      }
    );
    watch(
      oddCompanySelected,
      async (oddCompany) => {
        const company = ODD_COMPANYS.find(({ id }) => id === oddCompanySelected.value);
        oddCompanyIsport.value = company == null ? void 0 : company.thesports;
        const settingsData2 = useCookie("settingsData");
        if (settingsData2 == null ? void 0 : settingsData2.value) {
          settingsData2.value.oddCompanySelected = oddCompanySelected.value;
          useCookie("settingsData").value = JSON.stringify(settingsData2.value);
        } else {
          useCookie("settingsData").value = JSON.stringify({
            oddCompanySelected: oddCompanySelected.value
          });
        }
        await fetchOddsIMain(dateChoose.value);
      }
    );
    watch(
      qSearch,
      async (nSearch) => {
        var _a22, _b22, _c22;
        let matchsListArray = [];
        if (qSearch.value !== "") {
          let compsKeyDataList = [];
          const search = nSearch.toUpperCase();
          if (typeof nSearch !== "undefined") {
            compsDataListSearch.value = (_a22 = compsDataList.value) == null ? void 0 : _a22.filter((item) => {
              var _a3, _b3;
              return (_b3 = (_a3 = item == null ? void 0 : item.name) == null ? void 0 : _a3.toUpperCase()) == null ? void 0 : _b3.includes(search);
            });
            compsKeyDataList = (_b22 = compsDataListSearch.value) == null ? void 0 : _b22.map((item) => item.id);
            compSearchLength.value = (_c22 = compsDataListSearch.value) == null ? void 0 : _c22.length;
          }
          Object.keys(matchOriginsList.value).map((index) => {
            var _a3, _b3, _c3, _d2, _e2, _f2, _g2, _h2, _i2;
            if (typeof nSearch !== "undefined") {
              if (((_d2 = (_c3 = (_b3 = (_a3 = matchOriginsList.value[index]) == null ? void 0 : _a3.home_team) == null ? void 0 : _b3.name) == null ? void 0 : _c3.toUpperCase()) == null ? void 0 : _d2.includes(search)) || ((_h2 = (_g2 = (_f2 = (_e2 = matchOriginsList.value[index]) == null ? void 0 : _e2.away_team) == null ? void 0 : _f2.name) == null ? void 0 : _g2.toUpperCase()) == null ? void 0 : _h2.includes(search)) || compsKeyDataList.includes((_i2 = matchOriginsList.value[index]) == null ? void 0 : _i2.competition)) {
                matchsListArray.push(matchOriginsList.value[index]);
              }
            }
          });
          matchSearchLength.value = matchsListArray == null ? void 0 : matchsListArray.length;
          let matchsGroup = sortByTime(matchsListArray, false);
          matchsGroup = groupByTimeAndComp(matchsGroup);
          matchSearchList.value = matchsGroup;
          if (searchTab.value === 3) {
            isLoadingSearch.value = true;
            await useApiLiveScore(API_ROUTERS.LIVESCORE.TEAMS + "?name=" + qSearch.value).then((resData) => {
              if (resData) {
                teamsSearch.value = resData == null ? void 0 : resData.results;
              }
              isLoadingSearch.value = false;
            });
          }
        } else {
          matchSearchList.value = [];
          matchSearchLength.value = 0;
          compSearchLength.value = 0;
        }
      },
      { deep: true }
    );
    watch(
      searchTab,
      async (nSearchTab) => {
        if (qSearch.value !== "") {
          isLoadingSearch.value = true;
          await useApiLiveScore(API_ROUTERS.LIVESCORE.TEAMS + "?name=" + qSearch.value).then((resData) => {
            if (resData) {
              teamsSearch.value = resData == null ? void 0 : resData.results;
            }
            isLoadingSearch.value = false;
          });
        } else {
          teamsSearch.value = [];
        }
      },
      { deep: true }
    );
    watch(
      dateChoose,
      () => {
        isLoadingData.value = true;
        router.replace("?date=" + dateChoose.value);
        fetchMatchsLive(dateChoose.value);
        fetchMatchsRecent(dateChoose.value);
        fetchOddsIMain(dateChoose.value);
      }
    );
    watch(
      oddsIMainWS,
      () => {
        Object.keys(matchsList.value).map((index) => {
          var _a22, _b22, _c22, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
          matchsList.value[index].odds_older = JSON.parse(JSON.stringify(matchsList.value[index].odds));
          if ((_d2 = (_c22 = oddsIMainWS.value) == null ? void 0 : _c22[(_b22 = (_a22 = matchsList.value) == null ? void 0 : _a22[index]) == null ? void 0 : _b22.i_match_id]) == null ? void 0 : _d2[0]) {
            matchsList.value[index].odds[0] = (_h2 = (_g2 = oddsIMainWS.value) == null ? void 0 : _g2[(_f2 = (_e2 = matchsList.value) == null ? void 0 : _e2[index]) == null ? void 0 : _f2.i_match_id]) == null ? void 0 : _h2[0];
          }
          if ((_l2 = (_k2 = oddsIMainWS.value) == null ? void 0 : _k2[(_j2 = (_i2 = matchsList.value) == null ? void 0 : _i2[index]) == null ? void 0 : _j2.i_match_id]) == null ? void 0 : _l2[1]) {
            matchsList.value[index].odds[1] = (_p = (_o = oddsIMainWS.value) == null ? void 0 : _o[(_n = (_m = matchsList.value) == null ? void 0 : _m[index]) == null ? void 0 : _n.i_match_id]) == null ? void 0 : _p[1];
          }
          if ((_t = (_s = oddsIMainWS.value) == null ? void 0 : _s[(_r = (_q = matchsList.value) == null ? void 0 : _q[index]) == null ? void 0 : _r.i_match_id]) == null ? void 0 : _t[2]) {
            matchsList.value[index].odds[2] = (_x = (_w = oddsIMainWS.value) == null ? void 0 : _w[(_v = (_u = matchsList.value) == null ? void 0 : _u[index]) == null ? void 0 : _v.i_match_id]) == null ? void 0 : _x[2];
          }
        });
      },
      { immediate: true }
    );
    watch(
      () => {
        var _a22;
        return (_a22 = router == null ? void 0 : router.currentRoute.value) == null ? void 0 : _a22.query;
      },
      () => {
        var _a22, _b22;
        const tabName = (_b22 = (_a22 = router == null ? void 0 : router.currentRoute.value) == null ? void 0 : _a22.query) == null ? void 0 : _b22.livescore_tab;
        if (tabName === LIVESCORE_ACTIVE_TAB.HOT) {
          activeTab.value = LIVESCORE_ACTIVE_TAB.HOT;
        } else if (tabName === LIVESCORE_ACTIVE_TAB.LEAGUE) {
          activeTab.value = LIVESCORE_ACTIVE_TAB.LEAGUE;
          isFilterBoxLeague.value = true;
        } else {
          activeTab.value = LIVESCORE_ACTIVE_TAB.ALL;
        }
      },
      { deep: true, immediate: true }
    );
    watch(
      useAction,
      () => {
        if (useAction == null ? void 0 : useAction.isOpenFilterLeague) {
          activeTab.value = LIVESCORE_ACTIVE_TAB.LEAGUE;
          isFilterBoxLeague.value = true;
        }
      },
      { deep: true, immediate: true }
    );
    watch(
      matchStore,
      () => {
        wssMatch(matchStore == null ? void 0 : matchStore.socketData);
      },
      { deep: true, immediate: true }
    );
    const renderDataList = () => {
      var _a22, _b22, _c22, _d2, _e2, _f2, _g2;
      try {
        if ((props == null ? void 0 : props.favorites) === FAVORITES_TYPE.TEAMS) {
          orderByTime.value = true;
          renderTeamsDataList();
          return;
        }
        compChooseLeagueList.value = compOriginsList.value;
        compsListByKey.value = groupBy(compsDataList.value, (x) => x.id);
        if (!orderByTime.value) {
          const matchsListArray = [];
          if ((props == null ? void 0 : props.favorites) === FAVORITES_TYPE.MATCHES) {
            const favouritesData = useCookie("favouritesData");
            Object.keys(matchsList.value).map((index) => {
              var _a3, _b3;
              if ((_b3 = favouritesData == null ? void 0 : favouritesData.value) == null ? void 0 : _b3.includes((_a3 = matchsList.value[index]) == null ? void 0 : _a3.id)) {
                matchsListArray.push(matchsList.value[index]);
              }
            });
            const matchsGroup = groupBy(matchsListArray, (x) => x.competition);
            const matchsGroupKey = [...matchsGroup.keys()];
            compsList.value = (_a22 = compOriginsList.value) == null ? void 0 : _a22.filter((item) => {
              var _a3;
              if (matchsGroupKey == null ? void 0 : matchsGroupKey.includes(item == null ? void 0 : item.id)) {
                item.matchs = (_a3 = item == null ? void 0 : item.matchs) == null ? void 0 : _a3.filter((match) => {
                  var _a4;
                  return (_a4 = favouritesData == null ? void 0 : favouritesData.value) == null ? void 0 : _a4.includes(match.id);
                });
                return item;
              }
            });
            compsList.value = compsList.value.sort((a, b) => {
              var _a3, _b3;
              return b.number_hot === a.number_hot ? ((_a3 = b.matchs) == null ? void 0 : _a3[0].order_no) - ((_b3 = a.matchs) == null ? void 0 : _b3[0].order_no) : b.number_hot - a.number_hot;
            });
          } else if ((props == null ? void 0 : props.favorites) === FAVORITES_TYPE.LEAGUES) {
            const favouritesLeagues2 = useCookie("favouritesLeagues");
            compsList.value = (_b22 = compOriginsList.value) == null ? void 0 : _b22.filter((item) => {
              var _a3;
              return (_a3 = favouritesLeagues2 == null ? void 0 : favouritesLeagues2.value) == null ? void 0 : _a3.includes(item == null ? void 0 : item.id);
            }).sort((a, b) => {
              var _a3, _b3;
              return b.number_hot === a.number_hot ? ((_a3 = b.matchs) == null ? void 0 : _a3[0].order_no) - ((_b3 = a.matchs) == null ? void 0 : _b3[0].order_no) : b.number_hot - a.number_hot;
            });
          } else if ((props == null ? void 0 : props.favorites) === FAVORITES_TYPE.TEAMS) {
            const favouritesTeams2 = useCookie("favouritesTeams");
            Object.keys(matchsList.value).map((index) => {
              var _a3, _b3, _c3, _d3, _e3, _f3;
              if (((_c3 = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _c3.includes((_b3 = (_a3 = matchsList.value[index]) == null ? void 0 : _a3.home_team) == null ? void 0 : _b3.id)) || ((_f3 = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _f3.includes((_e3 = (_d3 = matchsList.value[index]) == null ? void 0 : _d3.away_team) == null ? void 0 : _e3.id))) {
                matchsListArray.push(matchsList.value[index]);
              }
            });
            const matchsGroup = groupBy(matchsListArray, (x) => x.competition);
            const matchsGroupKey = [...matchsGroup.keys()];
            compsList.value = (_c22 = compOriginsList.value) == null ? void 0 : _c22.filter((item) => {
              var _a3;
              if (matchsGroupKey == null ? void 0 : matchsGroupKey.includes(item == null ? void 0 : item.id)) {
                item.matchs = (_a3 = item == null ? void 0 : item.matchs) == null ? void 0 : _a3.filter((match) => {
                  var _a4, _b3, _c3, _d3;
                  return ((_b3 = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _b3.includes((_a4 = match == null ? void 0 : match.home_team) == null ? void 0 : _a4.id)) || ((_d3 = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _d3.includes((_c3 = match == null ? void 0 : match.away_team) == null ? void 0 : _c3.id));
                });
                return item;
              }
            });
          } else {
            if (activeTab.value === LIVESCORE_ACTIVE_TAB.LEAGUE) {
              Object.keys(matchsList.value).map((index) => {
                matchsListArray.push(matchsList.value[index]);
              });
              const matchsGroup = groupBy(matchsListArray, (x) => x.competition);
              const matchsGroupKey = [...matchsGroup.keys()];
              compsList.value = (_d2 = compOriginsList.value) == null ? void 0 : _d2.filter((item) => {
                return matchsGroupKey == null ? void 0 : matchsGroupKey.includes(item == null ? void 0 : item.id);
              });
            } else if (activeTab.value === LIVESCORE_ACTIVE_TAB.HOT) {
              compsList.value = (_e2 = compOriginsList.value) == null ? void 0 : _e2.filter((item) => (item == null ? void 0 : item.number_hot) === 5 || (item == null ? void 0 : item.number_hot) === 4);
            } else {
              compsList.value = compOriginsList.value.sort((a, b) => {
                var _a3, _b3;
                return b.number_hot === a.number_hot ? ((_a3 = b.matchs) == null ? void 0 : _a3[0].order_no) - ((_b3 = a.matchs) == null ? void 0 : _b3[0].order_no) : b.number_hot - a.number_hot;
              });
              if (router.currentRoute._value.path !== ROUTERS.FOOTBALL_SCHEDULE) {
                let matchLive = [];
                matchLive = compsList.value.map((item) => ({
                  ...item,
                  matchs: item.matchs.filter((match) => LIVESCORE_STATUS.IS_LIVE.includes(match.status))
                })).filter((item) => item.matchs.length > 0);
                compsList.value = [...matchLive, ...compsList.value].reduce((accumulator, current) => {
                  if (!accumulator.some((item) => item.id === current.id)) {
                    accumulator.push(current);
                  }
                  return accumulator;
                }, []);
              }
            }
          }
        } else {
          let matchsListArray = [];
          if ((props == null ? void 0 : props.favorites) === FAVORITES_TYPE.MATCHES) {
            const favouritesData = useCookie("favouritesData");
            matchsListArray = [];
            Object.keys(matchsList.value).map((index) => {
              var _a3, _b3;
              if ((_b3 = favouritesData == null ? void 0 : favouritesData.value) == null ? void 0 : _b3.includes((_a3 = matchsList.value[index]) == null ? void 0 : _a3.id)) {
                matchsListArray.push(matchsList.value[index]);
              }
            });
          } else if ((props == null ? void 0 : props.favorites) === FAVORITES_TYPE.LEAGUES) {
            const favouritesLeagues2 = useCookie("favouritesLeagues");
            const compsList2 = (_f2 = compOriginsList.value) == null ? void 0 : _f2.filter((item) => {
              var _a3;
              return (_a3 = favouritesLeagues2 == null ? void 0 : favouritesLeagues2.value) == null ? void 0 : _a3.includes(item == null ? void 0 : item.id);
            });
            const matchsGroup2 = groupBy(compsList2, (x) => x.id);
            const compKeysList2 = [...matchsGroup2.keys()];
            matchsListArray = Object.values(matchOriginsList.value).filter((item) => compKeysList2.includes(item == null ? void 0 : item.competition));
          } else if ((props == null ? void 0 : props.favorites) === FAVORITES_TYPE.TEAMS) {
            const favouritesTeams2 = useCookie("favouritesTeams");
            matchsListArray = [];
            Object.keys(matchsList.value).map((index) => {
              var _a3, _b3, _c3, _d3, _e3, _f3;
              if (((_c3 = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _c3.includes((_b3 = (_a3 = matchsList.value[index]) == null ? void 0 : _a3.home_team) == null ? void 0 : _b3.id)) || ((_f3 = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _f3.includes((_e3 = (_d3 = matchsList.value[index]) == null ? void 0 : _d3.away_team) == null ? void 0 : _e3.id))) {
                matchsListArray.push(matchsList.value[index]);
              }
            });
          } else {
            if (activeTab.value === LIVESCORE_ACTIVE_TAB.LEAGUE) {
              matchsListArray = [];
              Object.keys(matchsList.value).map((index) => {
                matchsListArray.push(matchsList.value[index]);
              });
            } else if (activeTab.value === LIVESCORE_ACTIVE_TAB.HOT) {
              const compsList2 = (_g2 = compOriginsList.value) == null ? void 0 : _g2.filter((item) => (item == null ? void 0 : item.number_hot) === 5 || (item == null ? void 0 : item.number_hot) === 4);
              const matchsGroupHot = groupBy(compsList2, (x) => x.id);
              const compKeysListHot = [...matchsGroupHot.keys()];
              const dataList = [];
              matchsListArray = Object.values(matchOriginsList.value).filter((item) => compKeysListHot.includes(item == null ? void 0 : item.competition));
            } else {
              Object.keys(matchOriginsList.value).map((index) => {
                matchsListArray.push(matchOriginsList.value[index]);
              });
            }
          }
          matchsListLength.value = matchsListArray == null ? void 0 : matchsListArray.length;
          let matchsGroup = sortByTime(matchsListArray, false);
          if ((props == null ? void 0 : props.page) === LIVESCORE_PAGE.LIVESCORE) {
            const matchsGroupIsLive = matchsGroup.filter((item) => LIVESCORE_STATUS.IS_LIVE.includes(item.status));
            const matchsGroupNotStarted = matchsGroup.filter((item) => LIVESCORE_STATUS.NOT_START.includes(item.status));
            const matchsGroupNotLive = matchsGroup.filter((item) => LIVESCORE_STATUS.NOT_LIVE.includes(item.status));
            const matchsGroupEnd = matchsGroup.filter((item) => LIVESCORE_STATUS.IS_END.includes(item.status));
            const data = [...sortByTime(matchsGroupIsLive, false), ...sortByTime([...matchsGroupNotStarted, ...matchsGroupEnd], false)].concat(matchsGroupNotLive);
            matchsGroup = groupByTimeAndComp(data);
          } else {
            matchsGroup = groupByTimeAndComp(matchsGroup);
          }
          matchsGroupList.value = matchsGroup;
          compKeysList.value = [...matchsGroup.keys()];
          renderTopList.value = matchsGroup;
        }
        isLoadingData.value = false;
      } catch (e) {
        isLoadingData.value = false;
      }
      nextTick(() => {
        showContentPage.value = true;
      });
    };
    const renderTeamsDataList = () => {
      var _a22;
      compChooseLeagueList.value = compOriginsList.value;
      compsListByKey.value = groupBy(compsDataList.value, (x) => x.id);
      let matchsListArray = [];
      if (!orderByTime.value) {
        const favouritesTeams2 = useCookie("favouritesTeams");
        Object.keys(matchsList.value).map((index) => {
          var _a3, _b22, _c22, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
          if (((_c22 = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _c22.includes((_b22 = (_a3 = matchsList.value[index]) == null ? void 0 : _a3.home_team) == null ? void 0 : _b22.id)) || ((_f2 = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _f2.includes((_e2 = (_d2 = matchsList.value[index]) == null ? void 0 : _d2.away_team) == null ? void 0 : _e2.id))) {
            if (!matchsList.value[index].favouriteTeams) {
              matchsList.value[index].favouriteTeams = [];
            }
            if (((_i2 = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _i2.includes((_h2 = (_g2 = matchsList.value[index]) == null ? void 0 : _g2.home_team) == null ? void 0 : _h2.id)) && !((_j2 = matchsList.value[index].favouriteTeams) == null ? void 0 : _j2.find((item) => {
              var _a4, _b3;
              return (item == null ? void 0 : item.id) === ((_b3 = (_a4 = matchsList.value[index]) == null ? void 0 : _a4.home_team) == null ? void 0 : _b3.id);
            }))) {
              matchsList.value[index].favouriteTeams.push({ id: (_l2 = (_k2 = matchsList.value[index]) == null ? void 0 : _k2.home_team) == null ? void 0 : _l2.id, name: (_n = (_m = matchsList.value[index]) == null ? void 0 : _m.home_team) == null ? void 0 : _n.name });
            }
            if (((_q = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _q.includes((_p = (_o = matchsList.value[index]) == null ? void 0 : _o.away_team) == null ? void 0 : _p.id)) && !((_r = matchsList.value[index].favouriteTeams) == null ? void 0 : _r.find((item) => {
              var _a4, _b3;
              return (item == null ? void 0 : item.id) === ((_b3 = (_a4 = matchsList.value[index]) == null ? void 0 : _a4.away_team) == null ? void 0 : _b3.id);
            }))) {
              matchsList.value[index].favouriteTeams.push({ id: (_t = (_s = matchsList.value[index]) == null ? void 0 : _s.away_team) == null ? void 0 : _t.id, name: (_v = (_u = matchsList.value[index]) == null ? void 0 : _u.away_team) == null ? void 0 : _v.name });
            }
            matchsListArray.push(matchsList.value[index]);
          }
        });
        const matchsGroup = groupBy(matchsListArray, (x) => x.competition);
        const matchsGroupKey = [...matchsGroup.keys()];
        compsList.value = (_a22 = compOriginsList.value) == null ? void 0 : _a22.filter((item) => {
          var _a3;
          if (matchsGroupKey == null ? void 0 : matchsGroupKey.includes(item == null ? void 0 : item.id)) {
            item.matchs = (_a3 = item == null ? void 0 : item.matchs) == null ? void 0 : _a3.filter((match) => {
              var _a4, _b22, _c22, _d2;
              return ((_b22 = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _b22.includes((_a4 = match == null ? void 0 : match.home_team) == null ? void 0 : _a4.id)) || ((_d2 = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _d2.includes((_c22 = match == null ? void 0 : match.away_team) == null ? void 0 : _c22.id));
            });
            return item;
          }
        });
      } else {
        const favouritesTeams2 = useCookie("favouritesTeams");
        Object.keys(matchsList.value).map((index) => {
          var _a3, _b22, _c22, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
          if (((_c22 = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _c22.includes((_b22 = (_a3 = matchsList.value[index]) == null ? void 0 : _a3.home_team) == null ? void 0 : _b22.id)) || ((_f2 = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _f2.includes((_e2 = (_d2 = matchsList.value[index]) == null ? void 0 : _d2.away_team) == null ? void 0 : _e2.id))) {
            if (!matchsList.value[index].favouriteTeams) {
              matchsList.value[index].favouriteTeams = [];
            }
            if (((_i2 = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _i2.includes((_h2 = (_g2 = matchsList.value[index]) == null ? void 0 : _g2.home_team) == null ? void 0 : _h2.id)) && !((_j2 = matchsList.value[index].favouriteTeams) == null ? void 0 : _j2.find((item) => {
              var _a4, _b3;
              return (item == null ? void 0 : item.id) === ((_b3 = (_a4 = matchsList.value[index]) == null ? void 0 : _a4.home_team) == null ? void 0 : _b3.id);
            }))) {
              matchsList.value[index].favouriteTeams.push({ id: (_l2 = (_k2 = matchsList.value[index]) == null ? void 0 : _k2.home_team) == null ? void 0 : _l2.id, name: (_n = (_m = matchsList.value[index]) == null ? void 0 : _m.home_team) == null ? void 0 : _n.name });
            }
            if (((_q = favouritesTeams2 == null ? void 0 : favouritesTeams2.value) == null ? void 0 : _q.includes((_p = (_o = matchsList.value[index]) == null ? void 0 : _o.away_team) == null ? void 0 : _p.id)) && !((_r = matchsList.value[index].favouriteTeams) == null ? void 0 : _r.find((item) => {
              var _a4, _b3;
              return (item == null ? void 0 : item.id) === ((_b3 = (_a4 = matchsList.value[index]) == null ? void 0 : _a4.away_team) == null ? void 0 : _b3.id);
            }))) {
              matchsList.value[index].favouriteTeams.push({ id: (_t = (_s = matchsList.value[index]) == null ? void 0 : _s.away_team) == null ? void 0 : _t.id, name: (_v = (_u = matchsList.value[index]) == null ? void 0 : _u.away_team) == null ? void 0 : _v.name });
            }
            matchsListArray.push(matchsList.value[index]);
          }
        });
        matchsListLength.value = matchsListArray == null ? void 0 : matchsListArray.length;
        let matchsGroup = sortByTime(matchsListArray, false);
        matchsGroup = groupByTimeAndComp(matchsGroup);
        matchsGroupList.value = matchsGroup;
        compKeysList.value = [...matchsGroup.keys()];
        renderTopList.value = matchsGroup;
      }
      isLoadingData.value = false;
    };
    watch(
      [matchsList, orderByTime, timeZone],
      ([nMatchsList, nOrderByTime], [oMatchsList, oOrderByTime]) => {
        renderDataList();
      },
      { deep: true }
    );
    watch(
      () => useCookie("settingsData"),
      () => {
        setValueByCookie();
      },
      { deep: true }
    );
    watch(
      [isShowOddsHDP, isShowOddsTX, isShowOdds1X2, isShowCardYellow, isShowCardRed, isShowRanking, settingType, isShowGoalWindow, isShowRedWindow, soundHome, soundAway, timeZone],
      () => {
        const settingsData2 = useCookie("settingsData");
        if ((props == null ? void 0 : props.page) !== LIVESCORE_PAGE.SCHEDULE) {
          if (settingsData2 == null ? void 0 : settingsData2.value) {
            settingsData2.value.isShowOddsHDP = isShowOddsHDP.value;
            settingsData2.value.isShowOddsTX = isShowOddsTX.value;
            settingsData2.value.isShowOdds1X2 = isShowOdds1X2.value;
            settingsData2.value.isShowCardYellow = isShowCardYellow.value;
            settingsData2.value.isShowCardRed = isShowCardRed.value;
            settingsData2.value.isShowRanking = isShowRanking.value;
            settingsData2.value.settingType = settingType.value;
            settingsData2.value.isShowGoalWindow = isShowGoalWindow.value;
            settingsData2.value.isShowRedWindow = isShowRedWindow.value;
            settingsData2.value.soundHome = soundHome.value;
            settingsData2.value.soundAway = soundAway.value;
            settingsData2.value.timeZone = timeZone.value;
            useCookie("settingsData").value = JSON.stringify(settingsData2.value);
          } else {
            useCookie("settingsData").value = JSON.stringify({
              isShowOddsHDP: isShowOddsHDP.value,
              isShowOddsTX: isShowOddsTX.value,
              isShowOdds1X2: isShowOdds1X2.value,
              isShowCardYellow: isShowCardYellow.value,
              isShowCardRed: isShowCardRed.value,
              isShowRanking: isShowRanking.value,
              settingType: settingType.value,
              isShowGoalWindow: isShowGoalWindow.value,
              isShowRedWindow: isShowRedWindow.value,
              soundHome: soundHome.value,
              soundAway: soundAway.value,
              timeZone: timeZone.value
            });
          }
        }
      }
    );
    watch(
      () => useCookie("favouritesData"),
      () => {
        renderDataList();
      },
      { deep: true }
    );
    watch(
      () => useCookie("favouritesLeagues"),
      () => {
        renderDataList();
      },
      { deep: true }
    );
    watch(
      () => useCookie("favouritesTeams"),
      () => {
        renderDataList();
      },
      { deep: true }
    );
    watch(
      isScoreGoal,
      () => {
        if (isScoreGoal.value) {
          clearTimeout(timeoutID.value);
          timeoutID.value = setTimeout(() => {
            isScoreGoal.value = false;
            isScoreGoalMatchId.value = null;
          }, 3e4);
        }
      }
    );
    const setValueByCookie = () => {
      var _a22, _b22, _c22, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
      const settingsData2 = useCookie("settingsData");
      if (settingsData2 == null ? void 0 : settingsData2.value) {
        if (typeof ((_a22 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _a22.isShowCardYellow) !== "undefined") {
          isShowCardYellow.value = (_b22 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _b22.isShowCardYellow;
        }
        if (typeof ((_c22 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _c22.isShowCardRed) !== "undefined") {
          isShowCardRed.value = (_d2 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _d2.isShowCardRed;
        }
        if (typeof ((_e2 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _e2.isShowRanking) !== "undefined") {
          isShowRanking.value = (_f2 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _f2.isShowRanking;
        }
        if (typeof ((_g2 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _g2.orderByTime) !== "undefined") {
          orderByTime.value = (_h2 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _h2.orderByTime;
        }
        if (typeof ((_i2 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _i2.oddCompanySelected) !== "undefined") {
          oddCompanySelected.value = (_j2 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _j2.oddCompanySelected;
        }
        if (typeof ((_k2 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _k2.isShowOddsHDP) !== "undefined") {
          isShowOddsHDP.value = (_l2 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _l2.isShowOddsHDP;
        }
        if (typeof ((_m = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _m.isShowOddsTX) !== "undefined") {
          isShowOddsTX.value = (_n = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _n.isShowOddsTX;
        }
        if (typeof ((_o = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _o.isShowOdds1X2) !== "undefined") {
          isShowOdds1X2.value = (_p = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _p.isShowOdds1X2;
        }
        if (typeof ((_q = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _q.settingType) !== "undefined") {
          settingType.value = (_r = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _r.settingType;
        }
        if (typeof ((_s = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _s.isShowGoalWindow) !== "undefined") {
          isShowGoalWindow.value = (_t = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _t.isShowGoalWindow;
        }
        if (typeof ((_u = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _u.isShowRedWindow) !== "undefined") {
          isShowRedWindow.value = (_v = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _v.isShowRedWindow;
        }
        if (typeof ((_w = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _w.soundHome) !== "undefined") {
          soundHome.value = (_x = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _x.soundHome;
        }
        if (typeof ((_y = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _y.soundAway) !== "undefined") {
          soundAway.value = (_z = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _z.soundAway;
        }
        if (typeof ((_A = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _A.timeZone) !== "undefined") {
          timeZone.value = (_B = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _B.timeZone;
        }
      }
      favouritesList.value = useCookie("favouritesData").value ? useCookie("favouritesData").value : [];
      favouritesLeagues.value = useCookie("favouritesLeagues").value ? useCookie("favouritesLeagues").value : [];
      favouritesTeams.value = useCookie("favouritesTeams").value ? useCookie("favouritesTeams").value : [];
    };
    [__temp, __restore] = withAsyncContext(() => {
      var _a3;
      return fetchMatchsRecent(datePara ? datePara : formatTimeWithGMT((_a3 = getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE")) != null ? _a3 : "+07:00"));
    }), await __temp, __restore();
    const isRightClassAdded = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a3, _b3, _c3, _d3, _e3, _f3, _g3, _h3, _i3, _j3;
      var _a22, _b22, _c22, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a;
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_nuxt_img = _sfc_main$2;
      const _component_ClientOnly = __nuxt_component_2$1;
      const _component_Loading = __nuxt_component_3;
      _push(`<!--[--><div id="table_live_score" class="${ssrRenderClass([{ "col-md-8": !unref(isHidden), "col-lg-8": !unref(isHidden) }, "table_livescore"])}"><div id="Layer1">`);
      if (isFilterBoxLeague.value) {
        _push(`<div id="showoptional2"><div class="box_showoptional2"><div class="sotit">Ch\u1ECDn gi\u1EA3i \u0111\u1EA5u <span class="cc"><span style="${ssrRenderStyle({ "cursor": "pointer" })}"></span></span></div>`);
        if ((props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE) {
          _push(`<div class="rbl"><label for="rb0" class="el-radio"><input type="radio" name="selectType" id="rb0" value="0" checked><span class="el-radio-style">T\u1EA5t c\u1EA3 tr\u1EADn \u0111\u1EA5u</span></label><label for="rb3" class="el-radio"><input type="radio" name="selectType" id="rb3" value="3"><span class="el-radio-style">Ch\u01B0a b\u1EAFt \u0111\u1EA7u</span></label><label for="rb2" class="el-radio"><input type="radio" name="selectType" id="rb2" value="2"><span class="el-radio-style">\u0110\xE3 k\u1EBFt th\xFAc</span></label><label for="rb1" class="el-radio"><input type="radio" name="selectType" id="rb1" value="1"><span class="el-radio-style">\u0110ang di\u1EC5n ra</span></label></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div id="myleague2" class="myleague2">`);
        if (isGroupByCountry.value) {
          _push(`<!--[-->`);
          ssrRenderList(contriesList.value, (country) => {
            _push(`<!--[--><div${ssrRenderAttr("cid", country == null ? void 0 : country.id)} class="fg_Title"${ssrRenderAttr("id", "country_" + (country == null ? void 0 : country.id))}><b>${ssrInterpolate(country == null ? void 0 : country.name)}</b></div><ul><!--[-->`);
            ssrRenderList(country == null ? void 0 : country.league, (comp) => {
              var _a32;
              _push(`<li id="leaguesContent_36" style="${ssrRenderStyle({ "display": "block" })}"><input type="checkbox"${ssrRenderAttr("id", "myleague_" + (comp == null ? void 0 : comp.id))}${ssrIncludeBooleanAttr(Array.isArray(compsDataFilterList.value[comp == null ? void 0 : comp.id]) ? ssrLooseContain(compsDataFilterList.value[comp == null ? void 0 : comp.id], null) : compsDataFilterList.value[comp == null ? void 0 : comp.id]) ? " checked" : ""}><label class="" style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("for", "myleague_" + (comp == null ? void 0 : comp.id))}>${ssrInterpolate(comp == null ? void 0 : comp.name)} [${ssrInterpolate((_a32 = comp == null ? void 0 : comp.matchs) == null ? void 0 : _a32.length)}] <span class="smallf" id="numtip_36" num="3"></span><span class="smallf" id="numtip2_36" num="3" style="${ssrRenderStyle({ "display": "none" })}"></span></label></li>`);
            });
            _push(`<!--]--></ul><!--]-->`);
          });
          _push(`<!--]-->`);
        } else if (isGroupByAlphabet.value) {
          _push(`<!--[-->`);
          ssrRenderList(contriesList.value, (country) => {
            _push(`<div class="fg_Title"${ssrRenderAttr("id", "country_" + (country == null ? void 0 : country.id))}${ssrRenderAttr("cid", country == null ? void 0 : country.id)}><b>${ssrInterpolate(country == null ? void 0 : country.name)}</b><ul><!--[-->`);
            ssrRenderList(country == null ? void 0 : country.league, (comp) => {
              var _a32;
              _push(`<li id="leaguesContent_36" style="${ssrRenderStyle({ "display": "block" })}"><input type="checkbox"${ssrRenderAttr("id", "myleague_" + (comp == null ? void 0 : comp.id))}${ssrIncludeBooleanAttr(Array.isArray(compsDataFilterList.value[comp == null ? void 0 : comp.id]) ? ssrLooseContain(compsDataFilterList.value[comp == null ? void 0 : comp.id], null) : compsDataFilterList.value[comp == null ? void 0 : comp.id]) ? " checked" : ""}><label class="" style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("for", "myleague_" + (comp == null ? void 0 : comp.id))}>${ssrInterpolate(comp == null ? void 0 : comp.name)} [${ssrInterpolate((_a32 = comp == null ? void 0 : comp.matchs) == null ? void 0 : _a32.length)}] <span class="smallf" id="numtip_36" num="3"></span><span class="smallf" id="numtip2_36" num="3" style="${ssrRenderStyle({ "display": "none" })}"></span></label></li>`);
            });
            _push(`<!--]--></ul></div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<ul><!--[-->`);
          ssrRenderList(compChooseLeagueList.value, (comp, index) => {
            var _a32;
            _push(`<li id="leaguesContent_36" style="${ssrRenderStyle({ "display": "block" })}"><input type="checkbox"${ssrRenderAttr("id", "myleague_" + (comp == null ? void 0 : comp.id))}${ssrIncludeBooleanAttr(Array.isArray(compsDataFilterList.value[comp == null ? void 0 : comp.id]) ? ssrLooseContain(compsDataFilterList.value[comp == null ? void 0 : comp.id], null) : compsDataFilterList.value[comp == null ? void 0 : comp.id]) ? " checked" : ""}><label class="" style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("for", "myleague_" + (comp == null ? void 0 : comp.id))}>${ssrInterpolate(comp == null ? void 0 : comp.name)} [${ssrInterpolate((_a32 = comp == null ? void 0 : comp.matchs) == null ? void 0 : _a32.length)}] <span class="smallf" id="numtip_36" num="3"></span><span class="smallf" id="numtip2_36" num="3" style="${ssrRenderStyle({ "display": "none" })}"></span></label></li>`);
          });
          _push(`<!--]--></ul>`);
        }
        _push(`</div><p class="bts"><span class="fgSpan" title="Sort leagues by Countries."><input type="checkbox" id="cbbSortLeaByCountry"${ssrIncludeBooleanAttr(Array.isArray(isGroupByCountry.value) ? ssrLooseContain(isGroupByCountry.value, null) : isGroupByCountry.value) ? " checked" : ""}><label for="cbbSortLeaByCountry" style="${ssrRenderStyle({ "font-weight": "bold" })}">Ch\u1ECDn qu\u1ED1c gia</label></span><span id="button2">T\u1EA5t c\u1EA3</span><span id="button3">B\u1ECF ch\u1ECDn t\u1EA5t c\u1EA3</span><span id="button" class="ent">X\xE1c nh\u1EADn</span></p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (isFilterBoxVisible.value) {
        _push(`<div id="showFilterBox" style="${ssrRenderStyle({ "width": "430px" })}"><div class="box_showFilterBox"><div class="sotit">Odds Filter <span class="cc"><span style="${ssrRenderStyle({ "cursor": "pointer" })}"></span></span></div><div class="rbl"><label for="oddsFilter1" class="el-radio"><input type="radio" name="oddsFilterType" id="oddsFilter1" class="${ssrRenderClass({ "checked": activeFilterOdds.value === "oddsFilter1" })}"><span class="el-radio-style">Odds Filter</span></label><label for="oddsFilter2" class="el-radio"><input type="radio" name="oddsFilterType" id="oddsFilter2" class="${ssrRenderClass({ "checked": activeFilterOdds.value === "oddsFilter2" })}"><span class="el-radio-style">Filter(Crown Odds)</span></label></div>`);
        if (activeFilterOdds.value === "oddsFilter1") {
          _push(`<div id="OddsFilter" class="oddsFilter1"><div id="goalTable"><div class="goalTitle">Asian Handicap</div><table width="95%" cellpadding="0" cellspacing="0"><tbody><tr style="${ssrRenderStyle({ "height": "24px" })}"><td width="4%"><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_0"></td><td width="21%">3 <span class="smallf">[1]</span></td><td width="4%"><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_1"></td><td width="21%">2.5/3 <span class="smallf">[1]</span></td><td width="4%"><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_2"></td><td width="21%">2.5 <span class="smallf">[1]</span></td><td width="4%"><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_3"></td><td width="21%">2/2.5 <span class="smallf">[1]</span></td></tr></tbody></table><div class="goalTitle">Over/Under</div><table width="95%" cellpadding="0" cellspacing="0"><tbody><tr style="${ssrRenderStyle({ "height": "24px" })}"><td width="4%"><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_24"></td><td width="21%">0.5/1 <span class="smallf">[1]</span></td><td width="4%"><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_25"></td><td width="21%">1 <span class="smallf">[1]</span></td><td width="4%"><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_26"></td><td width="21%">1/1.5 <span class="smallf">[2]</span></td><td width="4%"><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_27"></td><td width="21%">1.5 <span class="smallf">[2]</span></td></tr><tr style="${ssrRenderStyle({ "height": "24px" })}"><td width="4%"><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_40"></td><td width="21%">6.5 <span class="smallf">[1]</span></td><td width="4%"><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_41"></td><td width="21%">No Odds <span class="smallf">[321]</span></td></tr></tbody></table></div><div class="bt-selected"><b id="oddsNum">332</b> Matches Selected </div><div id="selectGoals_div" style="${ssrRenderStyle({ "text-align": "center" })}" class="bts"><span>Select All</span><span>Select Others</span><span class="ent">Confirm</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeFilterOdds.value === "oddsFilter2") {
          _push(`<div id="StreaksFilter" class="oddsFilter2"><div id="filterList"><div class="item"><span class="name">Winning Streaks</span><span><label class="ef-radio" for="condition_0_0"><input type="radio" id="condition_0_0" name="filterCid" checked="checked"><span class="ef-radio-style checked">3~4</span></label></span><span><label class="ef-radio" for="condition_0_1"><input type="radio" id="condition_0_1" name="filterCid"><span class="ef-radio-style">5~6</span></label></span><span><label class="ef-radio" for="condition_0_2"><input type="radio" id="condition_0_2" name="filterCid"><span class="ef-radio-style">7+</span></label></span></div></div><p class="bts"><label id="countBox" style="${ssrRenderStyle({ "float": "left", "margin-top": "10px" })}"><b id="conditionNum">0</b> Matches Selected </label><span id="button7" class="ent" style="${ssrRenderStyle({ "float": "right" })}">Confirm</span></p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if ((isShowGoalWindow.value || isShowRedWindow.value) && isScoreGoal.value) {
        _push(`<div id="Layer2"><div id="showoptional2"><div class="box_showoptional2"><table id="flGoalDiv" width="620" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="GoalDiv-t" height="32" colspan="6"><b>${ssrInterpolate((_e2 = (_d2 = (_c22 = compsListByKey.value) == null ? void 0 : _c22.get((_b22 = (_a22 = matchOriginsList.value) == null ? void 0 : _a22[isScoreGoalMatchId.value]) == null ? void 0 : _b22.competition)) == null ? void 0 : _d2[0]) == null ? void 0 : _e2.name)}</b><b class="goal-time">${ssrInterpolate((_g2 = (_f2 = matchOriginsList.value) == null ? void 0 : _f2[isScoreGoalMatchId.value]) == null ? void 0 : _g2.matchMinutesEvent)}<img${ssrRenderAttr("src", _imports_0)} border="0" alt="in" width="3" height="8"></b><span class="iconfont icon-close"></span></td></tr><tr align="center" class="line"><td width="40"><img class="sjicon"${ssrRenderAttr("src", scoreChangeType.value)}></td><td width="180"><span class="teamname"><font class=""><b>${ssrInterpolate((_j2 = (_i2 = (_h2 = matchOriginsList.value) == null ? void 0 : _h2[isScoreGoalMatchId.value]) == null ? void 0 : _i2.home_team) == null ? void 0 : _j2.name)}</b></font></span></td><td width="60" style="${ssrRenderStyle({ "font-size": "16px" })}"><b><font class="blue">${ssrInterpolate((_m = (_l2 = (_k2 = matchOriginsList.value) == null ? void 0 : _k2[isScoreGoalMatchId.value]) == null ? void 0 : _l2.home_scores) == null ? void 0 : _m[0])}</font></b> - <b><font class="blue">${ssrInterpolate((_p = (_o = (_n = matchOriginsList.value) == null ? void 0 : _n[isScoreGoalMatchId.value]) == null ? void 0 : _o.away_scores) == null ? void 0 : _p[0])}</font></b></td><td width="180"><span class="teamname"><b><font class="">${ssrInterpolate((_s = (_r = (_q = matchOriginsList.value) == null ? void 0 : _q[isScoreGoalMatchId.value]) == null ? void 0 : _r.away_team) == null ? void 0 : _s.name)}</font></b></span></td><td width="40"></td></tr><tr align="center" class="line"><td width="40"></td><td width="180"><i>${ssrInterpolate((_v = (_u = (_t = matchOriginsList.value) == null ? void 0 : _t[isScoreGoalMatchId.value]) == null ? void 0 : _u.home_team) == null ? void 0 : _v.playerName)}</i></td><td width="60" style="${ssrRenderStyle({ "font-size": "16px" })}"></td><td width="180"><i>${ssrInterpolate((_y = (_x = (_w = matchOriginsList.value) == null ? void 0 : _w[isScoreGoalMatchId.value]) == null ? void 0 : _x.away_team) == null ? void 0 : _y.playerName)}</i></td><td width="40"></td></tr></tbody></table></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).SCHEDULE) {
        _push(`<div class="date-now-none"><div><div class="date-picker"><ul class="on"><!--[-->`);
        ssrRenderList(datesList.value, (itemDate) => {
          _push(`<li class="${ssrRenderClass(dateChoose.value === (itemDate == null ? void 0 : itemDate.dayValue) ? "on" : "")}"><span>${ssrInterpolate(itemDate == null ? void 0 : itemDate.label)}</span><span>${ssrInterpolate(itemDate == null ? void 0 : itemDate.day)}</span></li>`);
        });
        _push(`<!--]--></ul></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!(props == null ? void 0 : props.favorites)) {
        _push(`<div id="tools" class="tools d-none d-md-block"><ul><li id="li_ShowAll" class="${ssrRenderClass(activeTab.value === ("LIVESCORE_ACTIVE_TAB" in _ctx ? _ctx.LIVESCORE_ACTIVE_TAB : unref(LIVESCORE_ACTIVE_TAB)).ALL ? "on" : "")}"><span>${ssrInterpolate(_ctx.$t("All"))}</span></li><li id="li_FilterHot" class="${ssrRenderClass(activeTab.value === ("LIVESCORE_ACTIVE_TAB" in _ctx ? _ctx.LIVESCORE_ACTIVE_TAB : unref(LIVESCORE_ACTIVE_TAB)).HOT ? "on" : "")}"><span>${ssrInterpolate(_ctx.$t("Hot"))}</span></li><li id="li_FilterLea" class="${ssrRenderClass([activeTab.value === ("LIVESCORE_ACTIVE_TAB" in _ctx ? _ctx.LIVESCORE_ACTIVE_TAB : unref(LIVESCORE_ACTIVE_TAB)).LEAGUE ? "on" : "", "filterLi"])}"><span id="LeaSelBtn">${ssrInterpolate(_ctx.$t("Leagues"))} <i class="icon iconfont icon-drop-down"></i></span></li></ul><div id="switchLeagueBlock" class="switch-btn d-none d-md-inline-block"><span class="on">${ssrInterpolate(_ctx.$t("New Version"))}</span><span class="">${ssrInterpolate(_ctx.$t("Old Version"))}</span><div class="pop"> Click here to switch the version <div class="btn">OK</div></div></div><div class="clear"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (props == null ? void 0 : props.favorites) {
        _push(`<div id="tools" class="tools"><ul><li id="li_ShowAll" class="${ssrRenderClass((props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).MATCHES ? "on" : "")}">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_FAVORITES
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>Tr\u1EADn</span>`);
            } else {
              return [
                createVNode("span", null, "Tr\u1EADn")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li id="li_FilterHot" class="${ssrRenderClass((props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).LEAGUES ? "on" : "")}">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_FAVORITES_LEAGUES
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>Gi\u1EA3i</span>`);
            } else {
              return [
                createVNode("span", null, "Gi\u1EA3i")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li id="li_FilterLea" class="${ssrRenderClass([(props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).TEAMS ? "on" : "", "tab"])}">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_FAVORITES_TEAMS
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>\u0110\u1ED9i</span>`);
            } else {
              return [
                createVNode("span", null, "\u0110\u1ED9i")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></ul><div id="switchLeagueBlock" class="switch-btn d-none d-md-inline-block"><span class="on">${ssrInterpolate(_ctx.$t("New Version"))}</span><span class="">${ssrInterpolate(_ctx.$t("Old Version"))}</span><div class="pop"> Click here to switch the version <div class="btn">OK</div></div></div><div class="clear"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([{ "p-0": !unref(isHidden) }, "container-fluid"])}"><div id="mintable"><span id="notify"></span><span id="live"><div class="${ssrRenderClass({ container: !unref(isHidden) })}" id="table_live"><div id="tr_0" class="row scoretitle"><div class="col-8 col-sm-8 col-md-1 col-lg-1 align-self-center ps-3"><span class="allno" title="X\xF3a t\u1EA5t c\u1EA3 \u0111\u1ED9i b\xF3ng \u0111\xE3 theo d\xF5i"></span></div><div class="col-md-1 col-lg-1 text-left d-none d-sm-none d-md-inline-block align-self-center">${ssrInterpolate(_ctx.$t("Time"))}</div><div class="${ssrRenderClass([{ "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }, "text-end d-none d-sm-none d-md-inline-block align-self-center"])}">${ssrInterpolate(_ctx.$t("Home"))}</div><div id="ScoreTh" class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center">${ssrInterpolate(_ctx.$t("Score"))}</div><div class="${ssrRenderClass([{ "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }, "text-start d-none d-sm-none d-md-inline-block align-self-center"])}">${ssrInterpolate(_ctx.$t("Away"))}</div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center"><i class="icon iconfont icon-font-report3" title="Ph\u1EA1t g\xF3c"></i></div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" id="HtTh" title="K\u1EBFt qu\u1EA3 hi\u1EC7p 1">${ssrInterpolate(_ctx.$t("H-T"))}</div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center data_td">${ssrInterpolate(_ctx.$t("Data"))}</div>`);
      if (isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) {
        _push(`<div class="col-4 col-sm-4 col-md-2 col-lg-2 text-center align-self-center oddsHead" id="oddsHead"><select id="CompanySel" aria-label="Company Select"><!--[-->`);
        ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (odd_company, index) => {
          _push(`<option${ssrRenderAttr("value", odd_company == null ? void 0 : odd_company.id)}>${ssrInterpolate(odd_company == null ? void 0 : odd_company.name)}</option>`);
        });
        _push(`<!--]--></select></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!orderByTime.value) {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(compsList.value, (comp, index) => {
          var _a32, _b32, _c32, _d32, _e32, _f32, _g32, _h32, _i32, _j32, _k3;
          _push(`<!--[-->`);
          if (index < limitData.value) {
            _push(`<!--[-->`);
            if ((_a32 = comp == null ? void 0 : comp.matchs) == null ? void 0 : _a32.length) {
              _push(`<div class="row Leaguestitle fbHead isLeaTop" id="tr_2" leaindex="2" data-lidx="2" sclassid="34" isleatop="1"><div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center add-div"><i class="icon iconfont icon-font-collect-off" style="${ssrRenderStyle(!((_b32 = favouritesLeagues.value) == null ? void 0 : _b32.includes(comp == null ? void 0 : comp.id)) ? null : { display: "none" })}"></i><i class="icon iconfont icon-font-collect-on on" style="${ssrRenderStyle(((_c32 = favouritesLeagues.value) == null ? void 0 : _c32.includes(comp == null ? void 0 : comp.id)) ? null : { display: "none" })}"></i></div><div class="col-9 col-sm-9 col-md-9 col-lg-9 align-self-center"><div class="l1"><div class="league-img">`);
              _push(ssrRenderComponent(_component_nuxt_img, {
                src: unref(liveScoresImage) + (((_e32 = (_d32 = comp.matchs) == null ? void 0 : _d32[0]) == null ? void 0 : _e32.isFlatCountry) ? "country/" + comp.country_logo : "competition/" + comp.logo_o) + unref(imageHeight),
                loading: "lazy",
                class: "cImg lazy",
                alt: "",
                style: { "display": "inline" }
              }, null, _parent));
              _push(`</div>`);
              _push(ssrRenderComponent(_component_nuxt_link, {
                to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).LEAGUES + "/" + ((_g32 = (_f32 = compsListByKey.value.get(comp == null ? void 0 : comp.id)) == null ? void 0 : _f32[0]) == null ? void 0 : _g32.id)
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  var _a4, _b4;
                  if (_push2) {
                    _push2(`<span class="LGname"${_scopeId}>${ssrInterpolate((_a4 = comp == null ? void 0 : comp.comp_name_vi) != null ? _a4 : comp == null ? void 0 : comp.name)}</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "LGname" }, toDisplayString((_b4 = comp == null ? void 0 : comp.comp_name_vi) != null ? _b4 : comp == null ? void 0 : comp.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(`</div></div><div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center">`);
              if ((_i32 = (_h32 = compsListByKey.value.get(comp == null ? void 0 : comp.id)) == null ? void 0 : _h32[0]) == null ? void 0 : _i32.id) {
                _push(ssrRenderComponent(_component_nuxt_link, {
                  to: "/league/" + ((_k3 = (_j32 = compsListByKey.value.get(comp == null ? void 0 : comp.id)) == null ? void 0 : _j32[0]) == null ? void 0 : _k3.id),
                  "aria-label": "Standing",
                  style: { "display": "flex", "gap": "4px", "justify-content": "flex-end" }
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(ssrRenderComponent(_component_nuxt_img, {
                        src: "/img/rank.svg",
                        alt: "Standing",
                        title: "B\u1EA3ng x\u1EBFp h\u1EA1ng",
                        loading: "lazy",
                        height: "24",
                        width: "24",
                        class: "rankicon",
                        style: { "display": "inline" }
                      }, null, _parent2, _scopeId));
                    } else {
                      return [
                        createVNode(_component_nuxt_img, {
                          src: "/img/rank.svg",
                          alt: "Standing",
                          title: "B\u1EA3ng x\u1EBFp h\u1EA1ng",
                          loading: "lazy",
                          height: "24",
                          width: "24",
                          class: "rankicon",
                          style: { "display": "inline" }
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
              } else {
                _push(`<!---->`);
              }
              _push(`</div><div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center"><div class="l2"><span class="l5"><span style="${ssrRenderStyle(!toggleCompetition.value.includes(index) ? null : { display: "none" })}" class="hidden-info r0"><span id="collapse2" class="collapse" title="Thu g\u1ECDn"></span></span><span style="${ssrRenderStyle(toggleCompetition.value.includes(index) ? null : { display: "none" })}" class="display-info r0"><span id="expand2" class="expand"></span></span></span></div></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--[-->`);
            ssrRenderList(comp == null ? void 0 : comp.matchs, (match) => {
              _push(ssrRenderComponent(_component_nuxt_link, {
                to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + (match == null ? void 0 : match.id),
                class: "match row"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  var _a5, _b5, _c5, _d5;
                  var _a4, _b4, _c4, _d4, _e4, _f4, _g4, _h4, _i4, _j4, _k4, _l3, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2, _y2, _z2, _A2, _B2, _C2, _D2, _E2, _F2, _G2, _H2, _I2, _J2, _K2, _L2, _M2, _N2, _O2, _P2;
                  if (_push2) {
                    _push2(`<div class="row tds" style="${ssrRenderStyle([
                      { "min-height": "46px" },
                      !toggleCompetition.value.includes(index) ? null : { display: "none" }
                    ])}"${ssrRenderAttr("id", "tr1_" + (match == null ? void 0 : match.id))} index="2" leaindex="2"${_scopeId}><div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center star-like"${_scopeId}><div class="add-div"${_scopeId}><i class="icon iconfont icon-font-collect-off" style="${ssrRenderStyle(!((_a4 = favouritesList.value) == null ? void 0 : _a4.includes(match == null ? void 0 : match.id)) ? null : { display: "none" })}"${_scopeId}></i><i class="icon iconfont icon-font-collect-on on" style="${ssrRenderStyle(((_b4 = favouritesList.value) == null ? void 0 : _b4.includes(match == null ? void 0 : match.id)) ? null : { display: "none" })}"${_scopeId}></i>`);
                    if ((match == null ? void 0 : match.available_stream) && unref(availableStreamUrl)) {
                      _push2(`<span target="_blank" class="d-none d-md-inline-block liveicon"${_scopeId}><span class="icon iconfont icon-icon-live2 live"${_scopeId}></span></span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div></div><div class="col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-none d-md-block"${_scopeId}><div name="timeData" id="mt"${_scopeId}>${(_a5 = ("getStatusDisplay" in _ctx ? _ctx.getStatusDisplay : unref(getStatusDisplay))(match, _ctx.$t, timeZone.value)) != null ? _a5 : ""}</div>`);
                    if (("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE.includes(match.status)) {
                      _push2(`<div style="${ssrRenderStyle({ "font-size": "12px", "color": "#27660a" })}"${_scopeId}>${ssrInterpolate(match.status === "12" ? "H\u1EE7y" : "Ho\xE3n")}</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div><div class="col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-sm-inline-block d-md-none"${_scopeId}><span class="time"${_scopeId}>${ssrInterpolate(unref(formatDateMomentUTCTimeZone)(match == null ? void 0 : match.match_time, "HH:mm", timeZone.value))}</span>`);
                    if ((match == null ? void 0 : match.available_stream) && unref(availableStreamUrl)) {
                      _push2(`<span target="_blank" class="liveicon"${ssrRenderAttr("to", unref(availableStreamUrl) + "?ls-id=" + (match == null ? void 0 : match.id))}${_scopeId}><span class="icon iconfont icon-icon-live2 live"${_scopeId}></span></span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if (("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE.includes(match.status)) {
                      _push2(`<span style="${ssrRenderStyle({ "font-size": "12px", "color": "#27660a", "margin-left": "3px" })}"${_scopeId}>${ssrInterpolate(match.status === "12" ? "H\u1EE7y" : "Ho\xE3n")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div><div class="col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center"${_scopeId}><span class="hafttime_mobile"${_scopeId}></span></div><div class="col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center score bd_time_mobile"${_scopeId}><i class="injury fulltime_mobile"${_scopeId}><text${_scopeId}></text><text${_scopeId}>${(_b5 = ("getStatusDisplayMobile" in _ctx ? _ctx.getStatusDisplayMobile : unref(getStatusDisplayMobile))(match, _ctx.$t, timeZone.value)) != null ? _b5 : ""}</text></i></div><div class="col-3 col-sm-3 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center conner_mobile"${_scopeId}><i class="icon iconfont icon-font-report3"${_scopeId}></i>`);
                    if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                      _push2(`<span id="cr" class="conner_span"${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[4]) !== "undefined" ? match == null ? void 0 : match.home_scores[4] : "")}-${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[4]) !== "undefined" ? match == null ? void 0 : match.away_scores[4] : "")}</span>`);
                    } else {
                      _push2(`<!--[--> - <!--]-->`);
                    }
                    _push2(`</div><div class="col-9 col-sm-9 col-md-2 col-lg-2 text-end d-inline-block d-sm-inline-block d-md-none align-self-center"${_scopeId}><div class="row"${_scopeId}><div class="col-10 col-sm-10 text-start align-self-center"${_scopeId}><div id="ht"${_scopeId}>${ssrInterpolate((_c4 = match == null ? void 0 : match.home_team) == null ? void 0 : _c4.name)} `);
                    if (isShowRanking.value) {
                      _push2(`<span id="horder" class="team-hg"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_position) ? "[" + (match == null ? void 0 : match.home_position) + "]" : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((match == null ? void 0 : match.home_scores[3]) && isShowCardYellow.value) {
                      _push2(`<span class="yellow1 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[3]) ? match == null ? void 0 : match.home_scores[3] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((match == null ? void 0 : match.home_scores[2]) && isShowCardRed.value) {
                      _push2(`<span class="redcard1 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[2]) ? match == null ? void 0 : match.home_scores[2] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div><div id="gt"${_scopeId}>${ssrInterpolate((_d4 = match == null ? void 0 : match.away_team) == null ? void 0 : _d4.name)} `);
                    if ((match == null ? void 0 : match.away_scores[2]) && isShowCardRed.value) {
                      _push2(`<span class="redcard2 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[2]) ? match == null ? void 0 : match.away_scores[2] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((match == null ? void 0 : match.away_scores[3]) && isShowCardYellow.value) {
                      _push2(`<span class="yellow2 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[3]) ? match == null ? void 0 : match.away_scores[3] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if (isShowRanking.value) {
                      _push2(`<span id="gorder" class="team-hg"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_position) ? "[" + (match == null ? void 0 : match.away_position) + "]" : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div></div><div class="col-1 col-sm-1 text-center align-self-center"${_scopeId}>`);
                    if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                      _push2(`<span id="hht"${_scopeId}><p${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : "")}</p><p${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : "")}</p></span>`);
                    } else {
                      _push2(`<!--[--> - <!--]-->`);
                    }
                    _push2(`</div><div class="col-1 col-sm-1 text-center align-self-center"${_scopeId}><b${_scopeId}>`);
                    if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                      _push2(`<!--[--><p${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[0]) !== "undefined" ? match == null ? void 0 : match.home_scores[0] : "")}</p><p${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[0]) !== "undefined" ? match == null ? void 0 : match.away_scores[0] : "")}</p><!--]-->`);
                    } else {
                      _push2(`<!--[--> - <!--]-->`);
                    }
                    _push2(`</b></div></div></div><div id="ht" class="${ssrRenderClass([{ "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }, "text-end d-none d-sm-none d-md-inline-block align-self-center"])}"${_scopeId}>`);
                    if (isShowRanking.value) {
                      _push2(`<span id="horder" class="team-hg"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_position) ? "[" + (match == null ? void 0 : match.home_position) + "]" : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((match == null ? void 0 : match.home_scores[3]) && isShowCardYellow.value) {
                      _push2(`<span class="yellow1 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[3]) ? match == null ? void 0 : match.home_scores[3] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((match == null ? void 0 : match.home_scores[2]) && isShowCardRed.value) {
                      _push2(`<span class="redcard1 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[2]) ? match == null ? void 0 : match.home_scores[2] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<span class="team-name"${_scopeId}>${ssrInterpolate((_e4 = match == null ? void 0 : match.home_team) == null ? void 0 : _e4.name)}</span></div><div class="${ssrRenderClass([("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_END.includes(match == null ? void 0 : match.status) ? "red" : "blue", "handpoint col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center"])}"${_scopeId}><b${_scopeId}>`);
                    if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                      _push2(`<!--[-->${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[0]) !== "undefined" ? match == null ? void 0 : match.home_scores[0] : "")} - ${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[0]) !== "undefined" ? match == null ? void 0 : match.away_scores[0] : "")}<!--]-->`);
                    } else {
                      _push2(`<!--[--> - <!--]-->`);
                    }
                    _push2(`</b></div><div id="gt" class="${ssrRenderClass([{ "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }, "d-none d-sm-none d-md-inline-block align-self-center"])}"${_scopeId}><span class="team-name"${_scopeId}>${ssrInterpolate((_f4 = match == null ? void 0 : match.away_team) == null ? void 0 : _f4.name)}</span>`);
                    if ((match == null ? void 0 : match.away_scores[2]) && isShowCardRed.value) {
                      _push2(`<span class="redcard2 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[2]) ? match == null ? void 0 : match.away_scores[2] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((match == null ? void 0 : match.away_scores[3]) && isShowCardYellow.value) {
                      _push2(`<span class="yellow2 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[3]) ? match == null ? void 0 : match.away_scores[3] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if (isShowRanking.value) {
                      _push2(`<span id="gorder" class="team-hg"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_position) ? "[" + (match == null ? void 0 : match.away_position) + "]" : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center"${_scopeId}>`);
                    if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                      _push2(`<span id="cr" class="conner_span"${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[4]) !== "undefined" ? match == null ? void 0 : match.home_scores[4] : "")}-${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[4]) !== "undefined" ? match == null ? void 0 : match.away_scores[4] : "")}</span>`);
                    } else {
                      _push2(`<!--[--> - <!--]-->`);
                    }
                    _push2(`</div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center"${_scopeId}>`);
                    if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                      _push2(`<span id="hht" style="${ssrRenderStyle({ "display": "block" })}"${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : "")}-${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : "")}</span>`);
                    } else {
                      _push2(`<!--[--> - <!--]-->`);
                    }
                    _push2(`</div><div class="toolimg col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center"${_scopeId}><span class="analyze-icon l0"${_scopeId}><i class="icon iconfont icon-analysis" title="Ph\xE2n t\xEDch"${_scopeId}></i></span>`);
                    if ((props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE || (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).FAVORITES) {
                      _push2(`<span${ssrRenderAttr("id", "flashSpan_" + (match == null ? void 0 : match.id))} class="matchdata-iconpc l0"${_scopeId}><span title="D\u1EEF li\u1EC7u" class="${ssrRenderClass([(match == null ? void 0 : match.id) === matchActiveLiveFlash.value ? "on" : "", "icon icon-pc icon-matchdata-pc"])}"${_scopeId}></span></span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                    if (isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) {
                      _push2(`<div class="col-3 col-sm-3 col-md-2 col-lg-2 align-self-center oddstd"${_scopeId}><div class="text-center" style="${ssrRenderStyle({ "min-height": "42px" })}"${_scopeId}>`);
                      _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
                      _push2(`</div></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div><div class="table_matchdata"${_scopeId}>`);
                    if ((match == null ? void 0 : match.id) === matchActiveLiveFlash.value) {
                      _push2(`<div${ssrRenderAttr("id", "trF_" + (match == null ? void 0 : match.id))} bgcolor="#FFFFFF"${_scopeId}><div colspan="13" align="center" height="18"${ssrRenderAttr("id", "flashLive_" + (match == null ? void 0 : match.id))}${_scopeId}><div class="ant row"${_scopeId}><div class="flash col-6 p-0"${_scopeId}><div class="nodata"${_scopeId}>`);
                      _push2(ssrRenderComponent(_component_Loading, null, null, _parent2, _scopeId));
                      _push2(`</div><iframe id="flash"${ssrRenderAttr("src", "https://tracker.sportdb.live/?code=" + keyEncode.value + "&id=" + (match == null ? void 0 : match.id))} onload="this.previousSibling.style.display=&#39;none&#39;"${_scopeId}></iframe></div><div class="matchdata col-6 p-0"${_scopeId}><div class="databtns"${_scopeId}><div class="btns" id="divBtns"${_scopeId}><span class="${ssrRenderClass([{ "on": activeSection.value === "scoredConceded" }, "btn_scoredconceded"])}"${_scopeId}>Ghi</span><span class="${ssrRenderClass([{ "on": activeSection.value === "recentStatus" }, "btn_recentstatus"])}"${_scopeId}>Phong \u0111\u1ED9</span></div></div><div class="recentStatus" id="recentStatus" style="${ssrRenderStyle(activeSection.value === "recentStatus" ? null : { display: "none" })}"${_scopeId}><div class="liveBox mx2"${_scopeId}>`);
                      if (((_h4 = matchRecentResult.value) == null ? void 0 : _h4[(_g4 = match == null ? void 0 : match.home_team) == null ? void 0 : _g4.id]) || ((_j4 = matchRecentResult.value) == null ? void 0 : _j4[(_i4 = match == null ? void 0 : match.away_team) == null ? void 0 : _i4.id])) {
                        _push2(`<!--[--><div class="lb-title"${_scopeId}>6 tr\u1EADn g\u1EA7n \u0111\xE2y</div><div class="lb-ms"${_scopeId}><span class="homeSix"${_scopeId}>${(_c5 = (_l3 = matchRecentResult.value) == null ? void 0 : _l3[(_k4 = match == null ? void 0 : match.home_team) == null ? void 0 : _k4.id]) != null ? _c5 : ""}</span><span class="lb-m"${_scopeId}><span${_scopeId}></span></span><span class="guestSix"${_scopeId}>${(_d5 = (_n2 = matchRecentResult.value) == null ? void 0 : _n2[(_m2 = match == null ? void 0 : match.away_team) == null ? void 0 : _m2.id]) != null ? _d5 : ""}</span></div><!--]-->`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if ((_o2 = matchSummary.value) == null ? void 0 : _o2.stats) {
                        _push2(`<ul${_scopeId}><li${_scopeId}><!--[-->`);
                        ssrRenderList((_p2 = matchSummary.value) == null ? void 0 : _p2.stats, (stat, index2) => {
                          _push2(`<!--[--><div class="lb-td1"${_scopeId}><span class="left red"${_scopeId}>${ssrInterpolate(stat == null ? void 0 : stat.home)}</span><span class="center"${_scopeId}>${ssrInterpolate(("getStats" in _ctx ? _ctx.getStats : unref(getStats))(stat == null ? void 0 : stat.type))}</span><span class="right"${_scopeId}>${ssrInterpolate(stat == null ? void 0 : stat.away)}</span></div><div class="lb-td2"${_scopeId}><span class="home-w"${_scopeId}><span class="home-bar" style="${ssrRenderStyle("width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.home) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%")}"${_scopeId}></span></span><span class="guest-w"${_scopeId}><span class="guest-bar" style="${ssrRenderStyle("width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.away) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%")}"${_scopeId}></span></span></div><!--]-->`);
                        });
                        _push2(`<!--]--></li></ul>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div></div>`);
                      if (activeSection.value === "scoredConceded") {
                        _push2(`<div class="guessBox scoredConceded" id="guessDiv"${_scopeId}><table width="100%"${_scopeId}><tbody${_scopeId}><tr${_scopeId}><th colspan="5"${_scopeId}><div class="cvd"${_scopeId}><div class="btns"${_scopeId}><span class="${ssrRenderClass([{ "on": activeSectionTable.value === "ThirtyGames" }, "thirtygames"])}"${_scopeId}>20 tr\u1EADn</span></div></div></th></tr></tbody></table>`);
                        if (activeSectionTable.value === "ThirtyGames") {
                          _push2(`<table width="100%" cellspacing="1" cellpadding="0" id="JSQ_2404596_30" class="ThirtyGames"${_scopeId}><tbody${_scopeId}><tr${_scopeId}><td width="20%"${_scopeId}>Ch\u1EE7</td><td width="20%" class="y"${_scopeId}>Ph\xFAt</td><td width="20%"${_scopeId}>Kh\xE1ch</td></tr>`);
                          if (((_s2 = (_r2 = (_q2 = matchesAnalysis.value) == null ? void 0 : _q2.home_shoot_time) == null ? void 0 : _r2[0]) == null ? void 0 : _s2.length) > 0) {
                            _push2(`<!--[-->`);
                            ssrRenderList((_u2 = (_t2 = matchesAnalysis.value) == null ? void 0 : _t2.home_shoot_time) == null ? void 0 : _u2[0], (value, index2) => {
                              var _a52, _b52, _c52, _d52, _e5, _f5, _g5, _h5, _i5, _j5;
                              _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(((_a52 = shootTime.value) == null ? void 0 : _a52["sumHome"]) > 0 ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(value) * 100 / ((_b52 = shootTime.value) == null ? void 0 : _b52["sumHome"])).toFixed(0) : "0")}%</td>`);
                              if (index2 === 4) {
                                _push2(`<td class="y"${_scopeId}>41~45</td>`);
                              } else if (index2 === 5) {
                                _push2(`<td class="y"${_scopeId}>46~50</td>`);
                              } else {
                                _push2(`<td class="y"${_scopeId}>`);
                                if (index2 < 4) {
                                  _push2(`<span${_scopeId}>${ssrInterpolate(10 * index2 + 1)}~${ssrInterpolate(10 * (index2 + 1))}</span>`);
                                } else {
                                  _push2(`<span${_scopeId}>${ssrInterpolate(10 * (index2 - 1) + 1)}~${ssrInterpolate(10 * index2)}</span>`);
                                }
                                _push2(`</td>`);
                              }
                              _push2(`<td${_scopeId}>${ssrInterpolate(((_c52 = shootTime.value) == null ? void 0 : _c52["sumAway"]) > 0 ? ((_f5 = (_e5 = (_d52 = matchesAnalysis.value) == null ? void 0 : _d52.away_shoot_time) == null ? void 0 : _e5[0]) == null ? void 0 : _f5[index2]) ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))((_i5 = (_h5 = (_g5 = matchesAnalysis.value) == null ? void 0 : _g5.away_shoot_time) == null ? void 0 : _h5[0]) == null ? void 0 : _i5[index2]) * 100 / ((_j5 = shootTime.value) == null ? void 0 : _j5["sumAway"])).toFixed(0) : "0" : "0")}% </td></tr>`);
                            });
                            _push2(`<!--]-->`);
                          } else {
                            _push2(`<tr${_scopeId}><td colspan="3"${_scopeId}>Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u</td></tr>`);
                          }
                          _push2(`</tbody></table>`);
                        } else {
                          _push2(`<!---->`);
                        }
                        _push2(`</div>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div></div></div></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                  } else {
                    return [
                      withDirectives(createVNode("div", {
                        class: "row tds",
                        style: { "min-height": "46px" },
                        id: "tr1_" + (match == null ? void 0 : match.id),
                        index: "2",
                        leaindex: "2"
                      }, [
                        createVNode("div", { class: "col-1 col-sm-1 col-md-1 col-lg-1 align-self-center star-like" }, [
                          createVNode("div", { class: "add-div" }, [
                            withDirectives(createVNode("i", {
                              class: "icon iconfont icon-font-collect-off",
                              onClick: withModifiers(($event) => addFavourites(match == null ? void 0 : match.id), ["prevent"])
                            }, null, 8, ["onClick"]), [
                              [vShow, !((_v2 = favouritesList.value) == null ? void 0 : _v2.includes(match == null ? void 0 : match.id))]
                            ]),
                            withDirectives(createVNode("i", {
                              class: "icon iconfont icon-font-collect-on on",
                              onClick: withModifiers(($event) => removeFavourites(match == null ? void 0 : match.id), ["prevent"])
                            }, null, 8, ["onClick"]), [
                              [vShow, (_w2 = favouritesList.value) == null ? void 0 : _w2.includes(match == null ? void 0 : match.id)]
                            ]),
                            (match == null ? void 0 : match.available_stream) && unref(availableStreamUrl) ? (openBlock(), createBlock("span", {
                              key: 0,
                              target: "_blank",
                              onClick: withModifiers(($event) => ("locationHref" in _ctx ? _ctx.locationHref : unref(locationHref))(unref(availableStreamUrl) + "?ls-id=" + (match == null ? void 0 : match.id), true), ["prevent"]),
                              class: "d-none d-md-inline-block liveicon"
                            }, [
                              createVNode("span", { class: "icon iconfont icon-icon-live2 live" })
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-none d-md-block" }, [
                          createVNode("div", {
                            name: "timeData",
                            id: "mt",
                            innerHTML: ("getStatusDisplay" in _ctx ? _ctx.getStatusDisplay : unref(getStatusDisplay))(match, _ctx.$t, timeZone.value)
                          }, null, 8, ["innerHTML"]),
                          ("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE.includes(match.status) ? (openBlock(), createBlock("div", {
                            key: 0,
                            style: { "font-size": "12px", "color": "#27660a" }
                          }, toDisplayString(match.status === "12" ? "H\u1EE7y" : "Ho\xE3n"), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-sm-inline-block d-md-none" }, [
                          createVNode("span", { class: "time" }, toDisplayString(unref(formatDateMomentUTCTimeZone)(match == null ? void 0 : match.match_time, "HH:mm", timeZone.value)), 1),
                          (match == null ? void 0 : match.available_stream) && unref(availableStreamUrl) ? (openBlock(), createBlock("span", {
                            key: 0,
                            target: "_blank",
                            class: "liveicon",
                            onClick: withModifiers(($event) => ("locationHref" in _ctx ? _ctx.locationHref : unref(locationHref))(unref(availableStreamUrl) + "?ls-id=" + (match == null ? void 0 : match.id), true), ["prevent"]),
                            to: unref(availableStreamUrl) + "?ls-id=" + (match == null ? void 0 : match.id)
                          }, [
                            createVNode("span", { class: "icon iconfont icon-icon-live2 live" })
                          ], 8, ["onClick", "to"])) : createCommentVNode("", true),
                          ("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE.includes(match.status) ? (openBlock(), createBlock("span", {
                            key: 1,
                            style: { "font-size": "12px", "color": "#27660a", "margin-left": "3px" }
                          }, toDisplayString(match.status === "12" ? "H\u1EE7y" : "Ho\xE3n"), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center" }, [
                          createVNode("span", { class: "hafttime_mobile" })
                        ]),
                        createVNode("div", { class: "col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center score bd_time_mobile" }, [
                          createVNode("i", { class: "injury fulltime_mobile" }, [
                            createVNode("text"),
                            createVNode("text", {
                              innerHTML: ("getStatusDisplayMobile" in _ctx ? _ctx.getStatusDisplayMobile : unref(getStatusDisplayMobile))(match, _ctx.$t, timeZone.value)
                            }, null, 8, ["innerHTML"])
                          ])
                        ]),
                        createVNode("div", { class: "col-3 col-sm-3 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center conner_mobile" }, [
                          createVNode("i", { class: "icon iconfont icon-font-report3" }),
                          ![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status) ? (openBlock(), createBlock("span", {
                            key: 0,
                            id: "cr",
                            class: "conner_span"
                          }, toDisplayString(typeof (match == null ? void 0 : match.home_scores[4]) !== "undefined" ? match == null ? void 0 : match.home_scores[4] : "") + "-" + toDisplayString(typeof (match == null ? void 0 : match.away_scores[4]) !== "undefined" ? match == null ? void 0 : match.away_scores[4] : ""), 1)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createTextVNode(" - ")
                          ], 64))
                        ]),
                        createVNode("div", { class: "col-9 col-sm-9 col-md-2 col-lg-2 text-end d-inline-block d-sm-inline-block d-md-none align-self-center" }, [
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-10 col-sm-10 text-start align-self-center" }, [
                              createVNode("div", { id: "ht" }, [
                                createTextVNode(toDisplayString((_x2 = match == null ? void 0 : match.home_team) == null ? void 0 : _x2.name) + " ", 1),
                                isShowRanking.value ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  id: "horder",
                                  class: "team-hg"
                                }, toDisplayString((match == null ? void 0 : match.home_position) ? "[" + (match == null ? void 0 : match.home_position) + "]" : ""), 1)) : createCommentVNode("", true),
                                (match == null ? void 0 : match.home_scores[3]) && isShowCardYellow.value ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "yellow1 mx-1"
                                }, toDisplayString((match == null ? void 0 : match.home_scores[3]) ? match == null ? void 0 : match.home_scores[3] : ""), 1)) : createCommentVNode("", true),
                                (match == null ? void 0 : match.home_scores[2]) && isShowCardRed.value ? (openBlock(), createBlock("span", {
                                  key: 2,
                                  class: "redcard1 mx-1"
                                }, toDisplayString((match == null ? void 0 : match.home_scores[2]) ? match == null ? void 0 : match.home_scores[2] : ""), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { id: "gt" }, [
                                createTextVNode(toDisplayString((_y2 = match == null ? void 0 : match.away_team) == null ? void 0 : _y2.name) + " ", 1),
                                (match == null ? void 0 : match.away_scores[2]) && isShowCardRed.value ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "redcard2 mx-1"
                                }, toDisplayString((match == null ? void 0 : match.away_scores[2]) ? match == null ? void 0 : match.away_scores[2] : ""), 1)) : createCommentVNode("", true),
                                (match == null ? void 0 : match.away_scores[3]) && isShowCardYellow.value ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "yellow2 mx-1"
                                }, toDisplayString((match == null ? void 0 : match.away_scores[3]) ? match == null ? void 0 : match.away_scores[3] : ""), 1)) : createCommentVNode("", true),
                                isShowRanking.value ? (openBlock(), createBlock("span", {
                                  key: 2,
                                  id: "gorder",
                                  class: "team-hg"
                                }, toDisplayString((match == null ? void 0 : match.away_position) ? "[" + (match == null ? void 0 : match.away_position) + "]" : ""), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("div", { class: "col-1 col-sm-1 text-center align-self-center" }, [
                              ![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status) ? (openBlock(), createBlock("span", {
                                key: 0,
                                id: "hht"
                              }, [
                                createVNode("p", null, toDisplayString(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : ""), 1),
                                createVNode("p", null, toDisplayString(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : ""), 1)
                              ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createTextVNode(" - ")
                              ], 64))
                            ]),
                            createVNode("div", {
                              class: "col-1 col-sm-1 text-center align-self-center",
                              onMouseover: ($event) => handleMouseOver($event, match),
                              onMouseleave: handleMouseLeave
                            }, [
                              createVNode("b", null, [
                                ![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createVNode("p", null, toDisplayString(typeof (match == null ? void 0 : match.home_scores[0]) !== "undefined" ? match == null ? void 0 : match.home_scores[0] : ""), 1),
                                  createVNode("p", null, toDisplayString(typeof (match == null ? void 0 : match.away_scores[0]) !== "undefined" ? match == null ? void 0 : match.away_scores[0] : ""), 1)
                                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createTextVNode(" - ")
                                ], 64))
                              ])
                            ], 40, ["onMouseover"])
                          ])
                        ]),
                        createVNode("div", {
                          id: "ht",
                          class: ["text-end d-none d-sm-none d-md-inline-block align-self-center", { "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }]
                        }, [
                          isShowRanking.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            id: "horder",
                            class: "team-hg"
                          }, toDisplayString((match == null ? void 0 : match.home_position) ? "[" + (match == null ? void 0 : match.home_position) + "]" : ""), 1)) : createCommentVNode("", true),
                          (match == null ? void 0 : match.home_scores[3]) && isShowCardYellow.value ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: "yellow1 mx-1"
                          }, toDisplayString((match == null ? void 0 : match.home_scores[3]) ? match == null ? void 0 : match.home_scores[3] : ""), 1)) : createCommentVNode("", true),
                          (match == null ? void 0 : match.home_scores[2]) && isShowCardRed.value ? (openBlock(), createBlock("span", {
                            key: 2,
                            class: "redcard1 mx-1"
                          }, toDisplayString((match == null ? void 0 : match.home_scores[2]) ? match == null ? void 0 : match.home_scores[2] : ""), 1)) : createCommentVNode("", true),
                          createVNode("span", { class: "team-name" }, toDisplayString((_z2 = match == null ? void 0 : match.home_team) == null ? void 0 : _z2.name), 1)
                        ], 2),
                        createVNode("div", {
                          class: ["handpoint col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center", ("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_END.includes(match == null ? void 0 : match.status) ? "red" : "blue"],
                          onMouseover: ($event) => handleMouseOver($event, match),
                          onMouseleave: handleMouseLeave
                        }, [
                          createVNode("b", null, [
                            ![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createTextVNode(toDisplayString(typeof (match == null ? void 0 : match.home_scores[0]) !== "undefined" ? match == null ? void 0 : match.home_scores[0] : "") + " - " + toDisplayString(typeof (match == null ? void 0 : match.away_scores[0]) !== "undefined" ? match == null ? void 0 : match.away_scores[0] : ""), 1)
                            ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createTextVNode(" - ")
                            ], 64))
                          ])
                        ], 42, ["onMouseover"]),
                        createVNode("div", {
                          id: "gt",
                          class: ["d-none d-sm-none d-md-inline-block align-self-center", { "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }]
                        }, [
                          createVNode("span", { class: "team-name" }, toDisplayString((_A2 = match == null ? void 0 : match.away_team) == null ? void 0 : _A2.name), 1),
                          (match == null ? void 0 : match.away_scores[2]) && isShowCardRed.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "redcard2 mx-1"
                          }, toDisplayString((match == null ? void 0 : match.away_scores[2]) ? match == null ? void 0 : match.away_scores[2] : ""), 1)) : createCommentVNode("", true),
                          (match == null ? void 0 : match.away_scores[3]) && isShowCardYellow.value ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: "yellow2 mx-1"
                          }, toDisplayString((match == null ? void 0 : match.away_scores[3]) ? match == null ? void 0 : match.away_scores[3] : ""), 1)) : createCommentVNode("", true),
                          isShowRanking.value ? (openBlock(), createBlock("span", {
                            key: 2,
                            id: "gorder",
                            class: "team-hg"
                          }, toDisplayString((match == null ? void 0 : match.away_position) ? "[" + (match == null ? void 0 : match.away_position) + "]" : ""), 1)) : createCommentVNode("", true)
                        ], 2),
                        createVNode("div", {
                          class: "col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center",
                          onClick: withModifiers(($event) => handleClickCorner($event, match), ["prevent"])
                        }, [
                          ![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status) ? (openBlock(), createBlock("span", {
                            key: 0,
                            id: "cr",
                            class: "conner_span"
                          }, toDisplayString(typeof (match == null ? void 0 : match.home_scores[4]) !== "undefined" ? match == null ? void 0 : match.home_scores[4] : "") + "-" + toDisplayString(typeof (match == null ? void 0 : match.away_scores[4]) !== "undefined" ? match == null ? void 0 : match.away_scores[4] : ""), 1)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createTextVNode(" - ")
                          ], 64))
                        ], 8, ["onClick"]),
                        createVNode("div", { class: "col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" }, [
                          ![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status) ? (openBlock(), createBlock("span", {
                            key: 0,
                            id: "hht",
                            style: { "display": "block" }
                          }, toDisplayString(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : "") + "-" + toDisplayString(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : ""), 1)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createTextVNode(" - ")
                          ], 64))
                        ]),
                        createVNode("div", { class: "toolimg col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" }, [
                          createVNode("span", {
                            class: "analyze-icon l0",
                            onClick: withModifiers(($event) => ("locationHref" in _ctx ? _ctx.locationHref : unref(locationHref))(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + (match == null ? void 0 : match.id) + "?tab=h2h"), ["prevent"])
                          }, [
                            createVNode("i", {
                              class: "icon iconfont icon-analysis",
                              title: "Ph\xE2n t\xEDch"
                            })
                          ], 8, ["onClick"]),
                          (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE || (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).FAVORITES ? (openBlock(), createBlock("span", {
                            key: 0,
                            id: "flashSpan_" + (match == null ? void 0 : match.id),
                            class: "matchdata-iconpc l0",
                            onClick: withModifiers(($event) => toggleSubInfoSport($event, match), ["prevent"])
                          }, [
                            createVNode("span", {
                              class: ["icon icon-pc icon-matchdata-pc", (match == null ? void 0 : match.id) === matchActiveLiveFlash.value ? "on" : ""],
                              title: "D\u1EEF li\u1EC7u"
                            }, null, 2)
                          ], 8, ["id", "onClick"])) : createCommentVNode("", true)
                        ]),
                        isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "col-3 col-sm-3 col-md-2 col-lg-2 align-self-center oddstd",
                          onMouseenter: ($event) => handleMouseOverOdds($event, match),
                          onMouseleave: handleMouseLeaveOdds
                        }, [
                          createVNode("div", {
                            class: "text-center",
                            style: { "min-height": "42px" }
                          }, [
                            createVNode(_component_ClientOnly, null, {
                              default: withCtx(() => [
                                createVNode("table", null, [
                                  createVNode("tbody", null, [
                                    createVNode("tr", null, [
                                      createVNode("td", null, [
                                        isShowOddsHDP.value ? (openBlock(), createBlock("p", {
                                          key: 0,
                                          class: "odds1",
                                          innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 0, 1, true)
                                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                        isShowOddsTX.value ? (openBlock(), createBlock("p", {
                                          key: 1,
                                          class: "odds2",
                                          innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 1, 1, true)
                                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                        isShowOdds1X2.value ? (openBlock(), createBlock("p", {
                                          key: 2,
                                          class: "odds3",
                                          innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 2, 0)
                                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                                      ]),
                                      isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value ? (openBlock(), createBlock("td", {
                                        key: 0,
                                        class: "oddstd"
                                      }, [
                                        isShowOddsHDP.value ? (openBlock(), createBlock("p", {
                                          key: 0,
                                          class: "odds1",
                                          innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 0, 0)
                                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                        isShowOddsTX.value ? (openBlock(), createBlock("p", {
                                          key: 1,
                                          class: "odds2",
                                          innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 1, 0)
                                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                        isShowOdds1X2.value ? (openBlock(), createBlock("p", {
                                          key: 2,
                                          class: "odds3",
                                          innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 2, 1)
                                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                                      ])) : createCommentVNode("", true),
                                      isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value ? (openBlock(), createBlock("td", {
                                        key: 1,
                                        class: "oddstd"
                                      }, [
                                        isShowOddsHDP.value ? (openBlock(), createBlock("p", {
                                          key: 0,
                                          class: "odds1",
                                          innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 0, 2, true)
                                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                        isShowOddsTX.value ? (openBlock(), createBlock("p", {
                                          key: 1,
                                          class: "odds2",
                                          innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 1, 2, true)
                                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                        isShowOdds1X2.value ? (openBlock(), createBlock("p", {
                                          key: 2,
                                          class: "odds3",
                                          innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 2, 2)
                                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                                      ])) : createCommentVNode("", true)
                                    ])
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ], 40, ["onMouseenter"])) : createCommentVNode("", true)
                      ], 8, ["id"]), [
                        [vShow, !toggleCompetition.value.includes(index)]
                      ]),
                      createVNode("div", { class: "table_matchdata" }, [
                        (match == null ? void 0 : match.id) === matchActiveLiveFlash.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          id: "trF_" + (match == null ? void 0 : match.id),
                          bgcolor: "#FFFFFF"
                        }, [
                          createVNode("div", {
                            colspan: "13",
                            align: "center",
                            height: "18",
                            id: "flashLive_" + (match == null ? void 0 : match.id)
                          }, [
                            createVNode("div", { class: "ant row" }, [
                              createVNode("div", { class: "flash col-6 p-0" }, [
                                createVNode("div", { class: "nodata" }, [
                                  createVNode(_component_Loading)
                                ]),
                                createVNode("iframe", {
                                  id: "flash",
                                  src: "https://tracker.sportdb.live/?code=" + keyEncode.value + "&id=" + (match == null ? void 0 : match.id),
                                  onload: "this.previousSibling.style.display='none'"
                                }, null, 8, ["src"])
                              ]),
                              createVNode("div", { class: "matchdata col-6 p-0" }, [
                                createVNode("div", { class: "databtns" }, [
                                  createVNode("div", {
                                    class: "btns",
                                    id: "divBtns"
                                  }, [
                                    createVNode("span", {
                                      class: ["btn_scoredconceded", { "on": activeSection.value === "scoredConceded" }],
                                      onClick: withModifiers(($event) => setActiveSection($event, match, "scoredConceded"), ["prevent"])
                                    }, "Ghi", 10, ["onClick"]),
                                    createVNode("span", {
                                      class: ["btn_recentstatus", { "on": activeSection.value === "recentStatus" }],
                                      onClick: withModifiers(($event) => setActiveSection($event, match, "recentStatus"), ["prevent"])
                                    }, "Phong \u0111\u1ED9", 10, ["onClick"])
                                  ])
                                ]),
                                withDirectives(createVNode("div", {
                                  class: "recentStatus",
                                  id: "recentStatus"
                                }, [
                                  createVNode("div", { class: "liveBox mx2" }, [
                                    ((_C2 = matchRecentResult.value) == null ? void 0 : _C2[(_B2 = match == null ? void 0 : match.home_team) == null ? void 0 : _B2.id]) || ((_E2 = matchRecentResult.value) == null ? void 0 : _E2[(_D2 = match == null ? void 0 : match.away_team) == null ? void 0 : _D2.id]) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      createVNode("div", { class: "lb-title" }, "6 tr\u1EADn g\u1EA7n \u0111\xE2y"),
                                      createVNode("div", { class: "lb-ms" }, [
                                        createVNode("span", {
                                          class: "homeSix",
                                          innerHTML: (_G2 = matchRecentResult.value) == null ? void 0 : _G2[(_F2 = match == null ? void 0 : match.home_team) == null ? void 0 : _F2.id]
                                        }, null, 8, ["innerHTML"]),
                                        createVNode("span", { class: "lb-m" }, [
                                          createVNode("span")
                                        ]),
                                        createVNode("span", {
                                          class: "guestSix",
                                          innerHTML: (_I2 = matchRecentResult.value) == null ? void 0 : _I2[(_H2 = match == null ? void 0 : match.away_team) == null ? void 0 : _H2.id]
                                        }, null, 8, ["innerHTML"])
                                      ])
                                    ], 64)) : createCommentVNode("", true),
                                    ((_J2 = matchSummary.value) == null ? void 0 : _J2.stats) ? (openBlock(), createBlock("ul", { key: 1 }, [
                                      createVNode("li", null, [
                                        (openBlock(true), createBlock(Fragment, null, renderList((_K2 = matchSummary.value) == null ? void 0 : _K2.stats, (stat, index2) => {
                                          return openBlock(), createBlock(Fragment, { key: index2 }, [
                                            createVNode("div", { class: "lb-td1" }, [
                                              createVNode("span", { class: "left red" }, toDisplayString(stat == null ? void 0 : stat.home), 1),
                                              createVNode("span", { class: "center" }, toDisplayString(("getStats" in _ctx ? _ctx.getStats : unref(getStats))(stat == null ? void 0 : stat.type)), 1),
                                              createVNode("span", { class: "right" }, toDisplayString(stat == null ? void 0 : stat.away), 1)
                                            ]),
                                            createVNode("div", { class: "lb-td2" }, [
                                              createVNode("span", { class: "home-w" }, [
                                                createVNode("span", {
                                                  class: "home-bar",
                                                  style: "width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.home) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%"
                                                }, null, 4)
                                              ]),
                                              createVNode("span", { class: "guest-w" }, [
                                                createVNode("span", {
                                                  class: "guest-bar",
                                                  style: "width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.away) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%"
                                                }, null, 4)
                                              ])
                                            ])
                                          ], 64);
                                        }), 128))
                                      ])
                                    ])) : createCommentVNode("", true)
                                  ])
                                ], 512), [
                                  [vShow, activeSection.value === "recentStatus"]
                                ]),
                                activeSection.value === "scoredConceded" ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "guessBox scoredConceded",
                                  id: "guessDiv"
                                }, [
                                  createVNode("table", { width: "100%" }, [
                                    createVNode("tbody", null, [
                                      createVNode("tr", null, [
                                        createVNode("th", { colspan: "5" }, [
                                          createVNode("div", { class: "cvd" }, [
                                            createVNode("div", { class: "btns" }, [
                                              createVNode("span", {
                                                class: ["thirtygames", { "on": activeSectionTable.value === "ThirtyGames" }],
                                                onClick: withModifiers(($event) => setActiveSectionTable("ThirtyGames"), ["prevent"])
                                              }, "20 tr\u1EADn", 10, ["onClick"])
                                            ])
                                          ])
                                        ])
                                      ])
                                    ])
                                  ]),
                                  activeSectionTable.value === "ThirtyGames" ? (openBlock(), createBlock("table", {
                                    key: 0,
                                    width: "100%",
                                    cellspacing: "1",
                                    cellpadding: "0",
                                    id: "JSQ_2404596_30",
                                    class: "ThirtyGames"
                                  }, [
                                    createVNode("tbody", null, [
                                      createVNode("tr", null, [
                                        createVNode("td", { width: "20%" }, "Ch\u1EE7"),
                                        createVNode("td", {
                                          width: "20%",
                                          class: "y"
                                        }, "Ph\xFAt"),
                                        createVNode("td", { width: "20%" }, "Kh\xE1ch")
                                      ]),
                                      ((_N2 = (_M2 = (_L2 = matchesAnalysis.value) == null ? void 0 : _L2.home_shoot_time) == null ? void 0 : _M2[0]) == null ? void 0 : _N2.length) > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList((_P2 = (_O2 = matchesAnalysis.value) == null ? void 0 : _O2.home_shoot_time) == null ? void 0 : _P2[0], (value, index2) => {
                                        var _a52, _b52, _c52, _d52, _e5, _f5, _g5, _h5, _i5, _j5;
                                        return openBlock(), createBlock("tr", { key: index2 }, [
                                          createVNode("td", null, toDisplayString(((_a52 = shootTime.value) == null ? void 0 : _a52["sumHome"]) > 0 ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(value) * 100 / ((_b52 = shootTime.value) == null ? void 0 : _b52["sumHome"])).toFixed(0) : "0") + "%", 1),
                                          index2 === 4 ? (openBlock(), createBlock("td", {
                                            key: 0,
                                            class: "y"
                                          }, "41~45")) : index2 === 5 ? (openBlock(), createBlock("td", {
                                            key: 1,
                                            class: "y"
                                          }, "46~50")) : (openBlock(), createBlock("td", {
                                            key: 2,
                                            class: "y"
                                          }, [
                                            index2 < 4 ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(10 * index2 + 1) + "~" + toDisplayString(10 * (index2 + 1)), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(10 * (index2 - 1) + 1) + "~" + toDisplayString(10 * index2), 1))
                                          ])),
                                          createVNode("td", null, toDisplayString(((_c52 = shootTime.value) == null ? void 0 : _c52["sumAway"]) > 0 ? ((_f5 = (_e5 = (_d52 = matchesAnalysis.value) == null ? void 0 : _d52.away_shoot_time) == null ? void 0 : _e5[0]) == null ? void 0 : _f5[index2]) ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))((_i5 = (_h5 = (_g5 = matchesAnalysis.value) == null ? void 0 : _g5.away_shoot_time) == null ? void 0 : _h5[0]) == null ? void 0 : _i5[index2]) * 100 / ((_j5 = shootTime.value) == null ? void 0 : _j5["sumAway"])).toFixed(0) : "0" : "0") + "% ", 1)
                                        ]);
                                      }), 128)) : (openBlock(), createBlock("tr", { key: 1 }, [
                                        createVNode("td", { colspan: "3" }, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u")
                                      ]))
                                    ])
                                  ])) : createCommentVNode("", true)
                                ])) : createCommentVNode("", true)
                              ])
                            ])
                          ], 8, ["id"])
                        ], 8, ["id"])) : createCommentVNode("", true)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent));
            });
            _push(`<!--]--><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--><div><div colspan="11"><p class="text-center mb-5 load-more-data"></p></div></div>`);
        if (((_z = compsList.value) == null ? void 0 : _z.length) === 0 && (props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).MATCHES) {
          _push(`<div id="noFavTip"><div class="no_fav_data"><div id="nodatatip" class="no_data"><p class="title">Theo d\xF5i tr\u1EADn \u0111\u1EA5u</p><p class="">B\u1EA5m d\u1EA5u <i class="icon iconfont icon-font-collect-off"></i> \u0111\u1EC3 theo d\xF5i tr\u1EADn \u0111\u1EA5u</p><p><span class="searchbtn"><i class="icon iconfont icon-font-search"></i>T\xECm ki\u1EBFm tr\u1EADn \u0111\u1EA5u</span></p></div></div></div>`);
        } else if (((_A = compsList.value) == null ? void 0 : _A.length) === 0 && (props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).LEAGUES) {
          _push(`<div id="noFavTip"><div class="no_fav_data"><div id="nodatatip" class="no_data"><p class="title">Theo d\xF5i gi\u1EA3i \u0111\u1EA5u</p><p class="">B\u1EA5m d\u1EA5u <i class="icon iconfont icon-font-collect-off"></i> \u0111\u1EC3 theo d\xF5i gi\u1EA3i \u0111\u1EA5u</p><p><span class="searchbtn"><i class="icon iconfont icon-font-search"></i>T\xECm ki\u1EBFm gi\u1EA3i \u0111\u1EA5u</span></p></div></div></div>`);
        } else if (matchsListLength.value === 0 && (props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).TEAMS) {
          _push(`<div id="noFavTip"><div class="no_fav_data"><div id="nodatatip" class="no_data"><p class="title">Theo d\xF5i \u0111\u1ED9i b\xF3ng</p><p class="">B\u1EA5m d\u1EA5u <i class="icon iconfont icon-font-collect-off"></i> \u0111\u1EC3 theo d\xF5i \u0111\u1ED9i b\xF3ng</p><p><span class="searchbtn"><i class="icon iconfont icon-font-search"></i>T\xECm ki\u1EBFm \u0111\u1ED9i b\xF3ng</span></p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(renderTopList.value, (item, index) => {
          var _a32, _b32, _c32, _d32, _e32, _f32, _g32, _h32, _i32, _j32, _k3, _l3, _m2, _n2, _o2, _p2, _q2, _r2, _s2;
          _push(`<!--[-->`);
          if (index < limitData.value) {
            _push(`<!--[-->`);
            if (((_b32 = (_a32 = item == null ? void 0 : item[1]) == null ? void 0 : _a32[0]) == null ? void 0 : _b32.favouriteTeams) && (props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).TEAMS) {
              _push(`<!--[-->`);
              ssrRenderList((_d32 = (_c32 = item == null ? void 0 : item[1]) == null ? void 0 : _c32[0]) == null ? void 0 : _d32.favouriteTeams, (team, key) => {
                var _a4, _b4;
                _push(`<div class="row Leaguestitle fbHead isLeaTop" id="tr_2"><div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center add-div"><i class="icon iconfont icon-font-collect-off add-info-l l0 favL favL_25" title="Theo d\xF5i gi\u1EA3i \u0111\u1EA5u" style="${ssrRenderStyle(!((_a4 = favouritesTeams.value) == null ? void 0 : _a4.includes(team == null ? void 0 : team.id)) ? null : { display: "none" })}"></i><i class="icon iconfont l0 favL favL_284 on icon-font-collect-on add-info-l2" style="${ssrRenderStyle(((_b4 = favouritesTeams.value) == null ? void 0 : _b4.includes(team == null ? void 0 : team.id)) ? null : { display: "none" })}"></i></div><div class="col-9 col-sm-9 col-md-9 col-lg-9 align-self-center"><div class="l1"><span class="LGname">${ssrInterpolate(team == null ? void 0 : team.name)}</span></div></div><div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center"></div><div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center"><div class="l2"><span class="l5"><span style="${ssrRenderStyle(!toggleCompetition.value.includes(index) ? null : { display: "none" })}" class="hidden-info r0"><span id="collapse2" class="collapse" title="Thu g\u1ECDn"></span></span><span style="${ssrRenderStyle(toggleCompetition.value.includes(index) ? null : { display: "none" })}" class="display-info r0"><span id="expand2" class="expand"></span></span></span></div></div></div>`);
              });
              _push(`<!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="row Leaguestitle fbHead isLeaTop" id="tr_2"><div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center add-div" style="${ssrRenderStyle((props == null ? void 0 : props.favorites) !== ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).TEAMS ? null : { display: "none" })}"><i class="icon iconfont icon-font-collect-off add-info-l l0 favL favL_25" title="Theo d\xF5i gi\u1EA3i \u0111\u1EA5u" style="${ssrRenderStyle(!((_f32 = favouritesLeagues.value) == null ? void 0 : _f32.includes((_e32 = item == null ? void 0 : item[1]) == null ? void 0 : _e32[0].competition)) ? null : { display: "none" })}"></i><i class="icon iconfont l0 favL favL_284 on icon-font-collect-on add-info-l2" style="${ssrRenderStyle(((_h32 = favouritesLeagues.value) == null ? void 0 : _h32.includes((_g32 = item == null ? void 0 : item[1]) == null ? void 0 : _g32[0].competition)) ? null : { display: "none" })}"></i></div><div class="col-9 col-sm-9 col-md-9 col-lg-9 align-self-center"><div class="l1"><div class="league-img">`);
            _push(ssrRenderComponent(_component_nuxt_img, {
              src: unref(liveScoresImage) + (((_j32 = (_i32 = item == null ? void 0 : item[1]) == null ? void 0 : _i32[0]) == null ? void 0 : _j32.isFlatCountry) ? "country/" + ((_k3 = item == null ? void 0 : item[1]) == null ? void 0 : _k3[0].comp.country_logo) : "competition/" + ((_l3 = item == null ? void 0 : item[1]) == null ? void 0 : _l3[0].comp.logo_o)) + unref(imageHeight),
              alt: "",
              class: "cImg",
              style: { "display": "inline" }
            }, null, _parent));
            _push(`</div>`);
            _push(ssrRenderComponent(_component_nuxt_link, {
              to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).LEAGUES + "/" + ((_m2 = item == null ? void 0 : item[1]) == null ? void 0 : _m2[0].comp.id)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                var _a4, _b4;
                if (_push2) {
                  _push2(`<span class="LGname"${_scopeId}>${ssrInterpolate((_a4 = item == null ? void 0 : item[1]) == null ? void 0 : _a4[0].comp.name)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "LGname" }, toDisplayString((_b4 = item == null ? void 0 : item[1]) == null ? void 0 : _b4[0].comp.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div></div><div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center">`);
            if ((_p2 = (_o2 = (_n2 = item[1]) == null ? void 0 : _n2[0]) == null ? void 0 : _o2.stage) == null ? void 0 : _p2.season_id) {
              _push(ssrRenderComponent(_component_nuxt_link, {
                to: "/league/" + ((_s2 = (_r2 = compsListByKey.value.get((_q2 = item == null ? void 0 : item[1]) == null ? void 0 : _q2[0].competition)) == null ? void 0 : _r2[0]) == null ? void 0 : _s2.id),
                "aria-label": "Standing",
                style: { "display": "flex", "gap": "4px", "justify-content": "flex-end" }
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(_component_nuxt_img, {
                      src: "/img/rank.svg",
                      alt: "Standing",
                      title: "B\u1EA3ng x\u1EBFp h\u1EA1ng",
                      height: "24",
                      width: "24",
                      class: "rankicon",
                      style: { "display": "inline" }
                    }, null, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(_component_nuxt_img, {
                        src: "/img/rank.svg",
                        alt: "Standing",
                        title: "B\u1EA3ng x\u1EBFp h\u1EA1ng",
                        height: "24",
                        width: "24",
                        class: "rankicon",
                        style: { "display": "inline" }
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div><div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center"><div class="l2" style="${ssrRenderStyle((props == null ? void 0 : props.favorites) !== ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).TEAMS ? null : { display: "none" })}"><span class="l5"><span style="${ssrRenderStyle(!toggleCompetition.value.includes(index) ? null : { display: "none" })}" class="hidden-info r0"><span id="collapse2" class="collapse" title="Thu g\u1ECDn"></span></span><span style="${ssrRenderStyle(toggleCompetition.value.includes(index) ? null : { display: "none" })}" class="display-info r0"><span id="expand2" class="expand"></span></span></span></div></div></div>`);
            if (!toggleCompetition.value.includes(index)) {
              _push(`<!--[-->`);
              ssrRenderList(item[1], (match) => {
                _push(ssrRenderComponent(_component_nuxt_link, {
                  to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + (match == null ? void 0 : match.id),
                  class: "match row"
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    var _a5, _b5, _c5, _d5;
                    var _a4, _b4, _c4, _d4, _e4, _f4, _g4, _h4, _i4, _j4, _k4, _l4, _m3, _n3, _o3, _p3, _q3, _r3, _s3, _t2, _u2, _v2, _w2, _x2, _y2, _z2, _A2, _B2, _C2, _D2, _E2, _F2, _G2, _H2, _I2, _J2, _K2, _L2, _M2, _N2, _O2, _P2;
                    if (_push2) {
                      _push2(`<div class="row tds" style="${ssrRenderStyle([
                        { "min-height": "46px" },
                        !toggleCompetition.value.includes(index) ? null : { display: "none" }
                      ])}"${ssrRenderAttr("id", "tr1_" + (match == null ? void 0 : match.id))}${ssrRenderAttr("index", match == null ? void 0 : match.id)} leaindex="2"${_scopeId}><div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center"${_scopeId}><div class="add-div"${_scopeId}><i class="icon iconfont icon-font-collect-off add-info favM" title="Theo d\xF5i tr\u1EADn \u0111\u1EA5u" style="${ssrRenderStyle(!((_a4 = favouritesList.value) == null ? void 0 : _a4.includes(match == null ? void 0 : match.id)) ? null : { display: "none" })}"${_scopeId}></i><i class="icon iconfont favM on icon-font-collect-on add-info2" style="${ssrRenderStyle(((_b4 = favouritesList.value) == null ? void 0 : _b4.includes(match == null ? void 0 : match.id)) ? null : { display: "none" })}"${_scopeId}></i>`);
                      if ((match == null ? void 0 : match.available_stream) && unref(availableStreamUrl)) {
                        _push2(`<span target="_blank" class="d-none d-md-inline-block liveicon"${_scopeId}><span class="icon iconfont icon-icon-live2 live"${_scopeId}></span></span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div></div><div class="col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-none d-md-block"${_scopeId}><div name="timeData" id="mt"${_scopeId}>${(_a5 = ("getStatusDisplay" in _ctx ? _ctx.getStatusDisplay : unref(getStatusDisplay))(match, _ctx.$t, timeZone.value)) != null ? _a5 : ""}</div>`);
                      if (("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE.includes(match.status)) {
                        _push2(`<div style="${ssrRenderStyle({ "font-size": "12px", "color": "#27660a" })}"${_scopeId}>${ssrInterpolate(match.status === "12" ? "H\u1EE7y" : "Ho\xE3n")}</div>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div><div class="col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-sm-inline-block d-md-none"${_scopeId}><span class="time"${_scopeId}>${ssrInterpolate(unref(formatDateMomentUTCTimeZone)(match == null ? void 0 : match.match_time, "HH:mm", timeZone.value))}</span>`);
                      if ((match == null ? void 0 : match.available_stream) && unref(availableStreamUrl)) {
                        _push2(`<span target="_blank" class="liveicon"${_scopeId}><span class="icon iconfont icon-icon-live2 live"${_scopeId}></span></span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if (("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE.includes(match.status)) {
                        _push2(`<span style="${ssrRenderStyle({ "font-size": "12px", "color": "#27660a", "margin-left": "3px" })}"${_scopeId}>${ssrInterpolate(match.status === "12" ? "H\u1EE7y" : "Ho\xE3n")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div><div class="col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center"${_scopeId}><span class="hafttime_mobile"${_scopeId}></span></div><div class="col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center score bd_time_mobile"${_scopeId}><i class="injury fulltime_mobile"${_scopeId}><text${_scopeId}></text><text${_scopeId}>${(_b5 = ("getStatusDisplayMobile" in _ctx ? _ctx.getStatusDisplayMobile : unref(getStatusDisplayMobile))(match, _ctx.$t, timeZone.value)) != null ? _b5 : ""}</text></i></div><div class="col-3 col-sm-3 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center conner_mobile"${_scopeId}><i class="icon iconfont icon-font-report3"${_scopeId}></i>`);
                      if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                        _push2(`<span id="hht"${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : "")}-${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : "")}</span>`);
                      } else {
                        _push2(`<!--[--> - <!--]-->`);
                      }
                      _push2(`</div><div class="col-9 col-sm-9 col-md-2 col-lg-2 text-end d-inline-block d-sm-inline-block d-md-none align-self-center"${_scopeId}><div class="row"${_scopeId}><div class="col-10 col-sm-10 text-start align-self-center"${_scopeId}><div id="ht"${_scopeId}>${ssrInterpolate((_c4 = match == null ? void 0 : match.home_team) == null ? void 0 : _c4.name)} `);
                      if (isShowRanking.value) {
                        _push2(`<span id="horder" class="team-hg"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_position) ? "[" + (match == null ? void 0 : match.home_position) + "]" : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if ((match == null ? void 0 : match.home_scores[3]) && isShowCardYellow.value) {
                        _push2(`<span class="yellow1 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[3]) ? match == null ? void 0 : match.home_scores[3] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if ((match == null ? void 0 : match.home_scores[2]) && isShowCardRed.value) {
                        _push2(`<span class="redcard1 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[2]) ? match == null ? void 0 : match.home_scores[2] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div><div id="gt"${_scopeId}>${ssrInterpolate((_d4 = match == null ? void 0 : match.away_team) == null ? void 0 : _d4.name)} `);
                      if ((match == null ? void 0 : match.away_scores[2]) && isShowCardRed.value) {
                        _push2(`<span class="redcard2 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[2]) ? match == null ? void 0 : match.away_scores[2] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if ((match == null ? void 0 : match.away_scores[3]) && isShowCardYellow.value) {
                        _push2(`<span class="yellow2 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[3]) ? match == null ? void 0 : match.away_scores[3] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if (isShowRanking.value) {
                        _push2(`<span id="gorder" class="team-hg"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_position) ? "[" + (match == null ? void 0 : match.away_position) + "]" : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div></div><div class="col-1 col-sm-1 text-center align-self-center"${_scopeId}>`);
                      if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                        _push2(`<span id="hht"${_scopeId}><p${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : "")}</p><p${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : "")}</p></span>`);
                      } else {
                        _push2(`<!--[--> - <!--]-->`);
                      }
                      _push2(`</div><div class="col-1 col-sm-1 text-center align-self-center"${_scopeId}><b${_scopeId}>`);
                      if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                        _push2(`<!--[--><p${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[0]) !== "undefined" ? match == null ? void 0 : match.home_scores[0] : "")}</p><p${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[0]) !== "undefined" ? match == null ? void 0 : match.away_scores[0] : "")}</p><!--]-->`);
                      } else {
                        _push2(`<!--[--> - <!--]-->`);
                      }
                      _push2(`</b></div></div></div><div id="ht" class="${ssrRenderClass([{ "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }, "text-end d-none d-sm-none d-md-inline-block align-self-center"])}"${_scopeId}>`);
                      if (isShowRanking.value) {
                        _push2(`<span id="horder" class="team-hg"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_position) ? "[" + (match == null ? void 0 : match.home_position) + "]" : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if ((match == null ? void 0 : match.home_scores[3]) && isShowCardYellow.value) {
                        _push2(`<span class="yellow1 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[3]) ? match == null ? void 0 : match.home_scores[3] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if ((match == null ? void 0 : match.home_scores[2]) && isShowCardRed.value) {
                        _push2(`<span class="redcard1 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[2]) ? match == null ? void 0 : match.home_scores[2] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`<span class="team-name"${_scopeId}>${ssrInterpolate((_e4 = match == null ? void 0 : match.home_team) == null ? void 0 : _e4.name)}</span></div><div class="${ssrRenderClass([("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_END.includes(match == null ? void 0 : match.status) ? "red" : "blue", "handpoint col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center"])}"${_scopeId}><b${_scopeId}>`);
                      if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                        _push2(`<!--[-->${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[0]) !== "undefined" ? match == null ? void 0 : match.home_scores[0] : "")} - ${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[0]) !== "undefined" ? match == null ? void 0 : match.away_scores[0] : "")}<!--]-->`);
                      } else {
                        _push2(`<!--[--> - <!--]-->`);
                      }
                      _push2(`</b></div><div id="gt" class="${ssrRenderClass([{ "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }, "d-none d-sm-none d-md-inline-block align-self-center"])}"${_scopeId}><span class="team-name"${_scopeId}>${ssrInterpolate((_f4 = match == null ? void 0 : match.away_team) == null ? void 0 : _f4.name)}</span>`);
                      if ((match == null ? void 0 : match.away_scores[2]) && isShowCardRed.value) {
                        _push2(`<span class="redcard2 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[2]) ? match == null ? void 0 : match.away_scores[2] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if ((match == null ? void 0 : match.away_scores[3]) && isShowCardYellow.value) {
                        _push2(`<span class="yellow2 mx-1"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[3]) ? match == null ? void 0 : match.away_scores[3] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if (isShowRanking.value) {
                        _push2(`<span id="gorder" class="team-hg"${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_position) ? "[" + (match == null ? void 0 : match.away_position) + "]" : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center"${_scopeId}>`);
                      if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                        _push2(`<span id="cr" class="conner_span"${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[4]) !== "undefined" ? match == null ? void 0 : match.home_scores[4] : "")}-${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[4]) !== "undefined" ? match == null ? void 0 : match.away_scores[4] : "")}</span>`);
                      } else {
                        _push2(`<!--[--> - <!--]-->`);
                      }
                      _push2(`</div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center"${_scopeId}>`);
                      if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                        _push2(`<span id="hht" style="${ssrRenderStyle({ "display": "block" })}"${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : "")}-${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : "")}</span>`);
                      } else {
                        _push2(`<!--[--> - <!--]-->`);
                      }
                      _push2(`</div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center toolimg"${_scopeId}><span class="analyze-icon l0"${_scopeId}><i class="icon iconfont icon-analysis" title="Ph\xE2n t\xEDch"${_scopeId}></i></span>`);
                      if ((props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE || (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).FAVORITES) {
                        _push2(`<span${ssrRenderAttr("id", "flashSpan_" + (match == null ? void 0 : match.id))} class="matchdata-iconpc l0"${_scopeId}><span title="D\u1EEF li\u1EC7u" class="${ssrRenderClass([(match == null ? void 0 : match.id) === matchActiveLiveFlash.value ? "on" : "", "icon icon-pc icon-matchdata-pc"])}"${_scopeId}></span></span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div>`);
                      if (isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) {
                        _push2(`<div class="col-3 col-sm-3 col-md-2 col-lg-2 align-self-center oddstd"${_scopeId}><div class="text-center oddstd-grid" style="${ssrRenderStyle({ "min-height": "42px" })}"${_scopeId}>`);
                        _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
                        _push2(`</div></div>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div><div class="table_matchdata p-0"${_scopeId}>`);
                      if ((match == null ? void 0 : match.id) === matchActiveLiveFlash.value) {
                        _push2(`<div${ssrRenderAttr("id", "trF_" + (match == null ? void 0 : match.id))} bgcolor="#FFFFFF"${_scopeId}><div colspan="13" align="center" height="18"${ssrRenderAttr("id", "flashLive_" + (match == null ? void 0 : match.id))}${_scopeId}><div class="ant row"${_scopeId}><div class="flash col-6 p-0"${_scopeId}><div class="nodata"${_scopeId}>`);
                        _push2(ssrRenderComponent(_component_Loading, null, null, _parent2, _scopeId));
                        _push2(`</div><iframe id="flash"${ssrRenderAttr("src", "https://tracker.sportdb.live/?code=" + keyEncode.value + "&id=" + (match == null ? void 0 : match.id))} onload="this.previousSibling.style.display=&#39;none&#39;"${_scopeId}></iframe></div><div class="matchdata col-6 p-0"${_scopeId}><div class="databtns"${_scopeId}><div class="btns" id="divBtns"${_scopeId}><span class="${ssrRenderClass([{ "on": activeSection.value === "scoredConceded" }, "btn_scoredconceded"])}"${_scopeId}>Ghi</span><span class="${ssrRenderClass([{ "on": activeSection.value === "recentStatus" }, "btn_recentstatus"])}"${_scopeId}>Phong \u0111\u1ED9</span></div></div><div class="recentStatus" id="recentStatus" style="${ssrRenderStyle(activeSection.value === "recentStatus" ? null : { display: "none" })}"${_scopeId}><div class="liveBox mx2"${_scopeId}>`);
                        if (((_h4 = matchRecentResult.value) == null ? void 0 : _h4[(_g4 = match == null ? void 0 : match.home_team) == null ? void 0 : _g4.id]) || ((_j4 = matchRecentResult.value) == null ? void 0 : _j4[(_i4 = match == null ? void 0 : match.away_team) == null ? void 0 : _i4.id])) {
                          _push2(`<!--[--><div class="lb-title"${_scopeId}>6 tr\u1EADn g\u1EA7n \u0111\xE2y</div><div class="lb-ms"${_scopeId}><span class="homeSix"${_scopeId}>${(_c5 = (_l4 = matchRecentResult.value) == null ? void 0 : _l4[(_k4 = match == null ? void 0 : match.home_team) == null ? void 0 : _k4.id]) != null ? _c5 : ""}</span><span class="lb-m"${_scopeId}><span${_scopeId}></span></span><span class="guestSix"${_scopeId}>${(_d5 = (_n3 = matchRecentResult.value) == null ? void 0 : _n3[(_m3 = match == null ? void 0 : match.away_team) == null ? void 0 : _m3.id]) != null ? _d5 : ""}</span></div><!--]-->`);
                        } else {
                          _push2(`<!---->`);
                        }
                        if ((_o3 = matchSummary.value) == null ? void 0 : _o3.stats) {
                          _push2(`<ul${_scopeId}><li${_scopeId}><!--[-->`);
                          ssrRenderList((_p3 = matchSummary.value) == null ? void 0 : _p3.stats, (stat, index2) => {
                            _push2(`<!--[--><div class="lb-td1"${_scopeId}><span class="left red"${_scopeId}>${ssrInterpolate(stat == null ? void 0 : stat.home)}</span><span class="center"${_scopeId}>${ssrInterpolate(("getStats" in _ctx ? _ctx.getStats : unref(getStats))(stat == null ? void 0 : stat.type))}</span><span class="right"${_scopeId}>${ssrInterpolate(stat == null ? void 0 : stat.away)}</span></div><div class="lb-td2"${_scopeId}><span class="home-w"${_scopeId}><span class="home-bar" style="${ssrRenderStyle("width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.home) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%")}"${_scopeId}></span></span><span class="guest-w"${_scopeId}><span class="guest-bar" style="${ssrRenderStyle("width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.away) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%")}"${_scopeId}></span></span></div><!--]-->`);
                          });
                          _push2(`<!--]--></li></ul>`);
                        } else {
                          _push2(`<!---->`);
                        }
                        _push2(`</div></div><div class="guessBox scoredConceded" id="guessDiv" style="${ssrRenderStyle(activeSection.value === "scoredConceded" ? null : { display: "none" })}"${_scopeId}><table width="100%"${_scopeId}><tbody${_scopeId}><tr${_scopeId}><th colspan="5"${_scopeId}><div class="cvd"${_scopeId}><div class="btns"${_scopeId}><span class="${ssrRenderClass([{ "on": activeSectionTable.value === "ThirtyGames" }, "thirtygames"])}"${_scopeId}>20 tr\u1EADn</span></div></div></th></tr></tbody></table><table width="100%" cellspacing="1" cellpadding="0" id="JSQ_2404596_30" class="ThirtyGames" style="${ssrRenderStyle(activeSectionTable.value === "ThirtyGames" ? null : { display: "none" })}"${_scopeId}><tbody${_scopeId}><tr${_scopeId}><td width="20%"${_scopeId}>Ch\u1EE7</td><td width="20%" class="y"${_scopeId}>Ph\xFAt</td><td width="20%"${_scopeId}>Kh\xE1ch</td></tr>`);
                        if (((_s3 = (_r3 = (_q3 = matchesAnalysis.value) == null ? void 0 : _q3.home_shoot_time) == null ? void 0 : _r3[0]) == null ? void 0 : _s3.length) > 0) {
                          _push2(`<!--[-->`);
                          ssrRenderList((_u2 = (_t2 = matchesAnalysis.value) == null ? void 0 : _t2.home_shoot_time) == null ? void 0 : _u2[0], (value, index2) => {
                            var _a52, _b52, _c52, _d52, _e5, _f5, _g5, _h5, _i5, _j5;
                            _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(((_a52 = shootTime.value) == null ? void 0 : _a52["sumHome"]) > 0 ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(value) * 100 / ((_b52 = shootTime.value) == null ? void 0 : _b52["sumHome"])).toFixed(0) : "0")}%</td>`);
                            if (index2 === 4) {
                              _push2(`<td class="y"${_scopeId}>41~45</td>`);
                            } else if (index2 === 5) {
                              _push2(`<td class="y"${_scopeId}>46~50</td>`);
                            } else {
                              _push2(`<td class="y"${_scopeId}>`);
                              if (index2 < 4) {
                                _push2(`<span${_scopeId}>${ssrInterpolate(10 * index2 + 1)}~${ssrInterpolate(10 * (index2 + 1))}</span>`);
                              } else {
                                _push2(`<span${_scopeId}>${ssrInterpolate(10 * (index2 - 1) + 1)}~${ssrInterpolate(10 * index2)}</span>`);
                              }
                              _push2(`</td>`);
                            }
                            _push2(`<td${_scopeId}>${ssrInterpolate(((_c52 = shootTime.value) == null ? void 0 : _c52["sumAway"]) > 0 ? ((_f5 = (_e5 = (_d52 = matchesAnalysis.value) == null ? void 0 : _d52.away_shoot_time) == null ? void 0 : _e5[0]) == null ? void 0 : _f5[index2]) ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))((_i5 = (_h5 = (_g5 = matchesAnalysis.value) == null ? void 0 : _g5.away_shoot_time) == null ? void 0 : _h5[0]) == null ? void 0 : _i5[index2]) * 100 / ((_j5 = shootTime.value) == null ? void 0 : _j5["sumAway"])).toFixed(0) : "0" : "0")}% </td></tr>`);
                          });
                          _push2(`<!--]-->`);
                        } else {
                          _push2(`<tr${_scopeId}><td colspan="3"${_scopeId}>Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u</td></tr>`);
                        }
                        _push2(`</tbody></table></div></div></div></div></div>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div>`);
                    } else {
                      return [
                        withDirectives(createVNode("div", {
                          class: "row tds",
                          style: { "min-height": "46px" },
                          id: "tr1_" + (match == null ? void 0 : match.id),
                          index: match == null ? void 0 : match.id,
                          leaindex: "2"
                        }, [
                          createVNode("div", { class: "col-1 col-sm-1 col-md-1 col-lg-1 align-self-center" }, [
                            createVNode("div", { class: "add-div" }, [
                              withDirectives(createVNode("i", {
                                class: "icon iconfont icon-font-collect-off add-info favM",
                                title: "Theo d\xF5i tr\u1EADn \u0111\u1EA5u",
                                onClick: withModifiers(($event) => addFavourites(match == null ? void 0 : match.id), ["prevent"])
                              }, null, 8, ["onClick"]), [
                                [vShow, !((_v2 = favouritesList.value) == null ? void 0 : _v2.includes(match == null ? void 0 : match.id))]
                              ]),
                              withDirectives(createVNode("i", {
                                class: "icon iconfont favM on icon-font-collect-on add-info2",
                                onClick: withModifiers(($event) => removeFavourites(match == null ? void 0 : match.id), ["prevent"])
                              }, null, 8, ["onClick"]), [
                                [vShow, (_w2 = favouritesList.value) == null ? void 0 : _w2.includes(match == null ? void 0 : match.id)]
                              ]),
                              (match == null ? void 0 : match.available_stream) && unref(availableStreamUrl) ? (openBlock(), createBlock("span", {
                                key: 0,
                                target: "_blank",
                                onClick: withModifiers(($event) => ("locationHref" in _ctx ? _ctx.locationHref : unref(locationHref))(unref(availableStreamUrl) + "?ls-id=" + (match == null ? void 0 : match.id), true), ["prevent"]),
                                class: "d-none d-md-inline-block liveicon"
                              }, [
                                createVNode("span", { class: "icon iconfont icon-icon-live2 live" })
                              ], 8, ["onClick"])) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-none d-md-block" }, [
                            createVNode("div", {
                              name: "timeData",
                              id: "mt",
                              innerHTML: ("getStatusDisplay" in _ctx ? _ctx.getStatusDisplay : unref(getStatusDisplay))(match, _ctx.$t, timeZone.value)
                            }, null, 8, ["innerHTML"]),
                            ("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE.includes(match.status) ? (openBlock(), createBlock("div", {
                              key: 0,
                              style: { "font-size": "12px", "color": "#27660a" }
                            }, toDisplayString(match.status === "12" ? "H\u1EE7y" : "Ho\xE3n"), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-sm-inline-block d-md-none" }, [
                            createVNode("span", { class: "time" }, toDisplayString(unref(formatDateMomentUTCTimeZone)(match == null ? void 0 : match.match_time, "HH:mm", timeZone.value)), 1),
                            (match == null ? void 0 : match.available_stream) && unref(availableStreamUrl) ? (openBlock(), createBlock("span", {
                              key: 0,
                              target: "_blank",
                              class: "liveicon",
                              onClick: withModifiers(($event) => ("locationHref" in _ctx ? _ctx.locationHref : unref(locationHref))(unref(availableStreamUrl) + "?ls-id=" + (match == null ? void 0 : match.id), true), ["prevent"])
                            }, [
                              createVNode("span", { class: "icon iconfont icon-icon-live2 live" })
                            ], 8, ["onClick"])) : createCommentVNode("", true),
                            ("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE.includes(match.status) ? (openBlock(), createBlock("span", {
                              key: 1,
                              style: { "font-size": "12px", "color": "#27660a", "margin-left": "3px" }
                            }, toDisplayString(match.status === "12" ? "H\u1EE7y" : "Ho\xE3n"), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center" }, [
                            createVNode("span", { class: "hafttime_mobile" })
                          ]),
                          createVNode("div", { class: "col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center score bd_time_mobile" }, [
                            createVNode("i", { class: "injury fulltime_mobile" }, [
                              createVNode("text"),
                              createVNode("text", {
                                innerHTML: ("getStatusDisplayMobile" in _ctx ? _ctx.getStatusDisplayMobile : unref(getStatusDisplayMobile))(match, _ctx.$t, timeZone.value)
                              }, null, 8, ["innerHTML"])
                            ])
                          ]),
                          createVNode("div", { class: "col-3 col-sm-3 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center conner_mobile" }, [
                            createVNode("i", { class: "icon iconfont icon-font-report3" }),
                            ![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status) ? (openBlock(), createBlock("span", {
                              key: 0,
                              id: "hht"
                            }, toDisplayString(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : "") + "-" + toDisplayString(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : ""), 1)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createTextVNode(" - ")
                            ], 64))
                          ]),
                          createVNode("div", { class: "col-9 col-sm-9 col-md-2 col-lg-2 text-end d-inline-block d-sm-inline-block d-md-none align-self-center" }, [
                            createVNode("div", { class: "row" }, [
                              createVNode("div", { class: "col-10 col-sm-10 text-start align-self-center" }, [
                                createVNode("div", { id: "ht" }, [
                                  createTextVNode(toDisplayString((_x2 = match == null ? void 0 : match.home_team) == null ? void 0 : _x2.name) + " ", 1),
                                  isShowRanking.value ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    id: "horder",
                                    class: "team-hg"
                                  }, toDisplayString((match == null ? void 0 : match.home_position) ? "[" + (match == null ? void 0 : match.home_position) + "]" : ""), 1)) : createCommentVNode("", true),
                                  (match == null ? void 0 : match.home_scores[3]) && isShowCardYellow.value ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "yellow1 mx-1"
                                  }, toDisplayString((match == null ? void 0 : match.home_scores[3]) ? match == null ? void 0 : match.home_scores[3] : ""), 1)) : createCommentVNode("", true),
                                  (match == null ? void 0 : match.home_scores[2]) && isShowCardRed.value ? (openBlock(), createBlock("span", {
                                    key: 2,
                                    class: "redcard1 mx-1"
                                  }, toDisplayString((match == null ? void 0 : match.home_scores[2]) ? match == null ? void 0 : match.home_scores[2] : ""), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { id: "gt" }, [
                                  createTextVNode(toDisplayString((_y2 = match == null ? void 0 : match.away_team) == null ? void 0 : _y2.name) + " ", 1),
                                  (match == null ? void 0 : match.away_scores[2]) && isShowCardRed.value ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "redcard2 mx-1"
                                  }, toDisplayString((match == null ? void 0 : match.away_scores[2]) ? match == null ? void 0 : match.away_scores[2] : ""), 1)) : createCommentVNode("", true),
                                  (match == null ? void 0 : match.away_scores[3]) && isShowCardYellow.value ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "yellow2 mx-1"
                                  }, toDisplayString((match == null ? void 0 : match.away_scores[3]) ? match == null ? void 0 : match.away_scores[3] : ""), 1)) : createCommentVNode("", true),
                                  isShowRanking.value ? (openBlock(), createBlock("span", {
                                    key: 2,
                                    id: "gorder",
                                    class: "team-hg"
                                  }, toDisplayString((match == null ? void 0 : match.away_position) ? "[" + (match == null ? void 0 : match.away_position) + "]" : ""), 1)) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("div", { class: "col-1 col-sm-1 text-center align-self-center" }, [
                                ![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status) ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  id: "hht"
                                }, [
                                  createVNode("p", null, toDisplayString(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : ""), 1),
                                  createVNode("p", null, toDisplayString(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : ""), 1)
                                ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createTextVNode(" - ")
                                ], 64))
                              ]),
                              createVNode("div", {
                                class: "col-1 col-sm-1 text-center align-self-center",
                                onMouseenter: ($event) => handleMouseOver($event, match),
                                onMouseleave: handleMouseLeave
                              }, [
                                createVNode("b", null, [
                                  ![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createVNode("p", null, toDisplayString(typeof (match == null ? void 0 : match.home_scores[0]) !== "undefined" ? match == null ? void 0 : match.home_scores[0] : ""), 1),
                                    createVNode("p", null, toDisplayString(typeof (match == null ? void 0 : match.away_scores[0]) !== "undefined" ? match == null ? void 0 : match.away_scores[0] : ""), 1)
                                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    createTextVNode(" - ")
                                  ], 64))
                                ])
                              ], 40, ["onMouseenter"])
                            ])
                          ]),
                          createVNode("div", {
                            id: "ht",
                            class: ["text-end d-none d-sm-none d-md-inline-block align-self-center", { "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }]
                          }, [
                            isShowRanking.value ? (openBlock(), createBlock("span", {
                              key: 0,
                              id: "horder",
                              class: "team-hg"
                            }, toDisplayString((match == null ? void 0 : match.home_position) ? "[" + (match == null ? void 0 : match.home_position) + "]" : ""), 1)) : createCommentVNode("", true),
                            (match == null ? void 0 : match.home_scores[3]) && isShowCardYellow.value ? (openBlock(), createBlock("span", {
                              key: 1,
                              class: "yellow1 mx-1"
                            }, toDisplayString((match == null ? void 0 : match.home_scores[3]) ? match == null ? void 0 : match.home_scores[3] : ""), 1)) : createCommentVNode("", true),
                            (match == null ? void 0 : match.home_scores[2]) && isShowCardRed.value ? (openBlock(), createBlock("span", {
                              key: 2,
                              class: "redcard1 mx-1"
                            }, toDisplayString((match == null ? void 0 : match.home_scores[2]) ? match == null ? void 0 : match.home_scores[2] : ""), 1)) : createCommentVNode("", true),
                            createVNode("span", { class: "team-name" }, toDisplayString((_z2 = match == null ? void 0 : match.home_team) == null ? void 0 : _z2.name), 1)
                          ], 2),
                          createVNode("div", {
                            class: ["handpoint col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center", ("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_END.includes(match == null ? void 0 : match.status) ? "red" : "blue"],
                            onMouseenter: ($event) => handleMouseOver($event, match),
                            onMouseleave: handleMouseLeave
                          }, [
                            createVNode("b", null, [
                              ![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createTextVNode(toDisplayString(typeof (match == null ? void 0 : match.home_scores[0]) !== "undefined" ? match == null ? void 0 : match.home_scores[0] : "") + " - " + toDisplayString(typeof (match == null ? void 0 : match.away_scores[0]) !== "undefined" ? match == null ? void 0 : match.away_scores[0] : ""), 1)
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createTextVNode(" - ")
                              ], 64))
                            ])
                          ], 42, ["onMouseenter"]),
                          createVNode("div", {
                            id: "gt",
                            class: ["d-none d-sm-none d-md-inline-block align-self-center", { "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }]
                          }, [
                            createVNode("span", { class: "team-name" }, toDisplayString((_A2 = match == null ? void 0 : match.away_team) == null ? void 0 : _A2.name), 1),
                            (match == null ? void 0 : match.away_scores[2]) && isShowCardRed.value ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "redcard2 mx-1"
                            }, toDisplayString((match == null ? void 0 : match.away_scores[2]) ? match == null ? void 0 : match.away_scores[2] : ""), 1)) : createCommentVNode("", true),
                            (match == null ? void 0 : match.away_scores[3]) && isShowCardYellow.value ? (openBlock(), createBlock("span", {
                              key: 1,
                              class: "yellow2 mx-1"
                            }, toDisplayString((match == null ? void 0 : match.away_scores[3]) ? match == null ? void 0 : match.away_scores[3] : ""), 1)) : createCommentVNode("", true),
                            isShowRanking.value ? (openBlock(), createBlock("span", {
                              key: 2,
                              id: "gorder",
                              class: "team-hg"
                            }, toDisplayString((match == null ? void 0 : match.away_position) ? "[" + (match == null ? void 0 : match.away_position) + "]" : ""), 1)) : createCommentVNode("", true)
                          ], 2),
                          createVNode("div", { class: "col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" }, [
                            ![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status) ? (openBlock(), createBlock("span", {
                              key: 0,
                              id: "cr",
                              class: "conner_span",
                              onClick: withModifiers(($event) => handleClickCorner($event, match), ["prevent"])
                            }, toDisplayString(typeof (match == null ? void 0 : match.home_scores[4]) !== "undefined" ? match == null ? void 0 : match.home_scores[4] : "") + "-" + toDisplayString(typeof (match == null ? void 0 : match.away_scores[4]) !== "undefined" ? match == null ? void 0 : match.away_scores[4] : ""), 9, ["onClick"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createTextVNode(" - ")
                            ], 64))
                          ]),
                          createVNode("div", { class: "col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" }, [
                            ![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status) ? (openBlock(), createBlock("span", {
                              key: 0,
                              id: "hht",
                              style: { "display": "block" }
                            }, toDisplayString(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : "") + "-" + toDisplayString(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : ""), 1)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createTextVNode(" - ")
                            ], 64))
                          ]),
                          createVNode("div", { class: "col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center toolimg" }, [
                            createVNode("span", {
                              class: "analyze-icon l0",
                              onClick: withModifiers(($event) => ("locationHref" in _ctx ? _ctx.locationHref : unref(locationHref))(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + (match == null ? void 0 : match.id) + "?tab=h2h"), ["prevent"])
                            }, [
                              createVNode("i", {
                                class: "icon iconfont icon-analysis",
                                title: "Ph\xE2n t\xEDch"
                              })
                            ], 8, ["onClick"]),
                            (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE || (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).FAVORITES ? (openBlock(), createBlock("span", {
                              key: 0,
                              id: "flashSpan_" + (match == null ? void 0 : match.id),
                              class: "matchdata-iconpc l0",
                              onClick: withModifiers(($event) => toggleSubInfoSport($event, match), ["prevent"])
                            }, [
                              createVNode("span", {
                                class: ["icon icon-pc icon-matchdata-pc", (match == null ? void 0 : match.id) === matchActiveLiveFlash.value ? "on" : ""],
                                title: "D\u1EEF li\u1EC7u"
                              }, null, 2)
                            ], 8, ["id", "onClick"])) : createCommentVNode("", true)
                          ]),
                          isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "col-3 col-sm-3 col-md-2 col-lg-2 align-self-center oddstd",
                            onMouseenter: ($event) => handleMouseOverOdds($event, match),
                            onMouseleave: handleMouseLeaveOdds
                          }, [
                            createVNode("div", {
                              class: "text-center oddstd-grid",
                              style: { "min-height": "42px" }
                            }, [
                              createVNode(_component_ClientOnly, null, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "oddstd" }, [
                                    isShowOddsHDP.value ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "odds1",
                                      innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 0, 1, true)
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                    isShowOddsTX.value ? (openBlock(), createBlock("p", {
                                      key: 1,
                                      class: "odds2",
                                      innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 1, 1, true)
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                    isShowOdds1X2.value ? (openBlock(), createBlock("p", {
                                      key: 2,
                                      class: "odds3",
                                      innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 2, 0)
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                                  ]),
                                  isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "oddstd"
                                  }, [
                                    isShowOddsHDP.value ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "odds1",
                                      innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 0, 0)
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                    isShowOddsTX.value ? (openBlock(), createBlock("p", {
                                      key: 1,
                                      class: "odds2",
                                      innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 1, 0)
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                    isShowOdds1X2.value ? (openBlock(), createBlock("p", {
                                      key: 2,
                                      class: "odds3",
                                      innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 2, 1)
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                                  ])) : createCommentVNode("", true),
                                  isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "oddstd"
                                  }, [
                                    isShowOddsHDP.value ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "odds1",
                                      innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 0, 2, true)
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                    isShowOddsTX.value ? (openBlock(), createBlock("p", {
                                      key: 1,
                                      class: "odds2",
                                      innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 1, 2, true)
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                    isShowOdds1X2.value ? (openBlock(), createBlock("p", {
                                      key: 2,
                                      class: "odds3",
                                      innerHTML: ("getOdds" in _ctx ? _ctx.getOdds : unref(getOdds))(match, 2, 2)
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                                  ])) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ], 40, ["onMouseenter"])) : createCommentVNode("", true)
                        ], 8, ["id", "index"]), [
                          [vShow, !toggleCompetition.value.includes(index)]
                        ]),
                        createVNode("div", { class: "table_matchdata p-0" }, [
                          (match == null ? void 0 : match.id) === matchActiveLiveFlash.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            id: "trF_" + (match == null ? void 0 : match.id),
                            bgcolor: "#FFFFFF"
                          }, [
                            createVNode("div", {
                              colspan: "13",
                              align: "center",
                              height: "18",
                              id: "flashLive_" + (match == null ? void 0 : match.id)
                            }, [
                              createVNode("div", { class: "ant row" }, [
                                createVNode("div", { class: "flash col-6 p-0" }, [
                                  createVNode("div", { class: "nodata" }, [
                                    createVNode(_component_Loading)
                                  ]),
                                  createVNode("iframe", {
                                    id: "flash",
                                    src: "https://tracker.sportdb.live/?code=" + keyEncode.value + "&id=" + (match == null ? void 0 : match.id),
                                    onload: "this.previousSibling.style.display='none'"
                                  }, null, 8, ["src"])
                                ]),
                                createVNode("div", { class: "matchdata col-6 p-0" }, [
                                  createVNode("div", { class: "databtns" }, [
                                    createVNode("div", {
                                      class: "btns",
                                      id: "divBtns"
                                    }, [
                                      createVNode("span", {
                                        class: ["btn_scoredconceded", { "on": activeSection.value === "scoredConceded" }],
                                        onClick: withModifiers(($event) => setActiveSection($event, match, "scoredConceded"), ["prevent"])
                                      }, "Ghi", 10, ["onClick"]),
                                      createVNode("span", {
                                        class: ["btn_recentstatus", { "on": activeSection.value === "recentStatus" }],
                                        onClick: withModifiers(($event) => setActiveSection($event, match, "recentStatus"), ["prevent"])
                                      }, "Phong \u0111\u1ED9", 10, ["onClick"])
                                    ])
                                  ]),
                                  withDirectives(createVNode("div", {
                                    class: "recentStatus",
                                    id: "recentStatus"
                                  }, [
                                    createVNode("div", { class: "liveBox mx2" }, [
                                      ((_C2 = matchRecentResult.value) == null ? void 0 : _C2[(_B2 = match == null ? void 0 : match.home_team) == null ? void 0 : _B2.id]) || ((_E2 = matchRecentResult.value) == null ? void 0 : _E2[(_D2 = match == null ? void 0 : match.away_team) == null ? void 0 : _D2.id]) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                        createVNode("div", { class: "lb-title" }, "6 tr\u1EADn g\u1EA7n \u0111\xE2y"),
                                        createVNode("div", { class: "lb-ms" }, [
                                          createVNode("span", {
                                            class: "homeSix",
                                            innerHTML: (_G2 = matchRecentResult.value) == null ? void 0 : _G2[(_F2 = match == null ? void 0 : match.home_team) == null ? void 0 : _F2.id]
                                          }, null, 8, ["innerHTML"]),
                                          createVNode("span", { class: "lb-m" }, [
                                            createVNode("span")
                                          ]),
                                          createVNode("span", {
                                            class: "guestSix",
                                            innerHTML: (_I2 = matchRecentResult.value) == null ? void 0 : _I2[(_H2 = match == null ? void 0 : match.away_team) == null ? void 0 : _H2.id]
                                          }, null, 8, ["innerHTML"])
                                        ])
                                      ], 64)) : createCommentVNode("", true),
                                      ((_J2 = matchSummary.value) == null ? void 0 : _J2.stats) ? (openBlock(), createBlock("ul", { key: 1 }, [
                                        createVNode("li", null, [
                                          (openBlock(true), createBlock(Fragment, null, renderList((_K2 = matchSummary.value) == null ? void 0 : _K2.stats, (stat, index2) => {
                                            return openBlock(), createBlock(Fragment, { key: index2 }, [
                                              createVNode("div", { class: "lb-td1" }, [
                                                createVNode("span", { class: "left red" }, toDisplayString(stat == null ? void 0 : stat.home), 1),
                                                createVNode("span", { class: "center" }, toDisplayString(("getStats" in _ctx ? _ctx.getStats : unref(getStats))(stat == null ? void 0 : stat.type)), 1),
                                                createVNode("span", { class: "right" }, toDisplayString(stat == null ? void 0 : stat.away), 1)
                                              ]),
                                              createVNode("div", { class: "lb-td2" }, [
                                                createVNode("span", { class: "home-w" }, [
                                                  createVNode("span", {
                                                    class: "home-bar",
                                                    style: "width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.home) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%"
                                                  }, null, 4)
                                                ]),
                                                createVNode("span", { class: "guest-w" }, [
                                                  createVNode("span", {
                                                    class: "guest-bar",
                                                    style: "width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.away) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%"
                                                  }, null, 4)
                                                ])
                                              ])
                                            ], 64);
                                          }), 128))
                                        ])
                                      ])) : createCommentVNode("", true)
                                    ])
                                  ], 512), [
                                    [vShow, activeSection.value === "recentStatus"]
                                  ]),
                                  withDirectives(createVNode("div", {
                                    class: "guessBox scoredConceded",
                                    id: "guessDiv"
                                  }, [
                                    createVNode("table", { width: "100%" }, [
                                      createVNode("tbody", null, [
                                        createVNode("tr", null, [
                                          createVNode("th", { colspan: "5" }, [
                                            createVNode("div", { class: "cvd" }, [
                                              createVNode("div", { class: "btns" }, [
                                                createVNode("span", {
                                                  class: ["thirtygames", { "on": activeSectionTable.value === "ThirtyGames" }],
                                                  onClick: withModifiers(($event) => setActiveSectionTable("ThirtyGames"), ["prevent"])
                                                }, "20 tr\u1EADn", 10, ["onClick"])
                                              ])
                                            ])
                                          ])
                                        ])
                                      ])
                                    ]),
                                    withDirectives(createVNode("table", {
                                      width: "100%",
                                      cellspacing: "1",
                                      cellpadding: "0",
                                      id: "JSQ_2404596_30",
                                      class: "ThirtyGames"
                                    }, [
                                      createVNode("tbody", null, [
                                        createVNode("tr", null, [
                                          createVNode("td", { width: "20%" }, "Ch\u1EE7"),
                                          createVNode("td", {
                                            width: "20%",
                                            class: "y"
                                          }, "Ph\xFAt"),
                                          createVNode("td", { width: "20%" }, "Kh\xE1ch")
                                        ]),
                                        ((_N2 = (_M2 = (_L2 = matchesAnalysis.value) == null ? void 0 : _L2.home_shoot_time) == null ? void 0 : _M2[0]) == null ? void 0 : _N2.length) > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList((_P2 = (_O2 = matchesAnalysis.value) == null ? void 0 : _O2.home_shoot_time) == null ? void 0 : _P2[0], (value, index2) => {
                                          var _a52, _b52, _c52, _d52, _e5, _f5, _g5, _h5, _i5, _j5;
                                          return openBlock(), createBlock("tr", { key: index2 }, [
                                            createVNode("td", null, toDisplayString(((_a52 = shootTime.value) == null ? void 0 : _a52["sumHome"]) > 0 ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(value) * 100 / ((_b52 = shootTime.value) == null ? void 0 : _b52["sumHome"])).toFixed(0) : "0") + "%", 1),
                                            index2 === 4 ? (openBlock(), createBlock("td", {
                                              key: 0,
                                              class: "y"
                                            }, "41~45")) : index2 === 5 ? (openBlock(), createBlock("td", {
                                              key: 1,
                                              class: "y"
                                            }, "46~50")) : (openBlock(), createBlock("td", {
                                              key: 2,
                                              class: "y"
                                            }, [
                                              index2 < 4 ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(10 * index2 + 1) + "~" + toDisplayString(10 * (index2 + 1)), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(10 * (index2 - 1) + 1) + "~" + toDisplayString(10 * index2), 1))
                                            ])),
                                            createVNode("td", null, toDisplayString(((_c52 = shootTime.value) == null ? void 0 : _c52["sumAway"]) > 0 ? ((_f5 = (_e5 = (_d52 = matchesAnalysis.value) == null ? void 0 : _d52.away_shoot_time) == null ? void 0 : _e5[0]) == null ? void 0 : _f5[index2]) ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))((_i5 = (_h5 = (_g5 = matchesAnalysis.value) == null ? void 0 : _g5.away_shoot_time) == null ? void 0 : _h5[0]) == null ? void 0 : _i5[index2]) * 100 / ((_j5 = shootTime.value) == null ? void 0 : _j5["sumAway"])).toFixed(0) : "0" : "0") + "% ", 1)
                                          ]);
                                        }), 128)) : (openBlock(), createBlock("tr", { key: 1 }, [
                                          createVNode("td", { colspan: "3" }, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u")
                                        ]))
                                      ])
                                    ], 512), [
                                      [vShow, activeSectionTable.value === "ThirtyGames"]
                                    ])
                                  ], 512), [
                                    [vShow, activeSection.value === "scoredConceded"]
                                  ])
                                ])
                              ])
                            ], 8, ["id"])
                          ], 8, ["id"])) : createCommentVNode("", true)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
              });
              _push(`<!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--><div><div colspan="11"><p class="text-center mb-5 load-more-data"></p></div></div>`);
        if (matchsListLength.value === 0 && (props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).MATCHES) {
          _push(`<div id="noFavTip"><div class="no_fav_data"><div id="nodatatip" class="no_data"><p class="title">Theo d\xF5i tr\u1EADn \u0111\u1EA5u</p><p class="">B\u1EA5m d\u1EA5u <i class="icon iconfont icon-font-collect-off"></i> \u0111\u1EC3 theo d\xF5i tr\u1EADn \u0111\u1EA5u</p><p><span class="searchbtn"><i class="icon iconfont icon-font-search"></i>T\xECm ki\u1EBFm tr\u1EADn \u0111\u1EA5u</span></p></div></div></div>`);
        } else if (matchsListLength.value === 0 && (props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).LEAGUES) {
          _push(`<div id="noFavTip"><div class="no_fav_data"><div id="nodatatip" class="no_data"><p class="title">Theo d\xF5i gi\u1EA3i \u0111\u1EA5u</p><p class="">B\u1EA5m d\u1EA5u <i class="icon iconfont icon-font-collect-off"></i> \u0111\u1EC3 theo d\xF5i gi\u1EA3i \u0111\u1EA5u</p><p><span class="searchbtn"><i class="icon iconfont icon-font-search"></i>T\xECm ki\u1EBFm gi\u1EA3i \u0111\u1EA5u</span></p></div></div></div>`);
        } else if (matchsListLength.value === 0 && (props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).TEAMS) {
          _push(`<div id="noFavTip"><div class="no_fav_data"><div id="nodatatip" class="no_data"><p class="title">Theo d\xF5i \u0111\u1ED9i b\xF3ng</p><p class="">B\u1EA5m d\u1EA5u <i class="icon iconfont icon-font-collect-off"></i> \u0111\u1EC3 theo d\xF5i \u0111\u1ED9i b\xF3ng</p><p><span class="searchbtn"><i class="icon iconfont icon-font-search"></i>T\xECm ki\u1EBFm \u0111\u1ED9i b\xF3ng</span></p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
      if (!unref(isHidden)) {
        _push(`<div id="content-page" class="${ssrRenderClass(expand.value ? "content-expand" : "content-collapse")}" style="${ssrRenderStyle(showContentPage.value ? null : { display: "none" })}">${(_a3 = unref(formattedContentPage)) != null ? _a3 : ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(formattedContentPage) && showContentPage.value && !unref(isHidden)) {
        _push(`<p id="readmorecontent" class="readmore-content item-align-right me-3 mt-3"><span>${ssrInterpolate(expand.value ? "Thu g\u1ECDn" : "Xem th\xEAm")}</span></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span></div></div>`);
      if (showWinScore.value) {
        _push(`<div id="winScore" class="scoretab" style="${ssrRenderStyle({ position: "absolute", top: winScorePosition.value.top, left: winScorePosition.value.left, zIndex: 100 })}"><div class="closebtn"><span></span></div><table width="500" cellpadding="0" cellspacing="1" class="odds-table-bg"><tbody><tr><td height="20" colspan="5" class="hand-bg"><span color="white"><b>D\u1EEF li\u1EC7u tr\u1EADn \u0111\u1EA5u</b></span></td></tr><tr class="jqSubTitle"><td height="20" width="44%"><span><b>${ssrInterpolate((_D = (_C = (_B = matchSummary.value) == null ? void 0 : _B.match) == null ? void 0 : _C.home_team) == null ? void 0 : _D.name)}</b></span></td><td width="12%"><b>Ph\xFAt</b></td><td width="44%"><span><b>${ssrInterpolate((_G = (_F = (_E = matchSummary.value) == null ? void 0 : _E.match) == null ? void 0 : _F.away_team) == null ? void 0 : _G.name)}</b></span></td></tr><!--[-->`);
        ssrRenderList((_H = matchSummary.value) == null ? void 0 : _H.incidents, (incident, index) => {
          var _a4, _b4;
          _push(`<!--[-->`);
          if ([1, 3, 4, 9].includes(incident == null ? void 0 : incident.type)) {
            _push(`<tr><td height="18" class="white-bg right" style="${ssrRenderStyle({ "padding": "0 2px" })}">${(_a4 = ("getIncidents" in _ctx ? _ctx.getIncidents : unref(getIncidents))(incident, 1)) != null ? _a4 : ""}</td><td width="12%" class="gray-bg2">${ssrInterpolate(incident == null ? void 0 : incident.time)}&#39;</td><td class="white-bg left">${(_b4 = ("getIncidentsRight" in _ctx ? _ctx.getIncidentsRight : unref(getIncidentsRight))(incident, 2)) != null ? _b4 : ""}</td></tr>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></tbody></table><table width="100%" cellpadding="0" cellspacing="1" class="odds-table-bg"><tbody><tr><td height="20" colspan="3" class="hand-bg"><span color="white"><b>Th\u1ED1ng k\xEA</b></span></td></tr><!--[-->`);
        ssrRenderList((_I = matchSummary.value) == null ? void 0 : _I.stats, (stat, index) => {
          _push(`<!--[-->`);
          if ([21, 22, 25].includes(stat == null ? void 0 : stat.type)) {
            _push(`<tr height="18" class="white-bg"><td width="25%">${ssrInterpolate(stat == null ? void 0 : stat.home)}</td><td class="gray-bg2">${ssrInterpolate(("getStats" in _ctx ? _ctx.getStats : unref(getStats))(stat == null ? void 0 : stat.type))}</td><td width="25%">${ssrInterpolate(stat == null ? void 0 : stat.away)}</td></tr>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></tbody></table></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showWinScoreCorner.value) {
        _push(`<div id="sbOddsCorner" class="livetab" style="${ssrRenderStyle({ position: "absolute", top: winScorePositionCorner.value.top, left: winScorePositionCorner.value.left, zIndex: 100 })}"><div class="closebtn"><span></span></div><table width="100%" cellpadding="0" cellspacing="1" id="tab_CornerOdds" class="odds-table-bg2"><tbody><tr><td colspan="2"><div class="jqTitle">Ph\u1EA1t g\xF3c</div></td></tr><tr class="jqSubTitle"><td style="${ssrRenderStyle({ "width": "50%" })}">${ssrInterpolate((_K = (_J = matchHover.value) == null ? void 0 : _J.home_team) == null ? void 0 : _K.name)}</td><td style="${ssrRenderStyle({ "width": "50%" })}">${ssrInterpolate((_M = (_L = matchHover.value) == null ? void 0 : _L.away_team) == null ? void 0 : _M.name)}</td></tr></tbody></table><div class="info" id="div_cornerOdds"><div class="jqSubTitle2"><span title="C\u01B0\u1EE3c ch\u1EA5p">HDP</span><span title="T\xE0i x\u1EC9u">T/X</span></div><table width="100%" cellpadding="0" cellspacing="1" id="tab_CornerOdds" class="odds-table-bg2"><tbody><tr><td width="56" class="white-bg">${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_P = (_O = (_N = matchOddsCorner.value) == null ? void 0 : _N.hadicap) == null ? void 0 : _O[0]) == null ? void 0 : _P.initial, 1))}</td><td width="56" class="white-bg">${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_S = (_R = (_Q = matchOddsCorner.value) == null ? void 0 : _Q.hadicap) == null ? void 0 : _R[0]) == null ? void 0 : _S.initial, 0))}</td><td width="56" class="white-bg">${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_V = (_U = (_T = matchOddsCorner.value) == null ? void 0 : _T.hadicap) == null ? void 0 : _U[0]) == null ? void 0 : _V.initial, 2))}</td><td class="gray-bg2" width="62">Hi\u1EC7p 1</td><td width="56" class="white-bg">${ssrInterpolate((_Z = (_Y = (_X = (_W = matchOddsCorner.value) == null ? void 0 : _W.corner) == null ? void 0 : _X.early) == null ? void 0 : _Y[0]) == null ? void 0 : _Z.over)}</td><td width="56" class="white-bg">${ssrInterpolate((_ba = (_aa = (_$ = (__ = matchOddsCorner.value) == null ? void 0 : __.corner) == null ? void 0 : _$.early) == null ? void 0 : _aa[0]) == null ? void 0 : _ba.total_corners)}</td><td width="56" class="white-bg">${ssrInterpolate((_fa = (_ea = (_da = (_ca = matchOddsCorner.value) == null ? void 0 : _ca.corner) == null ? void 0 : _da.early) == null ? void 0 : _ea[0]) == null ? void 0 : _fa.under)}</td></tr><tr><td class="handOdds">${ssrInterpolate(((_ga = matchHover.value) == null ? void 0 : _ga.status) === 1 ? ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_ja = (_ia = (_ha = matchOddsCorner.value) == null ? void 0 : _ha.hadicap) == null ? void 0 : _ia[0]) == null ? void 0 : _ja.instant, 1) : ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_ma = (_la = (_ka = matchOddsCorner.value) == null ? void 0 : _ka.hadicap) == null ? void 0 : _la[0]) == null ? void 0 : _ma.inplay, 1))}</td><td class="handOdds">${ssrInterpolate(((_na = matchHover.value) == null ? void 0 : _na.status) === 1 ? ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_qa = (_pa = (_oa = matchOddsCorner.value) == null ? void 0 : _oa.hadicap) == null ? void 0 : _pa[0]) == null ? void 0 : _qa.instant, 0) : ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_ta = (_sa = (_ra = matchOddsCorner.value) == null ? void 0 : _ra.hadicap) == null ? void 0 : _sa[0]) == null ? void 0 : _ta.inplay, 0))}</td><td class="handOdds">${ssrInterpolate(((_ua = matchHover.value) == null ? void 0 : _ua.status) === 1 ? ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_xa = (_wa = (_va = matchOddsCorner.value) == null ? void 0 : _va.hadicap) == null ? void 0 : _wa[0]) == null ? void 0 : _xa.instant, 2) : ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_Aa = (_za = (_ya = matchOddsCorner.value) == null ? void 0 : _ya.hadicap) == null ? void 0 : _za[0]) == null ? void 0 : _Aa.inplay, 2))}</td><td class="gray-bg2">Tr\u1EF1c ti\u1EBFp</td><td class="handOdds"><div class="">${ssrInterpolate((_Ea = (_Da = (_Ca = (_Ba = matchOddsCorner.value) == null ? void 0 : _Ba.corner) == null ? void 0 : _Ca.live) == null ? void 0 : _Da[0]) == null ? void 0 : _Ea.over)}</div></td><td class="handOdds">${ssrInterpolate((_Ia = (_Ha = (_Ga = (_Fa = matchOddsCorner.value) == null ? void 0 : _Fa.corner) == null ? void 0 : _Ga.live) == null ? void 0 : _Ha[0]) == null ? void 0 : _Ia.total_corners)}</td><td class="handOdds"><div class="">${ssrInterpolate((_Ma = (_La = (_Ka = (_Ja = matchOddsCorner.value) == null ? void 0 : _Ja.corner) == null ? void 0 : _Ka.live) == null ? void 0 : _La[0]) == null ? void 0 : _Ma.under)}</div></td></tr></tbody></table></div><div class="info" id="div_cornerDetail" style="${ssrRenderStyle({})}"><div class="jqTitle2">Chi ti\u1EBFt</div><table id="tab_CornerDetail" width="100%" cellpadding="0" cellspacing="1" style="${ssrRenderStyle({ "margin-top": "-1px" })}" class="odds-table-bg2"><tbody><tr><td width="165" class="white-bg">${ssrInterpolate(((_Na = matchCorner.value) == null ? void 0 : _Na.home_corner) ? (_Oa = matchCorner.value) == null ? void 0 : _Oa.home_corner : "0")}</td><td width="60" class="gray-bg2">C\u1EA3 tr\u1EADn</td><td class="white-bg">${ssrInterpolate(((_Pa = matchCorner.value) == null ? void 0 : _Pa.away_corner) ? (_Qa = matchCorner.value) == null ? void 0 : _Qa.away_corner : "0")}</td></tr><tr><td class="white-bg">${ssrInterpolate(((_Ra = matchCorner.value) == null ? void 0 : _Ra.home_haft_corner) ? (_Sa = matchCorner.value) == null ? void 0 : _Sa.home_haft_corner : "0")}</td><td class="gray-bg2">Hi\u1EC7p 1</td><td class="white-bg">${ssrInterpolate(((_Ta = matchCorner.value) == null ? void 0 : _Ta.away_haft_corner) ? (_Ua = matchCorner.value) == null ? void 0 : _Ua.away_haft_corner : "0")}</td></tr><!--[-->`);
        ssrRenderList((_Va = matchCorner.value) == null ? void 0 : _Va.event_list, (cornerEvent, index) => {
          var _a4, _b4;
          var _a32, _b32, _c32, _d32;
          _push(`<tr><td width="165" class="white-bg">${(_a4 = ("getCorner" in _ctx ? _ctx.getCorner : unref(getCorner))(cornerEvent, (_b32 = (_a32 = matchHover.value) == null ? void 0 : _a32.home_team) == null ? void 0 : _b32.i_team, 1)) != null ? _a4 : ""}</td><td width="60" class="gray-bg2">${ssrInterpolate(cornerEvent == null ? void 0 : cornerEvent.minute)}&#39;</td><td class="white-bg">${(_b4 = ("getCorner" in _ctx ? _ctx.getCorner : unref(getCorner))(cornerEvent, (_d32 = (_c32 = matchHover.value) == null ? void 0 : _c32.away_team) == null ? void 0 : _d32.i_team, 2)) != null ? _b4 : ""}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showWinScoreOdds.value) {
        _push(`<div id="oddsChange" class="oddsdetail" style="${ssrRenderStyle({ position: "absolute", top: winScorePositionOdds.value.top, left: winScorePositionOdds.value.left, zIndex: 100 })}"><div class="closebtn"><span></span></div><table width="555" class="oddschanges m5" cellpadding="0" cellspacing="0"><tbody><tr><td width="15%" height="31" class="white-bg2"></td><td width="37%" class="white-bg2 odd-teamname" style="${ssrRenderStyle({ "text-align": "right", "padding-right": "10px" })}"><b>${ssrInterpolate((_Xa = (_Wa = matchHover.value) == null ? void 0 : _Wa.home_team) == null ? void 0 : _Xa.name)}</b></td><td id="ffScoreDetail" sid="2419844" width="11%" class="white-bg2 odd-score">VS</td><td width="37%" class="white-bg2 odd-teamname" style="${ssrRenderStyle({ "text-align": "left", "padding": "0 20px 0 10px" })}"><b>${ssrInterpolate((_Za = (_Ya = matchHover.value) == null ? void 0 : _Ya.away_team) == null ? void 0 : _Za.name)}</b></td></tr></tbody></table><table id="ffOddsDetail" width="555px" class="oddschanges" cellpadding="0" cellspacing="1" style="${ssrRenderStyle({ "margin-bottom": "5px" })}" odds=""><tbody><tr><td width="15%" class="odd-bg1" title="To\xE0n th\u1EDDi gian">FT</td><td colspan="3" class="gray">Running</td><td colspan="3" class="oddschanges-bg1" title="Trong tr\u1EADn">TL</td><td colspan="3" class="oddschanges-bg2">S\u1EDBm</td></tr><tr><td class="odd-bg1" style="${ssrRenderStyle({ "padding": "0 4px" })}" title="C\u01B0\u1EE3c ch\u1EA5p"><b>HDP</b></td><td width="8%" id="ah_run1" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "inplay", 1))}</td><td width="13%" id="ah_run2" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "inplay", 0))}</td><td width="8%" id="ah_run3" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "inplay", 2))}</td><td width="8%" id="ah_live1" class="oddschanges-bg1">${(_b3 = ("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "handicap", "instant", 1)) != null ? _b3 : ""}</td><td width="13%" id="ah_live2" class="oddschanges-bg1">${(_c3 = ("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "handicap", "instant", 0)) != null ? _c3 : ""}</td><td width="8%" id="ah_live3" class="oddschanges-bg1">${(_d3 = ("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "handicap", "instant", 2)) != null ? _d3 : ""}</td><td width="8%" id="ah_first1" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 1))}</td><td width="13%" id="ah_first2" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(
          oddsDetail.value,
          "handicap",
          "initial",
          0
        ))}</td><td width="8%" id="ah_first3" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 2))}</td></tr><tr><td class="odd-bg1" style="${ssrRenderStyle({ "padding": "0 4px" })}" title="T\xE0i x\u1EC9u"><b>T/X</b></td><td id="ou_run1" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "inplay", 1))}</td><td id="ou_run2" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "inplay", 0))}</td><td id="ou_run3" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "inplay", 2))}</td><td id="ou_live1" class="oddschanges-bg1">${(_e3 = ("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "overUnder", "instant", 1)) != null ? _e3 : ""}</td><td id="ou_live2" class="oddschanges-bg1">${(_f3 = ("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "overUnder", "instant", 0)) != null ? _f3 : ""}</td><td id="ou_live3" class="oddschanges-bg1">${(_g3 = ("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "overUnder", "instant", 2)) != null ? _g3 : ""}</td><td id="ou_fist1" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 1))}</td><td id="ou_fist2" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 0))}</td><td id="ou_fist3" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 2))}</td></tr><tr><td class="odd-bg1" style="${ssrRenderStyle({ "padding": "0 4px" })}" title="K\xE8o Ch\xE2u \xC2u"><b>1x2</b></td><td id="1x2_run1" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "inplay", 0))}</td><td id="1x2_run2" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "inplay", 1))}</td><td id="1x2_run3" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "inplay", 2))}</td><td id="1x2_live1" class="oddschanges-bg1">${(_h3 = ("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "europeOdds", "instant", 0)) != null ? _h3 : ""}</td><td id="1x2_live2" class="oddschanges-bg1">${(_i3 = ("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "europeOdds", "instant", 1)) != null ? _i3 : ""}</td><td id="1x2_live3" class="oddschanges-bg1">${(_j3 = ("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "europeOdds", "instant", 2)) != null ? _j3 : ""}</td><td id="1x2_fist1" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 0))}</td><td id="1x2_fist2" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 1))}</td><td id="1x2_fist3" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 2))}</td></tr><tr class="more"><td colspan="10">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + ((__a = matchHover.value) == null ? void 0 : __a.id), query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP } }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>Xem th\xEAm d\u1EEF li\u1EC7u</span>`);
            } else {
              return [
                createVNode("span", null, "Xem th\xEAm d\u1EEF li\u1EC7u")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td></tr></tbody></table><table id="fhOddsDetail" width="555px" class="oddschanges" cellpadding="0" cellspacing="1" border="0" odds="0,0.50,1.42,1.14,6.60,8.20,1.5,4.16,0.10"><tbody><tr><td width="14%" class="odd-bg1" title="Hi\u1EC7p 1">HT</td><td colspan="3" class="gray">Running</td><td colspan="3" class="oddschanges-bg1" title="Trong tr\u1EADn">TL</td><td colspan="3" class="oddschanges-bg2">S\u1EDBm</td></tr><tr><td class="odd-bg1" style="${ssrRenderStyle({ "padding": "0 4px" })}" title="C\u01B0\u1EE3c ch\u1EA5p"><b>HDP</b></td><td id="ah_ht_run1" width="8%" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "inplay", 1))}</td><td id="ah_ht_run2" width="13%" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "inplay", 0))}</td><td id="ah_ht_run3" width="8%" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "inplay", 1))}</td><td id="ah_ht_live1" width="8%" class="oddschanges-bg1"><div class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "instant", 1))}</div></td><td id="ah_ht_live2" width="13%" class="oddschanges-bg1">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(
          oddsDetail.value,
          "handicapHalf",
          "instant",
          0
        ))}</td><td id="ah_ht_live3" width="8%" class="oddschanges-bg1"><div class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "instant", 2))}</div></td><td id="ah_ht_first1" width="8%" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(
          oddsDetail.value,
          "handicapHalf",
          "initial",
          1
        ))}</td><td id="ah_ht_first2" width="13%" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(
          oddsDetail.value,
          "handicapHalf",
          "initial",
          0
        ))}</td><td id="ah_ht_first3" width="8%" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(
          oddsDetail.value,
          "handicapHalf",
          "initial",
          1
        ))}</td></tr><tr><td class="odd-bg1" style="${ssrRenderStyle({ "padding": "0 4px" })}" title="T\xE0i x\u1EC9u"><b>T/X</b></td><td id="ou_ht_run1" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "inplay", 1))}</td><td id="ou_ht_run2" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "inplay", 0))}</td><td id="ou_ht_run3" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "inplay", 2))}</td><td id="ou_ht_live1" class="oddschanges-bg1"><div class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "instant", 1))}</div></td><td id="ou_ht_live2" class="oddschanges-bg1">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "instant", 0))}</td><td id="ou_ht_live3" class="oddschanges-bg1"><div class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "instant", 2))}</div></td><td id="ou_ht_first1" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 1))}</td><td id="ou_ht_first2" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 0))}</td><td id="ou_ht_first3" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 2))}</td></tr><tr><td class="odd-bg1" style="${ssrRenderStyle({ "padding": "0 4px" })}" title="K\xE8o Ch\xE2u \xC2u"><b>1x2</b></td><td id="1x2_ht_run1" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "inplay", 0))}</td><td id="1x2_ht_run2" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "inplay", 1))}</td><td id="1x2_ht_run3" class="gray">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "inplay", 2))}</td><td id="1x2_ht_live1" class="oddschanges-bg1"><div class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "instant", 0))}</div></td><td id="1x2_ht_live2" class="oddschanges-bg1"><div class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "instant", 1))}</div></td><td id="1x2_ht_live3" class="oddschanges-bg1"><div class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "instant", 2))}</div></td><td id="1x2_ht_first1" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "initial", 0))}</td><td id="1x2_ht_first2" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "initial", 1))}</td><td id="1x2_ht_first3" class="oddschanges-bg2">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "initial", 2))}</td></tr><tr class="more"><td colspan="10">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + ((_$a = matchHover.value) == null ? void 0 : _$a.id), query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP, haft: 1 } }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>Xem th\xEAm d\u1EEF li\u1EC7u</span>`);
            } else {
              return [
                createVNode("span", null, "Xem th\xEAm d\u1EEF li\u1EC7u")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td></tr></tbody></table></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(isDesktop) && !unref(isHidden)) {
        _push(`<div class="${ssrRenderClass({ "col-md-2 col-lg-2 d-none d-sm-none d-md-inline-block": true, "settings_table_mobile": isRightClassAdded.value })}" id="right"><div class="n-search"><input type="text" id="rightSearchInput" class="input_text" placeholder="Gi\u1EA3i \u0111\u1EA5u/\u0110\u1ED9i b\xF3ng" autoComplete="off" title="Search"></div><div class="lrdiv newsetting"><div class="toolsBox"><div class="matchinfo_setting"><div class="lr_tit on">S\u1EAFp x\u1EBFp theo</div><ul class="setList" id="set_order" style="${ssrRenderStyle({ "min-height": "45.6px" })}"><li class="${ssrRenderClass([!orderByTime.value ? "on" : "", "chose radio"])}"><span class="ro"><label for="radio-2"><input id="radio-2" name="radio-2" type="radio"${ssrIncludeBooleanAttr(!orderByTime.value) ? " checked" : ""}>Gi\u1EA3i \u0111\u1EA5u</label></span></li><li class="${ssrRenderClass([orderByTime.value ? "on" : "", "chose radio mb-2"])}"><span class="ro"><label for="radio-1"><input id="radio-1" name="radio-1" type="radio"${ssrIncludeBooleanAttr(orderByTime.value) ? " checked" : ""}>Th\u1EDDi gian</label></span></li></ul></div><div class="matchinfo_setting">`);
        if ((props == null ? void 0 : props.page) !== ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).SCHEDULE) {
          _push(`<!--[--><div class="lr_tit">Hi\u1EC3n th\u1ECB TL</div><div id="odds_setting" class="odds_setting"><span class="odds_detail"><span><input type="checkbox" id="otc_1"${ssrIncludeBooleanAttr(Array.isArray(isShowOddsHDP.value) ? ssrLooseContain(isShowOddsHDP.value, null) : isShowOddsHDP.value) ? " checked" : ""} name="goalType"><label for="otc_1" title="C\u01B0\u1EE3c ch\u1EA5p">HDP</label><input type="checkbox" id="otc_2"${ssrIncludeBooleanAttr(Array.isArray(isShowOddsTX.value) ? ssrLooseContain(isShowOddsTX.value, null) : isShowOddsTX.value) ? " checked" : ""} name="goalType"><label for="otc_2" title="T\xE0i x\u1EC9u">T/X</label><input type="checkbox" id="otc_3"${ssrIncludeBooleanAttr(Array.isArray(isShowOdds1X2.value) ? ssrLooseContain(isShowOdds1X2.value, null) : isShowOdds1X2.value) ? " checked" : ""} name="goalType"><label for="otc_3" title="K\xE8o Ch\xE2u \xC2u">1x2</label></span></span></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="matchinfo_setting"><div class="preferences_setting"><div class="lr_tit on">Hi\u1EC7n th\xF4ng b\xE1o</div><div class="selectbox" id="selectbox"><span value="0" class="${ssrRenderClass(settingType.value === 0 ? "on" : "")}">T\u1EA5t c\u1EA3</span><span value="1" class="${ssrRenderClass(settingType.value === 1 ? "on" : "")}">Theo d\xF5i</span></div><ul class="Preferences nopadding"><li><label for="goalWindowCheck" class="switch">C\u1EEDa s\u1ED5 b\xE0n th\u1EAFng <input${ssrIncludeBooleanAttr(Array.isArray(isShowGoalWindow.value) ? ssrLooseContain(isShowGoalWindow.value, null) : isShowGoalWindow.value) ? " checked" : ""} type="checkbox" name="goalWindowCheck" id="goalWindowCheck" checked=""><span class="switch-style"></span></label></li><li><label for="redWindowCheck" class="switch">C\u1EEDa s\u1ED5 th\u1EBB \u0111\u1ECF <input${ssrIncludeBooleanAttr(Array.isArray(isShowRedWindow.value) ? ssrLooseContain(isShowRedWindow.value, null) : isShowRedWindow.value) ? " checked" : ""} type="checkbox" name="redWindowCheck" id="redWindowCheck" checked=""><span class="switch-style"></span></label></li></ul><div class="lr_tit on">\xC2m thanh</div><div class="soundbox"><div>\u0110\u1ED9i nh\xE0 ghi b\xE0n:</div><div class="selectbox sound" id="selectsound1"><span value="0" class="${ssrRenderClass(soundHome.value === 0 ? "on" : "")}">1</span><span value="1" class="${ssrRenderClass(soundHome.value === 1 ? "on" : "")}">2</span><span value="2" class="${ssrRenderClass(soundHome.value === 2 ? "on" : "")}">3</span><span value="3" class="${ssrRenderClass(soundHome.value === 3 ? "on" : "")}">4</span><span value="4" class="${ssrRenderClass(soundHome.value === 4 ? "on" : "")}">NO</span></div></div><div class="soundbox"><div>\u0110\u1ED9i kh\xE1ch ghi b\xE0n:</div><div class="selectbox sound" id="selectsound2"><span value="0" class="${ssrRenderClass(soundAway.value === 0 ? "on" : "")}">1</span><span value="1" class="${ssrRenderClass(soundAway.value === 1 ? "on" : "")}">2</span><span value="2" class="${ssrRenderClass(soundAway.value === 2 ? "on" : "")}">3</span><span value="3" class="${ssrRenderClass(soundAway.value === 3 ? "on" : "")}">4</span><span value="4" class="${ssrRenderClass(soundAway.value === 4 ? "on" : "")}">NO</span></div></div></div></div><div class="matchinfo_setting"><div class="lr_tit on">Hi\u1EC3n th\u1ECB trang</div><ul class="Preferences"><li><label for="TeamOrderCheck" class="switch">X\u1EBFp h\u1EA1ng <input${ssrIncludeBooleanAttr(Array.isArray(isShowRanking.value) ? ssrLooseContain(isShowRanking.value, null) : isShowRanking.value) ? " checked" : ""} type="checkbox" name="TeamOrderCheck" id="TeamOrderCheck"><span class="switch-style"></span></label></li><li><label for="YellowCheck" class="switch">Th\u1EBB v\xE0ng <input${ssrIncludeBooleanAttr(Array.isArray(isShowCardYellow.value) ? ssrLooseContain(isShowCardYellow.value, null) : isShowCardYellow.value) ? " checked" : ""} type="checkbox" name="YellowCard" id="YellowCheck"><span class="switch-style"></span></label></li><li><label for="ShowRemarkCheck" class="switch">Th\u1EBB \u0111\u1ECF <input${ssrIncludeBooleanAttr(Array.isArray(isShowCardRed.value) ? ssrLooseContain(isShowCardRed.value, null) : isShowCardRed.value) ? " checked" : ""} type="checkbox" name="ShowRemarkCheck" id="ShowRemarkCheck"><span class="switch-style"></span></label></li></ul></div><div class="matchinfo_setting"><div class="lr_tit on" for="timeZone">M\xFAi gi\u1EDD</div><select aria-label="timeZone"><!--[-->`);
        ssrRenderList("TIME_ZONE_LIST" in _ctx ? _ctx.TIME_ZONE_LIST : unref(TIME_ZONE_LIST), (item, key) => {
          _push(`<option${ssrRenderAttr("value", item == null ? void 0 : item.value)}${ssrIncludeBooleanAttr(timeZone.value === (item == null ? void 0 : item.value) ? true : false) ? " selected" : ""}>${ssrInterpolate(item == null ? void 0 : item.key)}</option>`);
        });
        _push(`<!--]--></select></div>`);
        if (unref(onOffIframe) == "True") {
          _push(`<div class="matchinfo_setting"><ul class="Preferences iframe"><li><label class="switch"> M\xE3 nh\xFAng <input type="checkbox" name="iframe" id="iframeCheck"><span class="switch-style"></span></label></li></ul>`);
          if (isIframeVisible.value) {
            _push(`<div class="content_iframe"><textarea id="embedCodeTextarea" readonly style="${ssrRenderStyle({ "height": "155px" })}">${ssrInterpolate(embedCode.value)}</textarea></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LivescoreComponent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=LivescoreComponent-ChD6_-oQ.mjs.map
