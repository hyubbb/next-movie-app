import styles from "./like-section.module.scss";
import LikeCard from "./like-card";
import Logout from "../navigation/logout";
import LikeType from "./like-type";
import { queryAll } from "../../actions/auth-actions";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import Spinner from "../commons/Spinner";
import { prefetchAndDehydrate } from "../../lib/queryClient";

export default async function LikeSection() {
  const dehydratedState =
    (await prefetchAndDehydrate(["likesPageData"], queryAll)) || {};

  return (
    <div className={styles.container}>
      <Logout />
      <Suspense fallback={<Spinner />}>
        <LikeType query={dehydratedState} />
      </Suspense>
      <LikeCard />
    </div>
  );
}
