import styles from "./like-section.module.scss";
import LikeCard from "./like-card";
import Logout from "@/components/navigation/logout";
import LikeType from "./like-type";
import { queryAll } from "@/actions/auth-actions";
import { prefetchAndDehydrate } from "@/lib/queryClient";

export default async function LikeSection() {
  let dehydratedState;
  try {
    dehydratedState = await prefetchAndDehydrate(["likesPageData"], queryAll);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <div>Error loading data. Please try again later.</div>;
  }

  if (!dehydratedState) {
    return <div>No data available. Please try again later.</div>;
  }

  return (
    <div className={styles.container}>
      <Logout />
      <LikeType query={dehydratedState} />
      <LikeCard />
    </div>
  );
}
