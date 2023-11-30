// LoginScreen.tsx
import React, { useMemo } from "react";
import { View, TextInput, Text } from "react-native";
import { Formik as LoginForm } from "formik";
import * as yup from "yup";
import createStyles from "./LoginScreen.style";
import { useNavigation, useTheme } from "@react-navigation/native";
import Touchable from "@shared-components/touchables/Touchable";
import { SCREENS } from "@shared-constants";
import { AuthActions } from "store/actions/auth.actions";
import { useDispatch } from "react-redux";

interface FormValues {
  fullName: string;
}

const validationSchema: yup.SchemaOf<FormValues> = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
});

const LoginScreen: React.FC = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { navigate } = useNavigation();
  const dispatch  = useDispatch();

  dispatch(AuthActions.setIsLoggedIn(false));

  const handleLogin = () => {
    dispatch(AuthActions.setIsLoggedIn(true));
    navigate(SCREENS.HOME);
  };

  return (
    <View style={styles.container}>
      <LoginForm
        initialValues={{ fullName: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              style={styles.input}
              textAlignVertical={"bottom"}
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              value={values.fullName}
              placeholder="Enter Name"
            />
            {touched.fullName && errors.fullName && (
              <Text style={styles.error}>{errors.fullName}</Text>
            )}

            <View style={styles.buttonContainer}>
              <Touchable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>{"Login"}</Text>
              </Touchable>
            </View>
          </>
        )}
      </LoginForm>
    </View>
  );
};

export default LoginScreen;
