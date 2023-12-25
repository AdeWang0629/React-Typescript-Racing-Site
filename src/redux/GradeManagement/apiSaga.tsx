import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {postRequest, getRequest, deleteRequest, getSpecificRequest} from '../../config/axiosClient'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* get_ranking_data() : Generator<any, void, any> {
  try {
    const response = yield call(() => getRequest('grade_management'));

    yield put({type: actions.GETGRADEMANAGEMENTDATAOK, payload: response.data.grade_management_data});
  } catch (error) {
    if((error as any).response.status === 401) {
    //   toast.error(error.response.data.message);
    } else if((error as any).response.status === 422) {
    //   toast.error(error.response.data.message);
    } else {
    //   toast.error(error.response.data.message);
    }
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.GETGRADEMANAGEMENTDATA, get_ranking_data)]);
}