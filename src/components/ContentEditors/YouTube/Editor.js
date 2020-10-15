import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, TextField } from '@contentful/forma-36-react-components';
import { ContentConsumer } from '../../ContentContext';
import { style } from './style';

const Editor = ({current, index, showPreview}) => {
  const baseURL = 'https://www.youtube.com/watch?v=';
  const currentValue = current && current.videoId ? baseURL + current.videoId : '';
  const [value, setValue] = useState(currentValue);
  const [error, setError] = useState('');

  return (
    <ContentConsumer>
      {({updateContent}) => {
        const handleSubmit = value => {
          setError('');
          updateContent({videoId: value}, index);
          showPreview();
        };

        const parseURL = value => {
          try {
            new URL(value);
          }
          catch {
            return setError('Invalid YouTube URL');
          }
          const url = new URL(value);
          if (!url.host.includes('youtube.com')) {
            return setError('Invalid YouTube URL');
          }
          const videoId = url.searchParams.get('v');
          return videoId
            ? handleSubmit(videoId, index)
            : setError('Unable to find video ID');
        };

        return <Form
            onSubmit={() => parseURL(value)}
            style={style.form}
          >
            <TextField
              id="url"
              htmlFor="url"
              name="url"
              labelText="Video URL"
              helpText="Copy and paste the URL of the video from youtube.com"
              validationMessage={error}
              required
              onChange={e => setValue(e.currentTarget.value)}
              value={value}
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