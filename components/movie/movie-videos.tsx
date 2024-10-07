"use client";
import React, { useEffect, useState, useRef } from "react";
import { API_URL, options } from "@/app/constants";
import styles from "./movie-videos.module.scss";
import { IMovie, IVideo } from "@/types/type";

const MovieVideos = ({
  id,
  type,
  relatedMovies,
}: {
  id: string;
  type: string;
  relatedMovies: IVideo[];
}) => {
  if (relatedMovies.length === 0) {
    return <div className={styles.text}> 관련 데이터가 없습니다. </div>;
  }

  return (
    <div className={styles.container}>
      {relatedMovies.slice(0, 5).map((video) => (
        <iframe
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          title={video.name}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;'
          allowFullScreen
        />
      ))}
    </div>
  );
};

export default MovieVideos;
