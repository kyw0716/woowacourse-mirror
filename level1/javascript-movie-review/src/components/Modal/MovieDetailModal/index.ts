import "./index.css";

import type { MovieDetail } from "../../../types";

import {
  getStarRateFromStorage,
  setStarRateToStorage,
} from "../../../utils/storage";
import { $, $$ } from "../../../utils/selector";
import { getImageContainerTemplate } from "./Image";
import { getDescriptionTemplate } from "./Description";
import { convertMovieDetail, getMovieInfoById } from "../../../utils/api";

const STAR_RATE_STRING = [
  "나의 점수는?",
  "최악이예요",
  "별로예요",
  "보통이예요",
  "재미있어요",
  "명작이예요",
];

export class MovieDetailModal {
  #$target;

  constructor($target: Element) {
    this.#$target = $target;
  }

  initSelectStarRate() {
    const starContainer = $$(".star");
    const starInput = $(".star-rating");
    const starRateNum = $(".star-rate-num");
    const starRateDesc = $(".star-rate-desc");

    if (!(starInput instanceof HTMLInputElement)) return;
    if (!(starRateNum instanceof HTMLSpanElement)) return;
    if (!(starRateDesc instanceof HTMLSpanElement)) return;

    this.fillStar(starContainer, starInput);
    this.bindStarRateEvent(starInput, starContainer, starRateNum, starRateDesc);
  }

  bindStarRateEvent(
    starInput: HTMLInputElement,
    starContainer: NodeListOf<Element>,
    starRateNum: HTMLSpanElement,
    starRateDesc: HTMLSpanElement
  ) {
    starInput.addEventListener("input", () => {
      const movieId = starInput.dataset.movieId;

      this.fillStar(starContainer, starInput);

      starRateNum.innerHTML = `${Number(starInput.value) * 2}점`;
      starRateDesc.innerHTML = STAR_RATE_STRING[Number(starInput.value)];

      setStarRateToStorage(Number(movieId), Number(starInput.value));
    });
  }

  fillStar(starContainer: NodeListOf<Element>, starInput: HTMLInputElement) {
    for (let i = 0; i <= starContainer.length; i++) {
      if (i + 1 <= Number(starInput.value))
        starContainer[i].classList.add("yellow");
      else starContainer[i]?.classList.remove("yellow");
    }
  }

  async render(movieId: number) {
    const header = $(".modal-header--text");
    const response = await getMovieInfoById(movieId);
    const movieDetail = convertMovieDetail(response);

    if (header instanceof HTMLElement) header.textContent = movieDetail.title;

    this.#$target.innerHTML = this.getMovieDetailTemplate(
      movieDetail,
      getStarRateFromStorage(movieId)
    );

    this.initSelectStarRate();
  }

  getMovieDetailTemplate(movie: MovieDetail, starRate: number) {
    return /*html */ `
        ${getImageContainerTemplate(movie.poster_path, movie.title)}
        ${getDescriptionTemplate(movie, starRate)}
    `;
  }
}
