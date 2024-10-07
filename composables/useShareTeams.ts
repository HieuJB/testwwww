import { createSharedComposable } from '@vueuse/core';
import { systemsStore } from '~/stores/systems';
import { generateTeamMetaSeo } from '~/utils/livescore_helper';

export const useShareTeams = createSharedComposable(() => {
  const route = useRoute();
  const storeSystems = systemsStore();
  const info = ref(null);
  const h1Content = ref(null);
  const content = ref(null);
  const { useLocale } = useShareCommon();


  const fetchObjectMeta = async (info: string, fullPath: string) => {
    try {
      let title = null;
      let description = null;
      let keyword = null;

      title = getConfig(
        storeSystems.configurations,
        fullPath.includes(ROUTERS_OLD.COACH)
          ? 'COACH_TITLE'
          : fullPath.includes(ROUTERS_OLD.PLAYER)
          ? 'PLAYER_TITLE'
          : 'TEAM_TITLE'
      )
        ? getConfig(
            storeSystems.configurations,
            fullPath.includes(ROUTERS_OLD.COACH)
              ? 'COACH_TITLE'
              : fullPath.includes(ROUTERS_OLD.PLAYER)
              ? 'PLAYER_TITLE'
              : 'TEAM_TITLE'
          )
        : getConfig(storeSystems.configurations, 'SEO_META_TITLE');
      title = generateTeamMetaSeo(title, info ?? '');
      h1Content.value = title

      description = getConfig(
        storeSystems.configurations,
        fullPath.includes(ROUTERS_OLD.COACH)
          ? 'COACH_DESCRIPTION'
          : fullPath.includes(ROUTERS_OLD.PLAYER)
          ? 'PLAYER_DESCRIPTION'
          : 'TEAM_DESCRIPTION'
      )
        ? getConfig(
            storeSystems.configurations,
            fullPath.includes(ROUTERS_OLD.COACH)
              ? 'COACH_DESCRIPTION'
              : fullPath.includes(ROUTERS_OLD.PLAYER)
              ? 'PLAYER_DESCRIPTION'
              : 'TEAM_DESCRIPTION'
          )
        : getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION');
      description = generateTeamMetaSeo(description, info ?? '');

      keyword = getConfig(
        storeSystems.configurations,
        fullPath.includes(ROUTERS_OLD.COACH)
          ? 'COACH_KEYWORD'
          : fullPath.includes(ROUTERS_OLD.PLAYER)
          ? 'PLAYER_KEYWORD'
          : 'TEAM_KEYWORD'
      )
        ? getConfig(
            storeSystems.configurations,
            fullPath.includes(ROUTERS_OLD.COACH)
              ? 'COACH_KEYWORD'
              : fullPath.includes(ROUTERS_OLD.PLAYER)
              ? 'PLAYER_KEYWORD'
              : 'TEAM_KEYWORD'
          )
        : '';
      keyword = generateTeamMetaSeo(keyword, info ?? '');

      content.value = getConfig(
        storeSystems.configurations,
        fullPath.includes(ROUTERS_OLD.COACH)
          ? 'COACH_CONTENT'
          : fullPath.includes(ROUTERS_OLD.PLAYER)
          ? 'PLAYER_CONTENT'
          : 'TEAM_CONTENT'
      )

      content.value = generateTeamMetaSeo(content.value, info ?? '');
      
      useSeoMeta({
        title: title,
        description: description,
        ogTitle: title,
        ogDescription: description,
        keywords: keyword,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchLineUpTeam = async (item) => {
    try {
      const resData = await useApiLiveScore(
        `${API_ROUTERS.LIVESCORE.LINEUP_TEAM}?team-id=${
          item ?? route.params.id
        }`
      );
      return resData;
    } catch (error) {
      console.error('Error fetching line up team:', error);
      throw error;
    }
  };

  const fetchPlayerInfo = async (item) => {
    try {
      const resData = await useApiLiveScore(
        `${API_ROUTERS.LIVESCORE.PLAYER_DETAIL}?player-id=${item}&lang=${useLocale.value.defaultLocale}`
      );
      return resData;
    } catch (error) {
      throw error;
    }
  };

  const fetchCoachInfo = async (item) => {
    try {
      const resData = await useApiLiveScore(
        `${API_ROUTERS.LIVESCORE.COACH_INFO}?coach-id=${item}`
      );
      return resData;
    } catch (error) {
      throw error;
    }
  };

  const fetchCoachHonor = async (item) => {
    try {
      let resData = await useApiLiveScore(
        `${API_ROUTERS.LIVESCORE.COACH_HONOR}?coach-id=${item}`
      );
      if (resData && resData[0] && resData[0].honors) {
        const data = resData[0].honors.reduce((acc, value) => {
          if (!Object.keys(acc).includes(value.honor.id)) {
            acc[value.honor.id] = resData[0].honors.filter(
              (item) => item.honor.id === value.honor.id
            );
          }
          return acc;
        }, {});
        return data;
      }
      return {};
    } catch (error) {
      throw error;
    }
  };

  return {
    fetchObjectMeta,
    fetchLineUpTeam,
    fetchPlayerInfo,
    route,
    info,
    fetchCoachInfo,
    fetchCoachHonor,
    h1Content,
    content
  };
});