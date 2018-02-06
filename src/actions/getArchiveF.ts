import {IEmission} from './../interfaces/IEmission';

import IError from "./../interfaces/IError";

export function archcHasErrored(error:IError) {
    return {
        type: 'ARCHIVEF_HAS_ERRORED',
        error
        //hasErrored: error
    };
}

export function archcIsLoading(bool:boolean) {
    return {
        type: 'ARCHIVEF_IS_LOADING',
        isLoading: bool
    };
}

export function archcFetchDataSuccess(data:Array<IEmission>) {
    return {
        type: 'ARCHIVEF_FETCH_DATA_SUCCESS',
        data
    };
}

export function archcFetchData(url:string) {
    return (dispatch:any) => {
        dispatch(archcIsLoading(true));
        dispatch(archcHasErrored({isError:false, code: 0, message: ""}));

        setTimeout(() => {
            fetch(url)
            .then((response) => {

                dispatch(archcIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.code)
                {      
                    console.log("data code - " + data.code);
                    //throw Error(data);
                    dispatch(archcHasErrored(data))
                    return;
                }
                
                dispatch(archcFetchDataSuccess(data))
            })
            .catch((error) => {
                                
                let er: IError = {isError:true, code:201, message:"Unknown error"}
                
                dispatch(archcHasErrored(er))
            } );
        }, 100);
        
    };
}