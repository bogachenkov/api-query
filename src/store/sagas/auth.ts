import { put, take, fork, cancel, delay } from 'redux-saga/effects';
import ActionTypes from '@actionTypes';
import Actions, { ISignInCreds } from '@actions';

function* signInWorker(credentials: ISignInCreds) {
  try {
    yield delay(1000);
    sessionStorage.setItem('login', credentials.login);
    yield put(Actions.signInSuccess({ login: credentials.login }));
  } catch(e) {
    yield put(Actions.signInFails(e));
  }
}

function* authWatcher() {
  while (true) {
    const login = sessionStorage.getItem('login');

    if (login) {
      yield put(Actions.signInSuccess({ login }));
      yield take(ActionTypes.SIGN_OUT);
      sessionStorage.removeItem('login');
    } else {
      const { payload: { credentials } } = yield take(ActionTypes.SIGN_IN_REQUEST);
      const signInTask = yield fork(signInWorker, credentials);
      const action = yield take([ ActionTypes.SIGN_IN_FAILS, ActionTypes.SIGN_OUT ]);
      if (action.type === ActionTypes.SIGN_OUT) {
        sessionStorage.removeItem('login');
        yield cancel(signInTask);
      }
    } 
  }
}

export default authWatcher;