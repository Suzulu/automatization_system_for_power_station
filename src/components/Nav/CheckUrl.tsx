import * as React from 'react';
import { connect } from 'react-redux';

class CheckUrl extends React.Component<any, any>{
    
        componentWillMount(){
            
            let url:string = this.props.match.url;

            //console.log("url = " + url);

            if( this.props.match.url.toLowerCase().indexOf("current") !== -1){
                url = "/Current";                
            }

            if( this.props.match.url.toLowerCase().indexOf("archive") !== -1){
                url = "/Archive";                
            }

            if( this.props.match.url.toLowerCase().indexOf("reports") !== -1){
                url = "/Reports";                
            }

            this.props.changeUrl("CHANGEURL", url )
        }
    
        render(){
    
            return (
                <div></div>
            )
        }
    }
    
    
    const mapStateToProps = (state: any) => ({ 
        
      });
    
    const mapDispatchToProps = (dispatch: any) => ({    
        changeUrl: (type:string, value: string) => {
            dispatch({type: type, payload: value})
        }       
        
    });
    
    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(CheckUrl);