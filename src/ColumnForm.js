import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, FormControl } from 'react-bootstrap';

export default class ColumnForm extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = { item: props.item };
    }

    handleInputChange(event) {
        const key = event.target.id;
        const value = event.target.value;
        this.setState(prevState => ({ item: { ...prevState.item, [key]: value } }))
    }

    onSave() {

    }

    onCancel() {
        this.props.onCancel();
    }

    render() {
        const { item } = this.state;
        return (
            <span>
                <Row>
                    <Col md={1} />
                    <Col md={1} />
                    <Col md={1} />
                    <Col md={4}>
                        <FormControl defaultValue={item.columnContent} onChange={this.handleInputChange} />
                    </Col>
                    <Col md={1}>
                        <FormControl defaultValue={item.columnSize} onChange={this.handleInputChange} />
                    </Col>
                    <Col md={1}>
                        <FormControl defaultValue={item.columnFormat} onChange={this.handleInputChange} />
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
            </span>
        );
    }
}

ColumnForm.propTypes = {
    item: PropTypes.object,
    onUpdate: PropTypes.func,
    onCancel: PropTypes.func,
};

ColumnForm.defaultProps = {
    item: {},
    onUpdate: () => { },
    onCancel: () => { },
};
