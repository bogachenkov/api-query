import { combineReducers } from 'redux';

import auth from './auth';
import history from './history';
import response from './reponse';
import editor from './editor';

const rootReducer = combineReducers({
  auth,
  history,
  response,
  editor
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;