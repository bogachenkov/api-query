import { spawn } from 'redux-saga/effects';

import authWatcher from './auth';
import queryWatcher from './queries';
import historyWatcher from './history';

export default function* rootSaga() {
  yield spawn(authWatcher);
  yield spawn(queryWatcher);
  yield spawn(historyWatcher);
}