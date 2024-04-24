import { Suspense } from "react";
import LikeSection from "../../../components/likes/like-section";
import styles from "../../../styles/like.module.scss";
import Spinner from "../../../components/commons/Spinner";
import { cookies } from "next/headers";
import { verifyIdToken } from "../../../firebase/firebaseSdk";

export function generateMetadata() {
  return {
    title: "Like Movie",
  };
}

const Page = async () => {
  const token = cookies().get("token")?.value || null;
  const decodedToken = await verifyIdToken(token);
  const session = decodedToken && decodedToken.email;
  return (
    <div className={styles.container}>
      <Suspense fallback={<Spinner />}>
        <LikeSection session={session} />
      </Suspense>
    </div>
  );
};

export default Page;
