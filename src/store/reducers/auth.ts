import ActionTypes from "@actionTypes";

interface AuthState {
  loading: boolean;
  error: string;
  isAuth: boolean;
  login: string;
}

interface AuthAction {
  type: string;
  payload?: {
    error?: string;
    login?: string;
  }
}

const initialState: AuthState= {
  isAuth: false,
  loading: false,
  login: null,
  error: ''
};

export default function authReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case ActionTypes.SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.SIGN_IN_FAILS:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    case ActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        login: action.payload.login,
        isAuth: true
      }
    case ActionTypes.SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}