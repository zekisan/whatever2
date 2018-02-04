export const UPDATE_ITEMS_GROUPS = 'layoutDetail/UPDATE_ITEMS_GROUPS';

export const SET_MODE = 'layoutDetail/SET_MODE';
export const SET_EDITABLE_COLUMN = 'layoutDetail/SET_EDITABLE_COLUMN';
export const UPDATE_DETAILS = 'layoutDetail/UPDATE_DETAILS';
export const UPDATE_EDITABLE_DETAIL = 'layoutDetail/UPDATE_EDITABLE_DETAIL';

export const startCreation = () => (dispatch) => (dispatch({ type: SET_MODE, value: 'creation', editableColumn: {} }));
export const finishCreation = () => (dispatch) => (restartCurrentMode()(dispatch));

export const createColumn = (item) => (dispatch, getState) => {
    let items = [...getState().layoutTrailer.toJS().items];
    const itemsByGroup = items.filter(i => i.line.toString() === item.line.toString());

    items.push({ ...item, line: Number(item.line), columnOrder: ((itemsByGroup.length + 1) * 10).toString(), columnId: (itemsByGroup.length + 1).toString() });
    items = items.sort((a, b) => a.line - b.line || Number(a.columnOrder) - Number(b.columnOrder));

    dispatch({ type: UPDATE_ITEMS_GROUPS, items });
    restartCurrentMode()(dispatch);
}




const restartCurrentMode = () => (dispatch) => (dispatch({ type: SET_MODE, value: 'none' }));
const restartEditableColumn = () => (dispatch) => (dispatch({ type: SET_EDITABLE_COLUMN, editableColumn: {} }));

export const removeDetail = detail => (dispatch, getState) => {
    let details = [...getState().layoutDetail.toJS().details];
    details = details.filter(d => d.detailOrder !== detail.detailOrder);

    dispatch({ type: UPDATE_DETAILS, details });
}

export const startDetailEdition = (detail) => (dispatch) => (dispatch({ type: SET_MODE, value: 'detailEdition', editableDetail: detail }));
export const finishDetailEdition = () => (dispatch) => (restartCurrentMode()(dispatch));

export const updateEditableDetail = (key, value) => (dispatch) => (dispatch({ type: UPDATE_EDITABLE_DETAIL, key, value }));

export const saveEditableDetail = (savingItem) => (dispatch, getState) => {
    const originalDetails = getState().layoutDetail.toJS().details;
    const idx = originalDetails.findIndex(i => i.detailOrder === savingItem.detailOrder);

    const details = [
        ...originalDetails.slice(0, idx),
        { ...savingItem },
        ...originalDetails.slice((idx + 1), (originalDetails.length))
    ]

    dispatch({ type: UPDATE_DETAILS, details });
    restartCurrentMode()(dispatch);
};

export const updateItemsGroups = (detail, reorderedSubGroup) => (dispatch, getState) => {
    const detailItems = detail.items;
    const columnGroupIdx = detailItems.findIndex(i => i.line === reorderedSubGroup[0].line);

    const items = [
        ...detailItems.slice(0, columnGroupIdx),
        ...reorderedSubGroup,
        ...detailItems.slice((reorderedSubGroup.length - 1) + (columnGroupIdx + 1))
    ]

    updateEditableDetail('items', items)(dispatch);
};

export const removeItem = (detail, item) => (dispatch, getState) => {
    const detailItems = detail.items;
    const idx = detailItems.findIndex(i => i.line === item.line && i.columnId === item.columnId);

    const items = [
        ...detailItems.slice(0, idx),
        ...detailItems.slice((idx + 1), (detailItems.length))
    ]

    updateEditableDetail('items', items)(dispatch);
};

export const startEdition = (item) => (dispatch) => (dispatch({ type: SET_EDITABLE_COLUMN, editableColumn: item }));
export const finishEdition = () => (dispatch) => (restartEditableColumn()(dispatch));

export const saveEditableColumn = (detail, savingItem) => (dispatch) => {
    const detailItems = detail.items;
    const idx = detailItems.findIndex(i => i.line === savingItem.line && i.columnId === savingItem.columnId);

    const items = [
        ...detailItems.slice(0, idx),
        { ...savingItem },
        ...detailItems.slice((idx + 1), (detailItems.length))
    ]

    updateEditableDetail('items', items)(dispatch);
    restartEditableColumn()(dispatch);
};
