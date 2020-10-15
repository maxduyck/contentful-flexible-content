import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@contentful/forma-36-react-components';

const CountField = ({current, index, onChange}) => {
  const { section, row, column } = index;

  return <TextField
    labelText="Amount of deals to show"
    id={`${section}-${row}-${column}-postlist`}
    htmlFor={`${section}-${row}-${column}-postlist`}
    name={`${section}-${row}-${column}-postlist`}
    textInputProps={{
      type: 'number',
      min: 3,
      max: 12,
    }}
    onChange={e => onChange('postCount', parseInt(e.currentTarget.value))}
    value={current.toString()}
  />;
};

CountField.propTypes = {
  current: PropTypes.number,
  index: PropTypes.shape({
    column: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    section: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CountField;