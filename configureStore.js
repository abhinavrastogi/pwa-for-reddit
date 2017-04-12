import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers/combined';
import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

function configureStore(preloadedState) {
    let store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(mySaga);
    return store;
};

export default configureStore;
