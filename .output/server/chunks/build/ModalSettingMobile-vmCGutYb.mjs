import { ref, useModel, computed, reactive, watch, unref, useSSRContext } from 'vue';
import { s as systemsStore, e as useCookie, a as useRoute, b as useShareCommon, O as ODD_COMPANY_DEFAULT, r as ODD_COMPANYS, g as getConfig, aE as TIME_ZONE_LIST, h as ROUTERS_OLD, aO as ODD_COMPANYS_LIVESCORE } from './server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@unhead/addons';
import 'vue3-snackbar';
import '@vueuse/core';
import 'moment-timezone';
import 'crypto-js';
import 'pako';
import 'buffer';
import '@vueuse/sound';

const _sfc_main = {
  __name: "ModalSettingMobile",
  __ssrInlineRender: true,
  props: {
    "showSetting": {},
    "showSettingModifiers": {},
    "timeZoneLabel": {},
    "timeZoneLabelModifiers": {},
    "timeZone": {},
    "timeZoneModifiers": {}
  },
  emits: ["update:showSetting", "update:timeZoneLabel", "update:timeZone"],
  setup(__props) {
    var _a, _b, _c, _d, _e;
    const storeSystems = systemsStore();
    const orderByTime = ref(false);
    const settingsData = useCookie("settingsData");
    useModel(__props, "showSetting");
    const routerUrl = useRoute().path;
    const { useLocale, $t, $trouter } = useShareCommon();
    const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
    const oddCompany = ODD_COMPANYS.find(({ id }) => id === ODD_COMPANY_DEFAULT);
    const oddCompanyNameSelected = ref(oddCompany == null ? void 0 : oddCompany.name);
    const isShowOddsHDP = ref(true);
    const isShowOddsTX = ref(true);
    const isShowOdds1X2 = ref(false);
    const isShowCardYellow = ref(true);
    const isShowCardRed = ref(true);
    const isShowRanking = ref(true);
    const settingType = ref(((_a = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _a.settingType) || 1);
    const isShowGoalWindow = ref(((_b = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _b.isShowGoalWindow) || true);
    const isShowRedWindow = ref(((_c = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _c.isShowRedWindow) || true);
    const soundHome = ref(((_d = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _d.soundHome) || 0);
    const soundAway = ref(((_e = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _e.soundAway) || 1);
    const timeZoneLabel = useModel(__props, "timeZoneLabel");
    const timeZone = useModel(__props, "timeZone");
    const isTurnOnTimeZone = computed(() => {
      try {
        return String(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "OPTION_TIMEZONE")).toLowerCase() === "true";
      } catch {
        return false;
      }
    });
    reactive({
      modal_comp_bet: null,
      modal_timezone: null
    });
    watch(
      timeZone,
      () => {
        var _a2;
        timeZoneLabel.value = (_a2 = TIME_ZONE_LIST.find((item) => item.value === timeZone.value)) == null ? void 0 : _a2.key;
      }
    );
    watch(
      [isShowOddsHDP, isShowOddsTX, isShowOdds1X2, isShowCardYellow, isShowCardRed, isShowRanking, settingType, isShowGoalWindow, isShowRedWindow, soundHome, soundAway, timeZone],
      () => {
        if (settingsData == null ? void 0 : settingsData.value) {
          settingsData.value.isShowOddsHDP = isShowOddsHDP.value;
          settingsData.value.isShowOddsTX = isShowOddsTX.value;
          settingsData.value.isShowOdds1X2 = isShowOdds1X2.value;
          settingsData.value.isShowCardYellow = isShowCardYellow.value;
          settingsData.value.isShowCardRed = isShowCardRed.value;
          settingsData.value.isShowRanking = isShowRanking.value;
          settingsData.value.timeZone = timeZone.value;
          settingsData.value.settingType = settingType.value;
          settingsData.value.isShowGoalWindow = isShowGoalWindow.value;
          settingsData.value.isShowRedWindow = isShowRedWindow.value;
          settingsData.value.soundHome = soundHome.value;
          settingsData.value.soundAway = soundAway.value;
          useCookie("settingsData").value = JSON.stringify(settingsData.value);
        } else {
          useCookie("settingsData").value = JSON.stringify({
            isShowOddsHDP: isShowOddsHDP.value,
            isShowOddsTX: isShowOddsTX.value,
            isShowOdds1X2: isShowOdds1X2.value,
            isShowCardYellow: isShowCardYellow.value,
            isShowCardRed: isShowCardRed.value,
            isShowRanking: isShowRanking.value,
            timeZone: timeZone.value,
            settingType: settingType.value,
            isShowGoalWindow: isShowGoalWindow.value,
            isShowRedWindow: isShowRedWindow.value,
            soundHome: soundHome.value,
            soundAway: soundAway.value
          });
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div id="settingPopCtn"><div id="popMask"></div><div class="fadeInBottom" id="settingPop"><div class="title"><span>${ssrInterpolate(unref($t)("Settings"))}</span><div class="close_b"></div></div><div class="info"><ul><li><div class="name">${ssrInterpolate(unref($t)("Match order"))}</div><ul class="setList" id="set_order"><li class="${ssrRenderClass([unref(orderByTime) ? "on" : "", "chose"])}"><span class="ro"></span>${ssrInterpolate(unref($t)("Time order"))}</li><li class="${ssrRenderClass([!unref(orderByTime) ? "on" : "", "chose"])}"><span class="ro"></span>${ssrInterpolate(unref($t)("League order"))}</li></ul></li><li style="${ssrRenderStyle({})}"><div class="name">${ssrInterpolate(unref($t)("Bookmaker company"))}</div><span id="displayCompany" class="selectLabel cursor-pointer">${ssrInterpolate(unref($t)(unref(oddCompanyNameSelected)))}</span><i class="more"></i></li><li style="${ssrRenderStyle([
        {},
        unref(routerUrl) === ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).HOMEPAGE || unref(routerUrl) === ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).FOOTBALL_RESULT || unref(routerUrl) === ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).FOOTBALL_SCHEDULE ? null : { display: "none" }
      ])}"><div class="name">${ssrInterpolate(unref($t)("Select league"))}</div><span id="displayCompany" class="selectLabel cursor-pointer">${ssrInterpolate(unref($t)("Choose"))}</span><i class="more"></i></li><li id="os_li" style="${ssrRenderStyle({})}"><div class="name">${ssrInterpolate(unref($t)("Show TL"))}</div><ul class="setList" id="set_Odds"><li class="${ssrRenderClass([unref(isShowOddsTX) ? "on" : "", "chose"])}">${ssrInterpolate(unref($t)("Over/Under"))}</li><li class="${ssrRenderClass([unref(isShowOdds1X2) ? "on" : "", "chose"])}">${ssrInterpolate(unref($t)("1x2"))}1x2 </li><li class="${ssrRenderClass([unref(isShowOddsHDP) ? "on" : "", "chose"])}">${ssrInterpolate(unref($t)("HDP"))}</li></ul></li><li><div class="name">${ssrInterpolate(unref($t)("Show page"))}</div><ul class="setList" id="set_pShow"><li class="${ssrRenderClass([unref(isShowCardRed) ? "on" : "", "chose"])}">${ssrInterpolate(unref($t)("Red card"))}</li><li class="${ssrRenderClass([unref(isShowCardYellow) ? "on" : "", "chose"])}">${ssrInterpolate(unref($t)("Yellow card"))}</li><li class="${ssrRenderClass([unref(isShowRanking) ? "on" : "", "chose"])}">${ssrInterpolate(unref($t)("Ranking"))}</li></ul></li><li class="subtitle">${ssrInterpolate(unref($t)("Show notification"))}</li><li><div class="name"></div><ul class="setList" id="set_pShow"><li class="${ssrRenderClass([unref(settingType) === 1 ? "on" : "", "chose"])}">${ssrInterpolate(unref($t)("Favorites"))}</li><li class="${ssrRenderClass([unref(settingType) === 0 ? "on" : "", "chose"])}">${ssrInterpolate(unref($t)("All"))}</li></ul></li><li><div class="name"></div><ul class="setList" id="set_pShow"><li class="${ssrRenderClass([unref(isShowRedWindow) ? "on" : "", "chose"])}">${ssrInterpolate(unref($t)("Red card window"))}</li><li class="${ssrRenderClass([unref(isShowGoalWindow) ? "on" : "", "chose"])}">${ssrInterpolate(unref($t)("Goal window"))}</li></ul></li><li class="subtitle">${ssrInterpolate(unref($t)("Sound"))}</li><li><div class="name">${ssrInterpolate(unref($t)("Home"))}</div><ul class="setList sound-list" id="set_pShow"><li class="${ssrRenderClass([unref(soundHome) === 4 ? "on" : "", "chose"])}"> NO </li><li class="${ssrRenderClass([unref(soundHome) === 3 ? "on" : "", "chose"])}"> \xA0 4 \xA0 </li><li class="${ssrRenderClass([unref(soundHome) === 2 ? "on" : "", "chose"])}"> \xA0 3 \xA0 </li><li class="${ssrRenderClass([unref(soundHome) === 1 ? "on" : "", "chose"])}"> \xA0 2 \xA0 </li><li class="${ssrRenderClass([unref(soundHome) === 0 ? "on" : "", "chose"])}"> \xA0 1 \xA0 </li></ul></li><li><div class="name">${ssrInterpolate(unref($t)("Away"))}</div><ul class="setList sound-list" id="set_pShow"><li class="${ssrRenderClass([unref(soundAway) === 4 ? "on" : "", "chose"])}"> NO </li><li class="${ssrRenderClass([unref(soundAway) === 3 ? "on" : "", "chose"])}"> \xA0 4 \xA0 </li><li class="${ssrRenderClass([unref(soundAway) === 2 ? "on" : "", "chose"])}"> \xA0 3 \xA0 </li><li class="${ssrRenderClass([unref(soundAway) === 1 ? "on" : "", "chose"])}"> \xA0 2 \xA0 </li><li class="${ssrRenderClass([unref(soundAway) === 0 ? "on" : "", "chose"])}"> \xA0 1 \xA0 </li></ul></li>`);
      if (unref(isTurnOnTimeZone)) {
        _push(`<li class="subtitle">${ssrInterpolate(unref($t)("General Settings"))}</li>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isTurnOnTimeZone)) {
        _push(`<li><div class="name">${ssrInterpolate(unref($t)("Time zone"))}</div><span id="displayZone" class="selectLabel cursor-pointer">${ssrInterpolate(timeZoneLabel.value || unref($t)("Auto"))}</span><i class="more"></i></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></div></div></div><div class="modal fade" id="modal_comp_bet" tabindex="-1" aria-labelledby="modal_comp_bet_label" aria-hidden="true"><div class="modal-dialog modal-dialog-centered container"><div class="modal-content"><div class="modal-header d-none"><div class="modal-title" id="modal_comp_bet_label">${ssrInterpolate(unref($t)("Select Betting Company"))}</div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div id="setting_popSel"><div class="popMask2"></div><div class="fadeInBottom" id="setting_popSel"><ul class="selectpop" id="selCompany"><!--[-->`);
      ssrRenderList("ODD_COMPANYS_LIVESCORE" in _ctx ? _ctx.ODD_COMPANYS_LIVESCORE : unref(ODD_COMPANYS_LIVESCORE), (odd_company, index) => {
        _push(`<li${ssrRenderAttr("value", odd_company == null ? void 0 : odd_company.id)} class="${ssrRenderClass([unref(oddCompanySelected) === (odd_company == null ? void 0 : odd_company.id) ? "on" : "", "odd_li"])}">${ssrInterpolate(`${unref($t)(odd_company == null ? void 0 : odd_company.name)}`.toUpperCase())}</li>`);
      });
      _push(`<!--]--></ul></div></div></div></div></div><div class="modal fade" id="modal_timezone" tabindex="-1" aria-labelledby="modal_timezone_label" aria-hidden="true"><div class="modal-dialog modal-dialog-centered container"><div class="modal-content"><div class="modal-header d-none"><div class="modal-title" id="modal_timezone_label">${ssrInterpolate(unref($t)("Select Time Zone"))}</div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div id="setting_popSel"><div class="popMask2"></div><div class="fadeInBottom" id="setting_popSel"><ul class="selectpop" id="timeZoneList"><!--[-->`);
      ssrRenderList("TIME_ZONE_LIST" in _ctx ? _ctx.TIME_ZONE_LIST : unref(TIME_ZONE_LIST), (item, key) => {
        _push(`<li${ssrRenderAttr("value", item == null ? void 0 : item.value)} class="${ssrRenderClass([timeZone.value === (item == null ? void 0 : item.value) ? "on" : "", "odd_li"])}">${ssrInterpolate(item == null ? void 0 : item.key)}</li>`);
      });
      _push(`<!--]--></ul></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ModalSettingMobile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ModalSettingMobile-vmCGutYb.mjs.map
