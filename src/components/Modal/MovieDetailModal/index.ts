import "./index.css";

import type { MovieDetail } from "../../../types";

import {
  getStarRateFromStorage,
  setStarRateToStorage,
} from "../../../utils/storage";
import { $ } from "../../../utils/selector";
import { renderStars } from "./StarSelect";
import { getImageContainerTemplate } from "./Image";
import { getDescriptionTemplate } from "./Description";
import { convertMovieDetail, getMovieInfoById } from "../../../utils/api";

export class MovieDetailModal {
  #$target;

  constructor($target: Element) {
    this.#$target = $target;

    this.bindEvent();
  }

  bindEvent() {
    $(".modal-content").addEventListener("mouseover", (event: Event) => {
      if (
        !(
          event.target instanceof HTMLImageElement ||
          event.target instanceof HTMLSpanElement
        )
      )
        return;
      if (
        !(
          event.target.className === "star-rate-select-img" ||
          event.target.className === "select-zero-rate"
        )
      )
        return;

      const movieId = Number(event.target.dataset.movieId);
      const starRate = Number(event.target.dataset.starRate);

      if (getStarRateFromStorage(movieId) !== starRate) {
        renderStars(movieId, starRate);
        setStarRateToStorage(movieId, starRate);
      }
    });
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
  }

  getMovieDetailTemplate(movie: MovieDetail, starRate: number) {
    return /*html */ `
        ${getImageContainerTemplate(movie.poster_path, movie.title)}
        ${getDescriptionTemplate(movie, starRate)}
    `;
  }
}
