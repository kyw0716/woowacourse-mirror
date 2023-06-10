import type { MovieResponse, Movie } from "../types";

export class Movies {
  #list: Movie[];
  #currentList: Movie[];

  constructor(list: MovieResponse[]) {
    const convertedList = this.convertResponseToMovieData(list);

    this.#list = convertedList;
    this.#currentList = convertedList;
  }

  getList(): Movie[] {
    return [...this.#list];
  }

  getCurrentList(): Movie[] {
    return [...this.#currentList];
  }

  add(list: MovieResponse[]) {
    const convertedList = this.convertResponseToMovieData(list);

    this.#list = [...this.#list, ...convertedList];
    this.#currentList = convertedList;
  }

  reset(list: MovieResponse[]) {
    const convertedList = this.convertResponseToMovieData(list);

    this.#list = convertedList;
    this.#currentList = convertedList;
  }

  convertResponseToMovieData(list: MovieResponse[]): Movie[] {
    return list.map((data): Movie => {
      return {
        id: data.id,
        poster_path: data.poster_path,
        title: data.title,
        vote_average: data.vote_average,
      };
    });
  }
}
