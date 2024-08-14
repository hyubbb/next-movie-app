import React, { Suspense } from "react";
import styles from "../../styles/home.module.scss";
import MovieSection from "../../components/section/movie-section";
import Upcoming from "../../components/section/upcoming";
import Spinner from "../../components/commons/Spinner";
export const metadata = {
  title: "Home!",
};

export default async function HomePage() {
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
