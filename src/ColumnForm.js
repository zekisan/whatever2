import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import ColumnModal from './ColumnModal';

export default class ColumnForm extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }

    handleInputChange(event) {
        const key = event.target.id;
        const value = event.target.value;
        this.props.onUpdate(key, value);
    }

    onSave() {
        this.props.onSave(this.props.item);
    }

    onCancel() {
        this.props.onCancel();
    }

    handleModal() {
        this.setState(prevState => ({ showModal: !prevState.showModal }));
    }

    render() {
        const { item, onUpdate } = this.props;
        const { showModal } = this.state;
        return (
            <span>
                <Row>
                    <Col md={1} />
                    <Col md={1} />
                    <Col md={1} />
                    <Col md={4}>
                        <FormControl
                            value={item.columnContent}
                            onClick={this.handleModal}
                            onChange={this.handleInputChange} />
                    </Col>
                    <Col md={1}>
                        <FormControl
                            id="columnSize"
                            value={item.columnSize}
                            onChange={this.handleInputChange} />
                    </Col>
                    <Col md={1}>
                        <FormControl
                            id="columnFormat"
                            value={item.columnFormat}
                            onChange={this.handleInputChange} />
                    </Col>
                    <Col md={2} />
                </Row>
                <Row>
                    <Col md={2}>
                        <Button bsStyle="primary" onClick={this.onSave}>Salvar</Button>
                    </Col>
                    <Col md={2}>
                        <Button bsStyle="primary" onClick={this.onCancel}>Cancelar</Button>
                    </Col>
                </Row>
                <ColumnModal
                    show={showModal}
                    handleClose={this.handleModal}
                    onChange={onUpdate}
                    value={item.columnContent} />
            </span>
        );
    }
}

ColumnForm.propTypes = {
    item: PropTypes.object,
    onUpdate: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

ColumnForm.defaultProps = {
    item: {},
    onUpdate: () => { },
    onSave: () => { },
    onCancel: () => { },
};
