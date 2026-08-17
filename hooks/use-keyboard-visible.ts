import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

/**
 * 키보드가 떠 있는지.
 */
export function useKeyboardVisible(): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isIos = process.env.EXPO_OS === "ios";

    const show = Keyboard.addListener(
      isIos ? "keyboardWillShow" : "keyboardDidShow",
      () => setVisible(true),
    );
    const hide = Keyboard.addListener(
      isIos ? "keyboardWillHide" : "keyboardDidHide",
      () => setVisible(false),
    );

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return visible;
}
