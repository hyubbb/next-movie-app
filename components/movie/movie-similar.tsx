import { API_URL, IMG_URL, MOVIE_SIMILAR, options } from "../../app/constants";
import styles from "../../styles/movie-similar.module.scss";
const getVideos = async ({ id, type }: { id: string; type: string }) => {
  const whatType = type === "movie" ? "movie" : "tv";
  const response = await fetch(
    `${API_URL}/${whatType}/${id}/similar?language=ko&region=KR`,
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
  const videos = await getVideos({ id, type });

  return (
    <>
      <div className={styles.container}>
        {videos.map((video, idx) => {
          console.log(video);
          const { poster_path, title, name, id } = video;
          return (
            <div key={id} className={styles.card}>
              {poster_path ? (
                <img src={`${IMG_URL}${poster_path}`} alt={title}></img>
              ) : (
                <div className={styles.noImage}>no image</div>
              )}
              {title || name}
            </div>
          );
        })}
      </div>
    </>
  );
}
