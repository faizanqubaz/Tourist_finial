import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {loginRequestApi} from './api';

function* fetchUser(action) {
    console.log('action in saga',action)
    try {
        const response=yield call(loginRequestApi,action.payload)
        yield put({type: 'LOGIN_SUCESSFULL',payload:response})

    } catch (error) {
        yield put({type: 'LOGIN_FAILED',error})
    }
    // try {
    //    const user = yield call(Api.fetchUser, action.payload.userId);
    //    yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    // } catch (e) {
    //    yield put({type: "USER_FETCH_FAILED", message: e.message});
    // }
 }

function* mySaga() {
    yield takeLatest("LOGIN", fetchUser);
  }
  
  export default mySaga;