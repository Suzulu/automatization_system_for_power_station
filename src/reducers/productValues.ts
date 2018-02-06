
import {IPropuctModel} from "./../actions/getProducts";
import IError from "./../interfaces/IError";

export interface IPropuctData{
    data: Array<IPropuctModel>
    isLoading: boolean
    hasErrored: IError
}

let initialState : IPropuctData = { data:[], isLoading:false, hasErrored:{isError:false, code:0, message:""} }

export function productValues(state: IPropuctData = initialState, action:any) {

    let result: IPropuctData = {...state};

    switch (action.type) {
        case 'PRODUCTS_IS_LOADING':        
            result.isLoading = action.isLoading;
            return result;

        case 'PRODUCTS_HAS_ERRORED':            
            result.hasErrored = action.error;
            return result;

        case 'PRODUCTS_FETCH_DATA_SUCCESS':
            result.data = action.data
            return result;
        
        default:
            return state;
    }
    
}