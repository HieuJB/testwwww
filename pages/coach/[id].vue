<template>
  <div class="container bg-white team">
    <TeamsCoach :info="info" v-if="info?.personalInfo" />
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
const route = useRoute();
const {
  info,
  fetchCoachInfo,
  fetchCoachHonor,
  fetchLineUpTeam,
  fetchObjectMeta,
  h1Content,
  content,
} = useShareTeams();
const { $t, isNavVisible } = useShareCommon();
isNavVisible.value = false
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const fetchCoach = async () => {
  try {
    const [personalInfo, honor] = await Promise.all([
      fetchCoachInfo(route.params.id),
      fetchCoachHonor(route.params.id),
    ]);
    if (Array.isArray(personalInfo) && !!personalInfo.length) {
      
      return {
        personalInfo,
        honor,
      };
    } else {
      // showError({
      //   statusCode: 404,
      //   statusMessage: 'Huấn luyện viên không tồn tại!',
      // });
    }
  } catch (error) {
    console.error('Error fetching all data:', error);
    throw error;
  }
};
const data = await fetchCoach();

if(data?.personalInfo?.[0]?.team?.id) {
  const lineUpTeam = await fetchLineUpTeam(data.personalInfo[0].team.id)
  if(lineUpTeam) {
    data[`lineUpTeam`] = lineUpTeam
  }
}

info.value = data;

if (!info.value) {
  showError({
    statusCode: 404,
    statusMessage: translate('Coach does not exist!'),
  });
}

fetchObjectMeta(info.value?.personalInfo?.[0].name, route.fullPath);
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
