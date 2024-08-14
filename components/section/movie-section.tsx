"use client";
import Movie from "../movie/movie";
import styles from "./movie-section.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperCores from "swiper";

import { useEffect, useState } from "react";
import { IMovie } from "../../types/type";
import { getTrendingMovies } from "../../actions/auth-actions";

export default function MovieSection({ type }) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  SwiperCores.use([Navigation, Autoplay, Pagination]);

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await getTrendingMovies(type);
      setMovies(fetchedMovies);
    };

    fetchMovies();
  }, [type]);

  return (
    <section className={`${styles.section} swiper-container`}>
      <h1>{type.toUpperCase()}</h1>
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
