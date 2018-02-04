import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

const formatAgroupValues = (values, agroupOptions) => {
    let finalValues = [];
    values.split(',').forEach(value => {
        finalValues.push(agroupOptions.filter(o => o.selectSel === value)[0].selectDesc);
    });
    return finalValues.join(', ');
}

const DetailData = ({ detail, agroupOptions, onEdit, onRemove }) => {
    return (
        <Row>
            <Col md={1}>
                {detail.line}
            </Col>
            <Col md={2}>
                {detail.detailCount}
            </Col>
            <Col md={5}>
                {formatAgroupValues(detail.agroup, agroupOptions)}
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
    agroupOptions: PropTypes.array,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func,
};

DetailData.defaultProps = {
    detail: {},
    agroupOptions: [],
    onRemove: () => { },
    onEdit: () => { },
};

export default DetailData;