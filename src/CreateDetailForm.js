import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import CheckboxMultiSelect from './CheckboxMultiSelect';

const mountCheckboxesOptions = (values, agroupOptions) => {
    let finalOptions = [];
    agroupOptions.forEach(option => {
        const idx = values.split(',').findIndex(v => v === option.selectSel)

        finalOptions.push({
            value: option.selectSel,
            text: option.selectDesc,
            isSelected: idx !== -1,
        });
    });
    return finalOptions;
}

export default class CreateDetailForm extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onUpdateAgroup = this.onUpdateAgroup.bind(this);
    }

    onUpdateAgroup(values) {
        this.props.onUpdate('agroup', values.map(v => v.value).join(','));
    }

    onSave() {
        this.props.onSave(this.props.detail);
    }

    onCancel() {
        this.props.onCancel();
    }

    handleInputChange(event) {
        const key = event.target.id;
        const value = event.target.value;
        this.props.onUpdate(key, value);
    }

    render() {
        const { detail, agroupOptions } = this.props;
        return (
            <span>
                <Row>
                    <Col md={2}>
                        <input className="form-control"
                            id="detailCount"
                            type="text"
                            placeholder="Sigla Conta"
                            value={detail.detailCount || ''}
                            onChange={this.handleInputChange} />
                    </Col>
                    <Col md={5}>
                        <CheckboxMultiSelect
                            options={mountCheckboxesOptions(detail.agroup || '', agroupOptions)}
                            updater={this.onUpdateAgroup} />
                    </Col>
                    <Col md={1}>
                    </Col>
                    <Col md={4}>
                    </Col>
                    <Col md={1}>
                    </Col>
                    <Col md={2}>
                    </Col>
                    <Col md={2}>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={3}>
                        <ButtonToolbar>
                            <Button bsStyle="primary" onClick={this.onSave}>Salvar</Button>
                            <Button bsStyle="primary" onClick={this.onCancel}>Cancelar</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </span>
        );
    }
}

CreateDetailForm.propTypes = {
    detail: PropTypes.object,
    options: PropTypes.array,
    onUpdate: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

CreateDetailForm.defaultProps = {
    item: {},
    options: [],
    onUpdate: () => { },
    onSave: () => { },
    onCancel: () => { },
};
