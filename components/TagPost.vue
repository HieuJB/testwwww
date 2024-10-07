<template>
  <BreadcrumbsLite :breadcrumbs="breadcrumbs" isCustom/>
  <div class="mcontent">
    <div id="main" class="listpage container">
      <div class="newsbox">
        <h1 class="Htitle" id="tag">{{ tags?.name }}</h1>
        <ul class="news row d-flex" id="alist">
          <li v-for="post in posts" :key="post?.id" class="article col-12 col-sm-6 col-lg-3">
            <NuxtLink :to="'/' + post?.slug">
              <div class="artimg">
                <img
                  :src="selectedImageSize ? `${post?.thumbnail?.file_path}!${selectedImageSize}` : post?.thumbnail?.file_path"
                  :alt="post.title" />
              </div>
              <h2 class="match"> {{ post?.title }}</h2>
            </NuxtLink>
            <div class="time">
              <span>{{ post?.post_date ? formatTimeSince(post?.post_date, useLocale) : '' }}</span>
            </div>
          </li>
        </ul>

        <div v-if="totalPages > 0" class="pagination-container mt-4 d-flex justify-content-center">
          <button :disabled="currentPage <= 1" @click="changePage(currentPage - 1)">
            <img src="/icon/left.svg" width="20px" height="20px">
          </button>
          <button v-for="page in totalPages" :key="page" :disabled="page === currentPage" @click="changePage(page)" :class="page === currentPage ? 'on' : ''">
            {{ page }}
          </button>
          <button :disabled="currentPage >= totalPages" @click="changePage(currentPage + 1)">
            <img src="/icon/right.svg" width="20px" height="20px">
          </button>
        </div>

        <div id="content-page" class="mt-3 newsbox p-3" v-if="pageContent">
          {{ pageContent }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { systemsStore } from '~/stores/systems'
import { CATEGORY_TAG_POST_PER_LIMIT } from '~/utils/constants';
const { useLocale, $t, $trouter } = useShareCommon()
const storeSystems = systemsStore()

const posts = ref([]);
const currentPage = ref(1);
const pageSize = ref(CATEGORY_TAG_POST_PER_LIMIT);
const totalPages = ref(0);
const router = useRouter();
const tags = ref([]);
const isContentExpanded = ref(false);
const postCode = router.currentRoute.value.params.tag;

const imageSize = ref([]);
const imagesSizeConfig = getConfig(storeSystems.configurations, 'image_size');
imageSize.value = imagesSizeConfig?.split(',');

const screenWidth = ref(0);
const title = ref()
const description = ref()
const pageContent = ref()
const breadcrumbs = ref([
     {
        "label": $t('News'),
        "to": $trouter(ROUTERS_OLD.NEWS),
        "last": "off"
    },
    {
        "label": '',
        "to": '',
        "last": "on"
    },
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

const changePage = (page: any) => {
  currentPage.value = page;
  fetchPosts(postCode);
};

const fetchPosts = async (tagCode: string | string[]) => {
  try {
    const { data } = await useFetch(API_ROUTERS.POST.LIST, {
      params: {
        tag_code: tagCode,
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

const fetchTags = async (postCode: string | string[]) => {
  try {
    const { data } = await useFetch<any>(createUrl(API_ROUTERS.POST.TAG.SLUG + postCode, {}))
    if (!data?.value) {
      showError({
          statusCode: 404,
          statusMessage: $t("Tag does not exist")
        })
      }
    tags.value = data?.value
    breadcrumbs.value[1].label = data?.value.name
    breadcrumbs.value[1].to = ROUTERS_OLD.NEWS_TAG+'/'+ data?.value.code
    title.value = tags.value?.name
    description.value = tags.value?.meta_description ??  tags.value?.name
  }
  catch (e: any) {
    showError({
      statusCode: 404,
      statusMessage: $t("Tag does not exist")
    })
  }
}

const getDataConfig = () => {
  pageContent.value = getConfig(storeSystems.configurations, 'NEWS_CONTENT_TAG') ?? ''
}

const fetchConfigurations = async () => {
  try {
    const resData = await useFetch<any>(createUrl(API_ROUTERS.CONFIGURATIONS));
    storeSystems.configurations = resData.data.value?.configurations || [];
  } catch (e) {
  }
};

if (!storeSystems.configurations) {
  await fetchConfigurations()
}
await fetchTags(postCode);
getDataConfig()

useSeoMeta({
  title:  () => title.value,
  description:  () => description.value,
  ogTitle:  () => title.value,
  ogDescription:  () => description.value,
})

watch(() => postCode, () => {
  fetchPosts(postCode);
});

fetchPosts(postCode);

onMounted(() => {
  screenWidth.value = window.innerWidth;
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
  });

});
</script>

<style lang="scss" scoped></style>