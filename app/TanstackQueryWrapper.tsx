"use client";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface QueryRootWrapperProps {
  children: React.ReactNode;
  dehydratedState?: any; // 서버에서 가져온 상태를 저장하는 prop을 추가
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 60 * 1000,
    },
  },
});

export default function TanstackQueryWrapper({
  children,
  dehydratedState,
}: QueryRootWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* {children} */}
      <ReactQueryDevtools initialIsOpen={false} />
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
