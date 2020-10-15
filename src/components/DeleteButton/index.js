import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@contentful/forma-36-react-components';
import bin from './bin.svg';

const DeleteButton = ({onClick, size, style}) => {
  const baseStyle = {
    button: {
      display: 'flex',
      justifyContent: 'center',
    },
    icon: {
      backgroundImage: `url('${bin}')`,
      backgroundSize: 'contain',
      display: 'block',
      height: size === 'small' ? 12 : 16,
      width: size === 'small' ? 12 : 16,
    },
  };
  return (
    <Button
      buttonType="negative"
      onClick={onClick}
      style={{...baseStyle.button, ...style}}
    >
      <span style={baseStyle.icon}></span>
    </Button>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
  style: PropTypes.object,
};

export default DeleteButton;