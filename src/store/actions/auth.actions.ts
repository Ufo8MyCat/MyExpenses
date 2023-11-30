import { ActionsUnion, createAction } from "@martin_hotell/rex-tils";

export enum AuthActionType {
  SetIsLoggedIn = "[auth] setIsLoggedIn",
}

export const AuthActions = {
  setIsLoggedIn: (isLoggedIn: boolean) =>
    createAction(AuthActionType.SetIsLoggedIn, isLoggedIn),
};

export type AuthActions = ActionsUnion<typeof AuthActions>;
