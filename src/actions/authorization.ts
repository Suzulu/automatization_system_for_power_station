import IError from "./../interfaces/IError";
//import ILoginState from "./../interfaces/ILogin";

export function loginHasErrored(error:IError) {
    return {
        type: 'LOGIN_HAS_ERRORED',
        error
        //hasErrored: error
    };
}

export function isAuthorized(username:string, token: string) {
    return {
        type: 'IS_AUTHORIZED',
        data: {username: username, token: token}
    };
}

export function authorization(url:string, username:string, password:string) {
    return (dispatch:any) => {        

        fetch(url,{
            method: 'POST',            
            body: 'grant_type=password&username=' + username + '&password=' + password
        }).then(function (response:any) {
            return response;
        })
        .then((response:any) => response.json())
        .then((data:any) => {
            if(data.access_token){
                console.log("Token - ", data.access_token);
                dispatch(isAuthorized(username, data.access_token));
            }
            else{
                let er: IError = {isError:true, code:201, message: data.error_description}
                console.log("Data error - ", data);
                dispatch(loginHasErrored(er))
            }
            
        })
        .catch((error) => {
            
            let er: IError = {isError:true, code:201, message: error}

            dispatch(loginHasErrored(er))
        });
        
    };
}