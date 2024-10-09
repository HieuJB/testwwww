import { ref, computed, withAsyncContext, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { b as useRouter, a as useRoute } from './server.mjs';
import { u as useFetch } from './fetch-CZEt-yjw.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const router = useRouter();
    const route = useRoute();
    const page = ref(parseInt(route.query.page) || 1);
    const query_term = ref(route.query.query_term || "");
    const quality = ref(route.query.quality || "All");
    const genre = ref(route.query.genre || "all");
    const rating = ref(route.query.rating || "0");
    const sort_by = ref(route.query.sort_by || "like_count");
    const order_by = ref(route.query.order_by || "desc");
    const filmList = ref([]);
    ref(20);
    const movieTotal = ref(0);
    const visiblePages = computed(() => {
      const maxPagesToShow = 10;
      let startPage = Math.max(page.value - Math.floor(maxPagesToShow / 2), 1);
      let endPage = startPage + maxPagesToShow - 1;
      if (endPage > movieTotal.value) {
        endPage = movieTotal.value;
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
      }
      startPage = Math.max(startPage, 1);
      endPage = Math.min(endPage, movieTotal.value);
      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    });
    const fetchMovies = async () => {
      const { data } = await useFetch(
        `https://yts.mx/api/v2/list_movies.json?page=${page.value}&query_term=${query_term.value}
    &quality=${quality.value}&minimum_rating=${rating.value}&genre=${genre.value}
    &sort_by=${sort_by.value}&order_by=${order_by.value}`,
        "$PslAyef5YX"
      );
      const { movies, movie_count, page_number } = data.value.data;
      filmList.value = movies;
      movieTotal.value = movie_count;
      page.value = page_number;
    };
    [__temp, __restore] = withAsyncContext(() => fetchMovies()), await __temp, __restore();
    watch(
      [page, query_term, quality, genre, rating, sort_by, order_by],
      () => {
        router.push({
          query: {
            page: page.value,
            query_term: query_term.value,
            quality: quality.value,
            genre: genre.value,
            rating: rating.value,
            sort_by: sort_by.value,
            order_by: order_by.value
          }
        });
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "non-touch" }, _attrs))}><div class="main-content"><div id="mobile-search-input" class="hidden-md hidden-lg"><form method="get" action="/browse-movies" accept-charset="UTF-8"><div class="input-group container search-query"><input class="form-control" placeholder="Search for a movie\u2026" autocorrect="off" autocomplete="off" name="query_term" type="search"><span class="input-group-btn"><button class="btn btn-success" type="submit">Search</button></span></div></form></div><div class="ac-results hidden-sm hidden-xs"><ul></ul></div><noscript><div class="container"><div class="row"><div class="col-xs-20 text-center"><p class="no-javascript-warning"> Javascript not supported on your browser, please enable Javascript in order to fully utilize the website </p></div></div></div></noscript><div id="main-search" class="content-dark hidden-sm hidden-xs"><div class="container"><div id="main-search-fields"><p class="pull-left term">Search Term:</p><input name="query_term"${ssrRenderAttr("value", unref(query_term))} autocomplete="off" type="search"><div class="selects-container"><p>Quality:</p><select name="quality"><option value="All" selected="selected">All</option><option value="480p"${ssrIncludeBooleanAttr(Array.isArray(unref(quality)) ? ssrLooseContain(unref(quality), "480p") : ssrLooseEqual(unref(quality), "480p")) ? " selected" : ""}>480p</option><option value="720p"${ssrIncludeBooleanAttr(Array.isArray(unref(quality)) ? ssrLooseContain(unref(quality), "720p") : ssrLooseEqual(unref(quality), "720p")) ? " selected" : ""}>720p</option><option value="1080p"${ssrIncludeBooleanAttr(Array.isArray(unref(quality)) ? ssrLooseContain(unref(quality), "1080p") : ssrLooseEqual(unref(quality), "1080p")) ? " selected" : ""}>1080p</option><option value="1080p.x265"${ssrIncludeBooleanAttr(Array.isArray(unref(quality)) ? ssrLooseContain(unref(quality), "1080p.x265") : ssrLooseEqual(unref(quality), "1080p.x265")) ? " selected" : ""}>1080p.x265</option><option value="2160p"${ssrIncludeBooleanAttr(Array.isArray(unref(quality)) ? ssrLooseContain(unref(quality), "2160p") : ssrLooseEqual(unref(quality), "2160p")) ? " selected" : ""}>2160p</option><option value="3D"${ssrIncludeBooleanAttr(Array.isArray(unref(quality)) ? ssrLooseContain(unref(quality), "3D") : ssrLooseEqual(unref(quality), "3D")) ? " selected" : ""}>3D</option></select></div><div class="selects-container"><p>Genre:</p><select name="genre"><option value="all" selected="selected">All</option><option value="action"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "action") : ssrLooseEqual(unref(genre), "action")) ? " selected" : ""}>Action</option><option value="adventure"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "adventure") : ssrLooseEqual(unref(genre), "adventure")) ? " selected" : ""}>Adventure</option><option value="animation"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "animation") : ssrLooseEqual(unref(genre), "animation")) ? " selected" : ""}>Animation</option><option value="biography"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "biography") : ssrLooseEqual(unref(genre), "biography")) ? " selected" : ""}>Biography</option><option value="comedy"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "comedy") : ssrLooseEqual(unref(genre), "comedy")) ? " selected" : ""}>Comedy</option><option value="crime"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "crime") : ssrLooseEqual(unref(genre), "crime")) ? " selected" : ""}>Crime</option><option value="documentary"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "documentary") : ssrLooseEqual(unref(genre), "documentary")) ? " selected" : ""}>Documentary</option><option value="drama"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "drama") : ssrLooseEqual(unref(genre), "drama")) ? " selected" : ""}>Drama</option><option value="family"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "family") : ssrLooseEqual(unref(genre), "family")) ? " selected" : ""}>Family</option><option value="fantasy"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "fantasy") : ssrLooseEqual(unref(genre), "fantasy")) ? " selected" : ""}>Fantasy</option><option value="film-noir"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "film-noir") : ssrLooseEqual(unref(genre), "film-noir")) ? " selected" : ""}>Film-Noir</option><option value="game-show"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "game-show") : ssrLooseEqual(unref(genre), "game-show")) ? " selected" : ""}>Game-Show</option><option value="history"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "history") : ssrLooseEqual(unref(genre), "history")) ? " selected" : ""}>History</option><option value="horror"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "horror") : ssrLooseEqual(unref(genre), "horror")) ? " selected" : ""}>Horror</option><option value="music"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "music") : ssrLooseEqual(unref(genre), "music")) ? " selected" : ""}>Music</option><option value="musical"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "musical") : ssrLooseEqual(unref(genre), "musical")) ? " selected" : ""}>Musical</option><option value="mystery"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "mystery") : ssrLooseEqual(unref(genre), "mystery")) ? " selected" : ""}>Mystery</option><option value="news"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "news") : ssrLooseEqual(unref(genre), "news")) ? " selected" : ""}>News</option><option value="reality-tv"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "reality-tv") : ssrLooseEqual(unref(genre), "reality-tv")) ? " selected" : ""}>Reality-TV</option><option value="romance"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "romance") : ssrLooseEqual(unref(genre), "romance")) ? " selected" : ""}>Romance</option><option value="sci-fi"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "sci-fi") : ssrLooseEqual(unref(genre), "sci-fi")) ? " selected" : ""}>Sci-Fi</option><option value="sport"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "sport") : ssrLooseEqual(unref(genre), "sport")) ? " selected" : ""}>Sport</option><option value="talk-show"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "talk-show") : ssrLooseEqual(unref(genre), "talk-show")) ? " selected" : ""}>Talk-Show</option><option value="thriller"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "thriller") : ssrLooseEqual(unref(genre), "thriller")) ? " selected" : ""}>Thriller</option><option value="war"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "war") : ssrLooseEqual(unref(genre), "war")) ? " selected" : ""}>War</option><option value="western"${ssrIncludeBooleanAttr(Array.isArray(unref(genre)) ? ssrLooseContain(unref(genre), "western") : ssrLooseEqual(unref(genre), "western")) ? " selected" : ""}>Western</option></select></div><div class="selects-container"><p>Rating:</p><select name="rating"><option value="0" selected="selected">All</option><option value="9"${ssrIncludeBooleanAttr(Array.isArray(unref(rating)) ? ssrLooseContain(unref(rating), "9") : ssrLooseEqual(unref(rating), "9")) ? " selected" : ""}>9+</option><option value="8"${ssrIncludeBooleanAttr(Array.isArray(unref(rating)) ? ssrLooseContain(unref(rating), "8") : ssrLooseEqual(unref(rating), "8")) ? " selected" : ""}>8+</option><option value="7"${ssrIncludeBooleanAttr(Array.isArray(unref(rating)) ? ssrLooseContain(unref(rating), "7") : ssrLooseEqual(unref(rating), "7")) ? " selected" : ""}>7+</option><option value="6"${ssrIncludeBooleanAttr(Array.isArray(unref(rating)) ? ssrLooseContain(unref(rating), "6") : ssrLooseEqual(unref(rating), "6")) ? " selected" : ""}>6+</option><option value="5"${ssrIncludeBooleanAttr(Array.isArray(unref(rating)) ? ssrLooseContain(unref(rating), "5") : ssrLooseEqual(unref(rating), "5")) ? " selected" : ""}>5+</option><option value="4"${ssrIncludeBooleanAttr(Array.isArray(unref(rating)) ? ssrLooseContain(unref(rating), "4") : ssrLooseEqual(unref(rating), "4")) ? " selected" : ""}>4+</option><option value="3"${ssrIncludeBooleanAttr(Array.isArray(unref(rating)) ? ssrLooseContain(unref(rating), "3") : ssrLooseEqual(unref(rating), "3")) ? " selected" : ""}>3+</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(unref(rating)) ? ssrLooseContain(unref(rating), "2") : ssrLooseEqual(unref(rating), "2")) ? " selected" : ""}>2+</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(rating)) ? ssrLooseContain(unref(rating), "1") : ssrLooseEqual(unref(rating), "1")) ? " selected" : ""}>1+</option></select></div><div class="selects-container"><p>Sort By:</p><select name="sort_by"><option value="like_count" selected="selected">Like count</option><option value="date_added"${ssrIncludeBooleanAttr(Array.isArray(unref(sort_by)) ? ssrLooseContain(unref(sort_by), "date_added") : ssrLooseEqual(unref(sort_by), "date_added")) ? " selected" : ""}> Date added </option><option value="title"${ssrIncludeBooleanAttr(Array.isArray(unref(sort_by)) ? ssrLooseContain(unref(sort_by), "title") : ssrLooseEqual(unref(sort_by), "title")) ? " selected" : ""}>Title</option><option value="year"${ssrIncludeBooleanAttr(Array.isArray(unref(sort_by)) ? ssrLooseContain(unref(sort_by), "year") : ssrLooseEqual(unref(sort_by), "year")) ? " selected" : ""}>Year</option><option value="rating"${ssrIncludeBooleanAttr(Array.isArray(unref(sort_by)) ? ssrLooseContain(unref(sort_by), "rating") : ssrLooseEqual(unref(sort_by), "rating")) ? " selected" : ""}>Rating</option><option value="peers"${ssrIncludeBooleanAttr(Array.isArray(unref(sort_by)) ? ssrLooseContain(unref(sort_by), "peers") : ssrLooseEqual(unref(sort_by), "peers")) ? " selected" : ""}>Peers</option><option value="seeds"${ssrIncludeBooleanAttr(Array.isArray(unref(sort_by)) ? ssrLooseContain(unref(sort_by), "seeds") : ssrLooseEqual(unref(sort_by), "seeds")) ? " selected" : ""}>Seeds</option><option value="download_count"${ssrIncludeBooleanAttr(Array.isArray(unref(sort_by)) ? ssrLooseContain(unref(sort_by), "download_count") : ssrLooseEqual(unref(sort_by), "download_count")) ? " selected" : ""}>Download count</option></select></div><div class="selects-container selects-container-last"><p>Order By:</p><select name="order_by"><option value="desc" selected="selected">Descending</option><option value="asc"${ssrIncludeBooleanAttr(Array.isArray(unref(order_by)) ? ssrLooseContain(unref(order_by), "asc") : ssrLooseEqual(unref(order_by), "asc")) ? " selected" : ""}>Ascending</option></select></div></div><div id="main-search-btn"><button class="button-green-download2-big"> Search </button></div></div></div><div style="${ssrRenderStyle({ "min-height": "80vh" })}" class="browse-content"><div class="container"><h2><b>${ssrInterpolate(unref(movieTotal))}</b><span style="${ssrRenderStyle({ "font-size": "90%" })}"> YIFY Movies found (by <i>latest</i>)</span></h2><div class=""><ul class="tsc_pagination tsc_paginationA tsc_paginationA06"><ul class="pagination">`);
      if (unref(page) > 1) {
        _push(`<li><a href="javascript:void(0)">Previous</a></li>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(page) > 1 && unref(page) < 2) {
        _push(`<li><a href="javascript:void(0)">1</a></li>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.startPage > 2) {
        _push(`<li>...</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(visiblePages), (pageNumber) => {
        _push(`<li class="${ssrRenderClass({ current: pageNumber === unref(page) })}"><a href="javascript:void(0)" class="${ssrRenderClass({ current: pageNumber === unref(page) })}">${ssrInterpolate(pageNumber)}</a></li>`);
      });
      _push(`<!--]-->`);
      if (_ctx.endPage < unref(movieTotal) - 1) {
        _push(`<li>...</li>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(page) < unref(movieTotal)) {
        _push(`<li><a href="javascript:void(0)">${ssrInterpolate(unref(movieTotal))}</a></li>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(page) < unref(movieTotal)) {
        _push(`<li><a href="javascript:void(0)">Next</a></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></ul></div><section>`);
      if ((_a = unref(filmList)) == null ? void 0 : _a.length) {
        _push(`<div class="row"><!--[-->`);
        ssrRenderList(unref(filmList), (item, index) => {
          _push(`<div class="browse-movie-wrap col-xs-10 col-sm-4 col-md-5 col-lg-4"><a class="browse-movie-link"><figure><img class="img-responsive"${ssrRenderAttr("src", item.large_cover_image)} alt="City of Dreams (2023) download" width="170" height="255"><figcaption class="hidden-xs hidden-sm"><span class="icon-star"></span><h4 class="rating">${ssrInterpolate(item.rating)} / 10</h4><h4>${ssrInterpolate(item.genres[0])}</h4><h4>${ssrInterpolate(item.genres[1])}</h4><span class="button-green-download2-big">View Details</span></figcaption></figure></a><div class="browse-movie-bottom"><a href="/movies/city-of-dreams-2023/" class="browse-movie-title">${ssrInterpolate(item.title)}</a><div class="browse-movie-year">${ssrInterpolate(item.year)}</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section><div class=""><ul class="tsc_pagination tsc_paginationA tsc_paginationA06"><ul class="pagination">`);
      if (unref(page) > 1) {
        _push(`<li><a href="javascript:void(0)">Previous</a></li>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(page) > 1) {
        _push(`<li><a href="javascript:void(0)">1</a></li>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.startPage > 2) {
        _push(`<li>...</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(visiblePages), (pageNumber) => {
        _push(`<li class="${ssrRenderClass({ current: pageNumber === unref(page) })}"><a href="javascript:void(0)" class="${ssrRenderClass({ current: pageNumber === unref(page) })}">${ssrInterpolate(pageNumber)}</a></li>`);
      });
      _push(`<!--]-->`);
      if (_ctx.endPage < unref(movieTotal) - 1) {
        _push(`<li>...</li>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(page) < unref(movieTotal)) {
        _push(`<li><a href="javascript:void(0)">${ssrInterpolate(unref(movieTotal))}</a></li>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(page) < unref(movieTotal)) {
        _push(`<li><a href="javascript:void(0)">Next</a></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></ul></div></div></div><div class="container hidden-md hidden-lg"><div class="row"><div class="mobile-footer"><div class="col-sm-20"><a href="/" style="${ssrRenderStyle({ "width": "50%" })}"><span class="glyphicon glyphicon-home"></span><p>Home</p></a><a href="/browse-movies" style="${ssrRenderStyle({ "width": "50%" })}"><span class="glyphicon glyphicon-list-alt"></span><p>Browse</p></a></div></div></div></div><footer><div class="container"><div class="row"><div class="col-xs-20"><ul class="text-center"><li>YIFY \xA9 2011 - 2024</li></ul></div></div></div></footer></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C6c8bveI.mjs.map
