<template>
  <!-- Main -->
  <div class="mcontent">
    <div id="main" class="container row">
      <!--left start -->
      <div id="left" class="col-md-2 col-lg-2 d-none d-sm-none d-md-inline-block">
        <HotLeaguesComponent/>
        <div>
          <div id="div_survey" style="position:absolute;visibility: visible;z-index:100; padding :5px 0 5px 0;">
            <div id="left_float_ad"></div>
            <div style="width:135px;"></div>
          </div>
        </div>
      </div>
      <!--left end -->
      <!--min start -->
      <LivescoreComponent :h1="h1Content" :page="LIVESCORE_PAGE.FAVORITES" :content="homeContent" :favorites="FAVORITES_TYPE.TEAMS"/>
      <!--min end -->
      <span class="clear"></span>
    </div>
    <div id="div_ad_float" style="position: absolute; visibility: visible; z-index: 100;"></div>
    <div id="div_goal" onclick="showTime(1)" style='position: absolute; z-index: 8; top: 0px; left: 410px;'></div>
    <span id="allDate"></span>
    <span id="span_detail"></span>
    <span id="span_sbDetail"></span>
    <span id="span_panlu"></span>
    <div id="oddsChange" style='position: absolute; z-index: 100; top: 100px; left: 200px; visibility: hidden;' onmouseover="MM_showHideLayers('oddsChange','','show')" onmouseout="MM_showHideLayers('oddsChange','','hide');clearSbdata();"></div>
    <div id="panluDiv" style='position: absolute; z-index: 100; top: 100px; left: 148px; visibility: hidden;' onmouseover="MM_showHideLayers('panluDiv','','show')" onmouseout="MM_showHideLayers('panluDiv','','hide')"></div>
    <div id="sbOddsCorner" class="livetab" style="position: absolute; z-index: 100; top: 100px; left: 100px; width: 400px; visibility: hidden;" onmouseover="MM_showHideLayers('sbOddsCorner','','show')" onmouseout="MM_showHideLayers('sbOddsCorner','','hide')"></div>
    <input type="hidden" id="ifShow" value="0" />
    <input type="hidden" id="ifShowCorner" value="0" />
    <span id="span_sbCorner"></span>
  </div>
</template>

<script setup lang="ts">
import { systemsStore } from '~/stores/systems'
const { useLocale, $t, $trouter } = useShareCommon()
const storeSystems = systemsStore()
const title = ref()
const description = ref()
const pageContent = ref('')
const h1Content = ref(null)
const router = useRouter()
const routeSlug = router.currentRoute.value?.path?.replace(/\/$/, "")


const fetchPage = async (slug: string) => {
  try {
    await useFetch<any>(createUrl(API_ROUTERS.PAGE.SLUG, {
      query: {
        slug: slug,
      },

    })).then(resData => {
      title.value = resData?.data?.value?.title ?? getConfig(storeSystems.configurations, 'SEO_META_TITLE'),
      description.value = resData?.data?.value?.meta_description ?? getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION')
      pageContent.value = resData?.data?.value?.content
      h1Content.value =  resData?.data?.value?.title
    })
  }
  catch (e: any) {
    title.value = getConfig(storeSystems.configurations, 'SEO_META_TITLE') ? getConfig(storeSystems.configurations, 'SEO_META_TITLE') : ''
    description.value = getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION') ? getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION') : ''
  }
}

if (useLocale.value.defaultLocale === 'vi') {
  await fetchPage('bong-da-theo-doi')
} else {
  await fetchPage('football-favourites')
}
nextTick(async() => {
  useSeoMeta({
    title: title.value,
    description: description.value,
    ogTitle: title.value,
    ogDescription: description.value,
  })
})

</script>