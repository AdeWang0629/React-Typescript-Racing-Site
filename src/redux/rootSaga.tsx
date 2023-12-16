import { all } from 'redux-saga/effects';
import authSaga from './Auth/apiSaga';
import raceSaga from './RaceManagement/apiSaga';
import expectedSaga from './ExpectedBattle/apiSaga';
import rankingSaga from './Ranking/apiSaga';

// Here you can include all the saga which you write for components
export default function* rootSaga(){
  yield all([
    authSaga(),
    raceSaga(),
    expectedSaga(),
    rankingSaga()
  ]);
}
