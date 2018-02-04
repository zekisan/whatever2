import Immutable from 'immutable';
import {
    UPDATE_ITEMS_GROUPS,
    SET_MODE,
    UPDATE_EDITABLE_COLUMN,

    UPDATE_DETAILS,
} from '../actions/layoutDetail';

const DEFAULT_STATE = Immutable.fromJS({
    details: [
        {
            line: 1,
            detailOrder: '10',
            detailCount: 'R',
            items: [
                {
                    line: 1,
                    columnId: '1',
                    columnContent: 'função cheia de esquema 1',
                    columnOrder: '10',
                    columnSize: '25',
                    columnFormat: 'C',
                    columnMask: '',
                },
                {
                    line: 1,
                    columnId: '2',
                    columnContent: 'função cheia de esquema 2',
                    columnOrder: '20',
                    columnSize: '25',
                    columnFormat: 'C',
                    columnMask: '',
                },
                {
                    line: 1,
                    columnId: '3',
                    columnContent: 'função cheia de esquema 3',
                    columnOrder: '30',
                    columnSize: '25',
                    columnFormat: 'C',
                    columnMask: '',
                },
                {
                    line: 1,
                    columnId: '4',
                    columnContent: 'função cheia de esquema 4',
                    columnOrder: '40',
                    columnSize: '25',
                    columnFormat: 'C',
                    columnMask: '',
                },
                {
                    line: 1,
                    columnId: '5',
                    columnContent: 'função cheia de esquema 5',
                    columnOrder: '50',
                    columnSize: '25',
                    columnFormat: 'C',
                    columnMask: '',
                },
                {
                    line: 1,
                    columnId: '6',
                    columnContent: 'função cheia de esquema 6',
                    columnOrder: '60',
                    columnSize: '25',
                    columnFormat: 'C',
                    columnMask: '',
                },
                {
                    line: 2,
                    columnId: '1',
                    columnContent: 'função cheia de esquema 1',
                    columnOrder: '10',
                    columnSize: '25',
                    columnFormat: 'C',
                    columnMask: '',
                },
                {
                    line: 2,
                    columnId: '2',
                    columnContent: 'função cheia de esquema 2',
                    columnOrder: '20',
                    columnSize: '25',
                    columnFormat: 'H',
                    columnMask: '',
                },
                {
                    line: 2,
                    columnId: '3',
                    columnContent: 'função cheia de esquema 3',
                    columnOrder: '30',
                    columnSize: '25',
                    columnFormat: 'D',
                    columnMask: '',
                },
                {
                    line: 3,
                    columnId: '1',
                    columnContent: 'função cheia de esquema 1',
                    columnOrder: '10',
                    columnSize: '25',
                    columnFormat: 'I',
                    columnMask: '',
                },
            ],
        },
        {
            line: 2,
            detailOrder: '20',
            detailCount: 'S',
            items: [
                {
                    line: 1,
                    columnId: '1',
                    columnContent: 'função cheia de esquema 1',
                    columnOrder: '10',
                    columnSize: '25',
                    columnFormat: 'C',
                    columnMask: '',
                },
                {
                    line: 1,
                    columnId: '2',
                    columnContent: 'função cheia de esquema 2',
                    columnOrder: '20',
                    columnSize: '25',
                    columnFormat: 'C',
                    columnMask: '',
                },
            ]
        }
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

    // none, detailEdition, creation, edition, exclusion
    currentMode: 'none',
    editableDetail: {},
    editableColumn: {},
});

export default function reducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case UPDATE_ITEMS_GROUPS:
            return state.set('items', action.items);
        case UPDATE_EDITABLE_COLUMN:
            return state.updateIn(['editableColumn'], column => Immutable.fromJS(column).set(action.key, action.value));


        case SET_MODE:
            return state.set('currentMode', action.value)
                .set('editableDetail', action.editableDetail);
        case UPDATE_DETAILS:
            return state.set('details', action.details);
        default:
            return state;
    }
}