<template>
  <div class="row mt-3 border-top">
    <div class="col-12 col-md-12 col-lg-12 p-3">
      <!-- BLV  -->
      <div class="d-flex gap-3">
        <div class="p-3">
          <div
            class="blv-img position-relative blv-avatar border border-1 rounded-circle"
            style="width: 80px; height: 80px"
          >
            <img
              v-if="streamerInfo?.avatar"
              :src="streamerInfo?.avatar"
              alt=""
              width="100%"
              height="100%"
            >
            <span
              v-else
              class=""
            >{{ streamerInfo?.nick_name ? avatarText(streamerInfo?.nick_name) :
              avatarText('No Name') }}</span>
          </div>
        </div>

        <div class="row">
          <div class="d-flex flex-wrap">
            <div class="d-flex align-items-center gap-2 flex-grow-1 ">
              <div style="color: #fc7853">
                {{ streamerInfo?.nick_name ?? streamerInfo?.name }}
              </div>
              <span
                class="rounded-pill text-light px-2 py-1 font-smaller border-linear-radius cursor-pointer"
              >
                Theo dõi
              </span>
            </div>
            <div
              v-for="social in socials"
              v-if="socials.length > 0" 
              class="d-flex gap-3 me-3"
            >
              <nuxt-link
                :to="social?.meta_value ? social?.meta_value : '#'"
                target="_blank"
              >
                <!-- <Icon
                  :icon="social?.meta_code_icon"
                  :inline="true"
                  :style="{ fontSize: '25px' }"
                /> -->
              </nuxt-link>
            </div>
          </div>
          <ul class="mt-3 px-4 ps-2">
            <li v-html="introduction ? introduction : '<i>(Tác giả chưa cập nhật giới thiệu)</i>' " />
          </ul>
        </div>
      </div>

      <!-- Tab menu  -->
      <div class="mt-3">
        <ul
          id="myTab"
          class="nav nav-tabs"
          role="tablist"
        >
          <li
            class="nav-item"
            role="presentation"
          >
            <button
              id="profile-tab"
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="true"
            >
              Tiểu sử
            </button>
          </li>
          <li
            class="nav-item"
            role="presentation"
          >
            <button
              id="record-tab"
              class="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#record"
              type="button"
              role="tab"
              aria-controls="record"
              aria-selected="false"
            >
              Bài viết
            </button>
          </li>
        </ul>
        <div
          id="myTabContent"
          class="tab-content"
        >
          <div
            id="profile"
            class="tab-pane fade mt-3"
            role="tabpanel"
            aria-labelledby="profile-tab"
            v-html="biographyOf ? biographyOf : '<i>(Tác giả chưa cập nhật tiểu sử)</i>' "
          />
          <div
            id="record"
            class="tab-pane fade show active"
            role="tabpanel"
            aria-labelledby="record-tab"
          >
            <!-- <AuthorPost /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/data");
const liverooms = data.value.liverooms;
const storeSystems = systemsStore()
import { useIntersectionObserver, useDebounceFn } from '@vueuse/core'

const router = useRouter()

// const route = useRoute();
const liveroomRoute = ref([]);

const isLoading = ref(true)

const streamerId = ref()
const streamers = ref([])
const isLoadingStreamer = ref(true)
const searchStreamer = ref("");
const queryStreamer = ref("");
const resultStreamer = ref([]);
const streamerInfo = ref([])
const streamerUserMeta = ref([])
const biographyOf = ref('')
const introduction = ref('')
const schedulesList = ref([])
const socials = ref([])

const isMoreLoading = ref(false)
const streamerSchedulesList = ref<HTMLElement | null>(null)
const loaderSchedules = ref(null)
const schedulePage = ref(1)

const { isActive, pause, resume } = useIntersectionObserver(
  loaderSchedules,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      if (schedulePage?.value > 0) {
        schedulePage.value = schedulePage?.value + 1
        fetchMoreSchedules(streamerId.value)
      }
    }
  },
  { streamerSchedulesList },
)

const isMoreStreamerLoading = ref(false)
const streamersList = ref<HTMLElement | null>(null)
const loaderStreamers = ref(null)
const pageStreamer = ref(1)

const { isActiveStreamer, pauseStreamer, resumeStreamer } = useIntersectionObserver(
  loaderStreamers,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      // isVisible.value = isIntersecting
      if (pageStreamer?.value > 0) {
        pageStreamer.value = pageStreamer?.value + 1
        fetchMoreStreamers(queryStreamer.value)
      }
    }
  },
  { streamersList },
)


const FilterStreamer = () => {
  resultStreamer.value = liverooms.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchStreamer.value.toLowerCase()) ||
      searchStreamer == null
    );
  });
};

const onFilterStreamer = useDebounceFn(() => {
  
  queryStreamer.value = searchStreamer.value.trim()
  pageStreamer.value = 1

  fetchStreamers(queryStreamer.value)
}, 300)

const title = ref()
const description = ref()

useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
})

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    const authorSlug = route.params.author?.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    if (authorSlug && authorSlug.length > 0) {
      return typeof route.params.author === 'string'
    }
  }
})

const fetchAuthor = async (streamerId: string | string[]) => {
  try {
    await useFetch<any>(createUrl(API_ROUTERS.AUTHOR.INFO + '/' + streamerId)).then(resData => {
      streamerInfo.value = resData?.data?.value?.info
      streamerUserMeta.value = resData?.data?.value?.user_meta
      
      biographyOf.value = getUserMeta(resData?.data?.value?.user_meta, 'biography_of')
      introduction.value = getUserMeta(resData?.data?.value?.user_meta, 'article_author')
      
      const socicalList = getUserMetaGroup(resData?.data?.value?.user_meta, '[social]')
      if (socicalList?.length > 0) {
        socials.value = socicalList?.map(item => {
          item.meta_code_icon = item?.meta_code ? ('tabler-brand-' + item?.meta_code?.replace("[social][", "").replace("]", "")) : ''
          return item
        })
      }

      title.value = resData?.data?.value?.info?.name
      description.value = introduction.value
    })
  }
  catch (e: any) {
    return false
  }
}


const InitData = async () => {
  const authorSlug = router?.currentRoute?.value?.params?.author?.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
  if (authorSlug && authorSlug.length > 0) {
    streamerId.value = authorSlug[0]

    await fetchAuthor(authorSlug[0])
  } else {
    // redirect to 404
    showError({
      statusCode: 404,
      statusMessage: "Page Not Found"
    })
  }
}

InitData()

// onMounted(() => {
//   InitData()

//   FilterStreamer();
//   liveroomRoute.value = liverooms.filter((item) => item.name === "Nhật Ký");
// })

</script>
