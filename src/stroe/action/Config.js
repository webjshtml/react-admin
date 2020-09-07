import { configAddStatus, configUploadStatus } from "../Type";
export function addStatus(params){
    return {
        type: configAddStatus,
        payload: { label: params.label, value: params.value }
    }
}

export function uploadStatus(label, value){
    return {
        type: configUploadStatus,
        payload: { label, value }
    }
}