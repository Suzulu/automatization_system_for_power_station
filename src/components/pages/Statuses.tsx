import * as React from 'react';
import { connect } from 'react-redux';

//Interfaces
import { ICurrent } from './../../interfaces/IConcentration';
////////////

//Components
import CheckUrl from './../Nav/CheckUrl';
import { Panel, PageHeader } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
////////////

interface IComponent {
    current: ICurrent
    fetchData: (url: string) => {}
}

class Statuses extends React.Component<IComponent, any>{

    render() {        
        const options = {            
            sizePerPageList: [ {
              text: '5', value: 5
            }, {
              text: '10', value: 10
            }]
        };

        const sectionTable = () => {

            var data = [{Date: new Date(), Name: "Description message(test)"}]
            return (
                <div className="testOpacity" style={{marginLeft:"15px",minWidth:"835px"}}>
                    <BootstrapTable data={data} striped={true} hover={true} options={options} pagination>
                        <TableHeaderColumn dataField="Date" isKey={true} dataAlign="center" width={"200px"}>Time</TableHeaderColumn>                       
                        <TableHeaderColumn dataField="Name" dataAlign="center" >Description</TableHeaderColumn>

                    </BootstrapTable>
                </div>)
        }

        return (
            <div>
                <CheckUrl {...this.props} />
                <PageHeader style={{ textAlign: "center" }}>Monitoring data</PageHeader>
                <Grid fluid={true}>
                    <Row className="show-grid">
                        <Col md={2}>

                        </Col>
                        <Col md={2}>                            
                            <img src="/img/smoke3.gif" alt="" style={{ width: "170px", height: "100px" }} />
                            <img src="/img/truba-draw.svg" alt="" />
                        </Col>
                        <Col md={8}>
                            <Row>
                                <Col md={3} style={{ minWidth: "250px" }}>
                                    <Panel bsStyle="info" className="pull-right" style={{ minHeight: "376px" }}>
                                        <p>Concentration</p>
                                        <div>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>O2</InputGroup.Addon>
                                                    <FormControl type="text" value={this.props.current.O2} readOnly={true} className="mycolorred" />
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>mg/m3</InputGroup.Addon>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>CO</InputGroup.Addon>
                                                    <FormControl type="text" value={this.props.current.CO} readOnly={true} className="mycolorred" />
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>mg/m3</InputGroup.Addon>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>CO2</InputGroup.Addon>
                                                    <FormControl type="text" value={this.props.current.CO2} readOnly={true} className="mycolorgreen" />
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>mg/m3</InputGroup.Addon>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>NO</InputGroup.Addon>
                                                    <FormControl type="text" value={this.props.current.NO} readOnly={true} className="mycolorred" />
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>mg/m3</InputGroup.Addon>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>NO2</InputGroup.Addon>
                                                    <FormControl type="text" value={this.props.current.NO2} readOnly={true} className="mycolorgreen" />
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>mg/m3</InputGroup.Addon>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>SO2</InputGroup.Addon>
                                                    <FormControl type="text" value={this.props.current.SO2} readOnly={true} className="mycolorred" />
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>mg/m3</InputGroup.Addon>
                                                </InputGroup>
                                            </FormGroup>
                                        </div>
                                    </Panel>
                                </Col>
                                <Col md={3} style={{ minWidth: "250px" }}>
                                    <Panel bsStyle="info" className="pull-right" style={{ minHeight: "376px" }}>
                                        <p>Emissions</p>
                                        <div >
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>CO</InputGroup.Addon>
                                                    <FormControl type="text" value={this.props.current.CO} readOnly={true} className="mycolorred" />
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>g/s</InputGroup.Addon>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>CO2</InputGroup.Addon>
                                                    <FormControl type="text" value={this.props.current.CO2} readOnly={true} className="mycolorgreen" />
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>g/s</InputGroup.Addon>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>NO</InputGroup.Addon>
                                                    <FormControl type="text" value={this.props.current.NO} readOnly={true} className="mycolorgreen" />
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>g/s</InputGroup.Addon>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>NO2</InputGroup.Addon>
                                                    <FormControl type="text" value={this.props.current.NO2} readOnly={true} className="mycolorgreen" />
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>g/s</InputGroup.Addon>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>SO2</InputGroup.Addon>
                                                    <FormControl type="text" value={this.props.current.SO2} readOnly={true} className="mycolorgreen" />
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>g/s</InputGroup.Addon>
                                                </InputGroup>
                                            </FormGroup>
                                        </div>
                                    </Panel>
                                </Col>
                                <Col md={3} style={{ minWidth: "350px" }}>
                                    <Panel bsStyle="info" style={{ minHeight: "376px" }}>

                                        <div className="pull-right">
                                            <p>Gas parameters</p>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "150px" }}>Consumption</InputGroup.Addon>
                                                    <FormControl type="text" value={this.props.current.CO} readOnly={true} className="mycolorgray" />
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>m3/h</InputGroup.Addon>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "150px" }}>Temperature</InputGroup.Addon>
                                                    <FormControl type="text" value={this.props.current.CO} readOnly={true} className="mycolorgray" />
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>C</InputGroup.Addon>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "150px" }}>Pressure</InputGroup.Addon>
                                                    <FormControl type="text" value={this.props.current.CO} readOnly={true} className="mycolorgray" />
                                                    <InputGroup.Addon style={{ backgroundColor: "#333", color: "white", width: "60px" }}>kPa</InputGroup.Addon>
                                                </InputGroup>
                                            </FormGroup>
                                        </div>
                                    </Panel>
                                </Col>
                                <Col md={3}>

                                </Col>
                                <Row>
                                    <Col md={9}>
                                        {sectionTable()}
                                    </Col>
                                </Row>
                            </Row>
                        </Col>


                    </Row>
                </Grid>
            </div>

        )
    }
}


const mapStateToProps = (state: any) => ({
    current: state.current
});

const mapDispatchToProps = (dispatch: any) => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Statuses);