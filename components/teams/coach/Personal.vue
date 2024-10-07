<template>
  <div class="player">
  <div class="player__img">
    <div class="player__img-rounded">
        <BaseImage
          :imgDefault="`/img/playericon.png`"
          :src="
            getLiveScoreImage(
              coachLogo,
              'coach'
            ) + '!h100'
          "
          :alt="coachLogo"
        ></BaseImage>
    </div>
  </div>
  <div class="player__info-list">
    <div class="player__info-item">
      <div class="player__info-item-left">{{ translate('Coach') }}:</div>
      <div class="player__info-item-right">
        {{ info?.name }}
      </div>
    </div>
    <div class="player__info-item">
      <div class="player__info-item-left">{{ translate('Nationality') }}:</div>
      <div class="player__info-item-right d-flex gap-2">
        {{ info?.country.name ?? '-' }}
        <BaseImage
          v-if="info?.country?.logo_o"
          :src="
            getLiveScoreImage(
              info?.country?.logo_o,
              'country'
            ) + '!h20'
          "
          :alt="info?.country?.logo_o"
        />
      </div>
    </div>
    <div class="player__info-item">
      <div class="player__info-item-left">{{ translate('Age') }}:</div>
      <div class="player__info-item-right">
        {{ info?.age }} <span>&#160;({{ info?.birthday }})</span>
      </div>
    </div>
    <div class="player__info-item">
      <div class="player__info-item-left">{{ translate('Club') }}:</div>
      <div class="player__info-item-right d-flex gap-2">
        {{ info?.team?.name }}
        <BaseImage
          style="height: 25px;"
          :src="
            getLiveScoreImage(
              info?.team?.logo_o ?? info?.team?.country_logo_o,
              'team'
            ) + '!h50'
          "
          :alt="info?.team?.logo_o ?? info?.team?.country_logo_o"
        />
      </div>
    </div>
    <div class="player__info-item">
      <div class="player__info-item-left">{{ translate('Position') }}:</div>
      <div class="player__info-item-right">
        {{ translate('Head Coach') }}
      </div>
    </div>
    <div class="player__info-item">
      <div class="player__info-item-left player__info-item-left--border">
        {{ translate('Favorite Formation') }}:
      </div>
      <div class="player__info-item-right player__info-item-right--border">
        {{ info?.preferred_formation ? info?.preferred_formation : '-' }}
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
const { $t } = useShareCommon();
const translate = (key, prefix = null) => {
  const fullKey = `${key} ${prefix ? 'playertech' : 'team'}`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const { info } = defineProps({
  info: Array,
  coachLogo: String
});
</script>

<style lang="scss" scoped>
.player {
  width: 100%;
  border: 1px solid #d9d9d9;
  background: #e5e5e575;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  &__img {
    min-width: 200px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    &-rounded {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 150px;
      background-color: #d4d4d4;
      border-radius: 50%;
      img {
        width: auto;
        height: 100px;
        object-fit: contain;
      }
    }
  }
  &__info {
    &-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      border-left: 1px solid #d9d9d9;
      @media (max-width: 768px) {
        border-left: none;
        border-top: 1px solid #d9d9d9;
      }
    }
    &-item {
      display: flex;
      height: 33px;
      &--last {
        @media (min-width: 768px) {
          display: none;
        }
      }
      &-left {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 10px;
        width: 30%;
        border-right: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        @media (max-width: 768px) {
          width: 40%;
        }
        &--border {
          @media (min-width: 768px) {
            border-bottom: none;
          }
        }
        &--last {
          border-bottom: none;
          @media (min-width: 768px) {
            display: none;
          }
        }
      }
      &-right {
        display: flex;
        align-items: center;
        padding-left: 10px;
        width: 80%;
        border-bottom: 1px solid #d9d9d9;
        font-weight: bold;
        span {
          font-weight: 400;
        }
        &--border {
          @media (min-width: 768px) {
            border: none;
          }
        }
        &--last {
          border-bottom: none;
        }
      }

      &:nth-child(2n + 1) {
        background-color: white;
      }
    }
  }
  .btn-show-modal {
    border: none;
    font-weight: bold;
    color: $primary;
    background: none;
    &:hover {
      color: $tabsactive;
      text-decoration: underline;
    }
  }
}
</style>
