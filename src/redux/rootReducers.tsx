import authReducer from './Auth/reducer';
import raceReducer from './RaceManagement/reducer';
import expectedReducer from './ExpectedBattle/reducer';
import rankingReducer from './Ranking/reducer';
import gradeReducer from './GradeManagement/reducer';
import userReducer from './UserManagement/reducer';

//Include all the reducer to combine and provide to configure store.
export default {
    authReducer,
    raceReducer,
    expectedReducer,
    rankingReducer,
    gradeReducer,
    userReducer,
}