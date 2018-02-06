
import {IChat, IMessage} from './../interfaces/IChat';


let initialState : IChat = { messages:[] };
// initialState.messages.push({ isIncoming: true, text: "Hello", time: new Date()});
// initialState.messages.push({ isIncoming: false, text: "Hi", time: new Date()});


export function chatValues(state: IChat = initialState, action:any) {

    let result: IChat = {...state};

    switch (action.type) {

        case 'ADD_CHAT_MESSAGE':
            let message: IMessage = { isIncoming: action.data.isIncoming, text: action.data.message, time: new Date()}
            result.messages.push(message);            
            return result;
        
        default:
            return state;
    }
    
}

