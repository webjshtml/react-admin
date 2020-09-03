// 全局配置
const config = {
    status: [
        { label: "禁用", value: false },
        { label: "启用", value: true }
    ]
}

// config Reducer
const configReducer = function(state = config, action) {
    return state;
}

export default configReducer;