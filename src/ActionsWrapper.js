import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';

const ActionsWrapper = ({ currentMode, finishExclusion, startExclusion, startCreation }) => {
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
                    <Col md={2} className="text-right">
                        <span className="align-middle">AÇÕES: </span>
                    </Col>
                    <Col md={4}>
                        <ButtonToolbar>
                            <Button bsStyle="primary" onClick={startCreation}>Adicionar</Button>
                            <Button bsStyle="primary" onClick={startExclusion}>Excluir</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            )
    }
};

ActionsWrapper.propTypes = {
    currentMode: PropTypes.string,
    finishExclusion: PropTypes.func,
    startExclusion: PropTypes.func,
    startCreation: PropTypes.func,
};

ActionsWrapper.defaultProps = {
    currentMode: 'none',
    finishExclusion: () => { },
    startExclusion: () => { },
    startCreation: () => { },
};

export default ActionsWrapper;