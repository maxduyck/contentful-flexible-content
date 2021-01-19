import React from 'react';
import PropTypes from 'prop-types';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { Note, Paragraph, TextLink } from '@contentful/forma-36-react-components';
import { useConfig } from '../../contexts/ConfigContext';
import { style } from './style';

const InitError = ({reset}) => {
  const { hasSections } = useConfig();
  return (
    <Note noteType="negative" title="Problem detected">
      <Paragraph css={style.p}>A problem has been detected with the configuration of the plugin <b>contentful-flexible-content</b>. This can occur because the property <b>hasSections</b> was changed after content was added in this field.</Paragraph>
      <Paragraph css={style.p}>Please fix the configuration or, if you wish to proceed with the new parameters you must <b>erase the current field content</b> by clicking the following link:</Paragraph>
      <TextLink onClick={reset}>
        {`Create new content with${hasSections ? '' : 'out'} sections `}
        <b>(dangerous)</b>
      </TextLink>
    </Note>
  );
};

InitError.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default InitError;
