import { Colors, Fonts, Ramp, Spacing } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

type IconCardButtonProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  onPress: () => void;
  /** 아이콘 색. 기본은 강조색이고, 비활성 상태에서 바꿔 쓴다. */
  iconColor?: string;
  disabled?: boolean;
  accessibilityLabel?: string;
};

/**
 * 좌측 줄에 세로로 쌓이는 작은 아이콘 카드.
 */
export function IconCardButton({
  icon,
  label,
  onPress,
  iconColor = Colors.tint,
  disabled,
  accessibilityLabel,
}: IconCardButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={({ pressed }) => [
        styles.root,
        {
          opacity: disabled ? 0.55 : 1,
          transform: [{ scale: pressed ? 0.96 : 1 }],
        },
      ]}
    >
      <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    // 내용만큼만 차지한다. 화면 폭을 채우면 카드가 아니라 띠가 된다.
    alignSelf: "flex-start",
    alignItems: "center",
    gap: 2,
    marginLeft: Spacing.three,
    marginTop: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    minWidth: 60,
    borderRadius: 16,
    borderCurve: "continuous",
    backgroundColor: Colors.panel,
    boxShadow: `0 4px 12px ${Colors.tintShadow}`,
  },
  label: {
    color: Ramp.grass[0],
    fontFamily: Fonts?.rounded,
    fontSize: 11,
    fontWeight: "700",
  },
});
