import React from 'react';
import PropTypes from 'prop-types';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import Collapse from '@kunukn/react-collapse';
import Column from '../Column/index';
import SortableColumns from '../SortableColumns/index';
import { useConfig } from '../../contexts/ConfigContext';
import { style } from './style';

const Body = React.memo(({
  columns,
  index,
  isOpen,
}) => {
  const { section, row } = index;
  const { elements } = useConfig();

  const rowElements = [];
  for (const column of columns) {
    const element = elements.find(item => item.key === column.element);
    if (element) {
      rowElements.push(element.label);
    }
  }

  return (
    <Collapse
      isOpen={isOpen}
      transition="height 0.2s cubic-bezier(.4, 0, .2, 1)"
    >
      <div css={style.body}>
        {columns.length === 1 && (
          <Column
            index={{
              section,
              row,
              column: 0,
            }}
            singleColumn
          />
        )}
        {columns.length > 1 && <SortableColumns index={index} />}
      </div>
    </Collapse>
  );
});

Body.propTypes = {
  columns: PropTypes.array.isRequired,
  index: PropTypes.shape({
    row: PropTypes.number.isRequired,
    section: PropTypes.number,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Body;
