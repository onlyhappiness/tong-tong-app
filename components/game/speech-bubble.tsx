import { Colors, Fonts, Ramp, Spacing } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

type SpeechBubbleProps = {
  line: string;
};

/**
 * 펫이 말을 거는 말살ㅇ자
 */
export function SpeechBubble({ line }: SpeechBubbleProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.line} selectable>
        {line}
      </Text>
      <View style={styles.tail} />
    </View>
  );
}

export const styles = StyleSheet.create({
  root: {
    // 꼬리가 펫을 가리키도록 가운데 정렬한다. 왼쪽에 붙이면 꼬리가 빈 잔디를 가리킨다.
    alignSelf: "center",
    maxWidth: "88%",
    backgroundColor: Ramp.neutral[9],
    borderRadius: 16,
    borderCurve: "continuous",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    boxShadow: `0 2px 6px ${Colors.tintShadow}`,
  },
  line: {
    color: Colors.text,
    fontFamily: Fonts?.rounded,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
  },
  tail: {
    position: "absolute",
    bottom: -6,
    alignSelf: "center",
    width: 12,
    height: 12,
    backgroundColor: Ramp.neutral[9],
    transform: [{ rotate: "45deg" }],
  },
});
