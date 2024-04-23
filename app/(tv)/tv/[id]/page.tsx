import { Suspense } from "react";
import MovieRelations from "../../../../components/movie/movie-relation";
import styles from "../../../../styles/movie.module.scss";
import TvInfo, { getMovie } from "../../../../components/tv/tv-info";
import Spinner from "../../../../components/commons/Spinner";
interface IParams {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: IParams) {
  const { title } = await getMovie({ id, type: "tv" });
  return {
    title: title,
  };
}

const tvDetailPage = async ({ params: { id } }: IParams) => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Spinner />}>
        <TvInfo id={id} type={"tv"} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <MovieRelations id={id} type={"tv"} />
      </Suspense>
    </div>
  );
};

export default tvDetailPage;
