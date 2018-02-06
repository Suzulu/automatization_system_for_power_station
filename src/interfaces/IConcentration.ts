export interface IConcentration extends Base{ 
    Date: Date   
    O2: number
    PDK_ID: number
}

export interface ICurrent extends Base{ 
    Flow: number,
    Temperature: number,
    Pressure: number,
    V_Gas: number,
    O2: number,   


}

export interface Base{

    Id: number|string    
    CO: number
    CO2: number
    NO: number
    NO2: number 
    NOx: number   
    SO2: number
    Dust: number    
}
