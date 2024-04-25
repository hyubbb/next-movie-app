"use server";
import { cookies } from "next/headers";
import { verifyIdToken } from "../firebase/firebaseSdk";
import { IMG_URL, MOVIE_DETAIL_URL, options } from "../app/constants";
import getBase64 from "../utils/getBase64";
import { fetchLikesByUser } from "../firebase/firestore";
import { ILike } from "../types/type";

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

export const fetchSession = async () => {
  try {
    if (cookies().get("token")) {
      const token = cookies().get("token")?.value as string | null;
      if (!token) return null;
      const decodedToken = await verifyIdToken(token);
      const session = decodedToken ? decodedToken.email : null;
      return session;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchByType = (data) => {
  const filtered = data.reduce((acc, curr) => {
    if (!acc[curr.type]) {
      acc[curr.type] = [];
    }
    acc[curr.type].push(curr);
    return acc;
  }, {});
  return filtered;
};
export const getMovie = async ({ id, type }: { id: string; type: string }) => {
  const url = `${MOVIE_DETAIL_URL}/${type}/${id}?language=ko`;
  const response = await fetch(url, options);
  const data = await response.json();
  return { ...data, video_type: type };
};

export const fetchMovieData = async (data: ILike[]) => {
  const promises = data.map((like: ILike) => {
    return getMovie({ id: like.movieId, type: like.type });
  });
  return await Promise.all(promises);
};

export const fetchLikeData = async (session) => {
  if (session) {
    const response = await fetchLikesByUser(session);
    return JSON.stringify(response);
  }
  return null;
};
