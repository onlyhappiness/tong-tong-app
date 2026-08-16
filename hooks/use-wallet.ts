/**
 * 지갑 관련 쿼리 모음
 */

import { api } from "@/api/client";
import { queryKeys } from "@/api/query-keys";
import { Wallet } from "@/api/type";
import { useQuery } from "@tanstack/react-query";

/**
 * 코인 잔액
 */
export function useWallet() {
  return useQuery({
    queryKey: queryKeys.wallet,
    queryFn: () => api.get<Wallet>("/wallet"),
  });
}
