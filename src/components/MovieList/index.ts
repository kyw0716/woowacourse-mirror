import "./index.css";

import type { MovieResponse } from "../../types";

import { getPopularMovies, getSearchResult } from "../../utils/api";
import { $ } from "../../utils/selector";
import {
  deleteSkeletonContainer,
  getSkeletonContainer,
  showSkeletonContainer,
} from "./Skeleton";
import { getMovieCardTemplate } from "./MovieCard";

type showType = "popular" | "search";

export interface State {
  showState: showType;
  searchKeyword: string;
  page: number;
}

export class MovieList {
  #$target;

  #state: State = {
    showState: "popular",
    searchKeyword: "",
    page: 1,
  };

  #observer: IntersectionObserver | undefined;

  constructor($target: Element) {
    this.#$target = $target;

    this.init();
  }

  async init() {
    this.#$target.insertAdjacentElement("afterend", getSkeletonContainer());

    try {
      const { results, total_pages } = await getPopularMovies(this.#state.page);

      this.#observer = new IntersectionObserver(this.fetchNextPage.bind(this));

      this.render(results, total_pages);
    } catch {
      deleteSkeletonContainer();
    }
  }

  render(movieList: MovieResponse[], total_pages: number) {
    deleteSkeletonContainer();

    this.#$target.insertAdjacentHTML(
      "beforeend",
      `${movieList.map(getMovieCardTemplate).join("")}
      `
    );

    this.#state.page === total_pages ? this.hideMore() : this.showMore();

    if (this.#state.page === 1 && movieList.length === 0) {
      const subTitle = $(".sub-title");

      subTitle.innerHTML = "검색 결과 없음";
    }
  }

  async changeShowTarget(showState: showType, searchKeyword?: string) {
    this.#$target.innerHTML = ``;
    this.#state = {
      ...this.#state,
      showState,
      page: 1,
      searchKeyword: searchKeyword ?? "",
    };

    showSkeletonContainer();

    const { results, total_pages } =
      this.#state.showState === "popular"
        ? await getPopularMovies(this.#state.page)
        : await getSearchResult(this.#state.page, this.#state.searchKeyword);

    this.render(results, total_pages);

    deleteSkeletonContainer();
  }

  async fetchNextPage() {
    const itemList = $(".item-list");

    if (!(itemList instanceof HTMLElement)) return;

    this.#state.page += 1;

    itemList.style.marginBottom = "48px";
    showSkeletonContainer();

    try {
      const { results, total_pages } =
        this.#state.showState === "popular"
          ? await getPopularMovies(this.#state.page)
          : await getSearchResult(this.#state.page, this.#state.searchKeyword);

      if (this.#state.page === total_pages) this.hideMore();

      this.render(results, total_pages);
    } finally {
      deleteSkeletonContainer();
      itemList.style.marginBottom = "0";
    }
  }

  hideMore() {
    console.log("멈춤");
    this.#observer?.unobserve($(".btn"));
  }

  showMore() {
    console.log("시작", $(".btn"));
    this.#observer?.observe($(".btn"));
  }
}
