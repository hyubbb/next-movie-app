"use client";
import Link from "next/link";
import { IoIosHeart, IoIosLogIn } from "react-icons/io";
import { fetchSession } from "../../../actions/auth-actions";
import styles from "../navigation.module.scss";
import { hydrate, useQuery, useQueryClient } from "@tanstack/react-query";
import useSession from "../../../hooks/useSession";
export default function Menu({ session }) {
  const queryClient = useQueryClient();
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
