import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as layoutHeaderActions from './actions/layoutHeader';
import ActionsWrapper from './ActionsWrapper';
import DraggableArea from './DraggableArea';

const Wrapper = ({ items, currentMode, headerActions }) => {
    const groupedItems = [];
    for (let i = 1; i <= 3; i++) {
        const group = items.filter(item => item.line === i);
        groupedItems.push(group);
    }

    return (
        <Row style={{ backgroundColor: '#e4e4e4' }}>
            <Col md={12}>
                <ActionsWrapper 
                    currentMode={currentMode}
                    startExclusion={headerActions.startExclusion}
                    finishExclusion={headerActions.finishExclusion} />
                {
                    groupedItems.map((group, index) => (
                        <DraggableArea
                            key={index}
                            currentMode={currentMode}
                            items={group}
                            actions={headerActions} />
                    ))
                }
            </Col>
        </Row>
    );
};

Wrapper.propTypes = {
    items: PropTypes.array.isRequired,
    currentMode: PropTypes.string.isRequired,
    headerActions: PropTypes.object.isRequired,
}

Wrapper.defaultProps = {
    items: [],
    currentMode: 'none',
    headerActions: {},
};

const mapStateToProps = ({ layoutHeader, layoutHeader2 }) => (
    {
        items: layoutHeader.toJS().items,
        currentMode: layoutHeader.toJS().currentMode,
        layoutHeader2: layoutHeader2.toJS(),
    }
);

const mapDispatchToProps = dispatch => {
    return { headerActions: bindActionCreators(layoutHeaderActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);