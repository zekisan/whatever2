import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const CheckboxMultiSelect = ({ options, updater }) => {
        return (
            <div className="section">
                <Select
                    options={options}
                    optionComponent={CustomOption}
                    onChange={updater}
                    value={options.filter(o => o.isSelected)}
                    multi
                    placeholder="Selecione"
                    clearAllText="Remover todos"
                    tabSelectsValue={false}
                    removeSelected={false}
                    closeOnSelect={false}
                    valueComponent={CustomValue}
                />
            </div>
        );
    };

CheckboxMultiSelect.propTypes = {
    options: PropTypes.array,
    updater: PropTypes.func,
};

CheckboxMultiSelect.defaultProps = {
    options: [],
    updater: () => { },
};

export default CheckboxMultiSelect;

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

        const { option } = this.props;
        option.isSelected = !option.isSelected;
        this.props.onSelect(option, event);
    }

    handleMouseEnter(event) {
        this.props.onFocus(this.props.option, event);
    }

    handleMouseMove(event) {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, event);
    }

    render() {
        const { option } = this.props;
        return (
            <div className={this.props.className}
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onMouseMove={this.handleMouseMove}
                title={option.value}>
                <Checkbox checked={option.isSelected} onChange={() => { }}>
                    {option.text}
                </Checkbox>
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

const CustomValue = ({ value }) => (
    <span className="my-value-label">
        {value.text}
    </span>
)

CustomValue.propTypes = {
    value: PropTypes.object,
};

CustomValue.defaultProps = {
    value: {},
};
