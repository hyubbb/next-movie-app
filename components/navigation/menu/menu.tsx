"use client";
import { User } from "firebase/auth";
import Link from "next/link";
import { IoIosHeart, IoIosLogIn } from "react-icons/io";
import { useRecoilState } from "recoil";
import { userState } from "../../../state/atom";
import { onAuthStateChanged, signInWithGoogle } from "../../../firebase/auth";
import { createSession } from "../../../actions/auth-actions";
import styles from "../navigation.module.scss";
import { useEffect } from "react";
export default function Menu({ session }) {
  const [userData, setUserData] = useRecoilState<User | null>(userState);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken(true);
          createSession(token);
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
        const userCopy = JSON.parse(JSON.stringify(user));
        setUserData(userCopy);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAuth = async () => {
    await signInWithGoogle();
  };

  return (
    <>
      {!session ? (
        <button className={styles.search} onClick={handleAuth}>
          <IoIosLogIn />
        </button>
      ) : (
        <Link href={`/like`} className={styles.login}>
          <IoIosHeart />
        </Link>
      )}
    </>
  );
}
