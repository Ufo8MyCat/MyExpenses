import { createSelector } from "reselect";
import { AppState } from "store/reducers";

export const getAuthState = (state: AppState) => state.auth;

export const getIsLoggedIn = createSelector(
  [getAuthState],
  (state) => state.isLoggedIn,
);
