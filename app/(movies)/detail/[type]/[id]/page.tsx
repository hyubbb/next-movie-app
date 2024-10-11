import MovieInfo, { getMovie } from "@/components/movie/info/movie-info";
import MovieRelations from "@/components/movie/movie-relation";
import styles from "@/styles/movie.module.scss";

import {
  getRelateVideos,
  getSimilarMovies,
  queryLikeData,
} from "@/actions/auth-actions";
import { prefetchAndDehydrate } from "@/lib/queryClient";
interface IParams {
  params: { id: string; type: string };
}

export async function generateMetadata({ params: { id, type } }: IParams) {
  const { title } = await getMovie({ id, type: type });
  return {
    title: title,
  };
}

const fetchData = async (id: string, type: string) => {
  const response = await getRelateVideos(id, type);
  return response;
};

const Page = async ({ params: { id, type } }: IParams) => {
  const dehydratedState =
    (await prefetchAndDehydrate(["likesData"], queryLikeData(id))) ?? {};

  return (
    <div className={styles.container}>
      <MovieInfo id={id} type={type} query={dehydratedState} />
      <MovieRelations
        id={id}
        type={type}
        relatedMovies={await fetchData(id, type)}
        similarMovies={await getSimilarMovies({ id, type })}
      />
    </div>
  );
};

export default Page;
