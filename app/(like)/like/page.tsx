import { Suspense } from "react";
import LikeSection from "../../../components/likes/like-section";
import styles from "../../../styles/like.module.scss";
import Spinner from "../../../components/commons/Spinner";
import { cookies } from "next/headers";

export function generateMetadata() {
  return {
    title: "Like Movie",
  };
}

const Page = () => {
  const session = cookies().get("userData")?.value || null;
  return (
    <div className={styles.container}>
      <Suspense fallback={<Spinner />}>
        <LikeSection session={session} />
      </Suspense>
    </div>
  );
};

export default Page;
