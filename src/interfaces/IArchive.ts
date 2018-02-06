import {IConcentration} from './IConcentration';
import {IEmission} from './IEmission';
import IError from "./../interfaces/IError";

export interface IArchiveC{
    data: Array<IConcentration>
    isLoading: boolean
    hasErrored: IError
}

export interface IArchiveF{
    data: Array<IEmission>
    isLoading: boolean
    hasErrored: IError
}