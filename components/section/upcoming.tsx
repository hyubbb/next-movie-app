"use client";
import styles from "../../styles/upcoming.module.scss";
import { API_URL, IMG_URL, options } from "../../app/constants";
// import Swiper bundle with all modules installed
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
// import styles bundle
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

export default async function Upcoming() {
  const movies = await getMovies();

  SwiperCore.use([Navigation, Autoplay, Pagination]);

  return (
    <section className={`${styles.section} swiper-container`}>
      {/* <h1>Upcoming</h1> */}
      <Swiper
        loop={true} // 슬라이드 루프
        spaceBetween={50} // 슬라이스 사이 간격
        slidesPerView={1} // 보여질 슬라이스 수
        pagination={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
        }}
      >
        {movies.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <div className={styles.movies}>
                <img src={`${IMG_URL}/${movie.backdrop_path}`} alt='' />
                {/* <div>{movie.title}</div> */}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
