"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "../styles/navigation.module.css";

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href='/'>Next Movie</Link>
        </li>
      </ul>
    </nav>
  );
};
