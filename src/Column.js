import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

const Column = ({ item, willRemove, onRemove, onEdit }) => (
    <Row>
        <Col md={1}>
            {
                willRemove &&
                <Button bsStyle="link" onClick={() => onRemove(item)}>
                    <i className="fas fa-minus-circle" />
                </Button>
            }
        </Col>
        <Col md={1}>{item.line}</Col>
        <Col md={1}>{item.columnOrder}</Col>
        <Col md={4}>{item.columnContent}</Col>
        <Col md={1}>{item.columnSize}</Col>
        <Col md={1}>{item.columnFormat}</Col>
        <Col md={1}>
            <Button bsStyle="link" onClick={() => onEdit(item)}>editar</Button>
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
    onEdit: PropTypes.func,
};

Column.defaultProps = {
    item: {},
    willRemove: false,
    onRemove: () => { },
    onEdit: () => { },
};

export default Column;