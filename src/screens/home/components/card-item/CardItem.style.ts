import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";

interface Style {
  container: ViewStyle;
  descriptionTextStyle: TextStyle;
  contentContainer: ViewStyle;
  expenseContainer: ViewStyle;
  closeContainer: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      height: 60,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: colors.borderColor,
      backgroundColor: colors.dynamicBackground,
    },
    descriptionTextStyle: {
      marginTop: 8,
    },
    contentContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    expenseContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end",
    },
    closeContainer: { marginRight: 20, padding: 10 },
  });
};
