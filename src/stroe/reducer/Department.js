import { addDepartmentListData } from "../Type";
const stateData = {
    departmentList: []
}

const departmentReducer = function(state = stateData, action) {
    switch(action.type){
        case addDepartmentListData: {
            return {
                ...state,
                departmentList: action.data
            }
        }
        default:
            return state;
    }
}
export default departmentReducer;