import { hasInjectionContext, inject, toRef, version, ref, watchEffect, watch, getCurrentInstance, isRef, shallowRef, onServerPrefetch, computed, toValue, reactive, defineComponent, provide, createElementBlock, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext, useAttrs, h, shallowReactive, Suspense, nextTick, Transition, resolveComponent, withAsyncContext, createVNode, useModel, mergeModels, withDirectives, withModifiers, vShow, openBlock, createBlock, createCommentVNode, Fragment, renderList, createApp, effectScope, isReactive, toRaw, defineAsyncComponent, onErrorCaptured, resolveDynamicComponent, getCurrentScope, onScopeDispose, isReadonly, toRefs, markRaw, isShallow, createSlots, renderSlot } from 'vue';
import { $ as $fetch, G as withQuery, P as hasProtocol, w as parseURL, Q as isScriptProtocol, R as joinURL, f as createError$1, q as hash, S as klona, T as parse, U as getRequestHeader, a as getRequestURL, C as defu, s as stringifyQuery, V as sanitizeStatusCode, v as destr, W as isEqual, X as setCookie, Y as getCookie, Z as deleteCookie, _ as parseQuery, a0 as encodeParam, a1 as createHooks, a2 as withLeadingSlash, K as withTrailingSlash, B as withoutTrailingSlash, a3 as isSamePath, z as toRouteMatcher, A as createRouter$1, D as withoutBase, a4 as encodePath, a5 as getRequestHeaders, a6 as withBase } from '../runtime.mjs';
import { b as baseURL, p as publicAssetsURL } from '../routes/renderer.mjs';
import { CapoPlugin, getActiveHead } from 'unhead';
import { defineHeadPlugin, composableNames, unpackMeta } from '@unhead/shared';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { parse as parse$1, stringify } from 'devalue';
import { InferSeoMetaPlugin } from '@unhead/addons';
import { SnackbarService, Vue3Snackbar } from 'vue3-snackbar';
import { createSharedComposable, useWindowScroll, useIntersectionObserver, useDebounceFn } from '@vueuse/core';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderSuspense, ssrRenderVNode, ssrRenderSlot } from 'vue/server-renderer';
import moment from 'moment-timezone';
import CryptoJS from 'crypto-js';
import pako from 'pako';
import { Buffer } from 'buffer';
import { useSound } from '@vueuse/sound';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'vue-bundle-renderer/runtime';
import '@unhead/ssr';

function createContext$1(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers$1.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers$1.delete(onLeave);
      }
    }
  };
}
function createNamespace$1(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext$1({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$2 = "__unctx__";
const defaultNamespace = _globalThis$1[globalKey$2] || (_globalThis$1[globalKey$2] = createNamespace$1());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey$1 = "__unctx_async_handlers__";
const asyncHandlers$1 = _globalThis$1[asyncHandlersKey$1] || (_globalThis$1[asyncHandlersKey$1] = /* @__PURE__ */ new Set());

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: false
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.11.2";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      once: /* @__PURE__ */ new Set(),
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn)),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
// @__NO_SIDE_EFFECTS__
function tryUseNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  return nuxtAppInstance || null;
}
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  const nuxtAppInstance = /* @__PURE__ */ tryUseNuxtApp();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, (/* @__PURE__ */ useNuxtApp())._route);
  }
  return (/* @__PURE__ */ useNuxtApp())._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if ((/* @__PURE__ */ useNuxtApp())._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef((/* @__PURE__ */ useNuxtApp()).payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version[0] === "3";
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2) {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && "production" !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
function useSeoMeta(input, options) {
  const { title, titleTemplate, ...meta } = input;
  return useHead({
    title,
    titleTemplate,
    // @ts-expect-error runtime type
    _flatMeta: meta
  }, {
    ...options,
    transform(t) {
      const meta2 = unpackMeta({ ...t._flatMeta });
      delete t._flatMeta;
      return {
        // @ts-expect-error runtime type
        ...t,
        meta: meta2
      };
    }
  });
}
function useServerHead(input, options = {}) {
  const head = options.head || injectHead();
  delete options.head;
  if (head)
    return head.push(input, { ...options, mode: "server" });
}
[CapoPlugin({ track: true })];
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => (/* @__PURE__ */ useNuxtApp()).vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink", "externalRelAttribute": "noopener noreferrer", "activeClass": "router-link-active", "exactActiveClass": "router-link-exact-active" };
const asyncDataDefaults = { "deep": true };
const fetchDefaults = {};
async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}
const _routes = [
  {
    name: "/warehouse",
    path: "/warehouse",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./index-CPXYWajP.mjs').then((m) => m.default || m)
  },
  {
    name: "/match",
    path: "/match/:id",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./_id_-Dyzhe9lq.mjs').then((m) => m.default || m)
  },
  {
    name: "/tag",
    path: "/tag/:tag",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./_tag_-BlhfRD8e.mjs').then((m) => m.default || m)
  },
  {
    name: "slug",
    path: "/:slug()",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./_slug_-fyN5opub.mjs').then((m) => m.default || m)
  },
  {
    name: "coach-id",
    path: "/coach/:id()",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./_id_-DkJmhjM6.mjs').then((m) => m.default || m)
  },
  {
    name: "iframe",
    path: "/iframe",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./index-Cc_fWVUx.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./index-pCNUTCuT.mjs').then((m) => m.default || m)
  },
  {
    name: "league-league_id",
    path: "/league/:league_id()",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./_league_id_-D87XgT_F.mjs').then((m) => m.default || m)
  },
  {
    name: "league",
    path: "/league",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./index-Dt_90OzQ.mjs').then((m) => m.default || m)
  },
  {
    name: "livescore-category",
    path: "/livescore/:category()",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./_category_-D6nSNlhX.mjs').then((m) => m.default || m)
  },
  {
    name: "match-id",
    path: "/match/:id()",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./_id_-Dyzhe9lq.mjs').then((m) => m.default || m)
  },
  {
    name: "match",
    path: "/match",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./index-fr0-ebP_.mjs').then((m) => m.default || m)
  },
  {
    name: "player-id",
    path: "/player/:id()",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./_id_-Bxh4ueuk.mjs').then((m) => m.default || m)
  },
  {
    name: "player",
    path: "/player",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./index-B489IzY6.mjs').then((m) => m.default || m)
  },
  {
    name: "team-id",
    path: "/team/:id()",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./_id_-newODMKJ.mjs').then((m) => m.default || m)
  },
  {
    name: "team",
    path: "/team",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./index-BTcJ9kvB.mjs').then((m) => m.default || m)
  },
  {
    name: "warehouse",
    path: "/warehouse",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./index-CPXYWajP.mjs').then((m) => m.default || m)
  }
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const trailing_45slash_45redirect_45global = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  var _a;
  if (to.path !== "/" && ((_a = to.path) == null ? void 0 : _a.endsWith("/"))) {
    return navigateTo({
      ...to,
      path: to.path.slice(0, -1)
    }, { redirectCode: 301 });
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  trailing_45slash_45redirect_45global,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    useError();
    router.afterEach(async (to, _from, failure) => {
      delete nuxtApp._processingMiddleware;
      if (failure) {
        await nuxtApp.callHook("page:loading:end");
      }
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      } else if (to.fullPath !== initialURL && (to.redirectedFrom || !isSamePath(to.fullPath, initialURL))) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function useRequestEvent(nuxtApp = /* @__PURE__ */ useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestHeaders(include) {
  const event = useRequestEvent();
  const _headers = event ? getRequestHeaders(event) : {};
  {
    return _headers;
  }
}
function useRequestFetch() {
  var _a;
  return ((_a = useRequestEvent()) == null ? void 0 : _a.$fetch) || globalThis.$fetch;
}
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const handler = _handler ;
  const getDefault = () => null;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = options.server ?? true;
  options.default = options.default ?? getDefault;
  options.getCachedData = options.getCachedData ?? getDefaultCachedData;
  options.lazy = options.lazy ?? false;
  options.immediate = options.immediate ?? true;
  options.deep = options.deep ?? asyncDataDefaults.deep;
  options.dedupe = options.dedupe ?? "cancel";
  const hasCachedData = () => options.getCachedData(key, nuxtApp) != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_b = nuxtApp.payload._errors)[key] ?? (_b[key] = null);
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref(options.getCachedData(key, nuxtApp) ?? options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle")
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer(opts.dedupe ?? options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxtApp.isHydrating && opts._initial !== false) && hasCachedData()) {
      return Promise.resolve(options.getCachedData(key, nuxtApp));
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = null;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = null;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = null;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key].cancelled = true;
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const _key = opts.key || hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch: watch2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watch2 === false ? [] : [_fetchOptions, _request, ...watch2 || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    if (timeoutLength) {
      setTimeout(() => controller.abort(), timeoutLength);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  return segments;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? ((_a = opts.default) == null ? void 0 : _a.call(opts)));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function definePayloadReducer(name, reduce) {
  {
    (/* @__PURE__ */ useNuxtApp()).ssrContext._payloadReducers[name] = reduce;
  }
}
function useRequestURL() {
  {
    return getRequestURL(useRequestEvent());
  }
}
const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_1$1 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function resolveTrailingSlashBehavior(to, resolve) {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, options.trailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, options.trailingSlash)
    };
    return resolvedPath;
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const config = /* @__PURE__ */ useRuntimeConfig();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isAbsoluteUrl = computed(() => typeof to.value === "string" && hasProtocol(to.value, { acceptRelative: true }));
      const hasTarget = computed(() => props.target && props.target !== "_self");
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (hasTarget.value) {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || isAbsoluteUrl.value;
      });
      const prefetched = ref(false);
      const el = void 0;
      const elRef = void 0;
      return () => {
        var _a, _b;
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null : to.value && !props.external && !isAbsoluteUrl.value ? resolveTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), router.resolve) : to.value || null;
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          const navigate = () => navigateTo(href, { replace: props.replace, external: props.external });
          return slots.default({
            href,
            navigate,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_b = slots.default) == null ? void 0 : _b.call(slots));
      };
    }
  });
}
const __nuxt_component_0$3 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const _0_siteConfig_MwZUzHrRNP = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-site-config:init",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a;
    const state = useState("site-config");
    {
      const context = (_a = useRequestEvent()) == null ? void 0 : _a.context;
      nuxtApp.hooks.hook("app:rendered", () => {
        state.value = context == null ? void 0 : context.siteConfig.get({
          debug: (/* @__PURE__ */ useRuntimeConfig())["nuxt-site-config"].debug,
          resolveRefs: true
        });
      });
    }
    let stack = {};
    return {
      provide: {
        nuxtSiteConfig: stack
      }
    };
  }
});
const isVue2 = false;
/*!
 * pinia v2.2.2
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
const ACTION_MARKER = Symbol();
const ACTION_NAME = Symbol();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  } else if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!("production" !== "production"))) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = { deep: true };
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!("production" !== "production"))) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  const action = (fn, name = "") => {
    if (ACTION_MARKER in fn) {
      fn[ACTION_NAME] = name;
      return fn;
    }
    const wrappedAction = function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: wrappedAction[ACTION_NAME],
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = fn.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
    wrappedAction[ACTION_MARKER] = true;
    wrappedAction[ACTION_NAME] = name;
    return wrappedAction;
  };
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = action(prop, key);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
// @__NO_SIDE_EFFECTS__
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "pinia",
  setup(nuxtApp) {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);
    setActivePinia(pinia);
    {
      nuxtApp.payload.pinia = pinia.state.value;
    }
    return {
      provide: {
        pinia
      }
    };
  }
});
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
{
  reducers.Island = (data) => data && (data == null ? void 0 : data.__nuxt_island);
}
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
function titleCase(s) {
  return s.replaceAll("-", " ").replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
}
const titles_dw2T9lEw4h = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-seo:fallback-titles",
  env: {
    islands: false
  },
  setup() {
    const route = useRoute();
    const title = computed(() => {
      var _a, _b;
      if (typeof ((_a = route.meta) == null ? void 0 : _a.title) === "string")
        return (_b = route.meta) == null ? void 0 : _b.title;
      const path = withoutTrailingSlash(route.path || "/");
      const lastSegment = path.split("/").pop();
      return lastSegment ? titleCase(lastSegment) : null;
    });
    const minimalPriority = {
      // give nuxt.config values higher priority
      tagPriority: 101
    };
    useHead({ title: () => title.value }, minimalPriority);
  }
});
function useSiteConfig(options) {
  let stack;
  stack = useRequestEvent().context.siteConfig.get(defu({ resolveRefs: true }, options));
  return stack || {};
}
const siteConfig_izaWKZ8rEu = /* @__PURE__ */ defineNuxtPlugin(() => {
  const head = injectHead();
  if (!head)
    return;
  const siteConfig = useSiteConfig();
  const input = {
    meta: [],
    templateParams: {
      site: siteConfig,
      // support legacy
      siteUrl: siteConfig.url,
      siteName: siteConfig.name
    }
  };
  if (siteConfig.separator)
    input.templateParams.separator = siteConfig.separator;
  if (siteConfig.titleSeparator)
    input.templateParams.titleSeparator = siteConfig.titleSeparator;
  if (siteConfig.description) {
    input.templateParams.siteDescription = siteConfig.description;
    input.meta.push(
      {
        name: "description",
        content: "%site.description"
      }
    );
  }
  head.push(input, { tagPriority: 150 });
});
const inferSeoMetaPlugin_Uk9bcXDHeN = /* @__PURE__ */ defineNuxtPlugin(() => {
  const head = injectHead();
  if (!head)
    return;
  head.use(InferSeoMetaPlugin());
});
function useNitroOrigin(e) {
  {
    e = e || useRequestEvent();
    return e.context.siteConfigNitroOrigin;
  }
}
function resolveSitePath(pathOrUrl, options) {
  let path = pathOrUrl;
  if (hasProtocol(pathOrUrl, { strict: false, acceptRelative: true })) {
    const parsed = parseURL(pathOrUrl);
    path = parsed.pathname;
  }
  const base = withLeadingSlash(options.base || "/");
  if (base !== "/" && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  let origin = withoutTrailingSlash(options.absolute ? options.siteUrl : "");
  if (base !== "/" && origin.endsWith(base)) {
    origin = origin.slice(0, origin.indexOf(base));
  }
  const baseWithOrigin = options.withBase ? withBase(base, origin || "/") : origin;
  const resolvedUrl = withBase(path, baseWithOrigin);
  return path === "/" && !options.withBase ? withTrailingSlash(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl);
}
function fixSlashes(trailingSlash, pathOrUrl) {
  const $url = parseURL(pathOrUrl);
  const isFileUrl = $url.pathname.includes(".");
  if (isFileUrl)
    return pathOrUrl;
  const fixedPath = trailingSlash ? withTrailingSlash($url.pathname) : withoutTrailingSlash($url.pathname);
  return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}
function createSitePathResolver(options = {}) {
  const siteConfig = useSiteConfig();
  const nitroOrigin = useNitroOrigin();
  const nuxtBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL || "/";
  return (path) => {
    return computed(() => resolveSitePath(unref(path), {
      absolute: unref(options.absolute),
      withBase: unref(options.withBase),
      siteUrl: unref(options.canonical) !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base: nuxtBase
    }));
  };
}
function withSiteUrl(path, options = {}) {
  const siteConfig = useSiteConfig();
  const nitroOrigin = useNitroOrigin();
  const base = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL || "/";
  return computed(() => {
    return resolveSitePath(unref(path), {
      absolute: true,
      siteUrl: unref(options.canonical) !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base,
      withBase: unref(options.withBase)
    });
  });
}
function isInternalRoute(path) {
  return path.startsWith("/_") || path.startsWith("@");
}
function filterIsOgImageOption(key) {
  const keys = [
    "url",
    "extension",
    "width",
    "height",
    "fonts",
    "alt",
    "props",
    "renderer",
    "html",
    "component",
    "renderer",
    "emojis",
    "_query",
    "satori",
    "resvg",
    "sharp",
    "screenshot",
    "cacheMaxAgeSeconds"
  ];
  return keys.includes(key);
}
function separateProps(options, ignoreKeys = []) {
  options = options || {};
  const _props = defu(options.props, Object.fromEntries(
    Object.entries({ ...options }).filter(([k]) => !filterIsOgImageOption(k) && !ignoreKeys.includes(k))
  ));
  const props = {};
  Object.entries(_props).forEach(([key, val]) => {
    props[key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] = val;
  });
  return {
    ...Object.fromEntries(
      Object.entries({ ...options }).filter(([k]) => filterIsOgImageOption(k) || ignoreKeys.includes(k))
    ),
    props
  };
}
function withoutQuery(path) {
  return path.split("?")[0];
}
function getExtension(path) {
  path = withoutQuery(path);
  const lastSegment = path.split("/").pop() || path;
  return lastSegment.split(".").pop() || lastSegment;
}
const og_image_canonical_urls_server_YYKCE0iokV = /* @__PURE__ */ defineNuxtPlugin({
  setup(nuxtApp) {
    nuxtApp.hooks.hook("app:rendered", async (ctx) => {
      const { ssrContext } = ctx;
      const e = useRequestEvent();
      const path = parseURL(e.path).pathname;
      if (isInternalRoute(path))
        return;
      ssrContext == null ? void 0 : ssrContext.head.use({
        key: "nuxt-og-image:overrides-and-canonical-urls",
        hooks: {
          "tags:resolve": async (ctx2) => {
            const hasPrimaryPayload = ctx2.tags.some((tag) => tag.tag === "script" && tag.props.id === "nuxt-og-image-options");
            let overrides;
            for (const tag of ctx2.tags) {
              if (tag.tag === "script" && tag.props.id === "nuxt-og-image-overrides") {
                if (hasPrimaryPayload) {
                  overrides = separateProps(parse$1(tag.innerHTML || "{}"));
                  delete ctx2.tags[ctx2.tags.indexOf(tag)];
                } else {
                  tag.props.id = "nuxt-og-image-options";
                  tag.innerHTML = stringify(separateProps(parse$1(tag.innerHTML || "{}")));
                  tag._d = "script:id:nuxt-og-image-options";
                }
                break;
              }
            }
            ctx2.tags = ctx2.tags.filter(Boolean);
            for (const tag of ctx2.tags) {
              if (tag.tag === "meta" && (tag.props.property === "og:image" || ["twitter:image:src", "twitter:image"].includes(tag.props.name))) {
                if (!tag.props.content.startsWith("https")) {
                  await nuxtApp.runWithContext(() => {
                    tag.props.content = toValue(withSiteUrl(tag.props.content, {
                      withBase: true
                    }));
                  });
                }
              } else if (overrides && tag.tag === "script" && tag.props.id === "nuxt-og-image-options") {
                tag.innerHTML = stringify(defu(overrides, parse$1(tag.innerHTML)));
              }
            }
          }
        }
      });
    });
  }
});
function getOgImagePath(pagePath, _options) {
  const baseURL2 = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
  const options = defu(_options, useOgImageRuntimeConfig().defaults);
  return joinURL("/", baseURL2, "__og-image__/image", pagePath, `og.${options.extension}`);
}
function useOgImageRuntimeConfig() {
  return (/* @__PURE__ */ useRuntimeConfig())["nuxt-og-image"];
}
const componentNames = [{ "hash": "eQ6ZSzmuSi", "pascalName": "BrandedLogo", "kebabName": "branded-logo", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }, { "hash": "urK4vBHedV", "pascalName": "Frame", "kebabName": "frame", "category": "community", "credits": "@arashsheyda <https://github.com/arashsheyda>" }, { "hash": "25HYRU2CwN", "pascalName": "Nuxt", "kebabName": "nuxt", "category": "community", "credits": "NuxtLabs <https://nuxtlabs.com/>" }, { "hash": "t4cC294xbl", "pascalName": "NuxtSeo", "kebabName": "nuxt-seo", "category": "community", "credits": "Nuxt SEO <https://nuxtseo.com/>" }, { "hash": "Ti15ewGcfK", "pascalName": "Pergel", "kebabName": "pergel", "category": "community", "credits": "Pergel <https://nuxtlabs.com/>" }, { "hash": "g66oUAfYIc", "pascalName": "SimpleBlog", "kebabName": "simple-blog", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }, { "hash": "PdTiW3yQ0N", "pascalName": "UnJs", "kebabName": "un-js", "category": "community", "credits": "UnJS <https://unjs.io/>" }, { "hash": "dxElbCCT8d", "pascalName": "Wave", "kebabName": "wave", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }, { "hash": "GANho8xkgv", "pascalName": "WithEmoji", "kebabName": "with-emoji", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }];
function createOgImageMeta(src, input, resolvedOptions, ssrContext) {
  const _input = separateProps(defu(input, ssrContext._ogImagePayload));
  let url = src || input.url || resolvedOptions.url;
  if (!url)
    return;
  if (input._query && Object.keys(input._query).length && url)
    url = withQuery(url, { _query: input._query });
  let urlExtension = getExtension(url) || resolvedOptions.extension;
  if (urlExtension === "jpg")
    urlExtension = "jpeg";
  const meta = [
    { property: "og:image", content: url },
    { property: "og:image:type", content: `image/${urlExtension}` },
    { name: "twitter:card", content: "summary_large_image" },
    // we don't need this but avoids issue when using useSeoMeta({ twitterImage })
    { name: "twitter:image", content: url },
    { name: "twitter:image:src", content: url }
  ];
  if (resolvedOptions.width) {
    meta.push({ property: "og:image:width", content: resolvedOptions.width });
    meta.push({ name: "twitter:image:width", content: resolvedOptions.width });
  }
  if (resolvedOptions.height) {
    meta.push({ property: "og:image:height", content: resolvedOptions.height });
    meta.push({ name: "twitter:image:height", content: resolvedOptions.height });
  }
  if (resolvedOptions.alt) {
    meta.push({ property: "og:image:alt", content: resolvedOptions.alt });
    meta.push({ name: "twitter:image:alt", content: resolvedOptions.alt });
  }
  ssrContext._ogImageInstances = ssrContext._ogImageInstances || [];
  const script = [];
  if (src) {
    script.push({
      id: "nuxt-og-image-options",
      type: "application/json",
      processTemplateParams: true,
      innerHTML: () => {
        const payload = resolveUnrefHeadInput(_input);
        if (typeof payload.props.title === "undefined")
          payload.props.title = "%s";
        delete payload.url;
        return stringify(payload);
      },
      // we want this to be last in our head
      tagPosition: "bodyClose"
    });
  }
  const instance = useServerHead({
    script,
    meta
  }, {
    tagPriority: 35
  });
  ssrContext._ogImagePayload = _input;
  ssrContext._ogImageInstances.push(instance);
}
function normaliseOptions(_options) {
  const options = { ...unref(_options) };
  if (!options)
    return options;
  if (options.component && componentNames) {
    const originalName = options.component;
    for (const component of componentNames) {
      if (component.pascalName.endsWith(originalName) || component.kebabName.endsWith(originalName)) {
        options.component = component.pascalName;
        break;
      }
    }
  }
  return options;
}
const route_rule_og_image_server_xL1rf4QeLE = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook("app:rendered", async (ctx) => {
    var _a, _b, _c, _d, _e, _f;
    const { ssrContext } = ctx;
    const e = useRequestEvent();
    const path = parseURL(e.path).pathname;
    if (isInternalRoute(path))
      return;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (_b = (_a = ssrContext == null ? void 0 : ssrContext.runtimeConfig) == null ? void 0 : _a.nitro) == null ? void 0 : _b.routeRules })
    );
    let routeRules = defu({}, ..._routeRulesMatcher.matchAll(
      withoutBase(path.split("?")[0], (_c = ssrContext == null ? void 0 : ssrContext.runtimeConfig) == null ? void 0 : _c.app.baseURL)
    ).reverse()).ogImage;
    if (typeof routeRules === "undefined")
      return;
    const ogImageInstances = nuxtApp.ssrContext._ogImageInstances || [];
    if (routeRules === false) {
      ogImageInstances == null ? void 0 : ogImageInstances.forEach((e2) => {
        e2.dispose();
      });
      nuxtApp.ssrContext._ogImagePayload = void 0;
      nuxtApp.ssrContext._ogImageInstances = void 0;
      return;
    }
    routeRules = normaliseOptions(defu((_f = (_e = (_d = nuxtApp.ssrContext) == null ? void 0 : _d.event.context._nitro) == null ? void 0 : _e.routeRules) == null ? void 0 : _f.ogImage, routeRules));
    const { defaults } = useOgImageRuntimeConfig();
    const resolvedOptions = normaliseOptions(defu(routeRules, defaults));
    const src = getOgImagePath(ssrContext.url, resolvedOptions);
    createOgImageMeta(src, routeRules, resolvedOptions, nuxtApp.ssrContext);
  });
});
const plugin_YksOOA8Nkt = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SnackbarService);
  return {
    provide: {
      snackbarOptions: (/* @__PURE__ */ useRuntimeConfig()).public.snackbar
    }
  };
});
const API_ROUTERS = {
  CONFIGURATIONS: "/oapi/v1/configurations",
  CONFIGURATIONS_BRAND: "/oapi/v1/configuration-brand",
  MENU: "/oapi/v1/menu",
  PAGE: {
    HOME_PAGE: "/oapi/v1/pages/home-page",
    SLUG: "/oapi/v1/pages/slug",
    ROUTER: "/oapi/v1/pages"
  },
  AUTH: {
    LOGIN: "/oapi/v1/auth/login",
    LOGOUT: "/oapi/v1/auth/logout",
    REGISTER: "/oapi/v1/auth/register"
  },
  POST: {
    LIST: "/oapi/v1/posts",
    SLUG: "/oapi/v1/posts/slug",
    TAG: {
      LIST: "/oapi/v1/tags/",
      SLUG: "/oapi/v1/tags/"
    },
    CATEGORY: {
      LIST: "/oapi/v1/categories",
      DETAIL: "/oapi/v1/categories/",
      LIST_POST: "/oapi/v1/categories/post"
    }
  },
  USER: {
    ME: "/oapi/v1/users/me"
  },
  COMMENTS: {
    SEND: "/comments",
    TREE: "/oapi/v1/comments/tree"
  },
  CATEGORY: {
    LIST: "/api/categories/",
    DETAIL: "/api/categories/"
  },
  AUTHOR: {
    INFO: "/api/author"
  },
  LIVESCORE: {
    COUNTRIES: "/api/v1/countries",
    COMP: "/api/v1/comp",
    COMP_LIST: "/api/v1/comp-list",
    COMP_LIST_ALL: "/api/v1/comp-list-all",
    COMP_SEASON: "/api/v1/comp-season?lang=vi",
    MATCHS_LIVE: "/api/v1/matchs/live",
    MATCHS_RECENT: "/api/v1/matchs/recent",
    MATCHS_LIVE_DETAIL: "/api/v1/matchs/live/detail",
    MATCHS_CORNER: "/api/v1/matchs/corner",
    ODDS_CORNER_MAIN: "/api/v1/odds/conner/main",
    ODDS_DETAIL: "/api/v1/odds/detail",
    MATCHS_COMPANY_ODD: "/api/v1/matchs/company-odd",
    MATCH_RECENT_RESULT: "/api/v1/matchs/recent/result",
    MATCH_SEASON_RESULT: "/api/v1/matchs/season-result",
    SEASONS_TABLE_STANDING: "/api/v1/seasons/table-standing",
    MATCHS_ANALYSIS: "/api/v1/matchs/analysis",
    MATCHS_LINEUP: "/api/v1/matchs/lineup",
    MATCHS_RECENT_DETAIL: "/api/v1/matchs/recent-detail",
    MATCHES_ANALYSIS: "/api/v1/matchs/ianalysis",
    SEASONS_TABLE: "/api/v1/seasons/table",
    MATCHS_LAST_LINEUP: "/api/v1/matchs/last-lineup",
    ODDS_CHANGE_HISTORY: "/api/v1/odds/change/history",
    //https://www.isportsapi.com/docs.html?id=73
    ODDS_EUROHADICAP: "/api/v1/odds/eurohadicap",
    ODDS_CONNER_FULL: "/api/v1/odds/conner/full",
    ODDS_CONNER_HAFT: "/api/v1/odds/conner/haft",
    ODDS_CONNER_HISTORY_FULL: "/api/v1/odds/conner/history/full",
    ODDS_CONNER_HISTORY_HAFT: "/api/v1/odds/conner/history/haft",
    ODDS_CORRECT_SCORE: "/api/v1/odds/correct-score/prematch",
    ODDS_CORRECT_SCORE_HISTORY: "/api/v1/odds/correct-score/prematch/history",
    ODDS_EURO_HANDICAP_HISTORY: "/api/v1/odds/euro-hdc/change",
    ODDS_DOUBLE_CHANCE: "/api/v1/odds/double-change",
    ODDS_DOUBLE_CHANCE_HISTORY: "/api/v1/odds/double-change/history",
    ODDS_EUROPEAN: "/api/v1/odds/european",
    ODDS_EURO_HANDICAP_HISTORY1: "/api/v1/odds/european/history",
    ODDS_IMAIN: "/api/v1/odds/imain",
    ODDS_ALL_IMAIN: "/api/v1/odds/imain-all",
    TEAMS: "/api/v1/teams",
    COMPETITION_DETAIL: "/api/v1/comp",
    PLAYER_STATISTICS: "/api/v1/matchs/player/stats",
    LINEUP_TEAM: "/api/v1/teams-players",
    WAREHOUSE: "/api/v1/warehouse",
    SCHEDULE: "/api/v1/team-future-matches",
    OLD_SCHEDULE: "/api/v1/team-history-matches",
    TEAM_HONOR: "/api/v1/team-honor",
    SEASON_TRANSFER: "/api/v1/comp-detail",
    PLAYER_TRANSFER: "/api/v1/teams/transfer",
    PLAYER_POSITION: "/api/v1/players/detail",
    COMPETITION_SEASON: "/api/v1/teams/list-competitions",
    PLAYER_INFO: "/api/v1/teams/players/season-stats",
    MATCHES_BY_SEASON: "/api/v1/matchs/comp",
    COMP_DETAIL: "/api/v1/comp-detail",
    ODDS_SEASON_IMAIN: "/api/v1/odds/season/imain",
    PLAYER_DETAIL: "/api/v1/players/detail",
    PLAYER_TRANSFERS: "/api/v1/players/transfer",
    PLAYER_MATCH: "/api/v1/players/stats",
    PLAYER_HONOR: "/api/v1/players/honor",
    COACH_INFO: "/api/v1/coachs/detail",
    COACH_HONOR: "/api/v1/coachs/honor",
    TEAM_ACHIEVEMENT: "/api/v1/teams/near-year",
    PLAYER_COMPETITIONS: "/api/v1/players/competitions",
    PLAYER_PERFORMANCE: "/api/v1/players/stats-season",
    SEASONS_BEST_LINEUP: "/api/v1/seasons/best-lineup",
    TEAM_LIST: "/api/v1/teams/list",
    LIVE_MATCH: "/api/v1/matchs/live-match",
    PLAYER_LIST: "/api/v1/players/list",
    MATCHS_RECENT_SCHEDULE: "/api/v1/matchs/recent-schedules",
    MATCHS_RECENT_RESULT: "/api/v1/matchs/recent-result"
  },
  OBJECTS_META: {
    DETAIL: "/oapi/v1/objects-meta"
  },
  LANGUAGE: {
    LIST: "/oapi/v1/languages"
  }
};
const ROUTERS_OLD = {
  HOMEPAGE: "/",
  LOGIN: "/dang-nhap",
  REGISTER: "/dang-ky",
  CATEGORY: "/danh-muc",
  NEWS_CATEGORY: "",
  NEWS_TAG: "/tag",
  NEWS: "",
  NEWS_PAGE: "/tin-tuc",
  SEARCH: "/tim-kiem",
  USER_PROFILE: "/thanh-vien/ho-so",
  FOOTBALL_RESULT: "/bong-da/ket-qua-bong-da",
  FOOTBALL_SCHEDULE: "/bong-da/lich-thi-dau",
  FOOTBALL_FAVORITES: "/bong-da/theo-doi",
  FOOTBALL_FAVORITES_LEAGUES: "/bong-da/theo-doi/giai-dau",
  FOOTBALL_FAVORITES_TEAMS: "/bong-da/theo-doi/doi",
  MATCH_DETAIL: "/match/",
  LEAGUES: "/league",
  FOOTBALL_LIVESCORE_TAB: "/?livescore_tab=",
  MATCH: "/match",
  FOOTBALL: "/bong-da",
  NEWS_CATEGORY_NAME: "/category_",
  PLAYER: "/player/",
  TEAM: "/team/",
  WAREHOUSE: "/warehouse",
  COACH: "/coach"
};
const ROUTERS = {
  HOMEPAGE: "HOMEPAGE",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  CATEGORY: "CATEGORY",
  NEWS_CATEGORY: "NEWS_CATEGORY",
  NEWS_TAG: "NEWS_TAG",
  NEWS: "NEWS",
  NEWS_PAGE: "NEWS_PAGE",
  SEARCH: "SEARCH",
  USER_PROFILE: "USER_PROFILE",
  FOOTBALL_RESULT: "FOOTBALL_RESULT",
  FOOTBALL_SCHEDULE: "FOOTBALL_SCHEDULE",
  FOOTBALL_FAVORITES: "FOOTBALL_FAVORITES",
  FOOTBALL_FAVORITES_LEAGUES: "FOOTBALL_FAVORITES_LEAGUES",
  FOOTBALL_FAVORITES_TEAMS: "FOOTBALL_FAVORITES_TEAMS",
  MATCH_DETAIL: "MATCH_DETAIL",
  LEAGUES: "LEAGUES",
  FOOTBALL_LIVESCORE_TAB: "FOOTBALL_LIVESCORE_TAB",
  MATCH: "MATCH",
  FOOTBALL: "FOOTBALL",
  NEWS_CATEGORY_NAME: "NEWS_CATEGORY_NAME",
  PLAYER: "PLAYER",
  TEAM: "TEAM",
  WAREHOUSE: "WAREHOUSE",
  COACH: "COACH"
};
const ROUTERS_LANG = {
  HOMEPAGE: {
    vi: "/",
    en: "/"
  },
  LOGIN: {
    vi: "/dang-nhap",
    en: "/dang-nhap"
  },
  REGISTER: {
    vi: "/dang-ky",
    en: "/dang-ky"
  },
  CATEGORY: {
    vi: "/danh-muc",
    en: "/danh-muc"
  },
  NEWS_CATEGORY: {
    vi: "",
    en: ""
  },
  NEWS_TAG: {
    vi: "/tag",
    en: "/tag"
  },
  NEWS: {
    vi: "",
    en: ""
  },
  NEWS_PAGE: {
    vi: "/tin-tuc",
    en: "/news"
  },
  SEARCH: {
    vi: "/tim-kiem",
    en: "/tim-kiem"
  },
  USER_PROFILE: {
    vi: "/thanh-vien/ho-so",
    en: "/thanh-vien/ho-so"
  },
  FOOTBALL_RESULT: {
    vi: "/bong-da/ket-qua-bong-da",
    en: "/football/results"
  },
  FOOTBALL_SCHEDULE: {
    vi: "/bong-da/lich-thi-dau",
    en: "/football/schedule"
  },
  FOOTBALL_FAVORITES: {
    vi: "/bong-da/theo-doi",
    en: "/football/favourites"
  },
  FOOTBALL_FAVORITES_LEAGUES: {
    vi: "/bong-da/theo-doi/giai-dau",
    en: "/football/favourites/fleagues"
  },
  FOOTBALL_FAVORITES_TEAMS: {
    vi: "/bong-da/theo-doi/doi",
    en: "/football/favourites/fteams"
  },
  MATCH_DETAIL: {
    vi: "/match/",
    en: "/match/"
  },
  LEAGUES: {
    vi: "/league",
    en: "/league"
  },
  FOOTBALL_LIVESCORE_TAB: {
    vi: "/?livescore_tab=",
    en: "/?livescore_tab="
  },
  MATCH: {
    vi: "/match",
    en: "/match"
  },
  FOOTBALL: {
    vi: "/bong-da",
    en: "/bong-da"
  },
  NEWS_CATEGORY_NAME: {
    vi: "/category_",
    en: "/category_"
  },
  PLAYER: {
    vi: "/player/",
    en: "/player/"
  },
  TEAM: {
    vi: "/team/",
    en: "/team/"
  },
  WAREHOUSE: {
    vi: "/warehouse",
    en: "/warehouse"
  },
  COACH: {
    vi: "/coach",
    en: "/coach"
  }
};
const NAME_ROUTERS = {
  SLUG: "slug",
  NEWS: "NEWS",
  TAG: "/tag",
  NEWS_LIST: "/news",
  NEWS_CATEGORY: "/category_",
  NEWS_TAG: "/tag_",
  DETAIL_NEWS: "/detail-news",
  DETAIL_LEAGUE: "league-league_id",
  LEAGUE: "league",
  PLAYER: "player",
  TEAM: "team",
  MATCH: "match",
  FAVORITES_TEAM: "favourites_teams"
};
const ROUTERS_GROUP = {
  MATCH: "/match/",
  ODDS: "/oddscomp/",
  ASIAN_HANDICAP_ODDS: "/asian-handicap-odds/",
  ODDS_1X2: "/1x2-odds/",
  OVER_UNDER_ODDS: "/over-under-odds/",
  CORNER_OU_ODDS: "/corner-ou-odds/",
  CORRECT_SCORE_ODDS: "/correct-score-odds/",
  EURO_HANDICAP_ODDS: "/euro-handicap-odds/",
  DOUBLE_CHANCE_ODDS: "/double-chance-odds/",
  LIVESCORE: [
    "/",
    "/bong-da/theo-doi",
    "/bong-da/ket-qua-bong-da",
    "/bong-da/lich-thi-dau",
    "/bong-da/theo-doi/giai-dau",
    "/bong-da/theo-doi/doi",
    "/oddscomp/",
    "/asian-handicap-odds",
    "/over-under-odds",
    "/1x2-odds",
    "/corner-ou-odds",
    "/correct-score-odds",
    "/euro-handicap-odds",
    "/double-chance-odds"
  ],
  NEW: {},
  LEAGUE: "/league/"
};
const ROUTER_TEAM_NAME = {
  SUMMARY: "summary",
  TEAMSCHE: "teamsche",
  LINEUP: "lineup",
  PLAYERZH: "playerzh",
  PLAYERDATA: "playerdata",
  PLAYER: "player",
  TEAM: "team",
  COACH: "coach",
  ACHIEVEMENTS: "achievements"
};
const useShareCommon = createSharedComposable(() => {
  const route = useRoute();
  const useLocale = ref({
    defaultLocale: "vi",
    LocaleMessage: []
  });
  const isNavVisible = ref(true);
  const $t = (key) => {
    var _a, _b;
    return ((_b = (_a = useLocale.value) == null ? void 0 : _a.LocaleMessage) == null ? void 0 : _b[key]) ?? key;
  };
  const $trouter = (key) => {
    var _a;
    return ((_a = ROUTERS_LANG == null ? void 0 : ROUTERS_LANG[key]) == null ? void 0 : _a[useLocale.value.defaultLocale]) ?? (ROUTERS_OLD == null ? void 0 : ROUTERS_OLD[key]) ?? key;
  };
  return {
    route,
    useLocale,
    $t,
    $trouter,
    isNavVisible
  };
});
const _sfc_main$f = {
  __name: "BreadcrumbsLite",
  __ssrInlineRender: true,
  props: {
    breadcrumbs: Array,
    isCustom: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const { $t } = useShareCommon();
    const { breadcrumbs, isCustom } = __props;
    const initBreadCrums = computed(() => {
      if (isCustom) {
        return breadcrumbs;
      } else {
        return [
          {
            label: $t("Home page"),
            to: "/",
            last: "off"
          },
          ...breadcrumbs ?? []
        ];
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "crumbs container mb-4" }, _attrs))}><nav aria-label="breadcrumb" class="my-1"><ol class="breadcrumb"><!--[-->`);
      ssrRenderList(unref(initBreadCrums), (breadcrumb, index) => {
        _push(`<li class="breadcrumb-item on d-flex align-items-center">`);
        if (breadcrumb == null ? void 0 : breadcrumb.to) {
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: breadcrumb == null ? void 0 : breadcrumb.to,
            class: breadcrumb == null ? void 0 : breadcrumb.last
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(breadcrumb == null ? void 0 : breadcrumb.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(breadcrumb == null ? void 0 : breadcrumb.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span>${ssrInterpolate(breadcrumb == null ? void 0 : breadcrumb.label)}</span>`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ol></nav></div>`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BreadcrumbsLite.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('image-meta').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return Number.parseInt(input, 10);
    }
  }
}
function parseDensities(input = "") {
  if (input === void 0 || !input.length) {
    return [];
  }
  const densities = /* @__PURE__ */ new Set();
  for (const density of input.split(" ")) {
    const d = Number.parseInt(density.replace("x", ""));
    if (d) {
      densities.add(d);
    }
  }
  return Array.from(densities);
}
function checkDensities(densities) {
  if (densities.length === 0) {
    throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
  }
}
function parseSizes(input) {
  const sizes = {};
  if (typeof input === "string") {
    for (const entry2 of input.split(/[\s,]+/).filter((e) => e)) {
      const s = entry2.split(":");
      if (s.length !== 2) {
        sizes["1px"] = s[0].trim();
      } else {
        sizes[s[0].trim()] = s[1].trim();
      }
    }
  } else {
    Object.assign(sizes, input);
  }
  return sizes;
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  var _a, _b;
  if (input && typeof input !== "string") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (!input || input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        const alias = ctx.options.alias[base];
        if (alias) {
          input = joinURL(alias, input.slice(base.length));
        }
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a = _options.modifiers) == null ? void 0 : _a.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b = _options.modifiers) == null ? void 0 : _b.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  var _a, _b, _c, _d, _e;
  const width = parseSize((_a = opts.modifiers) == null ? void 0 : _a.width);
  const height = parseSize((_b = opts.modifiers) == null ? void 0 : _b.height);
  const sizes = parseSizes(opts.sizes);
  const densities = ((_c = opts.densities) == null ? void 0 : _c.trim()) ? parseDensities(opts.densities.trim()) : ctx.options.densities;
  checkDensities(densities);
  const hwRatio = width && height ? height / width : 0;
  const sizeVariants = [];
  const srcsetVariants = [];
  if (Object.keys(sizes).length >= 1) {
    for (const key in sizes) {
      const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        continue;
      }
      sizeVariants.push({
        size: variant.size,
        screenMaxWidth: variant.screenMaxWidth,
        media: `(max-width: ${variant.screenMaxWidth}px)`
      });
      for (const density of densities) {
        srcsetVariants.push({
          width: variant._cWidth * density,
          src: getVariantSrc(ctx, input, opts, variant, density)
        });
      }
    }
    finaliseSizeVariants(sizeVariants);
  } else {
    for (const density of densities) {
      const key = Object.keys(sizes)[0];
      let variant = key ? getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx) : void 0;
      if (variant === void 0) {
        variant = {
          size: "",
          screenMaxWidth: 0,
          _cWidth: (_d = opts.modifiers) == null ? void 0 : _d.width,
          _cHeight: (_e = opts.modifiers) == null ? void 0 : _e.height
        };
      }
      srcsetVariants.push({
        width: density,
        src: getVariantSrc(ctx, input, opts, variant, density)
      });
    }
  }
  finaliseSrcsetVariants(srcsetVariants);
  const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
  const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
  const suffix = sizesVal ? "w" : "x";
  const srcsetVal = srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", ");
  return {
    sizes: sizesVal,
    srcset: srcsetVal,
    src: defaultVariant == null ? void 0 : defaultVariant.src
  };
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
  const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || Number.parseInt(key);
  const isFluid = size.endsWith("vw");
  if (!isFluid && /^\d+$/.test(size)) {
    size = size + "px";
  }
  if (!isFluid && !size.endsWith("px")) {
    return void 0;
  }
  let _cWidth = Number.parseInt(size);
  if (!screenMaxWidth || !_cWidth) {
    return void 0;
  }
  if (isFluid) {
    _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
  }
  const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
  return {
    size,
    screenMaxWidth,
    _cWidth,
    _cHeight
  };
}
function getVariantSrc(ctx, input, opts, variant, density) {
  return ctx.$img(
    input,
    {
      ...opts.modifiers,
      width: variant._cWidth ? variant._cWidth * density : void 0,
      height: variant._cHeight ? variant._cHeight * density : void 0
    },
    opts
  );
}
function finaliseSizeVariants(sizeVariants) {
  var _a;
  sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  let previousMedia = null;
  for (let i = sizeVariants.length - 1; i >= 0; i--) {
    const sizeVariant = sizeVariants[i];
    if (sizeVariant.media === previousMedia) {
      sizeVariants.splice(i, 1);
    }
    previousMedia = sizeVariant.media;
  }
  for (let i = 0; i < sizeVariants.length; i++) {
    sizeVariants[i].media = ((_a = sizeVariants[i + 1]) == null ? void 0 : _a.media) || "";
  }
}
function finaliseSrcsetVariants(srcsetVariants) {
  srcsetVariants.sort((v1, v2) => v1.width - v2.width);
  let previousWidth = null;
  for (let i = srcsetVariants.length - 1; i >= 0; i--) {
    const sizeVariant = srcsetVariants[i];
    if (sizeVariant.width === previousWidth) {
      srcsetVariants.splice(i, 1);
    }
    previousWidth = sizeVariant.width;
  }
}
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: "&",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL: baseURL2 } = {}, ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL2) {
    baseURL2 = joinURL(ctx.options.nuxt.baseURL, "/_ipx");
  }
  return {
    url: joinURL(baseURL2, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxRuntime$zQJW0IOpj5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getImage,
  supportsAlias,
  validateDomains
});
const imageOptions = {
  "screens": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536,
    "2xl": 1536
  },
  "presets": {},
  "provider": "ipx",
  "domains": [],
  "alias": {},
  "densities": [
    1,
    2
  ],
  "format": [
    "webp"
  ]
};
imageOptions.providers = {
  ["ipx"]: { provider: ipxRuntime$zQJW0IOpj5, defaults: {} }
};
const useImage = () => {
  const config = /* @__PURE__ */ useRuntimeConfig();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
    ...imageOptions,
    nuxt: {
      baseURL: config.app.baseURL
    },
    runtimeConfig: config
  }));
};
const baseImageProps = {
  // input source
  src: { type: String, required: false },
  // modifiers
  format: { type: String, required: false },
  quality: { type: [Number, String], required: false },
  background: { type: String, required: false },
  fit: { type: String, required: false },
  modifiers: { type: Object, required: false },
  // options
  preset: { type: String, required: false },
  provider: { type: String, required: false },
  sizes: { type: [Object, String], required: false },
  densities: { type: String, required: false },
  preload: {
    type: [Boolean, Object],
    required: false
  },
  // <img> attributes
  width: { type: [String, Number], required: false },
  height: { type: [String, Number], required: false },
  alt: { type: String, required: false },
  referrerpolicy: { type: String, required: false },
  usemap: { type: String, required: false },
  longdesc: { type: String, required: false },
  ismap: { type: Boolean, required: false },
  loading: {
    type: String,
    required: false,
    validator: (val) => ["lazy", "eager"].includes(val)
  },
  crossorigin: {
    type: [Boolean, String],
    required: false,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    required: false,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  },
  // csp
  nonce: { type: [String], required: false }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding,
      nonce: props.nonce
    };
  });
  const $img = useImage();
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality || $img.options.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], required: false },
  placeholderClass: { type: String, required: false }
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "NuxtImg",
  __ssrInlineRender: true,
  props: imgProps,
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const attrs = useAttrs();
    const isServer = true;
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const imgEl = ref();
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      densities: props.densities,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const imgAttrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (!props.placeholder || placeholderLoaded.value) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50,
        blur: size[3] || 3
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          nonce: props.nonce,
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          },
          ...typeof props.preload !== "boolean" && props.preload.fetchPriority ? { fetchpriority: props.preload.fetchPriority } : {}
        }]
      });
    }
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.isHydrating;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<img${ssrRenderAttrs(mergeProps({
        ref_key: "imgEl",
        ref: imgEl,
        class: props.placeholder && !placeholderLoaded.value ? props.placeholderClass : void 0
      }, {
        ...unref(isServer) ? { onerror: "this.setAttribute('data-error', 1)" } : {},
        ...imgAttrs.value,
        ...unref(attrs)
      }, { src: src.value }, _attrs))}>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "BaseImage",
  __ssrInlineRender: true,
  props: {
    src: String,
    imgDefault: String,
    alt: String
  },
  setup(__props) {
    const props = __props;
    const isError = ref(false);
    const initSrcImage = computed(() => {
      return !isError.value ? props.src : props.imgDefault ?? "/img/default-image.webp";
    });
    const handleError = () => {
      isError.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_img = _sfc_main$e;
      _push(ssrRenderComponent(_component_nuxt_img, mergeProps({
        src: unref(initSrcImage),
        onError: handleError
      }, _ctx.$attrs, {
        alt: __props.alt ?? unref(initSrcImage)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BaseImage.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const systemsStore = /* @__PURE__ */ defineStore("systems", {
  state: () => ({
    accessToken: "",
    accessTokenOA2: "",
    userData: [],
    configurations: [],
    keywordSearch: "",
    wsSocket: [],
    breadCrumbNav: [],
    title: "",
    optionIframe: ""
  }),
  actions: {
    updateTitle(newTitle) {
      this.title = newTitle;
    },
    updateoptionIframe(newoptionIframe) {
      this.optionIframe = newoptionIframe;
    }
    // CHECK HAS PERMISSION WITH FEATURE & ROLE
    // hasPermisstion(feature: string, role: string) {
    //   return this.permissions?.some(permission => permission?.permission_code?.toUpperCase() === feature?.toUpperCase()
    //   && Array.from(permission?.permission_details_list)?.includes(role.toUpperCase()))
    // },
  }
});
const getConfig = (configurations, key) => {
  var _a;
  return key && ((_a = configurations == null ? void 0 : configurations.find((config) => (config == null ? void 0 : config.code) === key)) == null ? void 0 : _a.value);
};
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
const parseIntO = (s) => {
  return parseInt(s) || 0;
};
const parseFloatO = (s) => {
  return parseFloat(s) || 0;
};
const getScriptMetaTags = (htmlCode) => {
  try {
    const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
    const metaRegex = /<meta\b[^>]*>/gi;
    const scriptTags = htmlCode.match(scriptRegex) || [];
    const metaTags = htmlCode.match(metaRegex) || [];
    return {
      scriptTags,
      metaTags
    };
  } catch (e) {
    console.error(e);
  }
};
const handleInjectScript = (scriptList) => {
  try {
    const scriptElements = scriptList.map((scriptContent) => {
      const typeClassMatch = scriptContent.match(/<script\s+type="([^"]+)"(?:\s+class="([^"]+)")?>/);
      if (typeClassMatch) {
        const scriptType = typeClassMatch[1];
        const scriptClass = typeClassMatch[2] || "";
        const cleanScriptContent = scriptContent.replace(/<script[^>]*>|<\/script>/g, "").trim();
        return {
          type: scriptType,
          class: scriptClass,
          // Thêm class nếu có
          innerHTML: cleanScriptContent
        };
      }
      const srcMatch = scriptContent.match(/<script\s+[^>]*src="([^"]+)"[^>]*>/);
      if (srcMatch) {
        return {
          async: true,
          src: srcMatch[1]
        };
      }
      const hasScriptTag = scriptContent.match(/<script[^>]*>([\s\S]*?)<\/script>/);
      if (hasScriptTag) {
        const cleanScriptContent = scriptContent.replace(/<script[^>]*>|<\/script>/g, "").trim();
        return {
          innerHTML: cleanScriptContent
        };
      }
    });
    return scriptElements;
  } catch (e) {
    console.error(e);
  }
};
const handleInjectMetaTags = (metaTagsArray) => {
  try {
    return metaTagsArray.map((tag) => {
      const nameMatch = tag.match(/name="([^"]*)"/);
      const contentMatch = tag.match(/content="([^"]*)"/);
      return {
        name: nameMatch ? nameMatch[1] : "",
        content: contentMatch ? contentMatch[1] : ""
      };
    });
  } catch (e) {
    console.error(e);
  }
};
const getPlayerPosition = (position) => {
  return position === "G" ? "Goalkeeper" : position === "M" ? "Midfielder" : position === "D" ? "Defender" : position === "F" ? "Striker" : position === "coach" ? "Head Coach" : "-";
};
const getTransferType = (id) => {
  const transferTypes = {
    1: "Loan",
    2: "End of Loan",
    3: "Free Transfer",
    4: "Retired",
    5: "Draft",
    6: "Released",
    7: "Signed",
    8: "Unknown"
  };
  return transferTypes[id] || "Unknown";
};
const formatTimestamp = (item) => {
  try {
    const timestamp = item;
    const date = new Date(timestamp * 1e3);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  } catch {
    return "-";
  }
};
const debounce = (fn, delay) => {
  let timeoutID;
  return function() {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
};
const createUrl = (url, options) => computed(() => {
  if (!(options == null ? void 0 : options.query))
    return toValue(url);
  const _url = toValue(url);
  const _query = toValue(options == null ? void 0 : options.query);
  const queryObj = Object.fromEntries(
    Object.entries(_query).map(([key, val]) => [key, toValue(val)])
  );
  return `${_url}${queryObj ? `?${stringifyQuery(queryObj)}` : ""}`;
});
const sortByTime = (arrObj, sort) => {
  if (arrObj === null || arrObj === void 0 || arrObj === "")
    return [];
  return arrObj.sort((a, b) => {
    if (sort) {
      return new Date(b.match_time).getTime() - new Date(a.match_time).getTime();
    } else
      return new Date(a.match_time).getTime() - new Date(b.match_time).getTime();
  }, sort);
};
const formatTimeSince = (dateString, useLocale) => {
  if (dateString === null || dateString === void 0 || dateString === "")
    return "";
  moment.locale(useLocale == null ? void 0 : useLocale.defaultLocale);
  return moment(dateString).fromNow();
};
const formatDateMomentUTCTimeZone = (dateString, formatTime = "yyyy-MM-DD", timeZone = "GMT+07:00") => {
  try {
    if (dateString === null || dateString === void 0 || dateString === "")
      return "";
    if (timeZone !== "") {
      return moment(dateString).utcOffset(timeZone).format(formatTime);
    } else {
      return moment(dateString).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format(formatTime);
    }
  } catch (error) {
    return "";
  }
};
const timeStamp2DateUTCTimeZone = (timestamp, formatTime = "yyyy-MM-DD", timeZone = "GMT+07:00") => {
  try {
    if (timestamp === null || timestamp === void 0 || timestamp === "")
      return "";
    const d = new Date(parseInt(timestamp) * 1e3);
    if (timeZone !== "") {
      return moment(d).utcOffset(timeZone).format(formatTime);
    } else {
      return moment(d).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format(formatTime);
    }
  } catch (error) {
    return "";
  }
};
const ITEMS_PER_LIMIT = 10;
const CATEGORY_TAG_POST_PER_LIMIT = 16;
const SCREEN_WIDTH = {
  SM: 576,
  MD: 768,
  LG: 1024,
  LGG: 1076,
  XL: 1280,
  XXL: 1920
};
const LIVESCORE_ACTIVE_TAB = {
  ALL: "all",
  HOT: "hot",
  LEAGUE: "league"
};
const STATS_TECHNICAL = {
  1: "Goal",
  2: "Corner",
  3: "Yellow Card",
  4: "Red Card",
  5: "Offside",
  6: "Direct Free Kick",
  7: "Goal",
  8: "Penalty",
  9: "Substitution",
  10: "Start",
  11: "Midfielder",
  12: "End",
  13: "Half-time score",
  15: "Card upgrade confirmed",
  16: "Missed Penalty",
  17: "Own goal",
  19: "Injury time",
  21: "Shot on target",
  22: "Shot off target",
  23: "Attack",
  24: "Dangerous Attack",
  25: "TL ball control",
  26: "Injury time",
  27: "Penalty penalty",
  28: "VAR",
  29: "Foul",
  30: "Dangerous foul"
};
const ODD_COMPANY_DEFAULT = 1;
const ISPORT_COMPANY_DEFAULT = 8;
const ODD_COMPANY_DEFAULT_LIVESCORE = 21;
const ODD_COMPANYS = [
  {
    id: 1,
    name: "BET365",
    thesports: 2,
    isportsapi: 8
  },
  {
    id: 2,
    name: "Crown",
    thesports: 3,
    isportsapi: 3
  },
  {
    id: 3,
    name: "10BET",
    thesports: 4,
    isportsapi: 22
  },
  {
    id: 4,
    name: "Ladbrokes",
    thesports: 5,
    isportsapi: 4
  },
  {
    id: 5,
    name: "Mansion88",
    thesports: 6,
    isportsapi: 17
  },
  {
    id: 6,
    name: "Macauslot",
    thesports: 7,
    isportsapi: 1
  },
  {
    id: 7,
    name: "SNAI",
    thesports: 8,
    isportsapi: 7
  },
  {
    id: 8,
    name: "William Hill",
    thesports: 9,
    isportsapi: 9
  },
  {
    id: 9,
    name: "Easybets",
    thesports: 10,
    isportsapi: 12
  },
  {
    id: 10,
    name: "Vcbet",
    thesports: 11,
    isportsapi: 14
  },
  {
    id: 11,
    name: "Interwetten",
    thesports: 13,
    isportsapi: 19
  },
  {
    id: 12,
    name: "12bet",
    thesports: 14,
    isportsapi: 24
  },
  {
    id: 13,
    name: "Sbobet",
    thesports: 15,
    isportsapi: 31
  },
  {
    id: 14,
    name: "Wewbet",
    thesports: 16,
    isportsapi: 35
  },
  {
    id: 15,
    name: "18Bet",
    thesports: 17,
    isportsapi: 42
  },
  {
    id: 17,
    name: "188bet",
    thesports: 21,
    isportsapi: 23
  },
  {
    id: 18,
    name: "Pinnacle",
    thesports: 22,
    isportsapi: 47
  },
  {
    id: 19,
    name: "HK Jockey Club",
    thesports: null,
    isportsapi: 48
  },
  {
    id: 20,
    name: "Bwin",
    thesports: null,
    isportsapi: 49
  }
];
const ODD_COMPANYS_LIVESCORE = [
  {
    id: 21,
    name: "General",
    thesports: "",
    isportsapi: ""
  },
  ...ODD_COMPANYS
];
const COMPANYS_H2H_DEFAULT_LIST = [
  1,
  13,
  17,
  5,
  2
];
const LIVESCORE_PAGE = {
  LIVESCORE: "livescore",
  FAVORITES: "favorites",
  RESULTS: "results",
  SCHEDULE: "schedule"
};
const LIVESCORE_STATUS = {
  IS_LIVE: ["2", "3", "4", "5", "6", "7"],
  NOT_START: ["1"],
  NOT_LIVE: ["9", "10", "11", "12", "13"],
  IS_END: ["8"]
};
const FAVORITES_TYPE = {
  MATCHES: "matches",
  LEAGUES: "leagues",
  TEAMS: "teams"
};
const MATCH_LIST_OPTION = [
  {
    key: 1,
    value: "1 "
  },
  {
    key: 2,
    value: "2 "
  },
  {
    key: 3,
    value: "3 "
  },
  {
    key: 4,
    value: "4 "
  },
  {
    key: 5,
    value: "5 "
  },
  {
    key: 6,
    value: "6 "
  },
  {
    key: 7,
    value: "7 "
  },
  {
    key: 8,
    value: "8 "
  },
  {
    key: 9,
    value: "9 "
  },
  {
    key: 10,
    value: "10 "
  },
  {
    key: 11,
    value: "11 "
  },
  {
    key: 12,
    value: "12 "
  },
  {
    key: 13,
    value: "13 "
  },
  {
    key: 14,
    value: "14 "
  },
  {
    key: 15,
    value: "15 "
  },
  {
    key: 16,
    value: "16 "
  },
  {
    key: 17,
    value: "17 "
  },
  {
    key: 18,
    value: "18  "
  },
  {
    key: 19,
    value: "19 "
  },
  {
    key: 20,
    value: "20 "
  }
];
const TABLE_STANDING_LIST = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
  9: "I",
  10: "J",
  11: "K",
  12: "L",
  13: "M",
  14: "N",
  15: "O",
  16: "P"
};
const MATCH_ODD_TAB = {
  ODDSCOMP: "oddscomp",
  ASIAN_HANDICAP_ODDS: "asian_handicap_odds",
  OVER_UNDER_ODDS: "over_under_odds",
  ODDS_1X2: "odds_1x2",
  CORNER_OU_ODDS: "corner_ou_odds",
  CORRECT_SCORE_ODDS: "correct_score_odds",
  EURO_HANDICAP_ODDS: "euro_handicap_odds",
  DOUBLE_CHANCE_ODDS: "double_chance_odds",
  STATISTICAL: "playertech"
};
const MATCH_TAB = {
  DETAIL: "live",
  H2H: "h2h",
  ODDS: "odds",
  ...MATCH_ODD_TAB
};
const WAREHOUSE_LEAGUE_TAB = {
  SCHEDULE: "schedule",
  STANDING: "standing"
};
const BREADCRUMBS_MAP = {
  "bong da": "Trang chủ",
  "theo doi": "Theo dõi",
  "ket qua bong da": "Kết quả",
  "lich thi dau": "Lịch thi đấu",
  "tin tuc": "Tin tức",
  "nhan dinh": "Nhận định",
  "tin nong": "Tin nóng",
  "tin the thao": "Tin thể thao",
  "tin cau thu": "Tin Cầu Thủ",
  "doi": "Đội",
  "giai dau": "Giải đấu",
  "dang nhap": "Đăng nhập",
  "dang ky": "Đăng ký",
  "football": "Home page",
  "favourites": "Favourites",
  "results": "Results",
  "schedule": "Schedule",
  "news": "News",
  "league": "League",
  "fleagues": "League",
  "tag": "News",
  "login": "Login",
  "register": "Register",
  "fteams": "Team"
};
const POST_TYPE = {
  POST: "post",
  PAGE: "page"
};
const TABLE_TEAM = {
  FREE_PLAYER: "Free player"
};
const TIME_ZONE_LIST = [
  {
    key: "Tự động",
    value: ""
  },
  {
    key: "GMT -11",
    value: "GMT-11:00"
  },
  {
    key: "GMT -10",
    value: "GMT-10:00"
  },
  {
    key: "GMT -9",
    value: "GMT-09:00"
  },
  {
    key: "GMT -8",
    value: "GMT-08:00"
  },
  {
    key: "GMT -7",
    value: "GMT-07:00"
  },
  {
    key: "GMT -6",
    value: "GMT-06:00"
  },
  {
    key: "GMT -5",
    value: "GMT-05:00"
  },
  {
    key: "GMT -4.5",
    value: "GMT-04:30"
  },
  {
    key: "GMT -4",
    value: "GMT-04:00"
  },
  {
    key: "GMT -3.5",
    value: "GMT-03:30"
  },
  {
    key: "GMT -3",
    value: "GMT-03:00"
  },
  {
    key: "GMT -2",
    value: "GMT-02:00"
  },
  {
    key: "GMT -1",
    value: "GMT-01:00"
  },
  {
    key: "GMT 0",
    value: "GMT+00:00"
  },
  {
    key: "GMT +1",
    value: "GMT+01:00"
  },
  {
    key: "GMT +2",
    value: "GMT+02:00"
  },
  {
    key: "GMT +3",
    value: "GMT+03:00"
  },
  {
    key: "GMT +3.5",
    value: "GMT+03:30"
  },
  {
    key: "GMT +4",
    value: "GMT+04:00"
  },
  {
    key: "GMT +5",
    value: "GMT+05:00"
  },
  {
    key: "GMT +5.5",
    value: "GMT+05:30"
  },
  {
    key: "GMT +5.75",
    value: "GMT+05:45"
  },
  {
    key: "GMT +6",
    value: "GMT+06:00"
  },
  {
    key: "GMT +6.5",
    value: "GMT+06:30"
  },
  {
    key: "GMT +7",
    value: "GMT+07:00"
  },
  {
    key: "GMT +8",
    value: "GMT+08:00"
  },
  {
    key: "GMT +9",
    value: "GMT+09:00"
  },
  {
    key: "GMT +9.5",
    value: "GMT+09:30"
  },
  {
    key: "GMT +10",
    value: "GMT+10:00"
  },
  {
    key: "GMT +10.5",
    value: "GMT+10:30"
  },
  {
    key: "GMT +11",
    value: "GMT+11:00"
  },
  {
    key: "GMT +12",
    value: "GMT+12:00"
  },
  {
    key: "GMT +13",
    value: "GMT+13:00"
  }
];
const decodeDataAPI = async (data, keyEncode = "") => {
  if (!data)
    return null;
  try {
    const encryptedData = Buffer.from(data, "hex");
    const key = keyEncode;
    const decryptedBytes = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.lib.WordArray.create(Uint8Array.from(encryptedData)) },
      CryptoJS.enc.Utf8.parse(key),
      { mode: CryptoJS.mode.ECB }
    );
    const decryptedBase64 = decryptedBytes.toString(CryptoJS.enc.Base64);
    const decompressedData = pako.inflate(Buffer.from(decryptedBase64, "base64"), { to: "string" });
    const jsonData = JSON.parse(decompressedData);
    return jsonData;
  } catch (error) {
    return null;
  }
};
const getLiveScoreImage = (path, subpath) => {
  const config = /* @__PURE__ */ useRuntimeConfig();
  return config.public.liveScoreImage + "/" + subpath + "/" + path;
};
const groupBy = (array, grouper) => {
  try {
    return array.reduce((store, item) => {
      var key = grouper(item);
      if (!store.has(key)) {
        store.set(key, [item]);
      } else {
        store.get(key).push(item);
      }
      return store;
    }, /* @__PURE__ */ new Map());
  } catch (error) {
    return null;
  }
};
const groupByTimeAndComp = (array) => {
  try {
    return array.reduce((store, item) => {
      const key = item.match_time + "_" + item.competition + "_" + item.status;
      if (!store.has(key)) {
        store.set(key, [item]);
      } else {
        store.get(key).push(item);
      }
      return store;
    }, /* @__PURE__ */ new Map());
  } catch (error) {
    return null;
  }
};
const getStatusDisplay = (match, $t, timeZone) => {
  let statusToDisplay = "-";
  const status = match == null ? void 0 : match.status;
  if (["8", "10"].includes(status)) {
    statusToDisplay = formatDateMomentUTCTimeZone(match == null ? void 0 : match.match_time, "HH:mm", timeZone);
    if ((match == null ? void 0 : match.status) === "8") {
      statusToDisplay += '<b class="status ms-3">' + $t("FT") + "</b>";
    }
  } else if (["12"].includes(status)) {
    statusToDisplay = $t("Cancel");
  } else if (["2", "4", "5"].includes(status)) {
    if (match == null ? void 0 : match.matchMinutes) {
      statusToDisplay = (match == null ? void 0 : match.matchMinutes) + '<img src="/icon/in.gif" border="0" alt="in" width="3" height="8">';
    } else {
      statusToDisplay = formatDateMomentUTCTimeZone(match == null ? void 0 : match.match_time, "HH:mm", timeZone);
    }
  } else {
    if (status === "7") {
      statusToDisplay = '<b class="status ms-1">PS</b>';
    } else if (status === "3") {
      statusToDisplay = '<b class="status ms-1">HT</b>';
    } else {
      statusToDisplay = formatDateMomentUTCTimeZone(match == null ? void 0 : match.match_time, "HH:mm", timeZone);
    }
  }
  return statusToDisplay;
};
const getStatusDisplayMobile = (match, $t, timeZone) => {
  if (!match)
    return "-";
  let statusToDisplay = "";
  const status = match == null ? void 0 : match.status;
  if (["8", "10"].includes(status)) {
    statusToDisplay = formatDateMomentUTCTimeZone(match == null ? void 0 : match.match_time, "HH:mm", timeZone);
    if ((match == null ? void 0 : match.status) === "8") {
      statusToDisplay = $t("Fulltime");
    }
  } else if (["12"].includes(status)) {
    statusToDisplay = $t("Cancel");
  } else if (["2", "4", "5"].includes(status)) {
    if (match == null ? void 0 : match.matchMinutes) {
      statusToDisplay = (match == null ? void 0 : match.matchMinutes) + '<i class="mit"><img src="/img/in_red.gif" alt="time"></i>';
    } else {
      statusToDisplay = "-";
    }
  } else {
    if (status === "7") {
      statusToDisplay = '<b class="">PS</b>';
    } else if (status === "3") {
      statusToDisplay = '<b class="">HT</b>';
    } else {
      statusToDisplay = "-";
    }
  }
  return statusToDisplay;
};
const getOdds = (match, row, position, numberToNegative) => {
  var _a, _b, _c, _d;
  try {
    if (((_a = match == null ? void 0 : match.odds) == null ? void 0 : _a.length) > 0) {
      const odds = (_b = String(match == null ? void 0 : match.odds[row])) == null ? void 0 : _b.split(/\s*,\s*/);
      if ((odds == null ? void 0 : odds.length) > position && odds[position] && odds[position] !== "null") {
        const oddValue = odds[position];
        const odds_older = (_d = String((_c = match == null ? void 0 : match.odds_older) == null ? void 0 : _c[row])) == null ? void 0 : _d.split(/\s*,\s*/);
        if ((odds_older == null ? void 0 : odds_older.length) > position && odds_older[position] && odds_older[position] !== "null") {
          const oddOlderValue = odds_older[position];
          if (parseFloat(oddValue) > parseFloat(oddOlderValue)) {
            return '<span class="up">' + (parseFloatO(oddValue) !== 0 ? numberToNegative ? getOddNumberToNegativeTX(oddValue) : parseFloatO(parseFloatO(oddValue).toFixed(2)) : 0) + "</span>";
          } else if (parseFloat(oddValue) < parseFloat(oddOlderValue)) {
            return '<span class="down">' + (parseFloatO(oddValue) !== 0 ? numberToNegative ? getOddNumberToNegativeTX(oddValue) : parseFloatO(parseFloatO(oddValue).toFixed(2)) : 0) + "</span>";
          } else {
            return parseFloatO(oddValue) !== 0 ? numberToNegative ? getOddNumberToNegativeTX(oddValue) : parseFloatO(parseFloatO(oddValue).toFixed(2)) : 0;
          }
        }
      }
      return odds[position] && odds[position] !== "null" ? numberToNegative ? getOddNumberToNegativeTX(odds[position]) : parseFloatO(parseFloatO(odds[position]).toFixed(2)) : "";
    }
    return "";
  } catch (error) {
    return "";
  }
};
const isEmpty = (odd) => {
  if (typeof odd === "undefined" || !odd)
    return true;
  return false;
};
const getOddNumber = (odd) => {
  try {
    if (typeof odd === "undefined" || !odd)
      return "-";
    return odd == null ? void 0 : odd[0];
  } catch (error) {
    return "-";
  }
};
const getOddOfData = (odd) => {
  try {
    if (typeof odd === "undefined" || !odd)
      return "-";
    return parseFloatO(odd == null ? void 0 : odd[0]);
  } catch (error) {
    return "-";
  }
};
const getOddNumberToNegative = (odd) => {
  try {
    if (typeof odd === "undefined" || !odd)
      return "-";
    return parseFloatO(odd == null ? void 0 : odd[0]) <= 1 ? odd == null ? void 0 : odd[0] : (-1 / parseFloatO(odd == null ? void 0 : odd[0])).toFixed(2);
  } catch (error) {
    return "-";
  }
};
const getOddNumberToNegativeTX = (odd) => {
  try {
    if (typeof odd === "undefined" || !odd)
      return "-";
    return parseFloatO(odd) <= 1 ? parseFloatO(odd) : parseFloatO((-1 / parseFloatO(odd)).toFixed(2));
  } catch (error) {
    return "-";
  }
};
const getOddChange = (odd1, odd2) => {
  try {
    if ((typeof odd1 === "undefined" || !odd1) && (typeof odd2 === "undefined" || !odd2))
      return "";
    if (isEmpty(odd1) || parseFloatO(odd1) == parseFloatO(odd2))
      return "";
    else if (parseFloatO(odd2) < parseFloatO(odd1)) {
      return "up2";
    } else {
      return "down2";
    }
  } catch (error) {
    return "-";
  }
};
const getClassOddChange = (odds, position, type = 3) => {
  var _a, _b, _c, _d, _e, _f;
  try {
    if (typeof odds === "undefined" || !odds)
      return "";
    let older = "";
    let odd = "";
    if (type === 1) {
      if (isEmpty(odds == null ? void 0 : odds.first_older) || !(odds == null ? void 0 : odds.first_older))
        return "";
      older = getOddNumber((_a = odds == null ? void 0 : odds.first_older) == null ? void 0 : _a[position]);
      odd = getOddNumber((_b = odds == null ? void 0 : odds.first) == null ? void 0 : _b[position]);
    } else if (type === 2) {
      if (isEmpty(odds == null ? void 0 : odds.live_older) || !(odds == null ? void 0 : odds.live_older))
        return "";
      older = getOddNumber((_c = odds == null ? void 0 : odds.live_older) == null ? void 0 : _c[position]);
      odd = getOddNumber((_d = odds == null ? void 0 : odds.live) == null ? void 0 : _d[position]);
    } else if (type === 3) {
      if (isEmpty(odds == null ? void 0 : odds.run_older) || !(odds == null ? void 0 : odds.run_older))
        return "";
      older = getOddNumber((_e = odds == null ? void 0 : odds.run_older) == null ? void 0 : _e[position]);
      odd = getOddNumber((_f = odds == null ? void 0 : odds.run) == null ? void 0 : _f[position]);
    }
    if (parseFloatO(older) < parseFloatO(odd)) {
      return "up";
    } else if (parseFloatO(older) > parseFloatO(odd)) {
      return "down";
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
};
const getClassOddCornerChange = (odds, position) => {
  var _a, _b;
  try {
    if (typeof odds === "undefined" || !odds)
      return "";
    let older = "";
    let odd = "";
    if (isEmpty(odds == null ? void 0 : odds.run_older) || !(odds == null ? void 0 : odds.run_older))
      return "";
    older = getOddNumber((_a = odds == null ? void 0 : odds.run_older) == null ? void 0 : _a[position]);
    odd = getOddNumber((_b = odds == null ? void 0 : odds.run) == null ? void 0 : _b[position]);
    if (parseFloatO(older) < parseFloatO(odd)) {
      return "up";
    } else if (parseFloatO(older) > parseFloatO(odd)) {
      return "down";
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
};
const getClassOddCorner = (odd, older) => {
  try {
    if (typeof older === "undefined" || !older)
      return "";
    if (parseFloatO(older) < parseFloatO(odd)) {
      return "up";
    } else if (parseFloatO(older) > parseFloatO(odd)) {
      return "down";
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
};
const getOddCornerValue = (odd, position) => {
  var _a;
  try {
    if (typeof odd === "undefined" || !odd)
      return "-";
    let oddData = odd == null ? void 0 : odd.replace(/[^0-9.,]/g, "");
    oddData = (_a = String(oddData)) == null ? void 0 : _a.split(/\s*,\s*/);
    if ((oddData == null ? void 0 : oddData.length) > position) {
      return oddData[position] && oddData[position] !== "null" ? oddData[position] : 0;
    }
    return "";
  } catch (error) {
    return "";
  }
};
const getIncidents = (incident = [], position = 0) => {
  try {
    if ((incident == null ? void 0 : incident.position) !== position)
      return "";
    switch (incident == null ? void 0 : incident.type) {
      case 1:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Goal" src="/img/incident/1.png"></span>';
      case 2:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Corner" src="/img/incident/2.png"></span>';
      case 3:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Yellow card" src="/img/incident/3.png"></span>';
      case 4:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Red card" src="/img/incident/4.png"></span>';
      case 5:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Offside" src="/img/incident/5.png"></span>';
      case 8:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Penalty" src="/img/incident/8.png"></span>';
      case 9:
        return '<span class="detail_player in_out"><div class="icon_inc"><img loading="lazy" class="user_incident" style="margin:-3px 2px;" alt="Midfield" src="/img/incident/11.png"></div><div class="in_player_name">' + (incident == null ? void 0 : incident.in_player_name) + ' <img loading="lazy" style="margin:-3px 2px;" src="/img/incident/9.png" alt="Substitution"></div><div class="out_player_name">' + (incident == null ? void 0 : incident.out_player_name) + ' <img loading="lazy" style="margin:-4px 2px;" src="/img/incident/9.2.png" alt="Substitution"></div></span>';
      case 15:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Card upgrade confirmed" src="/img/incident/15.png"></span>';
      case 16:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Penalty missed" src="/img/incident/16.png"></span>';
      case 17:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Own goal" src="/img/incident/17.png"></span>';
      case 28:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="VAR" src="/img/incident/28.png"></span>';
      default:
      case 29:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Penalty(Penalty Shoot-out)" src="/img/incident/7.png"></span>';
      case 30:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Penalty missed(Penalty Shoot-out)" src="/img/incident/16.png"></span>';
        return "--";
    }
  } catch (error) {
    return "--";
  }
};
const getIncidentsRight = (incident = [], position = 0) => {
  try {
    if ((incident == null ? void 0 : incident.position) !== position)
      return "";
    switch (incident == null ? void 0 : incident.type) {
      case 1:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Goal" src="/img/incident/1.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 2:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Corner" src="/img/incident/2.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 3:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Yellow card" src="/img/incident/3.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 4:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Red card" src="/img/incident/4.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 5:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Offside" src="/img/incident/5.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 8:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Penalty" src="/img/incident/8.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 9:
        return '<span class="detail_player in_out"><div class="icon_inc"><img loading="lazy" class="user_incident" style="margin:-3px 2px;" alt="Midfield" src="/img/incident/11.png"></div><div class="in_player_name"><img loading="lazy" style="margin:-3px 2px;" src="/img/incident/9.png" alt="Substitution">' + (incident == null ? void 0 : incident.in_player_name) + ' </div><div class="out_player_name"><img loading="lazy" style="margin:-4px 2px;" src="/img/incident/9.2.png" alt="Substitution">' + (incident == null ? void 0 : incident.out_player_name) + " </div></span>";
      case 15:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Card upgrade confirmed" src="/img/incident/15.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 16:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Penalty missed" src="/img/incident/16.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 17:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Own goal" src="/img/incident/17.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 28:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="VAR" src="/img/incident/28.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      default:
      case 29:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Penalty(Penalty Shoot-out)" src="/img/incident/7.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 30:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Penalty missed(Penalty Shoot-out)" src="/img/incident/16.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
        return "--";
    }
  } catch (error) {
    return "--";
  }
};
const getStats = (type = "") => {
  try {
    if (STATS_TECHNICAL[type]) {
      return STATS_TECHNICAL[type];
    } else {
      return "-";
    }
  } catch (error) {
    return "-";
  }
};
const getCorner = (cornerEvent = [], teamId = 0, position = 0) => {
  try {
    if (parseIntO(cornerEvent == null ? void 0 : cornerEvent.teamId) !== teamId)
      return "";
    if (position === 1) {
      return '<img src="img/rq.png" width="16" height="16">';
    } else {
      return '<img src="img/bq.png" width="16" height="16">';
    }
  } catch (error) {
    return "";
  }
};
const getDetailOdds = (data = [], typeOdd = "", group = "", position = 0) => {
  var _a;
  try {
    if ((data == null ? void 0 : data.length) <= 0)
      return "-";
    const oddData = data == null ? void 0 : data.find(({ type }) => type === typeOdd);
    if (oddData == null ? void 0 : oddData[group]) {
      const data2 = JSON.parse((_a = oddData[group]) == null ? void 0 : _a.replace(new RegExp(escapeRegExp("'"), "g"), '"'));
      if (data2[position])
        return parseFloatO(data2[position]);
    }
    return "";
  } catch (error) {
    return "";
  }
};
const getRecentResultTheSport = (data = [], matchId, isHome = false, $t) => {
  try {
    if (data.length <= 0)
      return;
    let recentResult = data == null ? void 0 : data.slice(0, 6);
    if (isHome) {
      recentResult = recentResult == null ? void 0 : recentResult.reverse();
    }
    let score = "";
    recentResult == null ? void 0 : recentResult.forEach((item) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      if (((_b = (_a = item == null ? void 0 : item[5]) == null ? void 0 : _a[0]) == null ? void 0 : _b[0]) === matchId) {
        if (((_c = item == null ? void 0 : item[5]) == null ? void 0 : _c[2]) > ((_d = item == null ? void 0 : item[6]) == null ? void 0 : _d[2])) {
          score += '<span class="o-win" title="' + $t("Win") + '">' + $t("W") + "</span>";
        } else if (((_e = item == null ? void 0 : item[5]) == null ? void 0 : _e[2]) == ((_f = item == null ? void 0 : item[6]) == null ? void 0 : _f[2])) {
          score += '<span class="o-draw" title="' + $t("Draw") + '">' + $t("D") + "</span>";
        } else {
          score += '<span class="o-lose" title="' + $t("Loss") + '">' + $t("L") + "</span>";
        }
      } else if (((_h = (_g = item == null ? void 0 : item[6]) == null ? void 0 : _g[0]) == null ? void 0 : _h[0]) === matchId) {
        if (((_i = item == null ? void 0 : item[6]) == null ? void 0 : _i[2]) > ((_j = item == null ? void 0 : item[5]) == null ? void 0 : _j[2])) {
          score += '<span class="o-win" title="' + $t("Win") + '">' + $t("W") + "</span>";
        } else if (((_k = item == null ? void 0 : item[6]) == null ? void 0 : _k[2]) == ((_l = item == null ? void 0 : item[5]) == null ? void 0 : _l[2])) {
          score += '<span class="o-draw" title="' + $t("Draw") + '">' + $t("D") + "</span>";
        } else {
          score += '<span class="o-lose" title="' + $t("Loss") + '">' + $t("L") + "</span>";
        }
      }
    });
    return score;
  } catch (error) {
    return "";
  }
};
const getLastResult = (data = [], matchId, isHome = false, $t) => {
  var _a, _b;
  try {
    if (data.length <= 0)
      return '<span class="o-unknown">?</span>';
    const recentResult = (_b = (_a = sortByTime(data, true)) == null ? void 0 : _a.slice(0, 6)) == null ? void 0 : _b.reverse();
    let score = "";
    recentResult == null ? void 0 : recentResult.forEach((item) => {
      if ((item == null ? void 0 : item.home_team.id) === matchId) {
        if ((item == null ? void 0 : item.home_scores[0]) > (item == null ? void 0 : item.away_scores[0])) {
          score += '<span class="o-win" title="' + $t("Win") + '">' + $t("W") + "</span>";
        } else if ((item == null ? void 0 : item.home_scores[0]) === (item == null ? void 0 : item.away_scores[0])) {
          score += '<span class="o-draw" title="' + $t("Draw") + '">' + $t("D") + "</span>";
        } else {
          score += '<span class="o-lose" title="' + $t("Lose") + '">' + $t("L") + "</span>";
        }
      } else if ((item == null ? void 0 : item.away_team.id) === matchId) {
        if ((item == null ? void 0 : item.away_scores[0]) > (item == null ? void 0 : item.home_scores[0])) {
          score += '<span class="o-win" title="' + $t("Win") + '">' + $t("W") + "</span>";
        } else if ((item == null ? void 0 : item.away_scores[0]) === (item == null ? void 0 : item.home_scores[0])) {
          score += '<span class="o-draw" title="' + $t("Draw") + '">' + $t("D") + "</span>";
        } else {
          score += '<span class="o-lose" title="' + $t("Lose") + '">' + $t("L") + "</span>";
        }
      }
    });
    return score ? score : '<span class="o-unknown">?</span>';
  } catch (error) {
    return '<span class="o-unknown">?</span>';
  }
};
const getDataObject = (data = []) => {
  if (!data)
    return null;
  try {
    const dataObject = [];
    Object.keys(data).map((key) => {
      var _a, _b, _c;
      if (typeof data[key] === "string") {
        dataObject[key] = JSON.parse((_a = data[key]) == null ? void 0 : _a.replace(new RegExp(escapeRegExp("'"), "g"), '"'));
        if (typeof dataObject[key] !== "undefined" && ((_b = dataObject[key]) == null ? void 0 : _b.length) > 0) {
          const itemList = [];
          (_c = dataObject[key]) == null ? void 0 : _c.map((item) => {
            var _a2;
            itemList.push((_a2 = String(item)) == null ? void 0 : _a2.split(/\s*,\s*/));
          });
          dataObject[key] = itemList;
        }
      } else {
        dataObject[key] = data[key];
      }
    });
    return dataObject;
  } catch (e) {
    return null;
  }
};
const getOddDataObject = (data = []) => {
  if (!data)
    return null;
  try {
    const dataObject = [];
    Object.keys(data).map((key) => {
      var _a, _b, _c;
      if (typeof data[key] === "string") {
        if (key === "initial" || key === "inplay" || key === "instant") {
          dataObject[key] = JSON.parse((_a = data[key]) == null ? void 0 : _a.replace(new RegExp(escapeRegExp("'"), "g"), '"'));
          if (typeof dataObject[key] !== "undefined" && ((_b = dataObject[key]) == null ? void 0 : _b.length) > 0) {
            const itemList = [];
            (_c = dataObject[key]) == null ? void 0 : _c.map((item) => {
              var _a2;
              itemList.push((_a2 = String(item)) == null ? void 0 : _a2.split(/\s*,\s*/));
            });
            dataObject[key] = itemList;
          }
        } else {
          dataObject[key] = data[key];
        }
      } else {
        dataObject[key] = data[key];
      }
    });
    return dataObject;
  } catch (e) {
    return null;
  }
};
const getDataObjectByList = (data = []) => {
  try {
    if (!data)
      return null;
    const dataObject = [];
    data == null ? void 0 : data.map((item, index) => {
      dataObject[index] = getOddDataObject(item);
    });
    return dataObject;
  } catch (e) {
    return null;
  }
};
const getH2HOddTX = (scoreHome, scoreAway, totalOdd, $t) => {
  try {
    if (totalOdd == "")
      return "";
    if (parseFloatO(scoreHome) + parseFloatO(scoreAway) > parseFloatO(totalOdd)) {
      return '<span class="o-lose" title="' + $t("Over") + '">' + $t("O") + "</span>";
    } else if (parseFloatO(scoreHome) + parseFloatO(scoreAway) < parseFloatO(totalOdd)) {
      return '<span class="o-win" title="' + $t("Under") + '">' + $t("U") + "</span>";
    } else {
      return '<span class="o-void o-draw" title="' + $t("Draw") + '">' + $t("D") + "</span>";
    }
  } catch (e) {
    return "";
  }
};
const getH2HOddEU = (scoreHome, scoreAway, $t) => {
  try {
    if (parseFloatO(scoreHome) > parseFloatO(scoreAway)) {
      return '<span class="o-lose" title="' + $t("Win") + '">' + $t("W") + "</span>";
    } else if (parseFloatO(scoreHome) < parseFloatO(scoreAway)) {
      return '<span class="o-win" title="' + $t("Loss") + '">' + $t("L") + "</span>";
    } else {
      return '<span class="o-draw" title="' + $t("Draw") + '">' + $t("D") + "</span>";
    }
  } catch (e) {
    return "";
  }
};
const getH2HOddHadicap = (scoreHome, scoreAway, hadicapOdd, $t) => {
  try {
    if (hadicapOdd == "")
      return "";
    if (parseFloatO(scoreHome) + parseFloatO(hadicapOdd) > parseFloatO(scoreAway)) {
      return '<span class="o-lose" title="' + $t("Win") + '">' + $t("W") + "</span>";
    } else if (parseFloatO(scoreHome) + parseFloatO(hadicapOdd) < parseFloatO(scoreAway)) {
      return '<span class="o-win" title="' + $t("Loss") + '">' + $t("L") + "</span>";
    } else {
      return '<span class="o-draw" title="' + $t("Draw") + '">' + $t("D") + "</span>";
    }
  } catch (e) {
    return "";
  }
};
const getH2HStatistics = (matches, limit, i_team, cb_sos, is_home = true, $t) => {
  try {
    if (!matches || matches.length === 0 || limit === 0)
      return "";
    let totalWin = 0;
    let totalDraw = 0;
    let totalLose = 0;
    let totalWinTX = 0;
    let totalLossTX = 0;
    let totalWinHadicap = 0;
    let totalLossHadicap = 0;
    const total = 0;
    let number = 0;
    matches == null ? void 0 : matches.forEach((item) => {
      if (number < limit) {
        if (cb_sos) {
          if (is_home) {
            if (i_team != (item == null ? void 0 : item[5])) {
              return;
            }
          } else {
            if (i_team != (item == null ? void 0 : item[7])) {
              return;
            }
          }
        }
        if (i_team == (item == null ? void 0 : item[5])) {
          if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
            totalWin++;
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            totalDraw++;
          } else {
            totalLose++;
          }
          if (parseFloatO(item == null ? void 0 : item[8]) + parseFloatO(item == null ? void 0 : item[17]) > parseFloatO(item == null ? void 0 : item[9])) {
            totalWinHadicap++;
          } else if (parseFloatO(item == null ? void 0 : item[8]) + parseFloatO(item == null ? void 0 : item[17]) < parseFloatO(item == null ? void 0 : item[9])) {
            totalLossHadicap++;
          }
        } else if (i_team == (item == null ? void 0 : item[7])) {
          if (parseIntO(item == null ? void 0 : item[8]) < parseIntO(item == null ? void 0 : item[9])) {
            totalWin++;
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            totalDraw++;
          } else {
            totalLose++;
          }
          if (parseFloatO(item == null ? void 0 : item[9]) + parseFloatO(item == null ? void 0 : item[17]) > parseFloatO(item == null ? void 0 : item[8])) {
            totalWinHadicap++;
          } else if (parseFloatO(item == null ? void 0 : item[9]) + parseFloatO(item == null ? void 0 : item[17]) < parseFloatO(item == null ? void 0 : item[8])) {
            totalLossHadicap++;
          }
        }
        if ((item == null ? void 0 : item[29]) != "") {
          if (parseFloatO(item == null ? void 0 : item[8]) + parseFloatO(item == null ? void 0 : item[9]) > parseFloatO(item == null ? void 0 : item[29])) {
            totalWinTX++;
          } else if (parseFloatO(item == null ? void 0 : item[8]) + parseFloatO(item == null ? void 0 : item[9]) < parseFloatO(item == null ? void 0 : item[29])) {
            totalLossTX++;
          }
        }
        number++;
      }
    });
    const aHRate = totalWinHadicap + totalLossTX > 0 ? parseFloatO(totalWinHadicap * 100 / (totalWinHadicap + totalLossTX)).toFixed(0) : "-";
    const overRate = totalLossTX + totalWinTX > 0 ? parseFloatO(totalWinTX * 100 / (totalLossTX + totalWinTX)).toFixed(0) : "-";
    return $t("Statistical") + ' <span class="red">' + number + "</span> " + $t("Recent matches") + ", " + totalWin + " " + $t("Win") + ", " + totalDraw + " " + $t("Draw") + ", " + totalLose + " " + $t("Loss") + ", " + $t("Win rate") + '：<span class="red">' + parseFloatO(totalWin * 100 / number).toFixed(0) + "%</span> " + $t("Winning odds") + '：<span class="red">' + aHRate + "% </span> " + $t("Over rate odds") + '：<span class="red"> ' + overRate + "% </span> ";
  } catch (e) {
    return "";
  }
};
const getStaticsOdd = (Odds, findOdd, percent) => {
  try {
    if (Odds === "" || typeof Odds === "undefined")
      return 0;
    if (percent) {
      if ((Odds == null ? void 0 : Odds.length) > 0) {
        return ((Odds.match(new RegExp(findOdd, "g")) || []).length / (Odds == null ? void 0 : Odds.length) * 100).toFixed(1) + "%";
      } else {
        return "";
      }
    } else {
      return (Odds.match(new RegExp(findOdd, "g")) || []).length;
    }
  } catch (e) {
    return 0;
  }
};
const getH2hComparison = (matchesStat, homeTeamId, awayTeamId, i_competition_id, $t) => {
  try {
    if (!matchesStat)
      return [];
    let homeW = 0;
    let homeD = 0;
    let homeL = 0;
    let awayW = 0;
    let awayD = 0;
    let awayL = 0;
    let homeWComp = 0;
    let homeDComp = 0;
    let homeLComp = 0;
    let awayWComp = 0;
    let awayDComp = 0;
    let awayLComp = 0;
    let numberSameLeague = 1;
    let numberLimit = 0;
    matchesStat == null ? void 0 : matchesStat.forEach((item) => {
      if (numberLimit < 10) {
        if (homeTeamId == (item == null ? void 0 : item[5])) {
          if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
            homeW++;
            awayL++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberSameLeague <= 5) {
              homeWComp++;
              awayLComp++;
              numberSameLeague++;
            }
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            homeD++;
            awayD++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberSameLeague <= 5) {
              homeDComp++;
              awayDComp++;
              numberSameLeague++;
            }
          } else {
            homeL++;
            awayW++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberSameLeague <= 5) {
              homeLComp++;
              awayWComp++;
              numberSameLeague++;
            }
          }
        } else if (homeTeamId == (item == null ? void 0 : item[7])) {
          if (parseIntO(item == null ? void 0 : item[8]) < parseIntO(item == null ? void 0 : item[9])) {
            homeW++;
            awayL++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberSameLeague <= 5) {
              homeWComp++;
              awayLComp++;
              numberSameLeague++;
            }
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            homeD++;
            awayD++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberSameLeague <= 5) {
              homeDComp++;
              awayDComp++;
              numberSameLeague++;
            }
          } else {
            homeL++;
            awayW++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberSameLeague <= 5) {
              homeLComp++;
              awayWComp++;
              numberSameLeague++;
            }
          }
        }
        numberLimit++;
      }
    });
    const homePoint = homeW * 3 + homeD * 1;
    const awayPoint = awayW * 3 + awayD * 1;
    const homeInCompPoint = homeWComp * 3 + homeDComp * 1;
    const awayInCompPoint = awayWComp * 3 + awayDComp * 1;
    const homePercent = homePoint + awayPoint > 0 ? homePoint * 100 / (homePoint + awayPoint) : 0;
    const awayPercent = homePoint + awayPoint > 0 ? awayPoint * 100 / (homePoint + awayPoint) : 0;
    const homeLabel = `${homeW}${$t("W")} ${homeD}${$t("D")} ${homeL}${$t("L")}`;
    const awayLabel = `${awayW}${$t("W")} ${awayD}${$t("D")} ${awayL}${$t("L")}`;
    const homeInCompPercent = homeInCompPoint + awayInCompPoint > 0 ? homeInCompPoint * 100 / (homeInCompPoint + awayInCompPoint) : 0;
    const awayInCompPercent = homeInCompPoint + awayInCompPoint > 0 ? awayInCompPoint * 100 / (homeInCompPoint + awayInCompPoint) : 0;
    const homeInCompLabel = `${homeWComp}${$t("W")} ${homeDComp}${$t("D")} ${homeLComp}${$t("L")}`;
    const awayInCompLabel = `${awayWComp}${$t("W")} ${awayDComp}${$t("D")} ${awayLComp}${$t("L")}`;
    const totalP = homePercent + homeInCompPercent + awayPercent + awayInCompPercent;
    const totalHomePercent = totalP > 0 ? (homePercent + homeInCompPercent) / totalP * 100 : 0;
    const totalAwayPercent = totalP > 0 ? 100 - totalHomePercent : 0;
    return [
      homePercent.toFixed(0),
      awayPercent.toFixed(0),
      homeLabel,
      awayLabel,
      homeInCompPercent.toFixed(0),
      awayInCompPercent.toFixed(0),
      homeInCompLabel,
      awayInCompLabel,
      totalHomePercent.toFixed(0),
      totalAwayPercent.toFixed(0)
    ];
  } catch (e) {
    return [];
  }
};
const getStateComparison = (matchesStatHome, matchesStatAway, homeTeamId, awayTeamId, i_competition_id, limit = 10, $t) => {
  try {
    if (!matchesStatHome && !matchesStatAway)
      return [];
    let homeW = 0;
    let homeD = 0;
    let homeL = 0;
    let awayW = 0;
    let awayD = 0;
    let awayL = 0;
    let homeWComp = 0;
    let homeDComp = 0;
    let homeLComp = 0;
    let awayWComp = 0;
    let awayDComp = 0;
    let awayLComp = 0;
    let homeGoals = 0;
    let awayGoals = 0;
    let homeGoalsComp = 0;
    let awayGoalsComp = 0;
    let homeDefence = 0;
    let awayDefence = 0;
    let homeDefenceComp = 0;
    let awayDefenceComp = 0;
    let homeRed = 0;
    let awayRed = 0;
    let homeNumberLimit = 0;
    let numberHomeSameLeague = 1;
    let numberAwaySameLeague = 1;
    let homeCorner = 0;
    let awayCorner = 0;
    matchesStatHome == null ? void 0 : matchesStatHome.forEach((item) => {
      if (homeNumberLimit < limit) {
        if (homeTeamId == (item == null ? void 0 : item[5])) {
          homeGoals += parseIntO(item == null ? void 0 : item[8]);
          homeDefence += parseIntO(item == null ? void 0 : item[9]);
          homeCorner += parseIntO(item == null ? void 0 : item[14]);
          homeRed += parseIntO(item == null ? void 0 : item[12]);
          if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
            homeW++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberHomeSameLeague <= 5) {
              homeWComp++;
              numberHomeSameLeague++;
              homeGoalsComp += parseIntO(item == null ? void 0 : item[8]);
              homeDefenceComp += parseIntO(item == null ? void 0 : item[9]);
            }
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            homeD++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberHomeSameLeague <= 5) {
              homeDComp++;
              numberHomeSameLeague++;
              homeGoalsComp += parseIntO(item == null ? void 0 : item[8]);
              homeDefenceComp += parseIntO(item == null ? void 0 : item[9]);
            }
          } else {
            homeL++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberHomeSameLeague <= 5) {
              homeLComp++;
              numberHomeSameLeague++;
              homeGoalsComp += parseIntO(item == null ? void 0 : item[8]);
              homeDefenceComp += parseIntO(item == null ? void 0 : item[9]);
            }
          }
        } else if (homeTeamId == (item == null ? void 0 : item[7])) {
          homeGoals += parseIntO(item == null ? void 0 : item[9]);
          homeDefence += parseIntO(item == null ? void 0 : item[8]);
          homeCorner += parseIntO(item == null ? void 0 : item[15]);
          homeRed += parseIntO(item == null ? void 0 : item[12]);
          if (parseIntO(item == null ? void 0 : item[8]) < parseIntO(item == null ? void 0 : item[9])) {
            homeW++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberHomeSameLeague <= 5) {
              homeWComp++;
              numberHomeSameLeague++;
              homeGoalsComp += parseIntO(item == null ? void 0 : item[9]);
              homeDefenceComp += parseIntO(item == null ? void 0 : item[8]);
            }
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            homeD++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberHomeSameLeague <= 5) {
              homeDComp++;
              numberHomeSameLeague++;
              homeGoalsComp += parseIntO(item == null ? void 0 : item[9]);
              homeDefenceComp += parseIntO(item == null ? void 0 : item[8]);
            }
          } else {
            homeL++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberHomeSameLeague <= 5) {
              homeLComp++;
              numberHomeSameLeague++;
              homeGoalsComp += parseIntO(item == null ? void 0 : item[9]);
              homeDefenceComp += parseIntO(item == null ? void 0 : item[8]);
            }
          }
        }
        homeNumberLimit++;
      }
    });
    let awayNumberLimit = 0;
    matchesStatAway == null ? void 0 : matchesStatAway.forEach((item) => {
      if (awayNumberLimit < limit) {
        if (awayTeamId == (item == null ? void 0 : item[5])) {
          awayGoals += parseIntO(item == null ? void 0 : item[8]);
          awayDefence += parseIntO(item == null ? void 0 : item[9]);
          awayCorner += parseIntO(item == null ? void 0 : item[14]);
          awayRed += parseIntO(item == null ? void 0 : item[13]);
          if (parseIntO(item == null ? void 0 : item[8]) < parseIntO(item == null ? void 0 : item[9])) {
            awayL++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberAwaySameLeague <= 5) {
              awayLComp++;
              numberAwaySameLeague++;
              awayGoalsComp += parseIntO(item == null ? void 0 : item[8]);
              awayDefenceComp += parseIntO(item == null ? void 0 : item[9]);
            }
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            awayD++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberAwaySameLeague <= 5) {
              awayDComp++;
              numberAwaySameLeague++;
              awayGoalsComp += parseIntO(item == null ? void 0 : item[8]);
              awayDefenceComp += parseIntO(item == null ? void 0 : item[9]);
            }
          } else {
            awayW++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberAwaySameLeague <= 5) {
              awayWComp++;
              numberAwaySameLeague++;
              awayGoalsComp += parseIntO(item == null ? void 0 : item[8]);
              awayDefenceComp += parseIntO(item == null ? void 0 : item[9]);
            }
          }
        } else if (awayTeamId == (item == null ? void 0 : item[7])) {
          awayGoals += parseIntO(item == null ? void 0 : item[9]);
          awayDefence += parseIntO(item == null ? void 0 : item[8]);
          awayCorner += parseIntO(item == null ? void 0 : item[15]);
          awayRed += parseIntO(item == null ? void 0 : item[13]);
          if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
            awayL++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberAwaySameLeague <= 5) {
              awayLComp++;
              numberAwaySameLeague++;
              awayGoalsComp += parseIntO(item == null ? void 0 : item[9]);
              awayDefenceComp += parseIntO(item == null ? void 0 : item[8]);
            }
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            awayD++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberAwaySameLeague <= 5) {
              awayDComp++;
              numberAwaySameLeague++;
              awayGoalsComp += parseIntO(item == null ? void 0 : item[9]);
              awayDefenceComp += parseIntO(item == null ? void 0 : item[8]);
            }
          } else {
            awayW++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberAwaySameLeague <= 5) {
              awayWComp++;
              numberAwaySameLeague++;
              awayGoalsComp += parseIntO(item == null ? void 0 : item[9]);
              awayDefenceComp += parseIntO(item == null ? void 0 : item[8]);
            }
          }
        }
        awayNumberLimit++;
      }
    });
    const homePoint = (homeW * 3 + homeD * 1) / homeNumberLimit;
    const awayPoint = (awayW * 3 + awayD * 1) / awayNumberLimit;
    const homeInCompPoint = (homeWComp * 3 + homeDComp * 1) / numberHomeSameLeague;
    const awayInCompPoint = (awayWComp * 3 + awayDComp * 1) / numberAwaySameLeague;
    const homePercent = homePoint + awayPoint > 0 ? homePoint * 100 / (homePoint + awayPoint) : 0;
    const awayPercent = homePoint + awayPoint > 0 ? awayPoint * 100 / (homePoint + awayPoint) : 0;
    const homeLabel = `${homeW}${$t("W")} ${homeD}${$t("D")} ${homeL}${$t("L")}`;
    const awayLabel = `${awayW}${$t("W")} ${awayD}${$t("D")} ${awayL}${$t("L")}`;
    const homeInCompPercent = homeInCompPoint + awayInCompPoint > 0 ? homeInCompPoint * 100 / (homeInCompPoint + awayInCompPoint) : 0;
    const awayInCompPercent = homeInCompPoint + awayInCompPoint > 0 ? awayInCompPoint * 100 / (homeInCompPoint + awayInCompPoint) : 0;
    const homeInCompLabel = `${homeWComp}${$t("W")} ${homeDComp}${$t("D")} ${homeLComp}${$t("L")}`;
    const awayInCompLabel = `${awayWComp}${$t("W")} ${awayDComp}${$t("D")} ${awayLComp}${$t("L")}`;
    const totalPercent = homePercent + homeInCompPercent + awayPercent + awayInCompPercent;
    const totalHomePercent = totalPercent > 0 ? (homePercent + homeInCompPercent) / totalPercent * 100 : 0;
    const totalAwayPercent = totalPercent > 0 ? 100 - totalHomePercent : 0;
    const totalGoals = homeGoals / homeNumberLimit + awayGoals / awayNumberLimit;
    const homeGoalsPercent = totalGoals > 0 ? homeNumberLimit > 0 ? homeGoals / homeNumberLimit * 100 / totalGoals : 0 : 0;
    const awayGoalsPercent = totalGoals > 0 ? awayNumberLimit > 0 ? awayGoals / awayNumberLimit * 100 / totalGoals : 0 : 0;
    const totalGoalsComp = homeGoalsComp / homeNumberLimit + awayGoalsComp / awayNumberLimit;
    const homeGoalsCompPercent = totalGoalsComp > 0 ? homeNumberLimit > 0 ? homeGoalsComp / homeNumberLimit * 100 / totalGoalsComp : 0 : 0;
    const awayGoalsCompPercent = totalGoalsComp > 0 ? awayNumberLimit > 0 ? awayGoalsComp / awayNumberLimit * 100 / totalGoalsComp : 0 : 0;
    const totalGoalsPercent = homeGoalsPercent + homeGoalsCompPercent + awayGoalsPercent + awayGoalsCompPercent;
    const totalHomeGoalsPercent = totalGoalsPercent > 0 ? (homeGoalsPercent + homeGoalsCompPercent) / totalGoalsPercent * 100 : 0;
    const totalAwayGoalsPercent = totalGoalsPercent > 0 ? 100 - totalHomeGoalsPercent : 0;
    const totalDefence = homeDefence / homeNumberLimit + awayDefence / awayNumberLimit;
    const homeDefencePercent = totalDefence > 0 ? homeNumberLimit > 0 ? homeDefence / homeNumberLimit * 100 / totalDefence : 0 : 0;
    const awayDefencePercent = totalDefence > 0 ? awayNumberLimit > 0 ? awayDefence / awayNumberLimit * 100 / totalDefence : 0 : 0;
    const totalDefenceComp = homeDefenceComp / homeNumberLimit + awayDefenceComp / awayNumberLimit;
    const homeDefenceCompPercent = totalDefenceComp > 0 ? homeDefenceComp / homeNumberLimit * 100 / totalDefenceComp : 0;
    const awayDefenceCompPercent = totalDefenceComp > 0 ? awayDefenceComp / awayNumberLimit * 100 / totalDefenceComp : 0;
    const totalDefencePercent = homeDefencePercent + homeDefenceCompPercent + awayDefencePercent + awayDefenceCompPercent;
    const totalHomeDefencePercent = totalDefencePercent > 0 ? (homeDefencePercent + homeDefenceCompPercent) / totalDefencePercent * 100 : 0;
    const totalAwayDefencePercent = totalDefencePercent > 0 ? 100 - totalHomeDefencePercent : 0;
    homeCorner = awayNumberLimit > 0 ? (homeCorner / awayNumberLimit).toFixed(2) : 0;
    awayCorner = awayNumberLimit > 0 ? (awayCorner / awayNumberLimit).toFixed(2) : 0;
    return [
      homePercent.toFixed(0),
      awayPercent.toFixed(0),
      homeLabel,
      awayLabel,
      //4
      homeInCompPercent.toFixed(0),
      awayInCompPercent.toFixed(0),
      homeInCompLabel,
      awayInCompLabel,
      // 8
      totalHomePercent.toFixed(0),
      totalAwayPercent.toFixed(0),
      homeGoalsPercent.toFixed(0),
      awayGoalsPercent.toFixed(0),
      // 12
      `${homeGoals}${$t("Goal")}/${homeNumberLimit}${$t("Match")}`,
      `${awayGoals}${$t("Goal")}/${awayNumberLimit}${$t("Match")}`,
      homeGoalsCompPercent.toFixed(0),
      awayGoalsCompPercent.toFixed(0),
      // 16
      `${homeGoalsComp}${$t("Goal")}/${homeNumberLimit}${$t("Match")}`,
      `${awayGoalsComp}${$t("Goal")}/${awayNumberLimit}${$t("Match")}`,
      totalHomeGoalsPercent.toFixed(0),
      totalAwayGoalsPercent.toFixed(0),
      // 20
      `${homeDefence}${$t("Goal")}/${homeNumberLimit}${$t("Match")}`,
      `${awayDefence}${$t("Goal")}/${awayNumberLimit}${$t("Match")}`,
      homeDefencePercent.toFixed(0),
      awayDefencePercent.toFixed(0),
      // 24
      `${homeDefenceComp}${$t("Goal")}/${homeNumberLimit}${$t("Match")}`,
      `${awayDefenceComp}${$t("Goal")}/${awayNumberLimit}${$t("Match")}`,
      homeDefenceCompPercent.toFixed(0),
      awayDefenceCompPercent.toFixed(0),
      // 28
      totalHomeDefencePercent.toFixed(0),
      totalAwayDefencePercent.toFixed(0),
      // 30
      homeCorner,
      awayCorner,
      // 32
      Number(homeCorner) + Number(awayCorner) > 0 ? Number(homeCorner) * 100 / (Number(homeCorner) + Number(awayCorner)) : 0,
      Number(homeCorner) + Number(awayCorner) > 0 ? Number(awayCorner) * 100 / (Number(homeCorner) + Number(awayCorner)) : 0,
      // 34
      homeW,
      awayW,
      homeDefence,
      awayDefence,
      homeCorner,
      awayCorner,
      homeRed,
      awayRed,
      // 42
      homeGoals,
      awayGoals,
      homeGoals + awayGoals > 0 ? (homeGoals * 100 / (homeGoals + awayGoals)).toFixed(1) : 0,
      homeGoals + awayGoals > 0 ? (awayGoals * 100 / (homeGoals + awayGoals)).toFixed(1) : 0,
      // 46
      homeNumberLimit > 0 ? (homeGoals / homeNumberLimit).toFixed(1) : 0,
      awayNumberLimit > 0 ? (awayGoals / awayNumberLimit).toFixed(1) : 0,
      // 48
      homeNumberLimit > 0 ? (homeDefence / homeNumberLimit).toFixed(1) : 0,
      awayNumberLimit > 0 ? (awayDefence / awayNumberLimit).toFixed(1) : 0,
      // 50
      homeNumberLimit > 0 ? (homeW * 100 / homeNumberLimit).toFixed(1) : 0,
      awayNumberLimit > 0 ? (awayW * 100 / awayNumberLimit).toFixed(1) : 0,
      // 52
      homeNumberLimit > 0 ? (homeD * 100 / homeNumberLimit).toFixed(1) : 0,
      awayNumberLimit > 0 ? (awayD * 100 / awayNumberLimit).toFixed(1) : 0,
      // 54
      homeNumberLimit > 0 ? (homeL * 100 / homeNumberLimit).toFixed(1) : 0,
      awayNumberLimit > 0 ? (awayL * 100 / awayNumberLimit).toFixed(1) : 0
    ];
  } catch (e) {
    return [];
  }
};
const getStandingLastest = (matches, limit, i_team) => {
  try {
    if (!matches || matches.length === 0 || limit === 0)
      return "";
    let totalWin = 0;
    let totalDraw = 0;
    let totalLose = 0;
    let totalGoals = 0;
    let totalAgainst = 0;
    let totalPoint = 0;
    let number = 0;
    matches == null ? void 0 : matches.forEach((item) => {
      if (number < limit) {
        if (i_team == (item == null ? void 0 : item[5])) {
          totalGoals += parseIntO(item == null ? void 0 : item[8]);
          totalAgainst += parseIntO(item == null ? void 0 : item[9]);
          if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
            totalWin++;
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            totalDraw++;
          } else {
            totalLose++;
          }
        } else if (i_team == (item == null ? void 0 : item[7])) {
          totalGoals += parseIntO(item == null ? void 0 : item[9]);
          totalAgainst += parseIntO(item == null ? void 0 : item[8]);
          if (parseIntO(item == null ? void 0 : item[8]) < parseIntO(item == null ? void 0 : item[9])) {
            totalWin++;
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            totalDraw++;
          } else {
            totalLose++;
          }
        }
        number++;
      }
    });
    totalPoint = totalWin * 3 + totalDraw * 1;
    return [limit, totalWin, totalDraw, totalLose, totalGoals, totalAgainst, totalPoint, (totalWin * 100 / number).toFixed(1)];
  } catch (e) {
    return [];
  }
};
const getDataComparison = (matchesStat, teamId, is_home, limit = 10, $t) => {
  try {
    if (!matchesStat)
      return [];
    let scored = 0;
    let conceded = 0;
    let diff = 0;
    let avgScored = 0;
    let win = 0;
    let draw = 0;
    let loss = 0;
    let scoredSame = 0;
    let concededSame = 0;
    let diffSame = 0;
    let avgScoredSame = 0;
    let winSame = 0;
    let drawSame = 0;
    let lossSame = 0;
    let i = 0;
    const numberLimit = (matchesStat == null ? void 0 : matchesStat.length) < limit ? matchesStat == null ? void 0 : matchesStat.length : limit;
    matchesStat == null ? void 0 : matchesStat.forEach((item) => {
      if (i < numberLimit) {
        if (teamId == (item == null ? void 0 : item[5])) {
          scored += parseIntO(item == null ? void 0 : item[8]);
          conceded += parseIntO(item == null ? void 0 : item[9]);
          if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
            win++;
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            draw++;
          } else {
            loss++;
          }
          if (is_home) {
            scoredSame += parseIntO(item == null ? void 0 : item[8]);
            concededSame += parseIntO(item == null ? void 0 : item[9]);
            if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
              winSame++;
            } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
              drawSame++;
            } else {
              lossSame++;
            }
          }
        } else if (teamId == (item == null ? void 0 : item[7])) {
          scored += parseIntO(item == null ? void 0 : item[9]);
          conceded += parseIntO(item == null ? void 0 : item[8]);
          if (parseIntO(item == null ? void 0 : item[8]) < parseIntO(item == null ? void 0 : item[9])) {
            win++;
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            draw++;
          } else {
            loss++;
          }
          if (!is_home) {
            scoredSame += parseIntO(item == null ? void 0 : item[8]);
            concededSame += parseIntO(item == null ? void 0 : item[9]);
            if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
              winSame++;
            } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
              drawSame++;
            } else {
              lossSame++;
            }
          }
        }
        i++;
      }
    });
    diff = scored - conceded;
    avgScored = numberLimit > 0 ? ((win * 3 + draw * 1) / numberLimit).toFixed(1) : 0;
    win = numberLimit > 0 ? (win * 100 / numberLimit).toFixed(1) : 0;
    draw = numberLimit > 0 ? (draw * 100 / numberLimit).toFixed(1) : 0;
    loss = numberLimit > 0 ? (loss * 100 / numberLimit).toFixed(1) : 0;
    diffSame = scoredSame - concededSame;
    avgScoredSame = numberLimit > 0 ? ((winSame * 3 + drawSame * 1) / numberLimit).toFixed(1) : 0;
    winSame = numberLimit > 0 ? (winSame * 100 / numberLimit).toFixed(1) : 0;
    drawSame = numberLimit > 0 ? (drawSame * 100 / numberLimit).toFixed(1) : 0;
    lossSame = numberLimit > 0 ? (lossSame * 100 / numberLimit).toFixed(1) : 0;
    return [scored, conceded, diff, avgScored, win + "%", draw + "%", loss + "%", is_home ? $t("Home") : $t("Away"), scoredSame, concededSame, diffSame, avgScoredSame, winSame + "%", drawSame + "%", lossSame + "%"];
  } catch (e) {
    return [];
  }
};
const getRecentResultStat = (data = [], matchId) => {
  try {
    if (data.length <= 0)
      return;
    let win2 = 0;
    let win1 = 0;
    let draw = 0;
    let lose1 = 0;
    let lose2 = 0;
    data == null ? void 0 : data.forEach((item) => {
      if ((item == null ? void 0 : item.home_team_id) === matchId) {
        const compare = parseIntO(item == null ? void 0 : item.home_scores[0]) - parseIntO(item == null ? void 0 : item.away_scores[0]);
        if (compare >= 2) {
          win2++;
        } else if (compare === 1) {
          win1++;
        } else if (compare === 0) {
          draw++;
        } else if (compare === -1) {
          lose1++;
        } else if (compare < -1) {
          lose2++;
        }
      } else if ((item == null ? void 0 : item.away_team_id) === matchId) {
        const compare = parseIntO(item == null ? void 0 : item.away_scores[0]) - parseIntO(item == null ? void 0 : item.home_scores[0]);
        if (compare >= 2) {
          win2++;
        } else if (compare === 1) {
          win1++;
        } else if (compare === 0) {
          draw++;
        } else if (compare === -1) {
          lose1++;
        } else if (compare < -1) {
          lose2++;
        }
      }
    });
    return [win2, win1, draw, lose1, lose2, win2 + win1 + draw + lose1 + lose2];
  } catch (e) {
    return [];
  }
};
const getOddsCorrectScore = (odds, homeScore, awayScore) => {
  var _a, _b;
  try {
    if (typeof odds === "undefined" || !odds)
      return "";
    const odd = (_b = (_a = odds == null ? void 0 : odds.bettingOddsItems) == null ? void 0 : _a.find((item) => (item == null ? void 0 : item.homeScore) === homeScore && (item == null ? void 0 : item.awayScore) === awayScore)) == null ? void 0 : _b.odds;
    if (odd) {
      return parseFloatO(odd);
    } else {
      return "-";
    }
  } catch (e) {
    return "-";
  }
};
const getValueByPosition = (odd, position) => {
  var _a;
  try {
    if (odd.length > 0) {
      const odds = (_a = String(odd)) == null ? void 0 : _a.split(/\s*,\s*/);
      if ((odds == null ? void 0 : odds.length) > position) {
        return odds[position] && odds[position] !== "null" ? odds[position] : "";
      }
    }
    return "";
  } catch (e) {
    return "";
  }
};
const getValueByPositionWarehourse = (odd, position) => {
  var _a, _b, _c, _d;
  try {
    if (odd.length > 0) {
      const odds = (_d = (_c = (_b = (_a = String(odd)) == null ? void 0 : _a.replace(new RegExp(escapeRegExp("["), "g"), "")) == null ? void 0 : _b.replace(new RegExp(escapeRegExp("'"), "g"), "")) == null ? void 0 : _c.replace(new RegExp(escapeRegExp("]"), "g"), "")) == null ? void 0 : _d.split(/\s*,\s*/);
      if ((odds == null ? void 0 : odds.length) > position) {
        return odds[position] && odds[position] !== "null" ? odds[position] : "";
      }
    }
    return "";
  } catch (e) {
    return "";
  }
};
const getDetailOddsChange = (data = [], typeOdd = "", group = "", position = 0) => {
  var _a, _b;
  try {
    if ((data == null ? void 0 : data.length) <= 0)
      return "-";
    const oddData = data == null ? void 0 : data.find(({ type }) => type === typeOdd);
    if (oddData == null ? void 0 : oddData[group]) {
      const data2 = JSON.parse((_a = oddData[group]) == null ? void 0 : _a.replace(new RegExp(escapeRegExp("'"), "g"), '"'));
      if (data2[position]) {
        const oddValue = data2[position];
        if (oddData == null ? void 0 : oddData[group + "_older"]) {
          const dataOlder = JSON.parse((_b = oddData[group + "_older"]) == null ? void 0 : _b.replace(new RegExp(escapeRegExp("'"), "g"), '"'));
          if (dataOlder[position]) {
            const oddOlderValue = dataOlder[position];
            if (parseFloat(oddValue) > parseFloat(oddOlderValue)) {
              return '<div class="up">' + (parseFloatO(oddValue) !== 0 ? parseFloatO(oddValue).toFixed(2) : 0) + "</div>";
            } else if (parseFloat(oddValue) < parseFloat(oddOlderValue)) {
              return '<div class="down">' + (parseFloatO(oddValue) !== 0 ? parseFloatO(oddValue).toFixed(2) : 0) + "</div>";
            } else {
              return parseFloatO(oddValue) !== 0 ? parseFloatO(oddValue).toFixed(2) : 0;
            }
          }
        }
        return data2[position];
      }
    }
    return "";
  } catch (e) {
    return "";
  }
};
const generateMetaSeo = (meta, home_name, home_away, time = "", timeZone = "", competition_name = "") => {
  var _a, _b, _c, _d;
  try {
    return (_d = (_c = (_b = (_a = meta == null ? void 0 : meta.replaceAll("${home_name}", home_name)) == null ? void 0 : _a.replaceAll("${away_name}", home_away)) == null ? void 0 : _b.replaceAll("${date}", formatDateMomentUTCTimeZone(time, "DD-MM-yyyy", timeZone))) == null ? void 0 : _c.replaceAll("${time}", formatDateMomentUTCTimeZone(time, "HH:mm", timeZone))) == null ? void 0 : _d.replaceAll("${competition_name}", competition_name);
  } catch (e) {
    return meta;
  }
};
const generateCompetitionMetaSeo = (meta, competition_name) => {
  try {
    return meta == null ? void 0 : meta.replaceAll("${competition_name}", competition_name);
  } catch (e) {
    return meta;
  }
};
const generateTeamMetaSeo = (meta, team_name) => {
  try {
    return meta == null ? void 0 : meta.replaceAll("${team_name}", team_name).replaceAll("${player_name}", team_name).replaceAll("${coach_name}", team_name);
  } catch (e) {
    return meta;
  }
};
const useApiLiveScore = async (url = "", paras, isEncode = true) => {
  var _a, _b;
  try {
    if (isEncode) {
      try {
        const { data, pending, error, refresh, status } = await useFetch(url + (paras ? "?" + new URLSearchParams(paras) : ""), "$UqgiltlUfE");
        return await decodeDataAPI((_a = data == null ? void 0 : data.value) == null ? void 0 : _a[0], (_b = data == null ? void 0 : data.value) == null ? void 0 : _b[1]);
      } catch (e) {
        return null;
      }
    } else {
      try {
        const { data, pending, error, refresh } = await useFetch(createUrl(url, paras), "$HgqqyPIEgZ");
        return { data };
      } catch (e) {
        return null;
      }
    }
  } catch (e) {
    return null;
  }
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "HotLeaguesComponent",
  __ssrInlineRender: true,
  emits: ["onClick"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const compSeason = ref([]);
    const compSeasonState = useState("compSeasonState", () => []);
    const compSeasonList = useState("compSeasonState");
    const storeSystems = systemsStore();
    const { useLocale, $t } = useShareCommon();
    const imageHeight = getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "LEAGUE_IMAGE_HEIGHT") ?? "!h50";
    const emit = __emit;
    const onClick = () => {
      emit("onClick");
    };
    const fetchCompSeason = async () => {
      var _a;
      if ((_a = compSeasonList.value) == null ? void 0 : _a.length) {
        compSeason.value = compSeasonList.value;
        return;
      }
      useApiLiveScore(API_ROUTERS.LIVESCORE.COMP_LIST, {
        limit: 30,
        page: 1,
        hot: "5",
        lang: useLocale == null ? void 0 : useLocale.value.defaultLocale
      }).then(async (resData) => {
        compSeason.value = resData;
        compSeasonState.value = resData;
      });
    };
    [__temp, __restore] = withAsyncContext(() => fetchCompSeason()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$3;
      const _component_BaseImage = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "lrdiv" }, _attrs))}><div class="lr_tit on" aria-label="Hot Leagues">${ssrInterpolate(unref($t)("Hot Leagues"))}</div><nav id="nav" aria-label="Hot Leagues Menu"><ul class="leftnav tli"><!--[-->`);
      ssrRenderList(unref(compSeason), (comp) => {
        _push(`<li${ssrRenderAttr("id", "hot-league-" + (comp == null ? void 0 : comp.id))}>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).LEAGUES + "/" + (comp == null ? void 0 : comp.id),
          title: comp == null ? void 0 : comp.comp_name,
          onClick
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="league-img"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseImage, {
                src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(
                  (comp == null ? void 0 : comp.comp_logo) + unref(imageHeight),
                  "competition"
                ),
                alt: comp == null ? void 0 : comp.comp_name,
                class: "cImg",
                style: { "display": "inline" }
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="comp-name"${_scopeId}>${ssrInterpolate(comp == null ? void 0 : comp.comp_name)}</div>`);
            } else {
              return [
                createVNode("div", { class: "league-img" }, [
                  createVNode(_component_BaseImage, {
                    src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(
                      (comp == null ? void 0 : comp.comp_logo) + unref(imageHeight),
                      "competition"
                    ),
                    alt: comp == null ? void 0 : comp.comp_name,
                    class: "cImg",
                    style: { "display": "inline" }
                  }, null, 8, ["src", "alt"])
                ]),
                createVNode("div", { class: "comp-name" }, toDisplayString(comp == null ? void 0 : comp.comp_name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></nav><span id="leaBtm"></span></div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HotLeaguesComponent.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const HotLeaguesComponent = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: _sfc_main$c
});
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "FastSearchLivescore",
  __ssrInlineRender: true,
  props: {
    "orderByTime": {},
    "orderByTimeModifiers": {},
    "compsList": {},
    "compsListModifiers": {},
    "renderTopList": {},
    "renderTopListModifiers": {},
    "activeTab": {},
    "activeTabModifiers": {},
    "compsListSearch": {},
    "compsListSearchModifiers": {},
    "renderTopListSearch": {},
    "renderTopListSearchModifiers": {}
  },
  emits: ["update:orderByTime", "update:compsList", "update:renderTopList", "update:activeTab", "update:compsListSearch", "update:renderTopListSearch"],
  setup(__props) {
    const orderByTime = useModel(__props, "orderByTime");
    const compsList = useModel(__props, "compsList");
    const renderTopList = useModel(__props, "renderTopList");
    const activeTab = useModel(__props, "activeTab");
    const { useLocale, $t } = useShareCommon();
    const searchMatch = ref("");
    const compsListSearch = useModel(__props, "compsListSearch");
    const renderTopListSearch = useModel(__props, "renderTopListSearch");
    const initMatch = ref([]);
    function deepClone(obj, hash2 = /* @__PURE__ */ new WeakMap()) {
      if (hash2.has(obj)) {
        return hash2.get(obj);
      }
      if (obj === null || typeof obj !== "object") {
        return obj;
      }
      if (obj instanceof Date) {
        return new Date(obj);
      }
      if (obj instanceof RegExp) {
        return new RegExp(obj);
      }
      const clone = Array.isArray(obj) ? [] : {};
      hash2.set(obj, clone);
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          clone[key] = deepClone(obj[key], hash2);
        }
      }
      return clone;
    }
    watch(
      () => compsList.value,
      () => {
        initMatch.value = deepClone(compsList.value);
      },
      { immediate: true }
    );
    function removeVietnameseTones(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
    }
    const getMatchByComp = () => {
      try {
        if (searchMatch.value) {
          const data = initMatch.value.map((item) => {
            if (String(removeVietnameseTones(item.name)).toLowerCase().includes(String(removeVietnameseTones(searchMatch.value)).toLowerCase())) {
              return item;
            }
            const match = item.matchs.filter((item2) => {
              var _a, _b;
              return ((_a = item2 == null ? void 0 : item2.away_team) == null ? void 0 : _a.name.toLowerCase().trim().includes(searchMatch.value.toLowerCase().trim())) || ((_b = item2 == null ? void 0 : item2.home_team) == null ? void 0 : _b.name.toLowerCase().trim().includes(searchMatch.value.toLowerCase().trim()));
            });
            if (!!match.length) {
              return {
                ...item,
                matchs: match
              };
            }
          }).filter((item) => !!(item == null ? void 0 : item.id));
          compsListSearch.value = data;
        } else {
          compsListSearch.value = [];
        }
      } catch (e) {
        compsListSearch.value = null;
      }
    };
    const getMatchByTime = () => {
      try {
        const filteredMap = new Map(
          [...renderTopList.value].filter(([key, value]) => {
            return value.some((item) => String(removeVietnameseTones(item.comp.name)).toLowerCase().includes(String(removeVietnameseTones(searchMatch.value)).toLowerCase())) || value.some((item) => String(removeVietnameseTones(item.home_team.name)).toLowerCase().includes(String(removeVietnameseTones(searchMatch.value)).toLowerCase())) || value.some((item) => String(removeVietnameseTones(item.away_team.name)).toLowerCase().includes(String(removeVietnameseTones(searchMatch.value)).toLowerCase()));
          })
        );
        renderTopListSearch.value = filteredMap;
      } catch (e) {
        console.log(e);
      }
    };
    const handleSearch = debounce(() => {
      if (!searchMatch.value) {
        compsListSearch.value = null;
        renderTopListSearch.value = null;
      } else {
        if (orderByTime.value) {
          getMatchByTime();
        } else {
          getMatchByComp();
        }
      }
    }, 300);
    watch(
      () => searchMatch.value,
      () => {
        handleSearch();
      }
    );
    watch(
      () => activeTab.value,
      () => {
        searchMatch.value = null;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "search-box" }, _attrs))} data-v-1bf36369><button class="btn-search" data-v-1bf36369><svg style="${ssrRenderStyle({ "width": "14px" })}" xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" data-v-1bf36369><path d="M19.6714 18.5942L15.8949 14.8287C17.1134 13.2764 17.7745 11.3595 17.7721 9.38603C17.7721 7.62854 17.2509 5.91052 16.2745 4.44922C15.2981 2.98792 13.9103 1.84897 12.2866 1.17641C10.6629 0.50385 8.87617 0.327877 7.15245 0.670746C5.42873 1.01362 3.84539 1.85993 2.60266 3.10266C1.35993 4.34539 0.513616 5.92873 0.170746 7.65245C-0.172123 9.37617 0.00385015 11.1629 0.676412 12.7866C1.34897 14.4103 2.48792 15.7981 3.94922 16.7745C5.41052 17.7509 7.12854 18.2721 8.88603 18.2721C10.8595 18.2745 12.7764 17.6134 14.3287 16.3949L18.0942 20.1714C18.1974 20.2755 18.3203 20.3582 18.4556 20.4146C18.591 20.471 18.7362 20.5 18.8828 20.5C19.0294 20.5 19.1746 20.471 19.31 20.4146C19.4453 20.3582 19.5682 20.2755 19.6714 20.1714C19.7755 20.0682 19.8582 19.9453 19.9146 19.81C19.971 19.6746 20 19.5294 20 19.3828C20 19.2362 19.971 19.091 19.9146 18.9556C19.8582 18.8203 19.7755 18.6974 19.6714 18.5942ZM2.22151 9.38603C2.22151 8.06791 2.61238 6.7794 3.34468 5.68342C4.07699 4.58745 5.11785 3.73324 6.33563 3.22882C7.55341 2.72439 8.89342 2.59241 10.1862 2.84957C11.479 3.10672 12.6665 3.74145 13.5986 4.6735C14.5306 5.60555 15.1653 6.79306 15.4225 8.08585C15.6796 9.37864 15.5477 10.7186 15.0432 11.9364C14.5388 13.1542 13.6846 14.1951 12.5886 14.9274C11.4927 15.6597 10.2041 16.0505 8.88603 16.0505C7.11849 16.0505 5.42334 15.3484 4.1735 14.0986C2.92366 12.8487 2.22151 11.1536 2.22151 9.38603Z" fill="#373737" data-v-1bf36369></path></svg></button><input${ssrRenderAttr("value", unref(searchMatch))} type="text" class="${ssrRenderClass([
        "input-search",
        {
          "input-search--active": unref(searchMatch)
        }
      ])}"${ssrRenderAttr("placeholder", unref($t)("Quick Search"))} data-v-1bf36369></div>`);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FastSearchLivescore.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-1bf36369"]]);
const _sfc_main$a = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    style: { "height": "30px", "color": "#43951e !important", "width": "30px" },
    class: "spinner-grow text-success",
    role: "status"
  }, _attrs))} data-v-d416e21c></div>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Loading.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-d416e21c"]]);
const _soundGoal0 = "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAP/DA+LGOQTv/mA0UGSDn/hYAwKYuE8qJwLhA0rC5f1ppgAhDpgbOBd3+pgbUD3At8E+hif9D3DzBiMTmIXEFxp/3+wFnhb4J8EJB5Fliif/78R2KXFnjTHMFHH/4yDAWyZ75jABm5gAZgyA6P///x2EXGQGPFxj7HGTAsY5AuAhn////5EDMZAdY4yGjjMBkyMHATQzCIuD//////x9i4yVIOgQcsEsBBAHyu7Q7TMAAEAwGi3YMZrU/2ZHmnKp6HsPnv/jIMAcGqs21n+HOQDMeiMe5l2QxTZjIRdEfccBx878SBOE/qASLgCxelTz4ChHF++Zmf8HEWbpjQzk3Yw08Az////MVzDG5k9jJhjb/9Dlf5iuY5hcxH8nI/yYX////////////rat/+MgwAwUKirEAcFoACetk0WZmRmReJITIS4LqC2hdR4iXCZDOPUS4ZhgxgRSEpG4LgF3GMEjJIRgoJpp6i4PQlDQzJcmGpQM0jnqOf///zAdSHeAiIiHf/14B8MVM9zy+pklvAcDFJz/4yDAFhFR3wsaaMSXQ2YSgMyN9zdU/JkRLzdio9JDVSrGu6FMXrptoZSkG/lek2oCoD/9Bjukkt3+kzWAh4d4iHd//FgFWF8+9mZ3d9zGWTwVajF+3SMipEhlOzKOfn0kOfefxJWQs//jIMArEUHbBxqYxpfsl///73QITnERC83cW8ABcn/IzTDVNd/Opfv//t9tEEsCtC472rdSakbksVVfO5Nn/RyBaqWREU0mI5pnsuz0VU9HbscY3pYIwAwCwsBQB4LAdhMaAjzQkFDy/+MgwEETgZb2XJjOlhvsrR8t///Lg+UNU5mYmJiXh4/iEdAB2EnFpJXQrWpNN6doV33U+ZWe9tWOVGm0slLlN0eu3/uo3P/cGDhE1Jq/////zf/0////0/9BWRVVIitgh3iIiIiP4AD/4yDAThFa8wseoI67SAHqWkU+ug6tNSkGS25EIUZsxCkMcARCzPlGdmYyfMy9/rUv+ZWORjkJ//////////////McZUikZP+Qh3iIiHeP8QQIARlabVtoGBcUpDIjMZFnh0JPIpyZVP/jIMBjEPL3Bx6QRLsIjPp6kzqVtfn/94RKQNeGDEH6gacJSLQ+A2Hzk5WDldzv////4deJSMWAhnZmt1tuZYcgE1uX61rHOlv/nnhjzWWC7Lei9SMRSyJoz5txVIwoAaC1J2pvudn+/+MgwHoSUUcHHmjGkjHVCVXu49El//9n7sS82UQ35+1ZPEkTnRokRzu2efMzMVUy8tstuN9k4GJO0kqR1ETwDBy4lmdos2l2hAgC00uE2ghd0ElM+szNYjI1yYD6FTtDh1E0hREITMH/4yDAixkqUur60My3MNpiul3o3Rf6lUTQyhnmzGs6qyluzLZm0tFoGMcwlnK1ET8hvR2MuhnKwYMEjxVe4GnsRYVYKnDJo9dkIZCL6S2aaALDQDFbOVvfGrzPichQwonITmHCjDJ4Qv/jIMCBGOKuwvygRLiELyFCEQhebUokszyiWvLTMYCAhRjdf6dAwExjLMBCn8pUM+UuWGASl8pTP/Q3qWhjGDARgoV8UV34T++FFTe/7vyOlRALDIwRmD4kCChQQMAOPWwyEhYVFXfF/+MgwHgYasqhvDBEuUWb////FWeMFhZJkJCwuIQqKiMSB4GQqKCwef9YqKirMeKigs3//WKAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAD/4yDAcQ+YNcQASIIkIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIP/jIMCNAAACWAAAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAA/wMDAAAAAf8DAwAAAAE=";
const _soundGoal1 = "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAPA0BYDGBu4DAQQg8LCAvp3xkhKBOf3BuoBggDCA2P/+Pax5EJxS//2BvALgNBOAnsNv/tvdwPCAAABoAJOGBAsoDt///hYABoAuDEfmQguLGQQcP///4YDE5h//4yDAWyTL5lABlJAAIIKDIBicd7jni5yJgFX////+OIqEEGuI/EeD7HeANYarFxjRDL4nMLgP//////Gg4g8mGDbyDkuACtfwQYQPSXv3eKRCFl7yTr7VeVzkut2zo1uzkIT2a76bvf/jIMAiE0pevAHIEAARrh2p6rpzva+mrf+dX732Q6vRXWEBA0DzWNGLYLWTiBA7rfORRaQilp/0APvpZoabBvRxKjGlS8E1iSUA+UVKuBgLJPm2XEyBX//7STO//730p9f6GY1D3Q9P/+MgwC8TE27hlBBE2U7T19P2PJokjKc+ukk51VL7NyVd6Nq+wc5RanD5AKJJJIJ+UqMRuhQMOCIxhZSkwBUBn1lx7+QB8ThZKy4kS5QAJuCIqZGxZf/tX58XNnCjpdxdjwwDixMEYRb/4yDAPRUIYy/+EMZKEFAm8oPIBxpiFWJCJLbetLlJVCKxgkSAjSZKTS2oAMxSZMVI1VMuKw8X+RqLl1/UvbN8rP/9WK6OUrS6JKNf9byUg+uVQ0e6LPOvrOryp3qw09YaXyaOWPFcRP/jIMBDESGfD/4YRJaJEOkluv2vARZqmOpZUd6ot2UaqbqR7VQvZKUfWqP6Xff0NW7VVfWlDUZPrBRM///9ACt2mt6lHtWnNgevlGfRuzdNRGmHU0CS6u2C20EQ88DIFFEGajBRgaEh/+MgwFkQwfbNlDiKtDmzFhNAfcQ9pEP8oY0lOXPodGjX/xBQEtwrEGXoZ9QuARZoWDsqAzj3JMb/QXe8akVg+gDWFBBnu6gGJE4PkBZLoqIxX0dwJHFxnePtO7V74pKWLcoYZ2frPhv/4yDAcRJQBuL+eAAAQQwydMqSqpv3CxoUNcRgs3+lShcM2JFSxIVAfzEJbl+wAsgACMRIHQofoUL84XX/4iABOLROr9mU5+R2IT0kU53JkqfZSPIieyECeD58MYPh9CgRC2UGvsUCBf/jIMCCEFAK4jQ4AADD158ED6NQYE//4gOA+I0QLlXPg1q8rKS2MGEqrZFw/L85T7hmPQy1b9C9KGNaimSrJej6di0M9cqKIta8a+E4udO1B0ROv8Ggqe6wVdGSKJNSZHplU9Eqp4iD/+MgwJsTaaL7/gjElKCWuNtM0TNg3DsNYPaV8MwIXU2hbP6mrmKamiKR13bvrdupUUvX2/Kn0iShY7OlcAlruVI648PKQ8aEnwLnTlVGKuImJV++JQ4kSh22JAZAllQUUlt2o2/ALrr/4yDAqBNZpu4UEMSUkqS0WRRTvlssK4UaIT8jM0Uj1WVdrucZHo1kUMYVW90Vkpt+uuD/0BrnaiC39uJ9J1e/JDmb5keoklrrRx7FckNAhmQ0cslsou+AC4g6rJnTe5utOGQmeQnEMP/jIMC1E5Gi7/4YipQ8n/Eanl6ylu5jstXdqM7MT+kp7WSyss/Cv/uMLRAVGVoPF6h5/etQKhsTi7mkwywKhORAJwcct00UoM0jO6cbElwBUpnV03PTFRkr4QySGq/z3Jl1+/tW/2TZ/+MgwMETEaLi/mhElN0VDXoKo9EM5W/Vpvt1lwr/6zKFveOYptUiuJWuHrO0oorcyifqXJiVyg7CYIiUKHSR42BNJpsSf5NAYUDSzsFQEeLAIGn+oOg0HSXgqWDQNElwVWWfPbKn1A3/4yDAzxTxotL+aESUWHSwVO/ogrlRoSDhGsZo/kRKAtR4riIKhup63hoO8kHZYkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/jIMDWFNmexj5oxJQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MgwN0SWArD/hAAAgAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACD/4yDA7gAAAlgAAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAP/jIMD/AAACWAAAAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAA/wMDAAAAAQ==";
const _soundGoal2 = "data:audio/mpeg;base64,/+MQwAAAAAJYAAAAAEGjU2ZMmf80/+aNGTJkyYNGjRof7wTeioPlAx8uCHByJ3/BMH8EAf/jEMAnBMAA9AAAAAD6nfBAMaMHw/g+f+D7/UGA/6SLZwnk3bNdvZXMU1vzGYxh+So4z/P/4xDAOwjgAjcrQAAADGPwIyceoRHf3+fc2cd/+YY3mt///z8wxj+h2RkxOUD/1OYgEQnk/+MQwD4NklroAYpQAZL///6B5v9FAewEEHMbUav///////////1mIUDQAADgAL/9gLDH///jEMAuCJoe2AHRaAH//t/+AQ7////////////8G4DAACAAav+sK1P///+jf/QMV///////4xDAMgcKIvaGOUS0/////v/+HNkA0AAAwAF2/6g6Jf///7f/UFj/////////////g6DA/+MQwDwHUh7x5mqEtwH/0y+D+Jw3///9v/MMBUSf////////////QqZQACQAAmgFEH/+pf/jEMBFBzIe8oZpxLSAUqcW9/yN/6bHAmKkU3xOQyHkHoLSX4IAMPu/+oBh8EHAZAsBgJf/4xDATwd6ItwHTVAAAADgAGqJig/+RFJEQPKT/////+M//QGBW////QDwBwARSF/jjPLD/+MQwFgL0Ps7hYUQRkCNrP/////2xu3/4Kgj/////s2dYLgAADQAF0OMH815wdb///2/5v/jEMBPB1ke+ofNKADAX//Bu/////lPe+ncAAAoDABjiEv4zCwCt///2/64U//4W7//////4xDAWAeZGulGC05y+t1w4NAAAACh+AGD/5u1EIR2///7f9nu3/4hf////3dvmJgAAJHt/+MQwGAHgRcHrgqEcvmQkZ////b+T+XeiwWah4oLA4HjQwWbqaaNVINPFtdBo0DxgDAEEP/jEMBpB6EW/i4JSnIm9/hCsnBTomQGbq////fH8aP9v2Gf+pgEQ2xwADYhk/gcpgPsN+P/4xDAcQeBFvLOC05wywRkb/////bHzeh/4kCd/1YRw6D8ACpprnfwEl1i9DfEi6C8X//+/+MQwHoJmANLxgAAAo3/Oxj+PvwcO/6xoGymAAByQ5/9AcRIhgKE+kBfn///7f87kz81/P/jEMB6B/lS6fArTpB3Fn/rFQpAmAAzhYxfwfE5fpit3/+qf/JfV//B/1g+D4fBB2XLg+D/4xDAgQfZTt3gLJSQ+D4IAgCAYMMEWV0O/i+Hj5/qH///++Iv/+NmRWtlZRYCG////EQ8/+MQwIgH+U7Z4DyUkOB4ADSv+IMij2sCuemSADST///9cp+v4nf/5Ut////UJagAAIItH//jEMCPCBlO2oBUWpD8DZIxEQ8LX8nATh7///03b6fqP/+NHf///4M4mwAAZmcv+ArrHwb/4xDAlQmwA0fOAAACBdwinyeEXS////lf1/ML//Klv///8MCqAAC7n/8KZOD2i4Rf1lwF/+MQwJUIGb8qGAiKlqn///9cn6fgh//gxv///8DAiQAAg9Cp/i2k8L8yITT1GQIFv///TP/jEMCbCAG65eA7TpRL8v4x//hY7///+oyXAACCOhz/4QuoiiUKYJP8fwkaTf//98b+/4X/4xDAoghpvuqIE0qUN/8Lb////BSqAAAAmnKqfoFEmAUrrCg9ZcCRJ///+uT9vzDf/Bv//+MQwKcIabrmgCtOlP//wQu4AACADkZP+B2TGYn0gofUTgZG///9MV+/4dv/kf////HAsP/jEMCsCBG65oA7RJQAAIOp3/UFrsZAis4Hb47wt6X///nxH9Pwv/8K////1ECgAAB0f/r/4xDAsgiBuuaIE0qUA5izCrMgAlfTLgBbP///7Yh+X8RH//Eh3///+CiwAABjf/g7LKI0/+MQwLcIsbriiDtKlDaEkQbreojgVDV///+mdvv+ID//qO////wcsAAAnv/1AS6Y0AqXcP/jEMC7CMG64pA7RJQKvxjgj6X///riP7fhT//Ud////UOAsAAAsv/QHDmGoDzRNgAlemT/4xDAvwhRuuKQK0SUoANJP///2xx/v+IP/1Lf///4rKAAANf/DZaOsLSjyANsfUXgqJ5//+MQwMQIcbraiDtKlP//piTfb8KHf/UM////qJCwAADT/qBE9QsQnCkQBpfGsBvm3///rv/jEMDJCKm61oBTSpQP9/0G/+DG////xIC4AADDsfX+gEDky4BxeBI+mSAK0v///y7P8n7/4xDAzQjxutaAPAqUo7/4W3///+PAkAAANZP/BWOREBa0y2A1Y/rMCBA8Jaf///pj36/h/+MQwNAImbrWgDtKlHb/4h//iwCwAAAAmnf9QkuiSQDCioAbW8TcCZm3///rjf3/CL//K//jEMDUCPG60oBTTpT////UEKAAACKWr/qD45wX4gEyALt+mRQBpJ///+2Ift+w//4QH///4xDA1wjputKAPIqU8QjAAACi/+AWWWLSFyEjUCWN1DWBGhVf/7f827ff8Kf/4V////w0/+MQwNoIibrWgDtElMAAACr/9QBS6Q7AHCfcAQ36Axwb6X///riP5Pwr/8YO////qHCwAP/jEMDeCNG62og7SpQA0f+oMCRiKcHrrPgFjqTJwA/G//7f8mEf6/hhv/xv///8KJAAANf/4xDA4QkJSsqAVM6Q/sDsWnCbBajVQAz+ofQLwVX/+3/Nmb6fuN/+N////gTAAABq/9Qk/+MQwOMJMbrSkFNKlJOwqhUEDUAAAewm4AbzZH///rg/1/Bjf/Qb////ErAAAEnf/qCgSf/jEMDlCOlSzohsSpAioD5NoGJ9SY5gNmk////bZ/p+Nb/8d////hqwAABj1/7ArHDoiAj/4xDA6AkxusqAPIqUCpm4AhOtAhwVCVX///6Yb8v4P/9Rv///8QCgAABSS/+sHSbqGOBe/+MQwOoJMbrOiDtKlMul4A21dQkYNmy8j///1xP9/xo//4W7/8QgkAAACuv/qB4dASMCRP/jEMDsCSm6xoBsRJR4uggpegZjKAHcb///+2T9vyD//hb////0HqAAAC0f/mgNjVIS0Lf/4xDA7gj5usaAPISUhI0BJKHQFqBGAqv///3zfv+FP/9h////9RaXAAC6qv9QAo6xAAVk/+MQwPEJObrGgFNElNjMBOJ9ATeGdl5H///rg/0/BN/8E////9RA/+s4E44UwiADizMngP/jEMDzCPm6woBsipTFG0NAzGyANKJNv//+mEPy/mDP/hX///+g0KAAAEGV/0QVsgmBFgb/4xDA9glZusKAVMSUXKpsBpc/UKcArAkUv//++Zvm/Djf/BN////igP/qMwHKMuEIQbWL/+MQwPcJmUq+gGyKkISwHbLPdAOjAjEvI+///m4n/N/ELf/KN////i2QAABl/+cA+JHByf/jEMD3Cbm6vohsipQFQF4ugbUPqMyCADeN////TZ/v+Fv/9G////x48AAIpjv/mgExNL7/4xDA9wnBur6IVMqUGOAKJImXgOy6CajwpIFcDwnQW///+G/b8G//wQ3///+I1AAkt2wj/+MQwPcJqbq6gFSElAlD/CozEGAjav/7ioy6W5YCkmBJ5VYxH2hIKgICkhKRJMHgJDDwwv/jEMD3CaG6rACFCpS4xaWuHpAJHzJmrLLAYYMDCPDaVIhEMnCNBOCaSyakwiKigsaNCov/4xDA9woRurKAbMSUNULC/irP1iwAAAAAAAAAAAAAIAAgACAAIAAgACAAIAAgACAAIAAg/+MQwPUJwbqoAGzOlAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAP/jEMD1Cam6soBsypQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACD/4xDA9QsBuq3oVMSUACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAA/+MQwPAMoFrrnghGKiAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIP/jEMDkCjiiBAAI0kwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAD/4xDA4gAAAlgAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAA/wMDAAAAAQ==";
const _soundGoal3 = "" + __buildAssetsURL("sound3.5uI_3FNV.mp3");
const _sfc_main$9 = {
  __name: "SoundLiveScore",
  __ssrInlineRender: true,
  props: {
    "sound": {},
    "soundModifiers": {}
  },
  emits: ["update:sound"],
  setup(__props) {
    const playbackRate = ref(1);
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
    const sound = useModel(__props, "sound");
    watch(
      () => sound.value,
      () => {
        if (sound.value !== null) {
          if (sound.value === "soundGoal0") {
            soundGoal0.play();
          }
          if (sound.value === "soundGoal1") {
            soundGoal1.play();
          }
          if (sound.value === "soundGoal2") {
            soundGoal2.play();
          }
          if (sound.value === "soundGoal3") {
            soundGoal3.play();
          }
          setTimeout(() => {
            sound.value = null;
          }, 500);
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SoundLiveScore.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const useSchema = () => {
  const { $t } = useShareCommon();
  const SCHEMA_LIST = {
    LEAGUE: "league",
    MATCH: "match",
    PLAYER: "player",
    COACH: "coach",
    TEAM: "team",
    LIVESCORE: "livescore"
  };
  const schemaLeague = {
    [SCHEMA_LIST.LEAGUE]: {
      "@context": "https://schema.org",
      "@type": "SportsOrganization",
      "sport": "Soccer"
    },
    [SCHEMA_LIST.MATCH]: {
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      "sport": "Soccer",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
    },
    [SCHEMA_LIST.PLAYER]: {
      "@context": "https://schema.org",
      "@type": "Person"
    },
    [SCHEMA_LIST.COACH]: {
      "@context": "https://schema.org",
      "@type": "Person",
      "jobTitle": "Head Coach"
    },
    [SCHEMA_LIST.TEAM]: {
      "@context": "https://schema.org",
      "@type": "SportsTeam",
      "sport": "Soccer"
    }
  };
  const cleanObject = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value !== null && value !== void 0 && value !== 0 && value !== "")
    );
  };
  const initSchemaMatch = (item) => {
    try {
      if (!item) {
        return;
      }
      const { away_team, competition, home_team, match_time, venue_info, id } = item;
      const schema = schemaLeague[SCHEMA_LIST.MATCH];
      const updatedSchema = {
        ...(home_team == null ? void 0 : home_team.name) && (away_team == null ? void 0 : away_team.name) && {
          name: `${home_team == null ? void 0 : home_team.name} vs ${away_team == null ? void 0 : away_team.name}`
        },
        ...match_time && { startDate: match_time },
        ...(venue_info == null ? void 0 : venue_info.name) && {
          location: {
            "@type": "SportsActivityLocation",
            name: venue_info == null ? void 0 : venue_info.name,
            ...(venue_info == null ? void 0 : venue_info.city) && {
              location: {
                "@type": "PostalAddress",
                addressLocality: venue_info.city
              }
            }
          }
        },
        ...(home_team == null ? void 0 : home_team.name) && {
          homeTeam: {
            "@type": "SportsTeam",
            name: home_team == null ? void 0 : home_team.name,
            ...(home_team == null ? void 0 : home_team.id) && {
              url: `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${home_team == null ? void 0 : home_team.id}`
            }
          }
        },
        ...(away_team == null ? void 0 : away_team.name) && {
          awayTeam: {
            "@type": "SportsTeam",
            name: away_team == null ? void 0 : away_team.name,
            ...(away_team == null ? void 0 : away_team.id) && {
              url: `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${away_team == null ? void 0 : away_team.id}`
            }
          }
        },
        ...(home_team == null ? void 0 : home_team.name) && (away_team == null ? void 0 : away_team.name) && {
          "performer": [
            {
              "@type": "SportsTeam",
              "name": `${home_team == null ? void 0 : home_team.name}`
            },
            {
              "@type": "SportsTeam",
              "name": `${home_team == null ? void 0 : home_team.name}`
            }
          ]
        },
        ...(venue_info == null ? void 0 : venue_info.capacity) && {
          maximumAttendeeCapacity: venue_info == null ? void 0 : venue_info.capacity
        },
        ...(competition == null ? void 0 : competition.id) && (competition == null ? void 0 : competition.name) && {
          "organizer": {
            "@type": "Organization",
            "name": `${competition == null ? void 0 : competition.name}`,
            "url": `${useRequestURL().origin}${ROUTERS_OLD.LEAGUES}/${competition == null ? void 0 : competition.id}`
          }
        }
      };
      const initSchema = Object.assign(schema, updatedSchema);
      useHead({
        script: [
          {
            type: "application/ld+json",
            children: JSON.stringify(initSchema)
          }
        ]
      });
    } catch (e) {
      console.log(e);
    }
  };
  const initSchemaLeague = (item) => {
    try {
      if (!item) {
        return;
      }
      const { league, team } = item;
      const schema = schemaLeague[SCHEMA_LIST.LEAGUE];
      const { country_name, country_logo, id, name } = league;
      const menberType = [];
      if (team) {
        for (const value of team) {
          const type = {
            "@type": "SportsTeam",
            "name": value == null ? void 0 : value.team_name,
            "url": (value == null ? void 0 : value.team_id) ? `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${value.team_id}` : "",
            "sport": "Soccer"
          };
          const typeClean = cleanObject(type);
          menberType.push(typeClean);
        }
      }
      const updatedSchema = {
        ...name && { name },
        ...id && { url: `${useRequestURL().origin}${ROUTERS_OLD.LEAGUES}/${id}` },
        ...country_logo && { logo: getLiveScoreImage(country_logo, "competition") },
        ...country_name && { location: { "@type": "Place", name: country_name } },
        ...(menberType == null ? void 0 : menberType.length) && { member: menberType }
      };
      const initSchema = Object.assign(schema, updatedSchema);
      useHead({
        script: [
          {
            type: "application/ld+json",
            children: JSON.stringify(initSchema)
          }
        ]
      });
    } catch (e) {
      console.log(e);
    }
  };
  const initSchemaPlayer = (item) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    try {
      const { player, transfer, honor } = item;
      let initHonor = [];
      if (honor) {
        for (const value of Object.keys(honor)) {
          if ((_a = honor[value]) == null ? void 0 : _a[0]) {
            initHonor.push((_d = (_c = (_b = honor[value]) == null ? void 0 : _b[0]) == null ? void 0 : _c.honor) == null ? void 0 : _d.name);
          }
        }
      }
      let oldTeam = null;
      if (transfer && Array.isArray(transfer)) {
        const currentTeam = transfer[transfer.length - 1];
        if (currentTeam.from_team_id) {
          const nearTeam = transfer.find((item2) => item2.to_team_id === currentTeam.from_team_id);
          oldTeam = nearTeam;
        }
      }
      const schema = schemaLeague[SCHEMA_LIST.PLAYER];
      const updatedSchema = {
        ...(player == null ? void 0 : player.name) && { name: player == null ? void 0 : player.name },
        ...(player == null ? void 0 : player.id) && { url: `${useRequestURL().origin}${ROUTERS_OLD.PLAYER}${player == null ? void 0 : player.id}` },
        ...(player == null ? void 0 : player.logo_o) && { image: getLiveScoreImage(player == null ? void 0 : player.logo_o, "player") },
        ...(player == null ? void 0 : player.birthday) && { birthDate: player == null ? void 0 : player.birthday },
        ...((_e = player == null ? void 0 : player.country) == null ? void 0 : _e.name) && { nationality: (_f = player == null ? void 0 : player.country) == null ? void 0 : _f.name },
        ...(player == null ? void 0 : player.height) && { height: {
          "@type": "QuantitativeValue",
          "value": player == null ? void 0 : player.height,
          "unitText": "cm"
        } },
        ...(player == null ? void 0 : player.weight) && { weight: {
          "@type": "QuantitativeValue",
          "value": player == null ? void 0 : player.weight,
          "unitText": "kg"
        } },
        ...(player == null ? void 0 : player.position) && { jobTitle: $t(`${getPlayerPosition(player == null ? void 0 : player.position)} playertech`) },
        ...((_g = player == null ? void 0 : player.team) == null ? void 0 : _g.id) && ((_h = player == null ? void 0 : player.team) == null ? void 0 : _h.name) && { affiliation: {
          "@type": "SportsTeam",
          "name": (_i = player == null ? void 0 : player.team) == null ? void 0 : _i.name,
          "url": `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${(_j = player == null ? void 0 : player.team) == null ? void 0 : _j.id}`,
          "sport": "Soccer"
        } },
        ...initHonor.length && { awards: initHonor },
        ...(oldTeam == null ? void 0 : oldTeam.to_team_name) && (oldTeam == null ? void 0 : oldTeam.to_team_id) && { alumniOf: {
          "@type": "SportsTeam",
          "name": oldTeam == null ? void 0 : oldTeam.to_team_name,
          "url": `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${oldTeam == null ? void 0 : oldTeam.to_team_id}`,
          "sport": "Soccer"
        } },
        ...(player == null ? void 0 : player.market_value) && (player == null ? void 0 : player.market_value_currency) && { netWorth: {
          "@type": "MonetaryAmount",
          "currency": player == null ? void 0 : player.market_value_currency,
          "value": player == null ? void 0 : player.market_value
        } }
      };
      const initSchema = Object.assign(schema, updatedSchema);
      useHead({
        script: [
          {
            type: "application/ld+json",
            children: JSON.stringify(initSchema)
          }
        ]
      });
    } catch (e) {
      console.log(e);
    }
  };
  const initSchemaCoach = (item) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    try {
      const schema = schemaLeague[SCHEMA_LIST.COACH];
      const { personalInfo, honor } = item;
      const personal = personalInfo == null ? void 0 : personalInfo[0];
      let initHonor = [];
      if (honor) {
        for (const value of Object.keys(honor)) {
          if ((_a = honor[value]) == null ? void 0 : _a[0]) {
            initHonor.push((_d = (_c = (_b = honor[value]) == null ? void 0 : _b[0]) == null ? void 0 : _c.honor) == null ? void 0 : _d.name);
          }
        }
      }
      const updatedSchema = {
        ...(personal == null ? void 0 : personal.name) && { name: personal == null ? void 0 : personal.name },
        ...(personal == null ? void 0 : personal.id) && { url: `${useRequestURL().origin}${ROUTERS_OLD.COACH}/${personal == null ? void 0 : personal.id}` },
        ...(personal == null ? void 0 : personal.birthday) && { birthDate: personal == null ? void 0 : personal.birthday },
        ...((_e = personal == null ? void 0 : personal.country) == null ? void 0 : _e.name) && { nationality: (_f = personal == null ? void 0 : personal.country) == null ? void 0 : _f.name },
        ...((_g = personal == null ? void 0 : personal.team) == null ? void 0 : _g.id) && ((_h = personal == null ? void 0 : personal.team) == null ? void 0 : _h.name) && {
          "worksFor": {
            "@type": "SportsTeam",
            "name": (_i = personal == null ? void 0 : personal.team) == null ? void 0 : _i.name,
            "url": `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${(_j = personal == null ? void 0 : personal.team) == null ? void 0 : _j.id}`
          },
          ...initHonor.length && { awards: initHonor }
        }
      };
      const initSchema = Object.assign(schema, updatedSchema);
      useHead({
        script: [
          {
            type: "application/ld+json",
            children: JSON.stringify(initSchema)
          }
        ]
      });
    } catch (e) {
      console.log(e);
    }
  };
  const initSchemaTeam = (item) => {
    var _a, _b, _c, _d;
    try {
      const schema = schemaLeague[SCHEMA_LIST.TEAM];
      const { honorList, lineUpTeam } = item;
      const { players, team_info } = lineUpTeam;
      const { team_name, team_website, coach_id, coach_name, venue_location, team_id, country_name, team_logo_o, team_foundation_time, team_national, team_country_logo_o } = team_info;
      let initHonor = [];
      if (honorList) {
        for (const value of Object.keys(honorList)) {
          if ((_a = honorList[value]) == null ? void 0 : _a[0]) {
            initHonor.push((_d = (_c = (_b = honorList[value]) == null ? void 0 : _b[0]) == null ? void 0 : _c.honor) == null ? void 0 : _d.name);
          }
        }
      }
      let playerList = [];
      for (const value of players) {
        const data = {
          "@type": "Person",
          "name": value == null ? void 0 : value.name,
          "url": value.id ? `${useRequestURL().origin}${ROUTERS_OLD.PLAYER}${value.id}` : "",
          "birthDate": typeof (value == null ? void 0 : value.birthday) === "string" ? value == null ? void 0 : value.birthday.slice(0, 10) : "",
          "nationality": value == null ? void 0 : value.country_name
        };
        const cleanData = cleanObject(data);
        playerList.push(cleanData);
      }
      const updatedSchema = {
        ...team_name && { name: team_name },
        ...team_id && { url: `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${team_id}` },
        ...team_logo_o && { logo: getLiveScoreImage(team_national ? team_country_logo_o : team_logo_o, "team") },
        ...team_name && { name: team_name },
        ...team_foundation_time && { foundingDate: team_foundation_time },
        ...country_name && {
          "address": {
            "@type": "PostalAddress",
            "addressCountry": country_name,
            ...venue_location && { addressLocality: venue_location }
          }
        },
        ...(initHonor == null ? void 0 : initHonor.length) && { award: initHonor },
        ...team_website && { "sameAs": [team_website] },
        ...coach_id && coach_name && { "coach": {
          "@type": "Person",
          "name": coach_name,
          "url": `${useRequestURL().origin}${ROUTERS_OLD.COACH}/${team_id}`
        } },
        ...(playerList == null ? void 0 : playerList.length) && { athlete: playerList }
      };
      const initSchema = Object.assign(schema, updatedSchema);
      useHead({
        script: [
          {
            type: "application/ld+json",
            children: JSON.stringify(initSchema)
          }
        ]
      });
    } catch (e) {
      console.log(e);
    }
  };
  const initSchemaLivescore = (item) => {
    try {
      const graph = [];
      for (const value of item) {
        const data = {
          "@type": "SportsOrganization",
          ...(value == null ? void 0 : value.name) && { "name": value == null ? void 0 : value.name },
          ...(value == null ? void 0 : value.id) && { "url": `${useRequestURL().origin}${ROUTERS_OLD.LEAGUES}/${value.id}` },
          "sport": "Soccer",
          "event": []
        };
        for (const event of value.matchs) {
          const eventData = {
            "@type": "SportsEvent",
            "name": `${event.home_team.name} vs ${event.away_team.name}`,
            "startDate": event.match_time,
            "homeTeam": {
              "@type": "SportsTeam",
              "name": event.home_team.name,
              "url": `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${event.home_team.id}`
            },
            "awayTeam": {
              "@type": "SportsTeam",
              "name": event.away_team.name,
              "url": `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${event.away_team.id}`
            },
            "eventStatus": "https://schema.org/EventScheduled"
          };
          const cleanEventData = cleanObject(eventData);
          data["event"].push(cleanEventData);
        }
        graph.push(data);
      }
      const schema = {
        "@context": "https://schema.org",
        "@graph": graph
      };
      useHead({
        script: [
          {
            type: "application/ld+json",
            children: JSON.stringify(schema)
          }
        ]
      });
    } catch (e) {
      console.log(e);
    }
  };
  return {
    SCHEMA_LIST,
    // getSchema,
    initSchemaLeague,
    initSchemaMatch,
    initSchemaPlayer,
    initSchemaCoach,
    initSchemaTeam,
    initSchemaLivescore
  };
};
const locationHref = (href, external = false) => {
  if (!external)
    return navigateTo(href ? href : "/");
  else
    return navigateTo(href ? href : "/", { external: true, open: "_blank" });
};
const active_class = (router, menuCode, routerName = "") => {
  if (menuCode === ROUTERS.HOMEPAGE) {
    if (ROUTERS_GROUP.LIVESCORE.includes(router) || router.includes(ROUTERS_GROUP.MATCH) || router.includes(ROUTERS_GROUP.ODDS) || router.includes(ROUTERS_GROUP.ASIAN_HANDICAP_ODDS) || router.includes(ROUTERS_GROUP.ODDS_1X2) || router.includes(ROUTERS_GROUP.OVER_UNDER_ODDS) || router.includes(ROUTERS_GROUP.CORNER_OU_ODDS) || router.includes(ROUTERS_GROUP.CORRECT_SCORE_ODDS) || router.includes(ROUTERS_GROUP.EURO_HANDICAP_ODDS) || router.includes(ROUTERS_GROUP.DOUBLE_CHANCE_ODDS)) {
      return true;
    }
  } else if (router === menuCode) {
    return true;
  } else if (menuCode === "/tin-tuc" || menuCode === "/news") {
    if (routerName.includes("/news") || routerName.includes("/category") || routerName.includes("/tag") || routerName.includes("/detail-news")) {
      return true;
    }
  }
};
const _imports_0 = publicAssetsURL("/icon/in2.gif");
const socketStore = /* @__PURE__ */ defineStore("socket", {
  state: () => ({
    wssIntances: void 0,
    isLoadedWSS: false
  }),
  actions: {
    connect() {
      if (this.wssIntances) {
        this.wssIntances.close();
      }
      const config = /* @__PURE__ */ useRuntimeConfig();
      const wssUri = config.public.isEncodeChat == "true" ? config.public.wssEncodeUri : config.public.wssUri;
      try {
        this.wssIntances = new WebSocket(wssUri);
        this.isLoadedWSS = true;
      } catch (e) {
        this.isLoadedWSS = true;
        return false;
      }
    },
    close() {
      if (this.wssIntances) {
        this.wssIntances.close();
      }
    }
  }
});
const useMatchStore = /* @__PURE__ */ defineStore("match", {
  state: () => ({
    wssSocket: void 0,
    loadingMessages: false,
    loadingMember: false,
    socketData: []
  }),
  actions: {}
});
moment.locale("vi", {
  months: "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split(
    "_"
  ),
  monthsShort: "Thg 01_Thg 02_Thg 03_Thg 04_Thg 05_Thg 06_Thg 07_Thg 08_Thg 09_Thg 10_Thg 11_Thg 12".split(
    "_"
  ),
  monthsParseExact: true,
  weekdays: "Chủ nhật_Thứ hai_Thứ ba_Thứ tư_Thứ năm_Thứ sáu_Thứ bảy".split(
    "_"
  ),
  weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
  weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
  weekdaysParseExact: true,
  meridiemParse: /sa|ch/i,
  isPM: function(input) {
    return /^ch$/i.test(input);
  },
  meridiem: function(hours, minutes, isLower) {
    if (hours < 12) {
      return isLower ? "sa" : "SA";
    } else {
      return isLower ? "ch" : "CH";
    }
  },
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM [năm] YYYY",
    LLL: "D MMMM [năm] YYYY HH:mm",
    LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
    l: "DD/M/YYYY",
    ll: "D MMM YYYY",
    lll: "D MMM YYYY HH:mm",
    llll: "ddd, D MMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Hôm nay lúc] LT",
    nextDay: "[Ngày mai lúc] LT",
    nextWeek: "dddd [tuần tới lúc] LT",
    lastDay: "[Hôm qua lúc] LT",
    lastWeek: "dddd [tuần trước lúc] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "%s tới",
    past: "%s trước",
    s: "vài giây",
    ss: "%d giây",
    m: "1 phút",
    mm: "%d phút",
    h: "1 giờ",
    hh: "%d giờ",
    d: "1 ngày",
    dd: "%d ngày",
    w: "1 tuần",
    ww: "%d tuần",
    M: "1 tháng",
    MM: "%d tháng",
    y: "1 năm",
    yy: "%d năm"
  },
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: function(number) {
    return number;
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  }
});
moment.locale("vi");
const actionsStore = /* @__PURE__ */ defineStore("actions", {
  state: () => ({
    isOpenLoginForm: false,
    isOpenRegisterForm: false,
    isOpenFilterLeague: false,
    isOpenSearchForm: false
  }),
  actions: {
    // CHECK HAS PERMISSION WITH FEATURE & ROLE
    // hasPermisstion(feature: string, role: string) {
    //   return this.permissions?.some(permission => permission?.permission_code?.toUpperCase() === feature?.toUpperCase()
    //   && Array.from(permission?.permission_details_list)?.includes(role.toUpperCase()))
    // },
  }
});
const ITEM_PER_PAGE = 10;
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "LivescoreComponent",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    page: {},
    isLoading: { type: Boolean },
    content: {},
    favorites: {},
    h1: {}
  }, {
    "favoritesInit": {},
    "favoritesInitModifiers": {}
  }),
  emits: ["update:favoritesInit"],
  async setup(__props, { emit: __emit }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    let __temp, __restore;
    const { initSchemaLivescore } = useSchema();
    const { $isMobile } = /* @__PURE__ */ useNuxtApp();
    useWindowScroll();
    const keyEncode = ref("");
    const storeSystems = systemsStore();
    const useAction = actionsStore();
    const { useLocale, $t, $trouter, isNavVisible } = useShareCommon();
    isNavVisible.value = true;
    moment.locale((useLocale == null ? void 0 : useLocale.value.defaultLocale) ?? "en");
    const embedCode = ref("");
    const isIframeVisible = ref(false);
    const imageHeight = getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "LEAGUE_IMAGE_HEIGHT") ?? "!h50";
    const liveScoresImage = computed(() => {
      return (/* @__PURE__ */ useRuntimeConfig()).public.liveScoreImage + "/";
    });
    const searchMatch = ref("");
    const isTurnOnTimeZone = computed(() => {
      try {
        return String(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "OPTION_TIMEZONE")).toLowerCase() === "true";
      } catch {
        return false;
      }
    });
    const props = __props;
    const isRightClassAdded = ref();
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
    const oddCompanySelected = ref(ODD_COMPANY_DEFAULT_LIVESCORE);
    const oddCompanyIsport = computed(() => {
      const oddCompany = ODD_COMPANYS_LIVESCORE.find(({ id }) => id === oddCompanySelected.value);
      return oddCompany == null ? void 0 : oddCompany.isportsapi;
    });
    const formattedContentPage = computed(() => {
      return `<h1 class="page_title">${props.h1 ?? ""}</h1>${(props == null ? void 0 : props.content) ?? ""}`;
    });
    const winScorePositionCorner = ref({ top: "0px", left: "0px" });
    const showWinScoreCorner = ref(false);
    const orderByTime = ref(false);
    const winScorePositionOdds = ref({ top: "0px", left: "0px" });
    const showWinScoreOdds = ref(false);
    ref(false);
    const winScorePosition = ref({ top: 0, left: 0 });
    const showWinScore = ref(false);
    ref(false);
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
    const timeZone = ref(((_i = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _i.timeZone) ?? getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") ?? "");
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
    const detailTimeRefesh = ref(Date.now());
    const lastHoverMatchId = ref();
    useState("contriesState", () => null);
    useState("contriesState");
    ref([]);
    const favoritesInit = useModel(__props, "favoritesInit");
    const isShowSoundLiveScore = ref(false);
    for (let i = -7; i < 8; i++) {
      datesList.value.push({
        day: moment().add(i, "days").format("DD"),
        dayValue: moment().add(i, "days").format("yyyy-MM-DD"),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        label: moment().add(i, "days").format("ddd")
      });
    }
    const compsListSearch = ref(null);
    const renderTopListSearch = ref(null);
    useIntersectionObserver(
      loaderMatcher,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          limitData.value += ITEM_PER_PAGE;
        }
      },
      { matchesList }
    );
    const iCompanyName = (i_company_id) => {
      try {
        if (i_company_id) {
          const data = ODD_COMPANYS.find((item) => (item == null ? void 0 : item.isportsapi) === i_company_id);
          if (data) {
            return data.name ?? "";
          }
        }
      } catch {
        return "";
      }
    };
    function formatTimeWithGMT(gmtString) {
      var _a2, _b2, _c2, _d2;
      if (!gmtString)
        return "";
      const offset = parseInt((_b2 = (_a2 = gmtString == null ? void 0 : gmtString.split("GMT")) == null ? void 0 : _a2[1]) == null ? void 0 : _b2.split(":")[0], 10);
      const date = /* @__PURE__ */ new Date();
      const utcDate = new Date(date.getTime() + offset * 60 * 60 * 1e3);
      const formattedDate = (_d2 = (_c2 = utcDate.toISOString()) == null ? void 0 : _c2.split) == null ? void 0 : _d2.call(_c2, "T")[0];
      return formattedDate;
    }
    const activeFilterOdds = ref("oddsFilter1");
    const isFilterBoxLeague = ref(false);
    const isFilterBoxVisible = ref(false);
    const sound = ref(null);
    reactive({
      modal_search: null
    });
    const reduceMatch = (match) => {
      var _a2, _b2;
      match[(_a2 = match == null ? void 0 : match.home_team) == null ? void 0 : _a2.i_team] = match == null ? void 0 : match.home_team;
      match[(_b2 = match == null ? void 0 : match.away_team) == null ? void 0 : _b2.i_team] = match == null ? void 0 : match.away_team;
      return match;
    };
    useDebounceFn(() => {
      var _a2, _b2;
      if (((_b2 = (_a2 = quickSearch.value) == null ? void 0 : _a2.trim()) == null ? void 0 : _b2.length) >= 3) {
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
    const closeCorner = () => {
      showWinScoreCorner.value = false;
    };
    const closeOddsChange = () => {
      showWinScoreOdds.value = false;
    };
    const handleMouseOverOdds = async (event, match) => {
      var _a2, _b2;
      if ((props == null ? void 0 : props.page) === LIVESCORE_PAGE.RESULTS || (props == null ? void 0 : props.page) === LIVESCORE_PAGE.SCHEDULE) {
        return;
      }
      if (!(match == null ? void 0 : match.odds) || ((_a2 = match == null ? void 0 : match.odds) == null ? void 0 : _a2.length) === 0)
        return;
      matchHover.value = reduceMatch(match);
      ODD_COMPANYS_LIVESCORE.find(({ id }) => id === oddCompanySelected.value);
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
          var _a3, _b3, _c2;
          matchsList.value[index].odds_older = [];
          matchsList.value[index].odds = ((_c2 = oddsIMain.value) == null ? void 0 : _c2[(_b3 = (_a3 = matchsList.value) == null ? void 0 : _a3[index]) == null ? void 0 : _b3.i_match_id]) || [];
        });
      }
      oddsDetail.value = (_b2 = oddsIMainList.value) == null ? void 0 : _b2.filter((item) => (item == null ? void 0 : item.i_match_id) === (match == null ? void 0 : match.i_match_id));
    };
    const handleMouseLeaveOdds = () => {
      showWinScoreOdds.value = false;
    };
    const handleMouseOver = async (event, match) => {
      closeCorner();
      closeOddsChange();
      if ((props == null ? void 0 : props.page) === LIVESCORE_PAGE.RESULTS || (props == null ? void 0 : props.page) === LIVESCORE_PAGE.SCHEDULE || [...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match == null ? void 0 : match.status)) {
        return;
      }
      !LIVESCORE_STATUS.NOT_START.includes(match == null ? void 0 : match.status);
      const tipsTdRect = event.target.getBoundingClientRect();
      winScorePosition.value = {
        top: `${tipsTdRect.bottom + (void 0).scrollY}px`,
        left: `${tipsTdRect.left + (void 0).scrollX + tipsTdRect.width / 2 - 230}px`
      };
      showWinScore.value = true;
      const currentTime = Date.now();
      if (!lastHoverMatchId.value || lastHoverMatchId.value !== (match == null ? void 0 : match.id) || (lastHoverMatchId.value === (match == null ? void 0 : match.id) && currentTime - detailTimeRefesh.value) / 1e3 > 5) {
        detailTimeRefesh.value = Date.now();
        await fetchMatchsLiveDetail(match == null ? void 0 : match.id);
        lastHoverMatchId.value = match == null ? void 0 : match.id;
      }
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
      var _a2;
      if (!((_a2 = favouritesList.value) == null ? void 0 : _a2.includes(matchId))) {
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
        var _a2, _b2, _c2, _d2, _e2;
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
          compChooseLeagueList.value = (_a2 = compOriginsList.value) == null ? void 0 : _a2.filter((item) => {
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
          compChooseLeagueList.value = (_b2 = compOriginsList.value) == null ? void 0 : _b2.map((item) => {
            item.matchs = matchsGroup == null ? void 0 : matchsGroup.get(item == null ? void 0 : item.id);
            return item;
          });
        }
        const countriesHasKey = (_c2 = compChooseLeagueList.value) == null ? void 0 : _c2.map((item) => item == null ? void 0 : item.country);
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
          tz: String(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") ?? "GMT+07:00").slice(3),
          lang: useLocale == null ? void 0 : useLocale.value.defaultLocale
        }).then((resData) => {
          matchLivesList.value = resData;
        });
      } else {
        matchLivesList.value = [];
      }
    };
    const fetchMatchAnalysis = async (match) => {
      useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_ANALYSIS + "/" + (match == null ? void 0 : match.id)).then((resData) => {
        var _a2, _b2, _c2, _d2, _e2, _f2;
        if (resData) {
          matchRecentResult.value[(_a2 = match == null ? void 0 : match.home_team) == null ? void 0 : _a2.id] = getRecentResultTheSport((_b2 = resData == null ? void 0 : resData.history) == null ? void 0 : _b2.home, (_c2 = match == null ? void 0 : match.home_team) == null ? void 0 : _c2.id, true, $t);
          matchRecentResult.value[(_d2 = match == null ? void 0 : match.away_team) == null ? void 0 : _d2.id] = getRecentResultTheSport((_e2 = resData == null ? void 0 : resData.history) == null ? void 0 : _e2.away, (_f2 = match == null ? void 0 : match.away_team) == null ? void 0 : _f2.id, false, $t);
        }
      });
    };
    const fetchMatch = async (date = null) => {
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
      const timeZone2 = String(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") ?? "GMT+07:00").slice(3);
      const query = {
        date: date ? date : formatTimeWithGMT(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") ?? "+07:00"),
        tz: timeZone2,
        // limit: 20,
        // page: 1,
        // decode: 1,
        lang: useLocale == null ? void 0 : useLocale.value.defaultLocale
      };
      if (status !== null) {
        query.status = status;
      }
      const resData = await useApiLiveScore((props == null ? void 0 : props.page) === LIVESCORE_PAGE.LIVESCORE || (props == null ? void 0 : props.page) === LIVESCORE_PAGE.FAVORITES ? API_ROUTERS.LIVESCORE.MATCHS_RECENT_SCHEDULE : (props == null ? void 0 : props.page) === LIVESCORE_PAGE.RESULTS ? API_ROUTERS.LIVESCORE.MATCHS_RECENT_RESULT : API_ROUTERS.LIVESCORE.MATCHS_RECENT, query);
      return resData || [];
    };
    const handleInitschema = () => {
      try {
        if ((props == null ? void 0 : props.page) === LIVESCORE_PAGE.LIVESCORE && Array.isArray(compOriginsList.value)) {
          const compHot = compOriginsList.value.filter((item) => (item == null ? void 0 : item.number_hot) === 5 || (item == null ? void 0 : item.number_hot) === 4);
          if (compHot == null ? void 0 : compHot.length) {
            initSchemaLivescore(compHot);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    const fetchMatchsRecent = async (date, result = null) => {
      var _a2;
      let resData;
      if (result) {
        resData = result;
      } else {
        resData = await fetchMatch(date);
      }
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
      compOriginsList.value = (_a2 = compsDataList.value) == null ? void 0 : _a2.filter((item) => {
        return matchsGroupKey == null ? void 0 : matchsGroupKey.includes(item == null ? void 0 : item.id);
      }).map((item) => {
        item.matchs = matchsGroup == null ? void 0 : matchsGroup.get(item == null ? void 0 : item.id);
        return item;
      });
      handleInitschema();
      renderDataList();
    };
    const fetchMatchsLiveDetail = async (match_id) => {
      useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_LIVE_DETAIL + "/" + match_id, { lang: useLocale == null ? void 0 : useLocale.value.defaultLocale }).then((resData) => {
        matchSummary.value = resData;
      });
    };
    const fetchMatchesAnalysis = async (match_id) => {
      useApiLiveScore(
        API_ROUTERS.LIVESCORE.MATCHES_ANALYSIS + "?match_id=" + match_id
      ).then((resData) => {
        var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
        matchesAnalysis.value = getDataObject((_a2 = resData == null ? void 0 : resData.results) == null ? void 0 : _a2[0]);
        shootTime.value["sumHome"] = (_d2 = (_c2 = (_b2 = matchesAnalysis.value) == null ? void 0 : _b2.home_shoot_time) == null ? void 0 : _c2[0]) == null ? void 0 : _d2.reduce(
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
        var _a2, _b2;
        if ((resData == null ? void 0 : resData.length) > 0) {
          matchCorner.value = resData == null ? void 0 : resData[0];
          const eventList = JSON.parse((_b2 = (_a2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a2.event_list) == null ? void 0 : _b2.replace(new RegExp(escapeRegExp("'"), "g"), '"'));
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
      const oddCompany = ODD_COMPANYS_LIVESCORE.find(({ id }) => id === oddCompanySelected.value);
      const query = {
        date: date ? date : moment().format("yyyy-MM-DD"),
        tz: String(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") ?? "GMT+07:00").slice(3)
      };
      if ((oddCompany == null ? void 0 : oddCompany.id) !== 21) {
        query.i_company_id = oddCompany == null ? void 0 : oddCompany.isportsapi;
      }
      const apiLink = (oddCompany == null ? void 0 : oddCompany.id) !== 21 ? API_ROUTERS.LIVESCORE.ODDS_IMAIN : API_ROUTERS.LIVESCORE.ODDS_ALL_IMAIN;
      useApiLiveScore(apiLink, query).then((resData) => {
        var _a2;
        if (resData) {
          try {
            oddsIMainList.value = JSON.parse(JSON.stringify(resData));
            const oddsList2 = [];
            const iSport = [];
            resData == null ? void 0 : resData.forEach((item) => {
              var _a3, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2;
              if (!oddsList2[item.i_match_id]) {
                oddsList2[item.i_match_id] = [];
              }
              if (!iSport[item.i_match_id]) {
                iSport[item.i_match_id] = [];
              }
              iSport[item.i_match_id] = item.i_company_id;
              const handicap = resData == null ? void 0 : resData.find((odd) => odd.i_match_id === item.i_match_id && odd.type === "handicap");
              if (handicap) {
                handicap.initial = (_a3 = handicap == null ? void 0 : handicap.initial) == null ? void 0 : _a3.replace(/[^0-9.,]/g, "");
                handicap.inplay = (_b2 = handicap == null ? void 0 : handicap.inplay) == null ? void 0 : _b2.replace(/[^0-9.,]/g, "");
                handicap.instant = (_c2 = handicap == null ? void 0 : handicap.instant) == null ? void 0 : _c2.replace(/[^0-9.,]/g, "");
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
            (_a2 = Object.keys(matchsList.value)) == null ? void 0 : _a2.map((index) => {
              var _a3, _b2, _c2, _d2, _e2;
              matchsList.value[index].odds_older = [];
              matchsList.value[index].odds = ((_c2 = oddsIMain.value) == null ? void 0 : _c2[(_b2 = (_a3 = matchsList.value) == null ? void 0 : _a3[index]) == null ? void 0 : _b2.i_match_id]) || [];
              if (Object.keys(iSport).includes(String((_e2 = (_d2 = matchsList.value) == null ? void 0 : _d2[index]) == null ? void 0 : _e2.i_match_id))) {
                matchsList.value[index].i_company_id = iSport[matchsList.value[index].i_match_id];
              }
            });
          } catch (e) {
            oddsIMain.value = oddsList;
          }
        }
      });
    };
    ref(1);
    const timeCountDown = () => {
      try {
        if (false) ;
      } catch {
      }
    };
    const wssMatch = (socketData) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
      try {
        if (socketData) {
          timeCountDown();
          try {
            const company = ODD_COMPANYS_LIVESCORE.find(({ id }) => id === oddCompanySelected.value);
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
                    if (((_a2 = matchOriginsList.value[matchId].status) == null ? void 0 : _a2.toString()) != status.toString()) {
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
                  let isSelectISportGeneral = false;
                  if (company.id === 21) {
                    (_b2 = Object.keys(matchsList.value)) == null ? void 0 : _b2.map((index) => {
                      if (String(matchsList.value[index].i_match_id) === String(matchId) && String(matchsList.value[index].i_company_id) === String(companyId)) {
                        isSelectISportGeneral = true;
                      }
                    });
                  }
                  if (companyId == (company == null ? void 0 : company.isportsapi) || isSelectISportGeneral) {
                    if (!oddsList2[matchId]) {
                      oddsList2[matchId] = [];
                    }
                    oddsList2[matchId][0] = getValueByPosition(matchOdd, 2) + "," + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4);
                    if (showWinScoreOdds.value && ((_c2 = matchHover.value) == null ? void 0 : _c2.i_match_id) == matchId) {
                      let odddetail = (_d2 = oddsDetail.value) == null ? void 0 : _d2.find((item) => item.i_company_id == companyId && item.i_match_id == matchId && item.type == "handicap");
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
                  let isSelectISportGeneral = false;
                  if (company.id === 21) {
                    (_e2 = Object.keys(matchsList.value)) == null ? void 0 : _e2.map((index) => {
                      if (String(matchsList.value[index].i_match_id) === String(matchId) && String(matchsList.value[index].i_company_id) === String(companyId)) {
                        isSelectISportGeneral = true;
                      }
                    });
                  }
                  if (companyId == (company == null ? void 0 : company.isportsapi) || isSelectISportGeneral) {
                    if (!oddsList2[matchId]) {
                      oddsList2[matchId] = [];
                    }
                    oddsList2[matchId][1] = getValueByPosition(matchOdd, 2) + "," + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4);
                    let odddetail = (_f2 = oddsDetail.value) == null ? void 0 : _f2.find((item) => item.i_company_id == companyId && item.i_match_id == matchId && item.type == "overUnder");
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
                  let isSelectISportGeneral = false;
                  if (company.id === 21) {
                    (_g2 = Object.keys(matchsList.value)) == null ? void 0 : _g2.map((index) => {
                      if (String(matchsList.value[index].i_match_id) === String(matchId) && String(matchsList.value[index].i_company_id) === String(companyId)) {
                        isSelectISportGeneral = true;
                      }
                    });
                  }
                  if (companyId == (company == null ? void 0 : company.isportsapi) || isSelectISportGeneral) {
                    if (!oddsList2[matchId]) {
                      oddsList2[matchId] = [];
                    }
                    oddsList2[matchId][2] = getValueByPosition(matchOdd, 2) + "," + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4);
                    let odddetail = (_h2 = oddsDetail.value) == null ? void 0 : _h2.find((item) => item.i_company_id == companyId && item.i_match_id == matchId && item.type == "europeOdds");
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
                    if (((_i2 = matchOriginsList.value[matchId].status) == null ? void 0 : _i2.toString()) != ((_k2 = (_j2 = payload == null ? void 0 : payload.score) == null ? void 0 : _j2[1]) == null ? void 0 : _k2.toString())) {
                      matchOriginsList.value[matchId].status = (_m = (_l2 = payload == null ? void 0 : payload.score) == null ? void 0 : _l2[1]) == null ? void 0 : _m.toString();
                      matchsList.value[matchId].status = (_o = (_n = payload == null ? void 0 : payload.score) == null ? void 0 : _n[1]) == null ? void 0 : _o.toString();
                      reduceMatchList = true;
                    }
                    matchsList.value[matchId].home_scores = (_p = payload == null ? void 0 : payload.score) == null ? void 0 : _p[2];
                    matchsList.value[matchId].away_scores = (_q = payload == null ? void 0 : payload.score) == null ? void 0 : _q[3];
                  }
                } else if (payload == null ? void 0 : payload.incidents) {
                  if (matchsList.value[matchId]) {
                    for (const incident of payload == null ? void 0 : payload.incidents) {
                      let matchMinutes = 0;
                      const status = (_s = (_r = matchsList.value[matchId]) == null ? void 0 : _r.status) == null ? void 0 : _s.toString();
                      if ((_t = matchsList.value[matchId]) == null ? void 0 : _t.since_timestamp_kick_off) {
                        matchMinutes = matchsList.value[matchId].since_timestamp_kick_off;
                      } else {
                        const timestampKickOff = moment((_u = matchsList.value[matchId]) == null ? void 0 : _u.match_time).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).unix();
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
                              if ((_v = favouritesData == null ? void 0 : favouritesData.value) == null ? void 0 : _v.includes(matchId)) {
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
                                  matchsList.value[matchId].home_scores[0] = (incident == null ? void 0 : incident.home_score) ?? matchsList.value[matchId].home_scores[0];
                                  matchOriginsList.value[matchId].home_scores[0] = (incident == null ? void 0 : incident.home_score) ?? matchsList.value[matchId].home_scores[0];
                                  matchOriginsList.value[matchId].home_team.playerName = incident == null ? void 0 : incident.player_name;
                                } else if ((incident == null ? void 0 : incident.position) == 2) {
                                  matchsList.value[matchId].away_scores[0] = (incident == null ? void 0 : incident.away_score) ?? matchsList.value[matchId].away_scores[0];
                                  matchOriginsList.value[matchId].away_scores[0] = (incident == null ? void 0 : incident.away_score) ?? matchsList.value[matchId].away_scores[0];
                                  matchOriginsList.value[matchId].away_team.playerName = incident == null ? void 0 : incident.player_name;
                                }
                              }
                              if ((incident == null ? void 0 : incident.position) == 1) {
                                if (soundHome.value === 0) {
                                  sound.value = "soundGoal0";
                                } else if (soundHome.value === 1) {
                                  sound.value = "soundGoal1";
                                } else if (soundHome.value === 2) {
                                  sound.value = "soundGoal2";
                                } else if (soundHome.value === 3) {
                                  sound.value = "soundGoal3";
                                }
                              } else if ((incident == null ? void 0 : incident.position) == 2) {
                                if (soundAway.value === 0) {
                                  sound.value = "soundGoal0";
                                } else if (soundAway.value === 1) {
                                  sound.value = "soundGoal1";
                                } else if (soundAway.value === 2) {
                                  sound.value = "soundGoal2";
                                } else if (soundAway.value === 3) {
                                  sound.value = "soundGoal3";
                                }
                              }
                            }
                            break;
                          }
                          case 4: {
                            if (isShowRedWindow.value) {
                              let isMatchShowRedWindow = false;
                              if (settingType.value === 1) {
                                if ((_w = favouritesData == null ? void 0 : favouritesData.value) == null ? void 0 : _w.includes(matchId)) {
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
      activeTab,
      (activeTab2) => {
        var _a2;
        matchActiveLiveFlash.value = null;
        toggleCompetition.value = [];
        if (activeTab2 === LIVESCORE_ACTIVE_TAB.HOT) {
          compsList.value = (_a2 = compOriginsList.value) == null ? void 0 : _a2.filter((item) => (item == null ? void 0 : item.number_hot) === 5 || (item == null ? void 0 : item.number_hot) === 4 || (item == null ? void 0 : item.number_hot) === 3);
          const matchsGroup = groupBy(compsList.value, (x) => x.id);
          const compKeysList2 = [...matchsGroup.keys()];
          matchsList.value = Object.values(matchOriginsList.value).filter((item) => compKeysList2.includes(item == null ? void 0 : item.competition));
        } else if (activeTab2 === LIVESCORE_ACTIVE_TAB.ALL) {
          compsList.value = compOriginsList.value;
          matchsList.value = matchOriginsList.value;
        } else if (activeTab2 === LIVESCORE_ACTIVE_TAB.LEAGUE) ;
      }
    );
    watch(
      oddCompanySelected,
      async (oddCompany) => {
        const company = ODD_COMPANYS_LIVESCORE.find(({ id }) => id === oddCompanySelected.value);
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
        var _a2, _b2, _c2;
        let matchsListArray = [];
        if (qSearch.value !== "") {
          let compsKeyDataList = [];
          const search = nSearch.toUpperCase();
          if (typeof nSearch !== "undefined") {
            compsDataListSearch.value = (_a2 = compsDataList.value) == null ? void 0 : _a2.filter((item) => {
              var _a3, _b3;
              return (_b3 = (_a3 = item == null ? void 0 : item.name) == null ? void 0 : _a3.toUpperCase()) == null ? void 0 : _b3.includes(search);
            });
            compsKeyDataList = (_b2 = compsDataListSearch.value) == null ? void 0 : _b2.map((item) => item.id);
            compSearchLength.value = (_c2 = compsDataListSearch.value) == null ? void 0 : _c2.length;
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
        searchMatch.value = "";
      }
    );
    watch(
      oddsIMainWS,
      () => {
        Object.keys(matchsList.value).map((index) => {
          var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
          matchsList.value[index].odds_older = JSON.parse(JSON.stringify(matchsList.value[index].odds));
          if ((_d2 = (_c2 = oddsIMainWS.value) == null ? void 0 : _c2[(_b2 = (_a2 = matchsList.value) == null ? void 0 : _a2[index]) == null ? void 0 : _b2.i_match_id]) == null ? void 0 : _d2[0]) {
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
        var _a2;
        return (_a2 = router == null ? void 0 : router.currentRoute.value) == null ? void 0 : _a2.query;
      },
      () => {
        var _a2, _b2;
        const tabName = (_b2 = (_a2 = router == null ? void 0 : router.currentRoute.value) == null ? void 0 : _a2.query) == null ? void 0 : _b2.livescore_tab;
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
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
      try {
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
            compsList.value = (_a2 = compOriginsList.value) == null ? void 0 : _a2.filter((item) => {
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
            compsList.value = (_b2 = compOriginsList.value) == null ? void 0 : _b2.filter((item) => {
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
            compsList.value = (_c2 = compOriginsList.value) == null ? void 0 : _c2.filter((item) => {
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
              if (router.currentRoute._value.path !== $trouter(ROUTERS.FOOTBALL_SCHEDULE)) {
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
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
      const settingsData2 = useCookie("settingsData");
      if (settingsData2 == null ? void 0 : settingsData2.value) {
        if (typeof ((_a2 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _a2.isShowCardYellow) !== "undefined") {
          isShowCardYellow.value = (_b2 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _b2.isShowCardYellow;
        }
        if (typeof ((_c2 = settingsData2 == null ? void 0 : settingsData2.value) == null ? void 0 : _c2.isShowCardRed) !== "undefined") {
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
    const listMatchLazy = ref([]);
    if (props.page === LIVESCORE_PAGE.LIVESCORE) {
      const query = reactive({
        date: formatTimeWithGMT(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") ?? "+07:00"),
        tz: String(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") ?? "GMT+07:00").slice(3),
        status: [...LIVESCORE_STATUS.IS_LIVE].toString(),
        lang: useLocale == null ? void 0 : useLocale.value.defaultLocale
      });
      const [matchLive, matchNotLive] = ([__temp, __restore] = withAsyncContext(async () => Promise.all([
        ([__temp, __restore] = withAsyncContext(() => useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_RECENT_SCHEDULE, query)), __temp = await __temp, __restore(), __temp),
        ([__temp, __restore] = withAsyncContext(() => useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_RECENT_SCHEDULE, {
          date: formatTimeWithGMT(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") ?? "+07:00"),
          tz: String(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") ?? "GMT+07:00").slice(3),
          status: [...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].toString(),
          hot: ["5", "4"].toString(),
          limit: 50,
          page: 1,
          lang: useLocale == null ? void 0 : useLocale.value.defaultLocale
        })), __temp = await __temp, __restore(), __temp)
      ])), __temp = await __temp, __restore(), __temp);
      if (matchLive && matchNotLive) {
        listMatchLazy.value = [...matchLive, ...matchNotLive];
        listMatchLazy.value = [...new Map(listMatchLazy.value.map((item) => [item.id, item])).values()];
      }
      if (listMatchLazy.value.length > 15) {
        [__temp, __restore] = withAsyncContext(() => fetchMatchsRecent(datePara ? datePara : formatTimeWithGMT(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") ?? "+07:00"), listMatchLazy.value)), await __temp, __restore();
      } else {
        [__temp, __restore] = withAsyncContext(() => fetchMatchsRecent(datePara ? datePara : formatTimeWithGMT(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") ?? "+07:00"))), await __temp, __restore();
      }
    } else {
      [__temp, __restore] = withAsyncContext(() => fetchMatchsRecent(datePara ? datePara : formatTimeWithGMT(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") ?? "+07:00"))), await __temp, __restore();
    }
    ref(null);
    watch(
      () => favoritesInit.value,
      async () => {
        if (favoritesInit.value) {
          await fetchMatchsRecent(dateChoose.value);
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab;
      const _component_FastSearchLivescore = __nuxt_component_0$2;
      const _component_nuxt_img = _sfc_main$e;
      const _component_nuxt_link = __nuxt_component_0$3;
      const _component_ClientOnly = __nuxt_component_1$1;
      const _component_Loading = __nuxt_component_4;
      const _component_SoundLiveScore = _sfc_main$9;
      _push(`<!--[--><div id="table_live_score" class="${ssrRenderClass([[{ "col-md-8": !unref(isHidden), "col-lg-8": !unref(isHidden) }, _ctx.page], "table_livescore"])}" data-v-ca01b51a><div class="d-flex d-md-none fast-search" data-v-ca01b51a>`);
      _push(ssrRenderComponent(_component_FastSearchLivescore, {
        searchMatch: searchMatch.value,
        "onUpdate:searchMatch": ($event) => searchMatch.value = $event,
        activeTab: activeTab.value,
        "onUpdate:activeTab": ($event) => activeTab.value = $event,
        orderByTime: orderByTime.value,
        "onUpdate:orderByTime": ($event) => orderByTime.value = $event,
        renderTopListSearch: renderTopListSearch.value,
        "onUpdate:renderTopListSearch": ($event) => renderTopListSearch.value = $event,
        compsList: compsList.value,
        "onUpdate:compsList": ($event) => compsList.value = $event,
        renderTopList: renderTopList.value,
        "onUpdate:renderTopList": ($event) => renderTopList.value = $event,
        compsListSearch: compsListSearch.value,
        "onUpdate:compsListSearch": ($event) => compsListSearch.value = $event
      }, null, _parent));
      _push(`</div><div id="Layer1" data-v-ca01b51a>`);
      if (isFilterBoxLeague.value) {
        _push(`<div id="showoptional2" data-v-ca01b51a><div class="box_showoptional2" data-v-ca01b51a><div class="sotit" data-v-ca01b51a>${ssrInterpolate(unref($t)("Choose league"))} <span class="cc" data-v-ca01b51a><span style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-ca01b51a></span></span></div>`);
        if ((props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE) {
          _push(`<div class="rbl" data-v-ca01b51a><label for="rb0" class="el-radio" data-v-ca01b51a><input type="radio" name="selectType" id="rb0" value="0" checked data-v-ca01b51a><span class="el-radio-style" data-v-ca01b51a>${ssrInterpolate(unref($t)("All matches"))}</span></label><label for="rb3" class="el-radio" data-v-ca01b51a><input type="radio" name="selectType" id="rb3" value="3" data-v-ca01b51a><span class="el-radio-style" data-v-ca01b51a>${ssrInterpolate(unref($t)("Not started yet"))}</span></label><label for="rb2" class="el-radio" data-v-ca01b51a><input type="radio" name="selectType" id="rb2" value="2" data-v-ca01b51a><span class="el-radio-style" data-v-ca01b51a>${ssrInterpolate(unref($t)("Ended"))}</span></label><label for="rb1" class="el-radio" data-v-ca01b51a><input type="radio" name="selectType" id="rb1" value="1" data-v-ca01b51a><span class="el-radio-style" data-v-ca01b51a>${ssrInterpolate(unref($t)("In progress"))}</span></label></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div id="myleague2" class="myleague2" data-v-ca01b51a>`);
        if (isGroupByCountry.value) {
          _push(`<!--[-->`);
          ssrRenderList(contriesList.value, (country) => {
            _push(`<!--[--><div${ssrRenderAttr("cid", country == null ? void 0 : country.id)} class="fg_Title"${ssrRenderAttr("id", "country_" + (country == null ? void 0 : country.id))} data-v-ca01b51a><b data-v-ca01b51a>${ssrInterpolate(country == null ? void 0 : country.name)}</b></div><ul data-v-ca01b51a><!--[-->`);
            ssrRenderList(country == null ? void 0 : country.league, (comp) => {
              var _a3;
              _push(`<li id="leaguesContent_36" style="${ssrRenderStyle({ "display": "block" })}" data-v-ca01b51a><input type="checkbox"${ssrRenderAttr("id", "myleague_" + (comp == null ? void 0 : comp.id))}${ssrIncludeBooleanAttr(Array.isArray(compsDataFilterList.value[comp == null ? void 0 : comp.id]) ? ssrLooseContain(compsDataFilterList.value[comp == null ? void 0 : comp.id], null) : compsDataFilterList.value[comp == null ? void 0 : comp.id]) ? " checked" : ""} data-v-ca01b51a><label class="" style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("for", "myleague_" + (comp == null ? void 0 : comp.id))} data-v-ca01b51a>${ssrInterpolate(comp == null ? void 0 : comp.name)} [${ssrInterpolate((_a3 = comp == null ? void 0 : comp.matchs) == null ? void 0 : _a3.length)}] <span class="smallf" id="numtip_36" num="3" data-v-ca01b51a></span><span class="smallf" id="numtip2_36" num="3" style="${ssrRenderStyle({ "display": "none" })}" data-v-ca01b51a></span></label></li>`);
            });
            _push(`<!--]--></ul><!--]-->`);
          });
          _push(`<!--]-->`);
        } else if (isGroupByAlphabet.value) {
          _push(`<!--[-->`);
          ssrRenderList(contriesList.value, (country) => {
            _push(`<div class="fg_Title"${ssrRenderAttr("id", "country_" + (country == null ? void 0 : country.id))}${ssrRenderAttr("cid", country == null ? void 0 : country.id)} data-v-ca01b51a><b data-v-ca01b51a>${ssrInterpolate(country == null ? void 0 : country.name)}</b><ul data-v-ca01b51a><!--[-->`);
            ssrRenderList(country == null ? void 0 : country.league, (comp) => {
              var _a3;
              _push(`<li id="leaguesContent_36" style="${ssrRenderStyle({ "display": "block" })}" data-v-ca01b51a><input type="checkbox"${ssrRenderAttr("id", "myleague_" + (comp == null ? void 0 : comp.id))}${ssrIncludeBooleanAttr(Array.isArray(compsDataFilterList.value[comp == null ? void 0 : comp.id]) ? ssrLooseContain(compsDataFilterList.value[comp == null ? void 0 : comp.id], null) : compsDataFilterList.value[comp == null ? void 0 : comp.id]) ? " checked" : ""} data-v-ca01b51a><label class="" style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("for", "myleague_" + (comp == null ? void 0 : comp.id))} data-v-ca01b51a>${ssrInterpolate(comp == null ? void 0 : comp.name)} [${ssrInterpolate((_a3 = comp == null ? void 0 : comp.matchs) == null ? void 0 : _a3.length)}] <span class="smallf" id="numtip_36" num="3" data-v-ca01b51a></span><span class="smallf" id="numtip2_36" num="3" style="${ssrRenderStyle({ "display": "none" })}" data-v-ca01b51a></span></label></li>`);
            });
            _push(`<!--]--></ul></div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<ul data-v-ca01b51a><!--[-->`);
          ssrRenderList(compChooseLeagueList.value, (comp, index) => {
            var _a3;
            _push(`<li id="leaguesContent_36" style="${ssrRenderStyle({ "display": "block" })}" data-v-ca01b51a><input type="checkbox"${ssrRenderAttr("id", "myleague_" + (comp == null ? void 0 : comp.id))}${ssrIncludeBooleanAttr(Array.isArray(compsDataFilterList.value[comp == null ? void 0 : comp.id]) ? ssrLooseContain(compsDataFilterList.value[comp == null ? void 0 : comp.id], null) : compsDataFilterList.value[comp == null ? void 0 : comp.id]) ? " checked" : ""} data-v-ca01b51a><label class="" style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("for", "myleague_" + (comp == null ? void 0 : comp.id))} data-v-ca01b51a>${ssrInterpolate(comp == null ? void 0 : comp.name)} [${ssrInterpolate((_a3 = comp == null ? void 0 : comp.matchs) == null ? void 0 : _a3.length)}] <span class="smallf" id="numtip_36" num="3" data-v-ca01b51a></span><span class="smallf" id="numtip2_36" num="3" style="${ssrRenderStyle({ "display": "none" })}" data-v-ca01b51a></span></label></li>`);
          });
          _push(`<!--]--></ul>`);
        }
        _push(`</div><p class="bts" data-v-ca01b51a><span class="fgSpan" title="Sort leagues by Countries." data-v-ca01b51a><input type="checkbox" id="cbbSortLeaByCountry"${ssrIncludeBooleanAttr(Array.isArray(isGroupByCountry.value) ? ssrLooseContain(isGroupByCountry.value, null) : isGroupByCountry.value) ? " checked" : ""} data-v-ca01b51a><label for="cbbSortLeaByCountry" style="${ssrRenderStyle({ "font-weight": "bold" })}" data-v-ca01b51a>${ssrInterpolate(unref($t)("Select country"))}</label></span><span id="button2" data-v-ca01b51a>${ssrInterpolate(unref($t)("All"))}</span><span id="button3" data-v-ca01b51a>${ssrInterpolate(unref($t)("Deselect all"))}</span><span id="button" class="ent" data-v-ca01b51a>${ssrInterpolate(unref($t)("Confirm"))}</span></p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (isFilterBoxVisible.value) {
        _push(`<div id="showFilterBox" style="${ssrRenderStyle({ "width": "430px" })}" data-v-ca01b51a><div class="box_showFilterBox" data-v-ca01b51a><div class="sotit" data-v-ca01b51a>Odds Filter <span class="cc" data-v-ca01b51a><span style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-ca01b51a></span></span></div><div class="rbl" data-v-ca01b51a><label for="oddsFilter1" class="el-radio" data-v-ca01b51a><input type="radio" name="oddsFilterType" id="oddsFilter1" class="${ssrRenderClass({ "checked": activeFilterOdds.value === "oddsFilter1" })}" data-v-ca01b51a><span class="el-radio-style" data-v-ca01b51a>Odds Filter</span></label><label for="oddsFilter2" class="el-radio" data-v-ca01b51a><input type="radio" name="oddsFilterType" id="oddsFilter2" class="${ssrRenderClass({ "checked": activeFilterOdds.value === "oddsFilter2" })}" data-v-ca01b51a><span class="el-radio-style" data-v-ca01b51a>Filter(Crown Odds)</span></label></div>`);
        if (activeFilterOdds.value === "oddsFilter1") {
          _push(`<div id="OddsFilter" class="oddsFilter1" data-v-ca01b51a><div id="goalTable" data-v-ca01b51a><div class="goalTitle" data-v-ca01b51a>Asian Handicap</div><table width="95%" cellpadding="0" cellspacing="0" data-v-ca01b51a><tbody data-v-ca01b51a><tr style="${ssrRenderStyle({ "height": "24px" })}" data-v-ca01b51a><td width="4%" data-v-ca01b51a><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_0" data-v-ca01b51a></td><td width="21%" data-v-ca01b51a>3 <span class="smallf" data-v-ca01b51a>[1]</span></td><td width="4%" data-v-ca01b51a><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_1" data-v-ca01b51a></td><td width="21%" data-v-ca01b51a>2.5/3 <span class="smallf" data-v-ca01b51a>[1]</span></td><td width="4%" data-v-ca01b51a><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_2" data-v-ca01b51a></td><td width="21%" data-v-ca01b51a>2.5 <span class="smallf" data-v-ca01b51a>[1]</span></td><td width="4%" data-v-ca01b51a><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_3" data-v-ca01b51a></td><td width="21%" data-v-ca01b51a>2/2.5 <span class="smallf" data-v-ca01b51a>[1]</span></td></tr></tbody></table><div class="goalTitle" data-v-ca01b51a>Over/Under</div><table width="95%" cellpadding="0" cellspacing="0" data-v-ca01b51a><tbody data-v-ca01b51a><tr style="${ssrRenderStyle({ "height": "24px" })}" data-v-ca01b51a><td width="4%" data-v-ca01b51a><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_24" data-v-ca01b51a></td><td width="21%" data-v-ca01b51a>0.5/1 <span class="smallf" data-v-ca01b51a>[1]</span></td><td width="4%" data-v-ca01b51a><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_25" data-v-ca01b51a></td><td width="21%" data-v-ca01b51a>1 <span class="smallf" data-v-ca01b51a>[1]</span></td><td width="4%" data-v-ca01b51a><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_26" data-v-ca01b51a></td><td width="21%" data-v-ca01b51a>1/1.5 <span class="smallf" data-v-ca01b51a>[2]</span></td><td width="4%" data-v-ca01b51a><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_27" data-v-ca01b51a></td><td width="21%" data-v-ca01b51a>1.5 <span class="smallf" data-v-ca01b51a>[2]</span></td></tr><tr style="${ssrRenderStyle({ "height": "24px" })}" data-v-ca01b51a><td width="4%" data-v-ca01b51a><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_40" data-v-ca01b51a></td><td width="21%" data-v-ca01b51a>6.5 <span class="smallf" data-v-ca01b51a>[1]</span></td><td width="4%" data-v-ca01b51a><input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_41" data-v-ca01b51a></td><td width="21%" data-v-ca01b51a>No Odds <span class="smallf" data-v-ca01b51a>[321]</span></td></tr></tbody></table></div><div class="bt-selected" data-v-ca01b51a><b id="oddsNum" data-v-ca01b51a>332</b> Matches Selected </div><div id="selectGoals_div" style="${ssrRenderStyle({ "text-align": "center" })}" class="bts" data-v-ca01b51a><span data-v-ca01b51a>Select All</span><span data-v-ca01b51a>Select Others</span><span class="ent" data-v-ca01b51a>Confirm</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeFilterOdds.value === "oddsFilter2") {
          _push(`<div id="StreaksFilter" class="oddsFilter2" data-v-ca01b51a><div id="filterList" data-v-ca01b51a><div class="item" data-v-ca01b51a><span class="name" data-v-ca01b51a>Winning Streaks</span><span data-v-ca01b51a><label class="ef-radio" for="condition_0_0" data-v-ca01b51a><input type="radio" id="condition_0_0" name="filterCid" checked="checked" data-v-ca01b51a><span class="ef-radio-style checked" data-v-ca01b51a>3~4</span></label></span><span data-v-ca01b51a><label class="ef-radio" for="condition_0_1" data-v-ca01b51a><input type="radio" id="condition_0_1" name="filterCid" data-v-ca01b51a><span class="ef-radio-style" data-v-ca01b51a>5~6</span></label></span><span data-v-ca01b51a><label class="ef-radio" for="condition_0_2" data-v-ca01b51a><input type="radio" id="condition_0_2" name="filterCid" data-v-ca01b51a><span class="ef-radio-style" data-v-ca01b51a>7+</span></label></span></div></div><p class="bts" data-v-ca01b51a><label id="countBox" style="${ssrRenderStyle({ "float": "left", "margin-top": "10px" })}" data-v-ca01b51a><b id="conditionNum" data-v-ca01b51a>0</b> Matches Selected </label><span id="button7" class="ent" style="${ssrRenderStyle({ "float": "right" })}" data-v-ca01b51a>Confirm</span></p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if ((isShowGoalWindow.value || isShowRedWindow.value) && isScoreGoal.value) {
        _push(`<div id="Layer2" data-v-ca01b51a><div id="showoptional2" data-v-ca01b51a><div class="box_showoptional2" data-v-ca01b51a><table id="flGoalDiv" width="620" border="0" cellpadding="0" cellspacing="0" data-v-ca01b51a><tbody data-v-ca01b51a><tr data-v-ca01b51a><td class="GoalDiv-t" height="32" colspan="6" data-v-ca01b51a><b data-v-ca01b51a>${ssrInterpolate((_e2 = (_d2 = (_c2 = compsListByKey.value) == null ? void 0 : _c2.get((_b2 = (_a2 = matchOriginsList.value) == null ? void 0 : _a2[isScoreGoalMatchId.value]) == null ? void 0 : _b2.competition)) == null ? void 0 : _d2[0]) == null ? void 0 : _e2.name)}</b><b class="goal-time" data-v-ca01b51a>${ssrInterpolate((_g2 = (_f2 = matchOriginsList.value) == null ? void 0 : _f2[isScoreGoalMatchId.value]) == null ? void 0 : _g2.matchMinutesEvent)}<img${ssrRenderAttr("src", _imports_0)} border="0" alt="in" width="3" height="8" data-v-ca01b51a></b><span class="iconfont icon-close" data-v-ca01b51a></span></td></tr><tr align="center" class="line" data-v-ca01b51a><td width="40" data-v-ca01b51a><img class="sjicon"${ssrRenderAttr("src", scoreChangeType.value)} data-v-ca01b51a></td><td width="180" data-v-ca01b51a><span class="teamname" data-v-ca01b51a><font class="" data-v-ca01b51a><b data-v-ca01b51a>${ssrInterpolate((_j2 = (_i2 = (_h2 = matchOriginsList.value) == null ? void 0 : _h2[isScoreGoalMatchId.value]) == null ? void 0 : _i2.home_team) == null ? void 0 : _j2.name)}</b></font></span></td><td width="60" style="${ssrRenderStyle({ "font-size": "16px" })}" data-v-ca01b51a><b data-v-ca01b51a><font class="blue" data-v-ca01b51a>${ssrInterpolate((_m = (_l2 = (_k2 = matchOriginsList.value) == null ? void 0 : _k2[isScoreGoalMatchId.value]) == null ? void 0 : _l2.home_scores) == null ? void 0 : _m[0])}</font></b> - <b data-v-ca01b51a><font class="blue" data-v-ca01b51a>${ssrInterpolate((_p = (_o = (_n = matchOriginsList.value) == null ? void 0 : _n[isScoreGoalMatchId.value]) == null ? void 0 : _o.away_scores) == null ? void 0 : _p[0])}</font></b></td><td width="180" data-v-ca01b51a><span class="teamname" data-v-ca01b51a><b data-v-ca01b51a><font class="" data-v-ca01b51a>${ssrInterpolate((_s = (_r = (_q = matchOriginsList.value) == null ? void 0 : _q[isScoreGoalMatchId.value]) == null ? void 0 : _r.away_team) == null ? void 0 : _s.name)}</font></b></span></td><td width="40" data-v-ca01b51a></td></tr><tr align="center" class="line" data-v-ca01b51a><td width="40" data-v-ca01b51a></td><td width="180" data-v-ca01b51a><i data-v-ca01b51a>${ssrInterpolate((_v = (_u = (_t = matchOriginsList.value) == null ? void 0 : _t[isScoreGoalMatchId.value]) == null ? void 0 : _u.home_team) == null ? void 0 : _v.playerName)}</i></td><td width="60" style="${ssrRenderStyle({ "font-size": "16px" })}" data-v-ca01b51a></td><td width="180" data-v-ca01b51a><i data-v-ca01b51a>${ssrInterpolate((_y = (_x = (_w = matchOriginsList.value) == null ? void 0 : _w[isScoreGoalMatchId.value]) == null ? void 0 : _x.away_team) == null ? void 0 : _y.playerName)}</i></td><td width="40" data-v-ca01b51a></td></tr></tbody></table></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).SCHEDULE) {
        _push(`<div class="date-now-none" data-v-ca01b51a><div data-v-ca01b51a><div class="date-picker" data-v-ca01b51a><ul class="on" data-v-ca01b51a><!--[-->`);
        ssrRenderList(datesList.value, (itemDate) => {
          _push(`<li class="${ssrRenderClass(dateChoose.value === (itemDate == null ? void 0 : itemDate.dayValue) ? "on" : "")}" data-v-ca01b51a><span data-v-ca01b51a>${ssrInterpolate(itemDate == null ? void 0 : itemDate.label)}</span><span data-v-ca01b51a>${ssrInterpolate(itemDate == null ? void 0 : itemDate.day)}</span></li>`);
        });
        _push(`<!--]--></ul></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!(props == null ? void 0 : props.favorites)) {
        _push(`<div id="tools" class="tools d-none d-md-flex" style="${ssrRenderStyle({ "justify-content": "space-between" })}" data-v-ca01b51a><ul data-v-ca01b51a><li id="li_ShowAll" class="${ssrRenderClass(activeTab.value === ("LIVESCORE_ACTIVE_TAB" in _ctx ? _ctx.LIVESCORE_ACTIVE_TAB : unref(LIVESCORE_ACTIVE_TAB)).ALL ? "on" : "")}" data-v-ca01b51a><span data-v-ca01b51a>${ssrInterpolate(unref($t)("All"))}</span></li><li id="li_FilterHot" class="${ssrRenderClass(activeTab.value === ("LIVESCORE_ACTIVE_TAB" in _ctx ? _ctx.LIVESCORE_ACTIVE_TAB : unref(LIVESCORE_ACTIVE_TAB)).HOT ? "on" : "")}" data-v-ca01b51a><span data-v-ca01b51a>${ssrInterpolate(unref($t)("Hot"))}</span></li><li id="li_FilterLea" class="${ssrRenderClass([activeTab.value === ("LIVESCORE_ACTIVE_TAB" in _ctx ? _ctx.LIVESCORE_ACTIVE_TAB : unref(LIVESCORE_ACTIVE_TAB)).LEAGUE ? "on" : "", "filterLi"])}" data-v-ca01b51a><span id="LeaSelBtn" data-v-ca01b51a>${ssrInterpolate(unref($t)("Leagues"))} <i class="icon iconfont icon-drop-down" data-v-ca01b51a></i></span></li></ul>`);
        _push(ssrRenderComponent(_component_FastSearchLivescore, {
          searchMatch: searchMatch.value,
          "onUpdate:searchMatch": ($event) => searchMatch.value = $event,
          activeTab: activeTab.value,
          "onUpdate:activeTab": ($event) => activeTab.value = $event,
          orderByTime: orderByTime.value,
          "onUpdate:orderByTime": ($event) => orderByTime.value = $event,
          renderTopListSearch: renderTopListSearch.value,
          "onUpdate:renderTopListSearch": ($event) => renderTopListSearch.value = $event,
          compsList: compsList.value,
          "onUpdate:compsList": ($event) => compsList.value = $event,
          renderTopList: renderTopList.value,
          "onUpdate:renderTopList": ($event) => renderTopList.value = $event,
          compsListSearch: compsListSearch.value,
          "onUpdate:compsListSearch": ($event) => compsListSearch.value = $event
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (props == null ? void 0 : props.favorites) {
        _push(`<div id="tools" class="tools" data-v-ca01b51a><ul data-v-ca01b51a><li id="li_ShowAll" class="${ssrRenderClass((props == null ? void 0 : props.favorites) === unref($trouter)(("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).MATCHES) ? "on" : "")}" data-v-ca01b51a><div data-v-ca01b51a><span data-v-ca01b51a>${ssrInterpolate(unref($t)("Match"))}</span></div></li><li id="li_FilterHot" class="${ssrRenderClass((props == null ? void 0 : props.favorites) === unref($trouter)(("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).LEAGUES) ? "on" : "")}" data-v-ca01b51a><div data-v-ca01b51a><span data-v-ca01b51a>${ssrInterpolate(unref($t)("League"))}</span></div></li><li id="li_FilterLea" class="${ssrRenderClass([(props == null ? void 0 : props.favorites) === unref($trouter)(("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).TEAMS) ? "on" : "", "tab"])}" data-v-ca01b51a><div data-v-ca01b51a><span data-v-ca01b51a>${ssrInterpolate(unref($t)("Team"))}</span></div></li></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([{ "p-0": !unref(isHidden) }, "container-fluid"])}" data-v-ca01b51a><div id="mintable" data-v-ca01b51a><span id="notify" data-v-ca01b51a></span><span id="live" data-v-ca01b51a><div class="${ssrRenderClass({ container: !unref(isHidden) })}" id="table_live" data-v-ca01b51a><div id="tr_0" class="row scoretitle" data-v-ca01b51a><div class="col-8 col-sm-8 col-md-1 col-lg-1 align-self-center ps-3" data-v-ca01b51a><span class="allno"${ssrRenderAttr("title", unref($t)("Delete all followed teams"))} data-v-ca01b51a></span></div><div class="col-md-1 col-lg-1 text-left d-none d-sm-none d-md-inline-block align-self-center" data-v-ca01b51a>${ssrInterpolate(unref($t)("Hour"))}</div><div id="home" class="${ssrRenderClass([{ "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }, "text-end d-none d-sm-none d-md-inline-block align-self-center"])}" data-v-ca01b51a>${ssrInterpolate(unref($t)("Home"))}</div><div id="ScoreTh" class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" data-v-ca01b51a>${ssrInterpolate(unref($t)("Score"))}</div><div id="away" class="${ssrRenderClass([{ "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }, "text-start d-none d-sm-none d-md-inline-block align-self-center"])}" data-v-ca01b51a>${ssrInterpolate(unref($t)("Away"))}</div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" data-v-ca01b51a><i class="icon iconfont icon-font-report3"${ssrRenderAttr("title", unref($t)("Corner"))} data-v-ca01b51a></i></div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" id="HtTh"${ssrRenderAttr("title", unref($t)("First half result"))} data-v-ca01b51a>${ssrInterpolate(unref($t)("H-T"))}</div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center data_td" data-v-ca01b51a>${ssrInterpolate(unref($t)("Data"))}</div>`);
      if (isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) {
        _push(`<div class="col-4 col-sm-4 col-md-2 col-lg-2 text-center align-self-center oddsHead" id="oddsHead" data-v-ca01b51a><select id="CompanySel" aria-label="Company Select" data-v-ca01b51a><!--[-->`);
        ssrRenderList("ODD_COMPANYS_LIVESCORE" in _ctx ? _ctx.ODD_COMPANYS_LIVESCORE : unref(ODD_COMPANYS_LIVESCORE), (odd_company, index) => {
          _push(`<option${ssrRenderAttr("value", odd_company == null ? void 0 : odd_company.id)} data-v-ca01b51a>${ssrInterpolate(unref($t)(odd_company == null ? void 0 : odd_company.name))}</option>`);
        });
        _push(`<!--]--></select></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!orderByTime.value) {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(compsListSearch.value !== null ? compsListSearch.value : compsList.value, (comp, index) => {
          var _a3, _b3, _c3, _d3, _e3, _f3, _g3, _h3, _i3, _j3, _k3;
          _push(`<!--[-->`);
          if (index < limitData.value) {
            _push(`<!--[-->`);
            if ((_a3 = comp == null ? void 0 : comp.matchs) == null ? void 0 : _a3.length) {
              _push(`<div class="row Leaguestitle fbHead isLeaTop" id="tr_2" leaindex="2" data-lidx="2" sclassid="34" isleatop="1" data-v-ca01b51a><div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center add-div" data-v-ca01b51a><i class="icon iconfont icon-font-collect-off" style="${ssrRenderStyle(!((_b3 = favouritesLeagues.value) == null ? void 0 : _b3.includes(comp == null ? void 0 : comp.id)) ? null : { display: "none" })}" data-v-ca01b51a></i><i class="icon iconfont icon-font-collect-on on" style="${ssrRenderStyle(((_c3 = favouritesLeagues.value) == null ? void 0 : _c3.includes(comp == null ? void 0 : comp.id)) ? null : { display: "none" })}" data-v-ca01b51a></i></div><div class="col-9 col-sm-9 col-md-9 col-lg-9 align-self-center" data-v-ca01b51a><div class="l1" data-v-ca01b51a><div class="league-img" data-v-ca01b51a>`);
              _push(ssrRenderComponent(_component_nuxt_img, {
                src: unref(liveScoresImage) + (((_e3 = (_d3 = comp.matchs) == null ? void 0 : _d3[0]) == null ? void 0 : _e3.isFlatCountry) ? "country/" + comp.country_logo : "competition/" + comp.logo_o) + unref(imageHeight),
                loading: "lazy",
                class: "cImg lazy",
                alt: comp == null ? void 0 : comp.name,
                style: { "display": "inline" }
              }, null, _parent));
              _push(`</div>`);
              _push(ssrRenderComponent(_component_nuxt_link, {
                to: ((_h3 = (_g3 = (_f3 = comp == null ? void 0 : comp.matchs) == null ? void 0 : _f3[0]) == null ? void 0 : _g3.stage) == null ? void 0 : _h3.season_id) ? ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).LEAGUES + "/" + comp.id : ""
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<span class="LGname" data-v-ca01b51a${_scopeId}>${ssrInterpolate(comp == null ? void 0 : comp.name)}</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "LGname" }, toDisplayString(comp == null ? void 0 : comp.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(`</div></div><div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center" data-v-ca01b51a>`);
              if ((_k3 = (_j3 = (_i3 = comp == null ? void 0 : comp.matchs) == null ? void 0 : _i3[0]) == null ? void 0 : _j3.stage) == null ? void 0 : _k3.season_id) {
                _push(ssrRenderComponent(_component_nuxt_link, {
                  to: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).LEAGUES + "/" + comp.id,
                  "aria-label": "Standing",
                  style: { "display": "flex", "gap": "4px", "justify-content": "flex-end" }
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(ssrRenderComponent(_component_nuxt_img, {
                        src: "/img/rank.svg",
                        alt: "Standing",
                        title: unref($t)("Standing info"),
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
                          title: unref($t)("Standing info"),
                          loading: "lazy",
                          height: "24",
                          width: "24",
                          class: "rankicon",
                          style: { "display": "inline" }
                        }, null, 8, ["title"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
              } else {
                _push(`<!---->`);
              }
              _push(`</div><div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center" data-v-ca01b51a><div class="l2" data-v-ca01b51a><span class="l5" data-v-ca01b51a><span style="${ssrRenderStyle(!toggleCompetition.value.includes(index) ? null : { display: "none" })}" class="hidden-info r0" data-v-ca01b51a><span id="collapse2" class="collapse"${ssrRenderAttr("title", unref($t)("Collapse"))} data-v-ca01b51a></span></span><span style="${ssrRenderStyle(toggleCompetition.value.includes(index) ? null : { display: "none" })}" class="display-info r0" data-v-ca01b51a><span id="expand2" class="expand" data-v-ca01b51a></span></span></span></div></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--[-->`);
            ssrRenderList(comp == null ? void 0 : comp.matchs, (match) => {
              _push(ssrRenderComponent(_component_nuxt_link, {
                to: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + (match == null ? void 0 : match.id),
                class: "match row"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  var _a4, _b4, _c4, _d4, _e4, _f4, _g4, _h4, _i4, _j4, _k4, _l3, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2, _y2, _z2, _A2, _B2, _C2, _D2, _E2, _F2, _G2, _H2, _I2, _J2, _K2, _L2, _M2, _N2, _O2, _P2, _Q2, _R2;
                  if (_push2) {
                    _push2(`<div class="${ssrRenderClass(`row tds ${props == null ? void 0 : props.page}-col`)}" style="${ssrRenderStyle([
                      { "min-height": "46px" },
                      !toggleCompetition.value.includes(index) ? null : { display: "none" }
                    ])}"${ssrRenderAttr("id", "tr1_" + (match == null ? void 0 : match.id))} index="2" leaindex="2" data-v-ca01b51a${_scopeId}><div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center star-like" data-v-ca01b51a${_scopeId}><div class="add-div" data-v-ca01b51a${_scopeId}><i class="icon iconfont icon-font-collect-off" style="${ssrRenderStyle(!((_a4 = favouritesList.value) == null ? void 0 : _a4.includes(match == null ? void 0 : match.id)) ? null : { display: "none" })}" data-v-ca01b51a${_scopeId}></i><i class="icon iconfont icon-font-collect-on on" style="${ssrRenderStyle(((_b4 = favouritesList.value) == null ? void 0 : _b4.includes(match == null ? void 0 : match.id)) ? null : { display: "none" })}" data-v-ca01b51a${_scopeId}></i>`);
                    if ((match == null ? void 0 : match.available_stream) && unref(availableStreamUrl)) {
                      _push2(`<span target="_blank" class="d-none d-md-inline-block liveicon" data-v-ca01b51a${_scopeId}><span class="icon iconfont icon-icon-live2 live" data-v-ca01b51a${_scopeId}></span></span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div></div><div class="col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-none d-md-block" data-v-ca01b51a${_scopeId}><div name="timeData" id="mt" data-v-ca01b51a${_scopeId}>${("getStatusDisplay" in _ctx ? _ctx.getStatusDisplay : unref(getStatusDisplay))(match, unref($t), timeZone.value) ?? ""}</div>`);
                    if (("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE.includes(match.status)) {
                      _push2(`<div style="${ssrRenderStyle({ "font-size": "12px", "color": "var(--secondary, #27660a)" })}" data-v-ca01b51a${_scopeId}>${ssrInterpolate(match.status === "12" ? "" : unref($t)("Postpone"))}</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div><div class="col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-sm-inline-block d-md-none" data-v-ca01b51a${_scopeId}><span class="time" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref(formatDateMomentUTCTimeZone)(match == null ? void 0 : match.match_time, "HH:mm", timeZone.value))}</span>`);
                    if ((match == null ? void 0 : match.available_stream) && unref(availableStreamUrl)) {
                      _push2(`<span target="_blank" class="liveicon"${ssrRenderAttr("to", unref(availableStreamUrl) + "?ls-id=" + (match == null ? void 0 : match.id))} data-v-ca01b51a${_scopeId}><span class="icon iconfont icon-icon-live2 live" data-v-ca01b51a${_scopeId}></span></span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if (("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE.includes(match.status)) {
                      _push2(`<span style="${ssrRenderStyle({ "font-size": "12px", "color": "var(--secondary, #27660a)", "margin-left": "3px" })}" data-v-ca01b51a${_scopeId}>${ssrInterpolate(match.status === "12" ? "" : unref($t)("Postpone"))}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div><div class="col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center" data-v-ca01b51a${_scopeId}><span class="hafttime_mobile" data-v-ca01b51a${_scopeId}></span></div><div class="col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center score bd_time_mobile" data-v-ca01b51a${_scopeId}><i class="injury fulltime_mobile" data-v-ca01b51a${_scopeId}><text data-v-ca01b51a${_scopeId}></text><text data-v-ca01b51a${_scopeId}>${("getStatusDisplayMobile" in _ctx ? _ctx.getStatusDisplayMobile : unref(getStatusDisplayMobile))(match, unref($t), timeZone.value) ?? ""}</text></i></div><div class="col-3 col-sm-3 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center conner_mobile" data-v-ca01b51a${_scopeId}><i class="icon iconfont icon-font-report3" data-v-ca01b51a${_scopeId}></i>`);
                    if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                      _push2(`<span id="cr" class="conner_span" data-v-ca01b51a${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[4]) !== "undefined" ? match == null ? void 0 : match.home_scores[4] : "")}-${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[4]) !== "undefined" ? match == null ? void 0 : match.away_scores[4] : "")}</span>`);
                    } else {
                      _push2(`<!--[--> - <!--]-->`);
                    }
                    _push2(`</div><div class="col-8 col-sm-8 col-md-2 col-lg-2 text-end d-inline-block d-sm-inline-block d-md-none align-self-center" data-v-ca01b51a${_scopeId}><div class="row" data-v-ca01b51a${_scopeId}><div class="col-10 col-sm-10 text-start align-self-center" data-v-ca01b51a${_scopeId}><div id="ht" data-v-ca01b51a${_scopeId}>${ssrInterpolate((_c4 = match == null ? void 0 : match.home_team) == null ? void 0 : _c4.name)} `);
                    if (isShowRanking.value) {
                      _push2(`<span id="horder" class="team-hg" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_position) ? "[" + (match == null ? void 0 : match.home_position) + "]" : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((match == null ? void 0 : match.home_scores[3]) && isShowCardYellow.value) {
                      _push2(`<span class="yellow1 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[3]) ? match == null ? void 0 : match.home_scores[3] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((match == null ? void 0 : match.home_scores[2]) && isShowCardRed.value) {
                      _push2(`<span class="redcard1 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[2]) ? match == null ? void 0 : match.home_scores[2] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div><div id="gt" data-v-ca01b51a${_scopeId}>${ssrInterpolate((_d4 = match == null ? void 0 : match.away_team) == null ? void 0 : _d4.name)} `);
                    if ((match == null ? void 0 : match.away_scores[2]) && isShowCardRed.value) {
                      _push2(`<span class="redcard2 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[2]) ? match == null ? void 0 : match.away_scores[2] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((match == null ? void 0 : match.away_scores[3]) && isShowCardYellow.value) {
                      _push2(`<span class="yellow2 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[3]) ? match == null ? void 0 : match.away_scores[3] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if (isShowRanking.value) {
                      _push2(`<span id="gorder" class="team-hg" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_position) ? "[" + (match == null ? void 0 : match.away_position) + "]" : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div></div><div class="col-1 col-sm-1 text-center align-self-center" data-v-ca01b51a${_scopeId}>`);
                    if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                      _push2(`<span id="hht" data-v-ca01b51a${_scopeId}><p data-v-ca01b51a${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : "")}</p><p data-v-ca01b51a${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : "")}</p></span>`);
                    } else {
                      _push2(`<!--[--> - <!--]-->`);
                    }
                    _push2(`</div><div class="col-1 col-sm-1 text-center align-self-center" data-v-ca01b51a${_scopeId}><b data-v-ca01b51a${_scopeId}>`);
                    if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                      _push2(`<!--[--><p data-v-ca01b51a${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[0]) !== "undefined" ? match == null ? void 0 : match.home_scores[0] : "")}</p><p data-v-ca01b51a${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[0]) !== "undefined" ? match == null ? void 0 : match.away_scores[0] : "")}</p><!--]-->`);
                    } else {
                      _push2(`<!--[--> - <!--]-->`);
                    }
                    _push2(`</b></div></div></div><div id="ht" class="${ssrRenderClass([{ "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }, "text-end d-none d-sm-none d-md-inline-block align-self-center"])}" data-v-ca01b51a${_scopeId}>`);
                    if (isShowRanking.value) {
                      _push2(`<span id="horder" class="team-hg" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_position) ? "[" + (match == null ? void 0 : match.home_position) + "]" : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((match == null ? void 0 : match.home_scores[3]) && isShowCardYellow.value) {
                      _push2(`<span class="yellow1 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[3]) ? match == null ? void 0 : match.home_scores[3] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((match == null ? void 0 : match.home_scores[2]) && isShowCardRed.value) {
                      _push2(`<span class="redcard1 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[2]) ? match == null ? void 0 : match.home_scores[2] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<span class="team-name" data-v-ca01b51a${_scopeId}>${ssrInterpolate((_e4 = match == null ? void 0 : match.home_team) == null ? void 0 : _e4.name)}</span></div><div class="${ssrRenderClass([("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_END.includes(match == null ? void 0 : match.status) ? "red" : "blue", "handpoint col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center align-content-center height-100"])}" data-v-ca01b51a${_scopeId}><b data-v-ca01b51a${_scopeId}>`);
                    if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                      _push2(`<!--[-->${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[0]) !== "undefined" ? match == null ? void 0 : match.home_scores[0] : "")} - ${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[0]) !== "undefined" ? match == null ? void 0 : match.away_scores[0] : "")}<!--]-->`);
                    } else {
                      _push2(`<!--[--> - <!--]-->`);
                    }
                    _push2(`</b></div><div id="gt" class="${ssrRenderClass([{ "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }, "d-none d-sm-none d-md-inline-block align-self-center"])}" data-v-ca01b51a${_scopeId}><span class="team-name" data-v-ca01b51a${_scopeId}>${ssrInterpolate((_f4 = match == null ? void 0 : match.away_team) == null ? void 0 : _f4.name)}</span>`);
                    if ((match == null ? void 0 : match.away_scores[2]) && isShowCardRed.value) {
                      _push2(`<span class="redcard2 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[2]) ? match == null ? void 0 : match.away_scores[2] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if ((match == null ? void 0 : match.away_scores[3]) && isShowCardYellow.value) {
                      _push2(`<span class="yellow2 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[3]) ? match == null ? void 0 : match.away_scores[3] : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if (isShowRanking.value) {
                      _push2(`<span id="gorder" class="team-hg" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_position) ? "[" + (match == null ? void 0 : match.away_position) + "]" : "")}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" data-v-ca01b51a${_scopeId}>`);
                    if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                      _push2(`<span id="cr" class="conner_span" data-v-ca01b51a${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[4]) !== "undefined" ? match == null ? void 0 : match.home_scores[4] : "")}-${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[4]) !== "undefined" ? match == null ? void 0 : match.away_scores[4] : "")}</span>`);
                    } else {
                      _push2(`<!--[--> - <!--]-->`);
                    }
                    _push2(`</div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" data-v-ca01b51a${_scopeId}>`);
                    if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                      _push2(`<span id="hht" style="${ssrRenderStyle({ "display": "block" })}" data-v-ca01b51a${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : "")}-${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : "")}</span>`);
                    } else {
                      _push2(`<!--[--> - <!--]-->`);
                    }
                    _push2(`</div><div class="toolimg col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" data-v-ca01b51a${_scopeId}><span class="analyze-icon l0" data-v-ca01b51a${_scopeId}><i class="icon iconfont icon-analysis"${ssrRenderAttr("title", unref($t)("Analysis"))} data-v-ca01b51a${_scopeId}></i></span>`);
                    if ((props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE || (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).FAVORITES) {
                      _push2(`<span${ssrRenderAttr("id", "flashSpan_" + (match == null ? void 0 : match.id))} class="matchdata-iconpc l0" data-v-ca01b51a${_scopeId}><span${ssrRenderAttr("title", unref($t)("Data"))} class="${ssrRenderClass([(match == null ? void 0 : match.id) === matchActiveLiveFlash.value ? "on" : "", "icon icon-pc icon-matchdata-pc"])}" data-v-ca01b51a${_scopeId}></span></span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                    if ((isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) && ((props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE || (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).FAVORITES)) {
                      _push2(`<div class="col-4 col-sm-4 col-md-2 col-lg-2 align-self-center oddstd" data-v-ca01b51a${_scopeId}><div class="text-center" style="${ssrRenderStyle({ "min-height": "42px" })}" data-v-ca01b51a${_scopeId}>`);
                      _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
                      _push2(`</div></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div><div class="table_matchdata" data-v-ca01b51a${_scopeId}>`);
                    if ((match == null ? void 0 : match.id) === matchActiveLiveFlash.value) {
                      _push2(`<div${ssrRenderAttr("id", "trF_" + (match == null ? void 0 : match.id))} bgcolor="#FFFFFF" data-v-ca01b51a${_scopeId}><div colspan="13" align="center" height="18"${ssrRenderAttr("id", "flashLive_" + (match == null ? void 0 : match.id))} data-v-ca01b51a${_scopeId}><div class="ant row" data-v-ca01b51a${_scopeId}><div class="flash col-6 p-0" data-v-ca01b51a${_scopeId}><div class="nodata" data-v-ca01b51a${_scopeId}>`);
                      _push2(ssrRenderComponent(_component_Loading, null, null, _parent2, _scopeId));
                      _push2(`</div><iframe id="flash"${ssrRenderAttr("src", "https://tracker.sportdb.live/?code=" + keyEncode.value + "&id=" + (match == null ? void 0 : match.id) + "&lang=" + ((_g4 = unref(useLocale)) == null ? void 0 : _g4.defaultLocale))} onload="this.previousSibling.style.display=&#39;none&#39;" data-v-ca01b51a${_scopeId}></iframe></div><div class="matchdata col-6 p-0" data-v-ca01b51a${_scopeId}><div class="databtns" data-v-ca01b51a${_scopeId}><div class="btns" id="divBtns" data-v-ca01b51a${_scopeId}><span class="${ssrRenderClass([{ "on": activeSection.value === "scoredConceded" }, "btn_scoredconceded"])}" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("Scored conceded"))}</span><span class="${ssrRenderClass([{ "on": activeSection.value === "recentStatus" }, "btn_recentstatus"])}" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("Recent status"))}</span></div></div><div class="recentStatus" id="recentStatus" style="${ssrRenderStyle(activeSection.value === "recentStatus" ? null : { display: "none" })}" data-v-ca01b51a${_scopeId}><div class="liveBox mx2" data-v-ca01b51a${_scopeId}>`);
                      if (((_i4 = matchRecentResult.value) == null ? void 0 : _i4[(_h4 = match == null ? void 0 : match.home_team) == null ? void 0 : _h4.id]) || ((_k4 = matchRecentResult.value) == null ? void 0 : _k4[(_j4 = match == null ? void 0 : match.away_team) == null ? void 0 : _j4.id])) {
                        _push2(`<!--[--><div class="lb-title" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("Recent 6"))}</div><div class="lb-ms" data-v-ca01b51a${_scopeId}><span class="homeSix" data-v-ca01b51a${_scopeId}>${((_m2 = matchRecentResult.value) == null ? void 0 : _m2[(_l3 = match == null ? void 0 : match.home_team) == null ? void 0 : _l3.id]) ?? ""}</span><span class="lb-m" data-v-ca01b51a${_scopeId}><span data-v-ca01b51a${_scopeId}></span></span><span class="guestSix" data-v-ca01b51a${_scopeId}>${((_o2 = matchRecentResult.value) == null ? void 0 : _o2[(_n2 = match == null ? void 0 : match.away_team) == null ? void 0 : _n2.id]) ?? ""}</span></div><!--]-->`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if ((_p2 = matchSummary.value) == null ? void 0 : _p2.stats) {
                        _push2(`<ul data-v-ca01b51a${_scopeId}><li data-v-ca01b51a${_scopeId}><!--[-->`);
                        ssrRenderList((_q2 = matchSummary.value) == null ? void 0 : _q2.stats, (stat, index2) => {
                          _push2(`<!--[--><div class="lb-td1" data-v-ca01b51a${_scopeId}><span class="left red" data-v-ca01b51a${_scopeId}>${ssrInterpolate(stat == null ? void 0 : stat.home)}</span><span class="center" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)(("getStats" in _ctx ? _ctx.getStats : unref(getStats))(stat == null ? void 0 : stat.type)))}</span><span class="right" data-v-ca01b51a${_scopeId}>${ssrInterpolate(stat == null ? void 0 : stat.away)}</span></div><div class="lb-td2" data-v-ca01b51a${_scopeId}><span class="home-w" data-v-ca01b51a${_scopeId}><span class="home-bar" style="${ssrRenderStyle("width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.home) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%")}" data-v-ca01b51a${_scopeId}></span></span><span class="guest-w" data-v-ca01b51a${_scopeId}><span class="guest-bar" style="${ssrRenderStyle("width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.away) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%")}" data-v-ca01b51a${_scopeId}></span></span></div><!--]-->`);
                        });
                        _push2(`<!--]--></li></ul>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div></div>`);
                      if (activeSection.value === "scoredConceded") {
                        _push2(`<div class="guessBox scoredConceded" id="guessDiv" data-v-ca01b51a${_scopeId}><table width="100%" data-v-ca01b51a${_scopeId}><tbody data-v-ca01b51a${_scopeId}><tr data-v-ca01b51a${_scopeId}><th colspan="5" data-v-ca01b51a${_scopeId}><div class="cvd" data-v-ca01b51a${_scopeId}><div class="btns" data-v-ca01b51a${_scopeId}><span class="${ssrRenderClass([{ "on": activeSectionTable.value === "ThirtyGames" }, "thirtygames"])}" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("20 matches"))}</span></div></div></th></tr></tbody></table>`);
                        if (activeSectionTable.value === "ThirtyGames") {
                          _push2(`<table width="100%" cellspacing="1" cellpadding="0" id="JSQ_2404596_30" class="ThirtyGames" data-v-ca01b51a${_scopeId}><tbody data-v-ca01b51a${_scopeId}><tr data-v-ca01b51a${_scopeId}><td width="20%" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("Home"))}</td><td width="20%" class="y" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("Minute"))}</td><td width="20%" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("Away"))}</td></tr>`);
                          if (((_t2 = (_s2 = (_r2 = matchesAnalysis.value) == null ? void 0 : _r2.home_shoot_time) == null ? void 0 : _s2[0]) == null ? void 0 : _t2.length) > 0) {
                            _push2(`<!--[-->`);
                            ssrRenderList((_v2 = (_u2 = matchesAnalysis.value) == null ? void 0 : _u2.home_shoot_time) == null ? void 0 : _v2[0], (value, index2) => {
                              var _a5, _b5, _c5, _d5, _e5, _f5, _g5, _h5, _i5, _j5;
                              _push2(`<tr data-v-ca01b51a${_scopeId}><td data-v-ca01b51a${_scopeId}>${ssrInterpolate(((_a5 = shootTime.value) == null ? void 0 : _a5["sumHome"]) > 0 ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(value) * 100 / ((_b5 = shootTime.value) == null ? void 0 : _b5["sumHome"])).toFixed(0) : "0")}%</td>`);
                              if (index2 === 4) {
                                _push2(`<td class="y" data-v-ca01b51a${_scopeId}>41~45</td>`);
                              } else if (index2 === 5) {
                                _push2(`<td class="y" data-v-ca01b51a${_scopeId}>46~50</td>`);
                              } else {
                                _push2(`<td class="y" data-v-ca01b51a${_scopeId}>`);
                                if (index2 < 4) {
                                  _push2(`<span data-v-ca01b51a${_scopeId}>${ssrInterpolate(10 * index2 + 1)}~${ssrInterpolate(10 * (index2 + 1))}</span>`);
                                } else {
                                  _push2(`<span data-v-ca01b51a${_scopeId}>${ssrInterpolate(10 * (index2 - 1) + 1)}~${ssrInterpolate(10 * index2)}</span>`);
                                }
                                _push2(`</td>`);
                              }
                              _push2(`<td data-v-ca01b51a${_scopeId}>${ssrInterpolate(((_c5 = shootTime.value) == null ? void 0 : _c5["sumAway"]) > 0 ? ((_f5 = (_e5 = (_d5 = matchesAnalysis.value) == null ? void 0 : _d5.away_shoot_time) == null ? void 0 : _e5[0]) == null ? void 0 : _f5[index2]) ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))((_i5 = (_h5 = (_g5 = matchesAnalysis.value) == null ? void 0 : _g5.away_shoot_time) == null ? void 0 : _h5[0]) == null ? void 0 : _i5[index2]) * 100 / ((_j5 = shootTime.value) == null ? void 0 : _j5["sumAway"])).toFixed(0) : "0" : "0")}% </td></tr>`);
                            });
                            _push2(`<!--]-->`);
                          } else {
                            _push2(`<tr data-v-ca01b51a${_scopeId}><td colspan="3" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("Empty Data"))}</td></tr>`);
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
                        class: `row tds ${props == null ? void 0 : props.page}-col`,
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
                              [vShow, !((_w2 = favouritesList.value) == null ? void 0 : _w2.includes(match == null ? void 0 : match.id))]
                            ]),
                            withDirectives(createVNode("i", {
                              class: "icon iconfont icon-font-collect-on on",
                              onClick: withModifiers(($event) => removeFavourites(match == null ? void 0 : match.id), ["prevent"])
                            }, null, 8, ["onClick"]), [
                              [vShow, (_x2 = favouritesList.value) == null ? void 0 : _x2.includes(match == null ? void 0 : match.id)]
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
                            innerHTML: ("getStatusDisplay" in _ctx ? _ctx.getStatusDisplay : unref(getStatusDisplay))(match, unref($t), timeZone.value)
                          }, null, 8, ["innerHTML"]),
                          ("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE.includes(match.status) ? (openBlock(), createBlock("div", {
                            key: 0,
                            style: { "font-size": "12px", "color": "var(--secondary, #27660a)" }
                          }, toDisplayString(match.status === "12" ? "" : unref($t)("Postpone")), 1)) : createCommentVNode("", true)
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
                            style: { "font-size": "12px", "color": "var(--secondary, #27660a)", "margin-left": "3px" }
                          }, toDisplayString(match.status === "12" ? "" : unref($t)("Postpone")), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center" }, [
                          createVNode("span", { class: "hafttime_mobile" })
                        ]),
                        createVNode("div", { class: "col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center score bd_time_mobile" }, [
                          createVNode("i", { class: "injury fulltime_mobile" }, [
                            createVNode("text"),
                            createVNode("text", {
                              innerHTML: ("getStatusDisplayMobile" in _ctx ? _ctx.getStatusDisplayMobile : unref(getStatusDisplayMobile))(match, unref($t), timeZone.value)
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
                        createVNode("div", { class: "col-8 col-sm-8 col-md-2 col-lg-2 text-end d-inline-block d-sm-inline-block d-md-none align-self-center" }, [
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-10 col-sm-10 text-start align-self-center" }, [
                              createVNode("div", { id: "ht" }, [
                                createTextVNode(toDisplayString((_y2 = match == null ? void 0 : match.home_team) == null ? void 0 : _y2.name) + " ", 1),
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
                                createTextVNode(toDisplayString((_z2 = match == null ? void 0 : match.away_team) == null ? void 0 : _z2.name) + " ", 1),
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
                          createVNode("span", { class: "team-name" }, toDisplayString((_A2 = match == null ? void 0 : match.home_team) == null ? void 0 : _A2.name), 1)
                        ], 2),
                        createVNode("div", {
                          class: ["handpoint col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center align-content-center height-100", ("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_END.includes(match == null ? void 0 : match.status) ? "red" : "blue"],
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
                          createVNode("span", { class: "team-name" }, toDisplayString((_B2 = match == null ? void 0 : match.away_team) == null ? void 0 : _B2.name), 1),
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
                            onClick: withModifiers(($event) => ("locationHref" in _ctx ? _ctx.locationHref : unref(locationHref))(("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + (match == null ? void 0 : match.id) + "?tab=h2h"), ["prevent"])
                          }, [
                            createVNode("i", {
                              class: "icon iconfont icon-analysis",
                              title: unref($t)("Analysis")
                            }, null, 8, ["title"])
                          ], 8, ["onClick"]),
                          (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE || (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).FAVORITES ? (openBlock(), createBlock("span", {
                            key: 0,
                            id: "flashSpan_" + (match == null ? void 0 : match.id),
                            class: "matchdata-iconpc l0",
                            onClick: withModifiers(($event) => toggleSubInfoSport($event, match), ["prevent"])
                          }, [
                            createVNode("span", {
                              class: ["icon icon-pc icon-matchdata-pc", (match == null ? void 0 : match.id) === matchActiveLiveFlash.value ? "on" : ""],
                              title: unref($t)("Data")
                            }, null, 10, ["title"])
                          ], 8, ["id", "onClick"])) : createCommentVNode("", true)
                        ]),
                        (isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) && ((props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE || (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).FAVORITES) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "col-4 col-sm-4 col-md-2 col-lg-2 align-self-center oddstd",
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
                      ], 10, ["id"]), [
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
                                  src: "https://tracker.sportdb.live/?code=" + keyEncode.value + "&id=" + (match == null ? void 0 : match.id) + "&lang=" + ((_C2 = unref(useLocale)) == null ? void 0 : _C2.defaultLocale),
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
                                    }, toDisplayString(unref($t)("Scored conceded")), 11, ["onClick"]),
                                    createVNode("span", {
                                      class: ["btn_recentstatus", { "on": activeSection.value === "recentStatus" }],
                                      onClick: withModifiers(($event) => setActiveSection($event, match, "recentStatus"), ["prevent"])
                                    }, toDisplayString(unref($t)("Recent status")), 11, ["onClick"])
                                  ])
                                ]),
                                withDirectives(createVNode("div", {
                                  class: "recentStatus",
                                  id: "recentStatus"
                                }, [
                                  createVNode("div", { class: "liveBox mx2" }, [
                                    ((_E2 = matchRecentResult.value) == null ? void 0 : _E2[(_D2 = match == null ? void 0 : match.home_team) == null ? void 0 : _D2.id]) || ((_G2 = matchRecentResult.value) == null ? void 0 : _G2[(_F2 = match == null ? void 0 : match.away_team) == null ? void 0 : _F2.id]) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      createVNode("div", { class: "lb-title" }, toDisplayString(unref($t)("Recent 6")), 1),
                                      createVNode("div", { class: "lb-ms" }, [
                                        createVNode("span", {
                                          class: "homeSix",
                                          innerHTML: (_I2 = matchRecentResult.value) == null ? void 0 : _I2[(_H2 = match == null ? void 0 : match.home_team) == null ? void 0 : _H2.id]
                                        }, null, 8, ["innerHTML"]),
                                        createVNode("span", { class: "lb-m" }, [
                                          createVNode("span")
                                        ]),
                                        createVNode("span", {
                                          class: "guestSix",
                                          innerHTML: (_K2 = matchRecentResult.value) == null ? void 0 : _K2[(_J2 = match == null ? void 0 : match.away_team) == null ? void 0 : _J2.id]
                                        }, null, 8, ["innerHTML"])
                                      ])
                                    ], 64)) : createCommentVNode("", true),
                                    ((_L2 = matchSummary.value) == null ? void 0 : _L2.stats) ? (openBlock(), createBlock("ul", { key: 1 }, [
                                      createVNode("li", null, [
                                        (openBlock(true), createBlock(Fragment, null, renderList((_M2 = matchSummary.value) == null ? void 0 : _M2.stats, (stat, index2) => {
                                          return openBlock(), createBlock(Fragment, { key: index2 }, [
                                            createVNode("div", { class: "lb-td1" }, [
                                              createVNode("span", { class: "left red" }, toDisplayString(stat == null ? void 0 : stat.home), 1),
                                              createVNode("span", { class: "center" }, toDisplayString(unref($t)(("getStats" in _ctx ? _ctx.getStats : unref(getStats))(stat == null ? void 0 : stat.type))), 1),
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
                                              }, toDisplayString(unref($t)("20 matches")), 11, ["onClick"])
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
                                        createVNode("td", { width: "20%" }, toDisplayString(unref($t)("Home")), 1),
                                        createVNode("td", {
                                          width: "20%",
                                          class: "y"
                                        }, toDisplayString(unref($t)("Minute")), 1),
                                        createVNode("td", { width: "20%" }, toDisplayString(unref($t)("Away")), 1)
                                      ]),
                                      ((_P2 = (_O2 = (_N2 = matchesAnalysis.value) == null ? void 0 : _N2.home_shoot_time) == null ? void 0 : _O2[0]) == null ? void 0 : _P2.length) > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList((_R2 = (_Q2 = matchesAnalysis.value) == null ? void 0 : _Q2.home_shoot_time) == null ? void 0 : _R2[0], (value, index2) => {
                                        var _a5, _b5, _c5, _d5, _e5, _f5, _g5, _h5, _i5, _j5;
                                        return openBlock(), createBlock("tr", { key: index2 }, [
                                          createVNode("td", null, toDisplayString(((_a5 = shootTime.value) == null ? void 0 : _a5["sumHome"]) > 0 ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(value) * 100 / ((_b5 = shootTime.value) == null ? void 0 : _b5["sumHome"])).toFixed(0) : "0") + "%", 1),
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
                                          createVNode("td", null, toDisplayString(((_c5 = shootTime.value) == null ? void 0 : _c5["sumAway"]) > 0 ? ((_f5 = (_e5 = (_d5 = matchesAnalysis.value) == null ? void 0 : _d5.away_shoot_time) == null ? void 0 : _e5[0]) == null ? void 0 : _f5[index2]) ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))((_i5 = (_h5 = (_g5 = matchesAnalysis.value) == null ? void 0 : _g5.away_shoot_time) == null ? void 0 : _h5[0]) == null ? void 0 : _i5[index2]) * 100 / ((_j5 = shootTime.value) == null ? void 0 : _j5["sumAway"])).toFixed(0) : "0" : "0") + "% ", 1)
                                        ]);
                                      }), 128)) : (openBlock(), createBlock("tr", { key: 1 }, [
                                        createVNode("td", { colspan: "3" }, toDisplayString(unref($t)("Empty Data")), 1)
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
        _push(`<!--]--><div data-v-ca01b51a><div colspan="11" data-v-ca01b51a><p class="text-center mb-5 load-more-data" data-v-ca01b51a></p></div></div>`);
        if (((_z = compsList.value) == null ? void 0 : _z.length) === 0 && (props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).MATCHES) {
          _push(`<div id="noFavTip" data-v-ca01b51a><div class="no_fav_data" data-v-ca01b51a><div id="nodatatip" class="no_data" data-v-ca01b51a><p class="title" data-v-ca01b51a>${ssrInterpolate(unref($t)("Favorites the match"))}</p><p class="" data-v-ca01b51a>${ssrInterpolate(unref($t)("Click the check mark"))} <i class="icon iconfont icon-font-collect-off" data-v-ca01b51a></i> ${ssrInterpolate(unref($t)("To follow the match"))}</p><p data-v-ca01b51a><span class="searchbtn" data-v-ca01b51a><i class="icon iconfont icon-font-search" data-v-ca01b51a></i>${ssrInterpolate(unref($t)("Find a match"))}</span></p></div></div></div>`);
        } else if (((_A = compsList.value) == null ? void 0 : _A.length) === 0 && (props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).LEAGUES) {
          _push(`<div id="noFavTip" data-v-ca01b51a><div class="no_fav_data" data-v-ca01b51a><div id="nodatatip" class="no_data" data-v-ca01b51a><p class="title" data-v-ca01b51a>${ssrInterpolate(unref($t)("Favorites the league"))}</p><p class="" data-v-ca01b51a>${ssrInterpolate(unref($t)("Click the check mark"))} <i class="icon iconfont icon-font-collect-off" data-v-ca01b51a></i> ${ssrInterpolate(unref($t)("To follow the league"))}</p><p data-v-ca01b51a><span class="searchbtn" data-v-ca01b51a><i class="icon iconfont icon-font-search" data-v-ca01b51a></i>${ssrInterpolate(unref($t)("Find a league"))}</span></p></div></div></div>`);
        } else if (matchsListLength.value === 0 && (props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).TEAMS) {
          _push(`<div id="noFavTip" data-v-ca01b51a><div class="no_fav_data" data-v-ca01b51a><div id="nodatatip" class="no_data" data-v-ca01b51a><p class="title" data-v-ca01b51a>${ssrInterpolate(unref($t)("Favorites the team"))}</p><p class="" data-v-ca01b51a>${ssrInterpolate(unref($t)("Click the check mark"))} <i class="icon iconfont icon-font-collect-off" data-v-ca01b51a></i> ${ssrInterpolate(unref($t)("To follow the team"))}</p><p data-v-ca01b51a><span class="searchbtn" data-v-ca01b51a><i class="icon iconfont icon-font-search" data-v-ca01b51a></i>${ssrInterpolate(unref($t)("Find a team"))}</span></p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(renderTopListSearch.value !== null ? renderTopListSearch.value : renderTopList.value, (item, index) => {
          var _a3, _b3, _c3, _d3, _e3, _f3, _g3, _h3, _i3, _j3, _k3, _l3, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2;
          _push(`<!--[-->`);
          if (index < limitData.value) {
            _push(`<!--[-->`);
            _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
            if (((_b3 = (_a3 = item == null ? void 0 : item[1]) == null ? void 0 : _a3[0]) == null ? void 0 : _b3.favouriteTeams) && (props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).TEAMS) {
              _push(`<!--[-->`);
              ssrRenderList((_d3 = (_c3 = item == null ? void 0 : item[1]) == null ? void 0 : _c3[0]) == null ? void 0 : _d3.favouriteTeams, (team, key) => {
                var _a4, _b4;
                _push(`<div class="row Leaguestitle fbHead isLeaTop" id="tr_2" data-v-ca01b51a><div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center add-div" data-v-ca01b51a><i class="icon iconfont icon-font-collect-off add-info-l l0 favL favL_25"${ssrRenderAttr("title", unref($t)("Favorites the league"))} style="${ssrRenderStyle(!((_a4 = favouritesTeams.value) == null ? void 0 : _a4.includes(team == null ? void 0 : team.id)) ? null : { display: "none" })}" data-v-ca01b51a></i><i class="icon iconfont l0 favL favL_284 on icon-font-collect-on add-info-l2" style="${ssrRenderStyle(((_b4 = favouritesTeams.value) == null ? void 0 : _b4.includes(team == null ? void 0 : team.id)) ? null : { display: "none" })}" data-v-ca01b51a></i></div><div class="col-9 col-sm-9 col-md-9 col-lg-9 align-self-center" data-v-ca01b51a><div class="l1" data-v-ca01b51a><span class="LGname" data-v-ca01b51a>${ssrInterpolate(team == null ? void 0 : team.name)}</span></div></div><div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center" data-v-ca01b51a></div><div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center" data-v-ca01b51a><div class="l2" data-v-ca01b51a><span class="l5" data-v-ca01b51a><span style="${ssrRenderStyle(!toggleCompetition.value.includes(index) ? null : { display: "none" })}" class="hidden-info r0" data-v-ca01b51a><span id="collapse2" class="collapse"${ssrRenderAttr("title", unref($t)("Collapse"))} data-v-ca01b51a></span></span><span style="${ssrRenderStyle(toggleCompetition.value.includes(index) ? null : { display: "none" })}" class="display-info r0" data-v-ca01b51a><span id="expand2" class="expand" data-v-ca01b51a></span></span></span></div></div></div>`);
              });
              _push(`<!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="row Leaguestitle fbHead isLeaTop" id="tr_2" data-v-ca01b51a><div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center add-div" style="${ssrRenderStyle((props == null ? void 0 : props.favorites) !== ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).TEAMS ? null : { display: "none" })}" data-v-ca01b51a><i class="icon iconfont icon-font-collect-off add-info-l l0 favL favL_25"${ssrRenderAttr("title", unref($t)("Favorites the league"))} style="${ssrRenderStyle(!((_f3 = favouritesLeagues.value) == null ? void 0 : _f3.includes((_e3 = item == null ? void 0 : item[1]) == null ? void 0 : _e3[0].competition)) ? null : { display: "none" })}" data-v-ca01b51a></i><i class="icon iconfont l0 favL favL_284 on icon-font-collect-on add-info-l2" style="${ssrRenderStyle(((_h3 = favouritesLeagues.value) == null ? void 0 : _h3.includes((_g3 = item == null ? void 0 : item[1]) == null ? void 0 : _g3[0].competition)) ? null : { display: "none" })}" data-v-ca01b51a></i></div><div class="col-9 col-sm-9 col-md-9 col-lg-9 align-self-center" data-v-ca01b51a><div class="l1" data-v-ca01b51a><div class="league-img" data-v-ca01b51a>`);
            _push(ssrRenderComponent(_component_nuxt_img, {
              src: unref(liveScoresImage) + (((_j3 = (_i3 = item == null ? void 0 : item[1]) == null ? void 0 : _i3[0]) == null ? void 0 : _j3.isFlatCountry) ? "country/" + ((_k3 = item == null ? void 0 : item[1]) == null ? void 0 : _k3[0].comp.country_logo) : "competition/" + ((_l3 = item == null ? void 0 : item[1]) == null ? void 0 : _l3[0].comp.logo_o)) + unref(imageHeight),
              alt: (_m2 = item == null ? void 0 : item[1]) == null ? void 0 : _m2[0].comp.name,
              class: "cImg",
              style: { "display": "inline" }
            }, null, _parent));
            _push(`</div>`);
            _push(ssrRenderComponent(_component_nuxt_link, {
              to: ((_p2 = (_o2 = (_n2 = item == null ? void 0 : item[1]) == null ? void 0 : _n2[0]) == null ? void 0 : _o2.stage) == null ? void 0 : _p2.season_id) ? ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).LEAGUES + "/" + ((_q2 = item == null ? void 0 : item[1]) == null ? void 0 : _q2[0].comp.id) : ""
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                var _a4, _b4;
                if (_push2) {
                  _push2(`<span class="LGname" data-v-ca01b51a${_scopeId}>${ssrInterpolate((_a4 = item == null ? void 0 : item[1]) == null ? void 0 : _a4[0].comp.name)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "LGname" }, toDisplayString((_b4 = item == null ? void 0 : item[1]) == null ? void 0 : _b4[0].comp.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div></div><div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center" data-v-ca01b51a>`);
            if ((_t2 = (_s2 = (_r2 = item == null ? void 0 : item[1]) == null ? void 0 : _r2[0]) == null ? void 0 : _s2.stage) == null ? void 0 : _t2.season_id) {
              _push(ssrRenderComponent(_component_nuxt_link, {
                to: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).LEAGUES + "/" + ((_u2 = item == null ? void 0 : item[1]) == null ? void 0 : _u2[0].comp.id),
                "aria-label": "Standing",
                style: { "display": "flex", "gap": "4px", "justify-content": "flex-end" }
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(_component_nuxt_img, {
                      src: "/img/rank.svg",
                      alt: "Standing",
                      title: unref($t)("Standing info"),
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
                        title: unref($t)("Standing info"),
                        height: "24",
                        width: "24",
                        class: "rankicon",
                        style: { "display": "inline" }
                      }, null, 8, ["title"])
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div><div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center" data-v-ca01b51a><div class="l2" style="${ssrRenderStyle((props == null ? void 0 : props.favorites) !== ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).TEAMS ? null : { display: "none" })}" data-v-ca01b51a><span class="l5" data-v-ca01b51a><span style="${ssrRenderStyle(!toggleCompetition.value.includes(index) ? null : { display: "none" })}" class="hidden-info r0" data-v-ca01b51a><span id="collapse2" class="collapse"${ssrRenderAttr("title", unref($t)("Collapse"))} data-v-ca01b51a></span></span><span style="${ssrRenderStyle(toggleCompetition.value.includes(index) ? null : { display: "none" })}" class="display-info r0" data-v-ca01b51a><span id="expand2" class="expand" data-v-ca01b51a></span></span></span></div></div></div>`);
            if (!toggleCompetition.value.includes(index)) {
              _push(`<!--[-->`);
              ssrRenderList(item[1], (match) => {
                _push(ssrRenderComponent(_component_nuxt_link, {
                  to: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + (match == null ? void 0 : match.id),
                  class: "match row"
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    var _a4, _b4, _c4, _d4, _e4, _f4, _g4, _h4, _i4, _j4, _k4, _l4, _m3, _n3, _o3, _p3, _q3, _r3, _s3, _t3, _u3, _v2, _w2, _x2, _y2, _z2, _A2, _B2, _C2, _D2, _E2, _F2, _G2, _H2, _I2, _J2, _K2, _L2, _M2, _N2, _O2, _P2, _Q2, _R2;
                    if (_push2) {
                      _push2(`<div class="row tds" style="${ssrRenderStyle([
                        { "min-height": "46px" },
                        !toggleCompetition.value.includes(index) ? null : { display: "none" }
                      ])}"${ssrRenderAttr("id", "tr1_" + (match == null ? void 0 : match.id))}${ssrRenderAttr("index", match == null ? void 0 : match.id)} leaindex="2" data-v-ca01b51a${_scopeId}><div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center" data-v-ca01b51a${_scopeId}><div class="add-div" data-v-ca01b51a${_scopeId}><i class="icon iconfont icon-font-collect-off add-info favM"${ssrRenderAttr("title", unref($t)("Follow the match"))} style="${ssrRenderStyle(!((_a4 = favouritesList.value) == null ? void 0 : _a4.includes(match == null ? void 0 : match.id)) ? null : { display: "none" })}" data-v-ca01b51a${_scopeId}></i><i class="icon iconfont favM on icon-font-collect-on add-info2" style="${ssrRenderStyle(((_b4 = favouritesList.value) == null ? void 0 : _b4.includes(match == null ? void 0 : match.id)) ? null : { display: "none" })}" data-v-ca01b51a${_scopeId}></i>`);
                      if ((match == null ? void 0 : match.available_stream) && unref(availableStreamUrl)) {
                        _push2(`<span target="_blank" class="d-none d-md-inline-block liveicon" data-v-ca01b51a${_scopeId}><span class="icon iconfont icon-icon-live2 live" data-v-ca01b51a${_scopeId}></span></span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div></div><div class="col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-none d-md-block" data-v-ca01b51a${_scopeId}><div name="timeData" id="mt" data-v-ca01b51a${_scopeId}>${("getStatusDisplay" in _ctx ? _ctx.getStatusDisplay : unref(getStatusDisplay))(match, unref($t), timeZone.value) ?? ""}</div>`);
                      if (("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE.includes(match.status)) {
                        _push2(`<div style="${ssrRenderStyle({ "font-size": "12px", "color": "var(--secondary)" })}" data-v-ca01b51a${_scopeId}>${ssrInterpolate(match.status === "12" ? "" : unref($t)("Postpone"))}</div>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div><div class="col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-sm-inline-block d-md-none" data-v-ca01b51a${_scopeId}><span class="time" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref(formatDateMomentUTCTimeZone)(match == null ? void 0 : match.match_time, "HH:mm", timeZone.value))}</span>`);
                      if ((match == null ? void 0 : match.available_stream) && unref(availableStreamUrl)) {
                        _push2(`<span target="_blank" class="liveicon" data-v-ca01b51a${_scopeId}><span class="icon iconfont icon-icon-live2 live" data-v-ca01b51a${_scopeId}></span></span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if (("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE.includes(match.status)) {
                        _push2(`<span style="${ssrRenderStyle({ "font-size": "12px", "color": "var(--secondary)", "margin-left": "3px" })}" data-v-ca01b51a${_scopeId}>${ssrInterpolate(match.status === "12" ? "" : unref($t)("Postpone"))}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div><div class="col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center" data-v-ca01b51a${_scopeId}><span class="hafttime_mobile" data-v-ca01b51a${_scopeId}></span></div><div class="col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center score bd_time_mobile" data-v-ca01b51a${_scopeId}><i class="injury fulltime_mobile" data-v-ca01b51a${_scopeId}><text data-v-ca01b51a${_scopeId}></text><text data-v-ca01b51a${_scopeId}>${("getStatusDisplayMobile" in _ctx ? _ctx.getStatusDisplayMobile : unref(getStatusDisplayMobile))(match, unref($t), timeZone.value) ?? ""}</text></i></div><div class="col-3 col-sm-3 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center conner_mobile" data-v-ca01b51a${_scopeId}><i class="icon iconfont icon-font-report3" data-v-ca01b51a${_scopeId}></i>`);
                      if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                        _push2(`<span id="hht" data-v-ca01b51a${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : "")}-${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : "")}</span>`);
                      } else {
                        _push2(`<!--[--> - <!--]-->`);
                      }
                      _push2(`</div><div class="col-8 col-sm-8 col-md-2 col-lg-2 text-end d-inline-block d-sm-inline-block d-md-none align-self-center" data-v-ca01b51a${_scopeId}><div class="row" data-v-ca01b51a${_scopeId}><div class="col-10 col-sm-10 text-start align-self-center" data-v-ca01b51a${_scopeId}><div id="ht" data-v-ca01b51a${_scopeId}>${ssrInterpolate((_c4 = match == null ? void 0 : match.home_team) == null ? void 0 : _c4.name)} `);
                      if (isShowRanking.value) {
                        _push2(`<span id="horder" class="team-hg" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_position) ? "[" + (match == null ? void 0 : match.home_position) + "]" : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if ((match == null ? void 0 : match.home_scores[3]) && isShowCardYellow.value) {
                        _push2(`<span class="yellow1 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[3]) ? match == null ? void 0 : match.home_scores[3] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if ((match == null ? void 0 : match.home_scores[2]) && isShowCardRed.value) {
                        _push2(`<span class="redcard1 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[2]) ? match == null ? void 0 : match.home_scores[2] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div><div id="gt" data-v-ca01b51a${_scopeId}>${ssrInterpolate((_d4 = match == null ? void 0 : match.away_team) == null ? void 0 : _d4.name)} `);
                      if ((match == null ? void 0 : match.away_scores[2]) && isShowCardRed.value) {
                        _push2(`<span class="redcard2 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[2]) ? match == null ? void 0 : match.away_scores[2] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if ((match == null ? void 0 : match.away_scores[3]) && isShowCardYellow.value) {
                        _push2(`<span class="yellow2 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[3]) ? match == null ? void 0 : match.away_scores[3] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if (isShowRanking.value) {
                        _push2(`<span id="gorder" class="team-hg" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_position) ? "[" + (match == null ? void 0 : match.away_position) + "]" : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div></div><div class="col-1 col-sm-1 text-center align-self-center" data-v-ca01b51a${_scopeId}>`);
                      if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                        _push2(`<span id="hht" data-v-ca01b51a${_scopeId}><p data-v-ca01b51a${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : "")}</p><p data-v-ca01b51a${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : "")}</p></span>`);
                      } else {
                        _push2(`<!--[--> - <!--]-->`);
                      }
                      _push2(`</div><div class="col-1 col-sm-1 text-center align-self-center" data-v-ca01b51a${_scopeId}><b data-v-ca01b51a${_scopeId}>`);
                      if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                        _push2(`<!--[--><p data-v-ca01b51a${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[0]) !== "undefined" ? match == null ? void 0 : match.home_scores[0] : "")}</p><p data-v-ca01b51a${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[0]) !== "undefined" ? match == null ? void 0 : match.away_scores[0] : "")}</p><!--]-->`);
                      } else {
                        _push2(`<!--[--> - <!--]-->`);
                      }
                      _push2(`</b></div></div></div><div id="ht" class="${ssrRenderClass([{ "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }, "text-end d-none d-sm-none d-md-inline-block align-self-center"])}" data-v-ca01b51a${_scopeId}>`);
                      if (isShowRanking.value) {
                        _push2(`<span id="horder" class="team-hg" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_position) ? "[" + (match == null ? void 0 : match.home_position) + "]" : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if ((match == null ? void 0 : match.home_scores[3]) && isShowCardYellow.value) {
                        _push2(`<span class="yellow1 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[3]) ? match == null ? void 0 : match.home_scores[3] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if ((match == null ? void 0 : match.home_scores[2]) && isShowCardRed.value) {
                        _push2(`<span class="redcard1 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.home_scores[2]) ? match == null ? void 0 : match.home_scores[2] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`<span class="team-name" data-v-ca01b51a${_scopeId}>${ssrInterpolate((_e4 = match == null ? void 0 : match.home_team) == null ? void 0 : _e4.name)}</span></div><div class="${ssrRenderClass([("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_END.includes(match == null ? void 0 : match.status) ? "red" : "blue", "handpoint col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center align-content-center height-100"])}" data-v-ca01b51a${_scopeId}><b data-v-ca01b51a${_scopeId}>`);
                      if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                        _push2(`<!--[-->${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[0]) !== "undefined" ? match == null ? void 0 : match.home_scores[0] : "")} - ${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[0]) !== "undefined" ? match == null ? void 0 : match.away_scores[0] : "")}<!--]-->`);
                      } else {
                        _push2(`<!--[--> - <!--]-->`);
                      }
                      _push2(`</b></div><div id="gt" class="${ssrRenderClass([{ "col-md-2 col-lg-2": isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value, "col-md-3 col-lg-3": !(isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) }, "d-none d-sm-none d-md-inline-block align-self-center"])}" data-v-ca01b51a${_scopeId}><span class="team-name" data-v-ca01b51a${_scopeId}>${ssrInterpolate((_f4 = match == null ? void 0 : match.away_team) == null ? void 0 : _f4.name)}</span>`);
                      if ((match == null ? void 0 : match.away_scores[2]) && isShowCardRed.value) {
                        _push2(`<span class="redcard2 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[2]) ? match == null ? void 0 : match.away_scores[2] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if ((match == null ? void 0 : match.away_scores[3]) && isShowCardYellow.value) {
                        _push2(`<span class="yellow2 mx-1" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_scores[3]) ? match == null ? void 0 : match.away_scores[3] : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      if (isShowRanking.value) {
                        _push2(`<span id="gorder" class="team-hg" data-v-ca01b51a${_scopeId}>${ssrInterpolate((match == null ? void 0 : match.away_position) ? "[" + (match == null ? void 0 : match.away_position) + "]" : "")}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" data-v-ca01b51a${_scopeId}>`);
                      if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                        _push2(`<span id="cr" class="conner_span" data-v-ca01b51a${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[4]) !== "undefined" ? match == null ? void 0 : match.home_scores[4] : "")}-${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[4]) !== "undefined" ? match == null ? void 0 : match.away_scores[4] : "")}</span>`);
                      } else {
                        _push2(`<!--[--> - <!--]-->`);
                      }
                      _push2(`</div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" data-v-ca01b51a${_scopeId}>`);
                      if (![...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_START, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE].includes(match == null ? void 0 : match.status)) {
                        _push2(`<span id="hht" style="${ssrRenderStyle({ "display": "block" })}" data-v-ca01b51a${_scopeId}>${ssrInterpolate(typeof (match == null ? void 0 : match.home_scores[1]) !== "undefined" ? match == null ? void 0 : match.home_scores[1] : "")}-${ssrInterpolate(typeof (match == null ? void 0 : match.away_scores[1]) !== "undefined" ? match == null ? void 0 : match.away_scores[1] : "")}</span>`);
                      } else {
                        _push2(`<!--[--> - <!--]-->`);
                      }
                      _push2(`</div><div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center toolimg" data-v-ca01b51a${_scopeId}><span class="analyze-icon l0" data-v-ca01b51a${_scopeId}><i class="icon iconfont icon-analysis"${ssrRenderAttr("title", unref($t)("Analysis"))} data-v-ca01b51a${_scopeId}></i></span>`);
                      if ((props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE || (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).FAVORITES) {
                        _push2(`<span${ssrRenderAttr("id", "flashSpan_" + (match == null ? void 0 : match.id))} class="matchdata-iconpc l0" data-v-ca01b51a${_scopeId}><span${ssrRenderAttr("title", unref($t)("Data"))} class="${ssrRenderClass([(match == null ? void 0 : match.id) === matchActiveLiveFlash.value ? "on" : "", "icon icon-pc icon-matchdata-pc"])}" data-v-ca01b51a${_scopeId}></span></span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div>`);
                      if ((isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) && ((props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE || (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).FAVORITES)) {
                        _push2(`<div class="col-4 col-sm-4 col-md-2 col-lg-2 align-self-center oddstd" data-v-ca01b51a${_scopeId}><div class="text-center oddstd-grid" style="${ssrRenderStyle({ "min-height": "42px" })}" data-v-ca01b51a${_scopeId}>`);
                        _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
                        _push2(`</div></div>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div><div class="table_matchdata p-0" data-v-ca01b51a${_scopeId}>`);
                      if ((match == null ? void 0 : match.id) === matchActiveLiveFlash.value) {
                        _push2(`<div${ssrRenderAttr("id", "trF_" + (match == null ? void 0 : match.id))} bgcolor="#FFFFFF" data-v-ca01b51a${_scopeId}><div colspan="13" align="center" height="18"${ssrRenderAttr("id", "flashLive_" + (match == null ? void 0 : match.id))} data-v-ca01b51a${_scopeId}><div class="ant row" data-v-ca01b51a${_scopeId}><div class="flash col-6 p-0" data-v-ca01b51a${_scopeId}><div class="nodata" data-v-ca01b51a${_scopeId}>`);
                        _push2(ssrRenderComponent(_component_Loading, null, null, _parent2, _scopeId));
                        _push2(`</div><iframe id="flash"${ssrRenderAttr("src", "https://tracker.sportdb.live/?code=" + keyEncode.value + "&id=" + (match == null ? void 0 : match.id) + "&lang=" + ((_g4 = unref(useLocale)) == null ? void 0 : _g4.defaultLocale))} onload="this.previousSibling.style.display=&#39;none&#39;" data-v-ca01b51a${_scopeId}></iframe></div><div class="matchdata col-6 p-0" data-v-ca01b51a${_scopeId}><div class="databtns" data-v-ca01b51a${_scopeId}><div class="btns" id="divBtns" data-v-ca01b51a${_scopeId}><span class="${ssrRenderClass([{ "on": activeSection.value === "scoredConceded" }, "btn_scoredconceded"])}" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("Scored conceded"))}</span><span class="${ssrRenderClass([{ "on": activeSection.value === "recentStatus" }, "btn_recentstatus"])}" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("Recent status"))}</span></div></div><div class="recentStatus" id="recentStatus" style="${ssrRenderStyle(activeSection.value === "recentStatus" ? null : { display: "none" })}" data-v-ca01b51a${_scopeId}><div class="liveBox mx2" data-v-ca01b51a${_scopeId}>`);
                        if (((_i4 = matchRecentResult.value) == null ? void 0 : _i4[(_h4 = match == null ? void 0 : match.home_team) == null ? void 0 : _h4.id]) || ((_k4 = matchRecentResult.value) == null ? void 0 : _k4[(_j4 = match == null ? void 0 : match.away_team) == null ? void 0 : _j4.id])) {
                          _push2(`<!--[--><div class="lb-title" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("Recent 6"))}</div><div class="lb-ms" data-v-ca01b51a${_scopeId}><span class="homeSix" data-v-ca01b51a${_scopeId}>${((_m3 = matchRecentResult.value) == null ? void 0 : _m3[(_l4 = match == null ? void 0 : match.home_team) == null ? void 0 : _l4.id]) ?? ""}</span><span class="lb-m" data-v-ca01b51a${_scopeId}><span data-v-ca01b51a${_scopeId}></span></span><span class="guestSix" data-v-ca01b51a${_scopeId}>${((_o3 = matchRecentResult.value) == null ? void 0 : _o3[(_n3 = match == null ? void 0 : match.away_team) == null ? void 0 : _n3.id]) ?? ""}</span></div><!--]-->`);
                        } else {
                          _push2(`<!---->`);
                        }
                        if ((_p3 = matchSummary.value) == null ? void 0 : _p3.stats) {
                          _push2(`<ul data-v-ca01b51a${_scopeId}><li data-v-ca01b51a${_scopeId}><!--[-->`);
                          ssrRenderList((_q3 = matchSummary.value) == null ? void 0 : _q3.stats, (stat, index2) => {
                            _push2(`<!--[--><div class="lb-td1" data-v-ca01b51a${_scopeId}><span class="left red" data-v-ca01b51a${_scopeId}>${ssrInterpolate(stat == null ? void 0 : stat.home)}</span><span class="center" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)(("getStats" in _ctx ? _ctx.getStats : unref(getStats))(stat == null ? void 0 : stat.type)))}</span><span class="right" data-v-ca01b51a${_scopeId}>${ssrInterpolate(stat == null ? void 0 : stat.away)}</span></div><div class="lb-td2" data-v-ca01b51a${_scopeId}><span class="home-w" data-v-ca01b51a${_scopeId}><span class="home-bar" style="${ssrRenderStyle("width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.home) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%")}" data-v-ca01b51a${_scopeId}></span></span><span class="guest-w" data-v-ca01b51a${_scopeId}><span class="guest-bar" style="${ssrRenderStyle("width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.away) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%")}" data-v-ca01b51a${_scopeId}></span></span></div><!--]-->`);
                          });
                          _push2(`<!--]--></li></ul>`);
                        } else {
                          _push2(`<!---->`);
                        }
                        _push2(`</div></div><div class="guessBox scoredConceded" id="guessDiv" style="${ssrRenderStyle(activeSection.value === "scoredConceded" ? null : { display: "none" })}" data-v-ca01b51a${_scopeId}><table width="100%" data-v-ca01b51a${_scopeId}><tbody data-v-ca01b51a${_scopeId}><tr data-v-ca01b51a${_scopeId}><th colspan="5" data-v-ca01b51a${_scopeId}><div class="cvd" data-v-ca01b51a${_scopeId}><div class="btns" data-v-ca01b51a${_scopeId}><span class="${ssrRenderClass([{ "on": activeSectionTable.value === "ThirtyGames" }, "thirtygames"])}" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("20 matches"))}</span></div></div></th></tr></tbody></table><table width="100%" cellspacing="1" cellpadding="0" id="JSQ_2404596_30" class="ThirtyGames" style="${ssrRenderStyle(activeSectionTable.value === "ThirtyGames" ? null : { display: "none" })}" data-v-ca01b51a${_scopeId}><tbody data-v-ca01b51a${_scopeId}><tr data-v-ca01b51a${_scopeId}><td width="20%" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("Home"))}</td><td width="20%" class="y" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("Minute"))}</td><td width="20%" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("Away"))}</td></tr>`);
                        if (((_t3 = (_s3 = (_r3 = matchesAnalysis.value) == null ? void 0 : _r3.home_shoot_time) == null ? void 0 : _s3[0]) == null ? void 0 : _t3.length) > 0) {
                          _push2(`<!--[-->`);
                          ssrRenderList((_v2 = (_u3 = matchesAnalysis.value) == null ? void 0 : _u3.home_shoot_time) == null ? void 0 : _v2[0], (value, index2) => {
                            var _a5, _b5, _c5, _d5, _e5, _f5, _g5, _h5, _i5, _j5;
                            _push2(`<tr data-v-ca01b51a${_scopeId}><td data-v-ca01b51a${_scopeId}>${ssrInterpolate(((_a5 = shootTime.value) == null ? void 0 : _a5["sumHome"]) > 0 ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(value) * 100 / ((_b5 = shootTime.value) == null ? void 0 : _b5["sumHome"])).toFixed(0) : "0")}%</td>`);
                            if (index2 === 4) {
                              _push2(`<td class="y" data-v-ca01b51a${_scopeId}>41~45</td>`);
                            } else if (index2 === 5) {
                              _push2(`<td class="y" data-v-ca01b51a${_scopeId}>46~50</td>`);
                            } else {
                              _push2(`<td class="y" data-v-ca01b51a${_scopeId}>`);
                              if (index2 < 4) {
                                _push2(`<span data-v-ca01b51a${_scopeId}>${ssrInterpolate(10 * index2 + 1)}~${ssrInterpolate(10 * (index2 + 1))}</span>`);
                              } else {
                                _push2(`<span data-v-ca01b51a${_scopeId}>${ssrInterpolate(10 * (index2 - 1) + 1)}~${ssrInterpolate(10 * index2)}</span>`);
                              }
                              _push2(`</td>`);
                            }
                            _push2(`<td data-v-ca01b51a${_scopeId}>${ssrInterpolate(((_c5 = shootTime.value) == null ? void 0 : _c5["sumAway"]) > 0 ? ((_f5 = (_e5 = (_d5 = matchesAnalysis.value) == null ? void 0 : _d5.away_shoot_time) == null ? void 0 : _e5[0]) == null ? void 0 : _f5[index2]) ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))((_i5 = (_h5 = (_g5 = matchesAnalysis.value) == null ? void 0 : _g5.away_shoot_time) == null ? void 0 : _h5[0]) == null ? void 0 : _i5[index2]) * 100 / ((_j5 = shootTime.value) == null ? void 0 : _j5["sumAway"])).toFixed(0) : "0" : "0")}% </td></tr>`);
                          });
                          _push2(`<!--]-->`);
                        } else {
                          _push2(`<tr data-v-ca01b51a${_scopeId}><td colspan="3" data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("Empty Data"))}</td></tr>`);
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
                                title: unref($t)("Follow the match"),
                                onClick: withModifiers(($event) => addFavourites(match == null ? void 0 : match.id), ["prevent"])
                              }, null, 8, ["title", "onClick"]), [
                                [vShow, !((_w2 = favouritesList.value) == null ? void 0 : _w2.includes(match == null ? void 0 : match.id))]
                              ]),
                              withDirectives(createVNode("i", {
                                class: "icon iconfont favM on icon-font-collect-on add-info2",
                                onClick: withModifiers(($event) => removeFavourites(match == null ? void 0 : match.id), ["prevent"])
                              }, null, 8, ["onClick"]), [
                                [vShow, (_x2 = favouritesList.value) == null ? void 0 : _x2.includes(match == null ? void 0 : match.id)]
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
                              innerHTML: ("getStatusDisplay" in _ctx ? _ctx.getStatusDisplay : unref(getStatusDisplay))(match, unref($t), timeZone.value)
                            }, null, 8, ["innerHTML"]),
                            ("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).NOT_LIVE.includes(match.status) ? (openBlock(), createBlock("div", {
                              key: 0,
                              style: { "font-size": "12px", "color": "var(--secondary)" }
                            }, toDisplayString(match.status === "12" ? "" : unref($t)("Postpone")), 1)) : createCommentVNode("", true)
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
                              style: { "font-size": "12px", "color": "var(--secondary)", "margin-left": "3px" }
                            }, toDisplayString(match.status === "12" ? "" : unref($t)("Postpone")), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center" }, [
                            createVNode("span", { class: "hafttime_mobile" })
                          ]),
                          createVNode("div", { class: "col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center score bd_time_mobile" }, [
                            createVNode("i", { class: "injury fulltime_mobile" }, [
                              createVNode("text"),
                              createVNode("text", {
                                innerHTML: ("getStatusDisplayMobile" in _ctx ? _ctx.getStatusDisplayMobile : unref(getStatusDisplayMobile))(match, unref($t), timeZone.value)
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
                          createVNode("div", { class: "col-8 col-sm-8 col-md-2 col-lg-2 text-end d-inline-block d-sm-inline-block d-md-none align-self-center" }, [
                            createVNode("div", { class: "row" }, [
                              createVNode("div", { class: "col-10 col-sm-10 text-start align-self-center" }, [
                                createVNode("div", { id: "ht" }, [
                                  createTextVNode(toDisplayString((_y2 = match == null ? void 0 : match.home_team) == null ? void 0 : _y2.name) + " ", 1),
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
                                  createTextVNode(toDisplayString((_z2 = match == null ? void 0 : match.away_team) == null ? void 0 : _z2.name) + " ", 1),
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
                            createVNode("span", { class: "team-name" }, toDisplayString((_A2 = match == null ? void 0 : match.home_team) == null ? void 0 : _A2.name), 1)
                          ], 2),
                          createVNode("div", {
                            class: ["handpoint col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center align-content-center height-100", ("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_END.includes(match == null ? void 0 : match.status) ? "red" : "blue"],
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
                            createVNode("span", { class: "team-name" }, toDisplayString((_B2 = match == null ? void 0 : match.away_team) == null ? void 0 : _B2.name), 1),
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
                              onClick: withModifiers(($event) => ("locationHref" in _ctx ? _ctx.locationHref : unref(locationHref))(("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + (match == null ? void 0 : match.id) + "?tab=h2h"), ["prevent"])
                            }, [
                              createVNode("i", {
                                class: "icon iconfont icon-analysis",
                                title: unref($t)("Analysis")
                              }, null, 8, ["title"])
                            ], 8, ["onClick"]),
                            (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE || (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).FAVORITES ? (openBlock(), createBlock("span", {
                              key: 0,
                              id: "flashSpan_" + (match == null ? void 0 : match.id),
                              class: "matchdata-iconpc l0",
                              onClick: withModifiers(($event) => toggleSubInfoSport($event, match), ["prevent"])
                            }, [
                              createVNode("span", {
                                class: ["icon icon-pc icon-matchdata-pc", (match == null ? void 0 : match.id) === matchActiveLiveFlash.value ? "on" : ""],
                                title: unref($t)("Data")
                              }, null, 10, ["title"])
                            ], 8, ["id", "onClick"])) : createCommentVNode("", true)
                          ]),
                          (isShowOddsHDP.value || isShowOddsTX.value || isShowOdds1X2.value) && ((props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE || (props == null ? void 0 : props.page) === ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).FAVORITES) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "col-4 col-sm-4 col-md-2 col-lg-2 align-self-center oddstd",
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
                                    src: "https://tracker.sportdb.live/?code=" + keyEncode.value + "&id=" + (match == null ? void 0 : match.id) + "&lang=" + ((_C2 = unref(useLocale)) == null ? void 0 : _C2.defaultLocale),
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
                                      }, toDisplayString(unref($t)("Scored conceded")), 11, ["onClick"]),
                                      createVNode("span", {
                                        class: ["btn_recentstatus", { "on": activeSection.value === "recentStatus" }],
                                        onClick: withModifiers(($event) => setActiveSection($event, match, "recentStatus"), ["prevent"])
                                      }, toDisplayString(unref($t)("Recent status")), 11, ["onClick"])
                                    ])
                                  ]),
                                  withDirectives(createVNode("div", {
                                    class: "recentStatus",
                                    id: "recentStatus"
                                  }, [
                                    createVNode("div", { class: "liveBox mx2" }, [
                                      ((_E2 = matchRecentResult.value) == null ? void 0 : _E2[(_D2 = match == null ? void 0 : match.home_team) == null ? void 0 : _D2.id]) || ((_G2 = matchRecentResult.value) == null ? void 0 : _G2[(_F2 = match == null ? void 0 : match.away_team) == null ? void 0 : _F2.id]) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                        createVNode("div", { class: "lb-title" }, toDisplayString(unref($t)("Recent 6")), 1),
                                        createVNode("div", { class: "lb-ms" }, [
                                          createVNode("span", {
                                            class: "homeSix",
                                            innerHTML: (_I2 = matchRecentResult.value) == null ? void 0 : _I2[(_H2 = match == null ? void 0 : match.home_team) == null ? void 0 : _H2.id]
                                          }, null, 8, ["innerHTML"]),
                                          createVNode("span", { class: "lb-m" }, [
                                            createVNode("span")
                                          ]),
                                          createVNode("span", {
                                            class: "guestSix",
                                            innerHTML: (_K2 = matchRecentResult.value) == null ? void 0 : _K2[(_J2 = match == null ? void 0 : match.away_team) == null ? void 0 : _J2.id]
                                          }, null, 8, ["innerHTML"])
                                        ])
                                      ], 64)) : createCommentVNode("", true),
                                      ((_L2 = matchSummary.value) == null ? void 0 : _L2.stats) ? (openBlock(), createBlock("ul", { key: 1 }, [
                                        createVNode("li", null, [
                                          (openBlock(true), createBlock(Fragment, null, renderList((_M2 = matchSummary.value) == null ? void 0 : _M2.stats, (stat, index2) => {
                                            return openBlock(), createBlock(Fragment, { key: index2 }, [
                                              createVNode("div", { class: "lb-td1" }, [
                                                createVNode("span", { class: "left red" }, toDisplayString(stat == null ? void 0 : stat.home), 1),
                                                createVNode("span", { class: "center" }, toDisplayString(unref($t)(("getStats" in _ctx ? _ctx.getStats : unref(getStats))(stat == null ? void 0 : stat.type))), 1),
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
                                                }, toDisplayString(unref($t)("20 matches")), 11, ["onClick"])
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
                                          createVNode("td", { width: "20%" }, toDisplayString(unref($t)("Home")), 1),
                                          createVNode("td", {
                                            width: "20%",
                                            class: "y"
                                          }, toDisplayString(unref($t)("Minute")), 1),
                                          createVNode("td", { width: "20%" }, toDisplayString(unref($t)("Away")), 1)
                                        ]),
                                        ((_P2 = (_O2 = (_N2 = matchesAnalysis.value) == null ? void 0 : _N2.home_shoot_time) == null ? void 0 : _O2[0]) == null ? void 0 : _P2.length) > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList((_R2 = (_Q2 = matchesAnalysis.value) == null ? void 0 : _Q2.home_shoot_time) == null ? void 0 : _R2[0], (value, index2) => {
                                          var _a5, _b5, _c5, _d5, _e5, _f5, _g5, _h5, _i5, _j5;
                                          return openBlock(), createBlock("tr", { key: index2 }, [
                                            createVNode("td", null, toDisplayString(((_a5 = shootTime.value) == null ? void 0 : _a5["sumHome"]) > 0 ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(value) * 100 / ((_b5 = shootTime.value) == null ? void 0 : _b5["sumHome"])).toFixed(0) : "0") + "%", 1),
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
                                            createVNode("td", null, toDisplayString(((_c5 = shootTime.value) == null ? void 0 : _c5["sumAway"]) > 0 ? ((_f5 = (_e5 = (_d5 = matchesAnalysis.value) == null ? void 0 : _d5.away_shoot_time) == null ? void 0 : _e5[0]) == null ? void 0 : _f5[index2]) ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))((_i5 = (_h5 = (_g5 = matchesAnalysis.value) == null ? void 0 : _g5.away_shoot_time) == null ? void 0 : _h5[0]) == null ? void 0 : _i5[index2]) * 100 / ((_j5 = shootTime.value) == null ? void 0 : _j5["sumAway"])).toFixed(0) : "0" : "0") + "% ", 1)
                                          ]);
                                        }), 128)) : (openBlock(), createBlock("tr", { key: 1 }, [
                                          createVNode("td", { colspan: "3" }, toDisplayString(unref($t)("Empty Data")), 1)
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
        _push(`<!--]--><div data-v-ca01b51a><div colspan="11" data-v-ca01b51a><p class="text-center mb-5 load-more-data" data-v-ca01b51a></p></div></div>`);
        if (matchsListLength.value === 0 && (props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).MATCHES) {
          _push(`<div id="noFavTip" data-v-ca01b51a><div class="no_fav_data" data-v-ca01b51a><div id="nodatatip" class="no_data" data-v-ca01b51a><p class="title" data-v-ca01b51a>${ssrInterpolate(unref($t)("Favorites the match"))}</p><p class="" data-v-ca01b51a>${ssrInterpolate(unref($t)("Click the check mark"))} <i class="icon iconfont icon-font-collect-off" data-v-ca01b51a></i> ${ssrInterpolate(unref($t)("To follow the match"))}</p><p data-v-ca01b51a><span class="searchbtn" data-v-ca01b51a><i class="icon iconfont icon-font-search" data-v-ca01b51a></i>${ssrInterpolate(unref($t)("Find a match"))}</span></p></div></div></div>`);
        } else if (matchsListLength.value === 0 && (props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).LEAGUES) {
          _push(`<div id="noFavTip" data-v-ca01b51a><div class="no_fav_data" data-v-ca01b51a><div id="nodatatip" class="no_data" data-v-ca01b51a><p class="title" data-v-ca01b51a>${ssrInterpolate(unref($t)("Favorites the league"))}</p><p class="" data-v-ca01b51a>${ssrInterpolate(unref($t)("Click the check mark"))} <i class="icon iconfont icon-font-collect-off" data-v-ca01b51a></i> ${ssrInterpolate(unref($t)("To follow the league"))}</p><p data-v-ca01b51a><span class="searchbtn" data-v-ca01b51a><i class="icon iconfont icon-font-search" data-v-ca01b51a></i>${ssrInterpolate(unref($t)("Find a league"))}</span></p></div></div></div>`);
        } else if (matchsListLength.value === 0 && (props == null ? void 0 : props.favorites) === ("FAVORITES_TYPE" in _ctx ? _ctx.FAVORITES_TYPE : unref(FAVORITES_TYPE)).TEAMS) {
          _push(`<div id="noFavTip" data-v-ca01b51a><div class="no_fav_data" data-v-ca01b51a><div id="nodatatip" class="no_data" data-v-ca01b51a><p class="title" data-v-ca01b51a>${ssrInterpolate(unref($t)("Favorites the team"))}</p><p class="" data-v-ca01b51a>${ssrInterpolate(unref($t)("Click the check mark"))} <i class="icon iconfont icon-font-collect-off" data-v-ca01b51a></i> ${ssrInterpolate(unref($t)("To follow the team"))}</p><p data-v-ca01b51a><span class="searchbtn" data-v-ca01b51a><i class="icon iconfont icon-font-search" data-v-ca01b51a></i>${ssrInterpolate(unref($t)("Find a team"))}</span></p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
      if (!unref(isHidden)) {
        _push(`<div id="content-page" class="${ssrRenderClass(expand.value ? "content-expand" : "content-collapse")}" style="${ssrRenderStyle(showContentPage.value ? null : { display: "none" })}" data-v-ca01b51a>${unref(formattedContentPage) ?? ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(formattedContentPage) && showContentPage.value && !unref(isHidden) && (props.h1 || props.content)) {
        _push(`<p id="readmorecontent" class="readmore-content item-align-right me-3 mt-3" data-v-ca01b51a><span data-v-ca01b51a>${ssrInterpolate(expand.value ? unref($t)("Collapse") : unref($t)("Read more"))}</span></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span></div></div>`);
      if (showWinScore.value && !unref($isMobile)) {
        _push(`<div id="winScore" class="scoretab" style="${ssrRenderStyle({ position: "absolute", top: winScorePosition.value.top, left: winScorePosition.value.left, zIndex: 100 })}" data-v-ca01b51a><div class="closebtn" data-v-ca01b51a><span data-v-ca01b51a></span></div><table width="500" cellpadding="0" cellspacing="1" class="odds-table-bg" data-v-ca01b51a><tbody data-v-ca01b51a><tr data-v-ca01b51a><td height="20" colspan="5" class="hand-bg" data-v-ca01b51a><span color="white" data-v-ca01b51a><b data-v-ca01b51a>${ssrInterpolate(unref($t)("Match data"))}</b></span></td></tr><tr class="jqSubTitle" data-v-ca01b51a><td height="20" width="44%" data-v-ca01b51a><span data-v-ca01b51a><b data-v-ca01b51a>${ssrInterpolate((_D = (_C = (_B = matchSummary.value) == null ? void 0 : _B.match) == null ? void 0 : _C.home_team) == null ? void 0 : _D.name)}</b></span></td><td width="12%" data-v-ca01b51a><b data-v-ca01b51a>${ssrInterpolate(unref($t)("Minute"))}</b></td><td width="44%" data-v-ca01b51a><span data-v-ca01b51a><b data-v-ca01b51a>${ssrInterpolate((_G = (_F = (_E = matchSummary.value) == null ? void 0 : _E.match) == null ? void 0 : _F.away_team) == null ? void 0 : _G.name)}</b></span></td></tr><!--[-->`);
        ssrRenderList((_H = matchSummary.value) == null ? void 0 : _H.incidents, (incident, index) => {
          _push(`<!--[-->`);
          if ([1, 3, 4, 9].includes(incident == null ? void 0 : incident.type)) {
            _push(`<tr data-v-ca01b51a><td height="18" class="white-bg right" style="${ssrRenderStyle({ "padding": "0 2px" })}" data-v-ca01b51a>${("getIncidents" in _ctx ? _ctx.getIncidents : unref(getIncidents))(incident, 1) ?? ""}</td><td width="12%" class="gray-bg2" data-v-ca01b51a>${ssrInterpolate(incident == null ? void 0 : incident.time)}&#39;</td><td class="white-bg left" data-v-ca01b51a>${("getIncidentsRight" in _ctx ? _ctx.getIncidentsRight : unref(getIncidentsRight))(incident, 2) ?? ""}</td></tr>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></tbody></table><table width="100%" cellpadding="0" cellspacing="1" class="odds-table-bg" data-v-ca01b51a><tbody data-v-ca01b51a><tr data-v-ca01b51a><td height="20" colspan="3" class="hand-bg" data-v-ca01b51a><span color="white" data-v-ca01b51a><b data-v-ca01b51a>${ssrInterpolate(unref($t)("Statistical"))}</b></span></td></tr><!--[-->`);
        ssrRenderList((_I = matchSummary.value) == null ? void 0 : _I.stats, (stat, index) => {
          _push(`<!--[-->`);
          if ([21, 22, 25].includes(stat == null ? void 0 : stat.type)) {
            _push(`<tr height="18" class="white-bg" data-v-ca01b51a><td width="25%" data-v-ca01b51a>${ssrInterpolate(stat == null ? void 0 : stat.home)}</td><td class="gray-bg2" data-v-ca01b51a>${ssrInterpolate(unref($t)(("getStats" in _ctx ? _ctx.getStats : unref(getStats))(stat == null ? void 0 : stat.type)))}</td><td width="25%" data-v-ca01b51a>${ssrInterpolate(stat == null ? void 0 : stat.away)}</td></tr>`);
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
        _push(`<div id="sbOddsCorner" class="livetab" style="${ssrRenderStyle({ position: "absolute", top: winScorePositionCorner.value.top, left: winScorePositionCorner.value.left, zIndex: 100 })}" data-v-ca01b51a><div class="closebtn" data-v-ca01b51a><span data-v-ca01b51a></span></div><table width="100%" cellpadding="0" cellspacing="1" id="tab_CornerOdds" class="odds-table-bg2" data-v-ca01b51a><tbody data-v-ca01b51a><tr data-v-ca01b51a><td colspan="2" data-v-ca01b51a><div class="jqTitle" data-v-ca01b51a>${ssrInterpolate(unref($t)("Corner kick"))}</div></td></tr><tr class="jqSubTitle" data-v-ca01b51a><td style="${ssrRenderStyle({ "width": "50%" })}" data-v-ca01b51a>${ssrInterpolate((_K = (_J = matchHover.value) == null ? void 0 : _J.home_team) == null ? void 0 : _K.name)}</td><td style="${ssrRenderStyle({ "width": "50%" })}" data-v-ca01b51a>${ssrInterpolate((_M = (_L = matchHover.value) == null ? void 0 : _L.away_team) == null ? void 0 : _M.name)}</td></tr></tbody></table><div class="info" id="div_cornerOdds" data-v-ca01b51a><div class="jqSubTitle2" data-v-ca01b51a><span${ssrRenderAttr("title", unref($t)("Handicap"))} data-v-ca01b51a>HDP</span><span${ssrRenderAttr("title", unref($t)("HanOver/Underdicap"))} data-v-ca01b51a>T/X</span></div><table width="100%" cellpadding="0" cellspacing="1" id="tab_CornerOdds" class="odds-table-bg2" data-v-ca01b51a><tbody data-v-ca01b51a><tr data-v-ca01b51a><td width="56" class="white-bg" data-v-ca01b51a>${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_P = (_O = (_N = matchOddsCorner.value) == null ? void 0 : _N.hadicap) == null ? void 0 : _O[0]) == null ? void 0 : _P.initial, 1))}</td><td width="56" class="white-bg" data-v-ca01b51a>${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_S = (_R = (_Q = matchOddsCorner.value) == null ? void 0 : _Q.hadicap) == null ? void 0 : _R[0]) == null ? void 0 : _S.initial, 0))}</td><td width="56" class="white-bg" data-v-ca01b51a>${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_V = (_U = (_T = matchOddsCorner.value) == null ? void 0 : _T.hadicap) == null ? void 0 : _U[0]) == null ? void 0 : _V.initial, 2))}</td><td class="gray-bg2" width="62" data-v-ca01b51a>${ssrInterpolate(unref($t)("Haft time"))}</td><td width="56" class="white-bg" data-v-ca01b51a>${ssrInterpolate((_Z = (_Y = (_X = (_W = matchOddsCorner.value) == null ? void 0 : _W.corner) == null ? void 0 : _X.early) == null ? void 0 : _Y[0]) == null ? void 0 : _Z.over)}</td><td width="56" class="white-bg" data-v-ca01b51a>${ssrInterpolate((_ba = (_aa = (_$ = (__ = matchOddsCorner.value) == null ? void 0 : __.corner) == null ? void 0 : _$.early) == null ? void 0 : _aa[0]) == null ? void 0 : _ba.total_corners)}</td><td width="56" class="white-bg" data-v-ca01b51a>${ssrInterpolate((_fa = (_ea = (_da = (_ca = matchOddsCorner.value) == null ? void 0 : _ca.corner) == null ? void 0 : _da.early) == null ? void 0 : _ea[0]) == null ? void 0 : _fa.under)}</td></tr><tr data-v-ca01b51a><td class="handOdds" data-v-ca01b51a>${ssrInterpolate(((_ga = matchHover.value) == null ? void 0 : _ga.status) === 1 ? ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_ja = (_ia = (_ha = matchOddsCorner.value) == null ? void 0 : _ha.hadicap) == null ? void 0 : _ia[0]) == null ? void 0 : _ja.instant, 1) : ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_ma = (_la = (_ka = matchOddsCorner.value) == null ? void 0 : _ka.hadicap) == null ? void 0 : _la[0]) == null ? void 0 : _ma.inplay, 1))}</td><td class="handOdds" data-v-ca01b51a>${ssrInterpolate(((_na = matchHover.value) == null ? void 0 : _na.status) === 1 ? ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_qa = (_pa = (_oa = matchOddsCorner.value) == null ? void 0 : _oa.hadicap) == null ? void 0 : _pa[0]) == null ? void 0 : _qa.instant, 0) : ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_ta = (_sa = (_ra = matchOddsCorner.value) == null ? void 0 : _ra.hadicap) == null ? void 0 : _sa[0]) == null ? void 0 : _ta.inplay, 0))}</td><td class="handOdds" data-v-ca01b51a>${ssrInterpolate(((_ua = matchHover.value) == null ? void 0 : _ua.status) === 1 ? ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_xa = (_wa = (_va = matchOddsCorner.value) == null ? void 0 : _va.hadicap) == null ? void 0 : _wa[0]) == null ? void 0 : _xa.instant, 2) : ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_Aa = (_za = (_ya = matchOddsCorner.value) == null ? void 0 : _ya.hadicap) == null ? void 0 : _za[0]) == null ? void 0 : _Aa.inplay, 2))}</td><td class="gray-bg2" data-v-ca01b51a>${ssrInterpolate(unref($t)("Live"))}</td><td class="handOdds" data-v-ca01b51a><div class="" data-v-ca01b51a>${ssrInterpolate((_Ea = (_Da = (_Ca = (_Ba = matchOddsCorner.value) == null ? void 0 : _Ba.corner) == null ? void 0 : _Ca.live) == null ? void 0 : _Da[0]) == null ? void 0 : _Ea.over)}</div></td><td class="handOdds" data-v-ca01b51a>${ssrInterpolate((_Ia = (_Ha = (_Ga = (_Fa = matchOddsCorner.value) == null ? void 0 : _Fa.corner) == null ? void 0 : _Ga.live) == null ? void 0 : _Ha[0]) == null ? void 0 : _Ia.total_corners)}</td><td class="handOdds" data-v-ca01b51a><div class="" data-v-ca01b51a>${ssrInterpolate((_Ma = (_La = (_Ka = (_Ja = matchOddsCorner.value) == null ? void 0 : _Ja.corner) == null ? void 0 : _Ka.live) == null ? void 0 : _La[0]) == null ? void 0 : _Ma.under)}</div></td></tr></tbody></table></div><div class="info" id="div_cornerDetail" style="${ssrRenderStyle({})}" data-v-ca01b51a><div class="jqTitle2" data-v-ca01b51a>${ssrInterpolate(unref($t)("Detail"))}</div><table id="tab_CornerDetail" width="100%" cellpadding="0" cellspacing="1" style="${ssrRenderStyle({ "margin-top": "-1px" })}" class="odds-table-bg2" data-v-ca01b51a><tbody data-v-ca01b51a><tr data-v-ca01b51a><td width="165" class="white-bg" data-v-ca01b51a>${ssrInterpolate(((_Na = matchCorner.value) == null ? void 0 : _Na.home_corner) ? (_Oa = matchCorner.value) == null ? void 0 : _Oa.home_corner : "0")}</td><td width="60" class="gray-bg2" data-v-ca01b51a>Cả trận</td><td class="white-bg" data-v-ca01b51a>${ssrInterpolate(((_Pa = matchCorner.value) == null ? void 0 : _Pa.away_corner) ? (_Qa = matchCorner.value) == null ? void 0 : _Qa.away_corner : "0")}</td></tr><tr data-v-ca01b51a><td class="white-bg" data-v-ca01b51a>${ssrInterpolate(((_Ra = matchCorner.value) == null ? void 0 : _Ra.home_haft_corner) ? (_Sa = matchCorner.value) == null ? void 0 : _Sa.home_haft_corner : "0")}</td><td class="gray-bg2" data-v-ca01b51a>${ssrInterpolate(unref($t)("Haft time"))}</td><td class="white-bg" data-v-ca01b51a>${ssrInterpolate(((_Ta = matchCorner.value) == null ? void 0 : _Ta.away_haft_corner) ? (_Ua = matchCorner.value) == null ? void 0 : _Ua.away_haft_corner : "0")}</td></tr><!--[-->`);
        ssrRenderList((_Va = matchCorner.value) == null ? void 0 : _Va.event_list, (cornerEvent, index) => {
          var _a3, _b3, _c3, _d3;
          _push(`<tr data-v-ca01b51a><td width="165" class="white-bg" data-v-ca01b51a>${("getCorner" in _ctx ? _ctx.getCorner : unref(getCorner))(cornerEvent, (_b3 = (_a3 = matchHover.value) == null ? void 0 : _a3.home_team) == null ? void 0 : _b3.i_team, 1) ?? ""}</td><td width="60" class="gray-bg2" data-v-ca01b51a>${ssrInterpolate(cornerEvent == null ? void 0 : cornerEvent.minute)}&#39;</td><td class="white-bg" data-v-ca01b51a>${("getCorner" in _ctx ? _ctx.getCorner : unref(getCorner))(cornerEvent, (_d3 = (_c3 = matchHover.value) == null ? void 0 : _c3.away_team) == null ? void 0 : _d3.i_team, 2) ?? ""}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showWinScoreOdds.value && !unref($isMobile)) {
        _push(`<div id="oddsChange" class="oddsdetail" style="${ssrRenderStyle({ position: "absolute", top: winScorePositionOdds.value.top, left: winScorePositionOdds.value.left, zIndex: 100 })}" data-v-ca01b51a><div class="closebtn" data-v-ca01b51a><span data-v-ca01b51a></span></div><table width="555" class="oddschanges m5" cellpadding="0" cellspacing="0" data-v-ca01b51a><tbody data-v-ca01b51a><tr class="position-relative" data-v-ca01b51a><b class="isport-name" data-v-ca01b51a>${ssrInterpolate(iCompanyName((_Wa = matchHover.value) == null ? void 0 : _Wa.i_company_id))}</b><td width="48%" class="white-bg2 odd-teamname fw-bold" style="${ssrRenderStyle({ "text-align": "right", "padding-right": "10px" })}" data-v-ca01b51a><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-end" })}" data-v-ca01b51a><div style="${ssrRenderStyle({ "max-width": "200px" })}" data-v-ca01b51a>${ssrInterpolate((_Ya = (_Xa = matchHover.value) == null ? void 0 : _Xa.home_team) == null ? void 0 : _Ya.name)}</div></div></td><td id="ffScoreDetail" sid="2419844" width="2%" class="white-bg2 odd-score" data-v-ca01b51a>VS</td><td width="48%" class="white-bg2 odd-teamname fw-bold" style="${ssrRenderStyle({ "text-align": "left", "padding": "0 20px 0 10px" })}" data-v-ca01b51a><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-start" })}" data-v-ca01b51a><div style="${ssrRenderStyle({ "max-width": "200px" })}" data-v-ca01b51a>${ssrInterpolate((__a = (_Za = matchHover.value) == null ? void 0 : _Za.away_team) == null ? void 0 : __a.name)}</div></div></td></tr></tbody></table><table id="ffOddsDetail" width="555px" class="oddschanges" cellpadding="0" cellspacing="1" style="${ssrRenderStyle({ "margin-bottom": "5px" })}" odds="" data-v-ca01b51a><tbody data-v-ca01b51a><tr data-v-ca01b51a><td width="15%" class="odd-bg1"${ssrRenderAttr("title", unref($t)("Full time"))} data-v-ca01b51a>FT</td><td colspan="3" class="gray" data-v-ca01b51a>${ssrInterpolate(unref($t)("Running"))}</td><td colspan="3" class="oddschanges-bg1"${ssrRenderAttr("title", unref($t)("Live instant"))} data-v-ca01b51a>TL</td><td colspan="3" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(unref($t)("Initial"))}</td></tr><tr data-v-ca01b51a><td class="odd-bg1" style="${ssrRenderStyle({ "padding": "0 4px" })}"${ssrRenderAttr("title", unref($t)("Handicap"))} data-v-ca01b51a><b data-v-ca01b51a>HDP</b></td><td width="8%" id="ah_run1" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "inplay", 1))}</td><td width="13%" id="ah_run2" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "inplay", 0))}</td><td width="8%" id="ah_run3" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "inplay", 2))}</td><td width="8%" id="ah_live1" class="oddschanges-bg1" data-v-ca01b51a>${("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "handicap", "instant", 1) ?? ""}</td><td width="13%" id="ah_live2" class="oddschanges-bg1" data-v-ca01b51a>${("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "handicap", "instant", 0) ?? ""}</td><td width="8%" id="ah_live3" class="oddschanges-bg1" data-v-ca01b51a>${("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "handicap", "instant", 2) ?? ""}</td><td width="8%" id="ah_first1" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 1))}</td><td width="13%" id="ah_first2" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(
          oddsDetail.value,
          "handicap",
          "initial",
          0
        ))}</td><td width="8%" id="ah_first3" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 2))}</td></tr><tr data-v-ca01b51a><td class="odd-bg1" style="${ssrRenderStyle({ "padding": "0 4px" })}"${ssrRenderAttr("title", unref($t)("Over/Under"))} data-v-ca01b51a><b data-v-ca01b51a>${ssrInterpolate(unref($t)("T/X"))}</b></td><td id="ou_run1" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "inplay", 1))}</td><td id="ou_run2" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "inplay", 0))}</td><td id="ou_run3" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "inplay", 2))}</td><td id="ou_live1" class="oddschanges-bg1" data-v-ca01b51a>${("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "overUnder", "instant", 1) ?? ""}</td><td id="ou_live2" class="oddschanges-bg1" data-v-ca01b51a>${("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "overUnder", "instant", 0) ?? ""}</td><td id="ou_live3" class="oddschanges-bg1" data-v-ca01b51a>${("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "overUnder", "instant", 2) ?? ""}</td><td id="ou_fist1" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 1))}</td><td id="ou_fist2" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 0))}</td><td id="ou_fist3" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 2))}</td></tr><tr data-v-ca01b51a><td class="odd-bg1" style="${ssrRenderStyle({ "padding": "0 4px" })}"${ssrRenderAttr("title", unref($t)("1x2"))} data-v-ca01b51a><b data-v-ca01b51a>${ssrInterpolate(unref($t)("1x2"))}</b></td><td id="1x2_run1" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "inplay", 0))}</td><td id="1x2_run2" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "inplay", 1))}</td><td id="1x2_run3" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "inplay", 2))}</td><td id="1x2_live1" class="oddschanges-bg1" data-v-ca01b51a>${("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "europeOdds", "instant", 0) ?? ""}</td><td id="1x2_live2" class="oddschanges-bg1" data-v-ca01b51a>${("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "europeOdds", "instant", 1) ?? ""}</td><td id="1x2_live3" class="oddschanges-bg1" data-v-ca01b51a>${("getDetailOddsChange" in _ctx ? _ctx.getDetailOddsChange : unref(getDetailOddsChange))(oddsDetail.value, "europeOdds", "instant", 2) ?? ""}</td><td id="1x2_fist1" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 0))}</td><td id="1x2_fist2" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 1))}</td><td id="1x2_fist3" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 2))}</td></tr><tr class="more" data-v-ca01b51a><td colspan="10" data-v-ca01b51a>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + ((_$a = matchHover.value) == null ? void 0 : _$a.id), query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP } }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("View more data"))}</span>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(unref($t)("View more data")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td></tr></tbody></table><table id="fhOddsDetail" width="555px" class="oddschanges" cellpadding="0" cellspacing="1" border="0" odds="0,0.50,1.42,1.14,6.60,8.20,1.5,4.16,0.10" data-v-ca01b51a><tbody data-v-ca01b51a><tr data-v-ca01b51a><td width="14%" class="odd-bg1"${ssrRenderAttr("title", unref($t)("Haft time"))} data-v-ca01b51a>HT</td><td colspan="3" class="gray" data-v-ca01b51a>${ssrInterpolate(unref($t)("Running"))}</td><td colspan="3" class="oddschanges-bg1"${ssrRenderAttr("title", unref($t)("Live instant"))} data-v-ca01b51a>TL</td><td colspan="3" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(unref($t)("Initial"))}</td></tr><tr data-v-ca01b51a><td class="odd-bg1" style="${ssrRenderStyle({ "padding": "0 4px" })}"${ssrRenderAttr("title", unref($t)("HDP"))} data-v-ca01b51a><b data-v-ca01b51a>${ssrInterpolate(unref($t)("HDP"))}</b></td><td id="ah_ht_run1" width="8%" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "inplay", 1))}</td><td id="ah_ht_run2" width="13%" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "inplay", 0))}</td><td id="ah_ht_run3" width="8%" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "inplay", 1))}</td><td id="ah_ht_live1" width="8%" class="oddschanges-bg1" data-v-ca01b51a><div class="" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "instant", 1))}</div></td><td id="ah_ht_live2" width="13%" class="oddschanges-bg1" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(
          oddsDetail.value,
          "handicapHalf",
          "instant",
          0
        ))}</td><td id="ah_ht_live3" width="8%" class="oddschanges-bg1" data-v-ca01b51a><div class="" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "instant", 2))}</div></td><td id="ah_ht_first1" width="8%" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(
          oddsDetail.value,
          "handicapHalf",
          "initial",
          1
        ))}</td><td id="ah_ht_first2" width="13%" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(
          oddsDetail.value,
          "handicapHalf",
          "initial",
          0
        ))}</td><td id="ah_ht_first3" width="8%" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(
          oddsDetail.value,
          "handicapHalf",
          "initial",
          1
        ))}</td></tr><tr data-v-ca01b51a><td class="odd-bg1" style="${ssrRenderStyle({ "padding": "0 4px" })}"${ssrRenderAttr("title", unref($t)("T/X"))} data-v-ca01b51a><b data-v-ca01b51a>${ssrInterpolate(unref($t)("T/X"))}</b></td><td id="ou_ht_run1" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "inplay", 1))}</td><td id="ou_ht_run2" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "inplay", 0))}</td><td id="ou_ht_run3" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "inplay", 2))}</td><td id="ou_ht_live1" class="oddschanges-bg1" data-v-ca01b51a><div class="" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "instant", 1))}</div></td><td id="ou_ht_live2" class="oddschanges-bg1" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "instant", 0))}</td><td id="ou_ht_live3" class="oddschanges-bg1" data-v-ca01b51a><div class="" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "instant", 2))}</div></td><td id="ou_ht_first1" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 1))}</td><td id="ou_ht_first2" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 0))}</td><td id="ou_ht_first3" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 2))}</td></tr><tr data-v-ca01b51a><td class="odd-bg1" style="${ssrRenderStyle({ "padding": "0 4px" })}"${ssrRenderAttr("title", unref($t)("1x2"))} data-v-ca01b51a><b data-v-ca01b51a>${ssrInterpolate(unref($t)("1x2"))}</b></td><td id="1x2_ht_run1" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "inplay", 0))}</td><td id="1x2_ht_run2" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "inplay", 1))}</td><td id="1x2_ht_run3" class="gray" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "inplay", 2))}</td><td id="1x2_ht_live1" class="oddschanges-bg1" data-v-ca01b51a><div class="" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "instant", 0))}</div></td><td id="1x2_ht_live2" class="oddschanges-bg1" data-v-ca01b51a><div class="" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "instant", 1))}</div></td><td id="1x2_ht_live3" class="oddschanges-bg1" data-v-ca01b51a><div class="" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "instant", 2))}</div></td><td id="1x2_ht_first1" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "initial", 0))}</td><td id="1x2_ht_first2" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "initial", 1))}</td><td id="1x2_ht_first3" class="oddschanges-bg2" data-v-ca01b51a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeanHaft", "initial", 2))}</td></tr><tr class="more" data-v-ca01b51a><td colspan="10" data-v-ca01b51a>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + ((_ab = matchHover.value) == null ? void 0 : _ab.id), query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP, haft: 1 } }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span data-v-ca01b51a${_scopeId}>${ssrInterpolate(unref($t)("View more data"))}</span>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(unref($t)("View more data")), 1)
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
      if (!unref(isHidden)) {
        _push(`<div class="${ssrRenderClass({ "col-md-2 col-lg-2 d-none d-sm-none d-md-inline-block": true, "settings_table_mobile": isRightClassAdded.value })}" id="right" data-v-ca01b51a><div class="n-search" data-v-ca01b51a><input type="text" id="rightSearchInput" class="input_text"${ssrRenderAttr("placeholder", unref($t)("Advanced Search"))} autoComplete="off" title="Search" data-v-ca01b51a></div><div class="lrdiv newsetting" data-v-ca01b51a><div class="toolsBox" data-v-ca01b51a><div class="matchinfo_setting" data-v-ca01b51a><div class="lr_tit on"${ssrRenderAttr("title", unref($t)("Sort by"))} data-v-ca01b51a>${ssrInterpolate(unref($t)("Sort by"))}</div><ul class="setList" id="set_order" style="${ssrRenderStyle({ "min-height": "45.6px" })}" data-v-ca01b51a><li class="${ssrRenderClass([!orderByTime.value ? "on" : "", "chose radio"])}" data-v-ca01b51a><span class="ro" data-v-ca01b51a><label for="radio-2" data-v-ca01b51a><input id="radio-2" name="radio-2" type="radio"${ssrIncludeBooleanAttr(!orderByTime.value) ? " checked" : ""} data-v-ca01b51a><span data-v-ca01b51a>${ssrInterpolate(unref($t)("Leagues"))}</span></label></span></li><li class="${ssrRenderClass([orderByTime.value ? "on" : "", "chose radio mb-2"])}" data-v-ca01b51a><span class="ro" data-v-ca01b51a><label for="radio-1" data-v-ca01b51a><input id="radio-1" name="radio-1" type="radio"${ssrIncludeBooleanAttr(orderByTime.value) ? " checked" : ""} data-v-ca01b51a><span data-v-ca01b51a>${ssrInterpolate(unref($t)("Time"))}</span></label></span></li></ul></div><div class="matchinfo_setting" data-v-ca01b51a>`);
        if ((props == null ? void 0 : props.page) !== ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).SCHEDULE) {
          _push(`<!--[--><div class="lr_tit on"${ssrRenderAttr("title", unref($t)("Show TL"))} data-v-ca01b51a>${ssrInterpolate(unref($t)("Show TL"))}</div><ul class="Preferences" data-v-ca01b51a><li data-v-ca01b51a><label for="isShowOddsHDP1" class="switch" data-v-ca01b51a>${ssrInterpolate(unref($t)("Handicap"))} <input${ssrIncludeBooleanAttr(Array.isArray(isShowOddsHDP.value) ? ssrLooseContain(isShowOddsHDP.value, null) : isShowOddsHDP.value) ? " checked" : ""} type="checkbox" name="isShowOddsHDP1" id="isShowOddsHDP1" data-v-ca01b51a><span class="switch-style" data-v-ca01b51a></span></label></li><li data-v-ca01b51a><label for="ShowOddsTX" class="switch" data-v-ca01b51a>${ssrInterpolate(unref($t)("Over/Under"))} <input${ssrIncludeBooleanAttr(Array.isArray(isShowOddsTX.value) ? ssrLooseContain(isShowOddsTX.value, null) : isShowOddsTX.value) ? " checked" : ""} type="checkbox" name="ShowOddsTX" id="ShowOddsTX" data-v-ca01b51a><span class="switch-style" data-v-ca01b51a></span></label></li><li data-v-ca01b51a><label for="ShowOdds1X2" class="switch" data-v-ca01b51a>${ssrInterpolate(unref($t)("1x2"))} <input${ssrIncludeBooleanAttr(Array.isArray(isShowOdds1X2.value) ? ssrLooseContain(isShowOdds1X2.value, null) : isShowOdds1X2.value) ? " checked" : ""} type="checkbox" name="ShowOdds1X2" id="ShowOdds1X2" data-v-ca01b51a><span class="switch-style" data-v-ca01b51a></span></label></li></ul><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="matchinfo_setting" data-v-ca01b51a><div class="preferences_setting" data-v-ca01b51a><div class="lr_tit on"${ssrRenderAttr("title", unref($t)("Show notification"))} data-v-ca01b51a>${ssrInterpolate(unref($t)("Show notification"))}</div><div class="selectbox" id="selectbox" data-v-ca01b51a><span value="0" class="${ssrRenderClass(settingType.value === 0 ? "on" : "")}"${ssrRenderAttr("title", unref($t)("All"))} data-v-ca01b51a>${ssrInterpolate(unref($t)("All"))}</span><span value="1" class="${ssrRenderClass(settingType.value === 1 ? "on" : "")}"${ssrRenderAttr("title", unref($t)("Favorites"))} data-v-ca01b51a>${ssrInterpolate(unref($t)("Favorites"))}</span></div><ul class="Preferences nopadding" style="${ssrRenderStyle({ "margin-bottom": "16px" })}" data-v-ca01b51a><li data-v-ca01b51a><label for="goalWindowCheck" class="switch" data-v-ca01b51a>${ssrInterpolate(unref($t)("Goal window"))} <input${ssrIncludeBooleanAttr(Array.isArray(isShowGoalWindow.value) ? ssrLooseContain(isShowGoalWindow.value, null) : isShowGoalWindow.value) ? " checked" : ""} type="checkbox" name="goalWindowCheck" id="goalWindowCheck" checked="" data-v-ca01b51a><span class="switch-style" data-v-ca01b51a></span></label></li><li data-v-ca01b51a><label for="redWindowCheck" class="switch" data-v-ca01b51a>${ssrInterpolate(unref($t)("Red card window"))} <input${ssrIncludeBooleanAttr(Array.isArray(isShowRedWindow.value) ? ssrLooseContain(isShowRedWindow.value, null) : isShowRedWindow.value) ? " checked" : ""} type="checkbox" name="redWindowCheck" id="redWindowCheck" checked="" data-v-ca01b51a><span class="switch-style" data-v-ca01b51a></span></label></li></ul><div class="lr_tit on"${ssrRenderAttr("title", unref($t)("Sound"))} data-v-ca01b51a>${ssrInterpolate(unref($t)("Sound"))}</div><div class="soundbox" data-v-ca01b51a><div data-v-ca01b51a>${ssrInterpolate(unref($t)("Home team scores"))}:</div><div class="selectbox sound" id="selectsound1" data-v-ca01b51a><span value="0" class="${ssrRenderClass(soundHome.value === 0 ? "on" : "")}" data-v-ca01b51a>1</span><span value="1" class="${ssrRenderClass(soundHome.value === 1 ? "on" : "")}" data-v-ca01b51a>2</span><span value="2" class="${ssrRenderClass(soundHome.value === 2 ? "on" : "")}" data-v-ca01b51a>3</span><span value="3" class="${ssrRenderClass(soundHome.value === 3 ? "on" : "")}" data-v-ca01b51a>4</span><span value="4" class="${ssrRenderClass(soundHome.value === 4 ? "on" : "")}" data-v-ca01b51a>NO</span></div></div><div class="soundbox" data-v-ca01b51a><div data-v-ca01b51a>${ssrInterpolate(unref($t)("Away team scores"))}:</div><div class="selectbox sound" id="selectsound2" data-v-ca01b51a><span value="0" class="${ssrRenderClass(soundAway.value === 0 ? "on" : "")}" data-v-ca01b51a>1</span><span value="1" class="${ssrRenderClass(soundAway.value === 1 ? "on" : "")}" data-v-ca01b51a>2</span><span value="2" class="${ssrRenderClass(soundAway.value === 2 ? "on" : "")}" data-v-ca01b51a>3</span><span value="3" class="${ssrRenderClass(soundAway.value === 3 ? "on" : "")}" data-v-ca01b51a>4</span><span value="4" class="${ssrRenderClass(soundAway.value === 4 ? "on" : "")}" data-v-ca01b51a>NO</span></div></div></div></div><div class="matchinfo_setting" data-v-ca01b51a><div class="lr_tit on"${ssrRenderAttr("title", unref($t)("Show page"))} data-v-ca01b51a>${ssrInterpolate(unref($t)("Show page"))}</div><ul class="Preferences" data-v-ca01b51a><li data-v-ca01b51a><label for="TeamOrderCheck" class="switch" data-v-ca01b51a>${ssrInterpolate(unref($t)("Ranking"))} <input${ssrIncludeBooleanAttr(Array.isArray(isShowRanking.value) ? ssrLooseContain(isShowRanking.value, null) : isShowRanking.value) ? " checked" : ""} type="checkbox" name="TeamOrderCheck" id="TeamOrderCheck" data-v-ca01b51a><span class="switch-style" data-v-ca01b51a></span></label></li><li data-v-ca01b51a><label for="YellowCheck" class="switch" data-v-ca01b51a>${ssrInterpolate(unref($t)("Yellow card"))} <input${ssrIncludeBooleanAttr(Array.isArray(isShowCardYellow.value) ? ssrLooseContain(isShowCardYellow.value, null) : isShowCardYellow.value) ? " checked" : ""} type="checkbox" name="YellowCard" id="YellowCheck" data-v-ca01b51a><span class="switch-style" data-v-ca01b51a></span></label></li><li data-v-ca01b51a><label for="ShowRemarkCheck" class="switch" data-v-ca01b51a>${ssrInterpolate(unref($t)("Red card"))} <input${ssrIncludeBooleanAttr(Array.isArray(isShowCardRed.value) ? ssrLooseContain(isShowCardRed.value, null) : isShowCardRed.value) ? " checked" : ""} type="checkbox" name="ShowRemarkCheck" id="ShowRemarkCheck" data-v-ca01b51a><span class="switch-style" data-v-ca01b51a></span></label></li></ul></div>`);
        if (unref(isTurnOnTimeZone)) {
          _push(`<div class="matchinfo_setting" data-v-ca01b51a><div class="lr_tit on" for="timeZone" data-v-ca01b51a>Múi giờ</div><select aria-label="timeZone" data-v-ca01b51a><!--[-->`);
          ssrRenderList("TIME_ZONE_LIST" in _ctx ? _ctx.TIME_ZONE_LIST : unref(TIME_ZONE_LIST), (item, key) => {
            _push(`<option${ssrRenderAttr("value", item == null ? void 0 : item.value)}${ssrIncludeBooleanAttr(timeZone.value === (item == null ? void 0 : item.value) ? true : false) ? " selected" : ""} data-v-ca01b51a>${ssrInterpolate(item == null ? void 0 : item.key)}</option>`);
          });
          _push(`<!--]--></select></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(onOffIframe) == "True") {
          _push(`<div class="matchinfo_setting" data-v-ca01b51a><ul class="Preferences iframe" data-v-ca01b51a><li data-v-ca01b51a><label class="switch" data-v-ca01b51a>${ssrInterpolate(unref($t)("Embed code"))} <input type="checkbox" name="iframe" id="iframeCheck" data-v-ca01b51a><span class="switch-style" data-v-ca01b51a></span></label></li></ul>`);
          if (isIframeVisible.value) {
            _push(`<div class="content_iframe" data-v-ca01b51a><textarea id="embedCodeTextarea" readonly style="${ssrRenderStyle({ "height": "155px", "width": "100%" })}" data-v-ca01b51a>${ssrInterpolate(embedCode.value)}</textarea></div>`);
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
      if (isShowSoundLiveScore.value) {
        _push(ssrRenderComponent(_component_SoundLiveScore, {
          sound: sound.value,
          "onUpdate:sound": ($event) => sound.value = $event
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LivescoreComponent.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-ca01b51a"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { useLocale, $t, $trouter } = useShareCommon();
    const storeSystems = systemsStore();
    const title = ref();
    const description = ref();
    const pageContent = ref("");
    const h1Content = ref(null);
    const route = useRoute();
    const slug = ref(route.path.replaceAll("/", ""));
    const favorites = ref(FAVORITES_TYPE.MATCHES);
    const breadcrumbs = ref([
      {
        label: $t("Follow"),
        to: $trouter(ROUTERS.FOOTBALL_FAVORITES),
        last: "on"
      }
    ]);
    const fetchPage = async (slug2) => {
      try {
        await useFetch(createUrl(API_ROUTERS.PAGE.SLUG, {
          query: {
            slug: slug2
          }
        }), "$F8eQFNxNOr").then((resData) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          title.value = ((_b = (_a = resData == null ? void 0 : resData.data) == null ? void 0 : _a.value) == null ? void 0 : _b.title) ?? getConfig(storeSystems.configurations, "SEO_META_TITLE"), description.value = ((_d = (_c = resData == null ? void 0 : resData.data) == null ? void 0 : _c.value) == null ? void 0 : _d.meta_description) ?? getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION");
          pageContent.value = (_f = (_e = resData == null ? void 0 : resData.data) == null ? void 0 : _e.value) == null ? void 0 : _f.content;
          h1Content.value = (_h = (_g = resData == null ? void 0 : resData.data) == null ? void 0 : _g.value) == null ? void 0 : _h.title;
        });
      } catch (e) {
        title.value = getConfig(storeSystems.configurations, "SEO_META_TITLE") ? getConfig(storeSystems.configurations, "SEO_META_TITLE") : "";
        description.value = getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION") ? getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION") : "";
      }
    };
    [__temp, __restore] = withAsyncContext(() => fetchPage(slug.value)), await __temp, __restore();
    nextTick(async () => {
      useHead({
        title: title.value,
        meta: [
          { name: "description", content: description.value },
          { property: "og:title", content: title.value },
          { property: "og:description", content: description.value }
        ]
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BreadcrumbsLite = _sfc_main$f;
      const _component_HotLeaguesComponent = _sfc_main$c;
      const _component_LivescoreComponent = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_BreadcrumbsLite, { breadcrumbs: unref(breadcrumbs) }, null, _parent));
      _push(`<div class="mcontent"><div id="main" class="container row"><div id="left" class="col-md-2 col-lg-2 d-none d-sm-none d-md-inline-block">`);
      _push(ssrRenderComponent(_component_HotLeaguesComponent, null, null, _parent));
      _push(`<div><div id="div_survey" style="${ssrRenderStyle({ "position": "absolute", "visibility": "visible", "z-index": "100", "padding": "5px 0 5px 0" })}"><div id="left_float_ad"></div><div style="${ssrRenderStyle({ "width": "135px" })}"></div></div></div></div>`);
      _push(ssrRenderComponent(_component_LivescoreComponent, {
        h1: unref(h1Content),
        favoritesInit: unref(favorites),
        "onUpdate:favoritesInit": ($event) => isRef(favorites) ? favorites.value = $event : null,
        page: ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).FAVORITES,
        content: unref(pageContent),
        favorites: unref(favorites)
      }, null, _parent));
      _push(`<span class="clear"></span></div><div id="div_ad_float" style="${ssrRenderStyle({ "position": "absolute", "visibility": "visible", "z-index": "100" })}"></div><div id="div_goal" onclick="showTime(1)" style="${ssrRenderStyle({ "position": "absolute", "z-index": "8", "top": "0px", "left": "410px" })}"></div><span id="allDate"></span><span id="span_detail"></span><span id="span_sbDetail"></span><span id="span_panlu"></span><div id="oddsChange" style="${ssrRenderStyle({ "position": "absolute", "z-index": "100", "top": "100px", "left": "200px", "visibility": "hidden" })}" onmouseover="MM_showHideLayers(&#39;oddsChange&#39;,&#39;&#39;,&#39;show&#39;)" onmouseout="MM_showHideLayers(&#39;oddsChange&#39;,&#39;&#39;,&#39;hide&#39;);clearSbdata();"></div><div id="panluDiv" style="${ssrRenderStyle({ "position": "absolute", "z-index": "100", "top": "100px", "left": "148px", "visibility": "hidden" })}" onmouseover="MM_showHideLayers(&#39;panluDiv&#39;,&#39;&#39;,&#39;show&#39;)" onmouseout="MM_showHideLayers(&#39;panluDiv&#39;,&#39;&#39;,&#39;hide&#39;)"></div><div id="sbOddsCorner" class="livetab" style="${ssrRenderStyle({ "position": "absolute", "z-index": "100", "top": "100px", "left": "100px", "width": "400px", "visibility": "hidden" })}" onmouseover="MM_showHideLayers(&#39;sbOddsCorner&#39;,&#39;&#39;,&#39;show&#39;)" onmouseout="MM_showHideLayers(&#39;sbOddsCorner&#39;,&#39;&#39;,&#39;hide&#39;)"></div><input type="hidden" id="ifShow" value="0"><input type="hidden" id="ifShowCorner" value="0"><span id="span_sbCorner"></span></div><!--]-->`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/favourites/index.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const storeSystems = systemsStore();
    const { useLocale, $t, $trouter } = useShareCommon();
    const route = useRoute();
    const slug = ref(route.path.replaceAll("/", ""));
    const title = ref();
    const description = ref();
    const pageContent = ref();
    const h1Content = ref(null);
    const breadcrumbs = ref([
      {
        label: $t("Results"),
        to: $trouter(ROUTERS.FOOTBALL_RESULT),
        last: "on"
      }
    ]);
    const fetchPage = async (slug2) => {
      try {
        await useFetch(createUrl(API_ROUTERS.PAGE.SLUG, {
          query: {
            slug: slug2
          }
        }), "$M4ConnfGTE").then((resData) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          title.value = ((_b = (_a = resData == null ? void 0 : resData.data) == null ? void 0 : _a.value) == null ? void 0 : _b.title) ?? getConfig(storeSystems.configurations, "SEO_META_TITLE"), description.value = ((_d = (_c = resData == null ? void 0 : resData.data) == null ? void 0 : _c.value) == null ? void 0 : _d.meta_description) ?? getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION");
          pageContent.value = (_f = (_e = resData == null ? void 0 : resData.data) == null ? void 0 : _e.value) == null ? void 0 : _f.content;
          h1Content.value = (_h = (_g = resData == null ? void 0 : resData.data) == null ? void 0 : _g.value) == null ? void 0 : _h.title;
        });
      } catch (e) {
        title.value = getConfig(storeSystems.configurations, "SEO_META_TITLE") ? getConfig(storeSystems.configurations, "SEO_META_TITLE") : "";
        description.value = getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION") ? getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION") : "";
      }
    };
    [__temp, __restore] = withAsyncContext(() => fetchPage(slug.value)), await __temp, __restore();
    nextTick(async () => {
      useHead({
        title: title.value,
        meta: [
          { name: "description", content: description.value },
          { property: "og:title", content: title.value },
          { property: "og:description", content: description.value }
        ]
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BreadcrumbsLite = _sfc_main$f;
      const _component_HotLeaguesComponent = _sfc_main$c;
      const _component_LivescoreComponent = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_BreadcrumbsLite, { breadcrumbs: unref(breadcrumbs) }, null, _parent));
      _push(`<div class="mcontent"><div id="main" class="container row"><div id="left" class="col-md-2 col-lg-2 d-none d-sm-none d-md-inline-block">`);
      _push(ssrRenderComponent(_component_HotLeaguesComponent, null, null, _parent));
      _push(`<div><div id="div_survey" style="${ssrRenderStyle({ "position": "absolute", "visibility": "visible", "z-index": "100", "padding": "5px 0 5px 0" })}"><div id="left_float_ad"></div><div style="${ssrRenderStyle({ "width": "135px" })}"></div></div></div></div>`);
      _push(ssrRenderComponent(_component_LivescoreComponent, {
        h1: unref(h1Content),
        page: ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).RESULTS,
        content: unref(pageContent)
      }, null, _parent));
      _push(`<span class="clear"></span></div><div id="div_ad_float" style="${ssrRenderStyle({ "position": "absolute", "visibility": "visible", "z-index": "100" })}"></div><span id="allDate"></span><span id="span_detail"></span><span id="span_sbDetail"></span><span id="span_panlu"></span><div id="oddsChange" style="${ssrRenderStyle({ "position": "absolute", "z-index": "100", "top": "100px", "left": "200px", "visibility": "hidden" })}" onmouseover="MM_showHideLayers(&#39;oddsChange&#39;,&#39;&#39;,&#39;show&#39;)" onmouseout="MM_showHideLayers(&#39;oddsChange&#39;,&#39;&#39;,&#39;hide&#39;);clearSbdata();"></div><div id="panluDiv" style="${ssrRenderStyle({ "position": "absolute", "z-index": "100", "top": "100px", "left": "148px", "visibility": "hidden" })}" onmouseover="MM_showHideLayers(&#39;panluDiv&#39;,&#39;&#39;,&#39;show&#39;)" onmouseout="MM_showHideLayers(&#39;panluDiv&#39;,&#39;&#39;,&#39;hide&#39;)"></div><div id="sbOddsCorner" class="livetab" style="${ssrRenderStyle({ "position": "absolute", "z-index": "100", "top": "100px", "left": "100px", "width": "400px", "visibility": "hidden" })}" onmouseover="MM_showHideLayers(&#39;sbOddsCorner&#39;,&#39;&#39;,&#39;show&#39;)" onmouseout="MM_showHideLayers(&#39;sbOddsCorner&#39;,&#39;&#39;,&#39;hide&#39;)"></div><input type="hidden" id="ifShow" value="0"><input type="hidden" id="ifShowCorner" value="0"><span id="span_sbCorner"></span></div><!--]-->`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/results/index.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const storeSystems = systemsStore();
    const { useLocale, $t, $trouter } = useShareCommon();
    const route = useRoute();
    const slug = ref(route.path.replaceAll("/", ""));
    const title = ref();
    const description = ref();
    const pageContent = ref();
    const h1Content = ref(null);
    const breadcrumbs = ref([
      {
        label: $t("Schedule"),
        to: $trouter(ROUTERS.FOOTBALL_SCHEDULE),
        last: "on"
      }
    ]);
    const fetchPage = async (slug2) => {
      try {
        await useFetch(createUrl(API_ROUTERS.PAGE.SLUG, {
          query: {
            slug: slug2
          }
        }), "$iMK6vpBXO6").then((resData) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          title.value = ((_b = (_a = resData == null ? void 0 : resData.data) == null ? void 0 : _a.value) == null ? void 0 : _b.title) ?? getConfig(storeSystems.configurations, "SEO_META_TITLE"), description.value = ((_d = (_c = resData == null ? void 0 : resData.data) == null ? void 0 : _c.value) == null ? void 0 : _d.meta_description) ?? getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION");
          pageContent.value = (_f = (_e = resData == null ? void 0 : resData.data) == null ? void 0 : _e.value) == null ? void 0 : _f.content;
          h1Content.value = (_h = (_g = resData == null ? void 0 : resData.data) == null ? void 0 : _g.value) == null ? void 0 : _h.title;
        });
      } catch (e) {
        title.value = getConfig(storeSystems.configurations, "SEO_META_TITLE") ? getConfig(storeSystems.configurations, "SEO_META_TITLE") : "";
        description.value = getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION") ? getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION") : "";
      }
    };
    [__temp, __restore] = withAsyncContext(() => fetchPage(slug.value)), await __temp, __restore();
    nextTick(async () => {
      useHead({
        title: title.value,
        meta: [
          { name: "description", content: description.value },
          { property: "og:title", content: title.value },
          { property: "og:description", content: description.value }
        ]
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BreadcrumbsLite = _sfc_main$f;
      const _component_HotLeaguesComponent = _sfc_main$c;
      const _component_LivescoreComponent = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_BreadcrumbsLite, { breadcrumbs: unref(breadcrumbs) }, null, _parent));
      _push(`<div class="mcontent" data-v-65e3d266><div id="main" class="container row" data-v-65e3d266><div id="left" class="col-md-2 col-lg-2 d-none d-sm-none d-md-inline-block" data-v-65e3d266>`);
      _push(ssrRenderComponent(_component_HotLeaguesComponent, null, null, _parent));
      _push(`<div data-v-65e3d266><div id="div_survey" style="${ssrRenderStyle({ "position": "absolute", "visibility": "visible", "z-index": "100", "padding": "5px 0 5px 0" })}" data-v-65e3d266><div id="left_float_ad" data-v-65e3d266></div><div style="${ssrRenderStyle({ "width": "135px" })}" data-v-65e3d266></div></div></div></div>`);
      _push(ssrRenderComponent(_component_LivescoreComponent, {
        h1: unref(h1Content),
        page: ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).SCHEDULE,
        content: unref(pageContent)
      }, null, _parent));
      _push(`<span class="clear" data-v-65e3d266></span></div><div id="div_ad_float" style="${ssrRenderStyle({ "position": "absolute", "visibility": "visible", "z-index": "100" })}" data-v-65e3d266></div><div id="div_goal" onclick="showTime(1)" style="${ssrRenderStyle({ "position": "absolute", "z-index": "8", "top": "0px", "left": "410px" })}" data-v-65e3d266></div><span id="allDate" data-v-65e3d266></span><span id="span_detail" data-v-65e3d266></span><span id="span_sbDetail" data-v-65e3d266></span><span id="span_panlu" data-v-65e3d266></span><div id="oddsChange" style="${ssrRenderStyle({ "position": "absolute", "z-index": "100", "top": "100px", "left": "200px", "visibility": "hidden" })}" onmouseover="MM_showHideLayers(&#39;oddsChange&#39;,&#39;&#39;,&#39;show&#39;)" onmouseout="MM_showHideLayers(&#39;oddsChange&#39;,&#39;&#39;,&#39;hide&#39;);clearSbdata();" data-v-65e3d266></div><div id="panluDiv" style="${ssrRenderStyle({ "position": "absolute", "z-index": "100", "top": "100px", "left": "148px", "visibility": "hidden" })}" onmouseover="MM_showHideLayers(&#39;panluDiv&#39;,&#39;&#39;,&#39;show&#39;)" onmouseout="MM_showHideLayers(&#39;panluDiv&#39;,&#39;&#39;,&#39;hide&#39;)" data-v-65e3d266></div><div id="sbOddsCorner" class="livetab" style="${ssrRenderStyle({ "position": "absolute", "z-index": "100", "top": "100px", "left": "100px", "width": "400px", "visibility": "hidden" })}" onmouseover="MM_showHideLayers(&#39;sbOddsCorner&#39;,&#39;&#39;,&#39;show&#39;)" onmouseout="MM_showHideLayers(&#39;sbOddsCorner&#39;,&#39;&#39;,&#39;hide&#39;)" data-v-65e3d266></div><input type="hidden" id="ifShow" value="0" data-v-65e3d266><input type="hidden" id="ifShowCorner" value="0" data-v-65e3d266><span id="span_sbCorner" data-v-65e3d266></span></div><!--]-->`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/schedule/index.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const SCHEDULE = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-65e3d266"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { useLocale, $t, $trouter, isNavVisible } = useShareCommon();
    isNavVisible.value = false;
    const CATEGORIES = {
      SWIPE: {
        SLUG: "swiperpost",
        LIMIT: 5
      },
      PREVIEW: {
        SLUG: "nhan-dinh",
        LIMIT: 4
      },
      NEWS_HOST: {
        SLUG: "tin-nong",
        LIMIT: 12
      },
      PHOTO: {
        SLUG: "anh-dep",
        LIMIT: 4
      },
      OTHER: {
        LIMIT: 6
      }
    };
    const storeSystems = systemsStore();
    const breadcrumbs = ref([
      {
        label: $t("News"),
        to: ROUTERS_OLD.NEWS,
        last: "on"
      }
    ]);
    const categoriesList = ref();
    ref();
    ref();
    ref();
    ref();
    ref();
    ref();
    ref();
    ref();
    const compsDataList = ref([]);
    const compOriginsList = ref([]);
    const compsListByKey = ref([]);
    const matchOriginsList = ref([]);
    const matchsList = ref([]);
    const compKeysList = ref([]);
    const renderTopList = ref([]);
    const compList = ref([]);
    const optionsListCompList = ref();
    const seasonTableStandingList = ref();
    const matchsListLength = ref(0);
    const title = ref();
    const description = ref();
    const pageContent = ref();
    const keyword = ref();
    ref([]);
    ref(1);
    ref(8);
    ref(0);
    const router = useRouter();
    ref([]);
    ref(false);
    ref();
    const imageSize = ref([]);
    const imagesSizeConfig = getConfig(storeSystems.configurations, "image_size");
    imageSize.value = imagesSizeConfig == null ? void 0 : imagesSizeConfig.split(",");
    const limitPostCategory = getConfig(storeSystems.configurations, "LIMIT_POST_CATEGORY") || CATEGORIES.OTHER.LIMIT;
    const screenWidth = ref(0);
    computed(() => {
      var _a, _b, _c;
      if (screenWidth.value < SCREEN_WIDTH.MD && ((_a = imageSize == null ? void 0 : imageSize.value) == null ? void 0 : _a.length) >= 1) {
        return imageSize.value[1];
      } else if (screenWidth.value >= SCREEN_WIDTH.MD && screenWidth.value < SCREEN_WIDTH.LG && ((_b = imageSize == null ? void 0 : imageSize.value) == null ? void 0 : _b.length) >= 2) {
        return imageSize.value[2];
      } else if (screenWidth.value >= SCREEN_WIDTH.LG && screenWidth.value < SCREEN_WIDTH.XXL && ((_c = imageSize == null ? void 0 : imageSize.value) == null ? void 0 : _c.length) >= 3) {
        return imageSize.value[3];
      } else {
        return "";
      }
    });
    const fetchCategories = async () => {
      var _a, _b, _c;
      try {
        const { data } = await useFetch(API_ROUTERS.POST.CATEGORY.LIST_POST, {
          params: {
            limit: 100,
            page: 1,
            limit_post: limitPostCategory
          }
        }, "$WVhUA2VjBH");
        if ((_a = data == null ? void 0 : data.value) == null ? void 0 : _a.post_categories) {
          const categories = (_c = (_b = data == null ? void 0 : data.value) == null ? void 0 : _b.post_categories) == null ? void 0 : _c.filter((item) => (item == null ? void 0 : item.code) !== "swiperpost");
          if (categories) {
            return categories;
          }
        }
        return [];
      } catch (e) {
        return [];
      }
    };
    const fetchMatchsRecent = async () => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.COMP, { lang: useLocale == null ? void 0 : useLocale.value.defaultLocale }).then((decodedData) => {
        if (decodedData) {
          compsDataList.value = decodedData;
          compOriginsList.value = decodedData;
          const dataMcompsDataListByKey = [];
          decodedData == null ? void 0 : decodedData.forEach((item) => {
            dataMcompsDataListByKey[item == null ? void 0 : item.id] = item;
          });
        }
      });
      let status = null;
      status = [...LIVESCORE_STATUS.IS_LIVE, ...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].toString();
      const query = {
        date: moment().format("yyyy-MM-DD"),
        tz: moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format("Z"),
        lang: useLocale == null ? void 0 : useLocale.value.defaultLocale
      };
      if (status !== null) {
        query.status = status;
      }
      await useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_RECENT, query).then((resData) => {
        var _a, _b;
        if (resData) {
          const matchsDataList = [];
          const matchData = resData;
          matchData.forEach((item) => {
            matchsDataList[item == null ? void 0 : item.id] = item;
          });
          matchsListLength.value = matchsDataList == null ? void 0 : matchsDataList.length;
          matchsList.value = matchsDataList;
          matchOriginsList.value = Object.assign([], matchsDataList);
          let matchsGroup = groupBy(matchData, (x) => x.competition);
          const matchsGroupKey = [...matchsGroup.keys()];
          compOriginsList.value = (_a = compsDataList.value) == null ? void 0 : _a.filter((item) => {
            return matchsGroupKey == null ? void 0 : matchsGroupKey.includes(item == null ? void 0 : item.id);
          }).map((item) => {
            item.matchs = matchsGroup == null ? void 0 : matchsGroup.get(item == null ? void 0 : item.id);
            return item;
          });
          compsListByKey.value = groupBy(compsDataList.value, (x) => x.id);
          const compsList = (_b = compOriginsList.value) == null ? void 0 : _b.filter((item) => (item == null ? void 0 : item.number_hot) === 5 || (item == null ? void 0 : item.number_hot) === 4);
          const matchsGroupHot = groupBy(compsList, (x) => x.id);
          const compKeysListHot = [...matchsGroupHot.keys()];
          let matchsListArray = Object.values(matchOriginsList.value).filter((item) => compKeysListHot.includes(item == null ? void 0 : item.competition));
          matchsGroup = sortByTime(matchsListArray, false);
          compKeysList.value = [...matchsGroup.keys()];
          renderTopList.value = matchsGroup;
        }
      });
    };
    const fetchSeasonTableStanding = async (comp_id) => {
      const query = {
        comp_id
      };
      await useApiLiveScore(API_ROUTERS.LIVESCORE.SEASONS_TABLE_STANDING, query).then((resData) => {
        var _a, _b;
        seasonTableStandingList.value = (_b = (_a = resData == null ? void 0 : resData.results) == null ? void 0 : _a[0]) == null ? void 0 : _b.tables;
      });
    };
    const fetchCompList = async () => {
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.COMP_LIST,
        { lang: useLocale == null ? void 0 : useLocale.value.defaultLocale }
      ).then(async (resData) => {
        var _a, _b, _c;
        compList.value = resData == null ? void 0 : resData.filter((item) => (item == null ? void 0 : item.number_hot) === 5 || (item == null ? void 0 : item.number_hot) === 4);
        if (((_a = compList.value) == null ? void 0 : _a.length) > 0) {
          optionsListCompList.value = (_c = (_b = compList.value) == null ? void 0 : _b[0]) == null ? void 0 : _c.id;
        }
      });
    };
    const getDataConfig = () => {
      title.value = getConfig(storeSystems.configurations, "NEWS_TITLE") ?? getConfig(storeSystems.configurations, "SEO_META_TITLE");
      description.value = getConfig(storeSystems.configurations, "NEWS_DESCRIPTION") ?? getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION");
      keyword.value = getConfig(storeSystems.configurations, "NEWS_KEYWORD") ?? "";
      pageContent.value = getConfig(storeSystems.configurations, "NEWS_CONTENT") ?? "";
    };
    const fetchConfigurations = async () => {
      var _a;
      try {
        const resData = await useFetch(createUrl(API_ROUTERS.CONFIGURATIONS), "$Yvp9VcPVC9");
        storeSystems.configurations = ((_a = resData.data.value) == null ? void 0 : _a.configurations) || [];
      } catch (e) {
      }
    };
    categoriesList.value = ([__temp, __restore] = withAsyncContext(() => fetchCategories()), __temp = await __temp, __restore(), __temp);
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecent()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => fetchCompList()), await __temp, __restore();
    router.currentRoute.value.path;
    if (!storeSystems.configurations) {
      [__temp, __restore] = withAsyncContext(() => fetchConfigurations()), await __temp, __restore();
    }
    getDataConfig();
    useHead({
      title: () => title.value,
      meta: [
        { name: "description", content: () => description.value },
        { property: "og:title", content: () => title.value },
        { property: "og:description", content: () => description.value },
        { name: "keywords", content: () => keyword.value }
      ]
    });
    watch(
      optionsListCompList,
      async () => {
        await fetchSeasonTableStanding(optionsListCompList.value);
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_BreadcrumbsLite = _sfc_main$f;
      const _component_nuxt_link = __nuxt_component_0$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_BreadcrumbsLite, { breadcrumbs: breadcrumbs.value }, null, _parent));
      _push(`<div class="mcontent"><div id="main" class="container row"><div class="col-md-8 col-lg-8 newLeft"><!--[-->`);
      ssrRenderList(categoriesList.value, (item, index) => {
        var _a2, _b;
        _push(`<!--[-->`);
        if (item) {
          _push(`<div class="newsbox"><div class="Htitle"><h2>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).NEWS_CATEGORY + "/" + (item == null ? void 0 : item.slug)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item == null ? void 0 : item.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item == null ? void 0 : item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</h2>`);
          if (((_a2 = item == null ? void 0 : item.posts) == null ? void 0 : _a2.length) > 0) {
            _push(ssrRenderComponent(_component_nuxt_link, {
              to: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).NEWS_CATEGORY + "/" + (item == null ? void 0 : item.slug),
              class: "more"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(unref($t)("Read more"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref($t)("Read more")), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (((_b = item == null ? void 0 : item.posts) == null ? void 0 : _b.length) > 0) {
            _push(`<div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 news_post"><!--[-->`);
            ssrRenderList(item == null ? void 0 : item.posts, (post) => {
              _push(`<div class="col-12 col-sm-6 col-lg-4 article">`);
              _push(ssrRenderComponent(_component_nuxt_link, {
                to: "/" + (post == null ? void 0 : post.slug),
                class: "more"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  var _a3, _b2;
                  if (_push2) {
                    _push2(`<div class="artimg"${_scopeId}><img${ssrRenderAttr("src", (_a3 = post == null ? void 0 : post.thumbnail) == null ? void 0 : _a3.file_path)}${ssrRenderAttr("alt", post == null ? void 0 : post.title)}${_scopeId}></div><p class="match"${_scopeId}>${ssrInterpolate(post == null ? void 0 : post.title)}</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "artimg" }, [
                        createVNode("img", {
                          src: (_b2 = post == null ? void 0 : post.thumbnail) == null ? void 0 : _b2.file_path,
                          alt: post == null ? void 0 : post.title
                        }, null, 8, ["src", "alt"])
                      ]),
                      createVNode("p", { class: "match" }, toDisplayString(post == null ? void 0 : post.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(`</div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<p class="text-center">${ssrInterpolate(unref($t)("No posts"))}</p>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]-->`);
      if (title.value || pageContent.value) {
        _push(`<div id="content-page" style="${ssrRenderStyle({ "cursor": "unset" })}" class="mt-3 newsbox p-3">`);
        if (title.value) {
          _push(`<h1 class="page_title">${ssrInterpolate(title.value)}</h1>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(pageContent.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-md-4 col-lg-4 newRight">`);
      if (matchsListLength.value > 0) {
        _push(`<div class="side-box"><div class="Htitle nobr"><div>${ssrInterpolate(unref($t)("Hot Match"))}</div>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          class: "more",
          target: "_blank",
          to: "/"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Read more"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Read more")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><!--[-->`);
        ssrRenderList((_a = renderTopList.value) == null ? void 0 : _a.slice(0, 10), (match, index) => {
          var _a2, _b, _c, _d, _e, _f;
          _push(`<div class="matchItem v2"><div class="home"><span class="teamName">${ssrInterpolate((_a2 = match == null ? void 0 : match.home_team) == null ? void 0 : _a2.name)}</span><img class="teamIcon" name=""${ssrRenderAttr("src", ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))((_b = match == null ? void 0 : match.home_team) == null ? void 0 : _b.logo_o, "team"))} height="80"${ssrRenderAttr("alt", (_c = match == null ? void 0 : match.home_team) == null ? void 0 : _c.name)}></div><div class="vs date"><span data-fmt="3">${ssrInterpolate(("formatDateMomentUTCTimeZone" in _ctx ? _ctx.formatDateMomentUTCTimeZone : unref(formatDateMomentUTCTimeZone))(match == null ? void 0 : match.match_time, "DD-MM"))}</span><span data-fmt="4">${ssrInterpolate(("formatDateMomentUTCTimeZone" in _ctx ? _ctx.formatDateMomentUTCTimeZone : unref(formatDateMomentUTCTimeZone))(match == null ? void 0 : match.match_time, "HH:mm"))}</span></div><div class="guest"><img class="teamIcon" name=""${ssrRenderAttr("src", ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))((_d = match == null ? void 0 : match.away_team) == null ? void 0 : _d.logo_o, "team"))} height="80"${ssrRenderAttr("alt", (_e = match == null ? void 0 : match.away_team) == null ? void 0 : _e.name)}><span class="teamName">${ssrInterpolate((_f = match == null ? void 0 : match.away_team) == null ? void 0 : _f.name)}</span></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="side-box"><div class="Htitle nobr"><div>${ssrInterpolate(unref($t)("Ranking"))}</div><select id="optionsListCompList" class="selectbox"><!--[-->`);
      ssrRenderList(compList.value, (item, index) => {
        _push(`<option${ssrRenderAttr("value", item == null ? void 0 : item.id)}>${ssrInterpolate(item == null ? void 0 : item.comp_name)}</option>`);
      });
      _push(`<!--]--></select></div><table id="nba_1" class="listtab fcg" width="100%" border="0" cellspacing="0"><tbody><!--[-->`);
      ssrRenderList(seasonTableStandingList.value, (item, index) => {
        var _a2, _b;
        _push(`<!--[-->`);
        if (((_a2 = seasonTableStandingList.value) == null ? void 0 : _a2.length) > 1) {
          _push(`<tr class="group-tit"><td colspan="7">${ssrInterpolate(unref($t)("Table"))} ${ssrInterpolate((_b = "TABLE_STANDING_LIST" in _ctx ? _ctx.TABLE_STANDING_LIST : unref(TABLE_STANDING_LIST)) == null ? void 0 : _b[item == null ? void 0 : item.group])}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<tr class="stsw"><td width="10%"${ssrRenderAttr("title", unref($t)("Ranking"))}>#</td><td>${ssrInterpolate(unref($t)("Team"))}</td><td width="10%"${ssrRenderAttr("title", unref($t)("Win"))}>${ssrInterpolate(unref($t)("W"))}</td><td width="10%"${ssrRenderAttr("title", unref($t)("Draw"))}>${ssrInterpolate(unref($t)("D"))}</td><td width="10%"${ssrRenderAttr("title", unref($t)("Loss"))}>${ssrInterpolate(unref($t)("L"))}</td><td width="10%">${ssrInterpolate(unref($t)("Points"))}</td></tr><!--[-->`);
        ssrRenderList(item == null ? void 0 : item.rows, (row, row_index) => {
          var _a3;
          _push(`<tr style="${ssrRenderStyle({ "height": "22px" })}"><td>${ssrInterpolate(row == null ? void 0 : row.position)}</td><td class="teamname">`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).TEAM + ((_a3 = row == null ? void 0 : row.team_info) == null ? void 0 : _a3.team_id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a4, _b2;
              if (_push2) {
                _push2(`${ssrInterpolate((_a4 = row == null ? void 0 : row.team_info) == null ? void 0 : _a4.team_name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString((_b2 = row == null ? void 0 : row.team_info) == null ? void 0 : _b2.team_name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td>${ssrInterpolate(row == null ? void 0 : row.goals)}</td><td>${ssrInterpolate(row == null ? void 0 : row.draw)}</td><td>${ssrInterpolate(row == null ? void 0 : row.loss)}</td><td class="blue">${ssrInterpolate(row == null ? void 0 : row.points)}</td></tr>`);
        });
        _push(`<!--]--><!--]-->`);
      });
      _push(`<!--]--></tbody></table></div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/news/index.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const fetchRoutes_0hGyJ2FChv = /* @__PURE__ */ defineNuxtPlugin(async (nuxtApp) => {
  var _a, _b, _c;
  let __temp, __restore;
  const router = nuxtApp.$router;
  const { data } = ([__temp, __restore] = executeAsync(() => useFetch(API_ROUTERS.PAGE.ROUTER, "$SAIfhPl8Ag")), __temp = await __temp, __restore(), __temp);
  const initComponent = {
    [ROUTERS.FOOTBALL_FAVORITES]: _sfc_main$7,
    [ROUTERS.FOOTBALL_RESULT]: _sfc_main$6,
    [ROUTERS.FOOTBALL_SCHEDULE]: SCHEDULE,
    [ROUTERS.NEWS]: _sfc_main$4
  };
  if ((_a = data == null ? void 0 : data.value) == null ? void 0 : _a.pages) {
    (_c = (_b = data == null ? void 0 : data.value) == null ? void 0 : _b.pages) == null ? void 0 : _c.forEach((item) => {
      var _a2;
      if (item == null ? void 0 : item.post_meta_post) {
        const key = (_a2 = item == null ? void 0 : item.post_meta_post) == null ? void 0 : _a2.find(
          (item2) => (item2 == null ? void 0 : item2.name) === "router_name"
        );
        if (key && router) {
          if (ROUTERS_LANG[key.value]) {
            ROUTERS_LANG[key.value].vi = "/" + item.slug;
            ROUTERS_LANG[key.value].en = "/" + item.slug;
            ROUTERS_OLD[key.value] = "/" + item.slug;
            const newRoute = {
              name: key.value,
              path: "/" + item.slug,
              component: initComponent[key.value]
            };
            router.addRoute(newRoute);
          }
        }
      }
    });
  }
});
const initApp_4u1bY7BTGQ = /* @__PURE__ */ defineNuxtPlugin(async (nuxtApp) => {
  let isMobile = ref(false);
  let isBot = false;
  {
    const headers = useRequestHeaders();
    isMobile.value = /mobile/i.test(headers["user-agent"]) && !/ipad/i.test(headers["user-agent"]);
    isBot = /moto g/i.test(headers["user-agent"]) && !/ipad/i.test(headers["user-agent"]);
  }
  nuxtApp.provide("isMobile", isMobile);
  nuxtApp.provide("isBot", isBot);
});
const _1_absoluteImageUrls_server_fFRzzZyk5x = /* @__PURE__ */ defineNuxtPlugin({
  enforce: "post",
  setup() {
    const head = injectHead();
    if (!head)
      return;
    const resolver = createSitePathResolver({
      withBase: true,
      absolute: true,
      canonical: true
    });
    head.use({
      hooks: {
        "tags:resolve": async ({ tags }) => {
          for (const tag of tags) {
            if (tag.tag !== "meta")
              continue;
            if (tag.props.property !== "og:image:url" && tag.props.property !== "og:image" && tag.props.name !== "twitter:image")
              continue;
            if (typeof tag.props.content !== "string" || !tag.props.content.trim() || tag.props.content.startsWith("http") || tag.props.content.startsWith("//"))
              continue;
            tag.props.content = unref(resolver(tag.props.content));
          }
        }
      }
    });
  }
});
const _0_routeRules_server_BfMGGJG5SO = /* @__PURE__ */ defineNuxtPlugin({
  enforce: "post",
  async setup() {
    const head = injectHead();
    if (!head)
      return;
    const event = useRequestEvent();
    if (event.context._nitro.routeRules.head)
      head.push(event.context._nitro.routeRules.head, { mode: "server" });
    if (event.context._nitro.routeRules.seoMeta) {
      const meta = unpackMeta({ ...event.context._nitro.routeRules.seoMeta });
      head.push({
        meta
      }, { mode: "server" });
    }
  }
});
function applyDefaults(i18n) {
  const { canonicalQueryWhitelist } = (/* @__PURE__ */ useRuntimeConfig()).public["nuxt-seo"];
  const siteConfig = useSiteConfig();
  const route = useRoute();
  const resolveUrl = createSitePathResolver({ withBase: true, absolute: true });
  const canonicalUrl = computed(() => {
    const { query } = route;
    const url = resolveUrl(route.path || "/").value || route.path;
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([key]) => canonicalQueryWhitelist.includes(key))
    );
    return Object.keys(filteredQuery).length ? `${url}?${stringifyQuery(filteredQuery)}` : url;
  });
  const minimalPriority = {
    // give nuxt.config values higher priority
    tagPriority: 101
  };
  useHead({
    htmlAttrs: { lang: i18n.locale },
    templateParams: { site: siteConfig, siteName: siteConfig.name || "" },
    titleTemplate: "%s %separator %siteName",
    link: [{ rel: "canonical", href: () => canonicalUrl.value }]
  }, minimalPriority);
  const seoMeta = {
    ogType: "website",
    ogUrl: () => canonicalUrl.value,
    ogLocale: () => i18n.locale.value,
    ogSiteName: siteConfig.name
  };
  if (siteConfig.description)
    seoMeta.description = siteConfig.description;
  if (siteConfig.twitter) {
    const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter : `@${siteConfig.twitter}`;
    seoMeta.twitterCreator = id;
    seoMeta.twitterSite = id;
  }
  useSeoMeta(seoMeta, minimalPriority);
}
const defaults_aRl2YLnTcb = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-seo:defaults",
  order: 999,
  env: {
    islands: false
  },
  setup() {
    const siteConfig = useSiteConfig();
    const locale = ref(siteConfig.currentLocale || siteConfig.defaultLocale);
    applyDefaults({
      locale
    });
  }
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin$1,
  _0_siteConfig_MwZUzHrRNP,
  plugin,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  titles_dw2T9lEw4h,
  siteConfig_izaWKZ8rEu,
  inferSeoMetaPlugin_Uk9bcXDHeN,
  og_image_canonical_urls_server_YYKCE0iokV,
  route_rule_og_image_server_xL1rf4QeLE,
  plugin_YksOOA8Nkt,
  fetchRoutes_0hGyJ2FChv,
  initApp_4u1bY7BTGQ,
  _1_absoluteImageUrls_server_fFRzzZyk5x,
  _0_routeRules_server_BfMGGJG5SO,
  defaults_aRl2YLnTcb
];
function defaultEstimatedProgress(duration, elapsed) {
  const completionPercentage = elapsed / duration * 100;
  return 2 / Math.PI * 100 * Math.atan(completionPercentage / 50);
}
function createLoadingIndicator(opts = {}) {
  const { duration = 2e3, throttle = 200, hideDelay = 500, resetDelay = 400 } = opts;
  opts.estimatedProgress || defaultEstimatedProgress;
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const progress = ref(0);
  const isLoading = ref(false);
  const start = () => set2(0);
  function set2(at = 0) {
    if (nuxtApp.isHydrating) {
      return;
    }
    if (at >= 100) {
      return finish();
    }
    progress.value = at < 0 ? 0 : at;
    if (throttle && false) {
      setTimeout(() => {
        isLoading.value = true;
      }, throttle);
    } else {
      isLoading.value = true;
    }
  }
  function finish(opts2 = {}) {
    progress.value = 100;
    if (opts2.force) {
      progress.value = 0;
      isLoading.value = false;
    }
  }
  function clear() {
  }
  let _cleanup = () => {
  };
  return {
    _cleanup,
    progress: computed(() => progress.value),
    isLoading: computed(() => isLoading.value),
    start,
    set: set2,
    finish,
    clear
  };
}
function useLoadingIndicator(opts = {}) {
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const indicator = nuxtApp._loadingIndicator = nuxtApp._loadingIndicator || createLoadingIndicator(opts);
  return indicator;
}
const __nuxt_component_0$1 = defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: [String, Boolean],
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    },
    estimatedProgress: {
      type: Function,
      required: false
    }
  },
  setup(props, { slots, expose }) {
    const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle,
      estimatedProgress: props.estimatedProgress
    });
    expose({
      progress,
      isLoading,
      start,
      finish,
      clear
    });
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: "auto",
        height: `${props.height}px`,
        opacity: isLoading.value ? 1 : 0,
        background: props.color || void 0,
        backgroundSize: `${100 / progress.value * 100}% auto`,
        transform: `scaleX(${progress.value}%)`,
        transformOrigin: "left",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});
const layouts = {
  default: () => import('./default-Dct6dV4D.mjs').then((m) => m.default || m),
  error: () => import('./error-B97MH4ph.mjs').then((m) => m.default || m)
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_0 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    },
    fallback: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_2 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, expose }) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h(RouteProvider, {
                    key: key || void 0,
                    vnode: routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index < newRoute.matched.length - 1;
}
const _sfc_main$3 = {
  __name: "NuxtSnackbar",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const snackbarOptions = ((_a = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a.$snackbarOptions) || {};
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Vue3Snackbar), mergeProps(unref(snackbarOptions), _attrs), createSlots({ _: 2 }, [
        renderList(_ctx.$slots, (_, name) => {
          return {
            name,
            fn: withCtx((slotData, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, name, slotData, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, name, slotData)
                ];
              }
            })
          };
        })
      ]), _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-snackbar/dist/runtime/components/NuxtSnackbar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLoadingIndicator = __nuxt_component_0$1;
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_2;
  const _component_NuxtSnackbar = _sfc_main$3;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_NuxtLoadingIndicator, { color: "#FF8C00" }, null, _parent));
  _push(ssrRenderComponent(_component_NuxtLayout, { name: "default" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtSnackbar, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    var _a;
    const { useLocale, $t } = useShareCommon();
    const props = __props;
    const seoMeta = ref({
      title: ""
    });
    seoMeta.value.title = (_a = props == null ? void 0 : props.error) == null ? void 0 : _a.statusMessage;
    useHead({
      title: () => $t(seoMeta.value.title),
      meta: [
        { name: "description", content: "" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$3;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="prose mt-5"${_scopeId}><div class="min-h-screen flex flex-grow items-center justify-center bg-gray-50"${_scopeId}><div class="rounded-lg p-8 text-center shadow-xl"${_scopeId}><h1 class="mb-4 text-4xl font-bold"${_scopeId}>${ssrInterpolate(__props.error.statusCode)}</h1><p class="text-gray-600 mb-5"${_scopeId}>${ssrInterpolate(__props.error.statusMessage ? ((_a2 = __props.error) == null ? void 0 : _a2.data) && ((_b = __props.error) == null ? void 0 : _b.statusCode) === 404 ? unref($t)("Page not found") : __props.error.statusMessage : unref($t)("Oops! An error occurred"))}</p>`);
            _push2(ssrRenderComponent(_component_nuxt_link, {
              to: "/",
              class: "mt-4 btn btn-submit px-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref($t)("Back to Home"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref($t)("Back to Home")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "prose mt-5" }, [
                createVNode("div", { class: "min-h-screen flex flex-grow items-center justify-center bg-gray-50" }, [
                  createVNode("div", { class: "rounded-lg p-8 text-center shadow-xl" }, [
                    createVNode("h1", { class: "mb-4 text-4xl font-bold" }, toDisplayString(__props.error.statusCode), 1),
                    createVNode("p", { class: "text-gray-600 mb-5" }, toDisplayString(__props.error.statusMessage ? ((_c = __props.error) == null ? void 0 : _c.data) && ((_d = __props.error) == null ? void 0 : _d.statusCode) === 404 ? unref($t)("Page not found") : __props.error.statusMessage : unref($t)("Oops! An error occurred")), 1),
                    createVNode(_component_nuxt_link, {
                      to: "/",
                      class: "mt-4 btn btn-submit px-3"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref($t)("Back to Home")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = defineAsyncComponent(() => import('./island-renderer-_OFrPUJB.mjs').then((r) => r.default || r));
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { getH2hComparison as $, getStats as A, parseFloatO as B, useNuxtApp as C, useApiLiveScore as D, API_ROUTERS as E, getRecentResultStat as F, parseIntO as G, getValueByPosition as H, ISPORT_COMPANY_DEFAULT as I, getDataObject as J, getStateComparison as K, COMPANYS_H2H_DEFAULT_LIST as L, MATCH_TAB as M, getOddNumber as N, ODD_COMPANY_DEFAULT as O, MATCH_LIST_OPTION as P, timeStamp2DateUTCTimeZone as Q, ROUTERS_GROUP as R, getH2HOddEU as S, getH2HOddHadicap as T, getH2HOddTX as U, getH2HStatistics as V, getDataComparison as W, getStaticsOdd as X, getStandingLastest as Y, getDataObjectByList as Z, _export_sfc as _, useRoute as a, getOddNumberToNegative as a0, getOddChange as a1, getClassOddChange as a2, getOddOfData as a3, getClassOddCornerChange as a4, getOddsCorrectScore as a5, getPlayerPosition as a6, useState as a7, useAsyncData as a8, navigateTo as a9, __nuxt_component_1$1 as aA, defineStore as aB, useError as aC, actionsStore as aD, TIME_ZONE_LIST as aE, LIVESCORE_ACTIVE_TAB as aF, active_class as aG, NAME_ROUTERS as aH, getScriptMetaTags as aI, handleInjectScript as aJ, handleInjectMetaTags as aK, useOgImageRuntimeConfig as aL, useSiteConfig as aM, BREADCRUMBS_MAP as aN, ODD_COMPANYS_LIVESCORE as aO, HotLeaguesComponent as aP, ROUTERS as aa, useHead as ab, generateMetaSeo as ac, useFetch as ad, createUrl as ae, _sfc_main$f as af, CATEGORY_TAG_POST_PER_LIMIT as ag, SCREEN_WIDTH as ah, formatTimeSince as ai, showError as aj, useRequestURL as ak, POST_TYPE as al, ITEMS_PER_LIMIT as am, generateTeamMetaSeo as an, LIVESCORE_PAGE as ao, __nuxt_component_1 as ap, WAREHOUSE_LEAGUE_TAB as aq, TABLE_STANDING_LIST as ar, LIVESCORE_STATUS as as, getValueByPositionWarehourse as at, getLastResult as au, generateCompetitionMetaSeo as av, formatTimestamp as aw, TABLE_TEAM as ax, getTransferType as ay, debounce as az, useShareCommon as b, createError as c, useSchema as d, entry$1 as default, useCookie as e, MATCH_ODD_TAB as f, getConfig as g, ROUTERS_OLD as h, formatDateMomentUTCTimeZone as i, getLiveScoreImage as j, ROUTER_TEAM_NAME as k, getStatusDisplay as l, __nuxt_component_0$3 as m, _sfc_main$d as n, _sfc_main$e as o, socketStore as p, useMatchStore as q, ODD_COMPANYS as r, systemsStore as s, getOddNumberToNegativeTX as t, useRouter as u, getDetailOdds as v, getOddCornerValue as w, getClassOddCorner as x, getIncidents as y, getIncidentsRight as z };
//# sourceMappingURL=server.mjs.map
