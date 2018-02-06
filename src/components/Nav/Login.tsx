import * as React from "react";
import { connect } from 'react-redux';

//Components
import { Button } from 'react-bootstrap';
import { Form, FormGroup, Col, FormControl } from 'react-bootstrap';
////////////

//Interfaces
import ILoginState from "./../../interfaces/ILogin";
////////////

//Actions
import {authorization} from "./../../actions/authorization"
////////////

interface IComponent
{    
    userInfo:ILoginState       
    login: (url:string, username:string, password:string) => {}        
}

class Login extends React.Component<IComponent, any>
{ 
    constructor(){
        super() 
          this.state = { 
            username:"",
            password:""          
        }       
        
    }

    // login = () => {
    //     //isAuthorized
    // }

    click = () => {        
        
        this.props.login("http://localhost/WebApiBackend/token", this.state.username, this.state.password);       

    }    

    nameOnChange = (e:any) => {

        this.setState({username:e.target.value});              
    }

    passOnChange = (e:any) => {
        
        this.setState({password:e.target.value});                
    }

    render() {        

        const errorMessage = this.props.userInfo.errormsg ? <p style={{color: "red"}}>Incorrect password or account name</p> : null

        return (
            <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                    <Col sm={2}>
                        Login
                    </Col>
                    <Col sm={10}>
                        <FormControl value={this.state.username} placeholder="Login" onChange={this.nameOnChange}/>
                    </Col>
                </FormGroup>
        
                <FormGroup controlId="formHorizontalPassword">
                    <Col sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Password" onChange={this.passOnChange}/>
                    </Col>
                </FormGroup>
        
                {/* <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Checkbox>Remember me</Checkbox>
                    </Col>
                </FormGroup> */}
                {errorMessage}
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.click}>Sign in</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

//redux
const mapStateToProps = (state: any) => ({ 
    userInfo: state.login
  });

const mapDispatchToProps = (dispatch: any) => ({     
    login: (url:string, username:string, password:string) => dispatch(authorization(url, username, password))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);