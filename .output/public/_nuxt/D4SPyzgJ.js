const n=r=>r?r.split(" ").map(t=>t.charAt(0).toUpperCase()).join(""):"",a=r=>!r||typeof r>"u"?"":new Intl.NumberFormat("en-US",{style:"currency",currency:"EUR"}).format(r);export{n as a,a as c};
