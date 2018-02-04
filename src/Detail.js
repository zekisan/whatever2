import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import DraggableArea from './DraggableArea';
import DetailForm from './DetailForm';

const Detail = (
    {
        detail,
        currentMode,
        options,
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
                                onCancel={actions.finishDetailEdition}
                                detail={editableDetail} /> :
                            <DetailData
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
    editableColumn: PropTypes.object,
    editableDetail: PropTypes.object,
    actions: PropTypes.object,
};

Detail.defaultProps = {
    detail: {},
    currentMode: 'none',
    options: [],
    editableColumn: {},
    editableDetail: {},
    actions: {},
};

const DetailData = ({ detail, onEdit, onRemove }) => {
    return (
        <Row>
            <Col md={1}>
                {detail.line}
            </Col>
            <Col md={2}>
                {detail.detailCount}
            </Col>
            <Col md={5}>
            </Col>
            <Col md={1}>
                <Button bsStyle="link" onClick={() => onEdit(detail)}>editar</Button>
            </Col>
            <Col md={1}>
                <Button bsStyle="link" onClick={() => onRemove(detail)}>excluir</Button>
            </Col>
        </Row>
    )
}

DetailData.propTypes = {
    detail: PropTypes.object,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func,
};

DetailData.defaultProps = {
    detail: {},
    onRemove: () => { },
    onEdit: () => { },
};

export default Detail;
