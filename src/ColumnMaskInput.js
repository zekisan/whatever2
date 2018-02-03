import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const ColumnMaskInput = ({ format, mask, onChange, id }) => {
    if (format !== 'C') {
        return (
            <FormControl
                id="columnMask"
                value={mask}
                onChange={onChange} />
        );
    } else {
        onChange({ target: { id: "columnMask", value: '' } })
        return null;
    }
}

ColumnMaskInput.propTypes = {
    format: PropTypes.string,
    mask: PropTypes.string,
    onChange: PropTypes.func,
};

ColumnMaskInput.defaultProps = {
    format: '',
    mask: '',
    onChange: () => { },
};

export default ColumnMaskInput;