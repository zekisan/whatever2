import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Row, Col } from 'react-bootstrap';
import Column from './Column';
import ColumnForm from './ColumnForm';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
});

export default class DraggableArea extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const reorderedItems = reorder(
            this.props.items,
            result.source.index,
            result.destination.index
        );

        this.props.actions.updateItemsGroups(reorderedItems);
    }

    render() {
        const { items, currentMode, editableColumn, actions, options } = this.props;
        const isDragAndDropDisabled = currentMode !== 'none';
        return (
            <Row style={{ marginTop: '15px', marginBottom: '15px', backgroundColor: '#fff' }}>
                <Col md={12}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable" isDropDisabled={isDragAndDropDisabled}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    {items.map((item, index) => (
                                        <Draggable
                                            key={index}
                                            draggableId={item.columnId}
                                            index={index}
                                            isDragDisabled={isDragAndDropDisabled}>
                                            {(provided, snapshot) => (
                                                <div>
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                    >
                                                        {
                                                            (currentMode === 'edition' &&
                                                                editableColumn.line === item.line &&
                                                                editableColumn.columnId === item.columnId) ?
                                                                <ColumnForm
                                                                    onUpdate={actions.updateEditableColumn}
                                                                    onSave={actions.saveEditableColumn}
                                                                    onCancel={actions.finishEdition}
                                                                    options={options}
                                                                    item={editableColumn} /> :
                                                                <Column
                                                                    item={item}
                                                                    options={options}
                                                                    onRemove={actions.removeItem}
                                                                    onEdit={actions.startEdition}
                                                                    willRemove={currentMode === 'exclusion'} />
                                                        }
                                                    </div>
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Col>
            </Row>
        );
    }
}

DraggableArea.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentMode: PropTypes.string,
    actions: PropTypes.object,
    editableColumn: PropTypes.object,
    options: PropTypes.array,
};

DraggableArea.defaultProps = {
    items: [],
    currentMode: 'none',
    actions: {},
    editableColumn: {},
    options: [],
};