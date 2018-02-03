export const UPDATE_ITEMS_GROUPS = 'UPDATE_ITEMS_GROUPS';
export const SET_MODE = 'SET_MODE';

export const updateItemsGroups = (reorderedSubGroup) => (dispatch, getState) => {
    const originalItemsGroups = getState().layoutHeader.toJS().items;
    const idx = originalItemsGroups.findIndex(i => i.line === reorderedSubGroup[0].line);

    const items = [
        ...originalItemsGroups.slice(0, idx),
        ...reorderedSubGroup,
        ...originalItemsGroups.slice((reorderedSubGroup.length - 1) + (idx + 1))
    ]

    return dispatch({ type: UPDATE_ITEMS_GROUPS, items });
};

export const removeItem = item => (dispatch, getState) => {
    const originalItemsGroups = getState().layoutHeader.toJS().items;
    const idx = originalItemsGroups.findIndex(i => i.line === item.line && i.columnId === item.columnId);

    const items = [
        ...originalItemsGroups.slice(0, idx),
        ...originalItemsGroups.slice((idx + 1), (originalItemsGroups.length))
    ]

    return dispatch({ type: UPDATE_ITEMS_GROUPS, items });
};

export const startExclusion = () => (dispatch) => (dispatch({ type: SET_MODE, value: 'exclusion' }));
export const finishExclusion = () => (dispatch) => (dispatch({ type: SET_MODE, value: 'none' }));