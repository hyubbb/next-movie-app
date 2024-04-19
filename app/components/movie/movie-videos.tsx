"use client";

import { API_URL, options } from "../../constants";
import styles from "../../styles/movie-videos.module.scss";
const getVideos = async (id: string, type: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const whatType = type === "movie" ? "movie" : "tv";
  const response = await fetch(
    `${API_URL}/${whatType}/${id}/videos?language=ko`,
    options
  );
  const { results } = await response.json();

  return results;
};

const MovieVideos = async ({ id, type }: { id: string; type: string }) => {
  const videos = await getVideos(id, type);
  if (videos.length === 0) {
    return <div className={styles.text}> 관련 데이터가 없습니다. </div>;
  }

  return (
    <>
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
        {/* {videos.length > 5 ? <div>더 보기</div> : ""} */}
      </div>
    </>
  );
};

export default MovieVideos;
