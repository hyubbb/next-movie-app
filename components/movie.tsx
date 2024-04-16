"use client";

import Link from "next/link";
import styles from "../styles/movie.module.css";
import { useRouter } from "next/navigation";

interface IMovie {
  id: string;
  title: string;
  poster_path: string;
}

interface IMovieProps {
  movie: IMovie;
}

const Movie = ({ movie }: IMovieProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`movies/${id}`);
  };
  const { id, title, poster_path } = movie;
  return (
    <div className={styles.movie}>
      <img src={poster_path} alt={title} onClick={onClick} />
      <Link href={`/movies/${id}`}>{title}</Link>
    </div>
  );
};

export default Movie;
