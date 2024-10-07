import { createSharedComposable } from '@vueuse/core';
export const useShareCommon = createSharedComposable(() => {
  const route = useRoute();
  const useLocale = ref({
    defaultLocale: 'vi',
    LocaleMessage: [],
  });
  const isNavVisible = ref(true)

  const $t = (key) => {
    return useLocale.value?.LocaleMessage?.[key] ?? key
    //return useLocale.value?.LocaleMessage?.[useLocale.value.defaultLocale]?.[key] ?? key
  }

  const $trouter = (key) => {
    return ROUTERS_LANG?.[key]?.[useLocale.value.defaultLocale] ?? ROUTERS_OLD?.[key] ?? key
  }

  return {
    route,
    useLocale,
    $t,
    $trouter,
    isNavVisible
  };
});