// import Constants from "expo-constants";
// import { isDevice } from "expo-device";
// import { Platform } from "react-native";

// import { resolveApiUrl } from "./resolve-api-url";

// import { resolveApiUrl } from "@/api/resolve-api-url";

// /**
//  * API 서버 주소.
//  *
//  * 개발 중에는 **Metro가 알려준 호스트를 그대로 쓴다** — 손으로 IP를 적을 일도,
//  * `adb reverse tcp:4000`을 매번 걸 일도 없다. 판단 로직은 `resolve-api-url.ts`에 있다.
//  */
// export const API_URL = resolveApiUrl({
//   envUrl: process.env.EXPO_PUBLIC_API_URL,
//   hostUri: Constants.expoConfig?.hostUri,
//   platform: Platform.OS,
//   isDevice,
// });

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000";
