import { d as defineEventHandler, u as useRuntimeConfig, e as setHeader } from '../../runtime.mjs';
import { t as timeStamp2DateUTCTimeZone } from '../../_/moment_helper.mjs';
import moment from 'moment-timezone';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';

const ______xml_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  const sitemapObject = [];
  try {
    const baseAPI = useRuntimeConfig(event).apiBaseUrl;
    const brandCode = useRuntimeConfig(event).brandCode;
    const host = (_b = event.req.headers[":authority"]) != null ? _b : (_a = event.req.headers) == null ? void 0 : _a.host;
    const scheme = "https://";
    let limit = 1e3;
    const params = (_d = (_c = event == null ? void 0 : event.context) == null ? void 0 : _c.params) == null ? void 0 : _d.xml;
    const objectType = (_e = params == null ? void 0 : params.split("-")) == null ? void 0 : _e[0];
    const page = (_h = (_g = (_f = params == null ? void 0 : params.split("-")) == null ? void 0 : _f[1]) == null ? void 0 : _g.split(".")) == null ? void 0 : _h[0];
    const ext = (_i = params == null ? void 0 : params.split(".")) == null ? void 0 : _i[1];
    if (!ext || ext !== "xml") {
      showError({
        statusCode: 404,
        statusMessage: "Kh\xF4ng \u0111u\u0301ng sitemap!"
      });
    }
    switch (objectType) {
      case "sitemap_post": {
        const resData = await $fetch(baseAPI + "/oapi/v1/posts?limit=" + limit + "&page=" + page + "&brand_code=" + brandCode);
        (_j = resData == null ? void 0 : resData.posts) == null ? void 0 : _j.forEach((post) => {
          sitemapObject.push([
            "<url>",
            `<loc>${scheme}${host}/${post == null ? void 0 : post.slug}</loc>`,
            `<lastmod>${moment(post == null ? void 0 : post.post_modified).utcOffset("GMT+07:00").format("YYYY-MM-DDTHH:mmZ")}</lastmod>`,
            `<priority>0.8</priority>`,
            "</url>"
          ].join(""));
        });
        break;
      }
      case "sitemap_category": {
        const date = moment().utcOffset("GMT+07:00").format("YYYY-MM-DDTHH:mmZ");
        const resData = await $fetch(baseAPI + "/oapi/v1/categories?limit=" + limit + "&page=" + page + "&brand_code=" + brandCode);
        (_k = resData == null ? void 0 : resData.post_categories) == null ? void 0 : _k.forEach((category) => {
          sitemapObject.push([
            "<url>",
            `<loc>${scheme}${host}/${category == null ? void 0 : category.slug}</loc>`,
            `<lastmod>${date}</lastmod>`,
            `<priority>0.8</priority>`,
            "</url>"
          ].join(""));
        });
        break;
      }
      case "sitemap_player": {
        const resData = await $fetch(baseAPI + "/oapi/v1/players?limit=" + limit + "&page=" + page + "&brand_code=" + brandCode);
        (_l = resData == null ? void 0 : resData.players) == null ? void 0 : _l.forEach((player) => {
          sitemapObject.push([
            "<url>",
            `<loc>${scheme}${host}/player/${player == null ? void 0 : player.id}</loc>`,
            `<lastmod>${timeStamp2DateUTCTimeZone(player == null ? void 0 : player.last_updated, "YYYY-MM-DDTHH:mmZ")}</lastmod>`,
            `<priority>0.8</priority>`,
            "</url>"
          ].join(""));
        });
        break;
      }
      case "sitemap_league": {
        const resData = await $fetch(baseAPI + "/oapi/v1/leagues?limit=" + limit + "&page=" + page + "&brand_code=" + brandCode);
        (_m = resData == null ? void 0 : resData.leagues) == null ? void 0 : _m.forEach((league) => {
          sitemapObject.push([
            "<url>",
            `<loc>${scheme}${host}/league/${league == null ? void 0 : league.id}</loc>`,
            `<lastmod>${timeStamp2DateUTCTimeZone(league == null ? void 0 : league.last_updated, "YYYY-MM-DDTHH:mmZ")}</lastmod>`,
            `<priority>0.8</priority>`,
            "</url>"
          ].join(""));
        });
        break;
      }
      case "sitemap_team": {
        const resData = await $fetch(baseAPI + "/oapi/v1/teams?limit=" + limit + "&page=" + page + "&brand_code=" + brandCode);
        (_n = resData == null ? void 0 : resData.teams) == null ? void 0 : _n.forEach((team) => {
          sitemapObject.push([
            "<url>",
            `<loc>${scheme}${host}/team/${team == null ? void 0 : team.id}</loc>`,
            `<lastmod>${timeStamp2DateUTCTimeZone(team == null ? void 0 : team.last_updated, "YYYY-MM-DDTHH:mmZ")}</lastmod>`,
            `<priority>0.8</priority>`,
            "</url>"
          ].join(""));
        });
        break;
      }
      default:
        break;
    }
  } catch (e) {
  } finally {
    const sitemap = [
      // '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> ',
      sitemapObject.join(""),
      "</urlset>"
    ].join("");
    setHeader(event, "content-type", "application/xml");
    return sitemap;
  }
});

export { ______xml_get as default };
//# sourceMappingURL=_..._.xml.get.mjs.map
