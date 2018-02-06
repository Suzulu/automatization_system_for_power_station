import {IMonthData} from "./../interfaces/IReports"

import IError from "./../interfaces/IError";

export function reportHasErrored(error:IError) {
    return {
        type: 'REPORTMONTH_HAS_ERRORED',
        error
        //hasErrored: error
    };
}

export function reportIsLoading(bool:boolean) {
    return {
        type: 'REPORTMONTH_IS_LOADING',
        isLoading: bool
    };
}

export function reportFetchDataSuccess(data:IMonthData) {
    return {
        type: 'REPORTMONTH_FETCH_DATA_SUCCESS',
        data
    };
}

export function reportFetchData(url:string) {
    return (dispatch:any) => {
        dispatch(reportIsLoading(true));

        setTimeout(() => {
            fetch(url)
            .then((response) => { 
               
                dispatch(reportIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.code)
                {      
                    console.log("data code - " + data.code);
                    //throw Error(data);
                    dispatch(reportHasErrored(data))
                    return;
                }
                
                dispatch(reportFetchDataSuccess(data))
            })
            .catch((error) => {
                                
                let er: IError = {isError:true, code:201, message:"Unknown error"}
                
                dispatch(reportHasErrored(er))
            } );
        }, 1000);
        
    };
}