"use client";
import Link from "next/link";
import { IoIosHeart, IoIosLogIn } from "react-icons/io";
import styles from "../navigation.module.scss";
import { hydrate, useQueryClient } from "@tanstack/react-query";
import useSession from "../../../hooks/useSession";

export default function Menu({ session }) {
  const queryClient = useQueryClient();
  // 클라이언트 사이드에서 사용하기 위해 직렬화 되어 넘어온 session 데이터를 hydrate처리
  hydrate(queryClient, session);

  const sessionData = queryClient.getQueryData(["loginSession"]) || null;
  const { handleAuth } = useSession(sessionData);

  return (
    <>
      {sessionData ? (
        <Link href={`/like`} className={styles.login}>
          <IoIosHeart />
        </Link>
      ) : (
        <button className={styles.search} onClick={handleAuth}>
          <IoIosLogIn />
        </button>
      )}
    </>
  );
}
