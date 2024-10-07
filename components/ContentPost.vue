<template>
  <BreadcrumbsLite :breadcrumbs="breadcrumbs"></BreadcrumbsLite>
  <div class="mcontent container">
    <div id="main" class="articlebox row" v-if="postDetail">
      <h1 class="Htitle col-12">{{ postDetail?.title }}</h1>
      <div class="left" :class="postType === POST_TYPE.POST ? 'col-12 col-md-8' : 'col-12 col-md-12'">
        <div class="d-flex justify-content-between align-items-center mt-2 mb-4 article-header">
          <div class="d-flex gap-3 align-items-center mb-2">
            <div class="d-flex gap-2 align-items-center">
              <img src="/icon/user.svg" width="18px" height="18px" alt="user" title="user">
              <small>{{ postDetail?.user?.name }}</small>
            </div>
            <div>
              <small class="">{{ postDetail?.published_time ? formatTimeSince(postDetail?.published_time, useLocale) : ''
                }}</small>
            </div>
          </div>
          <div class="d-flex gap-3" v-if="onOffFollowSocial === 'True'">
            <div class="fs-18 fw-500">
              {{ $t('Follow') }}:
            </div>
            <template v-for="(social, index) in iconSocial">
              <a class="followsocial" :href="social?.url" :alt="social?.iconcode" :title="postDetail?.title " :rel="social?.followurl ? 'dofollow' : 'nofollow'" target="_blank">
                <Icon
                  :icon="social?.iconcode"
                  :inline="true"
                  :style="{ fontSize: '25px' }"
                  class="table-icon"
                />
              </a>
            </template>
          </div>
        </div>
        <div class="d-flex align-items-center w-100"  v-if="postType === POST_TYPE.POST">
          <BaseImage :src="postDetail?.thumbnail?.file_path" :alt="postDetail?.title" class="w-100" />
          <br />
        </div>
        <p class="mt-3" v-html="postDetail?.summary" style="font-style: italic"></p>
        <div class="mt-3" v-html="postDetail?.content" />
        <br />

        <div class="d-flex gap-1 align-items-center share-social" v-if="onOffShareSocial === 'True'">
          {{ $t('Share') }}:
          <a :href="'https://www.facebook.com/sharer.php?u=' + urlPost" data-label="Facebook" onclick="window.open(this.href,this.title,'width=500,height=500,top=300px,left=300px'); return false;" rel="noopener noreferrer nofollow" target="_blank" class="fa fa-facebook" aria-label="Share on Facebook">
            <Icon
              icon="tabler-brand-facebook"
              :inline="true"
              :style="{ fontSize: '25px' }"
              color="#fff"
            />
          </a>
          <a :href="'https://twitter.com/share?url=' + urlPost" class="fa fa-twitter" data-label="Twitter" onclick="window.open(this.href,this.title,'width=500,height=500,top=300px,left=300px'); return false;" rel="noopener noreferrer nofollow" target="_blank" aria-label="Share on Twitter">
            <Icon
              icon="tabler:brand-x"
              :inline="true"
              :style="{ fontSize: '25px' }"
               color="#fff"
            />
          </a>
          <a :href="'https://t.me/share/url?url=' + urlPost + '&text=' + postDetail?.title" class="fa fa-telegram" data-label="Telegram" onclick="window.open(this.href,this.title,'width=500,height=500,top=300px,left=300px'); return false;" rel="noopener noreferrer nofollow" target="_blank" aria-label="Share on Telegram">
            <Icon
              icon="tabler:brand-telegram"
              :inline="true"
              :style="{ fontSize: '25px' }"
               color="#fff"
            />
          </a>
          <a :href="'https://www.linkedin.com/shareArticle?mini=true&url=' + urlPost" class="fa fa-linkedin " data-label="Linkedin" onclick="window.open(this.href,this.title,'width=500,height=500,top=300px,left=300px'); return false;" rel="noopener noreferrer nofollow" target="_blank" aria-label="Share on Linkedin">
            <Icon
              icon="tabler:brand-linkedin"
              :inline="true"
              :style="{ fontSize: '25px' }"
               color="#fff"
            />
          </a>
          <!-- <a href="#" class="fa fa-zalo">
            <img src="/icon/zalo_icon.png" alt="zalo" title="zalo">
          </a> -->
        </div>
        <br />
        <!-- <div class="link mt-3">
          <span v-if="prevPost">
            Previous:
          </span>
          <span v-if="nextPost">
            Next:
          </span>
        </div> -->
      </div>
      <div class="right col-12 col-md-4" v-if="postType === POST_TYPE.POST">
        <div class="side-box" v-if="postDetail?.post_brand_tag?.length > 0">
          <div class="box">
            <div class="tagtitle">{{ $t('TAGS') }}</div>
            <nuxt-link v-for="tag in postDetail?.post_brand_tag" :key="tag?.id" class="tags"
              :to="ROUTERS_OLD.NEWS_TAG + '/' + tag?.code">
              {{ tag?.name }}
            </nuxt-link>
          </div>
        </div>

        <div class="side-box">
          <div class="Htitle">{{ $t('Latest News') }}</div>
          <ul>
            <li v-for="post in postLists" :key="post?.id" class="article d-flex"
                @click="locationHref('/' + post?.slug)">
                <div class="artimg">
                    <img :src="selectedImageSize ? `${post?.thumbnail?.file_path}!${selectedImageSize}` : post?.thumbnail?.file_path" :alt="post.title" >
                </div>
                <div class="match">{{ post?.title }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ITEMS_PER_COMMENT } from "~/utils/constants";
import { systemsStore } from '~/stores/systems'
import { Icon } from '@iconify/vue';
import '~/utils/moment.locale.vi.ts';
const { useLocale, $t, $trouter } = useShareCommon()

const postDetail = ref(null)
const postLists = ref([])
const commentsList = ref([])
const commentPage = ref(1)
const isLoadingComment = ref(true)
const storeSystems = systemsStore()

const router = useRouter()
const route = useRoute()
const postCode = ref(route.params.slug)
const breadcrumbs = ref(
  [
    {
      label: '',
      to: '',
      last: 'off',
    },
    {
      label: '',
      to: '',
      last: 'on',
    }
  ]
)
const currentIndex = computed(() => postLists.value.findIndex(post => post.slug === postDetail.value.slug));
const prevPost = computed(() => postLists.value[currentIndex.value - 1]);
const nextPost = computed(() => postLists.value[currentIndex.value + 1]);

const imageSize = ref([]);
const imagesSizeConfig = getConfig(storeSystems.configurations, 'image_size');
imageSize.value = imagesSizeConfig?.split(',');

const screenWidth = ref(0);

const title = ref()
const description = ref()
const pageContent = ref()
const postType = ref()
const keyword = ref()
const indexFlag = ref()
const iconSocial = ref()
const url = useRequestURL()

const urlPost =  'https://' + url.hostname + url.pathname
const onOffFollowSocial = ref(getConfig(storeSystems.configurations, 'OPTION_FOLLOW_SOCIAL'));
const onOffShareSocial = ref(getConfig(storeSystems.configurations, 'OPTION_SHARE_SOCIAL'));
let followSocial = getConfig(storeSystems.configurations, 'followsocial');
iconSocial.value = followSocial ? JSON.parse(followSocial) : [];

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

// Get comment list by postID
const fetchCommentsList = async (postId: string) => {
  try {
    const { data, pending, error, refresh } = await useFetch(API_ROUTERS.COMMENTS.TREE + '/' + postId, {
      headers: {
        Authorization: useCookie('accessToken')?.value,
      },
      query: {
        limit: ITEMS_PER_COMMENT,
        page: commentPage.value
      },
    })

    if (data?.value) {
      isLoadingComment.value = false
      if (data?.value?.results > 0) {
        commentsList.value = (commentsList.value && commentPage.value > 1) ? [...commentsList.value, ...data?.value?.comments] : data?.value?.comments

        if (data?.value?.results < ITEMS_PER_COMMENT)
          commentPage.value = 0
      } else
        commentPage.value = 0
    }
  }
  catch (e: any) {
    isLoadingComment.value = false
  }
}

const loadMoreComments = (postId: string) => {
  if (commentPage?.value > 0) {
    commentPage.value = commentPage?.value + 1
    fetchCommentsList(postId)
  }
}

const {data} =  await useFetch<any>(createUrl(API_ROUTERS.POST.SLUG + `?slug=` + postCode.value, {}))
if (!data?.value) {
  showError({
    statusCode: 404,
    statusMessage: $t("Article does not exist")
  })
}
postDetail.value = data?.value
title.value = postDetail.value?.title,
description.value = postDetail.value?.meta_description ?? postDetail.value?.summary,
postType.value = postDetail.value?.type
keyword.value = postDetail.value?.keyword
indexFlag.value = postDetail.value?.is_index_flag

if(data?.value?.post_brand_category?.[0]?.slug) {
  breadcrumbs.value[0].label = data?.value?.post_brand_category?.[0].name
  breadcrumbs.value[0].to = data?.value?.post_brand_category?.[0]?.slug ? '/'+data?.value?.post_brand_category?.[0].slug : ''
  breadcrumbs.value[1].label = data?.value?.title
  breadcrumbs.value[1].to = '/'+data?.value?.slug
}else {
  breadcrumbs.value[0].label = data?.value?.title
  breadcrumbs.value[0].to = '/'+data?.value?.slug
  breadcrumbs.value[0].last = 'on'
  breadcrumbs.value =  breadcrumbs.value.slice(0,1)
}
useSeoMeta({
  title: () => title.value,
  description: () => description.value,
  ogTitle: () => title.value,
  ogDescription: () => description.value,
  keywords: () => keyword.value,
})

useHead(() => ({
  meta: [
    {
      name: "robots",
      content: indexFlag.value ? "index, follow" : "noindex, follow"
    }
  ]
}));

const fetchDetailPost = async (postCode: string | string[]) => {
  try {
    await useFetch<any>(createUrl(API_ROUTERS.POST.SLUG + `?slug=` + postCode, {
    })).then(resData => {
      // if (!resData?.data?.value) {
      //   showError({
      //     statusCode: 404,
      //     statusMessage: "Bài viết không tồn tại!"
      //   })
      // }
      postDetail.value = resData?.data?.value

      title.value = postDetail.value?.meta_title ?? postDetail.value?.title,
      description.value = postDetail.value?.meta_description ?? postDetail.value?.summary,

      useSeoMeta({
        title: title.value,
        description: description.value,
        ogTitle: title.value,
        ogDescription: description.value,
      })

      //fetchCommentsList(resData?.data?.value?.id)
    })
  }
  catch (e: any) {

  }
}

const fetchListPosts = async () => {
  try {
    await useFetch<any>(createUrl(API_ROUTERS.POST.LIST, {
      query: {
        limit: ITEMS_PER_LIMIT,
      },

    })).then(resData => {
      postLists.value = resData?.data?.value?.posts?.filter(post => post?.slug !== postCode.value)
    })
  }
  catch (e: any) {
  }
}

// await fetchDetailPost(postCode)
fetchListPosts()

onMounted(() => {
  screenWidth.value = window.innerWidth;
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
  });
});
</script>

<style lang="scss" scoped>
@media (max-width: 430px) {
  .article-header {
    display: inline-block !important;
  }
}

</style>