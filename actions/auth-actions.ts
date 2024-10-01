"use server";
import { cookies } from "next/headers";
import { verifyIdToken } from "../firebase/firebaseSdk";
import { MOVIE_DETAIL_URL, MOVIE_URL, TV_URL, options } from "../app/constants";
import {
  fetchLikesByUser,
  fetchLikesByUserAndPost,
  toggleLike,
} from "../firebase/firestore";
import { ILike } from "../types/type";

export async function createSession(token: string) {
  removeSession();
  cookies().set("token", token, {
    secure: false,
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

export async function removeSession() {
  cookies().delete("token");
}
/**
 * 로그인 세션 데이터 가져오기
 * 쿠키에 토큰이 없으면 null 반환
 * 토큰이 있으면 토큰을 디코딩하여 세션 반환
 */
export const fetchSession = async () => {
  try {
    if (cookies().get("token")) {
      const token = cookies().get("token")?.value as string | null;
      if (!token) return null;
      const decodedToken = await verifyIdToken(token);
      const session = decodedToken ? decodedToken.email : null;
      return session;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const fetchByType = (data: ILike[]) => {
  const filtered = data.reduce((acc, curr) => {
    if (!acc[curr.type]) {
      acc[curr.type] = [];
    }
    acc[curr.type].push(curr);
    return acc;
  }, {});
  return filtered;
};

export const getTrendingMovies = async (type: string) => {
  const typeUrl = {
    movie: MOVIE_URL,
    tv: TV_URL,
  };
  try {
    const response = await fetch(typeUrl[type], options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getMovie = async ({ id, type }: { id: string; type: string }) => {
  const url = `${MOVIE_DETAIL_URL}/${type}/${id}?append_to_response=credits&language=ko`;
  const response = await fetch(url, options);
  const data = await response.json();
  return { ...data, type: type };
};

export const fetchMovieData = async (data: ILike[]) => {
  const promises = data.map((like: ILike) => {
    return getMovie({ id: like.movieId, type: like.type });
  });
  return await Promise.all(promises);
};

export const fetchLikeData = async (session: string) => {
  if (session) {
    const response = await fetchLikesByUser(session);
    if (!response.length) return null;
    return JSON.stringify(response);
  }
};

// 세션값으로 사용자의 좋아요 데이터를 조회하고, 좋아요 데이터를 타입별로 분류하여 반환
export const queryAll = async () => {
  const session = await fetchSession();
  if (session) {
    const likeData = await fetchLikeData(session);
    if (likeData) {
      try {
        const parsedLikeData: ILike[] = JSON.parse(likeData);
        const movieData = await fetchMovieData(parsedLikeData);
        const data = await fetchByType(movieData);
        return JSON.parse(JSON.stringify(data));
      } catch (error) {
        console.error("Error parsing likeData", error);
        return [];
      }
    }
  }
  return [];
};

// 좋아요 데이터를 추가 또는 삭제
export const queryChangeData = async (movieId, type) => {
  try {
    const session = await fetchSession();
    if (session) {
      await toggleLike(session, movieId, type);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error update likeData", error);
    return false;
  }
};

// 세션값으로 사용자의 좋아요 데이터를 조회
export const queryLikeData = async (id: string) => {
  const session = await fetchSession();
  if (session) {
    const likeData = await fetchLikesByUserAndPost(session, id);
    const result = likeData ? true : false;
    return JSON.parse(JSON.stringify(result));
  }
  return JSON.parse(JSON.stringify(false));
};
