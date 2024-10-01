import React from "react";
import Image from "next/image";

import { IMG_URL, MOVIE_DETAIL_URL, options } from "../../../app/constants";
import styles from "./movie-info.module.scss";
import MovieCredits from "./movie-credits";
import getBase64 from "../../../utils/getBase64";
import LikeButton from "../../likes/like-button";

export const getMovie = async ({ id, type }: { id: string; type: string }) => {
  const response = await fetch(
    `${MOVIE_DETAIL_URL}/${type}/${id}?append_to_response=credits&language=ko`,
    options
  );

  return response.json();
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
      {poster_path ? (
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
      ) : (
        <div className={styles.noImage}>no image</div>
      )}

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
