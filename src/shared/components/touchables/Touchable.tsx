import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

interface ITouchable {
  onPress: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const Touchable: React.FC<ITouchable> = ({
  style,
  children,
  onPress,
  ...rest
}) => {
  return (
    <TouchableOpacity {...rest} style={style} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Touchable;
