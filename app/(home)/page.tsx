import Movie from "../../components/movie";
import React from "react";
import styles from "../../styles/home.module.css";
export const metadata = {
  title: "Home",
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";
const getMovies = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div className={styles.container}>
      {movies.map((movie) => {
        return <Movie key={movie.key} movie={movie} />;
      })}
    </div>
  );
}
