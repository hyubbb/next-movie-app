"use client";
import { User } from "firebase/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import styles from "./logout.module.scss";
import { useRouter } from "next/navigation";
import { userState } from "@/state/atom";
import { signOutWithGoogle } from "@/firebase/auth";
import { removeSession } from "@/actions/auth-actions";
import nookies from "nookies";
export default function Logout() {
  const router = useRouter();
  const setUserData = useSetRecoilState<User | null>(userState);
  const handleLogOut = async () => {
    const response = await signOutWithGoogle();
    if (response) {
      await removeSession();
      nookies.destroy(null, "token");
      setUserData(null);
      router.push(`/`);
    }
  };
  return (
    <div className={`${styles.logout}`} onClick={handleLogOut}>
      <span>LOGOUT</span>
    </div>
  );
}
