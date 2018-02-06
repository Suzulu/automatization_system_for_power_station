import * as React from 'react';
import { connect } from 'react-redux';

//Interfaces
import ILoginState from "./../../interfaces/ILogin";
import {IPdkValues} from './../../interfaces/IPdk';
////////////

//Components
import CheckUrl from './../Nav/CheckUrl';
import { PageHeader } from 'react-bootstrap';
////////////

interface IComponent
{    
    userInfo:ILoginState
    pdk:IPdkValues      
    login: (url:string, username:string, password:string) => {}        
}

class Pdk extends React.Component<IComponent, any>{

    render(){

        if(this.props.userInfo.isLogged){
            return (
                <div>
                    <CheckUrl {...this.props}/>
    
                    <PageHeader style={{textAlign:"center"}}>Предельно допустимые концентрации загрязняющих веществ</PageHeader>
                    
                </div>                
            )
        }else{
            return (
                <p>Необходима регистрация!</p>
            )
        }        
    }
}


const mapStateToProps = (state: any) => ({ 
    userInfo: state.login,
    pdk: state.pdkValues
  });

const mapDispatchToProps = (dispatch: any) => ({     
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pdk);