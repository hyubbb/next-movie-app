import Link from "next/link";
import styles from "./navigation.module.scss";
import { FONT_SANS } from "../../utils/fonts";
import Search from "../search/search";
import Menu from "./menu/menu";
import { fetchSession } from "../../actions/auth-actions";
import { QueryClient, dehydrate } from "@tanstack/react-query";

export const Navigation = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["loginSession"],
    queryFn: async () => await fetchSession(),
  });
  // const session = queryClient.getQueryData(["loginSession"]);
  const session = dehydrate(queryClient);
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
