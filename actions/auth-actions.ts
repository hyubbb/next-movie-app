"use server";
import { getAuth } from "firebase/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import nookies from "nookies";
// import { HOME_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from '@/constants';

export async function createSession(token: string) {
  cookies().set("token", token, {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // One day
    path: "/",
  });
}

export async function removeSession() {
  cookies().delete("token");
}
