import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Heading, Icon, Paragraph } from '@contentful/forma-36-react-components';
import { DeleteButton, SectionForm } from 'components';
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
      style={style.head}
      onClick={() => toggleSection(index, !isOpen)}
    >
      {dragHandleComponent}
      <Icon
        color="secondary"
        icon="ArrowDown"
        style={{
          ...style.arrow,
          transform: `rotate(${isOpen ? '0' : '-90deg'})`,
        }}
      />
      {!isEdit
        ? <>
          <div style={style.headText}>
            <Heading style={style.title}>{title}</Heading>
            <Paragraph style={style.anchor}>#{anchor}</Paragraph>
          </div>
          <Button
            icon="Edit"
            type="submit"
            onClick={e => {
              e.stopPropagation();
              setEdit(true);
            }}
            style={style.button}
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