import { QueryClient, dehydrate } from "@tanstack/react-query";
// 데이터 prefetch 및 dehydrate를 위한 헬퍼 함수
/**
 *  쿼리 키와 쿼리 함수를 받아서 쿼리를 미리 가져오고, 그 결과를 dehydrate 함수를 사용하여 직렬화하는 함수
 *  queryKey: 쿼리 키
 *  queryFn: 쿼리 함수
 */
export async function prefetchAndDehydrate(queryKey, queryFn) {
  typeof queryFn === "function" ? (queryFn = queryFn()) : queryFn;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: async () => await queryFn,
  });
  return dehydrate(queryClient);
}
