<template>
  <div class="table">
    <div class="table__title">{{ translate('Transfer Statistics') }}</div>
    <div class="table__content">
      <table>
        <tr>
          <th>{{ translate('Transfer Time') }}</th>
          <th>{{ translate('From') }}</th>
          <th>{{ translate('To') }}</th>
          <th>{{ translate('Transfer Fee') }}</th>
          <th>{{ translate('Transfer Type') }}</th>
        </tr>
        <tr
          v-if="info"
          v-for="(item, index) in info"
          :key="index"
          :class="{
            'bg-gray': index % 2 !== 0,
          }"
        >
          <td>{{ formatTimestamp(item.transfer_time) }}</td>
          <td>
            <nuxt-link
              v-if="
                item.from_team_id &&
                item.from_team_name !== TABLE_TEAM.FREE_PLAYER
              "
              :to="
                item.from_team_id
                  ? `/${ROUTER_TEAM_NAME.TEAM}/${item.from_team_id}`
                  : '#'
              "
              >{{ item.from_team_name ?? '-' }}
            </nuxt-link>
            <span v-else>{{
              item.from_team_name
                ? item.from_team_name
                : item.from_team_name === TABLE_TEAM.FREE_PLAYER
                ? item.from_team_name
                : '-'
            }}</span>
          </td>

          <td>
            <nuxt-link
              v-if="
                item.to_team_id && item.to_team_name !== TABLE_TEAM.FREE_PLAYER
              "
              :to="
                item.to_team_id
                  ? `/${ROUTER_TEAM_NAME.TEAM}/${item.to_team_id}`
                  : '#'
              "
              >{{ item.to_team_name }}
            </nuxt-link>
            <span v-else>{{
              item.to_team_name
                ? item.to_team_name
                : item.to_team_name === TABLE_TEAM.FREE_PLAYER
                ? item.to_team_name
                : '-'
            }}</span>
          </td>
          <td>{{ item.transfer_desc ? item.transfer_desc : '-' }}</td>
          <td>{{ translate(getTransferType(item.transfer_type)) }}</td>
        </tr>
      </table>
      <div
        v-if="!info"
        class="d-flex flex-column align-items-center w-100"
        style="border: 1px solid #dee2e6; border-top: none"
      >
        <BaseImage
          class="nodata_pic p-0"
          alt="nodata pic"
          width="200"
          height="200"
          src="/icon/nodata.svg"
        />
        <p class="fw-bold text-center mt-3">
          {{ translate('No Data Available') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { info } = defineProps({
  info: Array,
});
const { $t } = useShareCommon();
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
</script>

<style lang="scss" scoped>
.table {
  &__title {
    height: 30px;
    font-weight: bold;
    font-size: 14px;
    color: white;
    background: $primary;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  td,
  th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
  }
  tr th {
    background-color: #e6e6e6;
    color: #666;
    padding: 2px;
  }
  td a {
    margin-right: 5px;
    color: $primary;
    cursor: pointer;
    &:hover {
      color: $tabsactive;
      text-decoration: underline;
    }
  }

  tr {
    &:hover {
      background-color: #57555527;
    }
  }

  .bg-gray {
    background-color: #e5e5e575;
  }
}
</style>
