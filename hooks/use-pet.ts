/**
 * 펫 관련 쿼리 모음
 */

import { api } from "@/api/client";
import { queryKeys } from "@/api/query-keys";
import { Pet, PetResponse, Wallet } from "@/api/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * 내 펫 목록
 */
export function usePets() {
  return useQuery({
    queryKey: queryKeys.pets,
    queryFn: () => api.get<Pet[]>("/pet"),
  });
}

/**
 * 밥주기, 쓰다듬기
 */
function usePetAction(action: "feed" | "touch") {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (petId: string) =>
      api.post<PetResponse>(`/pet/${petId}/${action}`),
    onSuccess: (response) => {
      const { coins, ...pet } = response;

      queryClient.setQueryData<Pet[]>(queryKeys.pets, (prev) =>
        prev?.map((p) => (p.id === pet.id ? pet : p)),
      );

      if (coins !== undefined) {
        queryClient.setQueryData<Wallet>(queryKeys.wallet, { coins });
      }
    },
  });
}

/**
 * 밥 주기
 * 코인 30을 쓰고, 배고픔을 40 올린다.
 */
export function useFeed() {
  return usePetAction("feed");
}

/**
 * 쓰다듬기
 * 친밀도 +5, 코인 +20
 */
export function useTouch() {
  return usePetAction("touch");
}
