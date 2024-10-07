<template>
  <div class="team">
    <div class="team__title">{{ translate('Player Performance') }}</div>
    <div class="team__list">
      <div
        class="d-flex gap-2"
        :class="{
          'p-2': listCompetition?.length && seasonList?.length,
        }"
      >
        <select
          v-if="listCompetition?.length"
          v-model="competitionActive"
          class="form-select form-select--left"
        >
          <option
            :value="item.competition_id"
            v-for="(item, index) in listCompetition"
            :key="index"
            value="1"
          >
            {{ item.competition_name }}
          </option>
        </select>
        <select
          v-if="seasonList?.length"
          v-model="seasonActive"
          class="form-select form-select--right"
        >
          <option
            :value="item.id"
            v-for="(item, index) in seasonListInit"
            :key="index"
          >
            {{ displayYear(item.year) }}
          </option>
        </select>
      </div>

      <div class="team__item">
        <div class="team__item-position">
          <BaseImage :src="'/img/arrow1_032.gif'" alt="position" />
          <div>{{ translate('Match') }}</div>
        </div>
        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Number of Matches') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.matches ?? '-' }}
            </div>
          </Transition>
        </div>
        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Minutes Played') }}</div>

          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.minutes_played ?? '-' }}
            </div>
          </Transition>
        </div>

        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Started From Beginning') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.first ?? '-' }}
            </div>
          </Transition>
        </div>

        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Appearances') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.court ?? '-' }}
            </div>
          </Transition>
        </div>
      </div>

      <div class="team__item">
        <div class="team__item-position">
          <BaseImage :src="'/img/arrow1_032.gif'" alt="position" />
          <div>{{ translate('Attack') }}</div>
        </div>

        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Goals') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.goals ?? '-' }}
            </div>
          </Transition>
        </div>

        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Shots') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.shots ?? '-' }}
            </div>
          </Transition>
        </div>

        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Set Pieces') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.freekicks ?? '-' }}
            </div>
          </Transition>
        </div>

        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Penalty Kicks') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.penalty ?? '-' }}
            </div>
          </Transition>
        </div>
      </div>

      <div class="team__item">
        <div class="team__item-position">
          <BaseImage :src="'/img/arrow1_032.gif'" alt="position" />
          <div>{{ translate('Passes') }}</div>
        </div>

        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Assists') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.assists ?? '-' }}
            </div>
          </Transition>
        </div>

        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Passes') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.passes ?? '-' }}
            </div>
          </Transition>
        </div>

        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Key Passes') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.key_passes ?? '-' }}
            </div>
          </Transition>
        </div>

        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Crosses') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.crosses ?? '-' }}
            </div>
          </Transition>
        </div>

        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Long Balls') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.long_balls ?? '-' }}
            </div>
          </Transition>
        </div>
      </div>

      <div class="team__item">
        <div class="team__item-position">
          <BaseImage :src="'/img/arrow1_032.gif'" alt="position" />
          <div>{{ translate('Defense') }}</div>
        </div>
        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Duels') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.duels ?? '-' }}
            </div>
          </Transition>
        </div>
        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Shot Blocks') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.blocked_shots ?? '-' }}
            </div>
          </Transition>
        </div>
        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Tackles') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.tackles ?? '-' }}
            </div>
          </Transition>
        </div>
        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Fouls') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.fouls ?? '-' }}
            </div>
          </Transition>
        </div>
        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Saves') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.saves ?? '-' }}
            </div>
          </Transition>
        </div>
      </div>

      <div class="team__item">
        <div class="team__item-position">
          <BaseImage :src="'/img/arrow1_032.gif'" alt="position" />
          <div>{{ translate('Cards') }}</div>
        </div>

        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Yellow Cards') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.yellow_cards ?? '-' }}
            </div>
          </Transition>
        </div>
        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Yellow Card to Red') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.yellow2red_cards ?? '-' }}
            </div>
          </Transition>
        </div>
        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Red Cards') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.red_cards ?? '-' }}
            </div>
          </Transition>
        </div>
      </div>

      <div class="team__item">
        <div class="team__item-position">
          <BaseImage :src="'/img/arrow1_032.gif'" alt="position" />
          <div>{{ translate('Others') }}</div>
        </div>

        <div class="team__item-detail">
          <div class="team__item-shirt">{{ translate('Offside') }}</div>
          <Transition name="slide-fade">
            <div v-if="!isLoading" class="team__item-name">
              {{ playerPerformance?.offsides ?? '-' }}
            </div>
          </Transition>
        </div>
      </div>
    </div>
</div>
</template>

<script setup>
defineProps({
  player: Array,
  playerId: String,
});
const { $t } = useShareCommon();

const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const listCompetition = defineModel('listCompetition');
const competitionActive = defineModel('competitionActive');
const seasonList = defineModel('seasonList');
const seasonActive = defineModel('seasonActive');
const playerPerformance = defineModel('playerPerformance');
const isLoading = defineModel('isLoading');

const seasonListInit = computed(() => {
  try {
    return Array.from(
      new Map(seasonList.value.map((item) => [item.id, item])).values()
    );
  } catch {
    return [];
  }
});

const displayYear = (item) => {
  if (item.length === 9) {
    return item.slice(2, 4) + '/' + item.slice(7);
  }
  return item;
};
</script>

<style lang="scss" scoped>
.team {
  &__title {
    background: $menu;
    color: white;
    height: 30px;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__list {
    border: 1px solid #e5e5e5;
  }
  &__item {
    &-position {
      img {
        width: 10px;
      }
      background: #edf3e6;
      font-size: 12px;
      font-weight: bold;
      display: flex;
      gap: 5px;
      align-items: center;
      padding: 10px;
      line-height: 0;
    }

    &-detail {
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: 4px 10px;
      background: #f7f7f7;
      &:nth-child(even) {
        background-color: white !important;
      }
      &--active {
        background: #fffae0 !important;
        .team__item-name {
          color: rgba(210, 105, 30, 0.822) !important;
        }
      }
      &--white {
        border-top: none;
        border-bottom: none;
        background: white;
      }
    }
    &-shirt {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      font-size: 12px;
    }
    &-name {
      color: $primary;
      line-height: 1.4;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.form-select {
  font-size: 11px;
  &--left {
    width: 150%;
  }
}
.form-select:focus {
  border-color: $primary;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(33, 253, 13, 0.158);
}

.slide-fade-enter-active {
  transition: all 0.3s;
}

.slide-fade-enter-from {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-leave-active,
.slide-fade-leave-to {
  transition: none;
  transform: none;
  opacity: 1;
}
</style>
