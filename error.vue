<template>
  <NuxtLayout>
    <div class="prose mt-5">
      <div class="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
        <div class="rounded-lg p-8 text-center shadow-xl">
          <h1 class="mb-4 text-4xl font-bold">
            {{ error.statusCode }}
          </h1>
          <p class="text-gray-600 mb-5">
            {{ error.statusMessage ? ((error?.data && error?.statusCode === 404) ? $t('Page not found') : error.statusMessage) : $t('Oops! An error occurred') }}
          </p>
          <nuxt-link :to="'/'"  class="mt-4 btn btn-submit px-3 ">
            {{ $t('Back to Home')}}
          </nuxt-link>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
const { useLocale, $t } = useShareCommon()
const props = defineProps({
  error: Object as () => NuxtError
})

const seoMeta = ref({
  title: '',
});

seoMeta.value.title = props?.error?.statusMessage
useSeoMeta({
  title: () => $t(seoMeta.value.title),
  description: "",
});

</script>
<style scoped>
</style>
