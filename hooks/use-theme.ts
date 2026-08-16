/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/theme";

/**
 * 화면 색을 돌려준다.
 * 게임 안의 낮·밤은 하늘 레이어가 따로 처리한다.
 */
export function useTheme() {
  return Colors;
}
