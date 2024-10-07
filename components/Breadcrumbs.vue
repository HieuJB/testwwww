<template>
  <div class="crumbs container mb-4">
    <nav aria-label="breadcrumb" class="my-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item on d-flex  align-items-center" v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <nuxt-link :target="breadcrumb?.target" v-if="breadcrumb?.to" :to="breadcrumb?.to" :class="breadcrumb?.last">{{ String(breadcrumb?.label).includes('undefined') ? '' : breadcrumb?.label }}</nuxt-link>
          <span v-else>{{  String(breadcrumb?.label).includes('undefined') ? '' : breadcrumb?.label }}</span>
        </li>
      </ol>
    </nav>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter();
const route = useRoute();
const { useLocale, $t, $trouter } = useShareCommon()

const breadcrumbs = ref([]);
const objectIdSlug = ref(route?.params?.id || "");
const match = ref([])
const postDetail = ref([])
const competitionDetail = ref([])
const compDetail = ref([])
const tags = ref([])
const { info } = useShareTeams()
const leagueState = useState('league-state')
const { infoLeague } = useShareLeague()

const updateBreadcrumbs = () => {
  if (route.path === ROUTERS_OLD.HOMEPAGE) {
    breadcrumbs.value = [
      {
        label: $t('Home page'),
        to: route.path,
        last: 'on'
      }
    ]
  } else {
    const pathArray = router.currentRoute.value.path.split('/').filter(Boolean);
    const breadcrumbLength = pathArray.length
    const breadcrumbArray = pathArray.map((path, index) => {
      let fullPath = '/' + pathArray.slice(0, index + 1).join('/');
      let label = path.replace(/-/g, ' ')

      if (fullPath === $trouter(ROUTERS.FOOTBALL)) {
        label = $t(BREADCRUMBS_MAP?.[label] ?? label)
        fullPath = ROUTERS_OLD.HOMEPAGE
      } else if (fullPath === $trouter(ROUTERS.FOOTBALL_FAVORITES_LEAGUES)) {
        label = $t(BREADCRUMBS_MAP?.[label] ?? label)
      } else if (fullPath === $trouter(ROUTERS.FOOTBALL_FAVORITES_TEAMS)) {
        label = $t(BREADCRUMBS_MAP?.[label] ?? label)
      } else if (fullPath?.includes(ROUTERS_OLD.MATCH_DETAIL)) {
        label = match.value?.home_team?.name + ' VS ' + match.value?.away_team?.name
      } else if (fullPath?.includes(ROUTERS_OLD.MATCH)) {
        fullPath = ROUTERS_OLD.LEAGUES + '/' + match.value?.competition?.id
        label = match.value?.competition?.name
      } else if (route.name?.includes(NAME_ROUTERS.DETAIL_NEWS)) {
        label = postDetail.value?.title ?? label
      } else if (fullPath?.includes(ROUTERS_OLD.LEAGUES)) {
        if (index > 0) {
          if (compDetail.value) {
            label = compDetail.value?.name ??  label
          } else {
            label = ''
          }
        } 
      }  if (fullPath?.includes(ROUTERS_OLD.WAREHOUSE)) {
        label = $t('Warehouse')
      } else if (route.path?.includes(ROUTERS_OLD.NEWS_TAG)) {
        if (fullPath?.includes(ROUTERS_OLD.NEWS_TAG + '/')) {
          label = (tags.value?.name) ?? label
        } else {
          fullPath = $trouter(ROUTERS.NEWS_PAGE)
          label = $t(BREADCRUMBS_MAP?.[label] ?? label)
        }
      } else  {
        label = $t(BREADCRUMBS_MAP?.[label] ?? label)
      }

      return {
        label: label,
        to: fullPath,
        last: ((index + 1) === breadcrumbLength) ? 'on' : 'off'
      };
    });

    if (route.name?.includes(NAME_ROUTERS.DETAIL_NEWS)) {
      const parents = [
        {
          label: $t('Home page'),
          to: ROUTERS_OLD.HOMEPAGE,
          last: 'off'
        }
      ];
      if (postDetail.value?.type && postDetail.value?.type === 'post') {
        parents.push(
          {
            label: postDetail.value?.post_brand_category?.[0]?.name,
            to:  ROUTERS_OLD.HOMEPAGE + postDetail.value?.post_brand_category?.[0]?.slug,
            last: 'off'
          }
        )
      }
      breadcrumbs.value = [...parents, ...breadcrumbArray];
    } else if (route.name?.includes(ROUTERS_OLD.NEWS_CATEGORY_NAME) || route.path?.includes($trouter(ROUTERS.NEWS_PAGE))
    || route.name?.includes(NAME_ROUTERS.LEAGUE) || route.name?.includes(NAME_ROUTERS.DETAIL_LEAGUE)
    || route.path?.includes(ROUTERS_OLD.WAREHOUSE) || route.name?.includes(NAME_ROUTERS.FAVORITES_TEAM)
    ) {
      const parents = [{
          label: $t('Home page'),
          to: ROUTERS_OLD.HOMEPAGE,
          last: 'off'
        }];
      breadcrumbs.value = [...parents, ...breadcrumbArray];
      breadcrumbs.value = [...new Map(breadcrumbs.value.map(item => [item.label, item])).values()]
    } else if (route.path?.includes(ROUTERS_OLD.MATCH_DETAIL)) {
      const parents = [{
          label: $t('Home page'),
          to: ROUTERS_OLD.HOMEPAGE,
          last: 'off'
        }];
      breadcrumbs.value = [...parents, ...breadcrumbArray];
    } else if([ROUTERS_OLD.TEAM, ROUTERS_OLD.COACH, ROUTERS_OLD.PLAYER, ROUTER_TEAM_NAME.TEAM, ROUTER_TEAM_NAME.PLAYER].some((item)=> route.fullPath?.includes(item))) {
      if (route.fullPath.includes(ROUTER_TEAM_NAME.TEAM)) {
        if (route.params.id) {
          breadcrumbs.value = [{
            label: $t('Home page'),
            to: ROUTERS_OLD.HOMEPAGE,
            last: 'off'
          },
          {
            label: $t('Teams list'),
            to: `/${ROUTER_TEAM_NAME.TEAM}`,
            last: 'off'
          },
          {
            label: `${competitionDetail.value}`,
            last: 'on'
          }];
        } else {
          breadcrumbs.value = [{
            label: $t('Home page'),
            to: ROUTERS_OLD.HOMEPAGE,
            last: 'off'
          },
          {
            label: $t('Teams list'),
            last: 'on'
          }];
        }
      } else if(route.fullPath.includes(ROUTER_TEAM_NAME.PLAYER)) {
        if (route.params.id) {
          breadcrumbs.value = [{
            label: $t('Home page'),
            to: ROUTERS_OLD.HOMEPAGE,
            last: 'off'
          },
          {
            label: $t('Players list'),
            to: `/${ROUTER_TEAM_NAME.PLAYER}`,
            last: 'off'
          },
          {
            label: `${competitionDetail.value}`,
            last: 'on'
          }];
        } else {
          breadcrumbs.value = [{
            label: $t('Home page'),
            to: ROUTERS_OLD.HOMEPAGE,
            last: 'off'
          },
          {
            label: $t('Players list'),
            last: 'on'
          }];
        }
      } else {
        breadcrumbs.value = [{
        label: $t('Home page'),
        to: ROUTERS_OLD.HOMEPAGE,
        last: 'off'
        }, 
        {
          label: `${competitionDetail.value}`,
          last: 'on'
        }];
      } 
    } else {
      breadcrumbs.value = breadcrumbArray;
    }
  }
};


const fetchCompDetail = async (objectIdSlug) => {
  compDetail.value = infoLeague.value
  updateBreadcrumbs()
};

const fetchMatchsRecentDetail = async (objectIdSlug) => {
  try {
    useApiLiveScore(
      API_ROUTERS.LIVESCORE.MATCHS_RECENT_DETAIL,
      {
        match_id: objectIdSlug,
        lang: useLocale?.value.defaultLocale
      }
    ).then((resData) => {
      if (resData?.[0]) {
        match.value = resData?.[0];
        updateBreadcrumbs()
      }
      else 
        return null
    });
  } catch (e) {
    return null
  }
};

const fetchDetailPost = async (postCode: string | string[]) => {
  try {
    useFetch<any>(createUrl(API_ROUTERS.POST.SLUG + `?slug=` + postCode, {
    })).then(resData => {
      postDetail.value = resData?.data?.value
      updateBreadcrumbs()
    })
  }
  catch (e: any) {

  }
}

const fetchTag = async (postCode: string | string[]) => {
  try {
    useFetch<any>(createUrl(API_ROUTERS.POST.TAG.SLUG + postCode, {
    })).then(resData => {
      tags.value = resData?.data?.value
      updateBreadcrumbs()
    })
  }
  catch (e: any) {
  }
}

const fetchLineUpTeam = async () => {
  try {
    if (info.value?.lineUpTeam?.team_info?.team_name && route.fullPath.includes(ROUTERS_OLD.TEAM)) {      
      competitionDetail.value = info.value?.lineUpTeam?.team_info?.team_name
    } else if(info.value?.player?.[0]?.name && route.fullPath.includes(ROUTERS_OLD.PLAYER)) {
      competitionDetail.value = info.value.player?.[0].name
    } else if(info.value?.personalInfo?.[0]?.name && route.fullPath.includes(ROUTERS_OLD.COACH)) {
      competitionDetail.value = info.value?.personalInfo?.[0].name
    } else {
      competitionDetail.value = ''
    }
    updateBreadcrumbs()
  } catch (e) {
    console.log(e);
  }
}

if (route.path?.includes(ROUTERS_OLD.MATCH_DETAIL)) {
  objectIdSlug.value = route?.params?.id
  fetchMatchsRecentDetail(objectIdSlug.value);
} else if (route.name?.includes(NAME_ROUTERS.DETAIL_NEWS)) {
  objectIdSlug.value = route?.params?.news
  fetchDetailPost(objectIdSlug.value);
} else if (route.name?.includes(NAME_ROUTERS.DETAIL_LEAGUE)) {
  objectIdSlug.value = route?.params?.league_id
  fetchCompDetail(objectIdSlug.value);
} else if (route.path?.includes(ROUTERS_OLD.NEWS_TAG)) {
  objectIdSlug.value = route?.params?.tag
  fetchTag(objectIdSlug.value);
}

watch(
  () => route.path,
  () => {
    if (route.path?.includes(ROUTERS_OLD.MATCH_DETAIL)) {
      objectIdSlug.value = route?.params?.id || ""
      fetchMatchsRecentDetail(objectIdSlug.value);
    } else  if (route.name?.includes(NAME_ROUTERS.DETAIL_NEWS)) {
      objectIdSlug.value = route?.params?.news
      fetchDetailPost(objectIdSlug.value);
    } else if (route.name?.includes(NAME_ROUTERS.DETAIL_LEAGUE)) {
      objectIdSlug.value = route?.params?.league_id
      fetchCompDetail(objectIdSlug.value);
    } else if (route.path?.includes(ROUTERS_OLD.NEWS_TAG)) {
      objectIdSlug.value = route?.params?.tag
      fetchTag(objectIdSlug.value);
    } else if (route.name?.includes(NAME_ROUTERS.FAVORITES_TEAM)) {
      updateBreadcrumbs();
    } else if([ROUTERS_OLD.TEAM, ROUTERS_OLD.PLAYER, ROUTERS_OLD.CATEGORY, ROUTER_TEAM_NAME.TEAM, ROUTER_TEAM_NAME.PLAYER].some((item)=> route.path?.includes(item))) {
      fetchLineUpTeam()
    } else {
      updateBreadcrumbs();
    }
  },
  { immediate: true }
);


watch(
  () => info.value && [ROUTERS_OLD.TEAM, ROUTERS_OLD.COACH, ROUTERS_OLD.PLAYER].some((item)=> route.fullPath?.includes(item)),
  () => {
    fetchLineUpTeam()
  },
  { immediate: true , deep: true}
);

watch(
  () => infoLeague.value && route.name?.includes(NAME_ROUTERS.DETAIL_LEAGUE),
  () => {
    fetchCompDetail(objectIdSlug.value);
  },
  { immediate: true , deep: true}
);
</script>