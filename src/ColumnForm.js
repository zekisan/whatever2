import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, FormControl } from 'react-bootstrap';

const ColumnForm = ({ item }) => (
    <span>
        <Row>
            <Col md={1} />
            <Col md={1}>
                <FormControl defaultValue={item.line}/>
            </Col>
            <Col md={1}>{item.columnOrder}</Col>
            <Col md={4}>{item.columnContent}</Col>
            <Col md={1}>{item.columnSize}</Col>
            <Col md={1}>{item.columnFormat}</Col>
            <Col md={2} />
        </Row>
        <Row>
            <Col md={2}>
                <Button bsStyle="primary">Salvar</Button>
            </Col>
            <Col md={2}>
                <Button bsStyle="primary">Cancelar</Button>
            </Col>
        </Row>
    </span>
);

ColumnForm.propTypes = {
    item: PropTypes.object,
};

ColumnForm.defaultProps = {
    item: {},
};

export default ColumnForm;