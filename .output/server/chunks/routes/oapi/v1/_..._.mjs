import { d as defineEventHandler, u as useRuntimeConfig, g as getQuery, a as getRequestURL, s as stringifyQuery } from '../../../runtime.mjs';
import { toValue } from 'vue';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';

const _____ = defineEventHandler(async (event) => {
  var _a;
  const baseAPI = useRuntimeConfig(event).apiBaseUrl;
  const brandCode = useRuntimeConfig(event).brandCode;
  const _url = toValue(baseAPI);
  const query = getQuery(event);
  const _query = toValue(query);
  query.brand_code = brandCode;
  const queryObj = Object.fromEntries(
    Object.entries(_query).map(([key, val]) => [key, toValue(val)])
  );
  const data = await $fetch(`${_url}${(_a = getRequestURL(event)) == null ? void 0 : _a.pathname}${queryObj ? `?${stringifyQuery(queryObj)}` : ""}`);
  return data;
});

export { _____ as default };
//# sourceMappingURL=_..._.mjs.map
