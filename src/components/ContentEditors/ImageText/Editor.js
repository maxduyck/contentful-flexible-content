import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Option, Select } from '@contentful/forma-36-react-components';
import { ContentConsumer } from '../../ContentContext';
import RichTextEditor from 'rich-text';
import { CloudinaryWidget } from 'cloudinary-widget';
import { style } from './style';

const Editor = ({current, index}) => {
  const { section, row, column } = index;
  
  const [value, setValue] = useState(current || {
    image: [],
    imageBeforeText: true,
    text: null,
  });

  return (
    <ContentConsumer>
      {({sdk, content, updateContent}) => {
        const columnsInRow = content[section].rows[row].columns.length;
        
        const {
          cloudinaryCloudName,
          cloudinaryApiKey,
        } = sdk.parameters.installation;

        return <>
          <Select
            id={`${section}-${row}-${column}-imageBeforeText`}
            name={`${section}-${row}-${column}-imageBeforeText`}
            onChange={e => {
              const newValue = {
                ...value,
                imageBeforeText: e.currentTarget.value === 'true',
              };
              updateContent(newValue, index);
              setValue(newValue);
            }}
            style={style.margin}
            value={value.imageBeforeText.toString()}
            width="medium"
          >
            <Option value="true">
              {columnsInRow === 2
                ? 'Text below the image'
                : 'Image on the left of the text'
              }
            </Option>
            <Option value="false">
              {columnsInRow === 2
                ? 'Image below the text'
                : 'Text on the left of the image'
              }
            </Option>
          </Select>
          <div style={style.margin}>
            <CloudinaryWidget
              sdk={sdk}
              cloudName={cloudinaryCloudName}
              apiKey={cloudinaryApiKey}
              maxFiles={1}
              onChange={res => {
                const newValue = {
                  ...value,
                  image: res,
                };
                updateContent(newValue, index)
                setValue(newValue)
              }}
              value={value.image}
            />
          </div>
          <RichTextEditor
            sdk={sdk}
            defaultValue={current && current.text
              ? current.text
              : null
            }
            height={250}
            onChange={text => {
              const newValue = {
                ...value,
                text: text,
              };
              updateContent(newValue, index)
              setValue(newValue)
            }}
          />
        </>;
      }}
    </ContentConsumer>
  );
};

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