import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { promises, existsSync } from 'fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'path';
import { toValue } from 'vue';
import { promises as promises$1 } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'ipx';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withoutLeadingSlash(input = "") {
  return (hasLeadingSlash(input) ? input.slice(1) : input) || "/";
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}
function withHttps(input) {
  return withProtocol(input, "https://");
}
function withProtocol(input, protocol) {
  let match = input.match(PROTOCOL_REGEX);
  if (!match) {
    match = input.match(/^\/{2,}/);
  }
  if (!match) {
    return protocol + input;
  }
  return protocol + input.slice(match[0].length);
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

class WordArray {
  constructor(words, sigBytes) {
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    this._data = new WordArray();
    this._nDataBytes = 0;
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    this._hash = new WordArray([...H]);
  }
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

function isEqual(object1, object2, hashOptions = {}) {
  if (object1 === object2) {
    return true;
  }
  if (objectHash(object1, hashOptions) === objectHash(object2, hashOptions)) {
    return true;
  }
  return false;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  // eslint-disable-next-line require-yield
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function useBase(base, handler) {
  base = withoutTrailingSlash(base);
  if (!base || base === "/") {
    return handler;
  }
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _path = event._path || event.node.req.url || "/";
    event._path = withoutBase(event.path || "/", base);
    event.node.req.url = event._path;
    try {
      return await handler(event);
    } finally {
      event._path = event.node.req.url = _path;
    }
  });
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode$1(params[key]);
    }
  }
  return params;
}
function getRouterParam(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
const getHeader = getRequestHeader;
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function parseCookies(event) {
  return parse(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
  serializeOptions = { path: "/", ...serializeOptions };
  const cookieStr = serialize(name, value, serializeOptions);
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  const _optionsHash = objectHash(serializeOptions);
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && _optionsHash !== objectHash(parse(cookieValue));
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
const setHeader = setResponseHeader;
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders(
    getProxyRequestHeaders(event),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    // Hooks
    __publicField(this, "_onBeforeResponseCalled");
    __publicField(this, "_onAfterResponseCalled");
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const { pathname } = parseURL(info.url || "/");
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function mergeFetchOptions(input, defaults, Headers = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if (defaults?.params && input?.params) {
    merged.params = {
      ...defaults?.params,
      ...input?.params
    };
  }
  if (defaults?.query && input?.query) {
    merged.query = {
      ...defaults?.query,
      ...input?.query
    };
  }
  if (defaults?.headers && input?.headers) {
    merged.headers = new Headers(defaults?.headers || {});
    for (const [key, value] of new Headers(input?.headers || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers),
      response: void 0,
      error: void 0
    };
    context.options.method = context.options.method?.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(
        () => controller.abort(),
        context.options.timeout
      );
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = context.response.body && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}) => createFetch$1({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch || createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const inlineAppConfig = {
  "nuxt": {
    "buildId": "99183b56-9040-480e-ab66-711f9ddedafa"
  }
};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/oapi/*": {
        "cache": {
          "maxAge": "20"
        }
      },
      "/img/**": {
        "headers": {
          "cache-control": "public,max-age=1296000,s-maxage=1296000"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public,max-age=1296000,s-maxage=1296000"
        }
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "wssUri": "wss://ws-sport.sportdb.live",
    "wssEncodeUri": "wss://ws-sport.sportdb.live",
    "brandCode": "69477151",
    "isEncodeChat": true,
    "liveScoreImage": "https://img.sportdb.live/livescore-img",
    "snackbar": {
      "top": false,
      "bottom": true,
      "left": false,
      "right": true,
      "groups": true,
      "success": "#4caf50",
      "error": "#ff5252",
      "warning": "#fb8c00",
      "info": "#2196f3",
      "duration": 5000,
      "limit": 0,
      "messageClass": "",
      "messageActionClass": "",
      "zIndex": 9999,
      "dense": false,
      "shadow": true,
      "reverse": false,
      "border": "",
      "backgroundOpacity": 0.12,
      "backgroundColor": "currentColor",
      "baseBackgroundColor": "#ffffff",
      "dismissOnActionClick": false,
      "iconPresets": {}
    },
    "i18n": {
      "baseUrl": "",
      "defaultLocale": "vi",
      "defaultDirection": "ltr",
      "strategy": "prefix_except_default",
      "lazy": false,
      "rootRedirect": "",
      "routesNameSeparator": "___",
      "defaultLocaleRouteNameSuffix": "default",
      "skipSettingLocaleOnNavigate": false,
      "differentDomains": false,
      "trailingSlash": false,
      "configLocales": [
        "vi",
        "en"
      ],
      "locales": {
        "vi": {
          "domain": ""
        },
        "en": {
          "domain": ""
        }
      },
      "detectBrowserLanguage": false,
      "experimental": {
        "localeDetector": "",
        "switchLocalePathLinkSSR": false,
        "autoImportTranslationFunctions": false
      },
      "multiDomainLocales": false
    },
    "nuxt-seo": {
      "canonicalQueryWhitelist": [
        "page",
        "sort",
        "filter",
        "search",
        "q",
        "category",
        "tag"
      ]
    }
  },
  "apiBaseUrl": "https://bdl-api.moonknight-sport.live",
  "brandCode": "69477151",
  "apiLivescore": "https://api.sportdb.live",
  "snackbar": {
    "top": false,
    "bottom": true,
    "left": false,
    "right": true,
    "groups": true,
    "success": "#4caf50",
    "error": "#ff5252",
    "warning": "#fb8c00",
    "info": "#2196f3",
    "duration": 5000,
    "limit": 0,
    "messageClass": "",
    "messageActionClass": "",
    "zIndex": 9999,
    "dense": false,
    "shadow": true,
    "reverse": false,
    "border": "",
    "backgroundOpacity": 0.12,
    "backgroundColor": "currentColor",
    "baseBackgroundColor": "#ffffff",
    "dismissOnActionClick": false,
    "iconPresets": {}
  },
  "nuxt-site-config": {
    "stack": [
      {
        "_context": "system",
        "_priority": -15,
        "name": "bongdalu-FE-Moneysite",
        "env": "production"
      },
      {
        "_context": "package.json",
        "_priority": -10,
        "name": "Bongdalu"
      },
      {
        "_context": "@nuxtjs/i18n",
        "defaultLocale": "vi"
      }
    ],
    "version": "2.2.15",
    "debug": false
  },
  "nuxt-og-image": {
    "version": "3.0.0-rc.65",
    "satoriOptions": {},
    "resvgOptions": {},
    "sharpOptions": {},
    "publicStoragePath": "root:public",
    "defaults": {
      "emojis": "noto",
      "renderer": "satori",
      "component": "NuxtSeo",
      "extension": "png",
      "width": 1200,
      "height": 600,
      "cacheMaxAgeSeconds": 604800000
    },
    "debug": false,
    "baseCacheKey": "/cache/nuxt-og-image/3.0.0-rc.65",
    "fonts": [
      {
        "cacheKey": "Inter:400",
        "style": "normal",
        "weight": 400,
        "name": "Inter",
        "key": "nuxt-og-image:fonts:Inter-400.ttf.base64"
      },
      {
        "cacheKey": "Inter:700",
        "style": "normal",
        "weight": 700,
        "name": "Inter",
        "key": "nuxt-og-image:fonts:Inter-700.ttf.base64"
      }
    ],
    "hasNuxtIcon": false,
    "colorPreference": "light",
    "isNuxtContentDocumentDriven": false
  },
  "ipx": {
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": "../public"
    },
    "http": {
      "domains": []
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  if (!event) {
    return _sharedAppConfig;
  }
  if (event.context.nitro.appConfig) {
    return event.context.nitro.appConfig;
  }
  const appConfig$1 = klona(appConfig);
  event.context.nitro.appConfig = appConfig$1;
  return appConfig$1;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive$1(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive$1(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === void 0) {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    options: {},
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return Array.from(data.keys());
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        const keys = rawKeys.map((key) => mount.mountpoint + normalizeKey$1(key)).filter((key) => !maskedMounts.some((p) => key.startsWith(p)));
        allKeys.push(...keys);
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter((key) => key.startsWith(base) && !key.endsWith("$")) : allKeys.filter((key) => !key.endsWith("$"));
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    }
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {
  ["nuxt-og-image:fonts:Inter-400.ttf.base64"]: {
    import: () => import('./raw/Inter-400.ttf.mjs').then(r => r.default || r),
    meta: {"type":"text/plain; charset=utf-8","etag":"\"652cc-qEeSD1DXCSV8gPP2rnBA6ePGdZ4\"","mtime":"2024-09-13T14:12:02.787Z"}
  },
  ["nuxt-og-image:fonts:Inter-700.ttf.base64"]: {
    import: () => import('./raw/Inter-700.ttf.mjs').then(r => r.default || r),
    meta: {"type":"text/plain; charset=utf-8","etag":"\"674f0-FZReUXHhPTnY0HmYVn2iPpKm9ds\"","mtime":"2024-09-13T14:12:02.787Z"}
  }
};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.\:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/home/jusin/Desktop/bongdalu-non-docker/bongdalu-FE-Moneysite/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
const unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
const reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
const escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
const objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  const counts = /* @__PURE__ */ new Map();
  let logNum = 0;
  function log(message) {
    if (logNum < 100) {
      console.warn(message);
      logNum += 1;
    }
  }
  function walk(thing) {
    if (typeof thing === "function") {
      log(`Cannot stringify a function ${thing.name}`);
      return;
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          const proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            if (typeof thing.toJSON !== "function") {
              log(`Cannot stringify arbitrary non-POJOs ${thing.constructor.name}`);
            }
          } else if (Object.getOwnPropertySymbols(thing).length > 0) {
            log(`Cannot stringify POJOs with symbolic keys ${Object.getOwnPropertySymbols(thing).map((symbol) => symbol.toString())}`);
          } else {
            Object.keys(thing).forEach((key) => walk(thing[key]));
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    const type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify(thing.valueOf())})`;
      case "RegExp":
        return thing.toString();
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = thing.map((v, i) => i in thing ? stringify(v) : "");
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify).join(",")}])`;
      default:
        if (thing.toJSON) {
          let json = thing.toJSON();
          if (getType(json) === "String") {
            try {
              json = JSON.parse(json);
            } catch (e) {
            }
          }
          return stringify(json);
        }
        if (Object.getPrototypeOf(thing) === null) {
          if (Object.keys(thing).length === 0) {
            return "Object.create(null)";
          }
          return `Object.create(null,{${Object.keys(thing).map((key) => `${safeKey(key)}:{writable:true,enumerable:true,value:${stringify(thing[key])}}`).join(",")}})`;
        }
        return `{${Object.keys(thing).map((key) => `${safeKey(key)}:${stringify(thing[key])}`).join(",")}}`;
    }
  }
  const str = stringify(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (isPrimitive(thing)) {
        values.push(stringifyPrimitive(thing));
        return;
      }
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify(v)}`);
          });
          break;
        case "Set":
          values.push("new Set");
          statements.push(`${name}.${Array.from(thing).map((v) => `add(${stringify(v)})`).join(".")}`);
          break;
        case "Map":
          values.push("new Map");
          statements.push(`${name}.${Array.from(thing).map(([k, v]) => `set(${stringify(k)}, ${stringify(v)})`).join(".")}`);
          break;
        default:
          values.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach((key) => {
            statements.push(`${name}${safeProp(key)}=${stringify(thing[key])}`);
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(";")}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function getName(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string") {
    return stringifyString(thing);
  }
  if (thing === void 0) {
    return "void 0";
  }
  if (thing === 0 && 1 / thing < 0) {
    return "-0";
  }
  const str = String(thing);
  if (typeof thing === "number") {
    return str.replace(/^(-)?0\./, "$1.");
  }
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? `.${key}` : `[${escapeUnsafeChars(JSON.stringify(key))}]`;
}
function stringifyString(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}

function normalizeSiteConfig(config) {
  if (typeof config.indexable !== "undefined")
    config.indexable = String(config.indexable) !== "false";
  if (typeof config.trailingSlash !== "undefined" && !config.trailingSlash)
    config.trailingSlash = String(config.trailingSlash) !== "false";
  if (config.url && !hasProtocol(config.url, { acceptRelative: true, strict: false }))
    config.url = withHttps(config.url);
  const keys = Object.keys(config).sort((a, b) => a.localeCompare(b));
  const newConfig = {};
  for (const k of keys)
    newConfig[k] = config[k];
  return newConfig;
}
function createSiteConfigStack(options) {
  const debug = options?.debug || false;
  const stack = [];
  function push(input) {
    if (!input || typeof input !== "object" || Object.keys(input).length === 0)
      return;
    if (!input._context && debug) {
      let lastFunctionName = new Error("tmp").stack?.split("\n")[2].split(" ")[5];
      if (lastFunctionName?.includes("/"))
        lastFunctionName = "anonymous";
      input._context = lastFunctionName;
    }
    const entry = {};
    for (const k in input) {
      const val = input[k];
      if (typeof val !== "undefined" && val !== "")
        entry[k] = val;
    }
    if (Object.keys(entry).filter((k) => !k.startsWith("_")).length > 0)
      stack.push(entry);
  }
  function get(options2) {
    const siteConfig = {};
    if (options2?.debug)
      siteConfig._context = {};
    for (const o in stack.sort((a, b) => (a._priority || 0) - (b._priority || 0))) {
      for (const k in stack[o]) {
        const key = k;
        const val = options2?.resolveRefs ? toValue(stack[o][k]) : stack[o][k];
        if (!k.startsWith("_") && typeof val !== "undefined") {
          siteConfig[k] = val;
          if (options2?.debug)
            siteConfig._context[key] = stack[o]._context?.[key] || stack[o]._context || "anonymous";
        }
      }
    }
    return options2?.skipNormalize ? siteConfig : normalizeSiteConfig(siteConfig);
  }
  return {
    stack,
    push,
    get
  };
}

function envSiteConfig(env) {
  return Object.fromEntries(Object.entries(env).filter(([k]) => k.startsWith("NUXT_SITE_") || k.startsWith("NUXT_PUBLIC_SITE_")).map(([k, v]) => [
    k.replace(/^NUXT_(PUBLIC_)?SITE_/, "").split("_").map((s, i) => i === 0 ? s.toLowerCase() : s[0].toUpperCase() + s.slice(1).toLowerCase()).join(""),
    v
  ]));
}

function useSiteConfig(e, _options) {
  e.context.siteConfig = e.context.siteConfig || createSiteConfigStack();
  const options = defu(_options, useRuntimeConfig(e)["nuxt-site-config"], { debug: false });
  return e.context.siteConfig.get(options);
}

function useNitroOrigin(e) {
  const cert = process.env.NITRO_SSL_CERT;
  const key = process.env.NITRO_SSL_KEY;
  let host = process.env.NITRO_HOST || process.env.HOST || false;
  let port = false;
  let protocol = cert && key || !false ? "https" : "http";
  {
    host = getRequestHost(e, { xForwardedHost: true }) || host;
    protocol = getRequestProtocol(e, { xForwardedProto: true }) || protocol;
  }
  if (typeof host === "string" && host.includes(":")) {
    port = host.split(":").pop();
    host = host.split(":")[0];
  }
  port = port ? `:${port}` : "";
  return withTrailingSlash(`${protocol}://${host}${port}`);
}

function defineNitroPlugin(def) {
  return def;
}

const _yxBBcnQkJS = defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("render:html", async (ctx, { event }) => {
    const routeOptions = getRouteRules(event);
    const isIsland = process.env.NUXT_COMPONENT_ISLANDS && event.path.startsWith("/__nuxt_island");
    event.path;
    const noSSR = event.context.nuxt?.noSSR || routeOptions.ssr === false && !isIsland || (false);
    if (noSSR) {
      const siteConfig = Object.fromEntries(
        Object.entries(useSiteConfig(event)).map(([k, v]) => [k, toValue(v)])
      );
      ctx.body.push(`<script>window.__NUXT_SITE_CONFIG__=${devalue(siteConfig)}<\/script>`);
    }
  });
});

const _cRILGC2dfX = defineNitroPlugin(async (nitro) => {
  return;
});

const _QrFLsLAIEc = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:response", (response, { event }) => {
    delete response.headers["x-powered-by"];
    delete response.headers["x-robots-tag"];
  });
});

const plugins = [
  _yxBBcnQkJS,
_cRILGC2dfX,
_QrFLsLAIEc
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('./_/error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const assets = {
  "/_robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"3b-BjMaFA5kPNUYFNj1B3J05VKrxuI\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 59,
    "path": "../public/_robots.txt"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"5f1-oSY6tBrrmL3oH3OKHnyYnSO+fSE\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 1521,
    "path": "../public/favicon.ico"
  },
  "/logo.webp": {
    "type": "image/webp",
    "etag": "\"e10-Nk6cO5O3+KefHFxkOQ1WVOgbp3k\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 3600,
    "path": "../public/logo.webp"
  },
  "/main-sitemap.xsl": {
    "type": "application/xml",
    "etag": "\"1d8a-bwOWi3gCyxs/OcuHmhGjahNPj7o\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 7562,
    "path": "../public/main-sitemap.xsl"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"3b-BjMaFA5kPNUYFNj1B3J05VKrxuI\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 59,
    "path": "../public/robots.txt"
  },
  "/icon/analysis.png": {
    "type": "image/png",
    "etag": "\"110-DFOcftM6P4TTb4DeJwTsGsl0u9E\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 272,
    "path": "../public/icon/analysis.png"
  },
  "/icon/baccarat.svg": {
    "type": "image/svg+xml",
    "etag": "\"535-ZsRVo4KyEAMUosLD6fmOp2vo0G4\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 1333,
    "path": "../public/icon/baccarat.svg"
  },
  "/icon/back.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b8-1yM9DTtAVOYf2zvJRhBIt4wjP34\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 952,
    "path": "../public/icon/back.svg"
  },
  "/icon/calendar.svg": {
    "type": "image/svg+xml",
    "etag": "\"790-1/8A0YATezPCiEMjkjJrCr6D7jU\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 1936,
    "path": "../public/icon/calendar.svg"
  },
  "/icon/casino.svg": {
    "type": "image/svg+xml",
    "etag": "\"62b-xMNtQ5m6zBapAG/so+4fwFMQudM\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 1579,
    "path": "../public/icon/casino.svg"
  },
  "/icon/chess.svg": {
    "type": "image/svg+xml",
    "etag": "\"462-R++5b9kNgbYF8VC83zxvSNU65q8\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 1122,
    "path": "../public/icon/chess.svg"
  },
  "/icon/close.svg": {
    "type": "image/svg+xml",
    "etag": "\"72e-WfRoZWHO1nmCWGbKS8ROpP25XPQ\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 1838,
    "path": "../public/icon/close.svg"
  },
  "/icon/content-reply.svg": {
    "type": "image/svg+xml",
    "etag": "\"152-rPy0l4LL6DIGM5IO+iYnQ2DfDKw\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 338,
    "path": "../public/icon/content-reply.svg"
  },
  "/icon/discount.svg": {
    "type": "image/svg+xml",
    "etag": "\"d97-6FiIcGjWDMWT95MVkXNXIgUeD7I\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 3479,
    "path": "../public/icon/discount.svg"
  },
  "/icon/dislike.svg": {
    "type": "image/svg+xml",
    "etag": "\"f0c-GI9KIcXZ4JrMnDmQmuiOzLjBaEM\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 3852,
    "path": "../public/icon/dislike.svg"
  },
  "/icon/dot-live.png": {
    "type": "image/png",
    "etag": "\"b0-2YO2oxWVb1CKWFCS0DN9p4HBWhQ\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 176,
    "path": "../public/icon/dot-live.png"
  },
  "/icon/down.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f4-t/dhicA7ZxPYEQZaTj2v0ckdi44\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 756,
    "path": "../public/icon/down.svg"
  },
  "/icon/duangua.svg": {
    "type": "image/svg+xml",
    "etag": "\"1d47-MYhwzsKWJ+vx9OhI+zSataMvFGw\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 7495,
    "path": "../public/icon/duangua.svg"
  },
  "/icon/esport.svg": {
    "type": "image/svg+xml",
    "etag": "\"1173-T5YK5LIitaOWehVGyotCwhw4t14\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 4467,
    "path": "../public/icon/esport.svg"
  },
  "/icon/eye.svg": {
    "type": "image/svg+xml",
    "etag": "\"7c9-9+MsOINsG0o+9sCudycFjoNw3tw\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 1993,
    "path": "../public/icon/eye.svg"
  },
  "/icon/fire.svg": {
    "type": "image/svg+xml",
    "etag": "\"9e4-fYheTWqX/eRNL/m/q/DhIp3//w4\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 2532,
    "path": "../public/icon/fire.svg"
  },
  "/icon/flex.svg": {
    "type": "image/svg+xml",
    "etag": "\"6c0-Smbgfx8scIFig6EsJsmYMkfJRk0\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 1728,
    "path": "../public/icon/flex.svg"
  },
  "/icon/goal.png": {
    "type": "image/png",
    "etag": "\"3c49-gdp6qh49olDHUBQkWg0d34FY4W4\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 15433,
    "path": "../public/icon/goal.png"
  },
  "/icon/grid.svg": {
    "type": "image/svg+xml",
    "etag": "\"7dd-Gd85Gqe7NmuvvCAHeWzOO5tW5IY\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 2013,
    "path": "../public/icon/grid.svg"
  },
  "/icon/in.gif": {
    "type": "image/gif",
    "etag": "\"58-pzdDr1WR7DOso7zgnMA9+dkOsQ8\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 88,
    "path": "../public/icon/in.gif"
  },
  "/icon/in2.gif": {
    "type": "image/gif",
    "etag": "\"58-a1Kq6zpejpHloNu0DREIo/BD88c\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 88,
    "path": "../public/icon/in2.gif"
  },
  "/icon/left.svg": {
    "type": "image/svg+xml",
    "etag": "\"372-OvqGfPrHigv7E8orj+Vl7hvX2BA\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 882,
    "path": "../public/icon/left.svg"
  },
  "/icon/like.svg": {
    "type": "image/svg+xml",
    "etag": "\"ed9-rNnusRHv7sCuBDzoiGskL7b8Nas\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 3801,
    "path": "../public/icon/like.svg"
  },
  "/icon/live.svg": {
    "type": "image/svg+xml",
    "etag": "\"f48-+idZ0wuJuPCWukkXwXjATGDpP5I\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 3912,
    "path": "../public/icon/live.svg"
  },
  "/icon/mingcute.svg": {
    "type": "image/svg+xml",
    "etag": "\"1cd-noB1IBgQJPVBSHbA2RhRbWvTXY0\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 461,
    "path": "../public/icon/mingcute.svg"
  },
  "/icon/new.svg": {
    "type": "image/svg+xml",
    "etag": "\"12c6-IzuX+gGSfeAV6nrzQ0Uzm5mnRLU\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 4806,
    "path": "../public/icon/new.svg"
  },
  "/icon/nodata.svg": {
    "type": "image/svg+xml",
    "etag": "\"38f5-A/f2cGiX+hyg5wm7zbAVudtUaYw\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 14581,
    "path": "../public/icon/nodata.svg"
  },
  "/icon/nosearch.svg": {
    "type": "image/svg+xml",
    "etag": "\"3049-yVR/AjVGhvRoa9ykrYG6aWNYDvo\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 12361,
    "path": "../public/icon/nosearch.svg"
  },
  "/icon/notify.svg": {
    "type": "image/svg+xml",
    "etag": "\"a04-wt7sTPUEF3eFU7RmqcS4iX5jebk\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 2564,
    "path": "../public/icon/notify.svg"
  },
  "/icon/promotion.svg": {
    "type": "image/svg+xml",
    "etag": "\"bc6-YnpN2lpkmijakgdp0uRN9gtBnJk\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 3014,
    "path": "../public/icon/promotion.svg"
  },
  "/icon/reply.svg": {
    "type": "image/svg+xml",
    "etag": "\"16a-At01OaKUozQchN209l+RsOQnN1M\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 362,
    "path": "../public/icon/reply.svg"
  },
  "/icon/right.svg": {
    "type": "image/svg+xml",
    "etag": "\"359-wKNdlF6MhHtVn71EBBnebOLtMro\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 857,
    "path": "../public/icon/right.svg"
  },
  "/icon/scrollToTop.f159ff2.svg": {
    "type": "image/svg+xml",
    "etag": "\"c5-LZ65iqGJPcXBrIz6rUdgapwK9TQ\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 197,
    "path": "../public/icon/scrollToTop.f159ff2.svg"
  },
  "/icon/search.svg": {
    "type": "image/svg+xml",
    "etag": "\"616-z+/KOkkfog2dP7VyvmHtyS3ift4\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 1558,
    "path": "../public/icon/search.svg"
  },
  "/icon/send.svg": {
    "type": "image/svg+xml",
    "etag": "\"391-XUlN88rHan5MAYJiH7+Nl9K6liw\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 913,
    "path": "../public/icon/send.svg"
  },
  "/icon/skype.svg": {
    "type": "image/svg+xml",
    "etag": "\"cc6-nImZv29ZJe0sAYKjN5jlmH5Olf4\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 3270,
    "path": "../public/icon/skype.svg"
  },
  "/icon/star.svg": {
    "type": "image/svg+xml",
    "etag": "\"26f-8CmG3H5rNfaV8Hew2956+8NMGpo\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 623,
    "path": "../public/icon/star.svg"
  },
  "/icon/tv.png": {
    "type": "image/png",
    "etag": "\"20f-p+8tb1I7sU2gVl2kKX2WNRbdTC0\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 527,
    "path": "../public/icon/tv.png"
  },
  "/icon/twitter.svg": {
    "type": "image/svg+xml",
    "etag": "\"8f2-HXchdQFIbEXKIeUgYXTs2lPxx2s\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 2290,
    "path": "../public/icon/twitter.svg"
  },
  "/icon/user.png": {
    "type": "image/png",
    "etag": "\"127f-LlkJbCK1MhUzatr1q0Tp5yF80uw\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 4735,
    "path": "../public/icon/user.png"
  },
  "/icon/user.svg": {
    "type": "image/svg+xml",
    "etag": "\"c29-oFW68wm3m1Huu31DjXfDwhG+10k\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 3113,
    "path": "../public/icon/user.svg"
  },
  "/icon/view.svg": {
    "type": "image/svg+xml",
    "etag": "\"83b-sHHmDo0VsQewMI83bJ6FEm7qgHM\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 2107,
    "path": "../public/icon/view.svg"
  },
  "/icon/zalo_icon.png": {
    "type": "image/png",
    "etag": "\"636c-rAOrnpMD9anwNrQ575wQUNC5CmA\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 25452,
    "path": "../public/icon/zalo_icon.png"
  },
  "/icon/zalo_icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"1223-ZaG9EA2TG5bL2+4cT6fU/VXuyJM\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 4643,
    "path": "../public/icon/zalo_icon.svg"
  },
  "/_nuxt/00yf2fq6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ecef-iffyFOGjFTqyYthsBwZ0SXq7ifs\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 126191,
    "path": "../public/_nuxt/00yf2fq6.js"
  },
  "/_nuxt/2hagh5Uc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e70-gQpFYvtTeVXsW7Rx/5H+zK2blX4\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 3696,
    "path": "../public/_nuxt/2hagh5Uc.js"
  },
  "/_nuxt/3bue5Vy1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"807-L1vYtduFOqmMQMiiKPGjW1AC6nk\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 2055,
    "path": "../public/_nuxt/3bue5Vy1.js"
  },
  "/_nuxt/57B6E0Gr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c4-T7Lk8/yxMacQ29GEFeadCbFKvYA\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 452,
    "path": "../public/_nuxt/57B6E0Gr.js"
  },
  "/_nuxt/7sItJrXI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"104-zx0vbNWaoV3KYM4ROW+8yt/XeHA\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 260,
    "path": "../public/_nuxt/7sItJrXI.js"
  },
  "/_nuxt/9l8mKKbO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"58-vbKwSLzsUfIqhxaKLSQu6SoWf04\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 88,
    "path": "../public/_nuxt/9l8mKKbO.js"
  },
  "/_nuxt/B0IwuF_2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4790-XfGv7x/OH0F8EbnBG5gVLEHkrTQ\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 18320,
    "path": "../public/_nuxt/B0IwuF_2.js"
  },
  "/_nuxt/B0tMs5sT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3511-55Jd+mxFsRFYqwfXAQTBh3zceZ4\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 13585,
    "path": "../public/_nuxt/B0tMs5sT.js"
  },
  "/_nuxt/B2ddP1-m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"678b-T7ZUMntKvBU1KWadZbVVI8sUrWU\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 26507,
    "path": "../public/_nuxt/B2ddP1-m.js"
  },
  "/_nuxt/B2gsc1f-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18ae2-wDWK0OTP49XwLDZp++rRuoL15RI\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 101090,
    "path": "../public/_nuxt/B2gsc1f-.js"
  },
  "/_nuxt/BBonv1rk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1da-oDImMXoG2ufHhemOrhkijXURmeE\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 474,
    "path": "../public/_nuxt/BBonv1rk.js"
  },
  "/_nuxt/BDKm1qFk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2563-ed+cuyZtMd1Z9OvNQvFmT4irEZU\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 9571,
    "path": "../public/_nuxt/BDKm1qFk.js"
  },
  "/_nuxt/BDfbvjHo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"631-/9rbIWnXPRNzr4qjgNTT0vsQdDo\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 1585,
    "path": "../public/_nuxt/BDfbvjHo.js"
  },
  "/_nuxt/BJ0GkItw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fed-ZpPaywOVNNDL0ol186c4MpUvaec\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 4077,
    "path": "../public/_nuxt/BJ0GkItw.js"
  },
  "/_nuxt/BMBIGFIQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"140-J+u/8cqKWC1ja1bi8zLF4l4eFxw\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 320,
    "path": "../public/_nuxt/BMBIGFIQ.js"
  },
  "/_nuxt/BNGCi-t4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"892-wFXbQDvpHpPbicB4GurvXfSvO7w\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 2194,
    "path": "../public/_nuxt/BNGCi-t4.js"
  },
  "/_nuxt/BNMaoHuJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b41-stVl36Is4KAE0KHA7dUcSSrK00I\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 11073,
    "path": "../public/_nuxt/BNMaoHuJ.js"
  },
  "/_nuxt/BVMOqxyb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e6b-TeambBeh74TNKid04lQq22qHYpY\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 3691,
    "path": "../public/_nuxt/BVMOqxyb.js"
  },
  "/_nuxt/BZ9BLLlN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b15-gaCzcM2r4Az1UI9LFz6VIeUQJEg\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 15125,
    "path": "../public/_nuxt/BZ9BLLlN.js"
  },
  "/_nuxt/BaseInput.BjGJgALY.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"72e-lb/75QqGdhbL/KKBtR6eX04tgrI\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 1838,
    "path": "../public/_nuxt/BaseInput.BjGJgALY.css"
  },
  "/_nuxt/BawNIxXQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"adb-hqlDWzsrGqVJHFLjMzCXsVY7+Vc\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 2779,
    "path": "../public/_nuxt/BawNIxXQ.js"
  },
  "/_nuxt/Be1asyvo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"689-wRbRe7HuHP3Bu1XMzrfU6YoDir8\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 1673,
    "path": "../public/_nuxt/Be1asyvo.js"
  },
  "/_nuxt/Bhwi6TLm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a8fbe-7YeLbTEEMBAQ4wQ915/snQ7KXdg\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 692158,
    "path": "../public/_nuxt/Bhwi6TLm.js"
  },
  "/_nuxt/BiaKS2Ll.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"296-wPNKDoir7kQB2OKT3TuvelnVxEM\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 662,
    "path": "../public/_nuxt/BiaKS2Ll.js"
  },
  "/_nuxt/Bnn58bZQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1780-UK8r9wxhelNZGKOsyBWlxlz5Ats\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 6016,
    "path": "../public/_nuxt/Bnn58bZQ.js"
  },
  "/_nuxt/Bxk5PY0E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24dd-5oP8+AHxr7UEQqkWTlLXT0ZQgVo\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 9437,
    "path": "../public/_nuxt/Bxk5PY0E.js"
  },
  "/_nuxt/C-EXIEsM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ce5-MuLpWJUNXMCq88mCW96ekn2OC74\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 7397,
    "path": "../public/_nuxt/C-EXIEsM.js"
  },
  "/_nuxt/C-bFYicT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"334-VS6AACrTgVTTVaYGeBPJQVj3cos\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 820,
    "path": "../public/_nuxt/C-bFYicT.js"
  },
  "/_nuxt/C4VpWDAJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2282-GbUx4Ktaff+m5DQ2DT9pGQGV5lw\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 8834,
    "path": "../public/_nuxt/C4VpWDAJ.js"
  },
  "/_nuxt/C4iS2aBk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b3-o9Id3CDTZiyHMt0DQm8BH8tn/R4\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 691,
    "path": "../public/_nuxt/C4iS2aBk.js"
  },
  "/_nuxt/C57OqgLg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"95c7-yVTmIe40lZImvPldqO/cDlOOufg\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 38343,
    "path": "../public/_nuxt/C57OqgLg.js"
  },
  "/_nuxt/CAOPt_FK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e69-YBHgoBd+wT7XX0WUtctVbZqssZQ\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 3689,
    "path": "../public/_nuxt/CAOPt_FK.js"
  },
  "/_nuxt/CF2VPTuC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"668-I9iQwxS43+9tZEeBxVUcYIpG9O0\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 1640,
    "path": "../public/_nuxt/CF2VPTuC.js"
  },
  "/_nuxt/CF8EZ_pR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2296-dznKr/L9uHLabvVCVIhf4zkVyNw\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 8854,
    "path": "../public/_nuxt/CF8EZ_pR.js"
  },
  "/_nuxt/CH8W70Yh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f81-WRFuHVhVK32ssklfaPLJQt01/+E\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 3969,
    "path": "../public/_nuxt/CH8W70Yh.js"
  },
  "/_nuxt/CN0EWcfV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"47fb-9goCCUypEJgjrefzXFzR3xVCEeM\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 18427,
    "path": "../public/_nuxt/CN0EWcfV.js"
  },
  "/_nuxt/CSIndOhP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2db9-ERnAJuhJsUlq0GwgDY+16sqVzTU\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 11705,
    "path": "../public/_nuxt/CSIndOhP.js"
  },
  "/_nuxt/CSjg2X3r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29c2-tlmypOKgAR16Nfk4wDvPxlTefLI\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 10690,
    "path": "../public/_nuxt/CSjg2X3r.js"
  },
  "/_nuxt/CT4kEpxe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"745-uyOO9Ae6vL/3Be94HNJVSmbB1qE\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 1861,
    "path": "../public/_nuxt/CT4kEpxe.js"
  },
  "/_nuxt/CUlXbiQc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1da-kHdgDZK2SnY0fiSSuz9x6rzoSrs\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 474,
    "path": "../public/_nuxt/CUlXbiQc.js"
  },
  "/_nuxt/CZ1q2x0q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ee-ORV8HTqPCKURW95hXciXeAuZ6+A\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 238,
    "path": "../public/_nuxt/CZ1q2x0q.js"
  },
  "/_nuxt/C_-dA3Th.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a6-okD5K1puynwc45bCdz/HL9UDmUI\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 422,
    "path": "../public/_nuxt/C_-dA3Th.js"
  },
  "/_nuxt/CbcL0TeM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4b-grzgLypR0aJp4e+Iif/u8WeyJWI\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 75,
    "path": "../public/_nuxt/CbcL0TeM.js"
  },
  "/_nuxt/Cbzb-SDH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ceeeb-eQtVz3C6I4B21fyDnU4leOj3GBg\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 847595,
    "path": "../public/_nuxt/Cbzb-SDH.js"
  },
  "/_nuxt/CiaLkGxl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30d0-PErldZBePcILrGL64EZTmQ9F6Jo\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 12496,
    "path": "../public/_nuxt/CiaLkGxl.js"
  },
  "/_nuxt/CihfQNXw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9378-VJpo1ZwCIfOcXmKktYEeT75p0Q8\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 37752,
    "path": "../public/_nuxt/CihfQNXw.js"
  },
  "/_nuxt/CjZHSXHJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"672a-B763Erruq/beg/8uiGywqW/pfck\"",
    "mtime": "2024-09-13T14:12:32.539Z",
    "size": 26410,
    "path": "../public/_nuxt/CjZHSXHJ.js"
  },
  "/_nuxt/CkWzdPZ-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"45a9-30bHDiVMdG5mZkTcpKV5FhHWmDw\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 17833,
    "path": "../public/_nuxt/CkWzdPZ-.js"
  },
  "/_nuxt/CnAzBXKT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6c-xPCUh7acUmJG9cqXApyvx7l1F5M\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 108,
    "path": "../public/_nuxt/CnAzBXKT.js"
  },
  "/_nuxt/CnJNAMZb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f34e-n2DMIuqvSb6kjPeRgHJb/tFedOw\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 324430,
    "path": "../public/_nuxt/CnJNAMZb.js"
  },
  "/_nuxt/D0xLcGF1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"130-yntrGe2XrNm2rlX7a0T+5o3ZqLQ\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 304,
    "path": "../public/_nuxt/D0xLcGF1.js"
  },
  "/_nuxt/D2k9yEDv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cb-ZS5gD+4uf5cdpI2l4zvJzXwoxzY\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 203,
    "path": "../public/_nuxt/D2k9yEDv.js"
  },
  "/_nuxt/D4SPyzgJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c3-ow+zsMwO7UxKRZ3XD82L5GQy+3Q\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 195,
    "path": "../public/_nuxt/D4SPyzgJ.js"
  },
  "/_nuxt/D5kdQ-ou.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a9d-sPUTZB0NZ4+omIzIXvB0XcbHnYg\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 19101,
    "path": "../public/_nuxt/D5kdQ-ou.js"
  },
  "/_nuxt/DIwQhYXr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8bf-SgpezxByONzQkvMXe8ujtPfm7vM\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 2239,
    "path": "../public/_nuxt/DIwQhYXr.js"
  },
  "/_nuxt/DJ07u4f4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1da-OrdIuURZiBcNwfcO4lzKqD503fo\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 474,
    "path": "../public/_nuxt/DJ07u4f4.js"
  },
  "/_nuxt/DJqI8XLp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a2f-9NF9g9OS0/lJ71Q2TBbn+YFKIEQ\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 10799,
    "path": "../public/_nuxt/DJqI8XLp.js"
  },
  "/_nuxt/DRizsLw2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1378-8sqxjDmisgyujqkVIFeVu5pyR84\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 4984,
    "path": "../public/_nuxt/DRizsLw2.js"
  },
  "/_nuxt/DSMZSk9r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a7b-EZ+i0cYEqT+fYH+AFCqaUja5F3Y\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 6779,
    "path": "../public/_nuxt/DSMZSk9r.js"
  },
  "/_nuxt/DSYfm7We.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3dd-kYZ5gBl7SeWMYGSeqdw3NVPCu/I\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 989,
    "path": "../public/_nuxt/DSYfm7We.js"
  },
  "/_nuxt/DTsNOZ30.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12efd-vMbchVbX5M4DPyRckaf45HoI9Uo\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 77565,
    "path": "../public/_nuxt/DTsNOZ30.js"
  },
  "/_nuxt/DUjn5l1T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ba7d-AIOcH7ZryMoNrPrjuzA8fANG3xY\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 47741,
    "path": "../public/_nuxt/DUjn5l1T.js"
  },
  "/_nuxt/DZKxJnL1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c1f-RuKgyWYUVPb/4qldwTSvLcZR3Vk\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 11295,
    "path": "../public/_nuxt/DZKxJnL1.js"
  },
  "/_nuxt/DaEl2alL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"585-clOPyRInsOv9w9Fd+pG8VJVpOfU\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 1413,
    "path": "../public/_nuxt/DaEl2alL.js"
  },
  "/_nuxt/DbNl3Nrw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"561-57NMFZ8QpX76iqVyJgpeMFuhXOQ\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 1377,
    "path": "../public/_nuxt/DbNl3Nrw.js"
  },
  "/_nuxt/DbwuMxDD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1326-nNykrUsWU4JHD1MwiW+HJqiGhiU\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 4902,
    "path": "../public/_nuxt/DbwuMxDD.js"
  },
  "/_nuxt/DjPZDUms.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e4e-SAOjahr/ROnAvoke9HpqG3t4t24\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 3662,
    "path": "../public/_nuxt/DjPZDUms.js"
  },
  "/_nuxt/DoHqlvKP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6b2b-1FH6K9B19VTgc+JQ0/CeaBbFpfE\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 27435,
    "path": "../public/_nuxt/DoHqlvKP.js"
  },
  "/_nuxt/DreSOvTO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1af-EJG0YzABQokvsA6Qi8C7AqUhymg\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 431,
    "path": "../public/_nuxt/DreSOvTO.js"
  },
  "/_nuxt/DuHqTucL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b1-x+JVd7u2RlJyuXnQjMxgF8Intbk\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 177,
    "path": "../public/_nuxt/DuHqTucL.js"
  },
  "/_nuxt/DviUBMfx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b51-FtWLWwuBf6mPmGichmPBqlvFIP8\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 6993,
    "path": "../public/_nuxt/DviUBMfx.js"
  },
  "/_nuxt/HeaderComponent.CJIvoM_v.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"25-7t+1q3wdZcOtbyHwANhoxwL8tkk\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 37,
    "path": "../public/_nuxt/HeaderComponent.CJIvoM_v.css"
  },
  "/_nuxt/Ius7YDr3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"395-8HJ1Om+yAgJuLfa3XR8RPeb+Wqs\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 917,
    "path": "../public/_nuxt/Ius7YDr3.js"
  },
  "/_nuxt/Jhl8d1zC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"74e-1JmNDWpu8HifLMw9K1wcz9U1ajY\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 1870,
    "path": "../public/_nuxt/Jhl8d1zC.js"
  },
  "/_nuxt/K7grDef2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"45c8-+YHF9cpomzNJrJAZ2Np70GmQfJE\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 17864,
    "path": "../public/_nuxt/K7grDef2.js"
  },
  "/_nuxt/ModalLogin.4uVyWtnJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5c-uduRLwjdLey0VDoWs7HIjc6PXec\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 92,
    "path": "../public/_nuxt/ModalLogin.4uVyWtnJ.css"
  },
  "/_nuxt/ModalSearch.BjyATHhk.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ec3-tv29Py6130foA00xHs26d786iEs\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 7875,
    "path": "../public/_nuxt/ModalSearch.BjyATHhk.css"
  },
  "/_nuxt/NgaJF3qw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9b-qt1iemYJlC/O8u06uroGqCN8XTk\"",
    "mtime": "2024-09-13T14:12:32.540Z",
    "size": 155,
    "path": "../public/_nuxt/NgaJF3qw.js"
  },
  "/_nuxt/PopupOddsChange.BLtsgEGt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4322-DiQsLihKjALicTR2wxKoFe+Cq+8\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 17186,
    "path": "../public/_nuxt/PopupOddsChange.BLtsgEGt.css"
  },
  "/_nuxt/RE3lIP6J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2495-0bDmOwesKT89afjWZoH8u1Uv75Q\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 9365,
    "path": "../public/_nuxt/RE3lIP6J.js"
  },
  "/_nuxt/TabTableMobile.DQcJbpec.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"86-f2mJZJdmcOcjHBmcFhoop7NF+UE\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 134,
    "path": "../public/_nuxt/TabTableMobile.DQcJbpec.css"
  },
  "/_nuxt/TableHonor.JkyxQXoT.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"23a-6wr9lWU38faAtWj0TqpRKChM4AQ\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 570,
    "path": "../public/_nuxt/TableHonor.JkyxQXoT.css"
  },
  "/_nuxt/Uwu1cGqc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8ff8-YmihJ2ywlmByFgQ6B5u2xeXIquc\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 36856,
    "path": "../public/_nuxt/Uwu1cGqc.js"
  },
  "/_nuxt/Vz9GndG1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"da5-zq6rbajqsSP/nMQlguLRmMR/+xc\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 3493,
    "path": "../public/_nuxt/Vz9GndG1.js"
  },
  "/_nuxt/W42xVFLl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17e6-srjo/fuPN0eXiJ/a3LjIUF0oAh8\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 6118,
    "path": "../public/_nuxt/W42xVFLl.js"
  },
  "/_nuxt/W7L4x8jM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"209d7-Qx6EXRE4/y8evLVkMNuVhs3K+10\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 133591,
    "path": "../public/_nuxt/W7L4x8jM.js"
  },
  "/_nuxt/_id_.0FcCalcR.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d95-YAK3T+B5X6o9+CBDRDucPQyby88\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 3477,
    "path": "../public/_nuxt/_id_.0FcCalcR.css"
  },
  "/_nuxt/_id_.SmfL1XYW.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2bca-m71+cgozmOPQeDrCVX+ZELlgZ00\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 11210,
    "path": "../public/_nuxt/_id_.SmfL1XYW.css"
  },
  "/_nuxt/_id_.pxLIFlZ-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"192a-6nlRqVO/9+U97MMCL3mmIPTIySs\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 6442,
    "path": "../public/_nuxt/_id_.pxLIFlZ-.css"
  },
  "/_nuxt/_match_id_.3P1SCTCi.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b2-x6CO4KSXzIoyVXq0x7VtSaCavt0\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 178,
    "path": "../public/_nuxt/_match_id_.3P1SCTCi.css"
  },
  "/_nuxt/_match_id_.B2hHd5TQ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a3-33+isG3/GMXiMMZ3R7BUGamNhms\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 419,
    "path": "../public/_nuxt/_match_id_.B2hHd5TQ.css"
  },
  "/_nuxt/_match_id_.BNxX79Y4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4477-F+Hi8Md0LcTkZghQK+beBB/wHtM\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 17527,
    "path": "../public/_nuxt/_match_id_.BNxX79Y4.css"
  },
  "/_nuxt/_match_id_.DkOET8M7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"77c-y3+noxij7HeOqRnTkG4wlbB4nFs\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 1916,
    "path": "../public/_nuxt/_match_id_.DkOET8M7.css"
  },
  "/_nuxt/_match_id_.e_2uYXt2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a3-DZM1BaDxIr9L4kUbhmuuBekFNrQ\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 419,
    "path": "../public/_nuxt/_match_id_.e_2uYXt2.css"
  },
  "/_nuxt/_match_id_.rbher5Ou.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1af-A6KCOWG2gh/IZtHo2mgPLD9Gjmc\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 431,
    "path": "../public/_nuxt/_match_id_.rbher5Ou.css"
  },
  "/_nuxt/_news_.B1zzOU36.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5b-IqupvNyKNrOwE5Frl6a3YFrz6xc\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 91,
    "path": "../public/_nuxt/_news_.B1zzOU36.css"
  },
  "/_nuxt/a0r9Xjwf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f0-hpiMuAKjOYyeuUe7JdDMV/tdowo\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 496,
    "path": "../public/_nuxt/a0r9Xjwf.js"
  },
  "/_nuxt/default.D9DhEDhn.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"de89-5jLFR0LZ+Y8R138anbMFGuaDNYA\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 56969,
    "path": "../public/_nuxt/default.D9DhEDhn.css"
  },
  "/_nuxt/error.DT8kwt7s.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"daa5-P3bPLZc9Ep0qYWTix9ekIe2W5kM\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 55973,
    "path": "../public/_nuxt/error.DT8kwt7s.css"
  },
  "/_nuxt/h2h-_match_id_.92fGSIIt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e0c-BW8O+Fx+32CVzy5tousKuWHmCzs\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 7692,
    "path": "../public/_nuxt/h2h-_match_id_.92fGSIIt.css"
  },
  "/_nuxt/h4r494vz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"97c5-01daZ+HDCX7wTpND7DkohmPHRLE\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 38853,
    "path": "../public/_nuxt/h4r494vz.js"
  },
  "/_nuxt/iconfont.C0AG3uAx.woff": {
    "type": "font/woff",
    "etag": "\"654c-sS5FsFaICTg+dbbNXuyHWa0Md/w\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 25932,
    "path": "../public/_nuxt/iconfont.C0AG3uAx.woff"
  },
  "/_nuxt/iconfont.CLex_wun.ttf": {
    "type": "font/ttf",
    "etag": "\"a2dc-I0v7vLrXh8cz0yGLi6ehrpo0DE8\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 41692,
    "path": "../public/_nuxt/iconfont.CLex_wun.ttf"
  },
  "/_nuxt/iconfont.cv4LEg17.woff2": {
    "type": "font/woff2",
    "etag": "\"5688-I1YbMIgu0V5cdc1YBmWOaVF5K+U\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 22152,
    "path": "../public/_nuxt/iconfont.cv4LEg17.woff2"
  },
  "/_nuxt/index.BRKmpcRd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"613-wp6tZK5uEXciO67frnoz6wEmKLo\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 1555,
    "path": "../public/_nuxt/index.BRKmpcRd.css"
  },
  "/_nuxt/index.DXtOakXf.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a72-86mJOxiel47nFjMDlFII9pYkrEo\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 6770,
    "path": "../public/_nuxt/index.DXtOakXf.css"
  },
  "/_nuxt/index.bfcVWAE4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11e3-+A7NtrXk2C/dp0AR1yfqlkTN3Js\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 4579,
    "path": "../public/_nuxt/index.bfcVWAE4.css"
  },
  "/_nuxt/kYHzYbc-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c3-TnT5rdED8tj6b+QX+EMDXqkdPco\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 195,
    "path": "../public/_nuxt/kYHzYbc-.js"
  },
  "/_nuxt/lNP0aeMR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b97-RyI/UD6+yuOcTc8nmAJYVnWORnw\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 7063,
    "path": "../public/_nuxt/lNP0aeMR.js"
  },
  "/_nuxt/lazy-load.DkekM2s9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3b7-in/vokNNuzL+YSyjpGi5z3HGx+A\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 951,
    "path": "../public/_nuxt/lazy-load.DkekM2s9.css"
  },
  "/_nuxt/lnhPhNOP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8c06-xRSA+FkgYOgec69OQTYf/UR1OME\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 35846,
    "path": "../public/_nuxt/lnhPhNOP.js"
  },
  "/_nuxt/mJVOXrWw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e47-Hw7MV/CmCp4uOReH3TM0qZ4VrRM\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 7751,
    "path": "../public/_nuxt/mJVOXrWw.js"
  },
  "/_nuxt/mpfzOiY3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"44a6-/ocFw3bDdf4Ayo9BCjxMbVWo+mo\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 17574,
    "path": "../public/_nuxt/mpfzOiY3.js"
  },
  "/_nuxt/player-statistics.CLkqO84Y.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6c5-EqrFR5wnNjg9xq2fcEZmQyS3qv8\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 1733,
    "path": "../public/_nuxt/player-statistics.CLkqO84Y.css"
  },
  "/_nuxt/q3Vw7hTM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4ada-Be+9Dvcv0Q0r3NQKub0x9TpLaDs\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 19162,
    "path": "../public/_nuxt/q3Vw7hTM.js"
  },
  "/_nuxt/rank.1Qhlozz0.svg": {
    "type": "image/svg+xml",
    "etag": "\"1036-1MLLC5x2ujP+X+wGsknzJp4m/+U\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 4150,
    "path": "../public/_nuxt/rank.1Qhlozz0.svg"
  },
  "/_nuxt/red.CmytILDI.mp3": {
    "type": "audio/mpeg",
    "etag": "\"295f-/aifTwn476CRozoV9Na8w12qggU\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 10591,
    "path": "../public/_nuxt/red.CmytILDI.mp3"
  },
  "/_nuxt/sa_3Auql.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a4-CbVPG+ET435KI6o3B/MqXPkxkg4\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 164,
    "path": "../public/_nuxt/sa_3Auql.js"
  },
  "/_nuxt/schedule-_league_id_.CcXJ9CWx.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f0f-5SZmU0Uj2YFJL8Isv9I1/9Ne60o\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 3855,
    "path": "../public/_nuxt/schedule-_league_id_.CcXJ9CWx.css"
  },
  "/_nuxt/sound3.5uI_3FNV.mp3": {
    "type": "audio/mpeg",
    "etag": "\"1047-0rYvimhTZb/wnvfHzA87AXLXeEw\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 4167,
    "path": "../public/_nuxt/sound3.5uI_3FNV.mp3"
  },
  "/_nuxt/standings-_league_id_.IRdYpzba.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a13-6uBo+0XIccGhjo8dfSAyejOwxJE\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 2579,
    "path": "../public/_nuxt/standings-_league_id_.IRdYpzba.css"
  },
  "/_nuxt/vgEqXT4o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"156-kFYD9k7yrXqX/Use9zZUGDFm+rs\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 342,
    "path": "../public/_nuxt/vgEqXT4o.js"
  },
  "/_nuxt/wXEbj_DD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6d8d-YGuwWGiwLJYC2dJOm/ANXwBDvtw\"",
    "mtime": "2024-09-13T14:12:32.541Z",
    "size": 28045,
    "path": "../public/_nuxt/wXEbj_DD.js"
  },
  "/img/1649409433548f14.png": {
    "type": "image/png",
    "etag": "\"115b-ht4UiirbzfqX5nK8s6t+sOifmU8\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 4443,
    "path": "../public/img/1649409433548f14.png"
  },
  "/img/1gtqkznmt9308f14.png": {
    "type": "image/png",
    "etag": "\"23c1-j0EzwVbYT8xx9yOF/S+u5qiJFzI\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 9153,
    "path": "../public/img/1gtqkznmt9308f14.png"
  },
  "/img/2.png": {
    "type": "image/png",
    "etag": "\"ee-92DfIA4osS34cjCRW+qtWJKkhEo\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 238,
    "path": "../public/img/2.png"
  },
  "/img/20131931638.jpg": {
    "type": "image/jpeg",
    "etag": "\"13eb-2UieUUVy8nAty420L0s6ly/iHUM\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 5099,
    "path": "../public/img/20131931638.jpg"
  },
  "/img/20240311085128.gif": {
    "type": "image/gif",
    "etag": "\"a03a-vJiiO+zMHCUJCYthxUVZJuna9UA\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 41018,
    "path": "../public/img/20240311085128.gif"
  },
  "/img/Baseball.png": {
    "type": "image/png",
    "etag": "\"310-cl2vgUImtxz0R0dJ1lwPkYxkiv8\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 784,
    "path": "../public/img/Baseball.png"
  },
  "/img/Facebook.png": {
    "type": "image/png",
    "etag": "\"2ae-etn8n5wW5O21T/Zk2oKZFs/yFT0\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 686,
    "path": "../public/img/Facebook.png"
  },
  "/img/Footballpitch.png": {
    "type": "image/png",
    "etag": "\"4d1f-dZk6mwuwGJki4paKxptG6/BczHg\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 19743,
    "path": "../public/img/Footballpitch.png"
  },
  "/img/Telegram.png": {
    "type": "image/png",
    "etag": "\"226-8oMRAsvBGOmk20hpiGguult2aZY\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 550,
    "path": "../public/img/Telegram.png"
  },
  "/img/Tennis.png": {
    "type": "image/png",
    "etag": "\"3f4-yOp2qXziz9yRCvbYVYW9ZhJKC4o\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 1012,
    "path": "../public/img/Tennis.png"
  },
  "/img/Twitter.png": {
    "type": "image/png",
    "etag": "\"491-1SzLIfG/v57F4tHZS63NzygwJ4w\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 1169,
    "path": "../public/img/Twitter.png"
  },
  "/img/allno.png": {
    "type": "image/png",
    "etag": "\"f9-n/3SC9qrjOxEiQfFRVTVVWDgsGg\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 249,
    "path": "../public/img/allno.png"
  },
  "/img/appstore.webp": {
    "type": "image/webp",
    "etag": "\"6c0-IvpzAYrh0T11jk6n0QQbvlLHljU\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 1728,
    "path": "../public/img/appstore.webp"
  },
  "/img/arrow1_032.gif": {
    "type": "image/gif",
    "etag": "\"43-XCyYkOKNqfIzkg5OR+V2FW9Wfs0\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 67,
    "path": "../public/img/arrow1_032.gif"
  },
  "/img/back.png": {
    "type": "image/png",
    "etag": "\"ba9-xGB4Tth6sXxvu2GosGDu0O14xck\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 2985,
    "path": "../public/img/back.png"
  },
  "/img/basketball.png": {
    "type": "image/png",
    "etag": "\"3de-GcJVSypd3OcaoF0/RVF/GYN6f40\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 990,
    "path": "../public/img/basketball.png"
  },
  "/img/bq.png": {
    "type": "image/png",
    "etag": "\"112-KR+HDge95uFg7o0xpmzENx+14EE\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 274,
    "path": "../public/img/bq.png"
  },
  "/img/close.gif": {
    "type": "image/gif",
    "etag": "\"7d-OGdDduOWAabJGpw+JTpvwgTFH2M\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 125,
    "path": "../public/img/close.gif"
  },
  "/img/corners4.png": {
    "type": "image/png",
    "etag": "\"261-qz9b7HZ4G9nj+zVkvM2ZP2q9lMQ\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 609,
    "path": "../public/img/corners4.png"
  },
  "/img/dark.png": {
    "type": "image/png",
    "etag": "\"285-x+UPWygFeXFkeq17dyNLLbFNTyQ\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 645,
    "path": "../public/img/dark.png"
  },
  "/img/default-image.webp": {
    "type": "image/webp",
    "etag": "\"dc2-NEoePGNZLexXMhACIGjJZGK8DUM\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 3522,
    "path": "../public/img/default-image.webp"
  },
  "/img/dropdown.svg": {
    "type": "image/svg+xml",
    "etag": "\"24c-RzgeBP0islmK0XlGajPaYEdw4/k\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 588,
    "path": "../public/img/dropdown.svg"
  },
  "/img/e2.png": {
    "type": "image/png",
    "etag": "\"163-WaStmbPyx8VBNRrxBYEGBRB7jOk\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 355,
    "path": "../public/img/e2.png"
  },
  "/img/enter.png": {
    "type": "image/png",
    "etag": "\"707-Ywv37jWdb83grbPyVEdFYqdCE2Y\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 1799,
    "path": "../public/img/enter.png"
  },
  "/img/evologo.de05421a.svg.png": {
    "type": "image/png",
    "etag": "\"410-qu9d2JyNFDwjnzxANb4C+q92AL8\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 1040,
    "path": "../public/img/evologo.de05421a.svg.png"
  },
  "/img/f.png": {
    "type": "image/png",
    "etag": "\"1cc-n1RPiZfTIbMC6bHOZUeLxpf/NXs\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 460,
    "path": "../public/img/f.png"
  },
  "/img/flashback.jpg": {
    "type": "image/jpeg",
    "etag": "\"22c6d-XnIpjiaoM1UNrArVnpZV8Jtnvq0\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 142445,
    "path": "../public/img/flashback.jpg"
  },
  "/img/football-field.svg": {
    "type": "image/svg+xml",
    "etag": "\"b84-sOYr71ISQc9vCYHtXN7JTBGLWcM\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 2948,
    "path": "../public/img/football-field.svg"
  },
  "/img/fx.svg": {
    "type": "image/svg+xml",
    "etag": "\"132-YHFDZhxrA78BZ8nesLI+NFM+NDE\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 306,
    "path": "../public/img/fx.svg"
  },
  "/img/googleplay.webp": {
    "type": "image/webp",
    "etag": "\"658-UcdJ3reilAhV+AssZkINHTsKYUQ\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 1624,
    "path": "../public/img/googleplay.webp"
  },
  "/img/greenUp.png": {
    "type": "image/png",
    "etag": "\"8f-5NtNJKxu1fpDMG7QUiq8qphGc0w\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 143,
    "path": "../public/img/greenUp.png"
  },
  "/img/guestT.png": {
    "type": "image/png",
    "etag": "\"77e-qBenksgickieTwWOd10z49iYLyc\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 1918,
    "path": "../public/img/guestT.png"
  },
  "/img/hide.png": {
    "type": "image/png",
    "etag": "\"33c-RDaSlJgG2xJhG55s4oDssFLs8EQ\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 828,
    "path": "../public/img/hide.png"
  },
  "/img/homeT.png": {
    "type": "image/png",
    "etag": "\"78a-PrV1AOorI9eoMY7MRWFD3iKmDXI\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 1930,
    "path": "../public/img/homeT.png"
  },
  "/img/iPad1.png": {
    "type": "image/png",
    "etag": "\"4473d-xAPwlxSTlc71cMXnfXta4kNXHF4\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 280381,
    "path": "../public/img/iPad1.png"
  },
  "/img/img-cover-1.png": {
    "type": "image/png",
    "etag": "\"55ebb-mtyUDEIjWLra8jCUja57XEhAoRY\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 351931,
    "path": "../public/img/img-cover-1.png"
  },
  "/img/img-cover-2.png": {
    "type": "image/png",
    "etag": "\"69926-VpveSltAqiAMdk61DRaJhemU6dE\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 432422,
    "path": "../public/img/img-cover-2.png"
  },
  "/img/in_red.gif": {
    "type": "image/gif",
    "etag": "\"58-hbHaG9JFP9JQ9LcyNVh2VXlzupE\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 88,
    "path": "../public/img/in_red.gif"
  },
  "/img/light.png": {
    "type": "image/png",
    "etag": "\"1e7-FOOTEZ+tskk1d0Oj3u1ZtfAdYLw\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 487,
    "path": "../public/img/light.png"
  },
  "/img/loading.gif": {
    "type": "image/gif",
    "etag": "\"3aa-sZeo/ZBrbAUtivN0df1JTVO7Oq4\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 938,
    "path": "../public/img/loading.gif"
  },
  "/img/logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"20cf-Q/nxwTypPaUtB8Wm/9od3sAa/qg\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 8399,
    "path": "../public/img/logo.svg"
  },
  "/img/logo.webp": {
    "type": "image/webp",
    "etag": "\"938-xavc9Cf8DASbMARfBbag31Cc1w0\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 2360,
    "path": "../public/img/logo.webp"
  },
  "/img/news.png": {
    "type": "image/png",
    "etag": "\"27f-xfEPTkpTvCii284KU/UXvusAVbg\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 639,
    "path": "../public/img/news.png"
  },
  "/img/noflash_L.jpg": {
    "type": "image/jpeg",
    "etag": "\"28143-BiTdVNzM9I9j/FjkBtaQWrJJmMk\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 164163,
    "path": "../public/img/noflash_L.jpg"
  },
  "/img/oddsup.png": {
    "type": "image/png",
    "etag": "\"123-t7lSN3Fxv2kVmXCtQKutd/AhAUA\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 291,
    "path": "../public/img/oddsup.png"
  },
  "/img/order.png": {
    "type": "image/png",
    "etag": "\"135-6DF5ZHLtE4vkFVf6eGgUeCJ22Mk\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 309,
    "path": "../public/img/order.png"
  },
  "/img/pc.png": {
    "type": "image/png",
    "etag": "\"fa-JkQ2Q2dvsRUXRxaIoEqIMyduRdo\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 250,
    "path": "../public/img/pc.png"
  },
  "/img/pc_b.png": {
    "type": "image/png",
    "etag": "\"1be-/RMCH4Z5R7u4tjHHLEDna0xIDJ4\"",
    "mtime": "2024-09-13T14:12:32.555Z",
    "size": 446,
    "path": "../public/img/pc_b.png"
  },
  "/img/playericon.png": {
    "type": "image/png",
    "etag": "\"91e-qPzKNO4Teu0rfialxh+CtF/Jzmk\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 2334,
    "path": "../public/img/playericon.png"
  },
  "/img/rank.svg": {
    "type": "image/svg+xml",
    "etag": "\"1036-1MLLC5x2ujP+X+wGsknzJp4m/+U\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 4150,
    "path": "../public/img/rank.svg"
  },
  "/img/redDown.png": {
    "type": "image/png",
    "etag": "\"90-1FtbSsMxpHEK522fMS9wLffDfJU\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 144,
    "path": "../public/img/redDown.png"
  },
  "/img/rq.png": {
    "type": "image/png",
    "etag": "\"112-SScUOI21vVmjJzLhrX4YGzVVEGI\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 274,
    "path": "../public/img/rq.png"
  },
  "/img/see.png": {
    "type": "image/png",
    "etag": "\"268-5uHxul2Ih4QLdqYpA+i7HodCDq8\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 616,
    "path": "../public/img/see.png"
  },
  "/img/soccer-bg.png": {
    "type": "image/png",
    "etag": "\"2216-Soy3BQE+0gdrXxztXll7zr6qcVg\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 8726,
    "path": "../public/img/soccer-bg.png"
  },
  "/img/soccer.png": {
    "type": "image/png",
    "etag": "\"3c0-sJBgdd7n2aYftGs8L2p/7iVXr2I\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 960,
    "path": "../public/img/soccer.png"
  },
  "/img/ss.png": {
    "type": "image/png",
    "etag": "\"236-qt6zqrSECgSlVj56LlQ3XUKKmv8\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 566,
    "path": "../public/img/ss.png"
  },
  "/img/team-default.png": {
    "type": "image/png",
    "etag": "\"5a9-G7yD3clLCrW2mzfRpQjUavzGD8I\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 1449,
    "path": "../public/img/team-default.png"
  },
  "/img/theme.png": {
    "type": "image/png",
    "etag": "\"3b2-CSQVWybiIOOt8EG4JwcSgZyDfvE\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 946,
    "path": "../public/img/theme.png"
  },
  "/img/timeline.jpg": {
    "type": "image/jpeg",
    "etag": "\"484f-VZTgiZXOegrb3b1ERsWuydnq/mk\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 18511,
    "path": "../public/img/timeline.jpg"
  },
  "/img/tv.png": {
    "type": "image/png",
    "etag": "\"20f-p+8tb1I7sU2gVl2kKX2WNRbdTC0\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 527,
    "path": "../public/img/tv.png"
  },
  "/img/user.png": {
    "type": "image/png",
    "etag": "\"45c-Qj04kYBCbNicGbuumyrsrkumG6Y\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 1116,
    "path": "../public/img/user.png"
  },
  "/img/vip.png": {
    "type": "image/png",
    "etag": "\"3bb2a-9DybjAkWmudNCW0qJEkvD6WWuDE\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 244522,
    "path": "../public/img/vip.png"
  },
  "/img/z.png": {
    "type": "image/png",
    "etag": "\"14d-BUvNnt43M2AOcbITIqt4qezvRvo\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 333,
    "path": "../public/img/z.png"
  },
  "/assets/css/bootraps.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9ce-QccEqBA0RVwcYpczwvbHxNPrTVY\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 2510,
    "path": "../public/assets/css/bootraps.min.css"
  },
  "/assets/css/mergecss.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c6a0-T1vyIF9CY2Dnx63jNSpp6AePohY\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 247456,
    "path": "../public/assets/css/mergecss.css"
  },
  "/assets/css/telcomponent.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1b6ca-e0EujagByujyg2TBtt52Dp0Ddac\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 112330,
    "path": "../public/assets/css/telcomponent.css"
  },
  "/assets/icon/content-reply.svg": {
    "type": "image/svg+xml",
    "etag": "\"152-rPy0l4LL6DIGM5IO+iYnQ2DfDKw\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 338,
    "path": "../public/assets/icon/content-reply.svg"
  },
  "/assets/icon/reply.svg": {
    "type": "image/svg+xml",
    "etag": "\"16a-At01OaKUozQchN209l+RsOQnN1M\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 362,
    "path": "../public/assets/icon/reply.svg"
  },
  "/assets/js/bootstrap.bundle.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13a24-kNFQNu9I/LM2oTW66BK0VmnxkEQ\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 80420,
    "path": "../public/assets/js/bootstrap.bundle.min.js"
  },
  "/assets/js/jwplayer.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bbab-M8A0SOvk83cv8efzH8QW+RxRjDI\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 113579,
    "path": "../public/assets/js/jwplayer.js"
  },
  "/assets/sound/red.mp3": {
    "type": "audio/mpeg",
    "etag": "\"295f-/aifTwn476CRozoV9Na8w12qggU\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 10591,
    "path": "../public/assets/sound/red.mp3"
  },
  "/assets/sound/sound0.mp3": {
    "type": "audio/mpeg",
    "etag": "\"626-Sq7ExwvdmPnku1dyQCeEsVfdeZI\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 1574,
    "path": "../public/assets/sound/sound0.mp3"
  },
  "/assets/sound/sound1.mp3": {
    "type": "audio/mpeg",
    "etag": "\"757-ebrZ8oPZ/OgBcwhRKldxt+FYnAA\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 1879,
    "path": "../public/assets/sound/sound1.mp3"
  },
  "/assets/sound/sound2.mp3": {
    "type": "audio/mpeg",
    "etag": "\"c37-Li8L+Wgekcr0mXHFHLtxF+PQB/c\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 3127,
    "path": "../public/assets/sound/sound2.mp3"
  },
  "/assets/sound/sound3.mp3": {
    "type": "audio/mpeg",
    "etag": "\"1047-0rYvimhTZb/wnvfHzA87AXLXeEw\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 4167,
    "path": "../public/assets/sound/sound3.mp3"
  },
  "/assets/sound/sound4.mp3": {
    "type": "audio/mpeg",
    "etag": "\"1047-0rYvimhTZb/wnvfHzA87AXLXeEw\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 4167,
    "path": "../public/assets/sound/sound4.mp3"
  },
  "/icon/flag/0gx7lm7ph0m2wdk.png": {
    "type": "image/png",
    "etag": "\"261f-etIq6DzPpitYFIrmtzd43B+EoRU\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 9759,
    "path": "../public/icon/flag/0gx7lm7ph0m2wdk.png"
  },
  "/icon/flag/49vjxm8ghgr6odg.png": {
    "type": "image/png",
    "etag": "\"3e5f-oOXwoSpCv91a9+c6b2Vcw18MetI\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 15967,
    "path": "../public/icon/flag/49vjxm8ghgr6odg.png"
  },
  "/icon/flag/9d23xmvkhxqg8ny.png": {
    "type": "image/png",
    "etag": "\"3a64-de5Uyu1BGSQd0fw9natn79XaL8g\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 14948,
    "path": "../public/icon/flag/9d23xmvkhxqg8ny.png"
  },
  "/icon/flag/kp3glrw7hwqdyjv.png": {
    "type": "image/png",
    "etag": "\"eb9-/D2x+1SYE/uLaLpT+Hq+P6HIuJY\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 3769,
    "path": "../public/icon/flag/kp3glrw7hwqdyjv.png"
  },
  "/icon/flag/ngy0or5jh3qwzv3.png": {
    "type": "image/png",
    "etag": "\"1adc-+i4qdUt4Fh8WwTk4wWz2iajWFKw\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 6876,
    "path": "../public/icon/flag/ngy0or5jh3qwzv3.png"
  },
  "/icon/flag/xkn54qllhjqvy9d.png": {
    "type": "image/png",
    "etag": "\"134d-qkBZhoMZzfmYbsdRh0nsclLUaLQ\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 4941,
    "path": "../public/icon/flag/xkn54qllhjqvy9d.png"
  },
  "/icon/player-statistics/1.png": {
    "type": "image/png",
    "etag": "\"251-7A//YJ2oFstegptxDKb8TjIyg98\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 593,
    "path": "../public/icon/player-statistics/1.png"
  },
  "/icon/player-statistics/11.png": {
    "type": "image/png",
    "etag": "\"167-HAwaFyrvrDwdPo9hlvRvlky3Eqg\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 359,
    "path": "../public/icon/player-statistics/11.png"
  },
  "/icon/player-statistics/12.png": {
    "type": "image/png",
    "etag": "\"2a1-sHwgQjN8Ha8QOadCJWK/sUivzng\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 673,
    "path": "../public/icon/player-statistics/12.png"
  },
  "/icon/player-statistics/13.png": {
    "type": "image/png",
    "etag": "\"2d3-b9TeavnpHpNCocrGHHFaW24Wql0\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 723,
    "path": "../public/icon/player-statistics/13.png"
  },
  "/icon/player-statistics/14.png": {
    "type": "image/png",
    "etag": "\"1f2-1xL0kP+xueAax09/dVCIQal9OYg\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 498,
    "path": "../public/icon/player-statistics/14.png"
  },
  "/icon/player-statistics/2.png": {
    "type": "image/png",
    "etag": "\"ee-92DfIA4osS34cjCRW+qtWJKkhEo\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 238,
    "path": "../public/icon/player-statistics/2.png"
  },
  "/icon/player-statistics/3.png": {
    "type": "image/png",
    "etag": "\"da-kQXPQnUcnWTdKhVbMlCHYpmDyU4\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 218,
    "path": "../public/icon/player-statistics/3.png"
  },
  "/icon/player-statistics/30.png": {
    "type": "image/png",
    "etag": "\"339-Uc1kkEhOyDOYvMk7smkdC9JWyPY\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 825,
    "path": "../public/icon/player-statistics/30.png"
  },
  "/icon/player-statistics/31.png": {
    "type": "image/png",
    "etag": "\"1fe-sduota+HoWjYTOvnsXvlVtDetOI\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 510,
    "path": "../public/icon/player-statistics/31.png"
  },
  "/icon/player-statistics/32.png": {
    "type": "image/png",
    "etag": "\"15a-gpLdL+FBIEJrDqdOdZd1C1JR05I\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 346,
    "path": "../public/icon/player-statistics/32.png"
  },
  "/icon/player-statistics/33.png": {
    "type": "image/png",
    "etag": "\"2d8-8Ah/3tObNYuMAX+jc0zwu53EOxc\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 728,
    "path": "../public/icon/player-statistics/33.png"
  },
  "/icon/player-statistics/34.png": {
    "type": "image/png",
    "etag": "\"1de-vWWaHqymGL07aKcE2zpbfg8H0uk\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 478,
    "path": "../public/icon/player-statistics/34.png"
  },
  "/icon/player-statistics/35.png": {
    "type": "image/png",
    "etag": "\"223-X9wiUhNQUyE0iCHqbQG1u2xzEi8\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 547,
    "path": "../public/icon/player-statistics/35.png"
  },
  "/icon/player-statistics/36.png": {
    "type": "image/png",
    "etag": "\"1e4-YfkVGE1BL4PDKkxTl1y2srRppKo\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 484,
    "path": "../public/icon/player-statistics/36.png"
  },
  "/icon/player-statistics/37.png": {
    "type": "image/png",
    "etag": "\"27b-/ecPDqAY1dIxcNsKQpPNUhUTMLo\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 635,
    "path": "../public/icon/player-statistics/37.png"
  },
  "/icon/player-statistics/4.png": {
    "type": "image/png",
    "etag": "\"127-NiJ/MEvBWRf3y7QbgN6/0Muqe4w\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 295,
    "path": "../public/icon/player-statistics/4.png"
  },
  "/icon/player-statistics/5.png": {
    "type": "image/png",
    "etag": "\"143-hhGboMHiccitnVD1aeBVqBwEfIs\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 323,
    "path": "../public/icon/player-statistics/5.png"
  },
  "/icon/player-statistics/55.png": {
    "type": "image/png",
    "etag": "\"152-3DhCdGcG/M5zNw70q+owb6LnDZw\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 338,
    "path": "../public/icon/player-statistics/55.png"
  },
  "/icon/player-statistics/7.png": {
    "type": "image/png",
    "etag": "\"290-5eIoPnzEVNJSOyVVzsohK87pIHI\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 656,
    "path": "../public/icon/player-statistics/7.png"
  },
  "/icon/player-statistics/8.png": {
    "type": "image/png",
    "etag": "\"25a-AleqdRvg4IdSbMS+E3njkeKOdAo\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 602,
    "path": "../public/icon/player-statistics/8.png"
  },
  "/icon/player-statistics/9.png": {
    "type": "image/png",
    "etag": "\"11a-s8AQZexreaBW+RRlDtTjEg4oP6Q\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 282,
    "path": "../public/icon/player-statistics/9.png"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-qWAiiOrmTfokNK7ER1syk1cXX94\"",
    "mtime": "2024-09-13T14:12:32.515Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/img/incident/1.png": {
    "type": "image/png",
    "etag": "\"251-7A//YJ2oFstegptxDKb8TjIyg98\"",
    "mtime": "2024-09-13T14:12:32.554Z",
    "size": 593,
    "path": "../public/img/incident/1.png"
  },
  "/img/incident/11.png": {
    "type": "image/png",
    "etag": "\"162-M1SN0yVZkKErzE4yf4qLvy4h4s0\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 354,
    "path": "../public/img/incident/11.png"
  },
  "/img/incident/12.png": {
    "type": "image/png",
    "etag": "\"2c6-1Qx9Ai3RRHqsBmF41wf1Ng0Ozbc\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 710,
    "path": "../public/img/incident/12.png"
  },
  "/img/incident/15.png": {
    "type": "image/png",
    "etag": "\"121-rL3kMuLg0J5cVGbOIfBDn64evU8\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 289,
    "path": "../public/img/incident/15.png"
  },
  "/img/incident/16.png": {
    "type": "image/png",
    "etag": "\"2b3-bzlnlU2nB5i1P/AzVcBibrEMvRw\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 691,
    "path": "../public/img/incident/16.png"
  },
  "/img/incident/17.png": {
    "type": "image/png",
    "etag": "\"25a-AleqdRvg4IdSbMS+E3njkeKOdAo\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 602,
    "path": "../public/img/incident/17.png"
  },
  "/img/incident/2.png": {
    "type": "image/png",
    "etag": "\"39a-iUnQEDJt+fL7os6fVoeQIJPQS/0\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 922,
    "path": "../public/img/incident/2.png"
  },
  "/img/incident/28.png": {
    "type": "image/png",
    "etag": "\"21d-uDmQsPbjPXTfwP8EYJ/P9sj7D6w\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 541,
    "path": "../public/img/incident/28.png"
  },
  "/img/incident/29.png": {
    "type": "image/png",
    "etag": "\"2a6-LGxLhARK2qBpYHmvrRS/+tQS39c\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 678,
    "path": "../public/img/incident/29.png"
  },
  "/img/incident/3.png": {
    "type": "image/png",
    "etag": "\"e5-8qiH2piVpBJoJnp9AS0PvYfF8c8\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 229,
    "path": "../public/img/incident/3.png"
  },
  "/img/incident/30.png": {
    "type": "image/png",
    "etag": "\"339-Uc1kkEhOyDOYvMk7smkdC9JWyPY\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 825,
    "path": "../public/img/incident/30.png"
  },
  "/img/incident/31.png": {
    "type": "image/png",
    "etag": "\"4a8-Uey3Hnws/yqn4TJ5g3rFgIb6O90\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 1192,
    "path": "../public/img/incident/31.png"
  },
  "/img/incident/32.png": {
    "type": "image/png",
    "etag": "\"188-hOW0LPIjdc0XM/pceoCzI/26HIw\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 392,
    "path": "../public/img/incident/32.png"
  },
  "/img/incident/33.png": {
    "type": "image/png",
    "etag": "\"2d8-8Ah/3tObNYuMAX+jc0zwu53EOxc\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 728,
    "path": "../public/img/incident/33.png"
  },
  "/img/incident/34.png": {
    "type": "image/png",
    "etag": "\"1fe-kP9+gMlARtI347YxZ/2JXcB3Kbc\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 510,
    "path": "../public/img/incident/34.png"
  },
  "/img/incident/36.png": {
    "type": "image/png",
    "etag": "\"206-EtLWHM86FUQYgbyC7ok0F3IcElc\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 518,
    "path": "../public/img/incident/36.png"
  },
  "/img/incident/37.png": {
    "type": "image/png",
    "etag": "\"27b-/ecPDqAY1dIxcNsKQpPNUhUTMLo\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 635,
    "path": "../public/img/incident/37.png"
  },
  "/img/incident/4.png": {
    "type": "image/png",
    "etag": "\"ee-92DfIA4osS34cjCRW+qtWJKkhEo\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 238,
    "path": "../public/img/incident/4.png"
  },
  "/img/incident/5.png": {
    "type": "image/png",
    "etag": "\"213-Gn/savDZPYe/uWGzp3jGDENGvA8\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 531,
    "path": "../public/img/incident/5.png"
  },
  "/img/incident/55.png": {
    "type": "image/png",
    "etag": "\"152-3DhCdGcG/M5zNw70q+owb6LnDZw\"",
    "mtime": "2024-09-13T14:12:32.556Z",
    "size": 338,
    "path": "../public/img/incident/55.png"
  },
  "/img/incident/6.png": {
    "type": "image/png",
    "etag": "\"223-X9wiUhNQUyE0iCHqbQG1u2xzEi8\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 547,
    "path": "../public/img/incident/6.png"
  },
  "/img/incident/7.png": {
    "type": "image/png",
    "etag": "\"290-5eIoPnzEVNJSOyVVzsohK87pIHI\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 656,
    "path": "../public/img/incident/7.png"
  },
  "/img/incident/8.png": {
    "type": "image/png",
    "etag": "\"2a6-LGxLhARK2qBpYHmvrRS/+tQS39c\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 678,
    "path": "../public/img/incident/8.png"
  },
  "/img/incident/9.2.png": {
    "type": "image/png",
    "etag": "\"143-hhGboMHiccitnVD1aeBVqBwEfIs\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 323,
    "path": "../public/img/incident/9.2.png"
  },
  "/img/incident/9.png": {
    "type": "image/png",
    "etag": "\"13e-F/Z6S//meMsYgS6ePzr92OzhUZM\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 318,
    "path": "../public/img/incident/9.png"
  },
  "/img/incident/logo.webp": {
    "type": "image/webp",
    "etag": "\"e10-Nk6cO5O3+KefHFxkOQ1WVOgbp3k\"",
    "mtime": "2024-09-13T14:12:32.557Z",
    "size": 3600,
    "path": "../public/img/incident/logo.webp"
  },
  "/_nuxt/builds/meta/99183b56-9040-480e-ab66-711f9ddedafa.json": {
    "type": "application/json",
    "etag": "\"8b-kDn/gZV2cZQZdgTe6e049+OlwAY\"",
    "mtime": "2024-09-13T14:12:32.513Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/99183b56-9040-480e-ab66-711f9ddedafa.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises$1.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _tMWmuu = defineEventHandler(async (e) => {
  if (e.context.siteConfig)
    return;
  const runtimeConfig = useRuntimeConfig(e);
  const config = runtimeConfig["nuxt-site-config"];
  const nitroApp = useNitroApp();
  const siteConfig = createSiteConfigStack({
    debug: config.debug
  });
  const appConfig = useAppConfig(e);
  const nitroOrigin = useNitroOrigin(e);
  e.context.siteConfigNitroOrigin = nitroOrigin;
  {
    siteConfig.push({
      _context: "nitro:init",
      _priority: -4,
      url: nitroOrigin
    });
  }
  siteConfig.push({
    _context: "runtimeEnv",
    _priority: 0,
    ...runtimeConfig.site || {},
    ...runtimeConfig.public.site || {},
    // @ts-expect-error untyped
    ...envSiteConfig(globalThis._importMeta_.env)
    // just in-case, shouldn't be needed
  });
  const buildStack = config.stack || [];
  buildStack.forEach((c) => siteConfig.push(c));
  if (appConfig.site) {
    siteConfig.push({
      _priority: -2,
      _context: "app:config",
      ...appConfig.site
    });
  }
  if (e.context._nitro.routeRules.site) {
    siteConfig.push({
      _context: "route-rules",
      ...e.context._nitro.routeRules.site
    });
  }
  const ctx = { siteConfig, event: e };
  await nitroApp.hooks.callHook("site-config:init", ctx);
  e.context.siteConfig = ctx.siteConfig;
});

const _SIFyeR = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts?.fs?.dir ? (Array.isArray(opts.fs.dir) ? opts.fs.dir : [opts.fs.dir]).map((dir) => isAbsolute(dir) ? dir : fileURLToPath(new URL(dir, globalThis._importMeta_.url))) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const ipx = createIPX(ipxOptions);
  const ipxHandler = createIPXH3Handler(ipx);
  return useBase(opts.baseURL, ipxHandler);
});

const _lazy_24kImF = () => import('./routes/api/v1/_..._.mjs');
const _lazy_RzCM6S = () => import('./routes/oapi/v1/_..._.mjs');
const _lazy_iCbULr = () => import('./routes/oapi/v1/auth/login.mjs');
const _lazy_3KigQS = () => import('./routes/oapi/v1/auth/logout.mjs');
const _lazy_MjFnPX = () => import('./routes/oapi/v1/auth/register.mjs');
const _lazy_zfNwBA = () => import('./routes/oapi/v1/author/_...paras_.mjs');
const _lazy_ae6Quk = () => import('./routes/oapi/v1/menu.mjs');
const _lazy_IoCTHg = () => import('./routes/oapi/v1/pages/home-page.mjs');
const _lazy_wx1KMG = () => import('./routes/oapi/v1/pages/slug.mjs');
const _lazy_qXATvg = () => import('./routes/oapi/v1/users/me.mjs');
const _lazy_JisoNT = () => import('./routes/oapi/v1/users/profile.mjs');
const _lazy_G50dzq = () => import('./routes/sitemap_index.bk.xml.get.mjs');
const _lazy_XWOZpE = () => import('./routes/sitemap/_..._.xml.get.mjs');
const _lazy_4iOUKj = () => import('./routes/sitemap/category/_...page_.xml.mjs');
const _lazy_qCKsKk = () => import('./routes/sitemap/leagues.xml.mjs');
const _lazy_kzuYce = () => import('./routes/sitemap/match/day/_...paras_.xml.mjs');
const _lazy_8LoCdU = () => import('./routes/sitemap/match/month/_...paras_.xml.mjs');
const _lazy_4Xr0Oh = () => import('./routes/sitemap/matches/_year_month_.xml.mjs');
const _lazy_vk5h0P = () => import('./routes/sitemap/post/_...page_.xml.mjs');
const _lazy_nJ5U74 = () => import('./routes/sitemap/sitemap_index.xml.get.mjs');
const _lazy_bXVljm = () => import('./routes/sitemap/sitemap-categories.xml.mjs');
const _lazy_2eFZBo = () => import('./routes/sitemap/sitemap-leagues.xml.mjs');
const _lazy_RksFDM = () => import('./routes/sitemap/sitemap-players.xml.mjs');
const _lazy_CPhvyo = () => import('./routes/sitemap/sitemap-posts.xml.mjs');
const _lazy_WtZ5Tp = () => import('./routes/sitemap/sitemap-teams.xml.mjs');
const _lazy_7mwc0M = () => import('./routes/renderer.mjs').then(function (n) { return n.r; });
const _lazy_8F6Fnl = () => import('./routes/__og-image__/font/font.mjs');
const _lazy_3cLpLL = () => import('./routes/__og-image__/image/image.mjs').then(function (n) { return n.i; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/v1/**', handler: _lazy_24kImF, lazy: true, middleware: false, method: undefined },
  { route: '/oapi/v1/**', handler: _lazy_RzCM6S, lazy: true, middleware: false, method: undefined },
  { route: '/oapi/v1/auth/login', handler: _lazy_iCbULr, lazy: true, middleware: false, method: undefined },
  { route: '/oapi/v1/auth/logout', handler: _lazy_3KigQS, lazy: true, middleware: false, method: undefined },
  { route: '/oapi/v1/auth/register', handler: _lazy_MjFnPX, lazy: true, middleware: false, method: undefined },
  { route: '/oapi/v1/author/**:paras', handler: _lazy_zfNwBA, lazy: true, middleware: false, method: undefined },
  { route: '/oapi/v1/menu', handler: _lazy_ae6Quk, lazy: true, middleware: false, method: undefined },
  { route: '/oapi/v1/pages/home-page', handler: _lazy_IoCTHg, lazy: true, middleware: false, method: undefined },
  { route: '/oapi/v1/pages/slug', handler: _lazy_wx1KMG, lazy: true, middleware: false, method: undefined },
  { route: '/oapi/v1/users/me', handler: _lazy_qXATvg, lazy: true, middleware: false, method: undefined },
  { route: '/oapi/v1/users/profile', handler: _lazy_JisoNT, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap_index.bk.xml', handler: _lazy_G50dzq, lazy: true, middleware: false, method: "get" },
  { route: '/sitemap/**.xml', handler: _lazy_XWOZpE, lazy: true, middleware: false, method: "get" },
  { route: '/sitemap/category/**:page.xml', handler: _lazy_4iOUKj, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap/leagues.xml', handler: _lazy_qCKsKk, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap/match/day/**:paras.xml', handler: _lazy_kzuYce, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap/match/month/**:paras.xml', handler: _lazy_8LoCdU, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap/matches/:year:month.xml', handler: _lazy_4Xr0Oh, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap/post/**:page.xml', handler: _lazy_vk5h0P, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap/sitemap_index.xml', handler: _lazy_nJ5U74, lazy: true, middleware: false, method: "get" },
  { route: '/sitemap/sitemap-categories.xml', handler: _lazy_bXVljm, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap/sitemap-leagues.xml', handler: _lazy_2eFZBo, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap/sitemap-players.xml', handler: _lazy_RksFDM, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap/sitemap-posts.xml', handler: _lazy_CPhvyo, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap/sitemap-teams.xml', handler: _lazy_WtZ5Tp, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_7mwc0M, lazy: true, middleware: false, method: undefined },
  { route: '', handler: _tMWmuu, lazy: false, middleware: true, method: undefined },
  { route: '/__og-image__/font/**', handler: _lazy_8F6Fnl, lazy: true, middleware: false, method: undefined },
  { route: '/__og-image__/image/**', handler: _lazy_3cLpLL, lazy: true, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _SIFyeR, lazy: false, middleware: false, method: undefined },
  { route: '/oapi/*', handler: _lazy_7mwc0M, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_7mwc0M, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((err) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", function(req, res) {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", function(socket) {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", function() {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((err) => {
      const errString = typeof err === "string" ? err : JSON.stringify(err);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { $fetch as $, toRouteMatcher as A, createRouter$1 as B, withoutTrailingSlash as C, defu as D, withoutBase as E, defineDriver as F, createStorage as G, withQuery as H, withoutLeadingSlash as I, normalizeKey$1 as J, prefixStorage as K, withTrailingSlash as L, useStorage as M, handleCacheHeaders as N, setHeaders as O, H3Error as P, klona as Q, parse as R, getRequestHeader as S, sanitizeStatusCode as T, isEqual as U, setCookie as V, getCookie as W, deleteCookie as X, createHooks as Y, getRequestHeaders as Z, useNitroOrigin as _, getRequestURL as a, withBase as a0, nodeServer as a1, getHeader as b, defineCachedEventHandler as c, defineEventHandler as d, setHeader as e, getRouterParam as f, getQuery as g, eventHandler as h, setResponseHeader as i, send as j, getResponseStatus as k, setResponseStatus as l, useNitroApp as m, setResponseHeaders as n, joinRelativeURL as o, createError$1 as p, getRouteRules as q, readBody as r, stringifyQuery as s, hash as t, useRuntimeConfig as u, getResponseStatusText as v, destr as w, parseURL as x, proxyRequest as y, sendRedirect as z };
//# sourceMappingURL=runtime.mjs.map
