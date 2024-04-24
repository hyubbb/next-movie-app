"use client";
import styles from "./like-section.module.scss";
import { useRecoilState } from "recoil";
import { likeTypeState } from "../../state/atom";
import { useEffect, useState } from "react";

export default function LikeType({ filteredData: data }) {
  const [likeData, _] = useState(data);
  const [likeTypeData, setLikeTypeData] = useRecoilState(likeTypeState);
  const handleType = (type: string) => {
    setLikeTypeData((prev) => {
      return { ...prev, type: type };
    });
  };

  useEffect(() => {
    setLikeTypeData((prev) => {
      return { data: data, type: "movie" };
    });
  }, []);

  return (
    <div className={styles.type}>
      <div
        onClick={() => handleType("movie")}
        className={
          likeTypeData.type === "movie" ? styles.active : styles.inActive
        }
      >
        <span>MOVIE</span>
        <span>{likeData["movie"]?.length}</span>
      </div>
      <div
        onClick={() => handleType("tv")}
        className={likeTypeData.type === "tv" ? styles.active : styles.inActive}
      >
        <span>TV</span>
        <span>{likeData["tv"]?.length}</span>
      </div>
    </div>
  );
}
