import { Suspense } from "react";
import MovieRelations from "../../../components/detail/movie-relation";
import styles from "../../../styles/movie-detail.module.scss";
import TvInfo, { getMovie } from "../../../components/tv/tv-info";
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
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <TvInfo id={id} type={"tv"} />
      </Suspense>
      <MovieRelations id={id} type={"tv"} />
    </div>
  );
};

export default tvDetailPage;
