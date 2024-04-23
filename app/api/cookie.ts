// /app/api/cookie.ts
import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("req:", req);
  const cookies = nookies.get({ req });
  const token = cookies.token;

  // token을 처리하는 로직
  console.log("Retrieved token:", token);

  res.status(200).json({ token });
}
