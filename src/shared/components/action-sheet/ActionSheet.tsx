import React from "react";
import { StyleProp, ViewStyle, View } from "react-native";
import ActionSheet, {
  ActionSheetProps,
  ActionSheetRef,
} from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomContainerStyle {
  containerStyle?: StyleProp<ViewStyle>;
}

type CustomActionSheetProps = ActionSheetProps & CustomContainerStyle;

// eslint-disable-next-line react/display-name
const CustomActionSheet = React.forwardRef<
  ActionSheetRef,
  CustomActionSheetProps
>(({ children, ...props }, ref) => {
  const { bottom } = useSafeAreaInsets();
  if (!ref) {
    return null;
  }
  return (
    <ActionSheet
      gestureEnabled
      animated
      indicatorStyle={{ backgroundColor: "transparent" }}
      isModal={false}
      ref={ref}
      {...props}
    >
      <View style={[{ paddingBottom: bottom }]}>{children}</View>
    </ActionSheet>
  );
});

export default CustomActionSheet;
