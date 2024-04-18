export const TOKKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjFlZmRiZTc3YWIzNWIzYzNjMGY5YThmYTM0ZTc4OSIsInN1YiI6IjY2MWU0YjMyOTY2NzBlMDE2M2Q4Y2MxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5a3XfKkQzt9NUZ6nZokIbGFT6AGHJhpERDYGJ6HYtGs";

export const API_URL = "https://api.themoviedb.org/3";
export const MOVIE_URL = `https://api.themoviedb.org/3/trending/movie/week?language=ko&region=KR`;
export const TV_URL = `https://api.themoviedb.org/3/trending/tv/week?language=ko&region=KR`;
export const MOVIE_SIMILAR = `https://api.themoviedb.org/3/movie`;
export const TV_SIMILAR = `https://api.themoviedb.org/3/tv`;
export const IMG_URL = `https://image.tmdb.org/t/p/w1280`;

export const MOVIE_DETAIL_URL = `https://api.themoviedb.org/3`;

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: TOKKEN,
  },
};
