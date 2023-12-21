import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {postRequest, getRequest, deleteRequest, putRequest} from '../../config/axiosClient'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* get_places() : Generator<any, void, any> {
  try {
    const response = yield call(() => getRequest('racemanagement/get-places'));

    yield put({type: actions.GETPLACESOK, payload: response.data.places_data});
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

function* new_race_store({payload} : any) : Generator<any, void, any> {
  try {
    const response = yield call(() => postRequest('racemanagement', payload));
    toast.success("登録しました。");
    yield put({type: actions.GETRACESDATAOK, payload: response.data.races_data});
  } catch (error:any) {
    if(error.response.status === 401) {
    //   toast.error(error.response.data.message);
    } else if(error.response.status === 422) {
    //   toast.error(error.response.data.message);
    } else {
      toast.error(error.response.data.message);
    }
  }
}

function* update_race_store({payload} : any) : Generator<any, void, any> {
  try {
    const response = yield call(() => putRequest('racemanagement', payload));

    toast.success("正常に変更されました。");
    yield put({type: actions.GETRACESDATAOK, payload: response.data.races_data});
  } catch (error:any) {
    if(error.response.status === 401) {
    //   toast.error(error.response.data.message);
    } else if(error.response.status === 422) {
    //   toast.error(error.response.data.message);
    } else {
      toast.error(error.response.data.message);
    }
  }
}

function* get_races_data() : Generator<any, void, any> {
  try {
    
    const response = yield call(() => getRequest('racemanagement'));
  
    yield put({type: actions.GETRACESDATAOK, payload: response.data.races_data});
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

function* get_specific_races_data({payload}:any) : Generator<any, void, any> {
  try {
    
    const response = yield call(() => postRequest('racemanagement/get-specific-race-data', payload));
    
    yield put({type: actions.GETRACESDATAOK, payload: response.data.races_data});
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

function* create_race_result({payload}:any) : Generator<any, void, any> {
  try {
    const response = yield call(() => postRequest('racemanagement/create-race-result ', payload));
    toast.success("操作が成功しました。");
    yield put({type: actions.GETRACESDATAOK, payload: response.data.races_data});
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

function* delete_race_data({payload}:any) : Generator<any, void, any> {
  try {
    const response = yield call(() => deleteRequest(`racemanagement`, payload));
    toast.success("操作が成功しました。");
    yield put({type: actions.GETRACESDATAOK, payload: response.data.races_data});
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
  yield all([takeLatest(actions.GETPLACES, get_places)]);
  yield all([takeLatest(actions.NEWRACESTORE, new_race_store)]);
  yield all([takeLatest(actions.UPDATERACESTORE, update_race_store)]);
  yield all([takeLatest(actions.GETRACESDATA, get_races_data)]);
  yield all([takeLatest(actions.GETSPECIFICRACEDATA, get_specific_races_data)]);
  yield all([takeLatest(actions.CREATERACERESULT, create_race_result)]);
  yield all([takeLatest(actions.DELETERACEDATA, delete_race_data)]);
}