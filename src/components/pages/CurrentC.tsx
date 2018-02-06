import * as React from 'react';
import { connect } from 'react-redux';

//Components
import { Grid, Row, Col } from 'react-bootstrap';
import CheckUrl from './../Nav/CheckUrl';
import DStockChart from './../charts/dstockChart';
import { Button } from 'react-bootstrap';
////////////

class Cnc extends React.Component<any, any>{

    constructor(props:any) {
        super(props);
        this.state = {
          data: [10, 20, 30, 40, 50, 60],
          tempval: 0,
          x:(new Date()).getTime(),
          series: 0,
          index: 0,
          charts: []
        };
    }    

    myTimer = setInterval( () => {    

        this.setState({ tempval: this.state.tempval + 1 }); //Temp        

        console.log("tick");
        var x = (new Date()).getTime();        

        this.state.charts[1].addPoint([x, this.props.state.CO], true, true);
        this.state.charts[2].addPoint([x, this.props.state.CO2], true, true);
        this.state.charts[3].addPoint([x, this.props.state.NO], true, true);
        this.state.charts[4].addPoint([x, this.props.state.NO2], true, true);
        this.state.charts[5].addPoint([x, this.props.state.SO2], true, true);
        this.state.charts[6].addPoint([x, this.props.state.O2], true, true);        

    } , 1000);
    
    setdata = (series:any, index:number) => {

        var ch = this.state.charts;
        ch[index] = series;
        this.setState({ charts: ch });        

        console.log(series, index);        
    }   

    componentDidMount()
    {
        console.log("start timer");
        this.myTimer;
    }

    componentWillUnmount(){
        console.log("will unmount");   
        clearInterval(this.myTimer);     
    }    

    setValue = () => {  
                
        console.log("Chart -", this.state.charts[1]);
        
        this.state.charts[1].chart.series[0].graph.attr({ stroke: '#FF0000' });       
        
    }

    setValue2 = () => {  
        
        console.log("Chart -", this.state.charts[1]);
        
        this.state.charts[1].chart.series[0].graph.attr({ stroke: '#00ff00' });       

    }

    render(){

        return (
            <Grid fluid={true}>
                <CheckUrl {...this.props}/>
                <Button onClick={this.setValue}>Red</Button>
                <Button onClick={this.setValue2}>Green</Button>
                <Row className="show-grid">
                    <Col md={4}><DStockChart id="cnc_CO" name="Concentration СО" add={this.setdata} index={1} val={this.props.state.CO}/></Col>
                    <Col md={4}><DStockChart id="cnc_CO2" name="Concentration СО2" add={this.setdata} index={2} val={this.props.state.CO2}/></Col>
                    <Col md={4}><DStockChart id="cnc_NO" name="Concentration NО" add={this.setdata} index={3} val={this.props.state.NO}/></Col>
                </Row>

                <Row className="show-grid">
                    <Col md={4}><DStockChart id="cnc_NO2" name="Concentration NO2" add={this.setdata} index={4} val={this.props.state.NO2}/></Col>
                    <Col md={4}><DStockChart id="cnc_SO2" name="Concentration SО2" add={this.setdata} index={5} val={this.props.state.SO2}/></Col>
                    <Col md={4}><DStockChart id="cnc_O2" name="Concentration O2" add={this.setdata} index={6} val={this.props.state.O2}/></Col>
                </Row>
                
            </Grid>
        )
    }
}


const mapStateToProps = (state: any) => ({ 
    state: state.current
  });

const mapDispatchToProps = (dispatch: any) => ({    
    changeCurrent: (type:string, value: number) => {
        dispatch({type: type, payload: value})
    }       
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cnc);