import type { MovieDetail, MovieDetailResponse } from "../types";

const API_END_POINT = "https://api.themoviedb.org/3";

export const request = async (url: string) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      return response.json();
    }

    if (400 <= response.status && response.status < 500)
      alert("요청하신 정보를 찾을 수 없습니다!");
    if (500 <= response.status) alert("서버에서 오류가 발생했습니다!");
  } catch (error: any) {
    if (error.message === "Failed to fetch")
      alert("네트워크 연결이 종료되었습니다.");
  }
};

export const getMovieInfoById = async (movieId: number) => {
  const url = `${API_END_POINT}/movie/${movieId}?api_key=${process.env.API_KEY}&language=ko`;
  const response = await request(url);

  return response;
};

export const getPopularMovies = async (page: number) => {
  const url = `${API_END_POINT}/movie/popular?api_key=${process.env.API_KEY}&language=ko&page=${page}`;
  const response = await request(url);

  return response;
};

export const getSearchResult = async (page: number, searchKeyword: string) => {
  const url = `${API_END_POINT}/search/movie?api_key=${
    process.env.API_KEY
  }&language=ko&page=${page}&query=${encodeURI(searchKeyword)}`;
  const response = await request(url);

  return response;
};

export const convertMovieDetail = (
  movieDetail: MovieDetailResponse
): MovieDetail => {
  return {
    id: movieDetail.id,
    poster_path: movieDetail.poster_path,
    title: movieDetail.title,
    vote_average: movieDetail.vote_average,
    genre: movieDetail.genres.map((data) => data.name),
    overview: movieDetail.overview,
  };
};
