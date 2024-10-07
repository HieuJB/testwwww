export const locationHref = (href, external = false) => {
  if (!external)
    return navigateTo(href ? href : '/')
  else 
    return navigateTo(href ? href : '/', { external: true, open: '_blank'})
}

export const active_class = (router: string, menuCode, routerName = '') => {
  if (menuCode === ROUTERS.HOMEPAGE) {
    if (ROUTERS_GROUP.LIVESCORE.includes(router) || router.includes(ROUTERS_GROUP.MATCH) || router.includes(ROUTERS_GROUP.ODDS)  || router.includes(ROUTERS_GROUP.ASIAN_HANDICAP_ODDS) ||
    router.includes(ROUTERS_GROUP.ODDS_1X2) || router.includes(ROUTERS_GROUP.OVER_UNDER_ODDS) || router.includes(ROUTERS_GROUP.CORNER_OU_ODDS) ||
    router.includes(ROUTERS_GROUP.CORRECT_SCORE_ODDS) || router.includes(ROUTERS_GROUP.EURO_HANDICAP_ODDS) || router.includes(ROUTERS_GROUP.DOUBLE_CHANCE_ODDS)) {
      return true
    }
  } else if (router === menuCode) {
    return true
  } else if (menuCode === '/tin-tuc' || menuCode === '/news') {
    if (routerName.includes('/news') || routerName.includes('/category') || routerName.includes('/tag') || routerName.includes('/detail-news')) {
      return true
    }
  } 
  
}