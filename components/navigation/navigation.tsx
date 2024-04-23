// "use client";
import Link from "next/link";
import styles from "./navigation.module.scss";
import { FONT_SANS } from "../../utils/fonts";
import Search from "../search/search";
import Menu from "./menu/menu";
import { cookies } from "next/headers";
import { verifyIdToken } from "../../firebase/firebaseSdk";
import nookies from "nookies";

export const Navigation = async () => {
  const token = cookies().get("token")?.value || null;
  const decodedToken = await verifyIdToken(token);
  const session = token && decodedToken?.email;
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
