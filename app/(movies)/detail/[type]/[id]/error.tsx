"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div style={{ width: "100vw", textAlign: "center" }}>
      <h1> 영화API에 에러가 발생하였습니다. </h1>
      <br />
      <Link href='/'>홈으로</Link>
    </div>
  );
}
