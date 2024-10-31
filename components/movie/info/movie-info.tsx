import React from "react";

import { IMG_URL } from "@/app/constants";
import styles from "./movie-info.module.scss";
import MovieCredits from "./movie-credits";
import LikeButton from "@/components/likes/like-button";
import PosterImage from "./posterImage";
import Image from "next/image";
import { getMovieInfoWithCredits } from "@/actions/auth-actions";

export const getMovie = async ({ id, type }: { id: string; type: string }) => {
  const movie = await getMovieInfoWithCredits({ id, type });

  // let posterImageData;
  // if (movie.poster_path) {
  //   posterImageData = await getBase64(`${IMG_URL}${movie.poster_path}`);
  //   movie.blurredBg = posterImageData;
  // }

  // credits 이미지 blur 처리부분 , 하지만 비동기 처리의 속도지연 떄문에
  // 굳이 하지 않아도 될 것 같다는 판단.

  // if (movie.credits && movie.credits.cast) {
  //   // 포스터 이미지 처리
  //   const processedCast = await Promise.all(
  //     movie.credits.cast.slice(0, 6).map(async (cast) => {
  //       if (cast.profile_path) {
  //         const res = await getBase64(`${IMG_URL}${cast.profile_path}`);
  //         return { ...cast, imageData: res };
  //       }
  //       return cast;
  //     })
  //   );

  //   movie.credits.cast = processedCast;
  // }

  return movie;
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

  return (
    <div className={styles.container}>
      <PosterImage
        title={title}
        name={name}
        poster_path={`${IMG_URL}${poster_path}`}
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

        {credits && <MovieCredits credits={credits} />}
      </div>

      <Image
        className={styles.blurredBg}
        src={`${IMG_URL}${poster_path}`}
        alt={title || name}
        priority={true}
        sizes='300px'
        fill
        // placeholder='blur'
        // width={movie.blurredBg.width}
        // height={movie.blurredBg.height}
        // blurDataURL={movie.blurredBg.base64}
      />
    </div>
  );
}
