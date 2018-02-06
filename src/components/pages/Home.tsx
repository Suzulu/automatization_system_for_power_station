import * as React from 'react';
import { connect } from 'react-redux';

//Components
import CheckUrl from './../Nav/CheckUrl';
import ChatForm from './../chat/chatForm';
//////////

//Interfaces
import {IPropuctData} from "./../../reducers/productValues";

export interface IComponent
{     
    products: IPropuctData    
    getProducts: (url:string) => {}  
}
//////////

//Actions
import {productsFetchData} from './../../actions/getProducts';
//////////

class Home extends React.Component<IComponent,any>{

    constructor(){
        super() 
          this.state = {             
        }        
    }  
   
    render(){

        return(
            <div className="container">
                <CheckUrl {...this.props}/>                
                <ChatForm/>
            </div>
        );
    };
};

const mapStateToProps = (state: any) => ({ 
    products:state.productValues
  });

const mapDispatchToProps = (dispatch: any) => ({     
    getProducts: (url:string) => dispatch(productsFetchData(url))    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);