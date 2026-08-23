import { Card, Colors, Fonts, Ramp, Spacing } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ActionBarProps = {
  onFeed: () => void;
  onTouch: () => void;

  pettingUsed: number;
  pettingMax: number;

  /** 배고픔 가득 찼는지 */
  full: boolean;

  /** 요청이 도는 중 */
  busy: boolean;
};

/**
 * 펫 대상 액션. 펫 바로 밑에 아이콘 두 개로 선다.
 *
 * 화면 아래 카드에서 여기로 옮긴 이유: 밥 주기·쓰다듬기는 **펫에게 하는 일**이라
 * 펫 곁에 있어야 대상이 분명하다. 출석은 계정 단위라 좌측 상단에 따로 있다.
 */
export function ActionBar({
  onFeed,
  onTouch,
  pettingUsed,
  pettingMax,
  full,
  busy,
}: ActionBarProps) {
  const pettingLeft = pettingMax - pettingUsed;

  return (
    <View style={styles.root}>
      <ActionButton
        icon="bowl-mix"
        label={full ? "배부름" : "밥 주기"}
        onPress={onFeed}
        disabled={busy}
      />
      <ActionButton
        icon="hand-heart"
        label={`쓰다듬기 ${pettingLeft}/${pettingMax}`}
        onPress={onTouch}
        disabled={busy || pettingLeft <= 0}
      />
    </View>
  );
}

type ActionButtonProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

function ActionButton({ icon, label, onPress, disabled }: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? Ramp.grass[5] : Colors.panel,
          opacity: disabled ? 0.45 : 1,
          transform: [{ scale: pressed ? 0.94 : 1 }],
        },
      ]}
    >
      <MaterialCommunityIcons name={icon} size={26} color={Colors.tint} />
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: Spacing.three,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    minWidth: 78,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    borderRadius: Card.radius,
    borderCurve: "continuous",
    borderWidth: Card.borderWidth,
    borderColor: Card.borderColor,
    boxShadow: Card.shadow,
  },
  label: {
    color: Colors.text,
    fontFamily: Fonts?.rounded,
    fontSize: 12,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
});
