"use client";
import { User } from "firebase/auth";
import { useRecoilState } from "recoil";
import styles from "./logout.module.scss";
import { useRouter } from "next/navigation";
import { userState } from "../../state/atom";
import { signOutWithGoogle } from "../../firebase/auth";
import { removeSession } from "../../actions/auth-actions";

export default function Logout() {
  const router = useRouter();
  const [userData, setUserData] = useRecoilState<User | null>(userState);
  const handleLogOut = async () => {
    const response = await signOutWithGoogle();
    if (response) {
      await removeSession();
      setUserData(null);
      router.push(`/`);
    }
  };
  return (
    <div className={styles.logout} onClick={handleLogOut}>
      LOGOUT
    </div>
  );
}
