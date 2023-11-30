// eslint-disable-next-line import/extensions
import { AuthActionType, AuthActions } from "store/actions/auth.actions";

export interface AuthState {
  isLoggedIn: boolean;
}

const initState = {
  isLoggedIn: false,
};

export const authReducer = (
  state: AuthState = initState,
  action: AuthActions,
): AuthState => {
  switch (action.type) {
    case AuthActionType.SetIsLoggedIn:
      return {
        ...initState,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};
