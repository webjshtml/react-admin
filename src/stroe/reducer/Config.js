import { configAddStatus } from "../Type";
// 全局配置
const config = {
    status: [
        { label: "禁用", value: false },
        { label: "启用", value: true }
    ]
}

// config Reducer
const configReducer = function(state = config, action) {

    switch(action.type){
        case configAddStatus: {
            return {
                ...state,
                status: [...state.status, action.payload],
                // status: [{ label: "禁用", value: false }, { label: "启用", value: true }, { label: "所甩", value: "all" }]
            }
        }

        default:
            return state;
    }



    // if(action.type === configUploadStatus) {
    //     const stateData = JSON.parse(JSON.stringify(state));
    //     const data = stateData.status.filter(item => item.value === action.payload.value)
    //     data[0].label = action.payload.label
    //     return stateData;
    // }

    // return state;

    // return state;
}

export default configReducer;