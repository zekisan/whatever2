import Immutable from 'immutable';
import { 
    UPDATE_ITEMS_GROUPS,
    SET_MODE,
 } from '../actions/layoutHeader';

const DEFAULT_STATE = Immutable.fromJS({
    items: [
        {
            line: 1,
            columnId: '1',
            columnContent: 'função cheia de esquema 1',
            columnOrder: '10',
            columnSize: '25',
            columnFormat: 'C',
        },
        {
            line: 1,
            columnId: '2',
            columnContent: 'função cheia de esquema 2',
            columnOrder: '20',
            columnSize: '25',
            columnFormat: 'C',
        },
        {
            line: 1,
            columnId: '3',
            columnContent: 'função cheia de esquema 3',
            columnOrder: '30',
            columnSize: '25',
            columnFormat: 'C',
        },
        {
            line: 2,
            columnId: '1',
            columnContent: 'função cheia de esquema 1',
            columnOrder: '10',
            columnSize: '25',
            columnFormat: 'C',
        },
        {
            line: 2,
            columnId: '2',
            columnContent: 'função cheia de esquema 2',
            columnOrder: '20',
            columnSize: '25',
            columnFormat: 'H',
        },
        {
            line: 2,
            columnId: '3',
            columnContent: 'função cheia de esquema 3',
            columnOrder: '30',
            columnSize: '25',
            columnFormat: 'D',
        },
        {
            line: 3,
            columnId: '1',
            columnContent: 'função cheia de esquema 1',
            columnOrder: '10',
            columnSize: '25',
            columnFormat: 'I',
        },
    ],
    options: [
        {
            value: 'C',
            text: 'Alfanumérico',
        },
        {
            value: 'D',
            text: 'Decimal',
        },
        {
            value: 'I',
            text: 'Inteiro',
        },
        {
            value: 'H',
            text: 'Hora',
        },
    ],
    // none, creation, edition, exclusion
    currentMode: 'none',
});

export default function reducer(state = DEFAULT_STATE, action) {
    switch(action.type) {
        case UPDATE_ITEMS_GROUPS:
            return state.set('items', action.items);
        case SET_MODE:
            return state.set('currentMode', action.value);
        default:
            return state;
    }
}