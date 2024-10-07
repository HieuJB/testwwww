import { d as defineEventHandler, u as useRuntimeConfig, r as readBody } from '../../../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';

const login = defineEventHandler(async (event) => {
  const baseAPI = useRuntimeConfig(event).apiBaseUrl;
  const brandCode = useRuntimeConfig(event).brandCode;
  const body = await readBody(event);
  body.brand_code = brandCode;
  const data = await $fetch(baseAPI + event._path, {
    method: "POST",
    body
  });
  return data;
});

export { login as default };
//# sourceMappingURL=login.mjs.map
