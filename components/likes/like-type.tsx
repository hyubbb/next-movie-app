"use client";
import styles from "./like-section.module.scss";
import { useRecoilState } from "recoil";
import { likeTypeState } from "../../state/atom";

export default function LikeType({ filteredData }) {
  const [likeTypeData, setLikeTypeData] = useRecoilState<string>(likeTypeState);
  const handleType = (type: string) => {
    setLikeTypeData(type);
  };

  return (
    <div className={styles.type}>
      <div
        onClick={() => handleType("movie")}
        className={likeTypeData === "movie" ? styles.active : styles.inActive}
      >
        <span>MOVIE</span>
        <span>{filteredData["movie"]?.length}</span>
      </div>
      <div
        onClick={() => handleType("tv")}
        className={likeTypeData === "tv" ? styles.active : styles.inActive}
      >
        <span>TV</span>
        <span>{filteredData["tv"]?.length}</span>
      </div>
    </div>
  );
}
