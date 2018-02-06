import * as React from 'react';
import { connect } from 'react-redux';

//Components
import { Glyphicon } from 'react-bootstrap';
import Select from 'react-select';

import ChatMessage from './chatMessage';
//

//Interfaces
import { IChat, IMessage } from './../../interfaces/IChat';

export interface IComponent
{     
   data: IChat
   incMessage: (message:string)=>{}
   outMessage: (message:string)=>{}
}
////////////

//Actions
import {IncomingMessage, OutcomingMessage} from './../../actions/chatActions';
//////////

//Other
import './../css/chat.css';
import { FaSmileO } from 'react-icons/lib/fa/';
import { MdSend } from 'react-icons/lib/md/';

//SignalR
import { hubConnection } from 'signalr-no-jquery';
/////////

const connection = hubConnection('http://localhost/SignalRMvc', );
// const connection = hubConnection('http://localhost:43020/', );
const hubProxy = connection.createHubProxy('myHub');

connection.start({ jsonp: true, transport: 'webSockets' })
        .done(function(){ console.log('Now connected, connection ID=' + connection.id); })
        .fail(function(error:any){ console.log('Could not connect', error); });

let body:HTMLElement | null;

class ChatForm extends React.Component<IComponent,any>{

    constructor(){
        super() 
          this.state = { 
            selectedOptionName: {value: 1, label: 'Matt Thompson'},
            sendMessage:"",
            isTyping: false
        }        
    } 

    recive = (name:string, message:string) => {        
        this.props.incMessage(message);        
    };

    typing = () =>{
        console.log("Typing");
        this.setState({isTyping:true});
        setTimeout(()=>{
            this.setState({isTyping:false});
        }, 2000);
    }

    componentDidUpdate(){
        if(body && this.state.isTyping != true)
            body.scrollTop = body.scrollHeight;
    }

    componentDidMount(){        
        hubProxy.on('reciveMessage', this.recive);
        hubProxy.on('typing', this.typing);
        
        body = document.getElementById("bodyId");
        if(body)
            body.scrollTop = body.scrollHeight;
    }

    componentWillUnmount(){
        //
    }  

    btnClickHandler = (name:string) => {        

        if(name == "MdSend"){
            this.props.outMessage(this.state.sendMessage);
            hubProxy.invoke('send', "Suzulu", this.state.sendMessage);
            this.setState({sendMessage:""});
        }
    }

    selectorHandleChange = (selectedOptionName:any) => {
        this.setState({ selectedOptionName });  
        console.log("selectedOption - ", selectedOptionName);      
    }

    sendChange = (e:any) => {
        this.setState({sendMessage:e.target.value});
        hubProxy.invoke('typing');
    }

    sendKeyDown = (e:any) => {               
        if (e.keyCode == 13 && this.state.sendMessage != "") {
            e.preventDefault();
            this.props.outMessage(this.state.sendMessage);
            hubProxy.invoke('send', "Suzulu", this.state.sendMessage);
            this.setState({sendMessage:""});
        }
    }
   
    render(){

        const optionsSelect = [{value: 1, label: 'Matt Thompson'},{value: 2, label: 'Claire Sharwood'}];
        
        const { selectedOptionName} = this.state;
        const valueName = selectedOptionName && selectedOptionName.value;
        
        const bodyMessageSection = () => {

            let msg = this.props.data.messages.map((element:IMessage, index) => {

                return (<ChatMessage 
                            key={index}
                            isIncoming={element.isIncoming} 
                            img={ element.isIncoming ? "/img/spacebot_avatar.png" : "/img/avatar.jpg"} 
                            time={element.time} 
                            message={element.text}
                        />)
            })

            return msg
        }

        return(
            <div className="chat-container">                
                <div className="chat-left-panel">
                    <div className="chat-header">
                        <div className="chat-text">{this.state.isTyping ?<p><span style={{fontWeight:"bold"}}>Kristen Mckellar</span> is typing...</p> : null}</div>
                        <div className="chat-vline"></div>
                        <div className="chat-button" onClick={()=>{this.btnClickHandler("star")}}><Glyphicon glyph="star" className="chat-icon"/></div>
                        <div className="chat-vline"></div>
                        <div className="chat-button" onClick={()=>{this.btnClickHandler("earphone")}}><Glyphicon glyph="earphone" className="chat-icon"/></div>
                        <div className="chat-vline"></div>
                        <div className="chat-button" onClick={()=>{this.btnClickHandler("facetime-video")}}><Glyphicon glyph="facetime-video" className="chat-icon"/></div>
                    </div>
                        <div id="bodyId" className="chat-body">
                        {bodyMessageSection()}                        
                    </div>

                    <div className="chat-footer">
                        <div className="chat-button" onClick={()=>{this.btnClickHandler("paperclip")}}><Glyphicon glyph="paperclip" className="chat-icon turn135"/></div>
                        <input type="text" className="chat-input" onChange={this.sendChange} onKeyDown={this.sendKeyDown} placeholder={"Type your message..."} value={this.state.sendMessage}/>
                        <div className="chat-button" onClick={()=>{this.btnClickHandler("FaSmileO")}}><div className="chat-icon-smile"><FaSmileO/></div></div>
                        <div className="chat-button" onClick={()=>{this.btnClickHandler("MdSend")}}><div className="chat-icon-send"><MdSend color={"white"} fontSize={20}/></div></div>
                    </div>                    
                </div>

                <div className="chat-right-panel">
                    <div className="chat-header-rp">
                        <div className="chat-button" onClick={()=>{this.btnClickHandler("bell")}}>
                            <div className="bell-circle"></div>
                            <Glyphicon glyph="bell" className="chat-icon"/>
                        </div>
                        <div className="select-box">
                            <Select
                                name="name"
                                value={valueName}
                                onChange={this.selectorHandleChange}
                                options={optionsSelect}                                
                            />
                        </div>                        
                    </div>

                    <div className="rp-body-menu">
                        <img src="/img/fb-messenger.svg" style={{height:"20px", width:"20px", marginTop:"20px"}}/>                        
                        <p>...</p>
                    </div>

                    <div className="chat-body-pr">
                        <div className="chat-main-photo" ></div>
                        <p style={{fontSize:"20pt"}}>Kristen Mckellar</p>
                        <p style={{fontSize:"14pt", color:"#293037", opacity:0.7}}>Cape Town, RSA</p>
                        <div className="chat-gline" style={{marginTop:"35px"}}></div>                        
                        <div className="rp-detail-box">
                            <p>Nickname:</p>
                            <p className="chat-sh-text">Killa Kella</p>                            
                        </div>
                        <div className="chat-gline" style={{margin:"0px 30px"}}></div>
                        <div className="rp-detail-box">
                            <p>Tel:</p>
                            <p className="chat-sh-text">0721439920</p>                            
                        </div>
                        <div className="chat-gline" style={{margin:"0px 30px"}}></div>
                        <div className="rp-detail-box">
                            <p>Date of Birth:</p>
                            <p className="chat-sh-text">July 12, 1988</p>                            
                        </div>
                        <div className="chat-gline" style={{margin:"0px 30px"}}></div>
                        <div className="rp-detail-box">
                            <p>Gender:</p>
                            <p className="chat-sh-text">Female</p>                            
                        </div>
                        <div className="chat-gline" style={{margin:"0px 30px"}}></div>
                        <div className="rp-detail-box">
                            <p>Language:</p>
                            <p className="chat-sh-text">English</p>                            
                        </div>
                        <div className="chat-gline" style={{margin:"0px 30px"}}></div>
                    </div>
                </div>                
            </div>
        );
    };
};

const mapStateToProps = (state: any) => ({     
    data:state.chatValues
  });

const mapDispatchToProps = (dispatch: any) => ({
    incMessage:(message:string) => dispatch(IncomingMessage(message)),
    outMessage:(message:string) => dispatch(OutcomingMessage(message))    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatForm);