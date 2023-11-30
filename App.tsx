import "react-native-gesture-handler";
import React from "react";
import { StatusBar, useColorScheme, LogBox, ActivityIndicator } from "react-native";
import SplashScreen from "react-native-splash-screen";

import Navigation from "./src/navigation";
import { isAndroid } from "@freakycoder/react-native-helpers";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { useLoadApp } from "hooks/loadApp.hook";

LogBox.ignoreAllLogs();

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  const { persister, appReady } = useLoadApp();


  React.useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    if (isAndroid) {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }

    setTimeout(() => {
      SplashScreen.hide();
    }, 750);
  }, [scheme, isDarkMode]);

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persister}>
              <Navigation appReady={appReady} />
            </PersistGate>
          </Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default App;
