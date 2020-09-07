import { createStore, combineReducers } from "redux";
// Reducer
import department from "./reducer/Department";
import job from "./reducer/Job";
import config from "./reducer/Config";

// 创建 Reducer对象
const allReducer = { department, job, config }
const rootReducer = combineReducers(allReducer);

// 创建 Store 实例
const store = createStore(rootReducer);  // 注入

export default store;
