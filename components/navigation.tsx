"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav>
      <ul>
        <li>
          <Link href='/'>Home</Link>
          {pathname === "/" ? "⚙︎" : ""}
        </li>
        <li>
          <Link href='/about-us'>About Us</Link>
          {pathname === "about-us" ? "⚙︎" : ""}
        </li>
      </ul>
    </nav>
  );
};
