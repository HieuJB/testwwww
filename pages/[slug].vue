<template>
  <div style="min-height: 80vh">
    <CategoryPost v-if="isDisplayCategory === true" />
    <ContentPost v-if="isDisplayCategory === false" />
  </div>
</template>

<script setup>
const categoryState = useState('category-state', () => []);
const route = useRoute();
const { isNavVisible } = useShareCommon()
isNavVisible.value = false
const isDisplayCategory = ref(null);

const checkDisplayCategory = (data) => {
  for (const value of data) {
    if (value.code === route.params.slug) {
      isDisplayCategory.value = true;
    }
  }
  if (isDisplayCategory.value === null) {
    isDisplayCategory.value = false;
  }
};

const fetchMenus = async () => {
  try {
    if (categoryState.value?.length) {
      checkDisplayCategory(categoryState.value);
      return;
    }

    const { data } = await useFetch(API_ROUTERS.POST.CATEGORY.LIST);
    
    if (data?.value?.post_categories?.length) {
      categoryState.value = data?.value?.post_categories;
      checkDisplayCategory(data?.value?.post_categories);
    }
  } catch {}
};

await fetchMenus();
</script>

<style lang="scss" scoped></style>
