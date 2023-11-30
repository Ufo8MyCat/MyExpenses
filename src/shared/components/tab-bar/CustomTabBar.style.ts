import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, Dimensions, TextStyle } from "react-native";
interface Style {
  defaultContainer: ViewStyle;
  specialContainer: ViewStyle;
  text: TextStyle;
  focusedText: TextStyle;
  specialText: TextStyle;
}

const screenWidth = Dimensions.get("window").width;

export default () => {
  return StyleSheet.create<Style>({
    defaultContainer: {
      flex: 1,
      height: 70,
      justifyContent: "center",
      alignItems: "center",
      width: 50,
    },
    specialContainer: {
      height: 60,
      width: 60,
      borderRadius: 30,
      backgroundColor: "blue",
      position: "absolute",
      top: -30,
      left: screenWidth / 2 - 30,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "black",
    },
    focusedText: {
      color: "blue",
    },
    specialText: {
      color: "white",
      fontSize: 22,
      fontWeight: "bold",
    },
  });
};
