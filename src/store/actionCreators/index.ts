import ActionTypes from "@actionTypes";
import { IHistoryRecord } from "store/reducers/history";

export interface ISignInCreds {
  login: string;
  password: string;
};
export interface ISignInData {
  login: string;
};
export interface IRequestQueryData {
  value: string;
  id: string;
}

export default class Actions {
  // Auth actions
  static signInAction(credentials: ISignInCreds) {
    return {
      type: ActionTypes.SIGN_IN_REQUEST,
      payload: {
        credentials
      }
    }
  }
  static signInSuccess(payload: ISignInData) {
    return {
      type: ActionTypes.SIGN_IN_SUCCESS,
      payload
    }
  }
  static signInFails(error: Error) {
    return {
      type: ActionTypes.SIGN_IN_FAILS,
      payload: {
        error
      }
    }
  }

  // Editor & EditorActions actions
  static requestQuery(payload: IRequestQueryData) {
    return {
      type: ActionTypes.QUERY_REQUEST,
      payload
    }
  }
  static setResponseValue(value: string) {
    return {
      type: ActionTypes.SET_RESPONSE_VALUE,
      payload: { value }
    }
  }

  static setWidthOnResize(width: number) {
    return {
      type: ActionTypes.SET_WIDTH,
      payload: { width }
    }
  }

  // History actions
  static updateRecord(payload: IHistoryRecord) {
    return {
      type: ActionTypes.UPDATE_RECORD,
      payload
    }
  }
  static newRecord(payload: IHistoryRecord) {
    return {
      type: ActionTypes.NEW_RECORD,
      payload
    }
  }

  static selectRecord(id: string) {
    return {
      type: ActionTypes.SELECT_RECORD,
      payload: { id }
    }
  }
  static removeRecordRequest(id: string) {
    return {
      type: ActionTypes.REMOVE_RECORD_REQUEST,
      payload: { id }
    }
  }
  static removeRecord(id: string) {
    return {
      type: ActionTypes.REMOVE_RECORD,
      payload: { id }
    }
  }
  static removeSelectedRecord(id: string) {
    return {
      type: ActionTypes.REMOVE_SELECTED_RECORD,
      payload: { id }
    }
  }
  static clearHistory() {
    return {
      type: ActionTypes.CLEAR_HISTORY
    }
  }
  static runFromHistory(id: string, value: string) {
    return {
      type: ActionTypes.RUN_FROM_HISTORY,
      payload: { id, value }
    }
  }
};