import {IReportMonth} from "./../interfaces/IReports"

let initialStateMonth : IReportMonth = {   
    data: {
        MonthPoint: 0,
        DataPoint: 0,
        MonthData: [],
        SummData: {},
        Idle: {}    
    } ,
    isLoading: false,
    hasErrored:{isError:false, code:0, message:""}
    
}

export function reportMonthValues(state: IReportMonth = initialStateMonth, action:any) {

    let result: IReportMonth = {...state};

    switch (action.type) {
        case 'REPORTMONTH_IS_LOADING':        
            result.isLoading = action.isLoading;
            console.log("REPORTMONTH_IS_LOADING");
            return result;

        case 'REPORTMONTH_HAS_ERRORED':        
            result.hasErrored = action.error; 
            console.log("REPORTMONTH_HAS_ERRORED");       
            return result;

        case 'REPORTMONTH_FETCH_DATA_SUCCESS':
            result.data = action.data
            console.log("REPORTMONTH_FETCH_DATA_SUCCESS");
            return result; 
            
        default:
            return state;    
    }
    
}