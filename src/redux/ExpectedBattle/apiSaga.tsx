import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {postRequest, getRequest, deleteRequest, getSpecificRequest} from '../../config/axiosClient'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* get_expected_race_data() : Generator<any, void, any> {
  try {
    
    const response = yield call(() => getRequest('expectedbattle'));

    yield put({type: actions.GETEXPECTEDRACEDATAOK, payload: response.data.expected_race_data});
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

function* get_expected_battle_data({payload}:any) : Generator<any, void, any> {
  try {
    
    const response = yield call(() => getSpecificRequest('expectedbattle', payload));

    yield put({type: actions.GETEXPECTEDBATTLEDATAOK, payload: response.data.expected_battle_data});
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

function* create_expected_battle({payload}:any) : Generator<any, void, any> {
  try {
    const response = yield call(() => postRequest('expectedbattle', payload));
    toast.success("登録しました。");
    yield put({type: actions.GETEXPECTEDBATTLEDATAOK, payload: response.data.expected_battle_data});
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
  yield all([takeLatest(actions.GETEXPECTEDRACEDATA, get_expected_race_data)]);
  yield all([takeLatest(actions.GETEXPECTEDBATTLEDATA, get_expected_battle_data)]);
  yield all([takeLatest(actions.CREATEEXPECTEDBATTLE, create_expected_battle)]);
}