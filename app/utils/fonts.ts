import { Black_Han_Sans } from "next/font/google";

export const FONT_SANS = Black_Han_Sans({
  subsets: ["latin"],
  weight: ["400"], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});
