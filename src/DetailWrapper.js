import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as layoutDetailActions from './actions/layoutDetail';
import ActionsWrapper from './ActionsWrapper';
import Detail from './Detail';
import CreateColumnForm from './CreateColumnForm';

const DetailWrapper = ({ state, detailActions, }) => {
    return (
        <Row style={{ backgroundColor: '#e4e4e4' }}>
            <Col md={12}>
                <Row>
                    <Col md={12}>
                        {
                            state.currentMode === 'creation' ?
                                <CreateColumnForm
                                    onUpdate={detailActions.updateEditableColumn}
                                    onSave={detailActions.createColumn}
                                    onCancel={detailActions.finishCreation}
                                    options={state.options}
                                    item={state.editableColumn} /> :
                                <ActionsWrapper
                                    currentMode={state.currentMode}
                                    startCreation={detailActions.startCreation}
                                    startExclusion={detailActions.startExclusion}
                                    finishExclusion={detailActions.finishExclusion} />
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {
                            state.details.map((detail, index) => (
                                <Detail
                                    key={index}
                                    currentMode={state.currentMode}
                                    detail={detail}
                                    actions={detailActions} />
                            ))
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

DetailWrapper.propTypes = {
    state: PropTypes.object,
    detailActions: PropTypes.object.isRequired,
}

DetailWrapper.defaultProps = {
    state: {},
    detailActions: {},
};

const mapStateToProps = ({ layoutDetail }) => (
    {
        state: layoutDetail.toJS(),
    }
);

const mapDispatchToProps = dispatch => {
    return { detailActions: bindActionCreators(layoutDetailActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailWrapper);