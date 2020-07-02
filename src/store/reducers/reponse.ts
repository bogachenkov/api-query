import ActionTypes from "@actionTypes";

interface IResponseAction {
  type: string;
  payload?: {
    value: string;
    loading?: boolean;
  }
}

interface IResponseState {
  responseValue: string;
  loading: boolean;
}

const initialState: IResponseState = {
  responseValue: null,
  loading: false
}

export default function responseReducer(state = initialState, action: IResponseAction): IResponseState {
  switch (action.type) {
    case ActionTypes.QUERY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ActionTypes.SET_RESPONSE_VALUE:
      return {
        responseValue: action.payload.value,
        loading: false
      }
    case ActionTypes.REMOVE_RESPONSE_VALUE:
      return {
        ...state,
        responseValue: null
      }
    case ActionTypes.SELECT_RECORD:
      return {
        ...state,
        responseValue: null
      }
    case ActionTypes.CLEAR_HISTORY:
      return {
        ...state,
        responseValue: null
      }
    default:
      return state;
  }
}