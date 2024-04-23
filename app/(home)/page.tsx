import React, { Suspense } from "react";
import styles from "../../styles/home.module.scss";
import { MOVIE_URL, options } from "../constants";
import MovieSection from "../../components/section/movie-section";
import Upcoming from "../../components/section/upcoming";
import Spinner from "../../components/commons/Spinner";
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
      <Suspense fallback={<Spinner />}>
        <Upcoming />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <MovieSection type='movie' />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <MovieSection type='tv' />
      </Suspense>
    </div>
  );
}
