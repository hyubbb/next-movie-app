"use client";
import Movie from "../movie/movie";
import styles from "./like-section.module.scss";
import { useRecoilValue } from "recoil";
import { likeTypeState } from "../../state/atom";
import { useEffect, useState } from "react";
import { IMovie } from "../../types/type";
import { fetchMovieData } from "../../actions/auth-actions";
const LikeCard = () => {
  const { data, type } = useRecoilValue(likeTypeState);
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const fetchFunk = async () => {
      const res = await fetchMovieData(data[type]);
      setMovies(res);
    };

    fetchFunk();
  }, [type, data]);

  return (
    <>
      {movies.length ? (
        <>
          <div className={styles.count}>좋아요한 컨텐츠</div>
          <div className={styles.contents}>
            <div className={styles.movies}>
              {movies.map((movie: IMovie) => {
                return <Movie key={movie.id} movie={movie} />;
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.zeroLike}>좋아하는 작품을 추가해보세요</div>
        </>
      )}
    </>
  );
};

export default LikeCard;
