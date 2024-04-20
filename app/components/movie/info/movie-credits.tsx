import React, { Suspense, useState } from "react";
import { IMG_URL } from "../../../constants";
import styles from "../../../styles/movie-credits.module.scss";
import Image from "next/image";
import MovieCasts from "./movie-casts-more";
import Spinner from "../../commons/Spinner";
import getBase64 from "../../../utils/getBase64";

const MovieCredits = ({ id, credits }) => {
  const { cast: casts } = credits;
  const castCnt = casts.length > 6 ? 6 : casts.length;

  return (
    <>
      {casts.length > 0 && (
        <div className={styles.container}>
          <MovieCasts casts={casts} />
          {casts.slice(0, castCnt).map(async (cast, idx) => {
            const { profile_path, name, character } = cast;
            const {
              base64,
              img: { width, height },
            } = await getBase64(`${IMG_URL}${profile_path}`);

            return (
              <div key={idx} className={styles.credit}>
                {profile_path ? (
                  <Image
                    alt={name}
                    src={`${IMG_URL}${profile_path}`}
                    width={width}
                    height={height}
                    sizes='200px'
                    placeholder='blur'
                    blurDataURL={base64}
                  />
                ) : (
                  <div className={styles.noImage}>no image</div>
                )}
                <div className={styles.characterName}>{character}</div>
                <div className={styles.name}>{name}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MovieCredits;
