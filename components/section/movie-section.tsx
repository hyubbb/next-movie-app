"use client";
import Movie from "../movie/movie";
import styles from "../../styles/movie-section.module.scss";
import { MOVIE_URL, TV_URL, options } from "../../app/constants";
import toTitleCase from "../../utils/toTitleCase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperCores from "swiper";

import { useEffect, useState } from "react";

const typeUrl = {
  movie: MOVIE_URL,
  tv: TV_URL,
};

const getMovies = async (type: string) => {
  try {
    const response = await fetch(typeUrl[type], options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export default function MovieSection({ type }) {
  const [movies, setMovies] = useState([]);
  const toUpperType = toTitleCase(type);
  SwiperCores.use([Navigation, Autoplay, Pagination]);

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await getMovies(type);
      setMovies(fetchedMovies);
    };

    fetchMovies();
  }, [type]);

  return (
    <section className={`${styles.section} swiper-container`}>
      <h1>{toUpperType}</h1>
      <Swiper
        spaceBetween={20}
        slidesPerView={7}
        navigation
        modules={[Navigation]}
      >
        <div className={`${styles.movies} swiper-wrapper`}>
          {movies.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <Movie key={movie.id} movie={movie} type={type} />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </section>
  );
}
