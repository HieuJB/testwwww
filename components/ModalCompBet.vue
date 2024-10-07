<template>
    <div v-if="isInitModal" class="modal fade" id="modal_comp_bet" tabindex="-1" aria-labelledby="modal_comp_bet_label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered container">
      <div class="modal-content">
        <div class="modal-header d-none">
          <div class="modal-title" id="modal_comp_bet_label">Select Betting Company</div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div id="setting_popSel">
            <div class="popMask2"></div>
            <div class="fadeInBottom" id="setting_popSel">
              <ul class="selectpop" id="selCompany">
                <li 
                  v-for="(odd_company, index) in ODD_COMPANYS" 
                  :key="index"
                  :value="odd_company?.id"
                  :class="oddCompanySelected === odd_company?.id ? 'on' : ''"
                  class="odd_li"
                  @click="selectOddCompany(odd_company?.id)">
                    {{ odd_company?.name?.toUpperCase() }}
                </li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>