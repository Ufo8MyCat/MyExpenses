import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";

import createStyles from "./ProfileScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getTotalItem } from "store/selectors/expenses.selector";
import { AuthActions } from "store/actions/auth.actions";
import { ExpensesActions } from "store/actions/expenses.actions";
import { SCREENS } from "@shared-constants";

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const totalItems = useSelector(getTotalItem);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const SignOutPress = () => {
    dispatch(ExpensesActions.removeAllExpenses());
    navigation.navigate(SCREENS.LOGIN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text color={colors.text}>{"Total Expenses items"}</Text>
        <Text color={colors.text}>{`${totalItems}`}</Text>
      </View>
      <TouchableOpacity onPress={SignOutPress} style={styles.button}>
        <Text color={colors.text}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
