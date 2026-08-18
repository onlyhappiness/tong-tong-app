import dayjs, { type Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const KST_OFFSET_MINUTES = 9 * 60;

/** 게임 하루의 경계 */
export const GAME_DAY_START_HOUR = 6;

/** 밤이 시작하는 시각 */
export const NIGHT_START_HOUR = 18;

/** KST 시각 */
function kst(now: Date): Dayjs {
  return dayjs(now).utcOffset(KST_OFFSET_MINUTES);
}

export function kstHour(now: Date): number {
  const at = kst(now);
  return at.hour() + at.minute() / 60;
}

export function isDaytime(now: Date): boolean {
  const hour = kstHour(now);
  return hour >= GAME_DAY_START_HOUR && hour < NIGHT_START_HOUR;
}
