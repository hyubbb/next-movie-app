import { QueryClient, dehydrate } from "@tanstack/react-query";
// 데이터 prefetch 및 dehydrate를 위한 헬퍼 함수
export async function prefetchAndDehydrate(queryKey, queryFn) {
  typeof queryFn === "function" ? (queryFn = queryFn()) : queryFn;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: async () => await queryFn,
  });
  return dehydrate(queryClient);
}
