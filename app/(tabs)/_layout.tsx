import { Colors } from "@/constants/theme";
import { useAuthStore } from "@/stores/auth-store";
import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/build/native-tabs";

/**
 * 인증된 사용자에게만 노출되는 네비게이션
 */
export default function TabLayout() {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Redirect href={"/login"} />;
  }

  return (
    <NativeTabs
      backgroundColor={Colors.background}
      indicatorColor={Colors.backgroundElement}
      labelStyle={{ selected: { color: Colors.text } }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/home.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/explore.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
