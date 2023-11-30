import CustomActionSheet from "@shared-components/action-sheet/ActionSheet";
import CreateExpenses from "@shared-components/create-expenses/CreateExpenses";
import React, { useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ActionSheetRef, SheetProps } from "react-native-actions-sheet";

type CreateExpensesSheetProps = {
  title: string;
  onSubmit: () => void;
  onClear: () => void;
};

const CreateExpensesSheet = (props: SheetProps<CreateExpensesSheetProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { title, onSubmit, onClear } = props.payload!;
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const hideSheet = () => {
    actionSheetRef.current?.hide();
  };

  return (
    <CustomActionSheet ref={actionSheetRef}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={onClear} style={styles.cleanContainer}>
            <Text>clean</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text>{title}</Text>
          </View>
          <TouchableOpacity style={styles.closeContainer} onPress={hideSheet}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>

        <CreateExpenses onSubmit={onSubmit} />
      </View>
    </CustomActionSheet>
  );
};

const styles = StyleSheet.create({
  container: { height: Dimensions.get("screen").height / 1.5 },
  contentContainer: { flexDirection: "row" },
  cleanContainer: { flex: 1, paddingLeft: 20 },
  titleContainer: { alignItems: "center", flex: 1 },
  closeContainer: { flex: 1, alignItems: "flex-end", paddingRight: 20 },
});

export default CreateExpensesSheet;
