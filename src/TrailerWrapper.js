import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as layoutTrailerActions from './actions/layoutTrailer';
import ActionsWrapper from './ActionsWrapper';
import DraggableArea from './DraggableArea';
import CreateColumnForm from './CreateColumnForm';

const TrailerWrapper = ({ items, currentMode, trailerActions, editableColumn, options }) => {
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
                                    onUpdate={trailerActions.updateEditableColumn}
                                    onSave={trailerActions.createColumn}
                                    onCancel={trailerActions.finishCreation}
                                    options={options}
                                    item={editableColumn} /> :
                                <ActionsWrapper
                                    currentMode={currentMode}
                                    startCreation={trailerActions.startCreation}
                                    startExclusion={trailerActions.startExclusion}
                                    finishExclusion={trailerActions.finishExclusion} />
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
                                    actions={trailerActions} />
                            ))
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

TrailerWrapper.propTypes = {
    items: PropTypes.array.isRequired,
    currentMode: PropTypes.string.isRequired,
    trailerActions: PropTypes.object.isRequired,
    editableColumn: PropTypes.object.isRequired,
}

TrailerWrapper.defaultProps = {
    items: [],
    currentMode: 'none',
    trailerActions: {},
    editableColumn: {},
};

const mapStateToProps = ({ layoutTrailer }) => (
    {
        items: layoutTrailer.toJS().items,
        currentMode: layoutTrailer.toJS().currentMode,
        editableColumn: layoutTrailer.toJS().editableColumn,
        options: layoutTrailer.toJS().options,
    }
);

const mapDispatchToProps = dispatch => {
    return { trailerActions: bindActionCreators(layoutTrailerActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailerWrapper);