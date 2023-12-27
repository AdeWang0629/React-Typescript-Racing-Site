import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {postRequest, putRequest } from '../../config/axiosClient'
import axiosClient from '../../config/axiosClient';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToken, setUserToken, removeToken, removeUserToken } from '../../routes/helpers';

function* login({payload} : any) : Generator<any, void, any> {
  try {
    const { data, navigate } = payload;

    const newData = {
      data: data
    };

    const response = yield call(() => postRequest('user', newData));

    const jwtToken = response.data.token;
    if (jwtToken) {
      const userData = response.data.user;

      // removeToken();
      // removeUserToken();
      setToken(jwtToken);
      setUserToken(userData);
      
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      yield put({type: actions.LOGIN_SUCCESS, payload: userData});
      navigate('/');
    }else{
      toast.error("ユーザーIDとパスワードが正しくありません。");
    }
  } catch (error) {
    yield put({type: actions.LOGIN_FAILURE});
    if((error as any).response.status === 401) {
    //   toast.error(error.response.data.message);
    } else if((error as any).response.status === 422) {
    //   toast.error(error.response.data.message);
    } else {
    //   toast.error(error.response.data.message);
    }
  }
}

function* register({payload} : any) : Generator<any, void, any> {
  try {

    const { data, navigate } = payload;

    const newData = {
      data: data
    };

    const response = yield call(() => postRequest('user-register', newData));

    const jwtToken = response.data.token;
    const userData = response.data.user;

    // removeToken();
    // removeUserToken();
    setToken(jwtToken);
    setUserToken(userData);
    
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    yield put({type: actions.LOGIN_SUCCESS, payload: userData});
    navigate('/');
  } catch (error) {
    // yield put({type: actions.REGISTER_FAILURE});
    // if(error.response.status === 422) {
    //   // message.error(error.response.data.message);
    // } else {
    //   // message.error('Something Went Wrong');
    // }
  }
}

function* logout() {
  try {

    removeToken();
    removeUserToken();
    
  } catch (e) {
    yield put({type: actions.LOGOUT_FAILURE});
  }
}

function* save_userdata(action : any) {
  try {

    yield put({type: actions.LOGIN_SUCCESS, payload: action.payload});

  } catch (e) {
    yield put({type: actions.LOGOUT_FAILURE});
  }
}

function* update_userdata({payload} : any) : Generator<any, void, any> {
  try {
    const { data, userId, navigate } = payload;
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    const response = yield call(() => postRequest(`user/${userId}`, formData));

    toast.success("正常に変更されました。");

    const jwtToken = response.data.token;
    const userData = response.data.user;

    removeToken();
    removeUserToken();
    setToken(jwtToken);
    setUserToken(userData);
    
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    yield put({type: actions.LOGIN_SUCCESS, payload: userData});
    
    navigate(-1);
  } catch (error:any) {
    if(error.response.status === 400) {
      toast.error("以前のパスワードが一致しません。");
    } else if(error.response.status === 404) {
      toast.error("ユーザーが見つかりません。");
    } else {
      toast.error(error.response.data.message);
    }
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.LOGIN, login)]);
  yield all([takeLatest(actions.SAVE_USERDATA, save_userdata)]);
  yield all([takeLatest(actions.UPDATE_USERDATA, update_userdata)]);
  yield all([takeLatest(actions.LOGOUT, logout)]);
  yield all([takeLatest(actions.REGISTER, register)]);
}