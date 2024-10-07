<template>
  <div class="select-season ">
    <select v-model="seasonActive" class="form-select">
      <option
        :value="item.season_years"
        v-for="(item, index) in seasonList"
        :key="index"
        :class="{
          'active-option' : item.season_years === seasonActive
        }"
      >
        {{ item.season_years }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  seasonList: Array,
});
const seasonActive = defineModel('seasonActive');
</script>

<style lang="scss" scoped>
.select-season {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  select {
    width: unset;
    min-width: 96px;
  }
}
.form-select:focus {
  border-color: $primary;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(33, 253, 13, 0.158);
}
</style>
