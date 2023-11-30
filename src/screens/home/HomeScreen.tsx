import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import createStyles from "./HomeScreen.style";
import CardItem from "./components/card-item/CardItem";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SheetManager } from "react-native-actions-sheet";
import { useDispatch, useSelector } from "react-redux";
import {
  getExpenses,
  getTotalExpenses,
} from "store/selectors/expenses.selector";
import { Expenses, ExpensesActions } from "store/actions/expenses.actions";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const dispatch = useDispatch();

  const expenses = useSelector(getExpenses);

  const totalExpenses = useSelector(getTotalExpenses);

  const [sortedList, setSortedList] = useState(new Map());

  const createListByDate = useCallback(() => {
    const mappedList = new Map();
    if(!expenses.length) {
      return;
    }
    
    expenses.forEach((item) => {
      const day = item.date.getDate();
      const month = item.date.getMonth();
      const year = item.date.getFullYear();

      const fullDate = `${day}.${month}.${year}`;
      if (!mappedList.has(fullDate)) {
        mappedList.set(fullDate, [item]);
      } else {
        mappedList.set(fullDate, [...mappedList.get(fullDate), item]);
      }
    });
    setSortedList(mappedList);
  }, [expenses, totalExpenses]);

  useEffect(() => {
    createListByDate();
  }, [createListByDate, expenses]);

  const handleItemPress = (item: Expenses) => {
    SheetManager.show("createExpenses", {
      payload: {
        title: "Edit Expense",
        onSubmit: (values) => console.log(values),
        isEdit: true,
        data: item,
      },
    });
  };

  const onRemoveItem = (id: string) => {
    console.log(id)
    dispatch(ExpensesActions.removeExpenseById(id));
  };

  const showFilterSheet = () => {
    SheetManager.show("filter", {
      payload: {
        title: "Filters",
        onSubmit: () => {},
        onClear: () => {},
      },
    });
  };

  const List = useCallback(
    (data: any) => (
      <View style={styles.listContainer}>
        <FlatList
          data={data.data}
          renderItem={({ item }) => (
            <CardItem
              data={item}
              onRemove={onRemoveItem}
              onPress={() => handleItemPress(item)}
            />
          )}
        />
      </View>
    ),
    [styles.listContainer, expenses],
  );

  const ListTitle = useCallback(
    ({ value, title }) => {
      return (
        <View
          key={title}
          style={{
            width: Dimensions.get("screen").width,
          }}
        >
          <View style={{ backgroundColor: "rgb(243,238, 238)" }}>
            <Text>{title}</Text>
          </View>
          <List data={value} />
        </View>
      );
    },
    [List, expenses, totalExpenses],
  );

  const renderList = () => {
    const compArray: Array<React.JSX.Element> = [];
    sortedList.forEach((value, key) => {
      compArray.push(<ListTitle key={key} value={value} title={key} />);
    });
    return compArray;
  };

  if(!expenses.length) {
    return <View style={styles.empty}>
      <Text>No Expenses press + to add</Text>
    </View>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text bold color={colors.text}>
          {`Total Expenses: $${totalExpenses}`}
        </Text>
        <View style={styles.filterStyle}>
          <TouchableOpacity
            onPress={showFilterSheet}
            style={styles.filterButton}
          >
            <Text color={colors.white}>Filter</Text>
          </TouchableOpacity>
        </View>
        {renderList()}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
