import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as Api from './api';

function* fetchPosts(action) {
   try {
      const posts = yield call(Api.fetchPosts, action.subreddit);
      yield put({type: actions.RECEIVE_POSTS, posts, subreddit: action.subreddit});
   } catch (e) {
      yield put({type: actions.FAILED_REQUEST_POSTS, message: e.message});
   }
}

function* mySaga() {
  yield takeLatest(actions.REQUEST_POSTS, fetchPosts);
}

export default mySaga;
