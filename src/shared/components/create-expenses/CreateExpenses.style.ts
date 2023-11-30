import { ViewStyle, StyleSheet, TextStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
interface Style {
  container: ViewStyle;
  input: TextStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  error: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    input: {
      height: 60,
      width: "70%",
      borderColor: colors.shadow,
      borderBottomWidth: 2,
    },
    buttonContainer: {
      position: "absolute",
      bottom: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      height: 50,
      width: 140,
      backgroundColor: colors.button,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
    },
    buttonText: {
      color: colors.white,
      fontWeight: "600",
    },
    error: {
      color: "red",
    },
  });
};
