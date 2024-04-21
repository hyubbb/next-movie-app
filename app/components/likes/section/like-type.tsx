"use client";
import { useState } from "react";
import styles from "../../styles/like-section.module.scss";
export default function LikeType() {
  const [likeType, setLikeType] = useState("movie");
  const [isActive, setIsActive] = useState(true);
  const handleType = (type: string) => {
    setLikeType(type);
    const newType = type === "movie" ? true : false;
    setIsActive(newType);
  };

  return (
    <div className={styles.type}>
      <div
        onClick={() => handleType("movie")}
        className={isActive ? styles.active : styles.inActive}
      >
        <span>MOVIE</span>
        <span>{filteredData["movie"]?.length}</span>
      </div>
      <div
        onClick={() => handleType("tv")}
        className={!isActive ? styles.active : styles.inActive}
      >
        <span>TV</span>
        <span>{filteredData["tv"]?.length}</span>
      </div>
    </div>
  );
}
