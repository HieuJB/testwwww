export const getConfig = (configurations, key) => {
  return key && configurations?.find(config => config?.code === key)?.value
}

export const getUserMeta = (user_meta, key) => {
  return (key && user_meta?.filter(meta => meta?.meta_code === key)[0]?.meta_value) ? user_meta?.filter(meta => meta?.meta_code === key)[0]?.meta_value : null
}

export const getUserMetaGroup = (user_meta, key_group) => {
  return (key_group && user_meta?.filter(meta => meta?.meta_code?.includes(key_group)))
}

export const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export const parseIntO = (s: any) => {
  return parseInt(s) || 0;
}

export const parseFloatO = (s: any) => {
  return parseFloat(s) || 0;
}

export const getScriptMetaTags = (htmlCode) => {
  try {
    const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
    const metaRegex = /<meta\b[^>]*>/gi;
    const scriptTags = htmlCode.match(scriptRegex) || [];
    const metaTags = htmlCode.match(metaRegex) || [];

    return {
      scriptTags,
      metaTags
    }
  } catch (e) {
    console.error(e)
  }
}

export const handleInjectScript = (scriptList) => {
  try {
    const scriptElements = scriptList.map(scriptContent => {
      // Tìm script có type và class (nếu có)
      const typeClassMatch = scriptContent.match(/<script\s+type="([^"]+)"(?:\s+class="([^"]+)")?>/);

      if (typeClassMatch) {
        const scriptType = typeClassMatch[1];
        const scriptClass = typeClassMatch[2] || ''; // Nếu có class thì lấy class, nếu không thì để trống

        // Xoá thẻ script để chỉ lấy nội dung
        const cleanScriptContent = scriptContent.replace(/<script[^>]*>|<\/script>/g, '').trim();
        return {
          type: scriptType,
          class: scriptClass, // Thêm class nếu có
          innerHTML: cleanScriptContent,
        };
      }

      // Tìm script có src
      const srcMatch = scriptContent.match(/<script\s+[^>]*src="([^"]+)"[^>]*>/);
      if (srcMatch) {
        return {
          async: true,
          src: srcMatch[1],
        };
      }

      const hasScriptTag = scriptContent.match(/<script[^>]*>([\s\S]*?)<\/script>/);
      if (hasScriptTag) {
        const cleanScriptContent = scriptContent.replace(/<script[^>]*>|<\/script>/g, '').trim();
        return {
          innerHTML: cleanScriptContent,
        };
      }
    });

    return scriptElements;
  } catch (e) {
    console.error(e);
  }
};


export const handleInjectMetaTags = (metaTagsArray) => {
  try {
    return metaTagsArray.map(tag => {
      const nameMatch = tag.match(/name="([^"]*)"/);
      const contentMatch = tag.match(/content="([^"]*)"/);
  
      return {
        name: nameMatch ? nameMatch[1] : '',
        content: contentMatch ? contentMatch[1] : ''
      };
    });
  } catch (e) {
    console.error(e)
  }
}

export const formatNumber = (number: number) => {
  try {
    const unit = {
      million : 1000000,
      thousand : 1000
    }
    if (number >= unit.million) {
      return number / unit.million;
    } else if (number >= unit.thousand) {
      return number / unit.thousand;
    } else {
      return number.toString();
    }
  } catch {}
}

export const getPlayerPosition = (position: string): string => {
  return position === 'G'
    ? 'Goalkeeper'
    : position === 'M'
    ? 'Midfielder'
    : position === 'D'
    ? 'Defender'
    : position === 'F'
    ? 'Striker'
    : position === 'coach'
    ? 'Head Coach'    
    : '-';
}; 

export const getTransferType = (id: number): string => {
  const transferTypes:Record<number,string> = {
    1: 'Loan',
    2: 'End of Loan',
    3: 'Free Transfer',
    4: 'Retired',
    5: 'Draft',
    6: 'Released',
    7: 'Signed',
    8: 'Unknown',
  };
  return transferTypes[id] || 'Unknown';
}

export const formatTimestamp = (item: number): string => {
  try {
    const timestamp = item;
    const date = new Date(timestamp * 1000);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  } catch {
    return '-';
  }
}; 

export const debounce = (fn:any, delay:any) => {
  let timeoutID;
  return function() {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
