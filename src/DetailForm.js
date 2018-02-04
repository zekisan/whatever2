import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
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

export default class DetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.onUpdateAgroup = this.onUpdateAgroup.bind(this);
    }

    onUpdateAgroup(values) {
        this.props.onUpdate('agroup', values.map(v => v.value).join(','));
    }

    render() {
        const { detail, agroupOptions, onSave, onCancel } = this.props;
        return (
            <Row>
                <Col md={1}>
                    {detail.line}
                </Col>
                <Col md={2}>
                    {detail.detailCount}
                </Col>
                <Col md={5}>
                    <CheckboxMultiSelect
                        options={mountCheckboxesOptions(detail.agroup, agroupOptions)}
                        updater={this.onUpdateAgroup} />
                </Col>
                <Col md={1}>
                    <Button bsStyle="link" onClick={() => onSave(detail)}>Salvar</Button>
                </Col>
                <Col md={1}>
                    <Button bsStyle="link" onClick={onCancel}>cancelar</Button>
                </Col>
            </Row>
        );
    }
}

DetailForm.propTypes = {
    detail: PropTypes.object,
    agroupOptions: PropTypes.array,
    onUpdate: PropTypes.func,
    onCancel: PropTypes.func,
};

DetailForm.defaultProps = {
    detail: {},
    agroupOptions: [],
    onUpdate: () => { },
    onCancel: () => { },
};
