import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "not found!" };

const NotFound = () => {
  return (
    <div style={{ width: "100vw", textAlign: "center" }}>
      <h1> 데이터가 없는 페이지 입니다. </h1>
      <br />
      <Link href='/'>홈으로</Link>
    </div>
  );
};

export default NotFound;
