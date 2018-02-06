import {IConcentration} from './../interfaces/IConcentration';

import IError from "./../interfaces/IError";

export function archcHasErrored(error:IError) {
    return {
        type: 'ARCHIVEC_HAS_ERRORED',
        error
        //hasErrored: error
    };
}

export function archcIsLoading(bool:boolean) {
    return {
        type: 'ARCHIVEC_IS_LOADING',
        isLoading: bool
    };
}

export function archcFetchDataSuccess(data:IConcentration) {
    return {
        type: 'ARCHIVEC_FETCH_DATA_SUCCESS',
        data
    };
}

export function archcFetchData(url:string) {
    return (dispatch:any) => {
        dispatch(archcIsLoading(true));

        setTimeout(() => {
            fetch(url)
            .then((response) => {
               
                // if (!response.ok) {
                //     console.log(response.statusText);
                //     throw Error(response.statusText);
                // }
               
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
        }, 2000); //test
        
    };
}