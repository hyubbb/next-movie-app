"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL, IMG_URL, options } from "@/app/constants";
import styles from "./movie-similar.module.scss";
import Image from "next/image";
import { IMovie } from "@/types/type";

const getMovies = async ({ id, type }: { id: string; type: string }) => {
  const response = await fetch(
    `${API_URL}/${type}/${id}/similar?language=ko&region=KR`,
    options
  );
  const { results } = await response.json();
  return results;
};

export default function MovieSimilar({
  id,
  type,
}: {
  id: string;
  type: string;
}) {
  const newType = type === "movie" ? "movies" : "tv";
  const [movies, setMovies] = useState<IMovie[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getMovies({ id, type });
      setMovies(response);
    };
    fetchData();
  }, [id, type]);

  return (
    <>
      <div className={styles.container}>
        {movies.map((movie: IMovie) => {
          const { poster_path, title, name, id } = movie;

          return (
            <Link key={id} prefetch href={`/${newType}/${id}`}>
              <div className={styles.card}>
                {poster_path ? (
                  <Image
                    src={`${IMG_URL}${poster_path}`}
                    alt={title || name}
                    fill
                    sizes='300px'
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
