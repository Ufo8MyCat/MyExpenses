import CustomActionSheet from "@shared-components/action-sheet/ActionSheet";
import CreateExpenses from "@shared-components/create-expenses/CreateExpenses";
import React, { useRef } from "react";
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ActionSheetRef, SheetProps } from "react-native-actions-sheet";

export type IData = {
  date: Date;
  description: string;
  amount: string;
};

type CreateExpensesSheetProps = {
  title: string;
  onSubmit: () => void;
  isEdit?: boolean;
  data?: IData;
};

const CreateExpensesSheet = (props: SheetProps<CreateExpensesSheetProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { title, onSubmit, isEdit, data } = props.payload!;
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const hideSheet = () => {
    actionSheetRef.current?.hide();
  };

  return (
    <CustomActionSheet ref={actionSheetRef}>
      <View style={styles.container}>
        <View style={styles.closeContainer}>
          <TouchableOpacity onPress={hideSheet}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text>{title}</Text>
        </View>

        <CreateExpenses data={data} isEdit={isEdit} onSubmit={onSubmit} />
      </View>
    </CustomActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height / 1.2,
  },
  titleContainer: { alignItems: "center" },
  closeContainer: { alignItems: "flex-end", padding: 20 },
});

export default CreateExpensesSheet;
