<template>
  <div class="player">
    <div class="player__info">
      <TeamsCoachPersonal
        v-if="info?.personalInfo?.[0]"
        :info="info?.personalInfo?.[0]"
        :coachLogo="info?.lineUpTeam?.team_info?.coach_logo_o"
      />
      <TeamsCoachTablePayroll
        v-if="info?.personalInfo?.[0]"
        :info="info?.personalInfo?.[0]"
      />

      <TeamsTableHonor
        :info="info.honor"
        :title="translate('Award')"
      />
    </div>
  </div>

</template>

<script setup>
const { info } = defineProps({
  info: Object,
});
const { $t } = useShareCommon();
const { initSchemaCoach } = useSchema()
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};

initSchemaCoach(info)
</script>

<style lang="scss" scoped>
.player {
  display: flex;
  position: relative;
  gap: 10px;
  &__team {
    width: 150px;
    flex-shrink: 0;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &__info {
    width: 100%;
  }
}
.modal-close-btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  img {
    width: 20px;
  }
}
:deep() {
  .team {
    &__title {
      background: $primary;
      height: 30px;
      color: white;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
    }
    .team__table {
      tr th {
        background-color: #e6e6e6;
        color: #666;
        padding: 2px;
      }
    }
  }
}
</style>
