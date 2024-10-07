<template>
  <!-- Main -->
  <div class="mcontent">
    <div id="main" class="row" :class="{ container: !isHidden }">
      <!--left start -->
    <LazyHydrationWrapper :when-triggered="$isloadScripts" >
      <div id="left" class="col-md-2 col-lg-2 d-none d-sm-none d-md-inline-block" v-if="!isHidden" >
        <LazyHotLeaguesComponent />
      </div>
    </LazyHydrationWrapper>
      <!--left end -->
      <!--min start -->
      <LazyHydrationWrapper :when-triggered="isHydration" >
        <LivescoreComponent :h1="h1Content" :page="LIVESCORE_PAGE.LIVESCORE" :content="homeContent"/>
      </LazyHydrationWrapper>
      <!--min end -->
    </div>
  </div>
</template>
<script setup>
import { LazyHydrationWrapper } from 'vue3-lazy-hydration';
const { $isMobile, $isloadScripts, $isBot } = useNuxtApp()
import { systemsStore } from '~/stores/systems'
const storeSystems = systemsStore()
const title = ref('')
const description = ref('')
const homeContent = ref('')
const h1Content = ref(null)
const isHidden =  useState('my-shallow-state')
const seoMeta = useState('seoMeta', () => null)
const seoMetaList =  useState('seoMeta')
const settingsData = useCookie('settingsData')

const isHydration = computed(()=> {
  if($isMobile.value && !settingsData.value?.orderByTime) {
    if($isBot) {
      return $isloadScripts?.value
    } else {
      return true
    }
  }else if(settingsData.value?.orderByTime) {
    return true
  } else if (!$isMobile.value){
    if($isBot) {
      return $isloadScripts?.value
    } else {
      return true
    }
  } else {
    return $isloadScripts?.value
  }
})

const fetchHomePage = async () => {
  try {
    if(seoMetaList.value) {
      title.value = seoMetaList.value.title ?? getConfig(storeSystems.configurations, 'SEO_META_TITLE'),
      description.value = seoMetaList.value.meta_description ?? getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION')
      homeContent.value = seoMetaList.value.content
      h1Content.value =  seoMetaList.value.title
      return
    }
    await useFetch(API_ROUTERS.PAGE.HOME_PAGE).then(resData => {
      seoMeta.value = resData.data.value
      title.value = resData?.data?.value?.title ?? getConfig(storeSystems.configurations, 'SEO_META_TITLE'),
      description.value = resData?.data?.value?.meta_description ?? getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION')
      homeContent.value = resData?.data?.value?.content
      h1Content.value =  resData?.data?.value?.title
    })
  }
  catch (e) {
    title.value = getConfig(storeSystems.configurations, 'SEO_META_TITLE') ? getConfig(storeSystems.configurations, 'SEO_META_TITLE') : ''
    description.value = getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION') ? getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION') : ''
  }
}

await fetchHomePage()
nextTick(async() => {
  useSeoMeta({
    title: h1Content.value ?? title.value,
    description: description.value,
    ogTitle: h1Content.value ?? title.value,
    ogDescription: description.value,
  })
})

</script>