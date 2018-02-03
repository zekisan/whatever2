import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

const ActionsWrapper = ({ currentMode, finishExclusion, startExclusion }) => {
    switch (currentMode) {
        case 'exclusion':
            return (
                <Row>
                    <Col md={12}>
                        <Button bsStyle="primary" onClick={finishExclusion}>Finalizar</Button>
                    </Col>
                </Row>
            );
        case 'creation':
            return null;
        default:
            return (
                <Row>
                    <Col md={2}>
                        <span>AÇÕES: </span>
                    </Col>
                    <Col md={2}>
                        <Button bsStyle="primary">Adicionar</Button>
                    </Col>
                    <Col md={2}>
                        <Button bsStyle="primary" onClick={startExclusion}>Excluir</Button>
                    </Col>
                </Row>
            )
    }
};

ActionsWrapper.propTypes = {
    currentMode: PropTypes.string,
    finishExclusion: PropTypes.func,
    startExclusion: PropTypes.func
};

ActionsWrapper.defaultProps = {
    currentMode: 'none',
    finishExclusion: () => {},
    startExclusion: () => {},
};

export default ActionsWrapper;