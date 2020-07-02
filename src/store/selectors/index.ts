import { RootState } from 'store/reducers';
import { createSelector } from 'reselect';

// Auth selectors
export const getLoginSelector = (state: RootState) => state.auth.login;
export const getAuthLoadingStatus = (state: RootState) => state.auth.loading;
export const getAuthStatus = (state: RootState) => state.auth.isAuth;

// Response selectors
export const getResponseLoadingStatus = (state: RootState) => state.response.loading;
export const getResponseValue = (state: RootState) => state.response.responseValue;

// Editor selectors
export const getEditorWidth = (state: RootState) => state.editor.width;

// History selectors
export const getSelectedID = (state: RootState) => state.history.selected;
export const getHistoryRecords = (state: RootState) => state.history.records;

export const getSelectedValue = createSelector(
  getSelectedID, getHistoryRecords,
  (selectedId, records ) => {
    return records.find(rec => rec.id === selectedId)
  }
)

