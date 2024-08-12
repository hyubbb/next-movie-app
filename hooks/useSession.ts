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
          const userCopy = JSON.parse(JSON.stringify(user));
          createSession(token);
          setUserData(userCopy);
          return userData;
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    });

    return () => unsubscribe();
  }, [sessionData, userState]);

  const handleAuth = async () => {
    await signInWithGoogle();
  };

  return { handleAuth, userData };
};

export default useSession;
