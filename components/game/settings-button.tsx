import { IconCardButton } from "@/components/game/icon-card-button";
import { Colors } from "@/constants/theme";
import { router } from "expo-router";

/**
 * 설정으로 가는 아이콘 버튼. 좌측 줄, 출석 아래.
 *
 */
export function SettingsButton() {
  return (
    <IconCardButton
      icon="cog"
      label="설정"
      iconColor={Colors.panelTextSecondary}
      onPress={() => router.push("/settings")}
    />
  );
}
