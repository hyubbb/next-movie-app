"use client";
import styles from "./search.module.scss";
import InputField from "./inputFiled";
import { Suspense, useEffect, useRef, useState } from "react";
import useInput from "../../hooks/useInputs";
import { options } from "../../app/constants";
import MovieCard from "./movie-card";
import Genre from "./genre";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isSearchOpenState } from "../../state/atom";
import Spinner from "../commons/Spinner";
import { IoIosClose, IoIosSearch } from "react-icons/io";

export default function Search() {
  const { reset, setValue, debouncedValue, ...inputProps } = useInput("");
  const [searchData, setSearchData] = useState([]);
  const searchRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(isSearchOpenState);

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

  const openSearch = () => {
    setIsSearchOpen(!isSearchOpen);

    if (!isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };
  return (
    <>
      {isSearchOpen && (
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
      )}
      <button className={styles.searchIcon} onClick={openSearch}>
        {isSearchOpen ? <IoIosClose /> : <IoIosSearch />}
      </button>
    </>
  );
}
