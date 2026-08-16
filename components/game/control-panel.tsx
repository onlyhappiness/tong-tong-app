import { Pet } from "@/api/type";
import { ActionBar } from "@/components/game/action-bar";
import { FoodBowl } from "@/components/game/food-bowl";
import { HeartRow } from "@/components/game/heart-row";
import { BottomTabInset, Colors, Spacing } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ControlPanelProps = {
  pet: Pet;
  onCheckIn: () => void;
  onFeed: () => void;
  onTouch: () => void;

  /** 오늘 출석 받았는지 */
  checkedIn: boolean;

  /** 요청이 도는 중 */
  busy: boolean;
};

/**
 * 화면 아래 조작 패널. 게이지(배고픔·친밀도)와 액션 버튼을 담는다.
 * 알 상태에서는 게이지와 펫 액션이 숨는다.
 */
export function ControlPanel({
  pet,
  onCheckIn,
  onFeed,
  onTouch,
  checkedIn,
  busy,
}: ControlPanelProps) {
  const insets = useSafeAreaInsets();
  const isEgg = pet.stage === "EGG";

  return (
    <View
      style={[
        styles.root,
        // iOS는 네이티브 탭바가 콘텐츠 위를 덮으므로 그만큼 비워야 한다.
        // 안드로이드는 탭바가 레이아웃 공간을 이미 차지해 더 주면 이중이 된다.
        {
          paddingBottom:
            Spacing.three +
            (process.env.EXPO_OS === "ios"
              ? insets.bottom + BottomTabInset
              : 0),
        },
      ]}
    >
      {!isEgg && (
        <View style={styles.gauges}>
          <FoodBowl hunger={pet.hunger} />
          <HeartRow value={pet.intimacy} />
        </View>
      )}

      <ActionBar
        onCheckIn={onCheckIn}
        onFeed={onFeed}
        onTouch={onTouch}
        checkedIn={checkedIn}
        pettingUsed={pet.petting.used}
        pettingMax={pet.petting.max}
        petActionsEnabled={!isEgg}
        busy={busy}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: Spacing.three,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
  },
  gauges: {
    gap: Spacing.two,
  },
});
