import { d as defineEventHandler, u as useRuntimeConfig, b as getHeader } from '../../../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';

const me = defineEventHandler(async (event) => {
  const baseAPI = useRuntimeConfig(event).apiBaseUrl;
  useRuntimeConfig(event).brandCode;
  const accessToken = getHeader(event, "Authorization");
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };
  const data = await $fetch(baseAPI + event._path, {
    method: "GET",
    headers,
    mode: "cors"
  });
  return data;
});

export { me as default };
//# sourceMappingURL=me.mjs.map
