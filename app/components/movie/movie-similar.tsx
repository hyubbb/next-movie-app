import Link from "next/link";
import { API_URL, IMG_URL, MOVIE_SIMILAR, options } from "../../constants";
import styles from "../../styles/movie-similar.module.scss";
import Image from "next/image";

const getMovies = async ({ id, type }: { id: string; type: string }) => {
  const response = await fetch(
    `${API_URL}/${type}/${id}/similar?language=ko&region=KR`,
    options
  );
  const { results } = await response.json();
  return results;
};

export default async function MovieSimilar({
  id,
  type,
}: {
  id: string;
  type: string;
}) {
  const newType = type === "movie" ? "movies" : "tv";
  const movies = await getMovies({ id, type });

  return (
    <>
      <div className={styles.container}>
        {movies.map((movie) => {
          const { poster_path, title, name, id } = movie;
          return (
            <Link key={id} prefetch href={`/${newType}/${id}`}>
              <div className={styles.card}>
                {poster_path ? (
                  <Image
                    src={`${IMG_URL}${poster_path}`}
                    alt={title || name}
                    fill
                    sizes='300px'
                  />
                ) : (
                  <div className={styles.noImage}>no image</div>
                )}
                {title || name}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
