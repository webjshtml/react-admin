import { createStore, combineReducers, applyMiddleware } from "redux";
// redux-thunx
import thunx from "redux-thunk";
import thunxPromise from "redux-promise";
// redux-dev
import { composeWithDevTools } from 'redux-devtools-extension';
// Reducer
import department from "./reducer/Department";
import job from "./reducer/Job";
import config from "./reducer/Config";
import app from "./reducer/App";

// 创建 Reducer对象
const allReducer = { department, job, config, app }
const rootReducer = combineReducers(allReducer);

// 创建 Store 实例
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunx, thunxPromise)));  // 注入

export default store;
