import { all } from 'redux-saga/effects';
import authSaga from './Auth/apiSaga';
import raceSaga from './RaceManagement/apiSaga';
import expectedSaga from './ExpectedBattle/apiSaga';
import rankingSaga from './Ranking/apiSaga';
import gradeSaga from './GradeManagement/apiSaga';
import userSaga from './UserManagement/apiSaga';
import homeSaga from './Home/apiSaga';

// Here you can include all the saga which you write for components
export default function* rootSaga(){
  yield all([
    authSaga(),
    raceSaga(),
    expectedSaga(),
    rankingSaga(),
    gradeSaga(),
    userSaga(),
    homeSaga(),
  ]);
}
