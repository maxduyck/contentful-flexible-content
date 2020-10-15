import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from '@contentful/forma-36-react-components';
import { style } from './style';

const Preview = ({current}) => (current
 && current.src
 && current.height
 && current.width) && <>
  <iframe
    src={current.src}
    width="400"
    height="200"
    frameBorder="0"
    style={style.previewIframe}
    allowFullScreen=""
    aria-hidden="false"
    tabIndex="0">
  </iframe>
  <div style={style.dimensions}>
    <Paragraph><b>Width:</b><br />{current.width}px</Paragraph>
    <Paragraph><b>Height:</b><br />{current.height}px</Paragraph>
  </div>
</>;


Preview.propTypes = {
  current: PropTypes.object.isRequired,
};

export default Preview;