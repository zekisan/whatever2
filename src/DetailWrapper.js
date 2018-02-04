import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as layoutDetailActions from './actions/layoutDetail';
import ActionsWrapper from './ActionsWrapper';
import Detail from './Detail';
import CreateColumnForm from './CreateColumnForm';

const DetailWrapper = ({
    details,
    currentMode,
    detailActions,
    editableColumn,
    editableDetail,
    options }
) => {
    return (
        <Row style={{ backgroundColor: '#e4e4e4' }}>
            <Col md={12}>
                <Row>
                    <Col md={12}>
                        {
                            currentMode === 'creation' ?
                                <CreateColumnForm
                                    onUpdate={detailActions.updateEditableColumn}
                                    onSave={detailActions.createColumn}
                                    onCancel={detailActions.finishCreation}
                                    options={options}
                                    item={editableColumn} /> :
                                <ActionsWrapper
                                    currentMode={currentMode}
                                    startCreation={detailActions.startCreation}
                                    startExclusion={detailActions.startExclusion}
                                    finishExclusion={detailActions.finishExclusion} />
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {
                            details.map((detail, index) => (
                                <Detail
                                    key={index}
                                    currentMode={currentMode}
                                    detail={detail}
                                    options={options}
                                    editableColumn={editableColumn}
                                    editableDetail={editableDetail}
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
    details: PropTypes.array.isRequired,
    currentMode: PropTypes.string.isRequired,
    detailActions: PropTypes.object.isRequired,
    editableColumn: PropTypes.object.isRequired,
}

DetailWrapper.defaultProps = {
    details: [],
    currentMode: 'none',
    detailActions: {},
    editableColumn: {},
};

const mapStateToProps = ({ layoutDetail }) => (
    {
        details: layoutDetail.toJS().details,
        currentMode: layoutDetail.toJS().currentMode,
        editableColumn: layoutDetail.toJS().editableColumn,
        editableDetail: layoutDetail.toJS().editableDetail,
        options: layoutDetail.toJS().options,
    }
);

const mapDispatchToProps = dispatch => {
    return { detailActions: bindActionCreators(layoutDetailActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailWrapper);