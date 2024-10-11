"use client";
import React from "react";
import Link from "next/link";
import { IMG_URL } from "@/app/constants";
import styles from "./movie-similar.module.scss";
import Image from "next/image";
import { ISimilarMovie } from "@/types/type";

export default function MovieSimilar({
  type,
  similarMovies,
}: {
  id: string;
  type: string;
  similarMovies: ISimilarMovie[];
}) {
  const newType = type === "movie" ? "movie" : "tv";
  return (
    <>
      <div className={styles.container}>
        {similarMovies.map((movie: ISimilarMovie) => {
          const { poster_path, title, name, id } = movie;

          return (
            <Link key={id} prefetch href={`/detail/${newType}/${id}`}>
              <div className={styles.card}>
                {poster_path ? (
                  <Image
                    src={`${IMG_URL}${poster_path}`}
                    alt={title || name || id + ""}
                    fill
                    sizes='300px'
                    quality={30}
                    priority={true}
                  />
                ) : (
                  <div className={styles.noImage}>no image</div>
                )}
                {title || name}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
