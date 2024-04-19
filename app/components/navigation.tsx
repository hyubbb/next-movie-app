"use client";
import Link from "next/link";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import styles from "../styles/navigation.module.scss";
import { FONT_SANS } from "../utils/fonts";
import Search from "./search/search";
import { useRecoilState } from "recoil";
import { isSearchOpenState } from "../state/atom";

export const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(isSearchOpenState);

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
      <nav className={styles.nav}>
        <ul className={`${FONT_SANS.className} ${styles.logo}`}>
          <li>
            <Link href='/'>Next Movie</Link>
          </li>
          <li>
            <button className={styles.search} onClick={openSearch}>
              {isSearchOpen ? <IoIosClose /> : <IoIosSearch />}
            </button>
          </li>
        </ul>
      </nav>
      {isSearchOpen && <Search />}
    </>
  );
};
