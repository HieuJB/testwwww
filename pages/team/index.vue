<template>
  <div class="container bg-white team">
    <div class="team__header">
      <div class="title">{{ translate('Football Team') }}</div>
      <div class="team__header-right">
        <TeamsBaseInput v-model:search="search" />
        <BaseDropdown
          v-if="listComp"
          v-model:info="listComp"
          v-model:compActive="compActive"
        />
      </div>
    </div>

    <div class="mt-3">
      <TransitionGroup name="list" tag="div" class="team__list">
        <div v-for="(item, index) in teams" :key="index" class="team__item">
          <div class="team__item-img" v-if="!isLoading">
            <BaseImage
              
              :src="getLiveScoreImage(item.logo_o, 'team') + '!h50'"
              :alt="item.logo_o"
              imgDefault="/img/team-default.png"
            />
          </div>
          <p v-if="isLoading" class="card-text placeholder-glow">
            <span
              class="placeholder bg-secondary"
              style="width: 60px; height: 60px; border-radius: 50%"
            ></span>
          </p>
          <div>
            <div
              @click="$router.push(`/team/${item.id}`)"
              v-if="!isLoading"
              class="team__item-name"
            >
              {{ item.name }}
            </div>
            <p v-if="isLoading" class="card-text placeholder-glow">
              <span
                class="placeholder bg-secondary"
                style="width: 100px"
              ></span>
            </p>
            <div v-if="!isLoading" class="team__item-country">
              {{ item.country_name }}
            </div>
            <p v-if="isLoading" class="card-text placeholder-glow mb-2">
              <span class="placeholder bg-secondary" style="width: 50px"></span>
            </p>
          </div>
        </div>
      </TransitionGroup>
      <div class="team__loading" v-if="!teams.length && isLoading">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <div
      class="loading mx-auto d-flex justify-content-center"
      v-if="isInfinity"
    >
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div ref="el" style="opacity: 0">infiniti</div>
    <div v-if="!teams.length && !isLoading" class="mt-5">
      <div class="d-flex flex-column align-items-center">
        <BaseImage
          class="nodata_pic"
          alt="nodata pic"
          width="200"
          height="200"
          src="/icon/nodata.svg"
        />
      </div>
      <p class="fw-bold text-center mt-3">{{ translate('No Data Available') }}</p>
    </div>
    <div id="content-page" class="mt-5">
      <h1 class="page_title" v-if="title">{{ title }}</h1>
      <div class="text-center">{{ content }}</div>
    </div>
  </div>
</template>

<script setup>
const { $t, useLocale, isNavVisible } = useShareCommon();
isNavVisible.value = false
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
import { systemsStore } from '~/stores/systems';
const storeSystems = systemsStore();
import { useIntersectionObserver } from '@vueuse/core';
const isLoading = ref(false);
const listComp = ref([]);
const search = ref('');
const page = ref(1);
const teams = ref([]);
const limit = ref(102);

const title = ref(null);
const content = ref(null);
const description = ref(null);
const keyword = ref(null);

const compActive = ref({
  id: 1,
  comp_name: translate('All'),
  comp_logo: '/icon/player-statistics/1.png',
});
const el = ref(null);
const isInfinity = ref(false);
const fetchCompHotList = async () => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.COMP_LIST_ALL + `?lang=${useLocale.value.defaultLocale}`).then(
    (resData) => {
      if (resData) {
        listComp.value = resData;
        listComp.value = [
          {
            id: 1,
            comp_name: translate('All'),
            comp_logo: '/icon/player-statistics/1.png',
          },
          ...listComp.value,
        ];
      }
    }
  );
};

fetchCompHotList();

useIntersectionObserver(el, ([{ isIntersecting }]) => {
  try {
    if (isIntersecting && teams.value.length >= 100 && !isInfinity.value) {
      page.value = page.value + 1;
      fetchTeam(true);
    }
  } catch {}
});

const fetchTeam = async (isLoadingInfinity = false) => {
  if (!isLoadingInfinity) {
    isLoading.value = true;
  }
  if (isLoadingInfinity) {
    isInfinity.value = true;
  }
  await useApiLiveScore(
    `${API_ROUTERS.LIVESCORE.TEAM_LIST}?page=${page.value}&limit=${
      limit.value
    }&competition-id=${
      compActive.value.id === 1 ? '' : compActive.value.id
    }&name=${search.value}&lang=${useLocale.value.defaultLocale}`
  )
    .then((resData) => {
      if (resData) {
        if (isLoadingInfinity) {
          teams.value = [...teams.value, ...resData];
        } else {
          teams.value = resData;
        }
      }
    })
    .finally(() => {
      isLoading.value = false;
      isInfinity.value = false;
    });
};

await fetchTeam();

const debouncedFetchTeam = debounce(() => {
  page.value = 1;
  fetchTeam();
}, 300);

watch(
  () => search.value,
  () => {
    debouncedFetchTeam();
  }
);

watch(
  () => compActive.value,
  () => {
    page.value = 1;
    fetchTeam();
  }
);

const fetchSeoMeta = () => {
  try {
    title.value = getConfig(
      storeSystems.configurations,
      'TEAM_TITLE_REPOSITORY'
    );
    description.value = getConfig(
      storeSystems.configurations,
      'TEAM_DESCRIPTION_REPOSITORY'
    );
    keyword.value = getConfig(
      storeSystems.configurations,
      'TEAM_KEYWORD_REPOSITORY'
    );
    content.value = getConfig(
      storeSystems.configurations,
      'TEAM_CONTENT_REPOSITORY'
    );
  } catch {}
};

fetchSeoMeta();

useSeoMeta({
  title: title.value,
  description: description.value,
  ogTitle: title.value,
  ogDescription: description.value,
  keywords: keyword.value,
});
</script>

<style lang="scss" scoped>
.team {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  padding: 10px 20px 100px 20px;
  min-height: 80vh;
  margin-bottom: 30px;
  background-color: white !important;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  @media (max-width: 768px) {
    padding: 8px 8px 100px 8px;
  }
  #content-page {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__loading {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .title {
      position: relative;
      font-size: 20px;
      font-weight: bold;
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: $primary;
        left: 0;
        bottom: -2px;
        transform: translateX(-100%);
        animation: slideIn 0.5s ease-in-out forwards;
      }
    }
    @keyframes slideIn {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }
    &-right {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      @media (max-width: 768px) {
        width: 100%;
        justify-content: flex-end;
      }
    }
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__item {
    width: 33%;
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;

    &-name {
      font-weight: bold;
      cursor: pointer;
    }
    &-img {
      position: relative;
      padding: 7px;
      background-color: #e8e9eb;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      img {
        padding: 7px;
        width: 60px;
        height: 60px;
        object-fit: contain;
        background-color: white;
        border-radius: 50%;
      }
    }

    &-country {
      font-size: 11px;
      color: #6e6e6e;
    }
    @media (max-width: 768px) {
      width: 50%;
    }
    &:hover {
      .team__item-name {
        color: $primary;
      }
    }
  }
  .placeholder {
    border-radius: 12px;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
