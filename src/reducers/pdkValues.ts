import {IPdkValues} from './../interfaces/IPdk';

////////////////////////////////////////////////

let initialStatePdk : IPdkValues = { data:[], isLoading:false, hasErrored:{isError:false, code:0, message:""} }

export function pdkValues(state: IPdkValues = initialStatePdk, action:any) {

    let result: IPdkValues = {...state};

    switch (action.type) {
        case 'PDK_IS_LOADING':        
            result.isLoading = action.isLoading;
            return result;

        case 'PDK_HAS_ERRORED':        
            result.hasErrored = action.error;        
            return result;

        case 'PDK_FETCH_DATA_SUCCESS':
            result.data = action.data
            return result; 
        
        default:
            return state;
    }
    
}