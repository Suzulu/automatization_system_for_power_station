import {combineReducers} from 'redux';
import { login } from './header';
import {currentValue, current} from './currentValue';
import {archiveCValues, archiveFValues} from './archiveValues';
import {pdkValues} from './pdkValues';
import {reportMonthValues} from './reportValue';

import {productValues} from './productValues';

import {chatValues} from './chatValues';


export default combineReducers({  
    login,    
    currentValue,
    current,
    archiveCValues,
    archiveFValues,
    pdkValues,
    reportMonthValues,
    productValues,
    chatValues
});