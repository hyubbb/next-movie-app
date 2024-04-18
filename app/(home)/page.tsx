import Movie from "../../components/movie/movie";
import React, { Suspense } from "react";
import styles from "../../styles/home.module.css";
import { MOVIE_URL, options } from "../constants";
import MovieSection from "../../components/section/movie-section";
import Upcoming from "../../components/section/upcoming";
export const metadata = {
  title: "Home",
};

const getMovies = async () => {
  try {
    const response = await fetch(MOVIE_URL, options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export default async function HomePage() {
  const movies = await getMovies();

  return (
    <div className={styles.container}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Upcoming />
      </Suspense>
      <MovieSection type='movie' />
      <MovieSection type='tv' />
    </div>
  );
}
