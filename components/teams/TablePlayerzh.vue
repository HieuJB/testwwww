<template>
  <div class="team-table">
    <div class="team-table__header">
      {{ title }}
    </div>
    <div style="overflow-x: auto" class="team-table__content">
  <table
    :class="{
      skeleton: isLoading,
    }"
  >
    <tr>
      <th>{{ translate('Time') }}</th>
      <th>{{ translate('Player') }}</th>
      <th>{{ translate('Position') }}</th>
      <th>{{ isJoinTable ? translate('From') : translate('To') }}</th>
      <th>{{ translate('Transfer Fee') }}</th>
      <th>{{ translate('Transfer Type') }}</th>
    </tr>
    <tr
      :class="[
        'team-table__init',
        {
          'team-table__init--bg': index % 2 !== 0,
        },
      ]"
      v-if="info.length"
      v-for="(item, index) in info"
      :key="index"
    >
      <td>{{ formatTimestamp(item.transfer_time) }}</td>
      <td class="team-table__item-name">
        <nuxt-link
          :to="
            item.player_info.id ? `/${ROUTER_TEAM_NAME.PLAYER}/${item.player_info.id}` : '#'
          "
          >{{ item.player_info.name}}</nuxt-link
        >
      </td>
      <td>{{ translate(getPlayerPosition(item.position), 'playertech') }}</td>
      <td class="team-table__item-join">
        <nuxt-link
          v-if="isJoinTable"
          :to="
            item.from_team_id ? `/${ROUTER_TEAM_NAME.TEAM}/${item.from_team_id}?tab=${ROUTER_TEAM_NAME.SUMMARY}` : '#'
          "
          >{{ item.from_team_name }}</nuxt-link
        >
        <nuxt-link
          v-else
          :to="item.to_team_id ? `/${ROUTER_TEAM_NAME.TEAM}/${item.to_team_id}?tab=${ROUTER_TEAM_NAME.SUMMARY}` : '#'"
          >{{ item.to_team_name }}</nuxt-link
        >
      </td>
      <td>
        {{
          item.transfer_desc &&
          item.transfer_desc !== 'Free' &&
          item.transfer_desc !== 'Unknown'
            ? item.transfer_desc
            : item.transfer_desc === 'Free'
            ? translate('Free')
            : '-'
        }}
      </td>
      <td>{{ translate(getTransferType(item.transfer_type)) }}</td>
    </tr>
    <!-- Skeleton table -->
    <tr v-if="!info.length && isLoading" v-for="item in [1, 2, 3, 4, 5]">
      <td>{{ item }}</td>
      <td>{{ item }}</td>
      <td>{{ item }}</td>
      <td>{{ item }}</td>
      <td>{{ item }}</td>
      <td>{{ item }}</td>
    </tr>
    <!-- end -->
  </table>
  <div v-if="!info.length && !isLoading">
    <div class="d-flex flex-column align-items-center">
      <BaseImage
        class="nodata_pic"
        alt="nodata pic"
        width="200"
        height="200"
        src="/icon/nodata.svg"
      />
    </div>
    <p class="fw-bold text-center mt-3">{{ translate('No Data Available') }}</p>
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
const isLoading = defineModel('isLoading');
const props = defineProps({
  title: String,
  info: Array,
  isJoinTable: Boolean,
});
</script>

<style lang="scss" scoped>
.team-table {
  &__header {
    font-size: 14px;
    color: white;
    background: $menu;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    font-weight: bold;
  }
  &__init {
    transition: all 0.2s;
    &:hover {
      background-color: rgba(219, 217, 217, 0.678) !important;
    }
    &--bg {
      background-color: rgb(247, 247, 247);
    }
  }
  &__item {
    &-name {
      color: $primary;
      a {
        color: $primary;
        cursor: pointer;
        &:hover {
          color: $tabsactive;
          text-decoration-line: underline;
        }
      }
    }
    &-join {
      a {
        color: $primary;
        cursor: pointer;
        &:hover {
          color: $tabsactive;
          text-decoration-line: underline;
        }
      }
    }
  }
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  min-width: 500px;
  border: 1px solid #ddd;
}
th {
  background: #e6e6e6;
}
th,
td {
  text-align: center;
  padding: 8px;
  border: 1px solid #ddd;
}

.skeleton th {
  height: 35px !important;
}
</style>
