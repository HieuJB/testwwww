<template>
  <div class="team">
    <div class="team__title d-flex justify-content-center">
      {{ title ? title : translate('Award') }}
    </div>
    <table
      class="team__table"
      :class="{
        skeleton: isLoading,
      }"
    >
      <tr>
        <th>{{ translate('League') }}</th>
        <th>{{ translate('Number of Championships') }}</th>
        <th>{{ translate('First Championship Season/Year') }}</th>
      </tr>
      <tr v-for="(item, index) in Object.keys(info)" :key="index">
        <td>{{ info[item][0].honor.name }}</td>
        <td>
          {{ info[item].length }}
        </td>
        <td class="season">
          <div class="season__list">
            <div v-for="(honor, index) in info[item]" :key="index">
              {{ formatSeason(honor.season) }}
            </div>
          </div>
        </td>
      </tr>

      <tr
        v-if="isLoading && !Object.keys(info).length"
        v-for="item in Array.from({ length: 3 }, (_, i) => i + 1)"
      >
        <td></td>
        <td style="padding: 18px"></td>
        <td>{{ info?.lineUpTeam?.team_info?.team_name }}</td>
      </tr>
    </table>
    <div
      v-if="!Object.keys(info).length && !isLoading"
      style="border: 1px solid #dee2e6; border-top: none"
    >
      <div class="d-flex flex-column align-items-center">
        <BaseImage
          class="nodata_pic"
          alt="nodata pic"
          width="200"
          height="200"
          src="/icon/nodata.svg"
        />
      </div>
      <p class="fw-bold text-center p-0">
        {{ translate('No Data Available') }}
      </p>
    </div>
  </div>
</template>

<script setup>
const { $t } = useShareCommon();
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
defineProps({
  info: Array,
  title: String,
});
const isLoading = defineModel('isLoading');

const formatSeason = (item) => {
  return item.slice(2, 4) + (item.length > 7 ? `/${item.slice(7)}` : '');
};
</script>

<style lang="scss" scoped>
.team {
  min-height: unset !important;
  &__table {
    width: 100%;
    min-width: unset;
    th,
    td {
      text-align: center;
      padding: 8px;
      border: 1px solid #ddd;
    }
    tr td:first-child {
      background-color: var(--table-honor, #f3fdea);
      text-transform: uppercase;
    }
  }
  .season {
    padding: 0;
    &__list {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 5px;
      gap: 5px;
      div {
        padding: 5px;
        border: 1px solid #e5e5e5;
        background: var(--table-honor, #f3fdea);
      }
    }
  }
}
</style>
