/** API 서버 포트. 서버의 `PORT` 기본값과 같다. */
const API_PORT = 4000;

/** 안드로이드 에뮬레이터가 호스트 머신(맥)을 가리키는 별칭. */
const ANDROID_EMULATOR_HOST = "10.0.2.2";

const LOOPBACK = ["localhost", "127.0.0.1", "::1"];

type ResolveInput = {
  envUrl?: string;
  hostUri?: string;
  platform: "ios" | "android" | "web" | string;
  isDevice: boolean;
};

/**
 * 앱이 두드릴 API 주소를 정한다.
 */
export function resolveApiUrl({
  envUrl,
  hostUri,
  platform,
  isDevice,
}: ResolveInput): string {
  if (envUrl) return envUrl;

  return `http://${devHost(hostUri, platform, isDevice)}:${API_PORT}`;
}

function devHost(
  hostUri: string | undefined,
  platform: string,
  isDevice: boolean,
): string {
  const host = hostUri?.split(":")[0];

  if (!host) return "localhost";

  if (platform === "android" && !isDevice && LOOPBACK.includes(host)) {
    return ANDROID_EMULATOR_HOST;
  }

  return host;
}
