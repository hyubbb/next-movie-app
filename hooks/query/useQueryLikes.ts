import { useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";

// API 호출을 담당하는 서비스
import { IMovie } from "../../types/type";
const queryClient = useQueryClient();
export function useLikesData() {
  return queryClient.getQueryData<boolean>(["likesData"]) || false;
}

export function useLikesDataMutate(state) {
  if (state === "mutate") {
    queryClient.setQueryData(["likesData"], (oldLikes: boolean) => !oldLikes);
  } else {
    queryClient.setQueryData(["likesData"], state);
  }
}

export function useLikesPageData(data) {
  queryClient.setQueryData(["likesPageData"], data);
}
