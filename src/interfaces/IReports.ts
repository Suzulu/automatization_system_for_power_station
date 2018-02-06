import {IEmission} from "./IEmission";
import IError from "./../interfaces/IError";


export interface IMonthData{
    MonthPoint: number
    DataPoint: number
    MonthData: Array<IEmission>
    SummData: { [id: string] : IEmission }
    Idle: { [id: string] : Array<number> }
}

export interface IReportMonth{
    data: IMonthData
    isLoading: boolean
    hasErrored: IError
}