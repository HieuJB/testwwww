// https://github.com/directus/website/blob/main/modules/redirects.ts
import { createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

export default defineNuxtModule({
  async setup() {
    const resolver = createResolver(import.meta.url)
    extendPages((pages) => {
       pages.unshift({
        name: '/tag',
        path: '/tag/:tag',
        file: resolver.resolve('/components/news/tags/[tag].vue')
       }),
      //  pages.unshift({
      //   name: '/oddscomp',
      //   path: '/oddscomp/:match_id',
      //   file: resolver.resolve('/pages/odds/oddscomp/[match_id].vue')
      //  }),
      //  pages.unshift({
      //   name: '/asian-handicap-odds',
      //   path: '/asian-handicap-odds/:match_id',
      //   file: resolver.resolve('/pages/odds/asian-handicap-odds/[match_id].vue')
      //  }),
      //  pages.unshift({
      //   name: '/oddshistory',
      //   path: '/oddshistory/:match_id',
      //   file: resolver.resolve('/pages/odds/oddshistory/[match_id].vue')
      //  }),
      //  pages.unshift({
      //   name: '/over-under-odds',
      //   path: '/over-under-odds/:match_id',
      //   file: resolver.resolve('/pages/odds/over-under-odds/[match_id].vue')
      //  }),
      //  pages.unshift({
      //   name: '/1x2-odds',
      //   path: '/1x2-odds/:match_id',
      //   file: resolver.resolve('/pages/odds/1x2-odds/[match_id].vue')
      //  }),
      //  pages.unshift({
      //   name: '/corner-ou-odds',
      //   path: '/corner-ou-odds/:match_id',
      //   file: resolver.resolve('/pages/odds/corner-ou-odds/[match_id].vue')
      //  }),
      //  pages.unshift({
      //   name: '/euro-handicap-odds',
      //   path: '/euro-handicap-odds/:match_id',
      //   file: resolver.resolve('/pages/odds/euro-handicap-odds/[match_id].vue')
      //  }),
      //  pages.unshift({
      //   name: '/correct-score-odds',
      //   path: '/correct-score-odds/:match_id',
      //   file: resolver.resolve('/pages/odds/correct-score-odds/[match_id].vue')
      //  }),
      //  pages.unshift({
      //   name: '/double-chance-odds',
      //   path: '/double-chance-odds/:match_id',
      //   file: resolver.resolve('/pages/odds/double-chance-odds/[match_id].vue')
      //  }),
       pages.unshift({
        name: '/match',
        path: '/match/:id',
        file: resolver.resolve('/pages/match/[id].vue')
       }),
       pages.unshift({
        name: '/warehouse',
        path: '/warehouse',
        file: resolver.resolve('/pages/warehouse/index.vue')
       });
    })
  }
})
