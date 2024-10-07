<template>
  <div class="player">
    <div class="player__img">
      <div class="player__img-rounded">
        <div class="player__img-rounded-img">
          <BaseImage
            :src="getLiveScoreImage(info.logo_o, 'player') + '!h100'"
            :alt="info.logo_o"
            :imgDefault="`/img/playericon.png`"
          />
        </div>
      </div>
    </div>
    <div class="player__info-list">
      <div class="player__info-item">
        <div class="player__info-item-left">{{ translate('Player') }}:</div>
        <div class="player__info-item-right">{{ info.name }}</div>
      </div>
      <div class="player__info-item">
        <div class="player__info-item-left">
          {{ translate('Nationality') }}:
        </div>
        <div class="player__info-item-right d-flex gap-2">
          {{ info?.country?.name ?? '-' }}
          <div style="height: 20px; width: auto">
            <BaseImage
              v-if="info.country.logo_o"
              :src="getLiveScoreImage(info.country.logo_o, 'country') + '!h20'"
              :alt="info.country.logo_o"
            />
          </div>
        </div>
      </div>
      <div class="player__info-item">
        <div class="player__info-item-left">{{ translate('Weight') }}:</div>
        <div class="player__info-item-right">
          {{ info.weight ? info.weight + ' Kg' : '-' }}
        </div>
      </div>
      <div class="player__info-item">
        <div class="player__info-item-left">{{ translate('Height') }}:</div>
        <div class="player__info-item-right">
          {{ info.height ? info.height + ' cm' : '-' }}
        </div>
      </div>
      <div class="player__info-item">
        <div class="player__info-item-left">{{ translate('Age') }}:</div>
        <div class="player__info-item-right">
          {{ info.age ? info.age : '-' }}
          <span>&#160;{{ info.age ? `(${info.birthday})` : '' }}</span>
        </div>
      </div>
      <div class="player__info-item">
        <div class="player__info-item-left">{{ translate('Position') }}:</div>
        <div class="player__info-item-right">
          {{ translate(getPlayerPosition(info.position), 'playertech') }}
        </div>
      </div>
      <div class="player__info-item">
        <div class="player__info-item-left player__info-item-left--border">
          {{ translate('Value') }}:
        </div>
        <div class="player__info-item-right player__info-item-right--border">
          {{
            info.market_value
              ? info.market_value_currency + ' ' +Number(info.market_value).toLocaleString()
              : '-'
          }}
        </div>
      </div>
      <div class="player__info-item player__info-item--last">
        <div class="player__info-item-left player__info-item-left--last">
          {{ translate('Player Performance') }}:
        </div>
        <div class="player__info-item-right player__info-item-right--last">
          <button class="btn-show-modal" @click="handleShowModal">
            {{ translate('Click here') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { info } = defineProps({
  info: Array,
});
const { $t } = useShareCommon();
const translate = (key, prefix = null) => {
  const fullKey = `${key} ${prefix ? 'playertech' : 'team'}`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const emit = defineEmits(['showModal']);

const handleShowModal = () => {
  emit('showModal');
};
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
      &-img {
        width: 110px;
        height: 100px;
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
    &:hover {
      color: $tabsactive;
      text-decoration: underline;
    }
  }
}
</style>
