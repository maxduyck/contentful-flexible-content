import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, TextField } from '@contentful/forma-36-react-components';
import { ContentConsumer } from '../../ContentContext';
import { style } from './style';

const Editor = ({current, index, showPreview}) => {
  const defaultHeight = 300;
  const defaultWidth = 400;
  
  const currentValue = current
    && current.src
    && current.height
    && current.width
    ? `<iframe `
    +   `src="${current.src}" `
    +   `width="${current.width}" `
    +   `height="${current.height}" `
    +   `frameborder="0" `
    +   `style="border:0;" `
    +   `allowfullscreen="" `
    +   `aria-hidden="false" `
    +   `tabindex="0">`
    + `</iframe>`
    : '';

  const [value, setValue] = useState(currentValue);
  const [error, setError] = useState('');

  return (
    <ContentConsumer>
      {({updateContent}) => {
        const handleSubmit = (src, height, width) => {
          setError('');
          updateContent({
            src: src,
            height: height,
            width: width,
          }, index);
          showPreview();
        };

        const checkIframeValidity = (iframe) => {
          const src = iframe.getAttribute('src');
          try {
            new URL(src);
          }
          catch {
            return setError('Invalid iframe source');
          }
          const url = new URL(src);
          if (!url.href.includes('google.com/maps/embed')) {
            return setError('Not a Google Map embed iframe')
          }
          const height = iframe.getAttribute('height') || defaultHeight;
          const width = iframe.getAttribute('width') || defaultWidth;
          handleSubmit(src, height, width);
        };

        const parseDOM = value => {
          try {
            const dom = new DOMParser();
            dom.parseFromString(`${value}`, 'text/xml');
          }
          catch {
            return setError('Invalid DOM');
          }
          const dom = new DOMParser();
          const doc = dom.parseFromString(`${value}`, 'text/xml');
          const iframe = doc.querySelector('iframe');
          if (!iframe) {
            return setError('iframe missing');
          }
          checkIframeValidity(iframe);
        };

        return <Form
            onSubmit={() => parseDOM(value)}
            style={style.form}
          >
            <TextField
              id="embed"
              htmlFor="embed"
              name="embed"
              labelText="Embedded Google Map iframe"
              helpText='On Google Map click on the "Share" button, "Embed a map" tab, copy the HTML and paste it here'
              validationMessage={error}
              required
              onChange={e => setValue(e.currentTarget.value)}
              textInputProps={{
                placeholder: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9712.434682839385!2d13.4128447!3d52.5133724!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3ad3d77fa4426465!2sHolidayPirates%20GmbH!5e0!3m2!1sen!2sfr!4v1599033816790!5m2!1sen!2sfr" width="400" height="300" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>'
              }}
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