import * as React from 'react';
import { connect } from 'react-redux';

//Components
import CheckUrl from './../Nav/CheckUrl';

////////////

class Fnc extends React.Component<any, any>{    

    render(){
        return (
            <div>
                <CheckUrl {...this.props}/>
                Fnc
            </div>
        )
    }
}


const mapStateToProps = (state: any) => ({ 
    
  });

const mapDispatchToProps = (dispatch: any) => ({     
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Fnc);