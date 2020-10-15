import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph, TextLink } from '@contentful/forma-36-react-components';
import { style } from './style';

const Preview = ({current}) => <>
  {(current && current.url) && (
    <TextLink
      href={current.url}
      icon="ExternalLink"
      target="_blank"
      style={style.previewLink}
    >
      {current.url}
    </TextLink>
  )}
  {(current && 'description' in current) && (
    <Paragraph style={style.description}>
      {`with${current.description ? '' : 'out'} description`}
    </Paragraph>
  )}
</>;

Preview.propTypes = {
  current: PropTypes.object.isRequired,
};

export default Preview;