import LikeSection from "@/components/likes/like-section";
import styles from "@/styles/like.module.scss";
export function generateMetadata() {
  return {
    title: "Like Movie",
  };
}

const Page = async () => {
  return (
    <div className={styles.container}>
      <LikeSection />
    </div>
  );
};

export default Page;
