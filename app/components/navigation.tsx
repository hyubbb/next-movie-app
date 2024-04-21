"use client";
import Link from "next/link";
import {
  IoIosSearch,
  IoIosClose,
  IoIosLogIn,
  IoIosHeart,
} from "react-icons/io";
import styles from "../styles/navigation.module.scss";
import { FONT_SANS } from "../utils/fonts";
import Search from "./search/search";
import { useRecoilState } from "recoil";
import { isSearchOpenState, userState } from "../state/atom";
import app from "../firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import storage from "../utils/storage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const Navigation = () => {
  const initialUserData = storage.get<User>("userData");
  const [userData, setUserData] = useRecoilState<User | null>(userState);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(isSearchOpenState);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const openSearch = () => {
    setIsSearchOpen(!isSearchOpen);

    if (!isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userCopy = JSON.parse(JSON.stringify(user));
        setUserData(userCopy);
        storage.set("userData", userCopy);
      } else {
        setUserData(null);
        storage.remove("userData");
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe
  }, []);

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("login success !");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <>
      <nav className={styles.nav}>
        <ul className={`${FONT_SANS.className} ${styles.logo}`}>
          <li>
            <Link href="/">Next Movie</Link>
          </li>
          <li>
            <button className={styles.search} onClick={openSearch}>
              {isSearchOpen ? <IoIosClose /> : <IoIosSearch />}
            </button>
            {userData?.email ? (
              <Link href={`/like`} className={styles.login}>
                <IoIosHeart />
              </Link>
            ) : (
              <button className={styles.search} onClick={handleAuth}>
                <IoIosLogIn />
              </button>
            )}
          </li>
        </ul>
      </nav>
      {isSearchOpen && <Search />}
    </>
  );
};
