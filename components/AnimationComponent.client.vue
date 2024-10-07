<template>
  <div class="mo-phong">
    <iframe  loading="lazy" class="lazyload" id="match-id-scl" :data-src="'https://tracker.sportdb.live/?code='+ props?.keyEncode +'&id=' + props?.matchIdSlug + '&lang=' + props?.lang" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts" setup>
import 'lazysizes';

const props = defineProps<{
    keyEncode: any | undefined
    matchIdSlug: any | undefined
    lang: any | undefined
  }>()
</script>