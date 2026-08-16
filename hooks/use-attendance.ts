/**
 * 출석 관련 쿼리 모음
 */

import { api } from "@/api/client";
import { queryKeys } from "@/api/query-keys";
import { AttendanceCheckIn, AttendanceStatus, Wallet } from "@/api/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * 오늘 출석 받았는 지 확인
 */
export function useAttendance() {
  return useQuery({
    queryKey: queryKeys.attendance,
    queryFn: () => api.get<AttendanceStatus>("/attendance"),
  });
}

/**
 * 출석 체크
 */
export function useCheckIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.post<AttendanceCheckIn>("/attendance"),
    onSuccess: ({ coins }) => {
      queryClient.setQueryData<Wallet>(queryKeys.wallet, { coins });
      queryClient.setQueryData<AttendanceStatus>(queryKeys.attendance, {
        checkedIn: true,
      });
    },
  });
}
