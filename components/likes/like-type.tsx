"use client";
import styles from "./like-section.module.scss";
import { useRecoilState } from "recoil";
import { likeTypeState } from "../../state/atom";
import { useEffect, useState } from "react";
import { fetchByType, fetchLikeData } from "../../actions/auth-actions";
import { stringify } from "querystring";

export default function LikeType({ session }) {
  const [likeData, _] = useState();
  const [likeTypeData, setLikeTypeData] = useRecoilState(likeTypeState);
  const handleType = (type: string) => {
    setLikeTypeData((prev) => ({ ...prev, type: type }));
  };

  useEffect(() => {
    const fetchFunc = async () => {
      const fData = await fetchLikeData(session);
      if (fData) {
        const data = await fetchByType(JSON.parse(fData));
        setLikeTypeData({ data: data, type: "movie" });
      }
    };
    fetchFunc();
  }, []);

  useEffect(() => {
    if (likeData) {
      setLikeTypeData({ data: likeData, type: "movie" });
    }
  }, [likeData]);
  return (
    <div className={styles.type}>
      <div
        onClick={() => handleType("movie")}
        className={
          likeTypeData.type === "movie" ? styles.active : styles.inActive
        }
      >
        <span>MOVIE</span>
        <span>{likeTypeData.data["movie"]?.length}</span>
      </div>
      <div
        onClick={() => handleType("tv")}
        className={likeTypeData.type === "tv" ? styles.active : styles.inActive}
      >
        <span>TV</span>
        <span>{likeTypeData.data["tv"]?.length}</span>
      </div>
    </div>
  );
}
