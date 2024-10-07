// plugins/fetchRoutes.server.js
import FAVORITES from '@/components/favourites/index.vue';
import RESULT from '@/components/results/index.vue';
import SCHEDULE from '@/components/schedule/index.vue';
import NEWS from '@/components/news/index.vue';

export default defineNuxtPlugin(async (nuxtApp) => {
  const router = nuxtApp.$router;
  const { data } = await useFetch(API_ROUTERS.PAGE.ROUTER);

  const initComponent = {
    [ROUTERS.FOOTBALL_FAVORITES]: FAVORITES,
    [ROUTERS.FOOTBALL_RESULT]: RESULT,
    [ROUTERS.FOOTBALL_SCHEDULE]: SCHEDULE,
    [ROUTERS.NEWS]: NEWS,
  };

  if (data?.value?.pages) {
    data?.value?.pages?.forEach((item) => {
      if (item?.post_meta_post) {
        const key = item?.post_meta_post?.find(
          (item) => item?.name === 'router_name'
        );

        if (key && router) {
          if(ROUTERS_LANG[key.value]) {
            ROUTERS_LANG[key.value].vi = '/' + item.slug;
            ROUTERS_LANG[key.value].en = '/' + item.slug;
            ROUTERS_OLD[key.value] = '/' + item.slug;
            
            const newRoute = {
              name: key.value,
              path: '/' + item.slug,
              component: initComponent[key.value],
            };
  
            router.addRoute(newRoute);
          }
        }
      }
    });

  }
});
