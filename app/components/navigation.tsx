"use client";
import Link from "next/link";
import {
  IoIosSearch,
  IoIosClose,
  IoIosLogIn,
  IoIosHeart,
  IoIosHelpCircleOutline,
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
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import storage from "../utils/storage";
import cookie from "cookie";

export const getServerSideProps = async (context) => {
  const { req } = context;
  const userData = cookie.parse(req)["userData"];

  return {
    props: {
      initialUserData: userData ? JSON.parse(userData) : null,
    },
  };
};

export const Navigation = () => {
  // const localStorageUser = storage.get<User>("userData");
  const [userData, setUserData] = useRecoilState<User | undefined>(userState);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(isSearchOpenState);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  useEffect(() => {
    const loadUserData = () => {
      const localStorageUser = storage.get<User>("userData");
      if (localStorageUser) {
        setUserData(localStorageUser["userState"]);
        console.log(localStorageUser["userState"]);
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userCopy = JSON.parse(JSON.stringify(user));
        setUserData(userCopy);
        storage?.set("userData", userCopy);
      } else {
        setUserData(null);
        storage?.remove("userData");
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe
  }, []);

  const openSearch = () => {
    setIsSearchOpen(!isSearchOpen);

    if (!isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

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
            {userData === undefined ? (
              ""
            ) : userData ? (
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
