"use server";
import Link from "next/link";
import styles from "./navigation.module.scss";
import { FONT_SANS } from "@/utils/fonts";
import Search from "@/components/search/search";
import Menu from "./menu/menu";
import { fetchSession } from "@/actions/auth-actions";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { prefetchAndDehydrate } from "@/lib/queryClient";

export const Navigation = async () => {
  const queryClient = new QueryClient();
  // 서버사이드 렌더링 시 로그인 세션 데이터 미리가져오기
  // await queryClient.prefetchQuery({
  //   queryKey: ["loginSession"],
  //   initialData: {},
  //   queryFn: async () => await fetchSession(),
  // });

  // 클라이언트 사이드에서 사용하기 위해 dehydrate처리
  // const session = dehydrate(queryClient);

  const dehydratedState = await prefetchAndDehydrate(
    ["loginSession"],
    fetchSession
  );

  return (
    <>
      <nav className={styles.nav}>
        <ul className={` ${styles.logo}`}>
          <li className={`${FONT_SANS.className}`}>
            <Link href='/'>Next Movie</Link>
          </li>
          <li>
            <Search />
            <Menu session={dehydratedState} />
          </li>
        </ul>
      </nav>
    </>
  );
};
