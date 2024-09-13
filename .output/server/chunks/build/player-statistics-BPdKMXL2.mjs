import { _ as _sfc_main$3 } from './NuxtImg-z5Tschba.mjs';
import { useSSRContext, defineComponent, ref, useModel, computed, withAsyncContext, watchEffect, unref, mergeProps } from 'vue';
import { g as getConfig, b as getPlayerPosition } from './helper-CGhdpGxz.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { u as useRoute, b as useCookie, _ as _export_sfc } from './server.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@unhead/addons';
import 'vue3-snackbar';
import './fetch-CC0zbYw2.mjs';
import './createUrl-DyOxdY5I.mjs';
import './livescore_helper-4bdWaxk-.mjs';
import './moment_helper-C2kP4D4M.mjs';
import 'moment-timezone';
import './constants-DJp0NbxW.mjs';
import 'crypto-js';
import 'pako';
import 'buffer';

const _imports_0 = publicAssetsURL("/icon/player-statistics/1.png");
const _imports_1 = publicAssetsURL("/icon/player-statistics/3.png");
const _imports_2 = publicAssetsURL("/icon/player-statistics/9.png");
const _imports_3 = publicAssetsURL("/icon/player-statistics/2.png");
const _imports_4 = publicAssetsURL("/icon/player-statistics/32.png");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "table-info",
  __ssrInlineRender: true,
  props: {
    info: Array,
    posizione: String,
    bestPlayer: Object
  },
  setup(__props) {
    const BTN_DETAIL = {
      OVERVIEW: "Kha\u0341i l\u01B0\u01A1\u0323c",
      ATTACK: "T\u1EA5n c\xF4ng",
      DEFENSE: "Ph\xF2ng th\u1EE7",
      PASS_THE_BALL: "Chuy\u1EC1n b\xF3ng"
    };
    const buttonActive = ref(BTN_DETAIL.OVERVIEW);
    const buttonList = ref([
      BTN_DETAIL.OVERVIEW,
      BTN_DETAIL.ATTACK,
      BTN_DETAIL.DEFENSE,
      BTN_DETAIL.PASS_THE_BALL
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "info" }, _attrs))} data-v-bba93061><div class="${ssrRenderClass([
        "info__header",
        {
          "info__header--bottom": __props.posizione
        }
      ])}" data-v-bba93061><div class="info__team-name" data-v-bba93061>${ssrInterpolate(__props.info.team_name)}</div><div class="info__team-function" data-v-bba93061><!--[-->`);
      ssrRenderList(unref(buttonList), (item, index) => {
        _push(`<button class="${ssrRenderClass([
          "info__team-btn",
          { "info__team-btn--active": unref(buttonActive) === item }
        ])}" data-v-bba93061>${ssrInterpolate(item)}</button>`);
      });
      _push(`<!--]--></div></div><div class="table-container" data-v-bba93061><table data-v-bba93061><thead data-v-bba93061><tr data-v-bba93061><th data-v-bba93061>S\u1ED1</th><th data-v-bba93061>C\u1EA7u th\u1EE7</th><th style="${ssrRenderStyle({ "min-width": "65px" })}" data-v-bba93061>V\u1ECB tr\xED</th><th style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> S\u1ED1 l\u1EA7n s\xFAt b\xF3ng </th><th style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> S\xFAt c\u1EA7u m\xF4n </th><th style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> Quan tr\u1ECDng chuy\u1EC1n b\xF3ng </th><th style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> S\u1ED1 b\xE0n th\u1EAFng </th><th style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> R\xEA b\xF3ng th\xE0nh c\xF4ng </th><th style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> Ki\u1EBFn t\u1EA1o </th><th style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> Qu\u1EA3 \u0111\xE1 ph\u1EA1t </th><th style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> B\u1ECB ph\u1EA1m l\u1ED7i </th><th style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> Ph\u1EA3n c\xF4ng nhanh </th><th style="${ssrRenderStyle([BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> S\u1ED1 l\u1EA7n vi\u1EC7t v\u1ECB </th><th style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> T\u1EAFc b\xF3ng </th><th style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> C\u1EAFt b\xF3ng </th><th style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> S\u1ED1 l\u1EA7n c\u1EE9u thua </th><th style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> Effective Clearance </th><th style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> Ch\u1EB7n c\xFA s\xFAt </th><th style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> Ph\u1EA1m l\u1ED7i </th><th style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> Chuy\u1EC1n b\xF3ng </th><th style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> Chuy\u1EC1n b\xF3ng th\xE0nh c\xF4ng </th><th style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> T\u1EA1t b\xF3ng </th><th style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> T\u1EA1t b\xF3ng th\xE0nh c\xF4ng </th><th style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> Chuy\u1EC1n d\xE0i </th><th style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061> Chuy\u1EC1n d\xE0i chu\u1EA9n x\xE1c </th><th data-v-bba93061>\u0110\xE1nh gi\xE1 \u0111i\u1EC3m</th><th data-v-bba93061>S\u1EF1 ki\u1EC7n ch\xEDnh</th></tr></thead><tbody data-v-bba93061><!--[-->`);
      ssrRenderList(__props.info.stats, (player, index) => {
        var _a2, _b;
        var _a;
        _push(`<tr data-v-bba93061><td data-v-bba93061>${ssrInterpolate((_a2 = player.shirt_number) != null ? _a2 : "-")}</td><td data-v-bba93061>${ssrInterpolate(player.player_name)}</td><td data-v-bba93061>${ssrInterpolate(("getPlayerPosition" in _ctx ? _ctx.getPlayerPosition : unref(getPlayerPosition))((_b = player.position) != null ? _b : player.player_position))}</td><td style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.shots)}</td><td style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.hit_woodwork)}</td><td style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.key_passes)}</td><td style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.goals)}</td><td style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.dribble_succ)}</td><td style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.assists)}</td><td style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.freekicks)}</td><td style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.was_fouled)}</td><td style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.fastbreaks)}</td><td style="${ssrRenderStyle([BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.offsides)}</td><td style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.tackles)}</td><td style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.interceptions)}</td><td style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.saves)}</td><td style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.clearances)}</td><td style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.blocked_shots)}</td><td style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.fouls)}</td><td style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.passes)}</td><td style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.passes_accuracy)}</td><td style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.crosses)}</td><td style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.crosses_accuracy)}</td><td style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.long_balls)}</td><td style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-bba93061>${ssrInterpolate(player.long_balls_accuracy)}</td><td data-v-bba93061>${ssrInterpolate(player.rating)}</td><td data-v-bba93061><div class="d-flex justify-content-center" data-v-bba93061>`);
        if (player.goals) {
          _push(`<img${ssrRenderAttr("src", _imports_0)} alt="B\xE0n th\u1EAFng" data-v-bba93061>`);
        } else {
          _push(`<!---->`);
        }
        if (player.yellow_cards) {
          _push(`<img${ssrRenderAttr("src", _imports_1)} alt="Th\u1EBB v\xE0ng" data-v-bba93061>`);
        } else {
          _push(`<!---->`);
        }
        if (player.yellow2red_cards) {
          _push(`<img${ssrRenderAttr("src", _imports_2)} alt="Th\u1EBB v\xE0ng th\u1EE9 hai" data-v-bba93061>`);
        } else {
          _push(`<!---->`);
        }
        if (player.red_cards) {
          _push(`<img${ssrRenderAttr("src", _imports_3)} alt="Th\u1EBB \u0111\u1ECF" data-v-bba93061>`);
        } else {
          _push(`<!---->`);
        }
        if (player.player_id === ((_a = __props.bestPlayer) == null ? void 0 : _a.player_id)) {
          _push(`<img class="image-flash"${ssrRenderAttr("src", _imports_4)} alt="Th\u1EBB \u0111\u1ECF" data-v-bba93061>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/player-statstics/table-info.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-bba93061"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_img = _sfc_main$3;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "icons" }, _attrs))} data-v-dc305d62><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/1.png",
    alt: "B\xE0n th\u1EAFng"
  }, null, _parent));
  _push(`B\xE0n th\u1EAFng </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/7.png",
    alt: "Ghi b\xE0n ph\u1EA1t \u0111\u1EC1n"
  }, null, _parent));
  _push(`Ghi b\xE0n ph\u1EA1t \u0111\u1EC1n </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/8.png",
    alt: "B\xE0n ph\u1EA3n l\u01B0\u1EDBi nh\xE0"
  }, null, _parent));
  _push(`B\xE0n ph\u1EA3n l\u01B0\u1EDBi nh\xE0 </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/12.png",
    alt: "Ki\u1EBFn t\u1EA1o"
  }, null, _parent));
  _push(`Ki\u1EBFn t\u1EA1o </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/3.png",
    alt: "Th\u1EBB v\xE0ng"
  }, null, _parent));
  _push(`Th\u1EBB v\xE0ng </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/2.png",
    alt: "Th\u1EBB \u0111\u1ECF"
  }, null, _parent));
  _push(`Th\u1EBB \u0111\u1ECF </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/9.png",
    alt: "Th\u1EBB v\xE0ng th\u1EE9 hai"
  }, null, _parent));
  _push(`Th\u1EBB v\xE0ng th\u1EE9 hai </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/55.png",
    alt: "Ghi d\u1EA5u"
  }, null, _parent));
  _push(`Ghi d\u1EA5u </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/11.png",
    alt: "Thay ng\u01B0\u1EDDi"
  }, null, _parent));
  _push(`Thay ng\u01B0\u1EDDi </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/4.png",
    alt: "C\u1EA7u th\u1EE7 d\u1EF1 b\u1ECB v\xE0o s\xE2n"
  }, null, _parent));
  _push(`C\u1EA7u th\u1EE7 d\u1EF1 b\u1ECB v\xE0o s\xE2n </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/5.png",
    alt: "C\u1EA7u th\u1EE7 r\u1EDDi s\xE2n"
  }, null, _parent));
  _push(`C\u1EA7u th\u1EE7 r\u1EDDi s\xE2n </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/13.png",
    alt: "Ph\u1EA1t \u0111\u1EC1n th\u1EA5t b\u1EA1i"
  }, null, _parent));
  _push(`Ph\u1EA1t \u0111\u1EC1n th\u1EA5t b\u1EA1i </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/14.png",
    alt: "Ph\u1EA1t \u0111\u1EC1n th\u1EA5t b\u1EA1i"
  }, null, _parent));
  _push(`Video h\u1ED7 tr\u1EE3 tr\u1ECDng t\xE0i </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/30.png",
    alt: "Ph\xE1 ph\u1EA1t \u0111\u1EC1n"
  }, null, _parent));
  _push(`Ph\xE1 ph\u1EA1t \u0111\u1EC1n </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/31.png",
    alt: "S\xFAt c\u1ED9t c\u1EA7u m\xF4n"
  }, null, _parent));
  _push(`S\xFAt c\u1ED9t c\u1EA7u m\xF4n </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/32.png",
    alt: "C\u1EA7u th\u1EE7 xu\u1EA5t s\u1EAFc nh\u1EA5t"
  }, null, _parent));
  _push(`C\u1EA7u th\u1EE7 xu\u1EA5t s\u1EAFc nh\u1EA5t </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/36.png",
    alt: "Ph\u1EA1t \u0111\u1EC1n v\xEC ph\u1EA1m l\u1ED7i"
  }, null, _parent));
  _push(`Ph\u1EA1t \u0111\u1EC1n v\xEC ph\u1EA1m l\u1ED7i </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/33.png",
    alt: "M\u1EA5t b\xE0n th\u1EAFng v\xEC sai l\u1EA7m"
  }, null, _parent));
  _push(`M\u1EA5t b\xE0n th\u1EAFng v\xEC sai l\u1EA7m </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/35.png",
    alt: "C\u1EA3n ph\xE1 tr\u01B0\u1EDBc khung th\xE0nh"
  }, null, _parent));
  _push(`C\u1EA3n ph\xE1 tr\u01B0\u1EDBc khung th\xE0nh </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/34.png",
    alt: "C\u1EA7u th\u1EE7 ph\xF2ng ng\u1EF1 cu\u1ED1i c\xF9ng"
  }, null, _parent));
  _push(`C\u1EA7u th\u1EE7 ph\xF2ng ng\u1EF1 cu\u1ED1i c\xF9ng </div><div class="icon" data-v-dc305d62>`);
  _push(ssrRenderComponent(_component_nuxt_img, {
    src: "/icon/player-statistics/37.png",
    alt: "R\xEA b\xF3ng cu\u1ED1i c\xF9ng"
  }, null, _parent));
  _push(`R\xEA b\xF3ng cu\u1ED1i c\xF9ng </div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/player-statstics/table-detail.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-dc305d62"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "player-statistics",
  __ssrInlineRender: true,
  props: {
    "modelValue": {},
    "modelModifiers": {},
    "matchTitle": {},
    "matchTitleModifiers": {},
    "matchContent": {},
    "matchContentModifiers": {},
    "initDataMatch": {},
    "initDataMatchModifiers": {}
  },
  emits: ["update:modelValue", "update:matchTitle", "update:matchContent", "update:initDataMatch"],
  async setup(__props) {
    var _a, _b, _c;
    let __temp, __restore;
    const storeSystems = systemsStore();
    const route = useRoute();
    const objectIdSlug = ref(((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.id) || "");
    const infoPlayer = ref([]);
    const isLoading = ref(true);
    const homeTeamId = useModel(__props, "modelValue");
    const bestPlayer = ref();
    const matchIdSlug = ref(((_b = route == null ? void 0 : route.params) == null ? void 0 : _b.id) || "");
    const matchsRecentDetail = ref([]);
    const matchTitle = useModel(__props, "matchTitle");
    const matchContent = useModel(__props, "matchContent");
    const initDataMatch = useModel(__props, "initDataMatch");
    const settingsData = useCookie("settingsData");
    ref(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") || ((_c = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _c.timeZone));
    computed(
      () => {
        var _a2, _b2;
        return ((_b2 = (_a2 = matchsRecentDetail.value.match) == null ? void 0 : _a2.home_team) == null ? void 0 : _b2.name) || "";
      }
    );
    computed(
      () => {
        var _a2, _b2;
        return ((_b2 = (_a2 = matchsRecentDetail.value.match) == null ? void 0 : _a2.away_team) == null ? void 0 : _b2.name) || "";
      }
    );
    const getBestPlayer = () => {
      let highestRatedPlayer = { player_id: null, rating: null };
      if (infoPlayer.value && Array.isArray(infoPlayer.value)) {
        infoPlayer.value.forEach((team) => {
          if (team.stats && Array.isArray(team.stats)) {
            team.stats.forEach((player) => {
              if (player.rating != null && player.rating > highestRatedPlayer.rating) {
                highestRatedPlayer = {
                  player_id: player.player_id || null,
                  rating: player.rating
                };
              }
            });
          }
        });
      }
      bestPlayer.value = highestRatedPlayer;
    };
    const getPlayerStatistics = async () => {
      var _a2;
      isLoading.value = true;
      try {
        infoPlayer.value = await useApiLiveScore(
          API_ROUTERS.LIVESCORE.PLAYER_STATISTICS + "?match-id=" + objectIdSlug.value
        );
        if (infoPlayer.value && ((_a2 = infoPlayer.value[0]) == null ? void 0 : _a2.team_name) !== homeTeamId.value) {
          infoPlayer.value = infoPlayer.value.reverse();
        }
        getBestPlayer();
      } catch (e) {
        console.error(e);
      } finally {
        isLoading.value = false;
      }
    };
    const fetchMatchsRecentDetail = async (matchIdSlug2) => {
      let resData = initDataMatch.value;
      matchsRecentDetail.value.match = resData == null ? void 0 : resData[0];
    };
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecentDetail(matchIdSlug.value)), await __temp, __restore();
    watchEffect(() => {
      if (homeTeamId.value) {
        getPlayerStatistics();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_nuxt_img = _sfc_main$3;
      const _component_PlayerStatsticsTableInfo = __nuxt_component_1;
      const _component_PlayerStatsticsTableDetail = __nuxt_component_2;
      if (!unref(isLoading)) {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        if (!((_a2 = unref(infoPlayer)) == null ? void 0 : _a2.length)) {
          _push(`<div class="d-flex justify-content-center flex-column align-items-center"><div class="popupinfo searchwin_nodata nodata">`);
          _push(ssrRenderComponent(_component_nuxt_img, {
            loading: "lazy",
            class: "nodata_pic",
            alt: "nodata pic",
            width: "200",
            height: "200",
            src: "/icon/nodata.svg"
          }, null, _parent));
          _push(`</div><p class="fw-bold text-center mt-3">D\u1EEF li\u1EC7u \u0111ang \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt</p></div>`);
        } else {
          _push(`<div><div>`);
          _push(ssrRenderComponent(_component_PlayerStatsticsTableInfo, {
            bestPlayer: unref(bestPlayer),
            info: unref(infoPlayer)[0]
          }, null, _parent));
          _push(`</div><div class="mt-5">`);
          _push(ssrRenderComponent(_component_PlayerStatsticsTableInfo, {
            bestPlayer: unref(bestPlayer),
            info: unref(infoPlayer)[1],
            posizione: true
          }, null, _parent));
          _push(`</div>`);
          _push(ssrRenderComponent(_component_PlayerStatsticsTableDetail, null, null, _parent));
          _push(`</div>`);
        }
        _push(`<div id="content-page" class="mt-5">`);
        if (matchTitle.value) {
          _push(`<h1 class="page_title">${ssrInterpolate(matchTitle.value)}</h1>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(matchContent.value)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/match/player-statistics.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=player-statistics-BPdKMXL2.mjs.map
