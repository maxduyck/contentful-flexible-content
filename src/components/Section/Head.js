import React, { useState } from 'react';
import PropTypes from 'prop-types';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { Button, Heading, Icon, Paragraph } from '@contentful/forma-36-react-components';
import DeleteButton from '../DeleteButton/index';
import SectionForm from '../SectionForm/index';
import { style } from './style';

const Head = React.memo(({
  anchor,
  deleteSection,
  dragHandleComponent,
  elementCount,
  index,
  isOpen,
  sdk,
  toggleSection,
  title,
}) => {
  const [isEdit, setEdit] = useState(false);

  let deleteMsg = 'Are you sure you want to permanently delete this section?';
  if (elementCount > 0) {
    deleteMsg += ` This action is not revertible and will cause the loss of ${elementCount} item${elementCount > 1 ? 's' : ''}.`
  }

  return (
    <div
      css={style.head}
      onClick={() => toggleSection(index, !isOpen)}
    >
      {dragHandleComponent}
      <Icon
        color="secondary"
        css={{
          ...style.arrow,
          transform: `rotate(${isOpen ? '0' : '-90deg'})`,
        }}
        icon="ArrowDown"
      />
      {!isEdit
        ? <>
          <div css={style.headText}>
            <Heading css={style.title}>{title}</Heading>
            <Paragraph css={style.anchor}>#{anchor}</Paragraph>
          </div>
          <Button
            icon="Edit"
            css={style.button}
            onClick={e => {
              e.stopPropagation();
              setEdit(true);
            }}
            type="submit"
          />
          </>
        : <SectionForm
            index={index}
            onSubmit={() => setEdit(false)}
            presetTitle={title}
            presetAnchor={anchor}
          />}
      <DeleteButton
        onClick={e => {
          e.stopPropagation();
          sdk.dialogs.openConfirm({
            title: title,
            message: deleteMsg,
            intent: 'negative',
            confirmLabel: 'Delete section',
            cancelLabel: 'Cancel',
          })
          .then(valid => valid && deleteSection(index))
        }}
        style={style.button}
      />
    </div>
  );
});

Head.propTypes = {
  anchor: PropTypes.string.isRequired,
  deleteSection: PropTypes.func.isRequired,
  dragHandleComponent: PropTypes.node,
  elementCount: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  sdk: PropTypes.object.isRequired,
  toggleSection: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Head;
