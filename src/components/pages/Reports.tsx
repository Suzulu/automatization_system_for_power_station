import * as React from 'react';
import { connect } from 'react-redux';

//Components
import CheckUrl from './../Nav/CheckUrl';

import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
////////////



class Reports extends React.Component<any, any>{

    render(){

        const jumbotronInstance = (
            <PageHeader style={{textAlign:"center"}}>Отчёт по выбросам за указанный месяц</PageHeader>            
          );

        return (
            <Grid fluid={true}>
                    <CheckUrl {...this.props}/>

                    {jumbotronInstance}

                    <Row className="show-grid">
                        <Col md={6}>                            
                            qwe
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={6}>                        
                         fg
                            
                        </Col>
                        <Col md={6}>
                             aa                      
                        </Col>                    
                    </Row>

                    
                </Grid>
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
)(Reports);

