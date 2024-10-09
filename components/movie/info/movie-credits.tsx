"use client";
import React from "react";
import { IMG_URL } from "@/app/constants";
import styles from "./movie-credits.module.scss";
import Image from "next/image";
import MovieCasts from "./movie-casts-more";
import { ICredit } from "@/types/type";

const MovieCredits = ({ credits }: { credits: ICredit }) => {
  const { cast: casts } = credits;

  return (
    <>
      {casts?.length > 0 && (
        <div className={styles.container}>
          <MovieCasts casts={credits.cast} />
          {casts.slice(0, 6).map((cast, idx) => {
            const { profile_path, name, character, imageData } = cast;

            return (
              <div key={idx} className={styles.credit}>
                {profile_path ? (
                  <Image
                    alt={name}
                    src={`${IMG_URL}${profile_path}`}
                    sizes='200px'
                    placeholder='blur'
                    width={imageData?.width || 200}
                    height={imageData?.height || 300}
                    blurDataURL={
                      imageData?.base64 ||
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
                    }
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
