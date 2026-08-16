import { ApiError } from "@/api/client";
import { useAuthStore } from "@/stores/auth-store";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

/** 쿼리 클라이언트 */
export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: clearSession }),
  mutationCache: new MutationCache({ onError: clearSession }),
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: (failCount, error) =>
        error instanceof ApiError && error.code >= 400 && error.code < 500
          ? false
          : failCount < 2,
    },
    mutations: {
      retry: false,
    },
  },
});

/**
 * 세션 만료.
 */
function clearSession(error: unknown): void {
  if (error instanceof ApiError && error.code === 401) {
    useAuthStore.setState({ user: null });
  }
}
