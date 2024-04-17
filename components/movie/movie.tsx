"use client";

import Link from "next/link";
import styles from "../../styles/movie.module.css";
import { useRouter } from "next/navigation";
import { IMG_URL } from "../../app/constants";

interface IMovie {
  id: string;
  title: string;
  poster_path: string;
  name: string;
}

interface IMovieProps {
  movie: IMovie;
  type: string;
}

const Movie = ({ movie, type }: IMovieProps) => {
  const { id, title, poster_path, name } = movie;
  const whatType = type === "movie" ? "movies" : "tv";
  const router = useRouter();
  const onClick = () => {
    router.push(`/${whatType}/${id}`);
  };

  return (
    <div className={styles.movie}>
      <Link prefetch href={`/${whatType}/${id}`}>
        <img
          src={`${IMG_URL}${poster_path}`}
          alt={title || name}
          onClick={onClick}
        />
      </Link>
    </div>
  );
};

export default Movie;
