import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as layoutDetailActions from './actions/layoutDetail';
import DetailActionsWrapper from './DetailActionsWrapper';
import Detail from './Detail';
import CreateColumnForm from './CreateColumnForm';
import CreateDetailForm from './CreateDetailForm';

const DetailWrapper = ({ state, detailActions, }) => {
    return (
        <Row style={{ backgroundColor: '#e4e4e4' }}>
            <Col md={12}>
                <Row>
                    <Col md={12}>
                        <DetailsActions
                            currentMode={state.currentMode}
                            actions={detailActions}
                            options={state.options}
                            agroupOptions={state.agroupOptions}
                            editableColumn={state.editableColumn}
                            editableDetail={state.editableDetail} />
                    </Col>
                </Row>
                <br />
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

const DetailsActions = ({
    currentMode,
    editableDetail,
    editableColumn,
    actions,
    agroupOptions,
    options
}) => {
    switch (currentMode) {
        case 'detailCreation':
            return (<CreateDetailForm
                detail={editableDetail}
                agroupOptions={agroupOptions}
                onSave={actions.createDetail}
                onUpdate={actions.updateEditableDetail}
                onCancel={actions.finishDetailCreation} />);
        case 'columnCreation':
            return (<CreateColumnForm
                onUpdate={actions.updateEditableColumn}
                onSave={actions.createColumn}
                onCancel={actions.finishCreation}
                options={options}
                item={editableColumn} />);
        default:
            return (<DetailActionsWrapper
                startDetailCreation={actions.startDetailCreation}
                startExclusion={actions.startExclusion} />);
    }
}

DetailsActions.propTypes = {
    currentMode: PropTypes.string,
    editableColumn: PropTypes.object,
    actions: PropTypes.object,
    agroupOptions: PropTypes.array,
    options: PropTypes.array,
};

DetailsActions.defaultProps = {
    currentMode: 'none',
    editableColumn: {},
    actions: {},
    agroupOptions: [],
    options: [],
};
