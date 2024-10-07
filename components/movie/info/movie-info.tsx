import React, { Suspense } from "react";

import { IMG_URL, MOVIE_DETAIL_URL, options } from "@/app/constants";
import styles from "./movie-info.module.scss";
import MovieCredits from "./movie-credits";
import getBase64 from "@/utils/getBase64";
import LikeButton from "@/components/likes/like-button";
import Loading from "@/app/(home)/loading";
import PosterImage from "./posterImage";
import Image from "next/image";
// MovieCredits 컴포넌트를 lazy로 로드
// const MovieCredits = React.lazy(() => import("./movie-credits"));

export const getMovie = async ({ id, type }: { id: string; type: string }) => {
  const response = await fetch(
    `${MOVIE_DETAIL_URL}/${type}/${id}?append_to_response=credits&language=ko`,
    options
  );
  return response.json();
  // const movie = await response.json();

  // if (movie.poster_path) {
  //   const base64Data = await getBase64(`${IMG_URL}${movie.poster_path}`);
  //   return { ...movie, base64Data };
  // }
  // return movie;
};

export default async function MovieInfo({ id, type, query }) {
  const movie = await getMovie({ id, type });

  const {
    title,
    poster_path,
    name,
    overview,
    homepage,
    vote_average,
    release_date,
    runtime,
    genres,
    credits,
    created_by,
    first_air_date,
  } = movie;

  let res = { width: 0, height: 0, base64: "" };

  if (poster_path) {
    res = await getBase64(`${IMG_URL}${poster_path}`);
  }
  return (
    <div className={styles.container}>
      <PosterImage
        title={title}
        name={name}
        poster_path={`${IMG_URL}${poster_path}`}
        res={res}
      />

      <div className={styles.info}>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>{title || name} </h1>
          <LikeButton movieId={id} type={type} query={query} />
        </div>

        <div className={styles.genres}>
          {genres.map((genre, idx) => {
            return (
              <React.Fragment key={idx}>
                <div className={styles.text} key={genre.id}>
                  {genre.name}
                </div>
                {idx !== genres.length - 1 && <span>{" ・ "}</span>}
              </React.Fragment>
            );
          })}
        </div>
        <div className={styles.description}>
          {vote_average > 0 && (
            <>
              <h3>⭐️{vote_average.toFixed(1)}</h3>
              <span>|</span>
            </>
          )}
          {release_date ? (
            <>
              <h3>{release_date}</h3>
              <span>|</span>
              <h3>{runtime}분</h3>
            </>
          ) : (
            <>
              <h3>{first_air_date}</h3>
              {created_by && created_by[0] && (
                <>
                  <span>|</span> <h3>감독 {created_by[0]?.original_name}</h3>
                </>
              )}
            </>
          )}
        </div>

        <div className={styles.overview}>{overview}</div>
        {homepage && (
          <a href={homepage} target={"_blank"}>
            website
          </a>
        )}

        {/* {credits && <MovieCredits credits={credits} />} */}

        {/* <Suspense fallback={<Loading />}>
          {credits && <MovieCredits credits={credits} />}
        </Suspense> */}
      </div>

      <Image
        className={styles.blurredBg}
        src={`${IMG_URL}${poster_path}`}
        alt={title}
        fill
        priority={false}
        sizes='300px'
      />
    </div>
  );
}
