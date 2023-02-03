import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { deviceReducer, deviceDetailsReducer } from '../reducers/deviceReducer';

const reducer = combineReducers({
    devices: deviceReducer,
    deviceDetails: deviceDetailsReducer




})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['device']
}

const persistedReducer = persistReducer(persistConfig, reducer);

let initialState = {}

const middleware = [thunk];
const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware

)))

export const persistor = persistStore(store);

export default store;