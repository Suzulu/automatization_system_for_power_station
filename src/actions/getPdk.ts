import {IPdkModel} from './../interfaces/IPdk';

import IError from "./../interfaces/IError";

/////////////////////////////////////////////

export function pdkHasErrored(error:IError) {
    return {
        type: 'PDK_HAS_ERRORED',
        error        
    };
}

export function pdkIsLoading(bool:boolean) {
    return {
        type: 'PDK_IS_LOADING',
        isLoading: bool
    };
}

export function pdkFetchDataSuccess(data:Array<IPdkModel>) {
    return {
        type: 'PDK_FETCH_DATA_SUCCESS',
        data
    };
}

export function pdkFetchData(url:string) {
    return (dispatch:any) => {
        dispatch(pdkIsLoading(true));

        setTimeout(() => {
            fetch(url)
                .then((response) => {
                    dispatch(pdkIsLoading(false));
                    return response;
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.code)
                    { 
                        dispatch(pdkHasErrored(data))
                        return;
                    }
                    
                    dispatch(pdkFetchDataSuccess(data))
                })
                .catch((error) => {
                                    
                    let er: IError = {isError:true, code:201, message:"Unknown error"}
                    
                    dispatch(pdkHasErrored(er))
                } 
            );
        }, 1000);
        
    };
}