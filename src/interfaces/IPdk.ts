import IError from "./../interfaces/IError";

export interface IPdkModel {
    Id: number
    Date: Date

    c_CO: number 
    c_CO2: number
    c_NO: number
    c_NO2: number 
    c_NOx: number   
    c_SO2: number
    c_Dust: number    

    f_CO: number 
    f_CO2: number
    f_NO: number
    f_NO2: number 
    f_NOx: number   
    f_SO2: number
    f_Dust: number    
}

export interface IPdkValues{
    data: Array<IPdkModel>
    isLoading: boolean
    hasErrored: IError
}