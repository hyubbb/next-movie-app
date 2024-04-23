// /app/api/auth.ts
import { getAuth } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

console.log("siiiiibalryun");
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const auth = getAuth();
  auth.onIdTokenChanged(async (user) => {
    console.log(user);
    if (!user) {
      // ID토큰 없음, 쿠키를 제거하고 사용자를 비로그인 상태로 처리
      nookies.set({ res }, "token", "", { path: "/" });
      res.status(200).send({ message: "Token cleared" });
      return;
    }

    // 사용자가 있는 경우, 토큰을 쿠키에 설정
    const token = await user.getIdToken();
    nookies.destroy({ res }, "token");
    nookies.set({ res }, "token", token, { path: "/" });
    res.status(200).send({ token });
  });

  // 이 부분은 비동기 이벤트 리스너에 의해 바로 실행될 수 없으므로,
  // 특정한 API 응답을 기대하는 것이 어렵습니다.
}
