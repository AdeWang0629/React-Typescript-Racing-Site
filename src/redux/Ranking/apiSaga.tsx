import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {postRequest, getRequest, deleteRequest, getSpecificRequest} from '../../config/axiosClient'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* get_ranking_data({payload}:any) : Generator<any, void, any> {
  try {
    let response;
    if (payload == 1) {
      response = yield call(() => getRequest('ranking/get_month'));
    }else if (payload == 2) {
      response = yield call(() => getRequest('ranking/get_year'));
    }else if (payload == 3) {
      response = yield call(() => getRequest('ranking/first_half_year'));
      console.log(response.data.ranking_data);
    }else if (payload == 4) {
      response = yield call(() => getRequest('ranking/second_half_year'));
    }

    yield put({type: actions.GETRANKINGDATAOK, payload: response.data.ranking_data});
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
  yield all([takeLatest(actions.GETRANKINGDATA, get_ranking_data)]);
}