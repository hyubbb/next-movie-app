import styles from "../../styles/search.module.scss";

import InputField from "./inputFiled";
import { Suspense, useEffect, useRef, useState } from "react";
import useInput from "../../hooks/useInputs";
import { options } from "../../constants";
import MovieCard from "./movie-card";
import Genre from "./genre";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useSetRecoilState } from "recoil";
import { isSearchOpenState } from "../../state/atom";
import Spinner from "../commons/Spinner";

export default function Search() {
  const { reset, setValue, debouncedValue, ...inputProps } = useInput("");
  const [searchData, setSearchData] = useState([]);
  const searchRef = useRef(null);
  const setIsSearchOpen = useSetRecoilState(isSearchOpenState);

  useOutsideClick(searchRef, () => {
    setIsSearchOpen((prev) => !prev);
    document.body.style.overflow = "unset";
    setValue("");
  });

  const handlerSearch = async () => {
    const searchData = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${debouncedValue}&include_adult=false&language=ko&page=1`,
      options
    );
    const { results } = await searchData.json();
    setSearchData(results);
  };

  useEffect(() => {
    handlerSearch();
  }, [debouncedValue]);

  return (
    <div className={styles.container}>
      <div className={styles.searchBox} ref={searchRef}>
        <InputField inputProps={inputProps} />
        <Suspense fallback={<Spinner />}>
          <Genre setSearchData={setSearchData} />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <MovieCard movies={searchData} />
        </Suspense>
      </div>
    </div>
  );
}