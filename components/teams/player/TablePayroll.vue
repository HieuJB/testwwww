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
      <tr v-if="info?.team?.id">
        <td>1</td>
        <td>
          <div class="d-flex" style="justify-content: center;">
            <nuxt-link
              :to="`/${ROUTER_TEAM_NAME.TEAM}/${info.team.id}`"
              >{{ info.team.name }}
            </nuxt-link>
            <div >
              <BaseImage style="width: 20px; height: 20px; object-fit: contain"
                :src="getLiveScoreImage(info.team.logo_o, 'team') + '!h50'" 
                :alt="info.team.name"
              />
            </div>
          </div>
        </td>
        <td>{{ translate(getPlayerPosition(info.position),'playertech') }}</td>
      </tr>
    </table>
    <div v-if="!info?.team?.id" style="border: 1px solid #dee2e6; border-top: none">
      <div class="d-flex flex-column align-items-center">
        <BaseImage
          class="nodata_pic"
          alt="nodata pic"
          width="200"
          height="200"
          src="/icon/nodata.svg"
        />
      </div>
      <p class="fw-bold text-center p-0">{{ translate('No Data Available') }}</p>
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
