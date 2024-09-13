const getConfig = (configurations, key) => {
  var _a;
  return key && ((_a = configurations == null ? void 0 : configurations.find((config) => (config == null ? void 0 : config.code) === key)) == null ? void 0 : _a.value);
};
const getUserMeta = (user_meta, key) => {
  var _a, _b;
  return key && ((_a = user_meta == null ? void 0 : user_meta.filter((meta) => (meta == null ? void 0 : meta.meta_code) === key)[0]) == null ? void 0 : _a.meta_value) ? (_b = user_meta == null ? void 0 : user_meta.filter((meta) => (meta == null ? void 0 : meta.meta_code) === key)[0]) == null ? void 0 : _b.meta_value : null;
};
const getUserMetaGroup = (user_meta, key_group) => {
  return user_meta == null ? void 0 : user_meta.filter((meta) => {
    var _a;
    return (_a = meta == null ? void 0 : meta.meta_code) == null ? void 0 : _a.includes(key_group);
  });
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
      const typeMatch = scriptContent.match(/<script\s+type="([^"]+)">/);
      if (typeMatch) {
        const scriptType = typeMatch ? typeMatch[1] : "text/javascript";
        const cleanScriptContent = scriptContent.replace(/<script[^>]*>|<\/script>/g, "").trim();
        return {
          type: scriptType,
          innerHTML: `${cleanScriptContent}`
        };
      }
      const regex = /<script\s+[^>]*src="([^"]+)"[^>]*>/g;
      const typeMatchSrc = scriptContent.match(regex);
      if (typeMatchSrc) {
        return {
          async: true,
          src: `${regex.exec(typeMatchSrc[0])[1]}`
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
const formatNumber = (number) => {
  try {
    const unit = {
      million: 1e6,
      thousand: 1e3
    };
    if (number >= unit.million) {
      return number / unit.million + " tri\u1EC7u";
    } else if (number >= unit.thousand) {
      return number / unit.thousand + " ng\xE0n";
    } else {
      return number.toString();
    }
  } catch {
  }
};
const getPlayerPosition = (position) => {
  return position === "G" ? "Th\u1EE7 m\xF4n" : position === "M" ? "Ti\u1EC1n v\u1EC7" : position === "D" ? "H\u1EADu v\u1EC7" : position === "F" ? "Ti\u1EC1n \u0111\u1EA1o" : position === "coach" ? "HLV ch\xEDnh" : "-";
};
const getTransferType = (id) => {
  const transferTypes = {
    1: "Cho thu\xEA",
    2: "K\u1EBFt th\xFAc cho thu\xEA",
    3: "Chuy\u1EC3n nh\u01B0\u1EE3ng t\u1EF1 do",
    4: "Gi\u1EA3i ngh\u1EC7",
    5: "D\u1EF1 th\u1EA3o",
    6: "Gi\u1EA3i ph\xF3ng",
    7: "K\xFD h\u1EE3p \u0111\u1ED3ng",
    8: "Kh\xF4ng x\xE1c \u0111\u1ECBnh"
  };
  return transferTypes[id] || "Kh\xF4ng x\xE1c \u0111\u1ECBnh";
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

export { parseIntO as a, getPlayerPosition as b, getUserMeta as c, getUserMetaGroup as d, escapeRegExp as e, formatNumber as f, getConfig as g, formatTimestamp as h, getTransferType as i, debounce as j, getScriptMetaTags as k, handleInjectScript as l, handleInjectMetaTags as m, parseFloatO as p };
//# sourceMappingURL=helper-CGhdpGxz.mjs.map
