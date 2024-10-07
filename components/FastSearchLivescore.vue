<template>
  <div class="search-box">
    <button class="btn-search">
      <svg
        style="width: 14px"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
      >
        <path
          d="M19.6714 18.5942L15.8949 14.8287C17.1134 13.2764 17.7745 11.3595 17.7721 9.38603C17.7721 7.62854 17.2509 5.91052 16.2745 4.44922C15.2981 2.98792 13.9103 1.84897 12.2866 1.17641C10.6629 0.50385 8.87617 0.327877 7.15245 0.670746C5.42873 1.01362 3.84539 1.85993 2.60266 3.10266C1.35993 4.34539 0.513616 5.92873 0.170746 7.65245C-0.172123 9.37617 0.00385015 11.1629 0.676412 12.7866C1.34897 14.4103 2.48792 15.7981 3.94922 16.7745C5.41052 17.7509 7.12854 18.2721 8.88603 18.2721C10.8595 18.2745 12.7764 17.6134 14.3287 16.3949L18.0942 20.1714C18.1974 20.2755 18.3203 20.3582 18.4556 20.4146C18.591 20.471 18.7362 20.5 18.8828 20.5C19.0294 20.5 19.1746 20.471 19.31 20.4146C19.4453 20.3582 19.5682 20.2755 19.6714 20.1714C19.7755 20.0682 19.8582 19.9453 19.9146 19.81C19.971 19.6746 20 19.5294 20 19.3828C20 19.2362 19.971 19.091 19.9146 18.9556C19.8582 18.8203 19.7755 18.6974 19.6714 18.5942ZM2.22151 9.38603C2.22151 8.06791 2.61238 6.7794 3.34468 5.68342C4.07699 4.58745 5.11785 3.73324 6.33563 3.22882C7.55341 2.72439 8.89342 2.59241 10.1862 2.84957C11.479 3.10672 12.6665 3.74145 13.5986 4.6735C14.5306 5.60555 15.1653 6.79306 15.4225 8.08585C15.6796 9.37864 15.5477 10.7186 15.0432 11.9364C14.5388 13.1542 13.6846 14.1951 12.5886 14.9274C11.4927 15.6597 10.2041 16.0505 8.88603 16.0505C7.11849 16.0505 5.42334 15.3484 4.1735 14.0986C2.92366 12.8487 2.22151 11.1536 2.22151 9.38603Z"
          fill="#373737"
        />
      </svg>
    </button>
    <input
      v-model="searchMatch"
      type="text"
      :class="[
        'input-search',
        {
          'input-search--active': searchMatch,
        },
      ]"
      :placeholder="$t('Quick Search')"
      />
  </div>


  
</template>

<script setup lang="ts">
const orderByTime = defineModel('orderByTime')
const compsList = defineModel('compsList')
const renderTopList = defineModel('renderTopList')
const activeTab = defineModel('activeTab')
const { useLocale, $t } = useShareCommon()
const searchMatch = ref('');


const compsListSearch = defineModel('compsListSearch')
const renderTopListSearch = defineModel('renderTopListSearch')

const initMatch = ref([])

function deepClone(obj, hash = new WeakMap()) {
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  const clone = Array.isArray(obj) ? [] : {};

  hash.set(obj, clone);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key], hash); 
    }
  }

  return clone;
}


watch(
  ()=> compsList.value,
  ()=> {
    initMatch.value = deepClone(compsList.value)
  }
, {immediate: true})


function removeVietnameseTones(str) {
    return str
        .normalize('NFD') // Chuyển đổi ký tự có dấu thành dạng decomposed (chứa các ký tự dấu riêng biệt)
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu thanh
        .replace(/đ/g, 'd') // Thay thế chữ đ thường
        .replace(/Đ/g, 'D') // Thay thế chữ Đ hoa
        .replace(/[^\w\s]/g, '') // Loại bỏ các ký tự đặc biệt (nếu cần)
        .replace(/\s+/g, ' ') // Loại bỏ khoảng trắng thừa
        .trim(); // Xóa khoảng trắng ở đầu và cuối chuỗi
}

const getMatchByComp = () => {
  try {
    if (searchMatch.value) {
      const data = initMatch.value
        .map((item) => {
          if((String(removeVietnameseTones(item.name))).toLowerCase().includes(String(removeVietnameseTones(searchMatch.value)).toLowerCase())){
            return item
          }
          const match = item.matchs.filter((item) => {
            return (
              item?.away_team?.name
                .toLowerCase()
                .trim()
                .includes(searchMatch.value.toLowerCase().trim()) ||
              item?.home_team?.name
                .toLowerCase()
                .trim()
                .includes(searchMatch.value.toLowerCase().trim())
            );
          });
          if (!!match.length) {
            return {
              ...item,
              matchs: match,
            };
          }
        })
        .filter((item) => !!item?.id);
        
      compsListSearch.value = data;
    } else {
      compsListSearch.value = []
    }
  } catch (e) {
    compsListSearch.value = null
  }

};

const getMatchByTime = () => {
  try {

    const filteredMap = new Map(
      [...renderTopList.value].filter(([key, value]) => {
        return (
          value.some(item => (String(removeVietnameseTones(item.comp.name)).toLowerCase()).includes(String(removeVietnameseTones(searchMatch.value)).toLowerCase())) 
          || value.some(item => (String(removeVietnameseTones(item.home_team.name)).toLowerCase()).includes(String(removeVietnameseTones(searchMatch.value)).toLowerCase())) 
          || value.some(item => (String(removeVietnameseTones(item.away_team.name)).toLowerCase()).includes(String(removeVietnameseTones(searchMatch.value)).toLowerCase())) 

        )
      })
    );
  renderTopListSearch.value = filteredMap
  }catch(e) {
    console.log(e)
  }
}

const handleSearch = debounce(() => {
  if(!searchMatch.value) {
    compsListSearch.value = null
    renderTopListSearch.value = null
  }else {
    if(orderByTime.value) {
      getMatchByTime();
    } else {
      getMatchByComp();
    }
  }

}, 300);

watch(
  () => searchMatch.value,
  () => {
    handleSearch();
  }
);

watch(
  () => activeTab.value,
  () => {
    searchMatch.value = null;
  }
);

onMounted(()=> {
  
})
</script>

<style scoped lang="scss">
.search-box {
  width: fit-content;
  height: fit-content;
  position: relative;
}
.input-search {
  height: 30px;
  width: 30px;
  border-style: none;
  font-size: 12px;
  outline: none;
  border-radius: 60px;
  transition: all 0.5s ease-in-out;
  border: 1px solid #d3d3d3;
  height: 26px;
  color: black;
  padding-right: 30px !important;
  @media (max-width: 768px) {
    background: white !important;
    padding-right: 30px !important;
  }
}
.input-search::placeholder {
  color: #9e9d9d;
  font-size: 12px;
  font-weight: 100;
}
.btn-search {
  width: 35.3px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right:-2px;
  top: -1.5px !important;
  color: #ffffff;
  background-color: transparent;
  pointer-events: painted;
  height: 30.99px;
  @media (max-width: 768px) {
    top: -2.8px !important;
    right: -2px;
  }
}
.btn-search:focus ~ .input-search {
  width: 200px;
  border-radius: 8px;
  background-color: transparent;
  padding: 8px;
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  border: 1px solid $primary;
  @media (max-width: 430px) {
    width: 150px;
  }
}
.input-search:focus {
  width: 200px;
  border-radius: 8px;
  padding: 8px;
  background-color: transparent;
  border: 1px solid $primary;
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  @media (max-width: 430px) {
    width: 150px;
  }
}
.input-search--active {
  width: 200px;
  border-radius: 8px;
  padding: 8px;
  background-color: transparent;
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  @media (max-width: 430px) {
    width: 150px;
  }
}
@media (hover: none) {
  .btn-search:hover ~ .input-search {
    width: 200px;
    border-radius: 8px;
    background-color: transparent;
    padding: 8px;
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
    border: 1px solid $primary;
    @media (max-width: 430px) {
      width: 150px;
    }
  }
}
</style>
