import { IArchiveC, IArchiveF } from './../interfaces/IArchive';

let initialStateC: IArchiveC = { data: [], isLoading: false, hasErrored: { isError: false, code: 0, message: "" } }
let initialStateF: IArchiveF = { data: [], isLoading: false, hasErrored: { isError: false, code: 0, message: "" } }

export function archiveCValues(state: IArchiveC = initialStateC, action: any) {

    let result: IArchiveC = { ...state };

    switch (action.type) {
        case 'ARCHIVEC_IS_LOADING':
            result.isLoading = action.isLoading;
            return result;

        case 'ARCHIVEC_HAS_ERRORED':
            console.log("reducer - " + action.error.code)
            result.hasErrored = action.error;
            return result;

        case 'ARCHIVEC_FETCH_DATA_SUCCESS':
            result.data = action.data
            return result;

        default:
            return state;
    }

}

export function archiveFValues(state: IArchiveF = initialStateF, action: any) {

    let result: IArchiveF = { ...state };

    switch (action.type) {
        case 'ARCHIVEF_IS_LOADING':
            result.isLoading = action.isLoading;
            return result;

        case 'ARCHIVEF_HAS_ERRORED':
            result.hasErrored = action.error;
            return result;

        case 'ARCHIVEF_FETCH_DATA_SUCCESS':
            result.data = action.data
            return result;

        default:
            return state;
    }

}