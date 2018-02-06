export interface IChat{
    messages: Array<IMessage>    
}

export interface IMessage{
    isIncoming:boolean
    text: string
    time: Date    
}