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

function* fetchComments(action) {
   try {
      const comments = yield call(Api.fetchComments, action.subreddit, action.post_id, action.post_title);
      yield put({type: actions.RECEIVE_COMMENTS, comments, subreddit: action.subreddit});
   } catch (e) {
      yield put({type: actions.FAILED_REQUEST_COMMENTS, message: e.message});
   }
}

function* fetchComments(action) {
   try {
      const comments = yield call(Api.fetchComments, action.subreddit, action.post_id, action.post_title);
      yield put({type: actions.RECEIVE_COMMENTS, comments, subreddit: action.subreddit});
   } catch (e) {
      yield put({type: actions.FAILED_REQUEST_COMMENTS, message: e.message});
   }
}

function* fetchUser() {
   try {
      const userInfo = yield call(Api.fetchUserInfo);
      yield put({type: actions.RECEIVE_USER, userInfo});
   } catch (e) {
      yield put({type: actions.FAILED_REQUEST_USER, message: e.message});
   }
}

function* mySaga() {
  yield takeLatest(actions.REQUEST_POSTS, fetchPosts);
  yield takeLatest(actions.REQUEST_COMMENTS, fetchComments);
  yield takeLatest(actions.REQUEST_USER, fetchUser);
}

export default mySaga;
