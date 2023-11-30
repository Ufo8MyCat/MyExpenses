import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet } from "react-native";

interface Style {
  container: ViewStyle;
  content: ViewStyle;
  button: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 40,
      borderBottomWidth: 1,
      width: "80%",
      paddingTop: 20,
      paddingBottom: 10,
    },
    button: {
      marginHorizontal: 40,
      borderBottomWidth: 1,
      width: "80%",
      paddingTop: 20,
      paddingBottom: 10,
    }
  });
};
