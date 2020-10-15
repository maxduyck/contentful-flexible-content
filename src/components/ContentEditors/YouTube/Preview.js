import React from 'react';
import PropTypes from 'prop-types';
import { TextLink } from '@contentful/forma-36-react-components';
import { style } from './style';

const baseURL = 'https://www.youtube.com/watch?v=';

const Preview = ({current}) => (current && current.videoId) && (
  <TextLink
    href={`${baseURL}${current.videoId}`}
    icon="ExternalLink"
    target="_blank"
    style={style.previewLink}
  >
    {baseURL}{current.videoId}
  </TextLink>
);

Preview.propTypes = {
  current: PropTypes.object.isRequired,
};

export default Preview;