
export function AddgMessage(isIncoming: boolean, message:string) {
    return {
        type: 'ADD_CHAT_MESSAGE',
        data: {isIncoming, message}
    };
}


export function IncomingMessage(message:string) {
    return (dispatch:any) => {
        
        dispatch(AddgMessage(true, message));
            
    };
}

export function OutcomingMessage(message:string) {
    return (dispatch:any) => {
        
        dispatch(AddgMessage(false, message));
            
    };
}