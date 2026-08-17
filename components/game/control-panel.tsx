import { Pet } from "@/api/type";
import { ActionBar } from "@/components/game/action-bar";
import { FoodBowl } from "@/components/game/food-bowl";
import { HeartRow } from "@/components/game/heart-row";
import { Colors, Spacing } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HUNGER_MAX = 100;

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
        // 탭바가 없어졌으므로 홈 인디케이터·제스처 바만 피하면 된다.
        // 플랫폼 분기도 필요 없다 — 안전영역은 양쪽에서 같은 뜻이다.
        { paddingBottom: Spacing.three + insets.bottom },
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
        full={pet.hunger >= HUNGER_MAX}
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
