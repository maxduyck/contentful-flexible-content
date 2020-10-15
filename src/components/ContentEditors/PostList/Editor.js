import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, } from '@contentful/forma-36-react-components';
import { ContentConsumer } from '../../ContentContext';
import CategoryField from './CategoryField.js';
import CountField from './CountField.js';
import DestinationField from './DestinationField.js';
import MainTagsField from './MainTagsField.js';
import { style } from './style';

const Consumed = ({current, index, sdk, updateContent}) => {
  const [value, setValue] = useState(current || {
    categoryId: null,
    destinations: null,
    mainTags: null,
    postCount: 3,
  });

  const updateValue = (key, fieldValue) => {
    const newValue = {
      ...value,
      [key]: fieldValue,
    };
    updateContent(newValue, index);
    setValue(newValue);
  };

  return <Form
    onSubmit={() => {}}
    style={style.form}
  >
    <CountField
      current={value.postCount}
      index={index}
      onChange={updateValue}
    />
    <CategoryField
      current={value.categoryId}
      onChange={updateValue}
      sdk={sdk}
    />
    <MainTagsField
      current={value.mainTags}
      onChange={updateValue}
      sdk={sdk}
    />
    <DestinationField
      current={value.destinations}
      index={index}
      onChange={updateValue}
      sdk={sdk}
    />
  </Form>;
};

const Editor = ({current, index}) => (
  <ContentConsumer>
    {({sdk, updateContent}) => <Consumed
      current={current}
      index={index}
      sdk={sdk}
      updateContent={updateContent}
    />}
  </ContentConsumer>
);

Editor.propTypes = {
  current: PropTypes.object,
  index: PropTypes.shape({
    column: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    section: PropTypes.number.isRequired,
  }).isRequired,
  showPreview: PropTypes.func,
};

export default Editor;