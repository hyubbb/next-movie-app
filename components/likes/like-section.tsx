import { fetchLikesByUser } from "../../firebase/firestore";
import styles from "./like-section.module.scss";
import LikeCard from "./like-card";
import Logout from "../navigation/logout";
import LikeType from "./like-type";
import { Suspense } from "react";
import Spinner from "../commons/Spinner";

const fetchFunc = async (session: string | undefined) => {
  if (session) {
    const response = await fetchLikesByUser(session);
    const filtered = response.reduce((acc, curr) => {
      if (!acc[curr.type]) {
        acc[curr.type] = [];
      }
      acc[curr.type].push(curr);
      return acc;
    }, {});
    return filtered;
  }
  return {};
};

export default async function LikeSection({ session }) {
  const data = await fetchFunc(session);

  return (
    <div className={styles.container}>
      <Logout />
      <LikeType filteredData={JSON.parse(JSON.stringify(data))} />
      <Suspense fallback={<Spinner />}>
        <LikeCard filteredData={JSON.parse(JSON.stringify(data))} />
      </Suspense>
    </div>
  );
}
