import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SCREENS } from "@shared-constants";
import { DarkTheme, LightTheme, palette } from "@theme/themes";

import HomeScreen from "@screens/home/HomeScreen";
import SearchScreen from "@screens/search/SearchScreen";
import ProfileScreen from "@screens/profile/ProfileScreen";
import LoginScreen from "@screens/login/LoginScreen";
import withKeyboardDismiss from "@shared-components/dismiss-keyboard/DismissKeyboardView";
import CustomTabBar from "@shared-components/tab-bar/CustomTabBar";
import { SheetProvider } from "react-native-actions-sheet";
import "../sheets/sheets";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn } from "store/selectors/auth.selector";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type Props = {
  appReady: boolean;
};

const Navigation = ({ appReady }: Props) => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  const isLoggedIn = useSelector(getIsLoggedIn);

  const dispatch = useDispatch();

  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  const renderLoginScreen = () => {
    return <LoginScreen />;
  };

  const RenderTabNavigation = () => {
    return (
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar dispatch={dispatch} {...props} />}
        screenOptions={() => ({
          headerShown: false,
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: isDarkMode ? palette.black : palette.white,
          },
        })}
      >
        <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
        <Tab.Screen name={SCREENS.SEARCH} component={SearchScreen} />
        <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <SheetProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoggedIn && (
            <Stack.Screen
              name={SCREENS.LOGIN}
              component={withKeyboardDismiss(renderLoginScreen)}
            />
          )}
          <Stack.Screen name={SCREENS.HOME} component={RenderTabNavigation} />
        </Stack.Navigator>
      </SheetProvider>
    </NavigationContainer>
  );
};

export default Navigation;
