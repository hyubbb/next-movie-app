"use server";
import { cookies } from "next/headers";
import { verifyIdToken } from "../firebase/firebaseSdk";

export async function createSession(token: string) {
  removeSession();
  cookies().set("token", token, {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // One day
    path: "/",
  });
}

export async function removeSession() {
  cookies().delete("token");
}

export async function fetchSession() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return null;
    const decodedToken = await verifyIdToken(token);
    const session = decodedToken ? decodedToken.email : null;
    return session;
  } catch (error) {
    console.log(error);
  }
}
