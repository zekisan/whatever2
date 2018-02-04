import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class CheckboxMultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.setValue = this.setValue.bind(this);
        this.renderOption = this.renderOption.bind(this);
        this.renderValue = this.renderValue.bind(this);
    }

    setValue(value) {
        this.setState({ value });
    }

    renderOption(option) {
        return (
            <Checkbox defaultChecked={false}>
                {option.label}
            </Checkbox>
        );
    }

    renderValue(option) {
        return <strong style={{ color: option.color }}>{option.label}</strong>;
    }

    render() {
        var options = [
            { label: 'Basic customer support', value: 'basic', color: '#E31864' },
            { label: 'Premium customer support', value: 'premium', color: '#6216A3' },
            { label: 'Pro customer support', value: 'pro' },
        ];
        return (
            <div className="section">
                <Select
                    options={options}
                    optionRenderer={this.renderOption}
                    onChange={this.setValue}
                    value={this.state.value}
                    multi
                    removeSelected={false}
                    closeOnSelect={false}
                    valueComponent={CustomValue}
                />
            </div>
        );
    }
};

CheckboxMultiSelect.propTypes = {
    label: PropTypes.string,
};


class CustomOption extends React.Component {
    constructor(props) {
        super(props);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    handleMouseDown(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    }

    handleMouseEnter(event) {
        this.props.onFocus(this.props.option, event);
    }

    handleMouseMove(event) {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, event);
    }

    render() {
        return (
            <div className={this.props.className}
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onMouseMove={this.handleMouseMove}
                title={this.props.option.value}>
                {this.props.option.label}
                {this.props.children}
            </div>
        );
    }
};

CustomOption.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired,
};

const CustomValue = ({ children, placeholder, value }) => (
    <span>
        {value.label}
    </span>
)