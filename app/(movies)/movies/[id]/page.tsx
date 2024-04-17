import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie/movie-info";
import MovieVideos from "../../../../components/movie/movie-videos";
import MovieRelations from "../../../../components/detail/movie-relation";
import styles from "../../../../styles/movie-detail.module.scss";
interface IParams {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: IParams) {
  const { title } = await getMovie({ id, type: "movie" });
  return {
    title: title,
  };
}

const movieDetailPage = async ({ params: { id } }: IParams) => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} type={"movie"} />
      </Suspense>
      <MovieRelations id={id} type={"movie"} />
    </div>
  );
};

export default movieDetailPage;
