"use client";

import { Suspense, useState } from "react";
import MovieVideos from "./movie-videos";
import styles from "../../styles/movie-relation.module.scss";
import MovieSimilar from "./movie-similar";
import Spinner from "../commons/Spinner";

export default function MovieRelations({ id, type }) {
  const [isActive, setIsActive] = useState(true);

  const handlerBtn = (type) => {
    const newType = type || false;
    setIsActive(newType);
  };

  return (
    <>
      <div className={styles.relationBtn}>
        <div
          className={isActive ? styles.active : styles.inActive}
          onClick={() => handlerBtn(true)}
        >
          관련 영상
        </div>
        <div
          className={!isActive ? styles.active : styles.inActive}
          onClick={() => handlerBtn(false)}
        >
          비슷한 컨텐츠
        </div>
      </div>

      <div>
        {isActive ? (
          <Suspense fallback={<Spinner />}>
            <MovieVideos id={id} type={type} />
          </Suspense>
        ) : (
          <Suspense fallback={<Spinner />}>
            <MovieSimilar id={id} type={type} />
          </Suspense>
        )}
      </div>
    </>
  );
}
