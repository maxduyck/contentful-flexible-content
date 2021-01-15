import React, { useState } from 'react';
import PropTypes from 'prop-types';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import {
  Button,
  Form,
  Notification,
  TextInput,
} from '@contentful/forma-36-react-components';
import slugify from 'slugify';
import { ContentConsumer } from '../../contexts/index';
import { style } from './style';

const SectionForm = ({
  index = null,
  onSubmit,
  presetAnchor,
  presetTitle,
}) => {
  const titleFieldId = 'title-field';

  const [title, setTitle] = useState(presetTitle || '');
  const [anchor, setAnchor] = useState(presetAnchor || '');
  const [titleError, setTitleError] = useState(false);
  const [anchorError, setAnchorError] = useState(false);

  const isEdit = index !== null;

  const getSlug = string => slugify(string, {
    lower: true,
    locale: 'de',
  });

  const suggestAnchor = (title, anchor) => {
    if (anchor !== '') {
      return;
    }
    setAnchor(getSlug(title));
  };

  return (
    <ContentConsumer>
      {({content, addSection, updateSection}) => {
        const handleSubmit = (title, anchor, index, action) => {
          if (!title) {
            return setTitleError(true);
          }
          if (!anchor) {
            return setAnchorError(true);
          }
          const doubleTitle = content.find((section, i) => section.title === title && i !== index);
          if (doubleTitle) {
            setTitleError(true);
            return Notification.error('Section titles must be unique');
          }
          const slug = getSlug(anchor);
          const doubleAnchor = content.find((section, i) => section.anchor === slug && i !== index);
          if (doubleAnchor) {
            setAnchorError(true);
            return Notification.error('Anchors must be unique');
          }
          action(title, slug, index);
          if (onSubmit && typeof onSubmit === 'function') {
            onSubmit();
          }
          if (index !== null) {
            return; 
          }
          setTitle('');
          setAnchor('');
          setTitleError(false);
          setAnchorError(false);
          document.querySelector(`#${titleFieldId}`).focus();
        };

        return (
          <Form
            css={style.form}
            onSubmit={() => handleSubmit(
              title,
              anchor,
              index,
              isEdit ? updateSection : addSection,
            )}
          >
            <TextInput
              css={isEdit ? style.editInput : style.input}
              error={titleError}
              id={isEdit ? '' : titleFieldId}
              onBlur={() => suggestAnchor(title, anchor)}
              onChange={e => setTitle(e.currentTarget.value)}
              onClick={e => e.stopPropagation()}
              placeholder="Section title"
              value={title}
            />
            <TextInput
              css={isEdit ? style.editInput : style.input}
              error={anchorError}
              onChange={e => setAnchor(e.currentTarget.value)}
              onClick={e => e.stopPropagation()}
              placeholder="Anchor"
              value={anchor}
            />
            <Button
              buttonType="positive"
              css={isEdit ? style.editSubmit : {}}
              icon={isEdit ? 'CheckCircle' : 'Plus'}
              onClick={e => e.stopPropagation()}
              type="submit"
            >
              {isEdit ? 'Save' : 'Add section'}
            </Button>
          </Form>
        );
      }}
    </ContentConsumer>
  );
};

SectionForm.propTypes = {
  index: PropTypes.number,
  onSubmit: PropTypes.func,
  presetAnchor: PropTypes.string,
  presetTitle: PropTypes.string,
};

export default SectionForm;
