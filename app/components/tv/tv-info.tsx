import React, { Suspense } from "react";
import { API_URL, IMG_URL, MOVIE_DETAIL_URL, options } from "../../constants";
import styles from "../../styles/movie-info.module.scss";
import MovieCredits from "../movie/movie-credits";
import Image from "next/image";

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

  return (
    <div className={styles.container}>
      <Image
        className={styles.poster}
        src={`${IMG_URL}${poster_path}`}
        alt={title}
        fill
        sizes='300px'
      />
      <div className={styles.info}>
        <h1 className={styles.title}>{title || name}</h1>
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
        <div className={styles.infoCustom}>
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

        <Suspense fallback={<h1>Loading credits</h1>}>
          <MovieCredits id={id} credits={credits} />
        </Suspense>
      </div>

      <Image
        className={styles.blurredBg}
        src={`${IMG_URL}${poster_path}`}
        alt={title}
        fill
        sizes='300px'
      />
    </div>
  );
}
