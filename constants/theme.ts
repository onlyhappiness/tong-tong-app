/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";
import { Platform } from "react-native";

export const Ramp = {
  /** 하늘 — 그림이 아니라 코드가 칠한다. 낮·밤·비·눈을 이 6칸으로 만든다. */
  sky: ["#172038", "#253a5e", "#3c5e8b", "#4f8fba", "#73bed3", "#a4dddb"],
  /** 잔디 — Apollo에서 교체한 램프. 통통의 지문이다. */
  grass: ["#2f4f3c", "#487a52", "#6aa46c", "#90c98a", "#b6e3a8", "#dcf3c8"],
  /** 흙 — 알 껍데기, 밥그릇, 나무. */
  soil: ["#4d2b32", "#7a4841", "#ad7757", "#c09473", "#d7b594", "#e7d5b3"],
  /** 금빛 — 해, 코인. */
  gold: ["#341c27", "#602c2c", "#884b2b", "#be772b", "#de9e41", "#e8c170"],
  /** 붉은빛 — 경고, 하트. */
  berry: ["#241527", "#411d31", "#752438", "#a53030", "#cf573c", "#da863e"],
  /** 밤빛 — 반딧불이 시간대, 꽃. */
  bloom: ["#1e1d39", "#402751", "#7a367b", "#a23e8c", "#c65197", "#df84a5"],
  /** 중성 10칸 — 글자와 테두리가 여기서 나온다. 회색을 따로 쓰지 않는다. */
  neutral: [
    "#090a14",
    "#10141f",
    "#151d28",
    "#202e37",
    "#394a50",
    "#577277",
    "#819796",
    "#a8b5b2",
    "#c7cfcc",
    "#ebede9",
  ],
} as const;

export const Colors = {
  text: Ramp.grass[0],
  background: Ramp.grass[5],
  backgroundElement: Ramp.neutral[9],
  backgroundSelected: Ramp.grass[4],
  textSecondary: Ramp.neutral[5],
  tint: Ramp.grass[1],
  tintPressed: Ramp.grass[0],
  tintShadow: "rgba(72,122,82,0.35)",
  danger: Ramp.berry[3],
} as const;

export type ThemeColor = keyof typeof Colors;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
