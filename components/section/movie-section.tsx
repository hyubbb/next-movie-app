import Movie from "../movie/movie";
import styles from "../../styles/movie-section.module.css";
import { MOVIE_URL, TV_URL, options } from "../../app/constants";
import toTitleCase from "../../utils/toTitleCase";

const typeUrl = {
  movie: MOVIE_URL,
  tv: TV_URL,
};

const getMovies = async (type: string) => {
  try {
    const response = await fetch(typeUrl[type], options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export default async function MovieSection({ type }) {
  const movies = await getMovies(type);
  const typeText = toTitleCase(type);
  return (
    <section className={styles.section}>
      <h1>{typeText}</h1>
      <div className={styles.movies}>
        {movies.map((movie) => {
          return <Movie key={movie.id} movie={movie} type={type} />;
        })}
      </div>
    </section>
  );
}
