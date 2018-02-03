import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, FormControl } from 'react-bootstrap';

export default class ColumnModal extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleInputChange(event) {
        this.setState({ value: event.target.value });
    }
    
    handleClose() {
        const { onChange, inputId, handleClose } = this.props;
        const { value } = this.state;
        onChange(inputId, value);
        handleClose();
    }

    render() {
        const { value } = this.state;
        const { show, handleClose } = this.props;
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        value={value}
                        id="columnContent"
                        onChange={this.handleInputChange}
                        componentClass="textarea"
                        placeholder="textarea" />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Fechar</Button>
                </Modal.Footer>
            </Modal>

        );
    }
}

ColumnModal.propTypes = {
    value: PropTypes.string,
    inputId: PropTypes.string,
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    onChange: PropTypes.func,
};

ColumnModal.defaultProps = {
    value: '',
    inputId: 'columnContent',
    show: false,
    handleClose: () => { },
    onChange: () => { },
};