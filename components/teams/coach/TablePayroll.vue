<template>
  <div class="table">
  <div class="table__title">{{ translate('Under Contract') }}</div>
  <div class="table__content">
    <table>
      <tr>
        <th>{{ translate('No.') }}</th>
        <th>{{ translate('Under Contract') }}</th>
        <th>{{ translate('Position') }}</th>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <nuxt-link
            :to="`/${ROUTER_TEAM_NAME.TEAM}/${info.team.id}`"
            >{{ info.team.name }}
          </nuxt-link>
          <BaseImage
            style="height: 25px;"
            :src="getLiveScoreImage(info.team.logo_o, 'team') + '!h50'"
            :alt="info.name"
          />
        </td>
        <td>{{ translate('Head Coach') }}</td>
      </tr>
    </table>
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
  info: Object,
});
</script>

<style lang="scss" scoped>
.table {
  &__title {
    height: 30px;
    font-weight: bold;
    font-size: 14px;
    color: white;
    background: $secondary;
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
