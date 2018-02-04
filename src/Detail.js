import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import DraggableArea from './DraggableArea';
import DetailForm from './DetailForm';
import DetailData from './DetailData';

const Detail = (
    {
        detail,
        currentMode,
        options,
        agroupOptions,
        editableColumn,
        editableDetail,
        actions
    }
) => {
    const groupedItems = [];
    for (let i = 1; i <= 5; i++) {
        const group = detail.items.filter(item => item.line === i);
        groupedItems.push(group);
    }

    return (
        <Row style={{ backgroundColor: '#8c5151' }}>
            <Col md={12}>
                <Row>
                    {
                        (currentMode === 'detailEdition' &&
                            editableDetail.detailOrder === detail.detailOrder) ?
                            <DetailForm
                                onSave={actions.saveEditableDetail}
                                onUpdate={actions.updateEditableDetail}
                                onCancel={actions.finishDetailEdition}
                                agroupOptions={agroupOptions}
                                detail={editableDetail} /> :
                            <DetailData
                                agroupOptions={agroupOptions}
                                detail={detail}
                                onEdit={actions.startDetailEdition}
                                onRemove={actions.removeDetail} />
                    }
                </Row>
                <Row>
                    <Col md={12}>
                        {
                            (currentMode === 'detailEdition' &&
                                editableDetail.detailOrder === detail.detailOrder) ?
                                groupedItems.map((group, index) => (
                                    <DraggableArea
                                        key={index}
                                        currentMode={currentMode}
                                        items={group}
                                        options={options}
                                        editableColumn={editableColumn}
                                        actions={actions} />
                                )) : null
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

Detail.propTypes = {
    detail: PropTypes.object,
    currentMode: PropTypes.string,
    options: PropTypes.array,
    agroupOptions: PropTypes.array,
    editableColumn: PropTypes.object,
    editableDetail: PropTypes.object,
    actions: PropTypes.object,
};

Detail.defaultProps = {
    detail: {},
    currentMode: 'none',
    options: [],
    agroupOptions: [],
    editableColumn: {},
    editableDetail: {},
    actions: {},
};

const mapStateToProps = ({ layoutDetail }) => (
    {
        options: layoutDetail.toJS().options,
        editableColumn: layoutDetail.toJS().editableColumn,
        editableDetail: layoutDetail.toJS().editableDetail,
        agroupOptions: layoutDetail.toJS().agroupOptions,
    }
);

export default connect(mapStateToProps)(Detail);
