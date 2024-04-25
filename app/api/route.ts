// /app/api/token/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { fetchLikesByUser } from "../../firebase/firestore";
import { ILike, IMovie } from "../../types/type";
import { IMG_URL, MOVIE_DETAIL_URL, options } from "../constants";
import getBase64 from "../../utils/getBase64";

const fetchByType = (data) => {
  const filtered = data.reduce((acc, curr) => {
    if (!acc[curr.video_type]) {
      acc[curr.video_type] = [];
    }
    acc[curr.video_type].push(curr);
    return acc;
  }, {});
  return filtered;
};
const getMovie = async ({ id, type }: { id: string; type: string }) => {
  const url = `${MOVIE_DETAIL_URL}/${type}/${id}?language=ko`;
  const response = await fetch(url, options);
  const data = await response.json();
  return { ...data, video_type: type };
};
const fetchData = async (session) => {
  if (session) {
    const response = await fetchLikesByUser(session);
    const promises = response.map((like: ILike) => {
      return getMovie({ id: like.movieId, type: like.type });
    });
    return await Promise.all(promises);
  }
};

export async function POST(req) {
  const session = await req.json();
  const fData = await fetchData(session);
  const data = fetchByType(fData);
  return Response.json(data);
}
