import { useEffect } from "react";
import { onAuthStateChanged, signInWithGoogle } from "../firebase/auth";
import { createSession } from "../actions/auth-actions";
import { userState } from "../state/atom";
import { useRecoilState } from "recoil";
import { User } from "firebase/auth";

const useSession = (sessionData) => {
  const [userData, setUserData] = useRecoilState<User | null>(userState);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const token = await user.getIdToken(true);
          createSession(token);
          const userCopy = JSON.parse(JSON.stringify(user));
          setUserData(userCopy);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    });

    return () => unsubscribe();
  }, [sessionData]);

  const handleAuth = async () => {
    await signInWithGoogle();
  };

  return { handleAuth, userData };
};

export default useSession;
