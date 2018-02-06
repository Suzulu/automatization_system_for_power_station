import * as React from 'react';
import { connect } from 'react-redux';

//Interfaces
import { IReportMonth } from "./../../interfaces/IReports"
import { Parameter } from './../../interfaces/Enums';
import { ParametersR } from "./../../MainConfig";
////////////

//Components
import CheckUrl from './../Nav/CheckUrl';

import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import BarChart from "./../charts/barChart";
import * as Spinner from 'react-spinkit';
////////////

//Actions
import { reportFetchData } from './../../actions/getReportMonth';
////////////

import Select from 'react-select';
import 'react-select/dist/react-select.css';

interface IComponent {
    report: IReportMonth
    fetchData: (url: string) => {}
}

class MonthReport extends React.Component<IComponent, any>{

    constructor() {
        super()
        this.state = {
            selectedOptionMonth: { value: 1, label: 'January' },
            selectedOptionYear: { value: 2018, label: '2018' }
        }
    }

    ///////////////////////////

    componentWillMount() {
        this.props.fetchData("http://localhost/WebApiBackend/api/Reports/getmonth?month=1&year=2017");
    }

    getReport = () => {
        this.props.fetchData("http://localhost/WebApiBackend/api/Reports/getmonth?month=1&year=2017");
    }

    handleChange = (selectedOptionMonth: any) => {
        this.setState({ selectedOptionMonth });
        console.log("selectedOption", selectedOptionMonth);
    }

    handleChangeYear = (selectedOptionYear: any) => {
        this.setState({ selectedOptionYear });
        console.log("selectedOption", selectedOptionYear);
    }

    render() {
        console.log("RENDER");
        const jumbotronInstance = (
            <PageHeader style={{ textAlign: "center" }}>Monthly report</PageHeader>
        );

        const optionsMonth = [{ value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' }, { value: 4, label: 'April' },
        { value: 5, label: 'May' }, { value: 6, label: 'June' }, { value: 7, label: 'July' }, { value: 8, label: 'August' },
        { value: 9, label: 'September' }, { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }];
        const optionsYear = [{ value: 2018, label: '2018' }, { value: 2019, label: '2019' }, { value: 2020, label: '2020' }, { value: 2021, label: '2021' },
        ];

        const { selectedOptionMonth, selectedOptionYear } = this.state;
        const valueMonth = selectedOptionMonth && selectedOptionMonth.value;
        const valueYear = selectedOptionYear && selectedOptionYear.value;
        //////////////////////////////

        const columns = ParametersR.map((item) => {
            return <TableHeaderColumn
                key={item}
                columnClassName={"this.columnClassNameFormat"}
                dataField={Parameter[item]}
                dataAlign="center"
                columnTitle={"test"}
            >
                {Parameter[item] + " kg"}
            </TableHeaderColumn>

        });

        const sectionTable = () => {
            if (this.props.report.isLoading) {
                return <div className="tableContainer">
                    <Spinner name="ball-spin-fade-loader" />
                </div>
            }
            else {

                return (
                    <div className="testOpacity">
                        <BootstrapTable data={this.props.report.data.MonthData} striped={true} hover={true}>
                            <TableHeaderColumn dataField="Id" isKey={true} dataAlign="center" width={"80px"}>Day</TableHeaderColumn>
                            {columns}
                        </BootstrapTable>
                    </div>)
            }
        }

        const summColumns = ParametersR.map((item) => {
            return <TableHeaderColumn
                key={item}
                columnClassName={"this.columnClassNameFormat"}
                dataField={Parameter[item]}
                dataAlign="center"
                columnTitle={"this.teet"}
            >
                {Parameter[item] + " t"}
            </TableHeaderColumn>

        });

        const sectionTableSumm = () => {
            if (this.props.report.isLoading) {
                return <div className="tableContainer">
                    <Spinner name="ball-spin-fade-loader" />
                </div>
            }
            else {

                if (!this.props.report.data.SummData["summ"]) {
                    return <div></div>
                }

                var data = [this.props.report.data.SummData["summ"], this.props.report.data.SummData["idle"], this.props.report.data.SummData["all"]]
                data[0].Id = "Summ"; data[1].Id = "Idle"; data[2].Id = "All";

                return (
                    <div className="testOpacity">
                        <BootstrapTable data={data} striped={true} hover={true}>
                            <TableHeaderColumn dataField="Id" isKey={true} dataAlign="center" width={"200px"}></TableHeaderColumn>
                            {summColumns}
                        </BootstrapTable>
                        <br />                        
                    </div>)
            }
        }

        //////////////////////////////
        return (
            <Grid fluid={true}>
                <CheckUrl {...this.props} />

                {jumbotronInstance}

                <Row className="show-grid">
                    <Col md={6}>
                        <Col md={3}>
                            <Select
                                name="month"
                                value={valueMonth}
                                onChange={this.handleChange}
                                options={optionsMonth}
                                placeholder={"Month..."}
                                noResultsText={"Not found"}
                            />
                        </Col>
                        <Col md={3}>
                            <Select
                                name="year"
                                value={valueYear}
                                onChange={this.handleChangeYear}
                                options={optionsYear}
                                placeholder={"Year..."}
                                noResultsText={"Not found"}
                            />
                        </Col>
                        <Col md={4}>
                            <Button onClick={this.getReport} style={{ height: "36px" }}>Report</Button>
                        </Col>
                        <Col md={2}>
                            <Button href={this.state.fileUrl} >Export to Excel</Button>
                        </Col>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col md={6}>
                        {sectionTable()}
                    </Col>
                    <Col md={6}>
                        <BarChart data={this.props.report.data.Idle} />
                        {sectionTableSumm()}
                    </Col>
                </Row>

            </Grid>
        )
    }
}


const mapStateToProps = (state: any) => ({
    report: state.reportMonthValues
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchData: (url: string) => dispatch(reportFetchData(url))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MonthReport);