"use client";
import styles from "./like-section.module.scss";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { User } from "firebase/auth";
import { IMovie } from "../../types/type";
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
  // 서버사이드에서 직렬화된 데이터를 가져와 클라이언트에서 사용할 수 있도록 hydrate 처리
  const queryClient = useQueryClient();
  hydrate(queryClient, query);

  const hasLike = queryClient.getQueryData<boolean>(["likesData"]) || false;
  const userData = useRecoilValue<User | null>(userState);

  // 좋아요 버튼 클릭 시 좋아요 상태 변경에 대한 처리
  const mutation = useMutation({
    mutationFn: async () => await queryChangeData(movieId, type),
    onSuccess: async () => {
      const data = await queryAll();
      queryClient.setQueryData<IMovie[]>(["likesPageData"], data);
      queryClient.invalidateQueries({ queryKey: ["likesPageData"] });
    },
    onMutate: async () => {
      // 충돌 방지를 위해 쿼리 캔슬
      await queryClient.cancelQueries({ queryKey: ["likesData"], exact: true });
      // 실패했을때 rollback을 위한 이전 데이터 저장
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
      queryClient.setQueryData<boolean>(
        ["likesData"],
        (oldLikes: boolean) => !oldLikes
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
