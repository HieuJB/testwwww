import { d as defineEventHandler, u as useRuntimeConfig, f as getRouterParam, e as setHeader } from '../../../../runtime.mjs';
import { a as formatDateMoment } from '../../../../_/moment_helper.mjs';
import moment from 'moment-timezone';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';

const ____paras__xml = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  useRuntimeConfig(event).apiBaseUrl;
  useRuntimeConfig(event).brandCode;
  const host = (_b = event.req.headers[":authority"]) != null ? _b : (_a = event.req.headers) == null ? void 0 : _a.host;
  const scheme = (_c = event.req.headers[":scheme"]) != null ? _c : "https://";
  let monthAndYear = getRouterParam(event, "paras.xml");
  const chunks = [];
  if (monthAndYear) {
    monthAndYear = (_d = monthAndYear == null ? void 0 : monthAndYear.replace(".xml", "")) == null ? void 0 : _d.split("-");
    const allDatesInMonth = getAllDaysInMonth(monthAndYear == null ? void 0 : monthAndYear[1], monthAndYear == null ? void 0 : monthAndYear[0]);
    (/* @__PURE__ */ new Date()).setUTCHours(12);
    const after7Day = moment().add(7, "days");
    allDatesInMonth.map((day) => {
      if (moment(formatDateMoment(day, "YYYY-MM-DD")).isBefore(after7Day)) {
        chunks.push([
          "<sitemap>",
          `<loc>${scheme}${host}/sitemap/match/day/${formatDateMoment(day, "YYYY-MM-DD")}.xml</loc>`,
          `<lastmod>${formatDateMoment(day, "yyyy-MM-DD HH:mm")}</lastmod>`,
          "</sitemap>"
        ].join(""));
      }
    });
  }
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    chunks.join(""),
    "</sitemapindex>"
  ].join("");
  setHeader(event, "content-type", "application/xml");
  return sitemap;
});
const getAllDaysInMonth = (month, year) => Array.from(
  { length: new Date(year, month, 0).getDate() },
  // get next month, zeroth's (previous) day
  (_, i) => new Date(year, month - 1, i + 1)
  // get current month (0 based index)
);

export { ____paras__xml as default };
//# sourceMappingURL=_...paras_.xml.mjs.map
