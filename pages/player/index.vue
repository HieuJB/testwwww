<template>
  <div class="container bg-white team">
    <div class="team__header">
      <div class="title">{{ translate('Player List') }}</div>
      <div class="team__header-right" style="margin-right: 8px">
        <TeamsBaseInput
          :placeholder="translate('Enter Player Name')"
          v-model:search="search"
        />
        <TeamsPlayerDropdown
          v-model:info="contries"
          v-model:compActive="compActive"
        />
      </div>
    </div>

    <TransitionGroup
      v-if="playerList.length"
      name="list"
      tag="div"
      :class="[
        'player__list mt-4',
        {
          'opacity-0': isLoading,
        },
      ]"
    >
      <div
        class="player__item"
        v-for="(item, index) in playerList"
        :key="index"
      >
        <div class="player__card">
          <div class="Image__Wrapper aspect-ratio--child">
            <div
              :class="[
                'player__card-img',
                {
                  'player__card-img-country':
                    !item.team_logo_o && item.country_logo,
                },
              ]"
            >
              <BaseImage
                alt="Chelsea"
                class=""
                imgDefault="/img/team-default.png"
                :src="
                  getLiveScoreImage(
                    item.team_logo_o ? item.team_logo_o : item.country_logo,
                    item.team_logo_o ? 'team' : 'country'
                  ) + '!h120'
                "
              />
            </div>
            <div class="PlayerHeader__Overlay_Detail"></div>
            <div
              class="PlayerHeader__Overlay PlayerHeader__Overlay--right PlayerHeader__Overlay--opaque"
            ></div>

            <BaseImage
              class="player-avt"
              :imgDefault="`/img/playericon.png`"
              :src="getLiveScoreImage(item.logo_o, 'player') + '!h80'"
            />
          </div>
        </div>

        <div class="player__card-right">
          <div class="player__card-name">
            <div>{{ splitName(item.name)?.[0] ?? '' }} <br /></div>
            <div>{{ splitName(item.name)?.[1] ?? '' }}</div>
          </div>

          <div class="d-flex align-items-center gap-1 py-2">
            <BaseImage
              alt="Chelsea"
              class=""
              data-mptype="image"
              width="20px"
              :src="
                getLiveScoreImage(
                  item.team_logo_o ? item.team_logo_o : item.country_logo,
                  item.team_logo_o ? 'team' : 'country'
                ) + '!h20'
              "
            />
            <span class="team-name"
              >{{ item.team_name ?? item.country_name }}
            </span>
          </div>
          <button @click="$router.push(`${ROUTERS.PLAYER.toLowerCase()}/${item.id}`)">
            {{ translate('Details') }}
          </button>

        </div>

        <div class="player__info">
          <div class="player__info-item">
            <div class="player__info-item-left">
              {{ translate('H/W') }} :
            </div>
            <div class="player__info-item-right">
              {{ item.height ?? '-' }} cm, {{ item.weight }} kg
            </div>
          </div>

          <div class="player__info-item">
            <div class="player__info-item-left">
              {{ translate('Date of Birth') }} :
            </div>
            <div class="player__info-item-right">
              {{ item.birthday ?? '-' }} ({{ item.age ?? '-' }})
            </div>
          </div>

          <div class="player__info-item">
            <div class="player__info-item-left">
              {{ translate('Country') }} :
            </div>
            <div class="player__info-item-right">{{ item.country_name }}</div>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <div class="mx-auto d-flex justify-content-center" v-if="isInfinity">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div ref="el" style="opacity: 0">infiniti</div>

    <div
      class="d-flex flex-column align-items-center mx-auto mt-5"
      v-if="!playerList.length && !isLoading"
    >
      <div>
        <BaseImage
          class="nodata_pic"
          alt="nodata pic"
          width="200"
          height="200"
          src="/icon/nodata.svg"
        />
      </div>
      <p class="fw-bold text-center mt-3">
        {{ translate('No Data Available') }}
      </p>
    </div>

    <div v-if="isLoading" class="loading">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
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
const el = ref(null);
const isInfinity = ref(false);
const search = ref('');
const page = ref(1);
const limit = ref(12);
const playerList = ref([]);
const contries = ref([]);
const isLoading = ref(false);
const compActive = ref({
  country_id: 1,
  country_name:translate('All'),
  logo_league_o: '/icon/player-statistics/1.png',
});
const title = ref(null);
const content = ref(null);
const description = ref(null);
const keyword = ref(null);

function splitName(name) {
  const index = name.indexOf(' ');

  if (index === -1) {
    return ['', name];
  } else {
    return [name.slice(0, index), name.slice(index + 1)];
  }
}

useIntersectionObserver(el, ([{ isIntersecting }]) => {
  try {
    if (
      isIntersecting &&
      playerList.value.length >= limit.value &&
      !isInfinity.value
    ) {
      page.value = page.value + 1;
      fetchPlayer(true);
    }
  } catch {}
});

const fetchWarehouse = async () => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.WAREHOUSE,{lang: useLocale?.value.defaultLocale}).then((resData) => {
    if (resData) {
      contries.value = resData
        .reduce((acc, cur) => {
          acc = [...acc, cur.countries];
          return acc;
        }, [])
        .flat()
        .filter((item) => item.country_id);
      contries.value.unshift({
        country_id: 1,
        country_name:translate('All'),
        logo_league_o: '/icon/player-statistics/1.png',
      });
    }
  });
};

const fetchPlayer = async (isLoadingInfinity = false) => {
  if (!isLoadingInfinity) {
    isLoading.value = true;
  }
  if (isLoadingInfinity) {
    isInfinity.value = true;
  }
  await useApiLiveScore(
    `${API_ROUTERS.LIVESCORE.PLAYER_LIST}?page=${page.value}&limit=${
      limit.value
    }&country-id=${
      compActive.value.country_id !== 1 ? compActive.value.country_id : ''
    }&name=${search.value}&lang=${useLocale.value.defaultLocale}`
  )
    .then((resData) => {
      if (resData) {
        if (isLoadingInfinity) {
          playerList.value = [...playerList.value, ...resData];
        } else {
          playerList.value = resData;
        }
      }
    })
    .finally(() => {
      isLoading.value = false;
      isInfinity.value = false;
    });
};

fetchWarehouse();
fetchPlayer();

const debouncedFetchPlayer = debounce(() => {
  page.value = 1;
  fetchPlayer();
}, 300);

watch(
  () => search.value,
  () => {
    debouncedFetchPlayer();
  }
);

watch(
  () => compActive.value,
  () => {
    page.value = 1;
    fetchPlayer();
  }
);

const fetchSeoMeta = () => {
  try {
    title.value = getConfig(
      storeSystems.configurations,
      'PLAYER_TITLE_REPOSITORY'
    );
    description.value = getConfig(
      storeSystems.configurations,
      'PLAYER_DESCRIPTION_REPOSITORY'
    );
    keyword.value = getConfig(
      storeSystems.configurations,
      'PLAYER_KEYWORD_REPOSITORY'
    );
    content.value = getConfig(
      storeSystems.configurations,
      'PLAYER_CONTENT_REPOSITORY'
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
  padding: 10px 20px 120px 20px;
  min-height: 80vh;
  margin-bottom: 30px;
  background-color: white !important;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  @media (max-width: 768px) {
    padding: 8px 0px 120px 8px !important;
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
  .opacity-0 {
    opacity: 0;
  }
  .loading {
    position: absolute;
    inset: 0;
    top: 250px;
    display: flex;
    justify-content: center;
  }
}

.player {
  &__list {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0px;
  }
  &__item {
    width: 50%;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  &__card-name {
    div {
      &:first-child {
        font-size: 12px;
        text-transform: uppercase;
      }
      &:last-child {
        font-size: 13px;
        font-weight: bold;
        text-transform: uppercase;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 130px;
      }
    }
  }
  &__info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-left: 5px;
    border-color: #dcdddf;
    border-left-width: 1px;
    border-left-style: dotted;
    @media (max-width: 430px) {
      margin-left: 0px;
    }
    &-item {
      font-size: 10px;
      display: flex;
      &-left {
        min-width: 60px;
        color: #6d6e6f;
      }
      &-right {
        font-weight: bold;
      }
    }
  }

  &__card-right {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    align-items: flex-start;
    justify-content: space-between;
    width: 125px;
    @media (max-width: 430px) {
      width: 125px;
    }
    button {
      border: none;
      color: white;
      background: $primary;
      padding: 5px 20px;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.3s;
      box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px,
        rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px,
        rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
      &:hover {
        filter: brightness(110%);
      }
    }
  }
  &__card {
    position: relative;
    width: 190px;
    height: 115px;
    border-radius: 8px;
    @media (max-width: 768px) {
      width: 130px;
    }
    &-img {
      position: absolute;
      inset: 0;
      overflow: hidden;
      img {
        position: absolute;
        height: 150%;
        opacity: 0.4;
        margin-left: 50px;
        left: 0;
        right: 0;
        margin: 0 auto;
        z-index: 2;
        top: -1px;
        object-fit: contain;
        @media (max-width: 768px) {
          height: 100%;
        }
      }
      &-country {
        img {
          height: 101%;
          object-fit: unset;
          width: 100%;
          border-radius: 8px;
        }
      }
    }
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: #f1f2f3;
      border-radius: 8px;
    }

    .PlayerHeader__Overlay_Detail {
      position: absolute;
      top: 0;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-box-shadow: 0px 0 10px 5px rgba(0, 0, 0, 0.3);
      box-shadow: 0px 0 10px 5px rgba(0, 0, 0, 0.3);
      height: 100%;
      opacity: 0.7;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 108px;
      z-index: 400;
    }
    .PlayerHeader__Overlay--opaque {
      opacity: 0.9;
    }
    .PlayerHeader__Overlay--right {
      right: -40px;
    }
    .PlayerHeader__Overlay {
      background-color: #fff;

      width: 76px;
    }
    .PlayerHeader__Image,
    .PlayerHeader__Overlay {
      position: absolute;
      top: 0;
      z-index: 400;
    }
    .player-avt {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      object-fit: contain;
      height: 80%;
      margin: 0 auto;
      z-index: 2;
    }
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
