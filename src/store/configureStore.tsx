import { createStore, Store } from "redux";
import { AppState, rootReducer } from "./reducers/index";

export const store: Store<AppState> = createStore(rootReducer);

export default store;
