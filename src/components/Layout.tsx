import * as React from "react";
import Navigation from "./Nav/Navigation";

export default class Layout extends React.Component<any, any>
{ 
    render() {
        return (<div>
            <Navigation />
            {this.props.children}   
            <div>
                <br/>
                {/* <div className="footer">
                    Footer
                </div>  */}
                <br/>
            </div>         
        </div>)
    }
}