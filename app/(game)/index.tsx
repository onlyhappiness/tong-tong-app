import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { Centered } from "@/components/centered";
import { ActionBar } from "@/components/game/action-bar";
import { AttendanceButton } from "@/components/game/attendance-button";
import { GaugeCard } from "@/components/game/gauge-card";
import { InfoPanel } from "@/components/game/info-panel";
import { MeadowGround } from "@/components/game/meadow-ground";
import { PetPlaceholder } from "@/components/game/pet-placeholder";
import { PetSlot } from "@/components/game/pet-slot";
import { SkyBackdrop, skyBands } from "@/components/game/sky-backdrop";
import { SettingsButton } from "@/components/game/settings-button";
import { SpeechBubble } from "@/components/game/speech-bubble";
import { Colors, Fonts, Spacing } from "@/constants/theme";
import { useAttendance, useCheckIn } from "@/hooks/use-attendance";
import { useFeed, usePets, useTouch } from "@/hooks/use-pet";
import { useTransientMessage } from "@/hooks/use-transient-message";
import { useNow } from "@/hooks/use-now";
import { useWallet } from "@/hooks/use-wallet";

const GREETING = "주인님! 오늘 날씨가 정말 좋아요!";

/** 배고픔 눈금의 상한. 밸런스 상수가 아니라 척도라 앱이 알아도 된다. */
const HUNGER_MAX = 100;

export default function HomeScreen() {
  const now = useNow();
  const insets = useSafeAreaInsets();

  const pets = usePets();
  const wallet = useWallet();
  const attendance = useAttendance();

  const checkIn = useCheckIn();
  const feed = useFeed();
  const touch = useTouch();

  const [message, setMessage] = useTransientMessage();

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

  const busy = checkIn.isPending || feed.isPending || touch.isPending;

  const showFailure = (failure: Error) => setMessage(failure.message);

  const handleCheckIn = () =>
    checkIn.mutate(undefined, {
      onSuccess: ({ amount }) => setMessage(`코인 ${amount}개를 받았어요!`),
      onError: showFailure,
    });

  const handleFeed = () => feed.mutate(pet.id, { onError: showFailure });

  const handleTouch = () => touch.mutate(pet.id, { onError: showFailure });

  const line = message ?? GREETING;

  const showBubble = !isEgg || message !== null;

  return (
    <View style={[styles.root, { backgroundColor: skyBands(now)[0] }]}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* 좌측 줄. 보는 것(게이지)과 펫과 무관한 조작(출석·설정)이 여기 모인다.
            펫에게 하는 일(밥·쓰다듬기)은 펫 곁에 따로 있다.
            알은 배고픔·친밀도가 의미 없어 게이지를 안 띄운다. */}
        {!isEgg && <GaugeCard pet={pet} />}
        <AttendanceButton
          onPress={handleCheckIn}
          checkedIn={attendance.data.checkedIn}
          busy={busy}
        />
        <SettingsButton />

        {/* 하늘 */}
        <View style={styles.stage}>
          <SkyBackdrop now={now} />
          {showBubble && <SpeechBubble line={line} />}
        </View>

        {/* 지평선. 펫의 발이 이 위에 닿고, 액션도 펫과 한 덩어리로 붙는다. */}
        <View style={styles.ground}>
          <MeadowGround />

          <PetSlot
            footer={
              !isEgg && (
                <ActionBar
                  onFeed={handleFeed}
                  onTouch={handleTouch}
                  pettingUsed={pet.petting.used}
                  pettingMax={pet.petting.max}
                  full={pet.hunger >= HUNGER_MAX}
                  busy={busy}
                />
              )
            }
          >
            <PetPlaceholder pet={pet} />
          </PetSlot>

          {/* 계기판. 카드 없이 잔디 위에 얹히므로 글자에 그림자가 있다. */}
          <View style={[styles.info, { bottom: Spacing.three + insets.bottom }]}>
            <InfoPanel now={now} coins={wallet.data.coins} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

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
  info: {
    position: "absolute",
    right: Spacing.three,
  },
  notice: {
    color: Colors.text,
    fontFamily: Fonts?.rounded,
    fontSize: 15,
    textAlign: "center",
  },
});
