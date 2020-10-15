import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import { Button, Subheading } from '@contentful/forma-36-react-components';
import { ContentConsumer } from 'contexts';
import { DeleteButton } from 'components';
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
        <div style={style.head}>
          <Subheading style={style.element}>{label}</Subheading>
          <div style={style.btnGroup}>
            {isExtension
              ? <Button
                  icon="Edit"
                  onClick={() => openExtension(
                    element,
                    current,
                    data => data && updateContent(data, index),
                  )}
                  size="small"
                  style={style.button}
                />
              : isEditing
                ? (Preview && current) && <Button
                    buttonType="muted"
                    icon="Close"
                    onClick={() => setEditing(false)}
                    size="small"
                    style={style.button}
                  />
                : <Button
                    icon="Edit"
                    onClick={() => setEditing(true)}
                    size="small"
                    style={style.button}
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
          ? <Editor index={index} current={current} showPreview={() => setEditing(false)} />
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
    section: PropTypes.number.isRequired,
  }).isRequired,
};

export default EditorBuilder;