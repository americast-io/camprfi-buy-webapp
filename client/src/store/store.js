import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { deviceReducer, deviceDetailsReducer } from '../reducers/deviceReducer';

const reducer = combineReducers({
    devices: deviceReducer,
    deviceDetails: deviceDetailsReducer




})



let initialState = {}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware

)))

export default store;