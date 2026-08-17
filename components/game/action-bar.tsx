import { Colors, Fonts, Ramp, Spacing } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ActionBarProps = {
  onCheckIn: () => void;
  onFeed: () => void;
  onTouch: () => void;

  /** 오늘 출석 받았는지 확인 */
  checkedIn: boolean;
  pettingUsed: number;
  pettingMax: number;

  /**
   * 펫 대상 액션
   */
  petActionsEnabled: boolean;

  /** 배고픔 가득 찼는지 */
  full: boolean;

  /** 요청이 도는 중 */
  busy: boolean;
};

export function ActionBar({
  onCheckIn,
  onFeed,
  onTouch,
  checkedIn,
  pettingUsed,
  pettingMax,
  petActionsEnabled,
  full,
  busy,
}: ActionBarProps) {
  const pettingLeft = pettingMax - pettingUsed;

  return (
    <View style={styles.root}>
      <ActionButton
        label="출석"
        hint={checkedIn ? "받음" : "+200"}
        onPress={onCheckIn}
        primary
        disabled={busy || checkedIn}
      />

      {petActionsEnabled && (
        <>
          <ActionButton
            label="밥 주기"
            hint={full ? "배부름" : "-30"}
            onPress={onFeed}
            disabled={busy}
          />
          <ActionButton
            label="쓰다듬기"
            hint={`${pettingLeft}/${pettingMax}`}
            onPress={onTouch}
            disabled={busy || pettingLeft <= 0}
          />
        </>
      )}
    </View>
  );
}

type ActionButtonProps = {
  label: string;
  hint: string;
  onPress: () => void;
  primary?: boolean;
  disabled?: boolean;
};

function ActionButton({
  label,
  hint,
  onPress,
  primary,
  disabled,
}: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: primary
            ? pressed
              ? Colors.tintPressed
              : Colors.tint
            : Ramp.neutral[9],
          opacity: disabled ? 0.45 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
    >
      <Text style={[styles.label, primary && styles.labelPrimary]}>
        {label}
      </Text>
      <Text style={[styles.hint, primary && styles.hintPrimary]}>{hint}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: Spacing.two,
  },
  button: {
    flex: 1,
    alignItems: "center",
    gap: 2,
    borderRadius: 14,
    borderCurve: "continuous",
    borderWidth: 1,
    // 패널이 옅은 연두라 흰 버튼이 그냥 얹히면 경계가 안 보인다.
    borderColor: Ramp.grass[3],
    paddingVertical: Spacing.three,
  },
  label: {
    color: Colors.text,
    fontFamily: Fonts?.rounded,
    fontSize: 14,
    fontWeight: "700",
  },
  labelPrimary: {
    color: Ramp.neutral[9],
  },
  hint: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontVariant: ["tabular-nums"],
  },
  hintPrimary: {
    color: Ramp.grass[5],
  },
});
