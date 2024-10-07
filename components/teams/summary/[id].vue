<template>
  <TeamsLayouts>
    <div class="team__title">
      <Transition>
        <select
          v-if="listCompetition?.length && !isLoading"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="selectedCompetition"
        >
          <option
            :value="item.competition_id"
            v-for="(item, index) in listCompetition"
            :key="index"
          >
            {{ item.competition_name }}
          </option>
        </select>
    </Transition>
    <span id="scroll">{{ translate('Team Data') }}</span>
  </div>
    <TeamsTableSumary
      :info="info"
      v-model:isLoading="isLoading"
      v-model:scheduleSeleted="scheduleSeleted"
      v-model:listDetailData="listDetailData"
    />

    <TeamsPaginationSumary
      @scroll="scrollToItem"
      v-model:pageActive="pageActive"
      v-model:scheduleSeleted="scheduleSeleted"
    />

    <TeamsTableHonor v-model:isLoading="isLoading" :info="honorList" />
  </TeamsLayouts>
</template>

<script setup>
defineProps({
  info: Object
})
const route = useRoute();
const objectIdSlug = ref(route?.params?.id || '');
const { $t, useLocale } = useShareCommon()
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const listCompetition = ref([]);
const selectedCompetition = ref('');
const limit = ref(20);
const schedules = ref([]);
const pageActive = ref(1);

const listDetailData = ref([]);
const isLoading = ref(true);
const honorList = ref([]);

const scheduleSeleted = computed(() => {
  let initData = schedules.value;
  if (selectedCompetition.value) {
    initData = schedules.value.filter(
      (item) => item.competition_id === selectedCompetition.value
    );
  }

  const pages = Array.from(
    { length: Math.ceil(initData.length / limit.value) },
    (_, i) => i + 1
  );

  initData = initData.slice(
    (pageActive.value - 1) * limit.value,
    pageActive.value * limit.value
  );

  return {
    pages,
    initData,
  };
});

const getListCompetition = (competitions) => {
  listCompetition.value = competitions.reduce((acc, value) => {
    if (!acc.some((item) => item.competition_id === value.competition_id)) {
      acc.push({
        competition_id: value.competition_id,
        competition_name: value.competition_name,
      });
    }
    return acc;
    }, []);
  listCompetition.value.unshift({
    competition_id: '',
    competition_name: translate('All'),
  });
};

const scrollToItem = () => {
  
  document.getElementById('scroll').scrollIntoView()
}

const fetchOldSchedule = async () => {
  try {
    await useApiLiveScore(
      API_ROUTERS.LIVESCORE.OLD_SCHEDULE + '?team-id=' + objectIdSlug.value + `&lang=${useLocale.value.defaultLocale}`
    ).then((resData) => {
      if (resData) {
        getListCompetition(resData);
        schedules.value = resData;
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const fetchMatchsLiveDetail = async (item) => {
  try {
    const data = await useApiLiveScore(
      API_ROUTERS.LIVESCORE.MATCHS_LIVE_DETAIL + '/' + item
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

const fetchMatchDetil = async () => {
  try {
    isLoading.value = true;
    const data = scheduleSeleted.value.initData.map((item) =>
      fetchMatchsLiveDetail(item.id)
    );
    listDetailData.value = await Promise.allSettled(data);
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};

const fetchHonorTeam = async () => {
  try {
    const data = await useApiLiveScore(
      API_ROUTERS.LIVESCORE.TEAM_HONOR + `?team-id=${objectIdSlug.value}`
    );

    if (data?.length) {
      honorList.value = data?.[0]?.honors?.reduce((acc, value) => {
        if (!Object.keys(acc).includes(value.honor.id)) {
          acc[value.honor.id] = data[0].honors.filter(
            (item) => item.honor.id === value.honor.id
          );
        }
        return acc;
      }, {});
    }
  } catch (e) {
    console.log(e);
  }
};

watch(
  () => scheduleSeleted.value.initData,
  async () => {
    if (scheduleSeleted.value.initData.length === 0) {
      pageActive.value = 1;
    }
  },
  { immediate: true }
);

Promise.all([
  fetchOldSchedule(),
  fetchHonorTeam(),
]).finally(()=> {
  isLoading.value = false
});
</script>

<style lang="scss" scoped>
:deep() {
  .team {
    &__title {
      position: relative;
      height: 30px;
      background: $menu;
      display: flex;
      align-items: center;
      color: white;
      font-weight: bold;
      font-size: 14px;
      padding: 0 10px;
      span {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        @media (max-width: 1024px) {
          justify-content: flex-end;
          padding-right: 10px;
        }
        @media (max-width: 400px) {
          font-size: 11px;
        }
      }
      select {
        position: relative;
        width: unset;
        z-index: 2;
        max-width: 220px;
      }
    }
    &__pagination {
      color: #666666;
      display: flex;
      align-items: center;
      button {
        border: none;
        padding: 0 15px;
        margin: 0 2px;
        height: 26px;
        background: #e5e5e5;
        border-radius: 3px;
        &:hover {
          filter: brightness(0.96);
        }
      }
      .prev,
      .next {
        float: left;
        line-height: 26px;
        text-align: center;
        margin: 0 2px;
        padding: 0 15px;
        cursor: pointer;
        .icon {
          width: 6px;
          height: 6px;
          border-top: 2px solid #666;
          border-left: 2px solid #666;
          transform: rotate(-45deg);
          margin: 9px 2px;
          &--next {
            transform: rotate(135deg);
          }
        }
      }
      &-page {
        margin: 0 10px;
        display: flex;
        align-items: center;
        gap: 3px;
      }
    }
    &__table {
      position: relative;
      &--empty {
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    min-width: 900px;
    border: 1px solid #ddd;
  }
  th {
    background: #e6e6e6;
  }
  th,
  td {
    text-align: center;
    padding: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
  }

  tr:nth-child(2n + 1) {
    background-color: rgb(247, 247, 247);
  }
}
.team {
  min-height: 70vh;
  border-radius: 6px;
  padding: 10px;
}
.form-select:focus {
  border-color: $primary;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(33, 253, 13, 0.158);
}
</style>
