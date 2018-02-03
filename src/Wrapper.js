import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as layoutHeaderActions from './actions/layoutHeader';
import ActionsWrapper from './ActionsWrapper';
import DraggableArea from './DraggableArea';
import CreateColumnForm from './CreateColumnForm';

const Wrapper = ({ items, currentMode, headerActions, editableColumn, options }) => {
    const groupedItems = [];
    for (let i = 1; i <= 3; i++) {
        const group = items.filter(item => item.line === i);
        groupedItems.push(group);
    }

    return (
        <Row style={{ backgroundColor: '#e4e4e4' }}>
            <Col md={12}>
                <Row>
                    <Col md={12}>
                        {
                            currentMode === 'creation' ?
                                <CreateColumnForm
                                    onUpdate={headerActions.updateEditableColumn}
                                    onSave={headerActions.createColumn}
                                    onCancel={headerActions.finishCreation}
                                    options={options}
                                    item={editableColumn} /> :
                                <ActionsWrapper
                                    currentMode={currentMode}
                                    startCreation={headerActions.startCreation}
                                    startExclusion={headerActions.startExclusion}
                                    finishExclusion={headerActions.finishExclusion} />
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {
                            groupedItems.map((group, index) => (
                                <DraggableArea
                                    key={index}
                                    currentMode={currentMode}
                                    items={group}
                                    options={options}
                                    editableColumn={editableColumn}
                                    actions={headerActions} />
                            ))
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

Wrapper.propTypes = {
    items: PropTypes.array.isRequired,
    currentMode: PropTypes.string.isRequired,
    headerActions: PropTypes.object.isRequired,
    editableColumn: PropTypes.object.isRequired,
}

Wrapper.defaultProps = {
    items: [],
    currentMode: 'none',
    headerActions: {},
    editableColumn: {},
};

const mapStateToProps = ({ layoutHeader, layoutHeader2 }) => (
    {
        items: layoutHeader.toJS().items,
        currentMode: layoutHeader.toJS().currentMode,
        editableColumn: layoutHeader.toJS().editableColumn,
        options: layoutHeader.toJS().options,
    }
);

const mapDispatchToProps = dispatch => {
    return { headerActions: bindActionCreators(layoutHeaderActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);