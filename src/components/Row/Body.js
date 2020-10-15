import React from 'react';
import PropTypes from 'prop-types';
// import { Button, SectionHeading } from '@contentful/forma-36-react-components';
import Collapse from '@kunukn/react-collapse';
// import { elements } from '../ContentEditors/index';
import { Column, SortableColumns } from 'components';
import { useConfig } from 'contexts';
import { style } from './style';

const Body = React.memo(({
  columns,
  index,
  // invertColumns,
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
      <div style={style.body}>
        {columns.length === 1 && (
          <Column index={{
            section: section,
            row: row,
            column: 0,
          }} />
        )}
        {columns.length > 1 && <SortableColumns index={index} />}
        {/*columns.length === 2 && <>
          <Button
            icon="Code"
            onClick={() => invertColumns(index)}
            size="small"
            style={style.invertBtn}
          >
            Invert columns
          </Button>
          <SectionHeading style={style.column}>Left</SectionHeading>
          <Column index={{
            section: section,
            row: row,
            column: 0,
          }} />
          <SectionHeading style={style.column}>Right</SectionHeading>
          <Column index={{
            section: section,
            row: row,
            column: 1,
          }} />
        </>*/}
      </div>
    </Collapse>
  );
});

Body.propTypes = {
  columns: PropTypes.array.isRequired,
  index: PropTypes.shape({
    row: PropTypes.number.isRequired,
    section: PropTypes.number.isRequired,
  }).isRequired,
  invertColumns: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Body;