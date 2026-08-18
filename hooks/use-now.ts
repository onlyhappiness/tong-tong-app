import { useEffect, useState } from "react";

const MINUTE_MS = 60_000;

/**
 * 흐르는 현재 시각.
 *
 * `new Date()`를 렌더 중에 한 번 부르면 그 값이 고정된다 — 하늘 색만 쓸 때는
 * 티가 안 났지만, 시:분을 표시하면 분이 영영 안 넘어간다.
 *
 * 첫 갱신을 **다음 분 경계에 맞춘다.** 바로 60초 간격으로 돌리면 시계가
 * 23:59:58에 23:59를 보여주다 00:00:58에야 00:00으로 바뀐다.
 */
export function useNow(intervalMs = MINUTE_MS): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    const align = setTimeout(
      () => {
        setNow(new Date());
        timer = setInterval(() => setNow(new Date()), intervalMs);
      },
      intervalMs - (Date.now() % intervalMs),
    );

    return () => {
      clearTimeout(align);
      clearInterval(timer);
    };
  }, [intervalMs]);

  return now;
}
