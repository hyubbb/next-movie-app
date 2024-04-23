"use client";
import Movie from "../movie/movie";
import styles from "./movie-section.module.scss";
import { MOVIE_URL, TV_URL, options } from "../../app/constants";
import toTitleCase from "../../utils/toTitleCase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperCores from "swiper";

import { useEffect, useState } from "react";
import { IMovie } from "../../types/type";

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
  const [movies, setMovies] = useState<IMovie[]>([]);
  // const toUpperType = toTitleCase(type);
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
      <h1>{type}</h1>
      <Swiper
        navigation
        modules={[Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          780: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
        }}
      >
        <div className={`${styles.movies} swiper-wrapper`}>
          {movies.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <Movie movie={movie} />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </section>
  );
}
