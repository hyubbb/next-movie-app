"use client";

import Link from "next/link";
import styles from "../../styles/movie.module.scss";
import { useRouter } from "next/navigation";
import { IMG_URL } from "../../constants";
import { useSetRecoilState } from "recoil";
import { isSearchOpenState, isSearchTerm } from "../../state/atom";
import { IMovie } from "../../types/type";
import Image from "next/image";

interface IMovieProps {
  movie: IMovie;
}

const Movie = ({ movie }: IMovieProps) => {
  const { id, title, poster_path, name, media_type } = movie;
  const setIsSearchOpen = useSetRecoilState(isSearchOpenState);
  const setValue = useSetRecoilState(isSearchTerm);
  const whatType = media_type === "tv" ? "tv" : "movies";
  const router = useRouter();
  const onClick = () => {
    router.push(`/${whatType}/${id}`);
    setIsSearchOpen(false);
    setValue("");
    document.body.style.overflow = "unset";
  };

  return (
    <div className={styles.movie}>
      <Link prefetch href={`/${whatType}/${id}`}>
        <Image
          src={`${IMG_URL}${poster_path}`}
          alt={title || name}
          fill
          sizes='300px'
          onClick={onClick}
        />
      </Link>
    </div>
  );
};

export default Movie;
