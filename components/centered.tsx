import { Colors, Spacing } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

type CenteredProps = {
  children: React.ReactNode;
};

/**
 * 화면 전체를 채우고 내용을 가운데 놓는 컨테이너.
 * 로딩 스피너 · 에러 문구처럼 화면 대신 보여줄 것에 쓴다.
 */
export function Centered({ children }: CenteredProps) {
  return <View style={styles.root}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.four,
    backgroundColor: Colors.background,
  },
});
