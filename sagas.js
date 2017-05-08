import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as Api from './api';

function* fetchPosts({ subreddit, auth }) {
    try {
        yield setTitle(subreddit === 'frontpage' ? subreddit : `/r/${subreddit}`);
        const posts = yield call(Api.fetchPosts, subreddit, auth);
        yield put({type: actions.RECEIVE_POSTS, posts, subreddit});
    } catch (e) {
        yield put({type: actions.FAILED_REQUEST_POSTS, message: e.message});
        if(subreddit === 'frontpage') {
            yield fetchPosts({ subreddit: 'popular', auth: false });
        }
    }
}

function* fetchComments(action) {
    try {
        yield setTitle(`Comments`);
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

function* setTitle(text) {
    yield put({type: actions.SET_TITLE, text});
}

function* mySaga() {
    yield takeLatest(actions.REQUEST_POSTS, fetchPosts);
    yield takeLatest(actions.REQUEST_COMMENTS, fetchComments);
    yield takeLatest(actions.REQUEST_USER, fetchUser);
}

export default mySaga;
