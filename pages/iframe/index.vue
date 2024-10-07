<template>
    <!-- Main -->
    <div class="mcontent">
      <div id="main" class="row">
        <LivescoreComponentIframe :h1="h1Content" :page="LIVESCORE_PAGE.LIVESCORE" :content="homeContent"/>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { useWindowSize } from '@vueuse/core'
  const { width } = useWindowSize()
  import { systemsStore } from '~/stores/systems'
  const storeSystems = systemsStore()
  const title = ref()
  const description = ref()
  const homeContent = ref('')
  const h1Content = ref(null)
  
  const isDesktop = computed(()=>{
    return width.value > 768
  })
  
  const fetchHomePage = async () => {
    try {
      await useFetch<any>(API_ROUTERS.PAGE.HOME_PAGE).then(resData => {
        title.value = resData?.data?.value?.meta_title ?? getConfig(storeSystems.configurations, 'SEO_META_TITLE'),
        description.value = resData?.data?.value?.meta_description ?? getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION')
        homeContent.value = resData?.data?.value?.content
        h1Content.value =  resData?.data?.value?.title
      })
    }
    catch (e: any) {
      title.value = getConfig(storeSystems.configurations, 'SEO_META_TITLE') ? getConfig(storeSystems.configurations, 'SEO_META_TITLE') : ''
      description.value = getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION') ? getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION') : ''
    }
  }
  
  await fetchHomePage()
  nextTick(async() => {
    useSeoMeta({
      title: title.value,
      description: description.value,
      ogTitle: title.value,
      ogDescription: description.value,
    })
  })
  useHead(() => ({
    meta: [ {name: "robots", content: 'noindex' }]
  }));
  </script>