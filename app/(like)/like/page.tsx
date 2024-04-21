import { Suspense } from "react";
import LikeSection from "../../components/likes/like-section";
import styles from "../../styles/like.module.scss";
import Spinner from "../../components/commons/Spinner";
export default function page() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Spinner />}>
        <LikeSection />
      </Suspense>
    </div>
  );
}
