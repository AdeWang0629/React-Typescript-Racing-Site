import { all } from 'redux-saga/effects';
import authenticationSaga from './Auth/apiSaga';

// Here you can include all the saga which you write for components
export default function* rootSaga(){
  yield all([
    authenticationSaga(),
  ]);
}
