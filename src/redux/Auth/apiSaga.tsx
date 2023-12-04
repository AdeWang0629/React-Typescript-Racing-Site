import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {postRequest, getCustomRequest, getRequest, deleteRequest} from '../../config/axiosClient'
import axiosClient from '../../config/axiosClient';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { setToken, setUserToken, removeToken, removeUserToken } from '../../routes/helpers';

function* login(payload : any) : Generator<any, void, any> {
  try {
    const { data, navigate } = payload;

    const newData = {
      data: data
    };

    const response = yield call(() => postRequest('user', newData));

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

function* register(payload : any) : Generator<any, void, any> {
  try {

    const { data, navigate } = payload;

    const newData = {
      data: data
    };

    const response = yield call(() => postRequest('register', data));

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

function* logout(payload : any) {
  try {
    const {navigate} = payload;

    removeToken();
    removeUserToken();
    
    navigate('/');
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


export default function* rootSaga() {
  yield all([takeLatest(actions.LOGIN, login)]);
  yield all([takeLatest(actions.SAVE_USERDATA, save_userdata)]);
  yield all([takeLatest(actions.LOGOUT, logout)]);
  yield all([takeLatest(actions.REGISTER, register)]);
}