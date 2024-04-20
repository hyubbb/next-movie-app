import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../components/movie/info/movie-info";
import MovieRelations from "../../../components/movie/movie-relation";
import styles from "../../../styles/movie-detail.module.scss";
import Spinner from "../../../components/commons/Spinner";
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
      <Suspense fallback={<Spinner />}>
        <MovieInfo id={id} type={"movie"} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <MovieRelations id={id} type={"movie"} />
      </Suspense>
    </div>
  );
};

export default movieDetailPage;
