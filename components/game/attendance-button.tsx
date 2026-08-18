import { IconCardButton } from "@/components/game/icon-card-button";
import { Colors } from "@/constants/theme";

type AttendanceButtonProps = {
  onPress: () => void;
  /** 오늘 이미 받았는지. 받았으면 비활성으로 두고 숨기지 않는다. */
  checkedIn: boolean;
  /** 요청이 도는 중 */
  busy: boolean;
};

/**
 * 출석 아이콘 버튼.
 */
export function AttendanceButton({
  onPress,
  checkedIn,
  busy,
}: AttendanceButtonProps) {
  return (
    <IconCardButton
      icon={checkedIn ? "check-circle" : "gift"}
      label={checkedIn ? "받음" : "출석"}
      iconColor={checkedIn ? Colors.panelTextSecondary : Colors.tint}
      onPress={onPress}
      disabled={busy || checkedIn}
      accessibilityLabel={checkedIn ? "출석 완료" : "출석하고 코인 받기"}
    />
  );
}
