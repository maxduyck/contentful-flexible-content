import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Option,
  Select,
} from '@contentful/forma-36-react-components';
import { useConfig, ContentConsumer } from 'contexts';
// import { elements } from '../ContentEditors/index';
import { style } from './style';

const ColumnForm = ({columnCount, index}) => {
  const { elements } = useConfig();
  const [element, setElement] = useState(elements[0].key);
  
  return (
    <ContentConsumer>
      {({sdk, addElement, openExtension, updateContent}) => {
        const contentTypeId = sdk.contentType.sys.id;

        const handleSubmit = (element, index) => {
          addElement(element, index);
          const addedEl = elements.find(({key}) => element === key);
          addedEl && typeof addedEl.Editor === 'string' &&
            openExtension(
              addedEl,
              null,
              data => data && updateContent(data, index),
            );
        };

        return (
          <Form
            onSubmit={() => handleSubmit(element, index)}
            style={style.form}
          >
            <Select
              name="elements"
              onChange={e => setElement(e.currentTarget.value)}
              style={style.select}
              value={element}
              width="medium"
            >
              {elements.map(element => ((!('columnLimit' in element)
              || element.columnLimit.includes(columnCount))
              && (!('contentTypes' in element)
              || element.contentTypes.includes(contentTypeId))) && (
                <Option
                  key={element.key}
                  value={element.key}
                >
                  {element.label}
                </Option>
              ))}
            </Select>
            <Button
              buttonType="positive"
              icon="ChevronRight"
              onClick={e => e.stopPropagation()}
              style={style.submit}
              type="submit"
            />
          </Form>
        );
      }}
    </ContentConsumer>
  );
};

ColumnForm.propTypes = {
  columnCount: PropTypes.number.isRequired,
  index: PropTypes.shape({
    column: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    section: PropTypes.number.isRequired,
  }).isRequired,
};

export default ColumnForm;