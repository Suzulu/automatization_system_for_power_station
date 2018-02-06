import * as React from 'react';

import * as Highcharts from 'highcharts/highstock';

//Components
import { Modal, Button } from 'react-bootstrap';
////////////

export default class DStockChart extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            showModal: false,
            val: 0
        };
    }

    random: any = () => {
        var data = [],
            time = (new Date()).getTime(),
            i;
        
        for (i = -99; i <= 0; i += 1) {
            data.push([
                time + i * 1000, 0]);
        }
        return data;
    }

    chart: Object;
    options: Object;
    saveInstance(chartInstance: any) {
        this.chart = chartInstance;
    }

    close = () => {
        this.setState({ showModal: false });
    }

    open = () => {
        this.setState({ showModal: true });
    }

    componentDidMount() {
        Highcharts.setOptions({
            global: {
                useUTC: false
            },
            // lang: {
            //     shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            //     months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            //     weekdays: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
            // }

        });

        let ch = Highcharts.stockChart(this.props.id, {
            rangeSelector: {
                buttons: [{
                    count: 1,
                    type: 'minute',
                    text: '1m'
                }, {
                    count: 5,
                    type: 'minute',
                    text: '5m'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: false,
                selected: 0
            },

            title: {
                text: this.props.name
            },

            tooltip: {
                valueDecimals: 2,
                valueSuffix: 'mg/m3'
            },

            series: [{
                name: 'CO',
                data: this.random()

            }]
        });

        this.props.add(ch.series[0], this.props.index);

    }

    render() {

        return (
            <div>
                <div id={this.props.id} className="mychart" onDoubleClick={this.open}></div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Example</h4>
                        <p>{this.props.val}</p>                        

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    };
};