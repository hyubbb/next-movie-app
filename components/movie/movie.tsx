"use client";
import styles from "../../styles/movie.module.scss";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isSearchOpenState,
  isSearchTerm,
  likeTypeState,
  searchDataState,
} from "../../state/atom";
import { IMovie } from "../../types/type";
import Image from "next/image";
import { IMG_URL } from "../../app/constants";
import useCloseSearch from "../../hooks/closeSearch";

const Movie = ({ movie }: { movie: IMovie }) => {
  const { id, title, poster_path, name, media_type } = movie;

  const { type: likeType } = useRecoilValue(likeTypeState);
  const whatType = media_type || likeType;
  const typeCheck = whatType === "movie" ? "movies" : "tv";
  const router = useRouter();
  const close = useCloseSearch();
  const onClick = () => {
    close();
    router.push(`/${typeCheck}/${id}`);
  };

  return (
    <div className={styles.movie}>
      <Image
        src={`${IMG_URL}${poster_path}`}
        alt={title || name}
        fill
        sizes='300px'
        onClick={onClick}
      />
    </div>
  );
};

export default Movie;
