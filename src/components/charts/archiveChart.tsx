import * as React from 'react';

import * as Highcharts from 'highcharts/highstock';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/offline-exporting')(Highcharts);
//var Highcharts = require('highcharts/highstock');
//Components

import {Parameter} from './../../interfaces/Enums';
import {Parameters, ParametersF} from "./../../MainConfig";
////////////

export class ArchiveChartC extends React.Component<any,any>{ 

    constructor(props:any) {
        super(props);
        this.state = {
            showModal: false,
            val: 0
        };
    }

   componentDidMount()
   {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }        
    });

    let ch = Highcharts.stockChart(this.props.id, {   
        
        exporting: {
            enabled:true,            
        },              

        legend: {
            enabled: true,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            y: 100
        },
        rangeSelector: {
            buttons: [],
            inputEnabled: false,
            selected: 0,
            enabled:false
        },

        title: {
            text: this.props.name
        },        

        tooltip:{
            valueDecimals: 2,
            valueSuffix: 'mg/m3'
        },

        series: [{
                name: 'O2',
                data: []           
            }]        
    })    
    
    Parameters.forEach(element => {
                
        if(element != 0){
            ch.addSeries({name: Parameter[element] , data: []});            
        }           
            
    });       

    this.props.add(ch.series);     

   } 

    render(){
        
        return(
            <div>
                <div id={this.props.id} className="mychart"></div>                
            </div>            
        );
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

export class ArchiveChartF extends React.Component<any,any>{ 
    
        constructor(props:any) {
            super(props);
            this.state = {
                showModal: false,
                val: 0
            };
          }  
    
       componentDidMount()
       {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }             
        });        
    
        let ch = Highcharts.stockChart(this.props.id, {               
            exporting: {
                enabled:true,                
            },                  
    
            legend: {
                enabled: true,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                y: 100
            },
            rangeSelector: {
                buttons: [],
                inputEnabled: false,
                selected: 0,
                enabled:false
            },
    
            title: {
                text: this.props.name
            }, 
    
            tooltip:{
                valueDecimals: 2,
                valueSuffix: ' g/s'
            },
    
            series: [{
                    name: 'Flow',
                    data: []           
                }]        
        })

        
        ParametersF.forEach(element => {
                    
            if(element != Parameter.Flow){
                ch.addSeries({name: Parameter[element] , data: []});            
            }           
                
        });
    
        this.props.add(ch.series);     
    
       } 
    
        render(){
            
            return(
                <div>
                    <div id={this.props.id} className="mychart"></div>                
                </div>            
            );
        };
    };