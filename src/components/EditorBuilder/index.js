import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import isEqual from 'react-fast-compare';
import { Button, Subheading } from '@contentful/forma-36-react-components';
import DeleteButton from '../DeleteButton/index';
import { ContentConsumer } from '../../contexts/index';
import { style } from './style';

const MemoPreview = React.memo(({Preview, current}) => Preview
  ? <Preview current={current} />
  : null,
  isEqual,
);

const EditorBuilder = ({current, element, index}) => {
  const {
    Editor,
    label,
    Preview,
  } = element;
  const isExtension = typeof Editor === 'string';
  const [isEditing, setEditing] = useState(!current || !Preview);

  useEffect(() => {
    setEditing(!current || !Preview)
  }, [current, element, index]);

  return (
    <ContentConsumer>
      {({sdk, deleteElement, openExtension, updateContent}) => <>
        <div css={style.head}>
          <Subheading css={style.element}>{label}</Subheading>
          <div css={style.btnGroup}>
            {isExtension
              ? <Button
                  icon="Edit"
                  onClick={() => openExtension(
                    element,
                    current,
                    data => data && updateContent(data, index),
                  )}
                  size="small"
                  css={style.button}
                />
              : isEditing
                ? (Preview && current) && <Button
                    buttonType="muted"
                    css={style.button}
                    icon="Close"
                    onClick={() => setEditing(false)}
                    size="small"
                  />
                : <Button
                    css={style.button}
                    icon="Edit"
                    onClick={() => setEditing(true)}
                    size="small"
                  />}
            <DeleteButton
              onClick={() => {
                sdk.dialogs.openConfirm({
                  title: element.label,
                  message: 'Are you sure you want to delete this element? The data related to this element will be permanently lost.',
                  intent: 'negative',
                  confirmLabel: 'Delete element',
                  cancelLabel: 'Cancel',
                })
                .then(valid => valid && deleteElement(index))
              }}
              size="small"
              style={style.button}
            />
          </div>
        </div>
        {(!isExtension && isEditing)
          ? <Editor
              index={index}
              current={current}
              showPreview={() => setEditing(false)}
              updateContent={updateContent}
              save={value => {
                updateContent(value, index);
                setEditing(false);
              }}
            />
          : current && <MemoPreview Preview={Preview} current={current} />
        }
      </>}
    </ContentConsumer>
  );
};

EditorBuilder.propTypes = {
  current: PropTypes.object,
  element: PropTypes.shape({
    Editor: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
    label: PropTypes.string.isRequired,
    Preview: PropTypes.func,
  }).isRequired,
  index: PropTypes.shape({
    column: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    section: PropTypes.number,
  }).isRequired,
};

export default EditorBuilder;
