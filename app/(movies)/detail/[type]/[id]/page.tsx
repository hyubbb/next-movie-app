import { Suspense } from "react";
import MovieInfo, {
  getMovie,
} from "../../../../../components/movie/info/movie-info";
import MovieRelations from "../../../../../components/movie/movie-relation";
import styles from "../../../../../styles/movie.module.scss";
import Spinner from "../../../../../components/commons/Spinner";

import { queryLikeData } from "../../../../../actions/auth-actions";
import { prefetchAndDehydrate } from "../../../../../lib/queryClient";
interface IParams {
  params: { id: string; type: string };
}

export async function generateMetadata({ params: { id, type } }: IParams) {
  const { title } = await getMovie({ id, type: type });
  return {
    title: title,
  };
}

const Page = async ({ params: { id, type } }: IParams) => {
  const dehydratedState = await prefetchAndDehydrate(
    ["likesData"],
    queryLikeData(id)
  );

  return (
    <div className={styles.container}>
      <Suspense fallback={<Spinner />}>
        <MovieInfo id={id} type={type} query={dehydratedState} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <MovieRelations id={id} type={type} />
      </Suspense>
    </div>
  );
};

export default Page;
