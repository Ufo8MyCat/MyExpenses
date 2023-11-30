import React, { useMemo } from "react";
import { View, StyleProp, ViewStyle, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

import createStyles from "./CardItem.style";
import { ICardItem } from "@services/models";
import Text from "@shared-components/text-wrapper/TextWrapper";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data: ICardItem;
  onPress: () => void;
  onRemove: (id: string) => void;
}

const CardItem: React.FC<ICardItemProps> = ({
  style,
  data,
  onPress,
  onRemove,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { description, amount, id } = data;

  const Description = () => <Text color={colors.text}>{description}</Text>;

  const Expenses = () => (
    <View style={styles.expenseContainer}>
      <Text>{amount}</Text>
    </View>
  );

  const Remove = () => (
    <TouchableOpacity
      onPress={() => onRemove(id)}
      style={styles.closeContainer}
    >
      <Text>X</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Remove />
        <Description />
        <Expenses />
      </TouchableOpacity>
    </View>
  );
};

export default CardItem;
