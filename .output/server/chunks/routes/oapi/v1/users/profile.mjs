import { d as defineEventHandler, u as useRuntimeConfig, b as getHeader } from '../../../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';

const profile = defineEventHandler(async (event) => {
  const baseAPI = useRuntimeConfig(event).apiBaseUrl;
  useRuntimeConfig(event).brandCode;
  const accessToken = await getHeader(event, "Authorization");
  const data = await $fetch(baseAPI + event._path, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return data;
});

export { profile as default };
//# sourceMappingURL=profile.mjs.map
