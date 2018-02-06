import * as React from 'react';

import * as Highcharts from 'highcharts';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/offline-exporting')(Highcharts);

//Components
import {Parameter} from './../../interfaces/Enums';
import {ParametersR} from "./../../MainConfig";
////////////

export default class BarChart extends React.Component<any,any>{ 

    constructor(props:any) {
        super(props);
        this.state = {
            isLoading: true            
        };
    }       

    componentDidMount(){
       
    }
    /////////////////////////////////////

    addChart = () => {
        var ch = Highcharts.chart('barchart', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Number of excesses'
            },
            subtitle: {
                text: '<a href="http://localhost/WebApiBackend/api/Concentration/getfile?startDate=2017-01-01&endDate=2017-01-02">Export to Excel</a>'
            },
            xAxis: {
                categories: ['5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%',
                                         '50%', '55%', '60%', '65%', '70%', '75%', '80%', '85%', '90%',
                             '95%', '100%', ">100%"],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' excesses'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',                
                y: 80,                
                shadow: true
            },
            credits: {
                enabled: false
            },            
        });

        ParametersR.forEach(element => {
            
            if(element != Parameter.Flow){
                ch.addSeries({name: Parameter[element] , data: this.props.data[Parameter[element]]});            
            }           
        
        });
    }

    shouldComponentUpdate(nextProps:any, nextState:any) {
        if(this.props.data != nextProps.data){
            setTimeout(() => {this.addChart()}, 100);
            return true;
        }
        return false;
    }

    render(){
        return(
            <div>
                <div id={"barchart"} className="mychart"></div>                
            </div>            
        );
        
    };
};
