<template>
  <div class="table-team">
  <div class="table-team__name">
    <div class="logo-team">
      <BaseImage
        v-if="info.team_logo_o"
        :src="getLiveScoreImage(info?.team_national ? info?.team_country_logo_o : info?.team_logo_o, 'team') + '!h80'"
      />
    </div>
    <p>{{ info.team_name }}</p>
    <button @click="onFollow" class="btn-follow">
      {{ translate('Follow') }}
      <BaseImage src="/icon/star.svg"></BaseImage>
    </button>
  </div>
  <div class="table-team__detail">
    <div class="table-team__item">
      <div class="table-team__item-left">{{ info.venue_location ? translate('City') + ':' : translate('Country') + ':' }}</div>
      <div class="table-team__item-right">{{ info.venue_location ? info.venue_location : info.country_name ? info.country_name : '-' }}</div>
    </div>
    <div class="table-team__item">
      <div class="table-team__item-left">{{ translate('Training Ground') }}:</div>
      <div class="table-team__item-right">{{ info.venue_name ?? '-' }}</div>
    </div>
    <div class="table-team__item">
      <div class="table-team__item-left">{{ translate('Capacity') }}:</div>
      <div class="table-team__item-right">{{ !!info.venue_capacity ? info.venue_capacity : '-' }}</div>
    </div>
    <div class="table-team__item">
      <div class="table-team__item-left">{{ translate('Year Founded') }}:</div>
      <div class="table-team__item-right">{{ info.team_foundation_time ? info.team_foundation_time : '-' }}</div>
    </div>
    <div class="table-team__item">
      <div class="table-team__item-left">{{ translate('Coach') }}:</div>
      <div class="table-team__item-right">
        <div v-if="!info.coach_id">-</div>
        <nuxt-link v-else
            :class=" {'highlighted' : info.coach_name}"
            :to="info.coach_name ? `/${ROUTER_TEAM_NAME.COACH}/${info.coach_id}` : '#'"
            >{{ info.coach_name ?? '-' }}</nuxt-link>
      </div>
    </div>
    <div class="table-team__item">
      <div class="table-team__item-left">{{ translate('Website') }}:</div>
      <div class="table-team__item-right">
        <div v-if="!info.team_website">-</div>
        <a v-else :class="{ 'highlighted' : info.team_website }" rel="nofollow" target="_blank" :href="info.team_website">{{ info.team_website ? translate('Click here') : '-' }}</a>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
const snackbar = useSnackbar();


const { $t } = useShareCommon()
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};

const onFollow = () => {
  snackbar.add({
      type: 'success',
      text: translate('Feature is being updated team')
    })
}
const {teamInfo} = defineProps({
  teamInfo: Object,
});

const info = computed(()=> {
  return teamInfo
})
</script>

<style lang="scss" scoped>
.table-team {
  display: flex;
  flex-wrap: wrap;
  .btn-follow {
    padding: 5px 10px;
    border: 1px solid gray;
    border-radius: 20px;
    transition: 0.3s all;
    img {
      width: 15px;
      padding-bottom: 3px;
    }
    &:hover {
      filter: brightness(1.05);
    }
  }

  &__name {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    padding: 10px;
    .logo-team {
      width: 70px;
      height: 70px;
      -o-object-fit: contain;
      /* object-fit: contain; */
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        height: 100%;
        width: auto;
      }
    }
    p {
      font-weight: bold;
      margin-top: 10px;
      font-size: 14px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  &__detail {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid rgb(229, 229, 229);
    border-left: 1px solid rgb(229, 229, 229);
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  &__item {
    width: 50%;
    display: flex;
    align-items: center;
    height: 55px;
    
    &-left {
      width: 40%;
      height: 100%;
      border-bottom: 1px solid rgb(229, 229, 229);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      border-right: 1px solid rgb(229, 229, 229);
      background: rgba(57, 127, 25, 0.05);
      text-align: center;
      @media (max-width: 768px) {
        text-align: center;
        padding-right: 0;
        font-size: 11px;
        justify-content: center;
      }
    }
    &-right {
      width: 60%;
      padding-left: 20px;
      height: 100%;
      height: 100%;
      border-right: 1px solid rgb(229, 229, 229);
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgb(229, 229, 229);
      @media (max-width: 768px) {
        text-align: center;
        padding-left: 0;
        font-size: 11px;
        justify-content: center;
      }
      a {
        color: black;
        text-decoration: none;
      }
    }
    .highlighted {
      color: $primary !important;
      cursor: pointer;
      &:hover {
        color: coral !important;
        text-decoration-line: underline;
      }
    }
  }
}
</style>
