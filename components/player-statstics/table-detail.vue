<template>
    <div class="icons">
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/1.png" :alt="translate('Goals')" />{{ translate('Goals') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/7.png" :alt="translate('Scored Penalty')" />{{ translate('Scored Penalty') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/8.png" :alt="translate('Own Goal')" />{{ translate('Own Goal') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/12.png" :alt="translate('Assist')" />{{ translate('Assist') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/3.png" :alt="translate('Yellow Card')" />{{ translate('Yellow Card') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/2.png" :alt="translate('Red Card')" />{{ translate('Red Card') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/9.png" :alt="translate('Second Yellow Card')" />{{ translate('Second Yellow Card') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/55.png" :alt="translate('Mark')" />{{ translate('Mark') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/11.png" :alt="translate('Substitution')" />{{ translate('Substitution') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/4.png" :alt="translate('Substitute Player')" />{{ translate('Substitute Player') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/5.png" :alt="translate('Substituted Player')" />{{ translate('Substituted Player') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/13.png" :alt="translate('Missed Penalty')" />{{ translate('Missed Penalty') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/14.png" :alt="translate('Video Referee')" />{{ translate('Video Referee') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/30.png" :alt="translate('Penalty Save')" />{{ translate('Penalty Save') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/31.png" :alt="translate('Hit Post')" />{{ translate('Hit Post') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/32.png" :alt="translate('Player of the Match')" />{{ translate('Player of the Match') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/36.png" :alt="translate('Penalty for Foul')" />{{ translate('Penalty for Foul') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/33.png" :alt="translate('Lost Goal due to Error')" />{{ translate('Lost Goal due to Error') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/35.png" :alt="translate('Clearance')" />{{ translate('Clearance') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/34.png" :alt="translate('Last Defender')" />{{ translate('Last Defender') }}
    </div>
    <div class="icon">
      <nuxt-img src="/icon/player-statistics/37.png" :alt="translate('Last Dribble')" />{{ translate('Last Dribble') }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { $t } = useShareCommon()
const translate = (key: string) => {
  const fullKey = `${key} playertech`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
</script>

<style scoped lang="scss">
.icons {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  .icon {
    width: 20%;
    margin-top: 5px;
    display: flex;
    gap: 5px;
    align-items: center;
    @media (max-width: 768px) {
      width: 50%;
    }
    img {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
