# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# 디자인 방향

통통은 **전 화면 자체 아트디렉션**으로 간다. 게임이라 OS 표준 외형을 따르면
게임처럼 보이지 않는다. 팔레트와 타이포그래피를 직접 정하고 `constants/theme.ts`
한 곳에 모은다.

- `Color.ios.*` / `PlatformColor` 등 **OS 시맨틱 컬러를 쓰지 않는다.** 색은 hex로
  직접 지정한다.
- **OS 다크모드를 따르지 않는다.** `Colors`는 한 벌이고 `app.json`의
  `userInterfaceStyle`은 `"light"`다. 게임 안의 낮·밤은 하늘 레이어가 `Ramp.sky`로
  따로 그린다 — OS 테마와 겹치면 밤이 두 개가 되어, 낮인데 폰이 다크모드면 밤
  배경에 낮 하늘이 뜬다. 색 대비는 손으로 확인한다.
- 색은 `Ramp`(팔레트 46색 원본) → `Colors`(역할 이름) 두 층으로만 흐른다. 화면
  코드가 `Ramp`를 직접 읽지 않는다.
- **`@expo/ui`를 쓰지 않는다.** 실제 SwiftUI·Jetpack Compose 위젯을 그려서 재스타일이
  불가능하다. `expo-ui` 스킬은 이 이유로 제거했다.
- `expo-native-ui` 스킬의 **"Styling" 절(HIG 준수 · 시맨틱 컬러)은 따르지 않는다.**
  그 외(라이브러리 선호 · 반응형 · `boxShadow` · 참조 문서)는 그대로 따른다.

현재 `constants/theme.ts`의 팔레트는 Expo 템플릿 잔재다. 통통을 위해 고른 색이
아니므로 새 색을 여기서 파생시키지 말 것 — 재설계 예정이다.

# Code comments

When adding or modifying code, add concise TSDoc comments **written in Korean**:

- A one- or two-line summary above functions, components, hooks, and types (what/why).
- Only add `@param`/`@returns` when it is not self-evident from the name.
- Skip noisy comments on self-explanatory code — keep it brief.
