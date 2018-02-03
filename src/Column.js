import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

const getValue = (value, collection) => {
    const foundObj = collection.filter(c => c.value === value)[0];
    return (foundObj && foundObj.text) || '';
}

const Column = ({ item, willRemove, onRemove, onEdit, options }) => (
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
        <Col md={2} className="text-center">
            <Row>
                <Col md={12}>
                    {getValue(item.columnFormat, options)}
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <ColumnMask mask={item.columnMask} format={item.columnFormat} />
                </Col>
            </Row>
        </Col>
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
    options: PropTypes.array,
    willRemove: PropTypes.bool,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func,
};

Column.defaultProps = {
    item: {},
    options: [],
    willRemove: false,
    onRemove: () => { },
    onEdit: () => { },
};

export default Column;

const ColumnMask = ({ format, mask }) => {
    if (format === '' || format === null || typeof format === 'undefined' || format === 'C') {
        return null;
    } else {
        return (
            <span>{mask}</span>
        );
    }
}

ColumnMask.propTypes = {
    format: PropTypes.string,
    mask: PropTypes.string,
};

ColumnMask.defaultProps = {
    format: '',
    mask: '',
};
