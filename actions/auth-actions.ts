"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// import { HOME_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from '@/constants';

export async function createSession(uid: string) {
  cookies().set("userData", uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // One day
    path: "/",
  });

  redirect("/");
}

export async function removeSession() {
  cookies().delete("userData");
  redirect("/");
}
