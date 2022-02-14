import { User } from '../user.model';
import {
  AuthActions,
  LOGIN,
  LOGIN_START,
  LOGIN_FAIL,
  LOGOUT,
} from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading:false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case LOGIN:
      const { email, userId, token, expirationDate } = action.payload;
      const user = new User(email, userId, token, expirationDate);
      return {
        ...state,
        authError: null,
        user,
        loading: false
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
