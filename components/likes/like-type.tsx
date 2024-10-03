"use client";
import styles from "./like-section.module.scss";
import { useRecoilState } from "recoil";
import { likeTypeState } from "@/state/atom";
import { useEffect } from "react";
import { hydrate, useQueryClient } from "@tanstack/react-query";
import { ILikeTypeStateType } from "@/types/type";

export default function LikeType({ query }) {
  const queryClient = useQueryClient();
  const [likeTypeData, setLikeTypeData] =
    useRecoilState<ILikeTypeStateType>(likeTypeState);
  const handleType = (type: string) => {
    setLikeTypeData((prev) => ({ ...prev, type: type }));
  };

  useEffect(() => {
    const fetchFunc = async () => {
      // 캐시 상태 복원hydrate
      hydrate(queryClient, query);
      const likeDataByType: ILikeTypeStateType["data"] | undefined =
        queryClient.getQueryData(["likesPageData"]);
      likeDataByType &&
        setLikeTypeData({ data: likeDataByType, type: "movie" });
    };
    fetchFunc();
  }, [query]);

  return (
    <div className={styles.type}>
      <div
        onClick={() => handleType("movie")}
        className={
          likeTypeData.type === "movie" ? styles.active : styles.inActive
        }
      >
        <span>MOVIE</span>
        <span>{likeTypeData.data["movie"]?.length || 0}</span>
      </div>
      <div
        onClick={() => handleType("tv")}
        className={likeTypeData.type === "tv" ? styles.active : styles.inActive}
      >
        <span>TV</span>
        <span>{likeTypeData.data["tv"]?.length || 0}</span>
      </div>
    </div>
  );
}
