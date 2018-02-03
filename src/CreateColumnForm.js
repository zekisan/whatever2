import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, ButtonToolbar, FormControl } from 'react-bootstrap';
import ColumnModal from './ColumnModal';
import ColumnMaskInput from './ColumnMaskInput';

export default class CreateColumnForm extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }

    onSave() {
        this.props.onSave(this.props.item);
    }

    onCancel() {
        this.props.onCancel();
    }

    handleInputChange(event) {
        const key = event.target.id;
        const value = event.target.value;
        this.props.onUpdate(key, value);
    }

    handleModal() {
        this.setState(prevState => ({ showModal: !prevState.showModal }));
    }

    render() {
        const { item, onUpdate, options } = this.props;
        const { showModal } = this.state;
        return (
            <span>
                <Row>
                    <Col md={1} />
                    <Col md={1} />
                    <Col md={1}>
                    <FormControl
                            id="line"
                            componentClass="select"
                            value={item.line}
                            placeholder="linha"
                            onChange={this.handleInputChange}>
                            <option value=''/>
                            {
                                [
                                    {value: '1', text: '1'},
                                    {value: '2', text: '2'},
                                    {value: '3', text: '3'},
                                ].map(option => <option key={option.value} value={option.value}>{option.text}</option>)
                            }
                        </FormControl>
                    </Col>
                    <Col md={4}>
                        <FormControl
                            value={item.columnContent}
                            onClick={this.handleModal}
                            onChange={() => { }} />
                    </Col>
                    <Col md={1}>
                        <FormControl
                            id="columnSize"
                            value={item.columnSize}
                            onChange={this.handleInputChange} />
                    </Col>
                    <Col md={2}>
                        <FormControl
                            id="columnFormat"
                            componentClass="select"
                            value={item.columnFormat}
                            onChange={this.handleInputChange}>
                            <option value=''/>
                            {
                                options.map(option => <option key={option.value} value={option.value}>{option.text}</option>)
                            }
                        </FormControl>
                    </Col>
                    <Col md={2}>
                        <ColumnMaskInput
                            mask={item.columnMask}
                            format={item.columnFormat}
                            onChange={this.handleInputChange} />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={2} />
                    <Col md={3}>
                        <ButtonToolbar>
                            <Button bsStyle="primary" onClick={this.onSave}>Salvar</Button>
                            <Button bsStyle="primary" onClick={this.onCancel}>Cancelar</Button>
                        </ButtonToolbar>
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

CreateColumnForm.propTypes = {
    item: PropTypes.object,
    options: PropTypes.array,
    onUpdate: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

CreateColumnForm.defaultProps = {
    item: {},
    options: [],
    onUpdate: () => { },
    onSave: () => { },
    onCancel: () => { },
};
