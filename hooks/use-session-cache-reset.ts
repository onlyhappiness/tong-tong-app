import { queryClient } from "@/api/query-client";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

/**
 * 로그인 계정이 바뀌면 서버 캐시를 통째로 비운다.
 *
 * 이게 없으면 **다른 계정으로 로그인해도 앞 계정의 화면이 보인다.** 펫·지갑·출석이
 * TanStack Query 캐시에 남아 있고, `staleTime`이 30초라 그 안에는 재조회조차
 * 하지 않기 때문이다. 쿠키와 서버 세션은 이미 바뀐 뒤라 더 헷갈린다.
 *
 * 로그아웃·로그인 각각에 `clear()`를 넣지 않고 **세션 변화를 구독**하는 이유:
 * 세션이 바뀌는 곳이 여섯 군데(`checkSession` 성공·실패, `login`, `signup`,
 * `logout`, 401 자동 정리)라 하나를 빠뜨리기 쉽고, 401 처리는 `query-client.ts`
 * 안에 있어서 거기서 auth-store를 다시 부르면 순환 import가 된다.
 *
 * 계정이 **같으면** 비우지 않는다. 재조회 때문에 화면이 깜빡이기만 한다.
 */
export function useSessionCacheReset(): void {
  useEffect(
    () =>
      useAuthStore.subscribe((state, previous) => {
        if (state.user?.id === previous.user?.id) return;
        queryClient.clear();
      }),
    [],
  );
}
