import { takeLatest, put, select, all, call } from "redux-saga/effects";
import ActionTypes from "@actionTypes";
import { RootState } from "store/reducers";
import { IHistoryRecord, initialRecordValue } from "../reducers/history";
import Actions from "@actions";

interface IQueryRequestAction {
  type: string;
  payload: {
    value: string;
    id: string;
  }
}

const getRequestName = (str: string) => {
  const json = JSON.parse(str.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1').trim());
  const dt = new Date();
  const dt_hours = dt.getHours();
  const dt_minutes = dt.getMinutes();
  return json.queryType || `Untitled [${dt_hours < 10 ? `0${dt_hours}` : dt_hours}:${dt_minutes < 10 ? `0${dt_minutes}` : dt_minutes}]`;
};

function* queryRequestWorker({ payload }: IQueryRequestAction) {
  try {
    const { value, id } = payload;

    const records: IHistoryRecord[] = yield select((state: RootState) => state.history.records);
    const record = records.find(rec => rec.id === id);
    
    const response = yield call(fetch, `https://jsonplaceholder.typicode.com/users/${Math.floor(Math.random() * 9 + 1)}`);
    if (response.status < 200 || response.status >= 300) throw new Error(response.status + ' ' + response.statusText);

    const responseValue = yield call([response, response.json]);

    const isInitialValue = record.value === value && records.length === 1 && record.value === initialRecordValue;

    let recordAction;
    if (record && (record.value === value || isInitialValue)) {
      recordAction = Actions.updateRecord({
        id: id,
        name: getRequestName(value),
        value
      });
    } else {
      recordAction = Actions.newRecord({
        name: getRequestName(value),
        value
      });
    }

    yield all([put(recordAction), put(Actions.setResponseValue(JSON.stringify(responseValue, null, '\t')))]);
  } catch (error) {
    yield put(Actions.setResponseValue(error.toString()))
  }
}

export default function* queriesWatcher () {
  yield takeLatest(ActionTypes.QUERY_REQUEST, queryRequestWorker);
}