"use client";
import { useSetRecoilState } from "recoil";
import {
  isSearchOpenState,
  isSearchTerm,
  searchDataState,
} from "../state/atom";

import React, { useEffect } from "react";

const useCloseSearch = () => {
  const setIsSearchOpen = useSetRecoilState(isSearchOpenState);
  const setValue = useSetRecoilState(isSearchTerm);
  const setSearchData = useSetRecoilState(searchDataState);

  return () => {
    setIsSearchOpen(false);
    setValue("");
    setSearchData([]);
    document.body.style.overflow = "unset";
  };
};

export default useCloseSearch;
