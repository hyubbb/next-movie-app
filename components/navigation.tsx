"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "../styles/navigation.module.css";

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href='/'>Movie</Link>
        </li>
        {/* <li>
          <Link href='/about-us'>About Us </Link>
          {pathname === "/about-us" ? "⚙︎" : ""}
        </li> */}
      </ul>
    </nav>
  );
};
