"use client";
import { useEffect, useState } from "react";
import styles from "./like-section.module.scss";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { fetchLikesByUserAndPost, toggleLike } from "../../firebase/firestore";
import { User } from "firebase/auth";
import { ILike } from "../../types/type";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/atom";

export default function LikeButton({
  movieId,
  type,
}: {
  movieId: string;
  type: string;
}) {
  const userData = useRecoilValue<User | null>(userState);
  const [likeData, setLikeData] = useState<ILike[] | string>([]);
  const handleLike = async () => {
    if (userData) {
      const response = await toggleLike(userData.email!, movieId, type);
      setLikeData(response);
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  useEffect(() => {
    const handleLike = async () => {
      if (userData) {
        const response = await fetchLikesByUserAndPost(
          userData.email!,
          movieId
        );
        setLikeData(response);
      }
    };
    handleLike();
  }, [userData]);
  return (
    <div>
      <div className={styles.like} onClick={handleLike}>
        {likeData.length ? <IoIosHeart color='red' /> : <IoIosHeartEmpty />}
      </div>
    </div>
  );
}