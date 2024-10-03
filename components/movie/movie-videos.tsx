"use client";
import React, { useEffect, useState } from "react";
import { API_URL, options } from "@/app/constants";
import styles from "./movie-videos.module.scss";
import { IVideo } from "@/types/type";

const getVideos = async (id: string, type: string) => {
  const whatType = type === "movie" ? "movie" : "tv";
  const response = await fetch(
    `${API_URL}/${whatType}/${id}/videos?language=ko`,
    options
  );
  const { results } = await response.json();

  return results;
};

const MovieVideos = ({
  id,
  type,
  emptyVideo,
  handlerEmptyVideo,
}: {
  id: string;
  type: string;
  emptyVideo: boolean;
  handlerEmptyVideo: () => void;
}) => {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getVideos(id, type);
      setVideos(response);
    };
    if (emptyVideo) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (emptyVideo && videos.length === 0) {
      handlerEmptyVideo();
    }
  }, [videos, emptyVideo]);

  if (videos.length === 0) {
    return <div className={styles.text}> 관련 데이터가 없습니다. </div>;
  }

  return (
    <div className={styles.container}>
      {videos.map((video, idx) => {
        if (idx < 5) {
          return (
            <iframe
              key={video.id}
              src={`https://youtube.com/embed/${video.key}`}
              title={video.name}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;'
              allowFullScreen
            />
          );
        }
      })}
    </div>
  );
};

export default MovieVideos;
