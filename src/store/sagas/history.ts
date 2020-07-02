import { takeLatest, select, put, all } from 'redux-saga/effects';
import ActionTypes from '@actionTypes';
import { RootState } from 'store/reducers';
import Actions from '@actions';

interface IRemoveRecordAction {
  type: string;
  payload: {
    id: string;
  }
};

interface IRunFromHistoryAction {
  type: string;
  payload: {
    id: string;
    value: string;
  }
}

function* removeRecordWorker({payload}: IRemoveRecordAction) {
  try {
    const selectedId = yield select((state: RootState) => state.history.selected);
    if (selectedId === payload.id) {
      yield all([
        put({ type: ActionTypes.REMOVE_RESPONSE_VALUE }),
        put(Actions.removeSelectedRecord(payload.id))
      ]);
    } else yield put(Actions.removeRecord(payload.id));
  } catch (error) {
    console.error(error);
  }
}

function* runFromHistory({ payload }: IRunFromHistoryAction) {
  try {
    const { id, value } = payload;
    yield all([
      put(Actions.selectRecord(id)),
      put(Actions.requestQuery({ id, value }))
    ])
  } catch (error) {
    console.error(error);
  }
}

function* historyWatcher() {
  yield takeLatest(ActionTypes.REMOVE_RECORD_REQUEST, removeRecordWorker);
  yield takeLatest(ActionTypes.RUN_FROM_HISTORY, runFromHistory);
}

export default historyWatcher;