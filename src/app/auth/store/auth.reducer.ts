import { User } from '../user.model';
import {
  AuthActions,
  LOGIN_START,
  LOGOUT,
  AUTHENTICATE_FAIL,
  AUTHENTICATE_SUCCESS,
  SIGNUP_START,
  CLEAR_ERROR,
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
    case AUTHENTICATE_SUCCESS:
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
    case SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    case CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }  
    default:
      return state;
  }
}
