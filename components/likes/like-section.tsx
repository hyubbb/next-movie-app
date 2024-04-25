import styles from "./like-section.module.scss";
import LikeCard from "./like-card";
import Logout from "../navigation/logout";
import LikeType from "./like-type";
import { Suspense, useEffect, useState } from "react";
import Spinner from "../commons/Spinner";
import { fetchSession } from "../../actions/auth-actions";

export default async function LikeSection() {
  const session = await fetchSession();
  return (
    <div className={styles.container}>
      <Logout />
      <LikeType session={session} />
      <Suspense fallback={<Spinner />}>
        <LikeCard />
      </Suspense>
    </div>
  );
}
