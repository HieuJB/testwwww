<template>
  <div class="crumbs container mb-4">
    <nav aria-label="breadcrumb" class="my-1">
      <ol class="breadcrumb">
        <li
          class="breadcrumb-item on d-flex align-items-center"
          v-for="(breadcrumb, index) in initBreadCrums"
          :key="index"
        >
          <nuxt-link
            v-if="breadcrumb?.to"
            :to="breadcrumb?.to"
            :class="breadcrumb?.last"
            >{{ breadcrumb?.label }}</nuxt-link
          >
          <span v-else>{{ breadcrumb?.label }}</span>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script setup>
const { $t } = useShareCommon();
const { breadcrumbs, isCustom } = defineProps({
  breadcrumbs: Array,
  isCustom: {
    type: Boolean,
    default: false,
  },
});

const initBreadCrums = computed(() => {
  if (isCustom) {
    return breadcrumbs;
  } else {
    return [
      {
        label: $t('Home page'),
        to: '/',
        last: 'off',
      },
      ...(breadcrumbs ?? []),
    ];
  }
});

// example Data
// [
//     {
//         "label": "Trang chủ",
//         "to": "/",
//         "last": "off"
//     },
//     {
//         "label": "VĐQG Tây Ban Nha",
//         "to": "/league/vl7oqdehlyr510j",
//         "last": "off"
//     },
//     {
//         "label": "CD Leganes VS Athletic Club",
//         "to": "/match/k82rekhw005grep",
//         "last": "on"
//     }
// ]
</script>

<style lang="scss" scoped></style>
