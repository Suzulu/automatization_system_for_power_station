import ILoginState from './../../interfaces/ILogin';
import * as React from 'react';
import { connect } from 'react-redux';

import { itemsFetchData } from './../../actions/getCurrent';

import { Navbar, NavItem, NavDropdown, Nav, MenuItem } from 'react-bootstrap';

//Components
import {LinkContainer} from 'react-router-bootstrap';
import Login from "./Login";
////////////

//Actions
import {isAuthorized} from "./../../actions/authorization"
////////////

export interface INavigation
{    
    active?:boolean
    url?: string
    state: ILoginState
    method1: (type:string, value:string) => {}      
    fetchData: (url:string) => {}
    setLogin: (username: string, token: string) => {}    
}

class CustomNav extends React.Component<INavigation>{
    
    currentTimer = setInterval( () => {  
        
        this.props.fetchData('http://localhost/WebApiBackend/api/Current/getcurrent');  //UNCOMMENT !!!!!

        } , 1000);

    componentDidMount()
    {
      this.currentTimer;

      var username:any = sessionStorage.getItem("username");
      let token:any = sessionStorage.getItem("token");
      if(username && token)      
        this.props.setLogin(username, token);
    }
  
    componentWillUnmount()
    {
      clearInterval(this.currentTimer);
    }
   
    logout = () => {this.props.method1("LOGOUT", "")};    

    active = (url:string) => {        

        var res = false;
        if(this.props.state.currentUrl.toLowerCase() === url.toLowerCase()) res = true;

        return res;
    };
    
    nextPath = (path:any) => {
        console.log(this.context);        
    }    
    
    render(){

        const loginSection = () => {

            if (this.props.state.isLogged) {
                return  (
                  <Nav className="pull-right">
                      <NavItem eventKey={1} href="/" active={false}>Signed in - {this.props.state.userName}</NavItem>
                      <NavItem eventKey={2} onClick={this.logout} active={false}>Logout</NavItem>                
                  </Nav>
                  );
              }else{              
              return (
                  <Nav className="pull-right login-dropdown">
                      <NavDropdown eventKey={1} pullRight title="Sign in" id="nav-dropdown" >
                          <Login/>
                      </NavDropdown>
                  </Nav>);
            }
        }              

        return(
            <div>
                <Navbar inverse>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="#">Example</a>
                  </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to="/Home">                        
                        <NavItem eventKey={1} active={this.active("/Home")} >Home</NavItem>
                    </LinkContainer>
                    
                    <NavDropdown eventKey={2} active={this.active("/Current")} pullRight title="Current" id="nav-dropdown"  >
                        <LinkContainer to="/Current/Cnc">
                            <MenuItem eventKey={3} >Concentrations</MenuItem>
                        </LinkContainer>
                        
                        <LinkContainer to="/Current/Fnc">
                            <MenuItem eventKey={4} >Emissions</MenuItem>
                        </LinkContainer>                        
                    </NavDropdown>

                    <NavDropdown eventKey={5} active={this.active("/Archive")} pullRight title="Archives" id="nav-dropdown"  >                        
                        <LinkContainer to="/Archive/Cnc">
                            <MenuItem eventKey={6} >Concentrations</MenuItem>
                        </LinkContainer>

                        <LinkContainer to="/Archive/Fnc">
                            <MenuItem eventKey={7} >Emissions</MenuItem>
                        </LinkContainer>                        
                    </NavDropdown>
                    
                    <LinkContainer to="/Statuses">
                        <NavItem eventKey={8} active={this.active("/Statuses")} >Statuses</NavItem>
                    </LinkContainer>                    

                    <NavDropdown eventKey={10} active={this.active("/Reports")} pullRight title="Reports" id="nav-dropdown"  >                        
                        <LinkContainer to="/reports/month">
                            <MenuItem eventKey={11} >Month</MenuItem>
                        </LinkContainer>

                        <LinkContainer to="/reports/year">
                            <MenuItem eventKey={12} >Year</MenuItem>
                        </LinkContainer> 
                    </NavDropdown>                    
                </Nav>               
                    {loginSection()}
              </Navbar>              
            </div>
        )
    };
};

//redux
const mapStateToProps = (state: any) => ({ 
    state: state.login
  });

const mapDispatchToProps = (dispatch: any) => ({ 
    method1: (type:string, value:string) => {
        dispatch({ type: type, payload: value});
    },
    fetchData: (url:string) => dispatch(itemsFetchData(url)),
    setLogin : (username:string, token: string) => dispatch(isAuthorized(username, token))
       
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomNav);