import {Base} from "./IConcentration";

export interface IEmission extends Base{ 
    Date: Date   
    Flow: number
    PDK_ID: number
}