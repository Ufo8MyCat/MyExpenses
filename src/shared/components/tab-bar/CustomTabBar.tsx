import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text, TouchableOpacity, TextStyle } from "react-native";
import createStyles from "./CustomTabBar.style";
import { SheetManager } from "react-native-actions-sheet";
import { DispatchProp } from "react-redux";
import { Expenses, ExpensesActions } from "store/actions/expenses.actions";
import { getUUID } from "utils";

const CustomTabBar: React.FC<BottomTabBarProps & DispatchProp> = ({
  state,
  descriptors,
  navigation,
  dispatch,
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          // eslint-disable-next-line no-nested-ternary
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const styles = createStyles();

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (route.name === "Search") {
            SheetManager.show("createExpenses", {
              payload: {
                title: "Create Expense",
                onSubmit: (values: Expenses) => {
                  console.log(values)
                  values.id = getUUID();
                  dispatch(ExpensesActions.setExpenses(values));
                  SheetManager.hide("createExpenses");
                },
              },
            });
            return;
          }

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const isSearch = label === "Search";

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={isSearch ? styles.specialContainer : styles.defaultContainer}
            key={route.key}
          >
            <Text
              style={
                isSearch
                  ? styles.specialText
                  : isFocused
                  ? styles.focusedText
                  : (styles.text as TextStyle)
              }
            >
              {isSearch ? "+" : label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
