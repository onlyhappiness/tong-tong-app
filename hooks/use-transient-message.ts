import { useEffect, useState } from "react";

const DEFAULT_DURATION_MS = 4000;

/**
 * 잠깐 보여줬다 스스로 사라지는 한 줄.
 *
 * 액션 결과(실패 사유·받은 코인)를 말상자에 띄우는 데 사용.
 */
export function useTransientMessage(durationMs = DEFAULT_DURATION_MS) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (message === null) return;

    const timer = setTimeout(() => setMessage(null), durationMs);
    return () => clearTimeout(timer);
  }, [message, durationMs]);

  return [message, setMessage] as const;
}
