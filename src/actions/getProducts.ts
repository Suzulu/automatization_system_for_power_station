import IError from "./../interfaces/IError";

export interface IPropuctModel{
    Id:number
    Category:string
    SubCategory:string
    CountOrders:number
    Img:string
    Link:string
    ShipFrom:Array<string>
}


export function hasErrored(error:IError) {
    return {
        type: 'PRODUCTS_HAS_ERRORED',
        error        
    };
}

export function isLoading(isLoading:boolean)
{
    return {
        type: "PRODUCTS_IS_LOADING",
        isLoading
    }
}


export function productFetchDataSuccess(data:Array<IPropuctModel>) {
    return {
        type: 'PRODUCTS_FETCH_DATA_SUCCESS',
        data
    };
}


export function productsFetchData(url:string) {
    return (dispatch:any) => {
        dispatch(isLoading(true));

        setTimeout(() => {
            fetch(url)
            .then((response) => {   

                dispatch(isLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.code)
                {      
                    console.log("data code - " + data.code);
                    //throw Error(data);
                    dispatch(hasErrored(data))
                    return;
                }
                
                dispatch(productFetchDataSuccess(data))
            })
            .catch((error) => {
                                
                let er: IError = {isError:true, code:201, message:"Unknown error"}
                
                dispatch(hasErrored(er))
            } );
        }, 100);
        
    };
}