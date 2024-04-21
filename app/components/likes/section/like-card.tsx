"use client";
import { useEffect, useState } from "react";
import { MOVIE_DETAIL_URL, options } from "../../../constants";
import Movie from "../../movie/movie";
import styles from "../../../styles/like-section.module.scss";
import { ILike, IMovie } from "../../../types/type";
const getMovie = async ({ id, type }: { id: string; type: string }) => {
  const response = await fetch(
    `${MOVIE_DETAIL_URL}/${type}/${id}?append_to_response=credits&language=ko`,
    options,
  );

  return response.json();
};
export default function LikeCard({
  data,
  type,
}: {
  data: ILike[];
  type: string;
}) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const promises = data.map((like) =>
        getMovie({ id: like.movieId, type: like.type }),
      );
      const movies = await Promise.all(promises);
      setMovies(movies);
    };

    fetchMovies();
  }, [data]);
  return (
    <div className={styles.movies}>
      {movies?.map((movie) => {
        return <Movie key={movie.id} movie={movie} type={type} />;
      })}
    </div>
  );
}
