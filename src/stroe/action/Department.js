import { addDepartmentListData, updateDepartmentListData } from "../Type";
export function addDepartmentList(params){
    return {
        type: addDepartmentListData,
        data: params.data
    }
}

export function updateDepartmentList(params){
    return {
        type: updateDepartmentListData,
        data: params.data
    }
}