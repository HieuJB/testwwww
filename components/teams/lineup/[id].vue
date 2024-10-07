<template>
  <TeamsLayouts>
    <div class="team__title">{{ translate('Lineup') }}</div>
    <div>
      <div style="overflow-x: auto">
        <table>
          <tr>
            <th>{{ translate('Number') }}</th>
            <th>{{ translate('Name') }}</th>
            <th style="width: 100px">{{ translate('Date of Birth') }}</th>
            <th>{{ translate('Height') }}</th>
            <th>{{ translate('Weight') }}</th>
            <th>{{ translate('Position') }}</th>
            <th>{{ translate('Nationality') }}</th>
            <th>{{ translate('Value') }}</th>
            <th>{{ translate('Contract Expiry') }}</th>
          </tr>
          <tr
            v-if="info?.lineUpTeam?.players"
            class="content"
            v-for="(item, index) in info.lineUpTeam.players"
            :key="index"
          >
            <td>{{ item.shirt_number ? item.shirt_number : '-' }}</td>
            <td class="text-capitalize">
              <nuxt-link
                class="player-name"
                :to="`/${ROUTER_TEAM_NAME.PLAYER}/${item.id}`"
                >{{ item.name }}</nuxt-link
              >
            </td>
            <td>{{ formatBirthday(item.birthday.slice(0, 10)) }}</td>
            <td>{{ item.height }}</td>
            <td>{{ item.weight }}</td>
            <td>{{ translate(getPlayerPosition(item.position), 'playertech') }}</td>
            <td>{{ item.country_name ?? '-' }}</td>
            <td>
              {{ item.market_value_currency }}
              {{ item.market_value ? Number(item.market_value).toLocaleString() : '-' }}
            </td>
            <td>
              {{
                item.contract_until ? formatTimestamp(item.contract_until) : '-'
              }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="!info?.lineUpTeam?.players?.length">
      <div class="d-flex flex-column align-items-center">
        <BaseImage
          class="nodata_pic"
          alt="nodata pic"
          width="200"
          height="200"
          src="/icon/nodata.svg"
        />
      </div>
      <p class="fw-bold text-center mt-3">
        {{ translate('Data is being updated') }}
      </p>
    </div>
  </TeamsLayouts>
</template>

<script setup lang="ts">
const { $t } = useShareCommon();
const translate = (key, prefix = null) => {
  const fullKey = `${key} ${prefix ? 'playertech' : 'team'}`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
defineProps({
  info: Array,
});

const formatBirthday = (item) => {
  if (item) {
    const [year, month, day] = item.split('-');
    return `${day}-${month}-${year}`;
  }
  return '-';
};
</script>

<style lang="scss" scoped>
.team {
  &__title {
    height: 30px;
    background: $menu;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
  }
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  min-width: 700px;
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
  a {
    &:hover {
      color: $tabsactive;
      text-decoration: underline;
    }
  }
}

tr:nth-child(2n + 1) {
  background-color: rgb(247, 247, 247);
}
.content {
  transition: all 0.2s;
  &:hover {
    background-color: rgba(219, 217, 217, 0.678) !important;
  }
}
</style>
