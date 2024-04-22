"use client";
import { User, getAuth, signOut } from "firebase/auth";
import storage from "../../utils/storage";
import { userState } from "../../state/atom";
import { useRecoilState } from "recoil";
import app from "../../firebaseConfig";
import { useRouter } from "next/navigation";
export default function Logout() {
  const auth = getAuth(app);
  const router = useRouter();
  const [userData, setUserData] = useRecoilState<User | null>(userState);
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUserData(null);
        storage.remove("userData");
        router.push(`/`);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return <div onClick={handleLogOut}>LOGOUT</div>;
}
