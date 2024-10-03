"use client";
import React, { Suspense, useEffect, useState } from "react";
import MovieVideos from "./movie-videos";
import styles from "./movie-relation.module.scss";
import Spinner from "@/components/commons/Spinner";

// 버튼을 눌러야지 활성화 되므로 lazy처리를 하여 코드스플리팅
const LazySimilar = React.lazy(() => import("./movie-similar"));

export default function MovieRelations({ id, type }) {
  const [isActive, setIsActive] = useState(true);
  const handlerBtn = (type: boolean) => {
    setIsActive(type);
  };

  const Button = ({ type, children }) => {
    return (
      <div
        className={isActive == type ? styles.active : styles.inActive} // type에 따라 다르게 활성화
        onClick={() => handlerBtn(type)}
      >
        {children}
      </div>
    );
  };

  return (
    <>
      <div className={styles.relationBtn}>
        <Button type={true}>관련 영상</Button>
        <Button type={false}>비슷한 컨텐츠</Button>
      </div>

      <div>
        <Suspense fallback={<Spinner />}>
          {isActive ? (
            <MovieVideos id={id} type={type} />
          ) : (
            <LazySimilar id={id} type={type} />
          )}
        </Suspense>
      </div>
    </>
  );
}
