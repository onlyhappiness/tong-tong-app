import { Card, Colors, Fonts, Ramp, Spacing } from "@/constants/theme";
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
    borderRadius: Card.radius,
    borderCurve: "continuous",
    borderWidth: Card.borderWidth,
    borderColor: Card.borderColor,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    boxShadow: Card.shadow,
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
    bottom: -8,
    alignSelf: "center",
    width: 14,
    height: 14,
    backgroundColor: Ramp.neutral[9],
    // 45도 돌린 네모라 바깥을 향하는 변은 오른쪽·아래 둘뿐이다.
    // 이 둘에만 테두리를 줘야 말상자 윤곽이 꼬리까지 이어진다.
    borderRightWidth: Card.borderWidth,
    borderBottomWidth: Card.borderWidth,
    borderColor: Card.borderColor,
    transform: [{ rotate: "45deg" }],
  },
});
