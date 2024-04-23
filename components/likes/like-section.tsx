import { fetchLikesByUser } from "../../firebase/firestore";
import styles from "./like-section.module.scss";
import LikeCard from "./section/like-card";
import Logout from "../navigation/logout";
import LikeType from "./like-type";

const fetchFunc = async (session: string | undefined) => {
  if (session) {
    const response = await fetchLikesByUser(session!);
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
      <LikeType filteredData={data} />
      <LikeCard filteredData={data} />
    </div>
  );
}
