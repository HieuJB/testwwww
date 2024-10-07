<template>
  <BreadcrumbsLite :breadcrumbs="breadcrumbs"></BreadcrumbsLite>
  <div class="container">
    <div id="main" class="listpage">
      <div class="newsbox">
        <h1 class="Htitle" id="tag">{{ categories?.name }}</h1>
        <ul class="news row d-flex" id="alist">
          <li v-for="post in posts" :key="post?.id" class="article mb-3 col-12 col-sm-6 col-lg-3">
            <NuxtLink :to="'/' + post?.slug">
              <div class="artimg">
                <img
                  :src="selectedImageSize ? `${post?.thumbnail?.file_path}!${selectedImageSize}` : post?.thumbnail?.file_path"
                  :alt="post.title" />
              </div>
              <h2 class="match">  {{ post?.title }}</h2>
            </NuxtLink>
            <div class="time">
              <span>{{ post?.post_date ? formatTimeSince(post?.post_date, useLocale) : '' }}</span>
            </div>
          </li>
        </ul>

        <div v-if="totalPages > 0" class="pagination-container mt-4 d-flex justify-content-center">
          <button :disabled="currentPage <= 1" @click="changePage(currentPage - 1)" >
            <img src="/icon/left.svg" width="20px" height="20px">
          </button>
          <button v-for="page in pageRange" :key="page" :disabled="page === currentPage" @click="changePage(page)" :class="page === currentPage ? 'on' : ''">
            {{ page }}
          </button>
          <button :disabled="currentPage >= totalPages" @click="changePage(currentPage + 1)">
            <img src="/icon/right.svg" width="20px" height="20px">
          </button>
        </div>

        <div id="content-page" v-html="categories?.content"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { systemsStore } from '~/stores/systems'
import '~/utils/moment.locale.vi.ts';
const storeSystems = systemsStore()
const { useLocale, $t, $trouter } = useShareCommon()

const posts = ref([]);
const currentPage = ref(1);
const pageSize = ref(CATEGORY_TAG_POST_PER_LIMIT);
const totalPages = ref(0);
const router = useRouter();
const categories = ref([]);
const isContentExpanded = ref(false);
let postCode = router.currentRoute.value.params.category;
if (!postCode) {
  postCode = router.currentRoute.value.path;
  postCode = postCode?.indexOf('/') == 0 ? postCode?.substring(1) : postCode
  if (postCode?.lastIndexOf("/") !== -1) {
    postCode = postCode?.slice(0, postCode.lastIndexOf("/"))
  }
} 
const imageSize = ref([]);
const imagesSizeConfig = getConfig(storeSystems.configurations, 'image_size');
imageSize.value = imagesSizeConfig?.split(',');
const screenWidth = ref(0);

const title = ref()
const description = ref()
const pageContent = ref()
const metaTitle = ref('')
const breadcrumbs = ref([
  {
    label: '',
    to: '',
    last: 'on',
  }
])

const selectedImageSize = computed(() => {
  if (screenWidth.value < SCREEN_WIDTH.MD && imageSize?.value?.length >= 1) {
    return imageSize.value[1];
  } else if (screenWidth.value >= SCREEN_WIDTH.MD && screenWidth.value < SCREEN_WIDTH.LG && imageSize?.value?.length >= 2) {
    return imageSize.value[2];
  } else if (screenWidth.value >= SCREEN_WIDTH.LG && screenWidth.value < SCREEN_WIDTH.XXL && imageSize?.value?.length >= 3) {
    return imageSize.value[3];
  } else {
    return '';
  }
});

const generatePageRange = (currentPage, totalPages) => {
  let start = currentPage - 2;
  let end = currentPage + 2;
  if (start < 1) {
    start = 1;
    end = Math.min(5, totalPages);
  }
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - 4);
  }

  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
};

const pageRange = computed(() => generatePageRange(currentPage.value, totalPages.value));

const changePage = (page: any) => {
  currentPage.value = page;
  fetchPosts(postCode);
};

const fetchPosts = async (categoryCode: string | string[]) => {
  try {
    const { data } = await useFetch(API_ROUTERS.POST.LIST, {
      params: {
        category_code: categoryCode,
        limit: pageSize.value,
        page: currentPage.value,
      },
    });
    posts.value = data?.value?.posts;
    totalPages.value = Math.ceil(data?.value?.count_all / pageSize.value);
  } catch (e) {
    console.error(e);
  }
};

const fetchCategories = async (postCode: string | string[]) => {
  try {
    await useFetch<any>(createUrl(API_ROUTERS.POST.CATEGORY.DETAIL + postCode, {
    })).then(resData => {
      categories.value = resData?.data?.value
      title.value = categories.value?.name
      metaTitle.value = categories.value?.meta_title
      description.value = categories.value?.meta_description ??  categories.value?.name
      breadcrumbs.value[0].label = resData?.data?.value?.name
      breadcrumbs.value[0].to = '/'+resData?.data?.value?.code
    })
  }
  catch (e: any) {

  }
}

await fetchCategories(postCode);

useSeoMeta({
  title: () => metaTitle.value || title.value,
  description: () => description.value,
  ogTitle: () => title.value,
  ogDescription: () => description.value,
})
watch(() => postCode, () => {
  fetchPosts(postCode);
});

fetchPosts(postCode);

const robotsMeta = ref('')

useHead(() => ({
  meta: [ {name: "robots", content: () => robotsMeta.value }]
}));

robotsMeta.value = getConfig(storeSystems.configurations, 'robot_meta_news_category') ? getConfig(storeSystems.configurations, 'robot_meta_news_category') : 'index, follow';

onMounted(() => {
  screenWidth.value = window.innerWidth;
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
  });
});
</script>

<style lang="scss" scoped></style>