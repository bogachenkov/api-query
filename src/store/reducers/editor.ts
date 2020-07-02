import ActionTypes from "@actionTypes";

interface IResizeState {
  width: number;
}

interface IResizeAction {
  type: string;
  payload: {
    width: number;
  }
}

const initialState:IResizeState = {
  width: null
};

export default function(state = initialState, action: IResizeAction):IResizeState {
  switch (action.type) {
    case ActionTypes.SET_WIDTH:
      return {
        width: action.payload.width
      }
    case ActionTypes.SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}