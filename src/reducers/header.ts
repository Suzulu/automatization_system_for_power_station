import ILoginState from "./../interfaces/ILogin";

//Initial State

let LoginState :ILoginState = (function add():ILoginState {
    var token = localStorage.getItem("token");
    let isLogged: boolean = false;

    if(token != null) { isLogged = true ;};    
    let employee: ILoginState = {
        
        userName:"Suzulu", isLogged:isLogged, errormsg: "", currentUrl: "Statistic"
   }
    return employee;
})();

////

export function login(state: ILoginState = LoginState, action: any) : ILoginState {   
        let userlogin: ILoginState;  

        switch(action.type) {
                
                case "LOGOUT":
                        sessionStorage.removeItem("token");
                        sessionStorage.removeItem("username");
                        //localStorage.removeItem("token")
                        userlogin = {...state};
                        userlogin.isLogged = false;
                        userlogin.userName = "";
                        userlogin.errormsg = "";                        
                        return userlogin;

                case "IS_AUTHORIZED":                     
                        userlogin = {...state};   
                        userlogin.userName = action.data.username; 
                        userlogin.isLogged = true;   
                        userlogin.errormsg = "";                        

                        sessionStorage.setItem("token", action.data.token);
                        sessionStorage.setItem("username", action.data.username);
                        return userlogin;

                case "LOGIN_HAS_ERRORED":                        
                        userlogin = {...state};
                        userlogin.errormsg = action.error.message;
                        
                        return userlogin;

                case "CHANGEURL":                                  
                        
                        userlogin = {...state};                        
                        userlogin.currentUrl = action.payload
                        
                        return userlogin;

                default:
                        return state;
        }       
        
        
}