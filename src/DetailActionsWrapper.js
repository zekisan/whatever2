import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';

const DetailActionsWrapper = ({ startDetailCreation, startColumnCreation }) => (
    <Row>
        <Col md={2} className="text-right">
            <span className="align-middle">AÇÕES: </span>
        </Col>
        <Col md={4}>
            <ButtonToolbar>
                <Button bsStyle="primary" onClick={startDetailCreation}>Adicionar Detalhe</Button>
                <Button bsStyle="primary" onClick={startColumnCreation}>Adicionar Coluna</Button>
            </ButtonToolbar>
        </Col>
    </Row>
);

DetailActionsWrapper.propTypes = {
    startDetailCreation: PropTypes.func,
    startColumnCreation: PropTypes.func,
};

DetailActionsWrapper.defaultProps = {
    startDetailCreation: () => { },
    startColumnCreation: () => { },
};

export default DetailActionsWrapper;