import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

const Column = ({ item, willRemove, onRemove }) => (
    <Row>
        <Col md={1}>
            {
                willRemove &&
                <a href="#remove" onClick={() => onRemove(item)}>
                    <i className="fas fa-minus-circle" />
                </a>
            }
        </Col>
        <Col md={1}>{item.line}</Col>
        <Col md={1}>{item.columnOrder}</Col>
        <Col md={4}>{item.columnContent}</Col>
        <Col md={1}>{item.columnSize}</Col>
        <Col md={1}>{item.columnFormat}</Col>
        <Col md={1}>
            <a href="#edit" onClick={() => { }}>editar</a>
        </Col>
        <Col md={1}>
            <i className="fas fa-arrows-alt" />
        </Col>
    </Row>
);

Column.propTypes = {
    item: PropTypes.object,
    willRemove: PropTypes.bool,
    onRemove: PropTypes.func,
};

Column.defaultProps = {
    item: {},
    willRemove: false,
    onRemove: () => { },
};

export default Column;