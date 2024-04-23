import React, { Suspense } from "react";
import { IMG_URL, MOVIE_DETAIL_URL, options } from "../../app/constants";
import styles from "./tv-info.module.scss";
import MovieCredits from "../movie/info/movie-credits";
import Image from "next/image";
import Spinner from "../commons/Spinner";
import getBase64 from "../../utils/getBase64";
import LikeButton from "../likes/like-button";

export const getMovie = async ({ id, type }: { id: string; type: string }) => {
  const response = await fetch(
    `${MOVIE_DETAIL_URL}/${type}/${id}?append_to_response=credits&language=ko`,
    options
  );
  return response.json();
};

export default async function TvInfo({ id, type }) {
  const movie = await getMovie({ id, type });

  const {
    title,
    poster_path,
    name,
    overview,
    homepage,
    vote_average,
    first_air_date,
    genres,
    credits,
    created_by,
  } = movie;

  let res = { width: 0, height: 0, base64: "" };
  if (poster_path) {
    res = await getBase64(`${IMG_URL}${poster_path}`);
  }

  return (
    <div className={styles.container}>
      <Image
        className={styles.poster}
        src={`${IMG_URL}${poster_path}`}
        alt={title || name}
        priority={true}
        width={res.width}
        height={res.height}
        sizes='500px'
        placeholder='blur'
        blurDataURL={res.base64}
      />
      <div className={styles.info}>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>{title || name} </h1>
          <LikeButton movieId={id} type={type} />
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
          <h3>{first_air_date}</h3>
          {created_by[0] && (
            <>
              <span>|</span> <h3>감독 {created_by[0]?.original_name}</h3>
            </>
          )}
        </div>
        <div className={styles.overview}>{overview}</div>
        {homepage && (
          <a href={homepage} target={"_blank"}>
            website
          </a>
        )}

        <Suspense fallback={<Spinner />}>
          <MovieCredits credits={credits} />
        </Suspense>
      </div>

      <Image
        className={styles.blurredBg}
        src={`${IMG_URL}${poster_path}`}
        alt={title || name}
        fill
        sizes='500px'
      />
    </div>
  );
}
