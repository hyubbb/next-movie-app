"use client";
import Movie from "../movie/movie";
import styles from "./like-section.module.scss";
import { useRecoilValue } from "recoil";
import { likeTypeState } from "../../state/atom";
import { IMovie } from "../../types/type";

const LikeCard = () => {
  const { data, type } = useRecoilValue(likeTypeState) || {};

  if (!data || !type || !data[type]) {
    return <div className={styles.zeroLike}>좋아하는 작품을 추가해보세요</div>;
  }

  return (
    <>
      <div className={styles.count}>좋아요한 컨텐츠</div>
      <div className={styles.contents}>
        <div className={styles.movies}>
          {data[type].map((movie: IMovie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </div>
      </div>
    </>
  );
};

export default LikeCard;
