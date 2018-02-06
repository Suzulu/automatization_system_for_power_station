import * as React from 'react';

//Components


////////////

import './../css/chatMessage.css';

//Interfaces
interface IComponent {
    isIncoming: boolean
    message: string
    time: Date
    img: string    
}

////////////


export default class ChatMessage extends React.Component<IComponent, any>{

    constructor(props: any) {
        super(props);
        this.state = {

        };
    }    

    getTime = () =>{
        
        return this.props.time.getHours() +":" + (this.props.time.getMinutes()<10?'0':'') + this.props.time.getMinutes();
    }

    render() {

        const pos = this.props.isIncoming ? "left" : "right";    
        const bgStyle =  { backgroundImage: `url(${this.props.img})`}   

        return (
            <div className={pos + "-message"}>
                <div className={pos}>
                    <div className="message-avatar" style={bgStyle}></div>
                    <p>{this.getTime()}</p>
                </div>

                <div className={pos +"-message-text"}>
                    <div className={pos + "-message-arrow turn135"}></div>
                    <p>{this.props.message}</p>
                </div>
            </div>
        )
    }
}