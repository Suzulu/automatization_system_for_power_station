import * as React from 'react';
import { connect } from 'react-redux';

//Interfaces
import {IEmission} from './../../interfaces/IEmission';
import {IArchiveF} from './../../interfaces/IArchive';
import {IPdkValues} from './../../interfaces/IPdk';
import {Parameter} from './../../interfaces/Enums';
import {ParametersF} from "./../../MainConfig";
////////////

//Components
import CheckUrl from './../Nav/CheckUrl';
//import { Table, Grid, Row, Col } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {ArchiveChartF} from './../charts/archiveChart';
import * as Spinner from 'react-spinkit';
////////////

//Actions
import {archcFetchData} from './../../actions/getArchiveF';
import {pdkFetchData} from './../../actions/getPdk';
////////////

//Temp
import * as DateRangePicker from 'react-bootstrap-daterangepicker';
import './test.css';
import './test1.css';
import * as moment from 'moment';
import { Glyphicon, PageHeader } from 'react-bootstrap';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//////

interface IComponent
{    
    archC:IArchiveF 
    pdk:IPdkValues   
    fetchData: (url:string) => {} 
    fetchPdk: (url:string) => {}    
}



/////////////////////////////

class ArchiveCnc extends React.Component<IComponent, any>{    

    constructor(){
        super() 
          this.state = { 
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 days': [moment().subtract(6, 'days'), moment()],
                'Last 30 days': [moment().subtract(29, 'days'), moment()],
                'This month': [moment().startOf('month'), moment().endOf('month')],
                'Previous month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            startDate: new Date('2018-01-01T00:00:00'),
            endDate: new Date('2018-01-02T00:00:00'),
            charts: [],            
            fileUrl:"http://localhost/WebApiBackend/api/Emission/getfile?startDate=2017-01-01&endDate=2017-01-02"                
        }       
        
    }
    

    componentWillMount()
    {
        this.props.fetchData('http://localhost/WebApiBackend/api/Emission/getemiss?startDate=2017-01-01&endDate=2017-01-02'); 
        this.props.fetchPdk('http://localhost/WebApiBackend/api/Pdk/getpdk');        
    }

    format = (date:Date) => {        
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();
    }

    format1 = (date:Date) => {        
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    handleEvent = (event:any, picker:any) => {
        this.setState({        
            startDate: new Date(picker.startDate),
            endDate: new Date(picker.endDate)
        });        
    }

    onAplyHandle = () =>{        
        let dateInterval:string = `?startDate=${this.format1(this.state.startDate)}&endDate=${this.format1(this.state.endDate)}`;
        let fileUrl:string = `http://localhost/WebApiBackend/api/Emission/getfile${dateInterval}`;
        this.setState({ fileUrl: fileUrl });
        this.props.fetchData(`http://localhost/WebApiBackend/api/Emission/getemiss${dateInterval}`);
    }

    addChartValue = (series:any) =>
    {    
        this.setState({ charts: series });    
    }    

    getDataGas:any = (index:number) =>{
        var data = [], i;        
        var target:any;        
        
        for (i = 0; i <= this.props.archC.data.length - 1; i += 1) {

            var x = new Date(this.props.archC.data[i].Date);
            // console.log("x - " + x.getDate());
            //data.push([x.getTime(), this.props.archC.data[i].CO]);
            
            switch(index){
                case Parameter.Flow: target = this.props.archC.data[i].Flow;
                break;

                case Parameter.CO: target = this.props.archC.data[i].CO;
                break;

                case Parameter.CO2: target = this.props.archC.data[i].CO2;
                break;

                case Parameter.NO: target = this.props.archC.data[i].NO;
                break;

                case Parameter.NO2: target = this.props.archC.data[i].NO2;
                break;

                case Parameter.NOx: target = this.props.archC.data[i].NOx;
                break;

                case Parameter.SO2: target = this.props.archC.data[i].SO2;
                break;            

                case Parameter.Dust: target = this.props.archC.data[i].Dust;
                break;
            }

            data.push([x.getTime(), target]);
        }
        //console.log(data);
        return data;
    } 

    columnClassNameFormat = (fieldValue:any, row:IEmission, rowIdx:any, colIdx:any) => {
        
            var pr = ParametersF[colIdx-1];
            
            var style:string = "";
            
            //console.log("pdk - ",this.props.pdk.data);
            var pdk = this.props.pdk.data[row.PDK_ID - 1];
        
            if(pdk && fieldValue){
                switch(pr){            
                    case Parameter.CO: style = fieldValue > pdk.f_CO ? 'danger' : '';                        
                    break;
        
                    case Parameter.CO2: style = fieldValue > pdk.f_CO2 ? 'danger' : '';
                    break;
        
                    case Parameter.NO: style = fieldValue > pdk.f_NO ? 'danger' : '';
                    break;
        
                    case Parameter.NO2: style = fieldValue > pdk.f_NO2 ? 'danger' : '';
                    break;
        
                    case Parameter.NOx: style = fieldValue > pdk.f_NOx ? 'danger' : '';
                    break;
        
                    case Parameter.SO2: style = fieldValue > pdk.f_SO2 ? 'danger' : '';
                    break;            
        
                    case Parameter.Dust: style = fieldValue > pdk.f_Dust ? 'danger' : '';
                    break;   
                               
                }
            }else{
                style = fieldValue ? "" : "bg-cell-gray";
            }
            
            
            //console.log("row - ", row);
            return style;
        
            ///////////////////////////////////
            // if(fieldValue){
            //     var str = fieldValue > 4 ? 'danger' : '';
                
            //         if(colIdx === 4)
            //             str = "warning";
            // }
            // else{
            //     str = "bg-cell-gray";
            // }  
                
            // return str;    
          }

    teet = (fieldValue:any, row:IEmission, rowIdx:any, colIdx:any) => {

        var pr = ParametersF[colIdx-1];
        
        var target = "Нет";
        
        //console.log("pdk - ",this.props.pdk.data);
        var pdk = this.props.pdk.data[row.PDK_ID - 1];

        if(pdk){
            switch(pr){            
                case Parameter.CO: target = pdk.f_CO.toString();
                break;
    
                case Parameter.CO2: target = pdk.f_CO2.toString();
                break;
    
                case Parameter.NO: target = pdk.f_NO.toString();
                break;
    
                case Parameter.NO2: target = pdk.f_NO2.toString();
                break;
    
                case Parameter.NOx: target = pdk.f_NOx.toString();
                break;
    
                case Parameter.SO2: target = pdk.f_SO2.toString();
                break;            
    
                case Parameter.Dust: target = pdk.f_Dust.toString();
                break;   
                           
            }
        }else{
            return fieldValue ? "Норматив не установлен" : "Простой системы";
        }
        
        
        //console.log("row - ", row);
        return "Норматив = " + target;
        // return "Норматив = " + Parameter[pr];
    }

    render(){ 
        
        const columns = ParametersF.map((item) => {

            return <TableHeaderColumn 
                        key={item} 
                        columnClassName={ this.columnClassNameFormat } 
                        dataField={Parameter[item]} 
                        dataAlign="center"
                        //columnTitle={ "Норматив = " + Parameter[item]}
                        columnTitle={ this.teet}
                    >                        
                        {Parameter[item] +" г/с"}                        
                    </TableHeaderColumn>
        })

        const sectionTable = () => {

            if(this.props.archC.isLoading){
                return <div className="tableContainer">                            
                            <Spinner name="ball-spin-fade-loader"/>
                        </div>
            }
            else{                
                if(this.state.charts.length != 0){
                    var i;
                    for (i = 0; i <= this.state.charts.length - 2; i += 1) {
                        this.state.charts[i].setData(this.getDataGas(ParametersF[i]));
                    }                    
                }

                return (                                          
                    <div className="testOpacity">
                        <BootstrapTable data={this.props.archC.data} striped={true} hover={true} options={options} pagination>                            
                            <TableHeaderColumn dataField="Date" isKey={true} dataAlign="center" width={"200px"}>Date</TableHeaderColumn>
                            {columns}
                        </BootstrapTable>
                    </div>)                        
            }
        }

        const text = () => {
            if (this.props.archC.data.length === 0)
                return "Data not found";

            return "Data loaded successfully";

        };

        const tempBlock = (isError:boolean) => {

            if(isError){
                return(
                    <div>       
                        <p style={{color:"red"}}>{this.props.archC.hasErrored.message}</p >
                    </div>
                )
            }
            return(
                <div>
                    <p style={{color:"green"}}>{text()}</p >
                </div>
            )
        }

        const jumbotronInstance = (
            <PageHeader style={{textAlign:"center"}}>Archival values of emissions</PageHeader>            
          );

        const options = {            
            sizePerPageList: [ {
              text: '10', value: 10
            }, {
              text: '20', value: 20
            }, {
              text: '50', value: 50
            }, {
              text: 'Все', value: this.props.archC.data.length
            }],
            noDataText: text()
        };

        var excelBtnDisabled = this.props.archC.isLoading || this.props.archC.data.length == 0;
        ////////////
        var start = this.format(this.state.startDate);//.format('DD-MM-YYYY');
		var end = this.format(this.state.endDate);//.format('DD-MM-YYYY');
		var label = start + ' - ' + end + '  ';
        ///////////            

            return (
                <Grid fluid={true}>
                    <CheckUrl {...this.props}/>

                    {jumbotronInstance}

                    {tempBlock(this.props.archC.hasErrored.isError)}                                        

                    <Row className="show-grid">
                        <Col md={6}>   
                            <Col md={10}>                         
                                <DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} ranges={this.state.ranges} 
                                    onEvent={this.handleEvent} onApply={this.onAplyHandle} locale={{"format": "DD/MM/YYYY"}}>
                                        
                                    <Button  className="selected-date-range-btn" style={{width:'300px'}}>
                                        <div className="pull-left"><Glyphicon glyph="calendar" /></div>
                                                    <div className="pull-right">
                                                        <span>
                                                            {label}
                                                        </span>
                                                        <span className="caret"></span>
                                            </div>                    
                                    </Button>            
                                </DateRangePicker>
                            </Col>
                            <Col md={2}>
                                <Button href={this.state.fileUrl} disabled={excelBtnDisabled}>Export to Excel</Button>
                            </Col>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={6}>                        
                            {sectionTable()}                             
                        </Col>
                        <Col md={6}>
                            <ArchiveChartF name={"Archives - g/s"} id="ch1" add={this.addChartValue}/>                                                       
                        </Col>                    
                    </Row>                    
                </Grid>
            )

            
        //}
        
    }
}


const mapStateToProps = (state: any) => ({ 
    archC: state.archiveFValues,
    pdk: state.pdkValues
  });

const mapDispatchToProps = (dispatch: any) => ({     
    fetchData: (url:string) => dispatch(archcFetchData(url)),
    fetchPdk: (url:string) => dispatch(pdkFetchData(url))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArchiveCnc);