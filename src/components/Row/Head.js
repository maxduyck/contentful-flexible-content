import React from 'react';
import PropTypes from 'prop-types';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import {
  Icon,
  Paragraph,
  Subheading,
} from '@contentful/forma-36-react-components';
import DeleteButton from '../DeleteButton/index';
import { useConfig } from '../../contexts/index';
import { style } from './style';

const Head = React.memo(({
  dragHandleComponent,
  columns,
  deleteRow,
  index,
  isOpen,
  sdk,
  toggleRow,
}) => {
  const { elements } = useConfig();
  const rowElements = [];
  for (const column of columns) {
    const element = elements.find(item => item.key === column.element);
    if (element) {
      rowElements.push(element.label);
    }
  }

  let deleteMsg = 'Are you sure you want to delete this row?';
  if (rowElements.length > 0) {
    deleteMsg += ` By proceeding you will permanently lose following content: ${rowElements.join(', ')}.`;
  }

  return (
    <div
      css={style.head}
      onClick={() => toggleRow(index, !isOpen)}
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
      <div css={style.headText}>
        <Subheading css={style.title}>
          {rowElements.join(' | ')}
        </Subheading>
        <Paragraph css={style.elements}>
          {columns.length} column{columns.length > 1 && 's'}
        </Paragraph>
      </div>
      <DeleteButton
        onClick={e => {
          e.stopPropagation();
          sdk.dialogs.openConfirm({
            title: `Row deletion (${columns.length} column${columns.length > 1 ? 's' : ''})`,
            message: deleteMsg,
            intent: 'negative',
            confirmLabel: 'Delete row',
            cancelLabel: 'Cancel',
          })
          .then(valid => valid && deleteRow(index));
        }}
        size="small"
        style={style.deleteBtn}
      />
    </div>
  );
});

Head.propTypes = {
  dragHandleComponent: PropTypes.node,
  columns: PropTypes.array.isRequired,
  deleteRow: PropTypes.func.isRequired,
  index: PropTypes.shape({
    row: PropTypes.number.isRequired,
    section: PropTypes.number,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  sdk: PropTypes.object.isRequired,
  toggleRow: PropTypes.func.isRequired,
};

export default Head;
