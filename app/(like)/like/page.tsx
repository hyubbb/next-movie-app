import { Suspense } from "react";
import LikeSection from "../../../components/likes/like-section";
import styles from "../../../styles/like.module.scss";
import Spinner from "../../../components/commons/Spinner";
import { fetchSession } from "../../../actions/auth-actions";
import { cookies, headers } from "next/headers";
export function generateMetadata() {
  return {
    title: "Like Movie",
  };
}

const Page = async () => {
  const session = await fetchSession();
  return (
    <div className={styles.container}>
      <Suspense fallback={<Spinner />}>
        <LikeSection session={session} />
      </Suspense>
    </div>
  );
};

export default Page;
