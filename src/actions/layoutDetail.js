export const UPDATE_ITEMS_GROUPS = 'layoutDetail/UPDATE_ITEMS_GROUPS';
export const SET_MODE = 'layoutDetail/SET_MODE';
export const UPDATE_EDITABLE_COLUMN = 'layoutDetail/UPDATE_EDITABLE_COLUMN';

export const UPDATE_DETAILS = 'layoutDetail/UPDATE_DETAILS';
export const UPDATE_EDITABLE_DETAIL = 'layoutDetail/UPDATE_EDITABLE_DETAIL';

export const updateItemsGroups = (reorderedSubGroup) => (dispatch, getState) => {
    const originalItems = getState().layoutTrailer.toJS().items;
    const idx = originalItems.findIndex(i => i.line === reorderedSubGroup[0].line);

    const items = [
        ...originalItems.slice(0, idx),
        ...reorderedSubGroup,
        ...originalItems.slice((reorderedSubGroup.length - 1) + (idx + 1))
    ]

    dispatch({ type: UPDATE_ITEMS_GROUPS, items });
};

export const removeItem = item => (dispatch, getState) => {
    const originalItems = getState().layoutTrailer.toJS().items;
    const idx = originalItems.findIndex(i => i.line === item.line && i.columnId === item.columnId);

    const items = [
        ...originalItems.slice(0, idx),
        ...originalItems.slice((idx + 1), (originalItems.length))
    ]

    dispatch({ type: UPDATE_ITEMS_GROUPS, items });
};

const restartCurrentMode = () => (dispatch) => (dispatch({ type: SET_MODE, value: 'none' }));

export const startExclusion = () => (dispatch) => (dispatch({ type: SET_MODE, value: 'exclusion' }));
export const finishExclusion = () => (dispatch) => (restartCurrentMode()(dispatch));

export const startEdition = (item) => (dispatch) => (dispatch({ type: SET_MODE, value: 'edition', editableColumn: item }));
export const finishEdition = () => (dispatch) => (restartCurrentMode()(dispatch));

export const updateEditableColumn = (key, value) => (dispatch) => (dispatch({ type: UPDATE_EDITABLE_COLUMN, key, value }));

export const saveEditableColumn = (savingItem) => (dispatch, getState) => {
    const originalItems = getState().layoutTrailer.toJS().items;
    const idx = originalItems.findIndex(i => i.line === savingItem.line && i.columnId === savingItem.columnId);

    const items = [
        ...originalItems.slice(0, idx),
        { ...savingItem },
        ...originalItems.slice((idx + 1), (originalItems.length))
    ]

    dispatch({ type: UPDATE_ITEMS_GROUPS, items });
    restartCurrentMode()(dispatch);
};

export const startCreation = () => (dispatch) => (dispatch({ type: SET_MODE, value: 'creation', editableColumn: {} }));
export const finishCreation = () => (dispatch) => (restartCurrentMode()(dispatch));

export const createColumn = (item) => (dispatch, getState) => {
    let items = [...getState().layoutTrailer.toJS().items];
    const itemsByGroup = items.filter(i => i.line.toString() === item.line.toString());

    items.push({ ...item, line: Number(item.line), columnOrder: ((itemsByGroup.length + 1)* 10).toString(), columnId: (itemsByGroup.length + 1).toString() });
    items = items.sort((a, b) => a.line - b.line || Number(a.columnOrder) - Number(b.columnOrder));

    dispatch({ type: UPDATE_ITEMS_GROUPS, items });
    restartCurrentMode()(dispatch);
}






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