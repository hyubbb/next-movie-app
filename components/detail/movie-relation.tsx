"use client";

import { Suspense, useState } from "react";
import MovieVideos from "../movie/movie-videos";
import styles from "../../styles/movie-relation.module.scss";
import MovieSimilar from "../movie/movie-similar";

export default function MovieRelations({ id, type }) {
  const [isActive, setIsActive] = useState(true);

  const handlerBtn = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className={styles.relationBtn}>
        <div
          className={isActive ? styles.active : styles.inActive}
          onClick={handlerBtn}
        >
          관련 영상
        </div>
        <div
          className={!isActive ? styles.active : styles.inActive}
          onClick={handlerBtn}
        >
          비슷한 컨텐츠
        </div>
      </div>

      <div>
        {isActive ? (
          <Suspense fallback={<h1>Loading video video</h1>}>
            <MovieVideos id={id} type={type} />
          </Suspense>
        ) : (
          <Suspense fallback={<h1>Loading similar video</h1>}>
            <MovieSimilar id={id} type={type} />
          </Suspense>
        )}
      </div>
    </>
  );
}
