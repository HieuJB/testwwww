<template>
  <div class="select-box">
    <div
      ref="target"
      @click="isShow = !isShow"
      class="select-box__current"
      tabindex="1"
    >
      <div class="select-box__value">
        <div
          :class="[
            'select-box__input-text',
            {
              'select-box__input-text--active': isShow,
            },
          ]"
        >
          <BaseImage
            
            :src="
              compActive?.id !== 1
                ? getLiveScoreImage(compActive?.comp_logo, 'competition') + '!h20'
                : compActive.comp_logo
            "
            :alt="compActive?.comp_name"
          />
          <div>
            {{ compActive?.comp_name }}
          </div>
        </div>
      </div>
      <BaseImage
        :class="[
          'select-box__icon',
          {
            'select-box__icon--active': isShow,
          },
        ]"
        src="/img/dropdown.svg"
        alt="Arrow Icon"
        aria-hidden="true"
      />
    </div>
    <ul v-show="isShow" class="select-box__list">
      <div class="select-box__list-input">
        <input
          v-model="search"
          ref="ignoreElRef"
          type="text"
          class="input-search mb-1"
          :placeholder="translate('Enter Tournament Name')"
        />
      </div>
      <div class="select-box__list-comp">
        <li
          @click="compActive = item"
          v-for="(item, index) in listComp"
          :key="index"
          :class="{
            'item--active' : compActive.id === item.id
          }"
        >
          <div class="select-box__option" for="0" aria-hidden="true">
            <BaseImage
              width="15px"
              :src="
                item.id !== 1
                  ? getLiveScoreImage(item?.comp_logo, 'competition') + '!h20'
                  : item.comp_logo
              "
              :alt="item?.comp_name"
            />
            {{ item.comp_name }}
          </div>
        </li>
        <div v-if="!listComp.length">
          <div class="d-flex flex-column align-items-center mt-5">
            <BaseImage
              class="nodata_pic"
              alt="nodata pic"
              width="150"
              height="150"
              src="/icon/nodata.svg"
            />
          </div>
          <p class="fw-bold text-center mt-3">{{ translate('No Data Available') }}</p>
        </div>
        <div ref="el" style="opacity: 0">-</div>
      </div>
    </ul>
  </div>
</template>

<script setup>
const { $t } = useShareCommon();
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const info = defineModel('info');
import { onClickOutside, useIntersectionObserver } from '@vueuse/core';
const isShow = ref(false);
const target = ref(null);
const ignoreElRef = ref();
const el = ref(null);
const limit = ref(1);
const search = ref('');
const compActive = defineModel('compActive')

const listComp = computed(() => {
  if (search.value) {
    return info.value.filter((item) =>
      item.comp_name.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  return info.value.slice(0, limit.value * 20);
});

const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    if (!search.value) {
      limit.value = limit.value + 1;
    }
  }
});

onClickOutside(target, () => (isShow.value = false), { ignore: [ignoreElRef] });
</script>

<style lang="scss" scoped>
.select-box {
  position: relative;
  display: block;
  width: 100%;
  font-size: 12px;
  color: #373737;
  width: 200px;
  z-index: 2;
  .select-box__input-text--active {
    border: 1px solid $primary;
  }
  @media (max-width: 430px) {
    width: 150px;
  }

  &__current {
    position: relative;
    box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);
    cursor: pointer;
    outline: none;
    
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    width: 12px;
    opacity: 0.9;
    transition: 0.5s ease;
  }

  &__value {
    display: flex;
  }

  &__input {
    &:checked + .select-box__input-text {
      display: block;
    }
  }

  &__input-text {
    width: 100%;
    margin: 0;
    padding: 8px;
    border: 1px solid #d3d3d3;
    border-radius: 8px;
    font-weight: bold;
    display: flex;
    gap: 5px;
    align-items: center;
    height: 37.5px;
    img {
      object-fit: contain;
    }
    div {
      width: 140px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      @media (max-width: 430px) {
        width: 80px;
      }
    }
  }

  &__list {
    position: absolute;
    opacity: 1;
    padding: 0;
    list-style: none;

    animation-fill-mode: forwards;
    animation-timing-function: step-start;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border: 1px solid #d3d3d3;
    border-radius: 8px;
    background: white;
    &-input {
      // position: fixed;
      background-color: transparent;
      width: 100%;
      padding: 0 5px;
      input {
        width: 100%;
      }
    }
    &-comp {
      overflow-y: scroll;
      height: 400px;
    }
  }
  &__option {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 8px;
    font-size: 12px;
    line-height: 1.1;
    &:hover,
    &:focus {
      color: white;
      background-color: $primary;
    }
    img {
      object-fit: contain;
    }
  }
}

@keyframes HideList {
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(0);
  }
}
.input-search {
  width: 160px;
  height: 30px;
  margin-top: 5px;
  border-radius: 8px;
  padding: 8px;
  outline: none;
  border: 1px solid #d3d3d3;
  &:focus {
    border: 1px solid $primary;
  }
}

.select-box__list--active {
  opacity: 1;
  animation-name: none;
  .select-box__option {
    cursor: pointer;
  }
}

.select-box__icon--active {
  transform: translateY(-50%) rotate(180deg);
}

.item--active {
  background-color: $primary;
  color: white;
}
</style>
