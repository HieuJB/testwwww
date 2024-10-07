<template>
  <div @click="initComponentHotLeagues" class="icon-list_match-setting d-block d-sm-block d-md-none">
    <div class="list_match">
      <a class="btn-icon" data-bs-toggle="offcanvas" href="#offcanvasLeft" role="button" aria-controls="offcanvasLeft" aria-label="Tournament list">
        <i class="icon iconfont icon-font-menu"></i>
      </a>
    </div>
  </div>
  
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
      <div class="offcanvas-header d-none">
        <div class="offcanvas-title" id="offcanvasLeftLabel">Hot Leagues</div>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" id="close-league"></button>
      </div>
      <div class="offcanvas-body">
        <component :is="hotLeagues" @on-click="onClickLeague"/>
      </div>
  </div>
</template>

<script setup>
const hotLeagues = ref(null)

const initComponentHotLeagues = () => {
  hotLeagues.value = resolveComponent('HotLeaguesComponent')
}

const onClickLeague = () => {
  nextTick(() => {
    document.documentElement.querySelector("#close-league").click();
  })
}

</script>

<style lang="scss" scoped>

</style>