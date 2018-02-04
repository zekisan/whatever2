import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import CheckboxMultiSelect from './CheckboxMultiSelect';

const DetailForm = ({ detail, onCancel }) => {
    return (
        <Row>
            <Col md={1}>
                {detail.line}
            </Col>
            <Col md={2}>
                {detail.detailCount}
            </Col>
            <Col md={5}>
                <CheckboxMultiSelect />
            </Col>
            <Col md={1}>
                <Button bsStyle="link" onClick={() => { }}>Salvar</Button>
            </Col>
            <Col md={1}>
                <Button bsStyle="link" onClick={onCancel}>cancelar</Button>
            </Col>
        </Row>
    );
}

DetailForm.propTypes = {
    detail: PropTypes.object,
    onCancel: PropTypes.func,
};

DetailForm.defaultProps = {
    detail: {},
    onCancel: () => {},
};

export default DetailForm;
