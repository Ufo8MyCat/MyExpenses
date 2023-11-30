import { useState } from "react";
import { persistStore } from "redux-persist";
import store from "../store/configureStore";

export const useLoadApp = () => {
  const [stateHydrated, setStateHydrated] = useState(false);

  const appReady = stateHydrated;

  const persister = persistStore(store, undefined, () =>
    setStateHydrated(true),
  );

  return {
    appReady,
    persister,
  };
};
