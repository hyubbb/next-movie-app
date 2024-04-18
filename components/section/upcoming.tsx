"use client";
import { API_URL, IMG_URL, options } from "../../app/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import styles from "../../styles/upcoming.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";

const getMovies = async () => {
  try {
    const response = await fetch(
      `${API_URL}/movie/upcoming?language=ko&page=1&region=kr`,
      options
    );
    const { results } = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};

export default function Upcoming() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovies();
      setMovies(data);
    };
    fetchMovie();
  }, []);

  // 이미지 없는 영화 필터
  const newMovie = movies.filter(({ backdrop_path }) => backdrop_path);
  return (
    <section className={`${styles.section} swiper-container`}>
      <h1>Upcoming Movie</h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        modules={[EffectCoverflow, Pagination]}
        loop={true}
        spaceBetween={20}
        slidesPerView={2}
        pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
      >
        {newMovie.map((movie) => {
          const { backdrop_path, overview, title, release_date, id } = movie;
          return (
            <SwiperSlide key={movie.id}>
              <Link prefetch href={`/movies/${id}`}>
                <img
                  src={`${IMG_URL}/${backdrop_path}`}
                  alt={title}
                  className={styles.img}
                />
                <div className={styles.desc}>
                  <div className={styles.title}>{title}</div>
                  <div className={styles.date}>개봉일 : {release_date}</div>
                  {/* <div className={styles.overview}>{overview}</div> */}
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
