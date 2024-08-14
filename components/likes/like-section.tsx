import styles from "./like-section.module.scss";
import LikeCard from "./like-card";
import Logout from "../navigation/logout";
import LikeType from "./like-type";
import { queryAll } from "../../actions/auth-actions";
import { Suspense } from "react";
import Spinner from "../commons/Spinner";
import { prefetchAndDehydrate } from "../../lib/queryClient";

export default async function LikeSection() {
  let dehydratedState;
  try {
    dehydratedState = await prefetchAndDehydrate(["likesPageData"], queryAll);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

  return (
    <div className={styles.container}>
      <Logout />
      <Suspense fallback={<Spinner />}>
        <LikeType query={dehydratedState} />
        <LikeCard />
      </Suspense>
    </div>
  );
}
