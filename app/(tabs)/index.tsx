import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Centered } from "@/components/centered";
import { ControlPanel } from "@/components/game/control-panel";
import { MeadowGround } from "@/components/game/meadow-ground";
import { PetPlaceholder } from "@/components/game/pet-placeholder";
import { PetSlot } from "@/components/game/pet-slot";
import { SkyBackdrop, skyBands } from "@/components/game/sky-backdrop";
import { SpeechBubble } from "@/components/game/speech-bubble";
import { TopStatusBar } from "@/components/game/top-status-bar";
import { Colors, Fonts, Spacing } from "@/constants/theme";
import { useAttendance } from "@/hooks/use-attendance";
import { usePets } from "@/hooks/use-pet";
import { useWallet } from "@/hooks/use-wallet";

const GREETING = "주인님! 오늘 날씨가 정말 좋아요!";

export default function HomeScreen() {
  const now = new Date();

  const pets = usePets();
  const wallet = useWallet();
  const attendance = useAttendance();

  const error = pets.error ?? wallet.error ?? attendance.error;

  if (error) {
    return (
      <Centered>
        <Text style={styles.notice} selectable>
          {error.message}
        </Text>
      </Centered>
    );
  }

  if (!pets.data || !wallet.data || !attendance.data) {
    return (
      <Centered>
        <ActivityIndicator color={Colors.tint} />
      </Centered>
    );
  }

  const pet = pets.data.at(0);

  if (!pet) {
    return (
      <Centered>
        <Text style={styles.notice}>아직 알이 없어요.</Text>
      </Centered>
    );
  }

  const isEgg = pet.stage === "EGG";

  return (
    <View style={[styles.root, { backgroundColor: skyBands(now)[0] }]}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <TopStatusBar now={now} coins={wallet.data.coins} />

        {/* 하늘 */}
        <View style={styles.stage}>
          <SkyBackdrop now={now} />
          {!isEgg && <SpeechBubble line={GREETING} />}
        </View>

        {/* 지평선. 펫의 발이 이 위에 닿는다. */}
        <View style={styles.ground}>
          <MeadowGround />
          <PetSlot>
            <PetPlaceholder pet={pet} />
          </PetSlot>
        </View>

        <ControlPanel
          pet={pet}
          onCheckIn={noop}
          onFeed={noop}
          onTouch={noop}
          checkedIn={attendance.data.checkedIn}
          busy={false}
        />
      </SafeAreaView>
    </View>
  );
}

function noop() {}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  stage: {
    // 하늘 6 : 잔디 4. flex를 둘 다 1로 두면 안쪽 내용에 따라 비율이 흔들린다 —
    // 숫자로 못 박아야 기기·플랫폼이 달라도 같은 그림이 나온다.
    flex: 6,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: Spacing.three,
    paddingBottom: 76,
  },
  ground: {
    flex: 4,
  },
  notice: {
    color: Colors.text,
    fontFamily: Fonts?.rounded,
    fontSize: 15,
    textAlign: "center",
  },
});
