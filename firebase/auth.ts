import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import nookies from "nookies";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    if (!result || !result.user) {
      throw new Error("Google sign in failed");
    }
    const token = await result.user.getIdToken();

    return { uid: result.user.uid, token };
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOutWithGoogle() {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
