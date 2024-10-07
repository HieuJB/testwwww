<template>
  <div class="container bg-white team">
    <TeamsPlayer v-if="info && info.player" :info="info" />
    <div v-else>
      <div class="d-flex flex-column align-items-center">
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
    <div id="content-page" class="mt-5">
      <h1 class="page_title" v-if="h1Content">{{ h1Content }}</h1>
      <div class="text-center">{{ content }}</div>
    </div>
  </div>
</template>

<script setup>
const {
  info,
  fetchLineUpTeam,
  fetchPlayerInfo,
  fetchObjectMeta,
  h1Content,
  content,
} = useShareTeams();
const route = useRoute();
const { $t, isNavVisible } = useShareCommon();
isNavVisible.value = false
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const { data } = await useAsyncData('player', async () => {
  try {
    const player = await fetchPlayerInfo(route.params.id);

    if (Array.isArray(player) && !!player.length) {
      const [lineUpTeam] = await Promise.all([
        fetchLineUpTeam(player?.[0]?.team.id ?? ''),
      ]);
      return {
        player,
        lineUpTeam,
      };
    } else {
      // showError({
      //   statusCode: 404,
      //   statusMessage: 'Cầu thủ không tồn tại!',
      // });
    }
  } catch (error) {
    console.error('Error fetching all data:', error);
    throw error;
  }
});
info.value = data.value;

if (!info.value) {
  showError({
    statusCode: 404,
    statusMessage: translate('Player does not exist!'),
  });
}

fetchObjectMeta(info.value?.player?.[0]?.name, route.fullPath);
</script>

<style lang="scss" scoped>
.team {
  border-radius: 6px;
  padding: 10px;
  min-height: 70vh;
  @media (max-width: 768px) {
    padding: 8px;
  }
}
</style>
