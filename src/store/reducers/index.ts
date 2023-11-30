import { PersistPartial } from "redux-persist/es/persistReducer";
import { AuthState, authReducer } from "./auth.reducer";
import { PersistConfig, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";
import { ExpensesState, expensesReducer } from "./expenses.reducer";

export interface AppState {
  auth: AuthState & PersistPartial;
  expenses: ExpensesState;
}

const persistConfig = (reducer: keyof AppState): PersistConfig<any> => ({
  key: reducer,
  storage: AsyncStorage,
  keyPrefix: "",
});

export const rootReducer = combineReducers({
  auth: persistReducer(persistConfig("auth"), authReducer),
  expenses: persistReducer(persistConfig("expenses"), expensesReducer),
});
