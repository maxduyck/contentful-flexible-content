import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CheckboxField,
  Form,
  TextField,
} from '@contentful/forma-36-react-components';
import { ContentConsumer } from '../../ContentContext';
import { style } from './style';

const Editor = ({current, index, showPreview}) => {
  const { section, row, column } = index;

  const [description, setDescription] = useState(current && current.description ? current.description : true);
  const [url, setUrl] = useState(current && current.url ? current.url : '');
  const [error, setError] = useState('');

  return (
    <ContentConsumer>
      {({updateContent}) => {
        const handleSubmit = (url, description) => {
          setError('');
          updateContent({
            url: url,
            description: description,
          }, index);
          showPreview();
        };

        const parseURL = (url, description) => {
          try {
            new URL(url);
          }
          catch {
            return setError('Invalid Instagram URL');
          }
          const igURL = new URL(url);
          if (!igURL.host.includes('instagram.com')) {
            return setError('Invalid Instagram URL');
          }
          if (!igURL.pathname.includes('/p/')) {
            return setError('unable to find media ID');
          }
          return handleSubmit(igURL.origin + igURL.pathname, description);
        };

        return <Form
            onSubmit={() => parseURL(url, description)}
            style={style.form}
          >
            <TextField
              id="url"
              htmlFor="url"
              name="url"
              labelText="Media URL"
              helpText="Copy and paste the URL of the media from instagram.com"
              validationMessage={error}
              required
              onChange={e => setUrl(e.currentTarget.value)}
              value={url}
            />
            <CheckboxField
              id={`id-descr-${section}-${row}-${column}`}
              checked={!description}
              labelText="Hide description"
              name="description"
              onChange={e => setDescription(!e.currentTarget.checked)}
              style={style.checkbox}
              value="yes"
            />
            <Button
              buttonType="positive"
              icon="CheckCircle"
              style={style.submit}
              type="submit"
            >
              Save
            </Button>
          </Form>;
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