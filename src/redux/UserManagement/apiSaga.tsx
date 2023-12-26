import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {postRequest, getRequest, deleteRequest, getSpecificRequest, putRequest} from '../../config/axiosClient'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* get_users_data() : Generator<any, void, any> {
  try {
    const response = yield call(() => getRequest('user_management'));

    yield put({type: actions.GETUSERMANAGEMENTDATAOK, payload: response.data.user_management_data});
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

function* update_users_data({payload}:any) : Generator<any, void, any> {
  try {
    
    const response = yield call(() => putRequest('user_management', payload));

    yield put({type: actions.GETUSERMANAGEMENTDATAOK, payload: response.data.user_management_data});
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

function* format_users_data({payload}:any) : Generator<any, void, any> {
  try {
    const response = yield call(() => postRequest('user_management/format', payload));
    toast.success('正常に変更されました。');
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
  yield all([takeLatest(actions.GETUSERMANAGEMENTDATA, get_users_data)]);
  yield all([takeLatest(actions.UPDATEUSERMANAGEMENTDATA, update_users_data)]);
  yield all([takeLatest(actions.FORMATUSERMANAGEMENTDATA, format_users_data)]);
}