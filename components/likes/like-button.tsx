"use client";
import { useEffect, useState } from "react";
import styles from "./like-section.module.scss";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { fetchLikesByUserAndPost, toggleLike } from "../../firebase/firestore";
import { User } from "firebase/auth";
import { ILike, IMovie } from "../../types/type";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/atom";
import { hydrate, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryAll, queryChangeData } from "../../actions/auth-actions";

export default function LikeButton({
  movieId,
  type,
  query,
}: {
  movieId: string;
  type: string;
  query: any;
}) {
  const queryClient = useQueryClient();
  hydrate(queryClient, query);
  const hasLike = queryClient.getQueryData<boolean>(["likesData"]) || false;
  const userData = useRecoilValue<User | null>(userState);

  const mutation = useMutation({
    mutationFn: async () => await queryChangeData(movieId, type),
    onSuccess: async () => {
      const data = await queryAll();
      queryClient.setQueryData<IMovie[]>(["likesPageData"], data);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["likesData"], exact: true });
      const previousLikes = queryClient.getQueryData<boolean>(["likesData"]);
      queryClient.setQueryData<boolean>(
        ["likesData"],
        (oldLikes: boolean) => !oldLikes
      );
      return { previousLikes };
    },
    onError: (error, _, context) => {
      console.error("Error updating likes data:", error);
      queryClient.setQueryData<boolean>(
        ["likesPageData"],
        context?.previousLikes
      );
    },
  });

  const handleLike = async () => {
    if (userData) {
      mutation.mutate();
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <div>
      <div className={styles.like} onClick={handleLike}>
        {hasLike ? <IoIosHeart color='red' /> : <IoIosHeartEmpty />}
      </div>
    </div>
  );
}
