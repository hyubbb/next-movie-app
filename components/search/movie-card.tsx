import Movie from "@/components/movie/movie";

import styles from "./search.module.scss";
import { IMovie } from "@/types/type";
export default function MovieCard({ movies }: { movies: IMovie[] }) {
  return (
    <div className={styles.movies}>
      {movies?.map((movie) => {
        return <Movie key={movie.id} movie={movie} />;
      })}
    </div>
  );
}
