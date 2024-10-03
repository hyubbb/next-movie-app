"use client";

import { useEffect, useState } from "react";
import { options } from "@/app/constants";
import styles from "./genre.module.scss";

const getGenre = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=ko`,
    options
  );
  const { genres } = await response.json();
  return genres;
};

const getGenreMovie = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en&page=1&sort_by=popularity.desc&with_genres=${id}`,
    options
  );
  const { results } = await response.json();
  return results;
};

export default function Gene({ setSearchData }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchedGenre = async () => {
      const res = await getGenre();
      setGenres(res);
    };
    fetchedGenre();
  }, []);

  const handleClickGenre = async (id) => {
    const res = await getGenreMovie(id);
    setSearchData(res);
  };

  return (
    <div className={styles.container}>
      {genres.map(({ name, id }) => {
        return (
          <div
            key={id}
            className={styles.genre}
            onClick={() => handleClickGenre(id)}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
}
