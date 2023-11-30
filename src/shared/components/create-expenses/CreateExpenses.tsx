import React, { useEffect, useMemo, useState } from "react";
import { View, TextInput, Text } from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import Touchable from "@shared-components/touchables/Touchable";
import { useTheme } from "@react-navigation/native";
import createStyles from "./CreateExpenses.style";
import { IData } from "sheets/CreateExpenses.sheet";

interface CreateExpensesFormValues {
  description: string;
  amount: string;
  date: Date;
}

const validationSchema = yup.object().shape({
  description: yup.string().required("Title is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  date: yup.date().required("Date is required"),
});

const CreateExpenses: React.FC<{
  onSubmit: (values: CreateExpensesFormValues) => void;
  data: IData | undefined;
  isEdit: boolean | undefined;
}> = ({ onSubmit, data, isEdit }) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [showDateTime, setShowDateTime] = useState(false);
  const [initData, setInitData] = useState<IData>({
    description: "",
    amount: "",
    date: new Date(),
  });

  useEffect(() => {
    if (isEdit && data) {
      setInitData(data);
    }
  }, [data, isEdit]);

  return (
    <Formik
      initialValues={initData}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<CreateExpensesFormValues>) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            onChangeText={props.handleChange("description")}
            onBlur={props.handleBlur("description")}
            value={props.values.description}
          />
          {props.errors.description && (
            <Text style={styles.error}>{props.errors.description}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            onChangeText={props.handleChange("amount")}
            onBlur={props.handleBlur("amount")}
            value={props.values.amount.toString()}
          />
          {props.errors.expenses && (
            <Text style={styles.error}>{props.errors.expenses}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Date"
            keyboardType="numeric"
            onChangeText={props.handleChange("date")}
            onFocus={() => setShowDateTime(true)}
            value={props.values.date.toString()}
            showSoftInputOnFocus={false}
          />

          {showDateTime && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              onChange={() => {
                props.handleChange("date");
                setShowDateTime(false);
              }}
              style={{
                flex: 1,
                paddingTop: 10,
                width: 350,
              }}
              placeholderText="select date"
            />
          )}

          <View style={styles.buttonContainer}>
            <Touchable style={styles.button} onPress={props.handleSubmit}>
              <Text style={styles.buttonText}>
                {isEdit ? "Save" : "Create"}
              </Text>
            </Touchable>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default CreateExpenses;
