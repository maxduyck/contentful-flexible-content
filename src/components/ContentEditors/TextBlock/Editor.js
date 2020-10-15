import React from 'react';
import PropTypes from 'prop-types';
import { ContentConsumer } from '../../ContentContext';
import RichTextEditor from 'rich-text';

const Editor = ({current, index}) => (
  <ContentConsumer>
    {({sdk, updateContent}) => (
      <RichTextEditor
        sdk={sdk}
        defaultValue={current}
        height={250}
        onChange={value => updateContent(value, index)}
      />
    )}
  </ContentConsumer>
);


Editor.propTypes = {
  current: PropTypes.object,
  index: PropTypes.shape({
    column: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    section: PropTypes.number.isRequired,
  }).isRequired,
};

export default Editor;