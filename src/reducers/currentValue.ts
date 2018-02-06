import {IConcentration, ICurrent} from './../interfaces/IConcentration';

let initialState : IConcentration = {Id:0, CO:0, CO2:0, NO:0, NO2:0, NOx:0, SO2:0, O2:0, Dust:0, Date: new Date(), PDK_ID:0};
let initialStateCurrent : ICurrent = {Id:0, CO:0, CO2:0, NO:0, NO2:0, NOx:0, SO2:0, O2:0, Dust:0, Flow:0, Temperature:0, Pressure:0, V_Gas:0};

export function currentValue(state: IConcentration = initialState, action: any) : IConcentration {   
    
    switch(action.type) {
        case "CURRENT":
            state.CO = action.payload;                     
        break;         
        
    }   

    return state;
}

export function current(state: ICurrent = initialStateCurrent, action:any) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.items;

        default:
            return state;
    }
}