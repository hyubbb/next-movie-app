// "use client";
import Link from "next/link";
import styles from "./navigation.module.scss";
import { FONT_SANS } from "../../utils/fonts";
import Search from "../search/search";
import Menu from "./menu/menu";
import { fetchSession } from "../../actions/auth-actions";

export const Navigation = async () => {
  const session = await fetchSession();
  return (
    <>
      <nav className={styles.nav}>
        <ul className={` ${styles.logo}`}>
          <li className={`${FONT_SANS.className}`}>
            <Link href='/'>Next Movie</Link>
          </li>
          <li>
            <Search />
            <Menu session={session} />
          </li>
        </ul>
      </nav>
    </>
  );
};
