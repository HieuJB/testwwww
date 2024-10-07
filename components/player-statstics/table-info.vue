<template>
  <div class="info">
    <div
      :class="[
        'info__header',
        {
          'info__header--bottom': posizione,
        },
      ]"
    >
      <div class="info__team-name">{{ info.team_name }}</div>
      <div class="info__team-function">
        <button
          @click="buttonActive = item"
          :class="[
            'info__team-btn',
            { 'info__team-btn--active': buttonActive === item },
          ]"
          v-for="(item, index) in buttonList"
          :key="index"
        >
          {{ translate(item) }}
        </button>
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>{{ translate('Number') }}</th>
            <th>{{ translate('Player') }}</th>
            <th style="min-width: 65px">
              {{ translate('Position') }}
            </th>
            <th
              v-show="
                [BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(buttonActive)
              "
            >
              {{ translate('Shots') }}
            </th>
            <th
              v-show="
                [BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(buttonActive)
              "
            >
              {{ translate('Shots on Target') }}
            </th>
            <th v-show="[BTN_DETAIL.PASS_THE_BALL].includes(buttonActive)">
              {{ translate('Key Pass') }}
            </th>
            <th
              v-show="
                [BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(buttonActive)
              "
            >
              {{ translate('Goals') }}
            </th>
            <th
              v-show="
                [BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(buttonActive)
              "
            >
              {{ translate('Successful Dribble') }}
            </th>
            <th
              v-show="
                [BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(buttonActive)
              "
            >
              {{ translate('Assist') }}
            </th>
            <th
              v-show="
                [BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(buttonActive)
              "
            >
              {{ translate('Free Kick') }}
            </th>
            <th v-show="[BTN_DETAIL.DEFENSE].includes(buttonActive)">
              {{ translate('Fouled') }}
            </th>
            <th
              v-show="
                [BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(buttonActive)
              "
            >
              {{ translate('Quick Counter') }}
            </th>
            <th v-show="[BTN_DETAIL.ATTACK].includes(buttonActive)">
              {{ translate('Offside') }}
            </th>
            <th v-show="[BTN_DETAIL.DEFENSE].includes(buttonActive)">
              {{ translate('Tackle') }}
            </th>
            <th v-show="[BTN_DETAIL.DEFENSE].includes(buttonActive)">
              {{ translate('Interception') }}
            </th>
            <th v-show="[BTN_DETAIL.DEFENSE].includes(buttonActive)">
              {{ translate('Saves') }}
            </th>
            <th v-show="[BTN_DETAIL.DEFENSE].includes(buttonActive)">
              {{ translate('Effective Clearance') }}
            </th>
            <th v-show="[BTN_DETAIL.DEFENSE].includes(buttonActive)">
              {{ translate('Blocked Shot') }}
            </th>
            <th v-show="[BTN_DETAIL.DEFENSE].includes(buttonActive)">
              {{ translate('Foul') }}
            </th>
            <th v-show="[BTN_DETAIL.PASS_THE_BALL].includes(buttonActive)">
              {{ translate('Pass') }}
            </th>
            <th v-show="[BTN_DETAIL.PASS_THE_BALL].includes(buttonActive)">
              {{ translate('Successful Pass') }}
            </th>
            <th v-show="[BTN_DETAIL.PASS_THE_BALL].includes(buttonActive)">
              {{ translate('Cross') }}
            </th>
            <th v-show="[BTN_DETAIL.PASS_THE_BALL].includes(buttonActive)">
              {{ translate('Successful Cross') }}
            </th>
            <th v-show="[BTN_DETAIL.PASS_THE_BALL].includes(buttonActive)">
              {{ translate('Long Pass') }}
            </th>
            <th v-show="[BTN_DETAIL.PASS_THE_BALL].includes(buttonActive)">
              {{ translate('Accurate Long Pass') }}
            </th>
            <th>{{ translate('Rating') }}</th>
            <th>{{ translate('Main Event') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in info.stats" :key="player.player_id">
            <td>{{ player.shirt_number ?? '-' }}</td>
            <td>{{ player.player_name }}</td>
            <td>
              {{ translate(getPlayerPosition(player.position ?? player.player_position)) }}
            </td>
            <td
              v-show="
                [BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(buttonActive)
              "
            >
              {{ player.shots }}
            </td>
            <td
              v-show="
                [BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(buttonActive)
              "
            >
              {{ player.hit_woodwork }}
            </td>
            <td v-show="[BTN_DETAIL.PASS_THE_BALL].includes(buttonActive)">
              {{ player.key_passes }}
            </td>
            <td
              v-show="
                [BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(buttonActive)
              "
            >
              {{ player.goals }}
            </td>
            <td
              v-show="
                [BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(buttonActive)
              "
            >
              {{ player.dribble_succ }}
            </td>
            <td
              v-show="
                [BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(buttonActive)
              "
            >
              {{ player.assists }}
            </td>
            <td
              v-show="
                [BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(buttonActive)
              "
            >
              {{ player.freekicks }}
            </td>
            <td v-show="[BTN_DETAIL.DEFENSE].includes(buttonActive)">
              {{ player.was_fouled }}
            </td>
            <td
              v-show="
                [BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(buttonActive)
              "
            >
              {{ player.fastbreaks }}
            </td>
            <td v-show="[BTN_DETAIL.ATTACK].includes(buttonActive)">
              {{ player.offsides }}
            </td>
            <td v-show="[BTN_DETAIL.DEFENSE].includes(buttonActive)">
              {{ player.tackles }}
            </td>
            <td v-show="[BTN_DETAIL.DEFENSE].includes(buttonActive)">
              {{ player.interceptions }}
            </td>
            <td v-show="[BTN_DETAIL.DEFENSE].includes(buttonActive)">
              {{ player.saves }}
            </td>
            <td v-show="[BTN_DETAIL.DEFENSE].includes(buttonActive)">
              {{ player.clearances }}
            </td>
            <td v-show="[BTN_DETAIL.DEFENSE].includes(buttonActive)">
              {{ player.blocked_shots }}
            </td>
            <td v-show="[BTN_DETAIL.DEFENSE].includes(buttonActive)">
              {{ player.fouls }}
            </td>
            <td v-show="[BTN_DETAIL.PASS_THE_BALL].includes(buttonActive)">
              {{ player.passes }}
            </td>
            <td v-show="[BTN_DETAIL.PASS_THE_BALL].includes(buttonActive)">
              {{ player.passes_accuracy }}
            </td>
            <td v-show="[BTN_DETAIL.PASS_THE_BALL].includes(buttonActive)">
              {{ player.crosses }}
            </td>
            <td v-show="[BTN_DETAIL.PASS_THE_BALL].includes(buttonActive)">
              {{ player.crosses_accuracy }}
            </td>
            <td v-show="[BTN_DETAIL.PASS_THE_BALL].includes(buttonActive)">
              {{ player.long_balls }}
            </td>
            <td v-show="[BTN_DETAIL.PASS_THE_BALL].includes(buttonActive)">
              {{ player.long_balls_accuracy }}
            </td>
            <td>{{ player.rating }}</td>
            <td>
              <div class="d-flex justify-content-center">
                <img
                  v-if="player.goals"
                  src="/icon/player-statistics/1.png"
                  alt="Bàn thắng"
                />
                <img
                  v-if="player.yellow_cards"
                  src="/icon/player-statistics/3.png"
                  alt="Thẻ vàng"
                />
                <img
                  v-if="player.yellow2red_cards"
                  src="/icon/player-statistics/9.png"
                  alt="Thẻ vàng thứ hai"
                />
                <img
                  v-if="player.red_cards"
                  src="/icon/player-statistics/2.png"
                  alt="Thẻ đỏ"
                />
                <img
                  class="image-flash"
                  v-if="player.player_id === bestPlayer?.player_id"
                  src="/icon/player-statistics/32.png"
                  alt="Thẻ đỏ"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $t } = useShareCommon();
const props = defineProps({
  info: Array,
  posizione: String,
  bestPlayer: Object,
});

const BTN_DETAIL = {
  OVERVIEW: 'Overview',
  ATTACK: 'Attack',
  DEFENSE: 'Defense',
  PASS_THE_BALL: 'Passing',
};

const translate = (key: string) => {
  const fullKey = `${key} playertech`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};

const buttonActive = ref(BTN_DETAIL.OVERVIEW);

const buttonList = ref([
  BTN_DETAIL.OVERVIEW,
  BTN_DETAIL.ATTACK,
  BTN_DETAIL.DEFENSE,
  BTN_DETAIL.PASS_THE_BALL,
]);
</script>

<style lang="scss" scoped>
.info {
  &__header {
    padding: 0 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #de682f;
    &--bottom {
      background-color: #2495da;
    }
  }

  &__team {
    &-name {
      display: flex;
      align-items: center;
      color: #fff;
      font-weight: bold;
      padding: 5px 5px;
    }
    &-btn {
      border: none;
      padding: 5px;
      background: transparent;
      height: 100%;
      &:hover {
        text-decoration-line: underline;
      }
      &--active {
        font-weight: bold;
        opacity: 0.8;
        color: #ca6800;
        background: #fff;
      }
    }
    &-function {
      @media (max-width: 450px) {
        font-size: 11px;
      }
    }
  }
  .table-container {
    width: 100%;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    border-left: none;
    border-right: none;
  }

  th {
    background-color: #eaeaea;
    color: #888;
    font-weight: 400;
    border-left: 1px solid white;
    border-right: 1px solid white;
  }
  tr {
    background: #f9f9f9;
    transition: all 0.3s;
    &:hover {
      background: #ccc5c5a1;
    }
  }

  .image-flash {
    animation: flash 1s infinite alternate;
  }

  @keyframes flash {
    0% {
      filter: brightness(90%);
    }
    50% {
      filter: brightness(105%);
    }
    100% {
      filter: brightness(100%);
    }
  }
  .info__header--bottom {
    .info__team-btn--active {
      color: #2495da;
    }
  }
}
</style>
