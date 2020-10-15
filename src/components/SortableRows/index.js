
import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { ContentConsumer } from 'contexts';
import { DragHandle, Row } from 'components';

const SortableRows = ({sectionIndex}) => {
  const shouldMemo = (prev, next) => {
    if (next.list.length !== prev.list.length) {
      return false;
    }
    return false;
  };

  const SortableRow = SortableElement(({value}) => (
    <Row
      key={value.index}
      index={value.index}
      columns={value.columns}
      index={{
        section: sectionIndex,
        row: value.index,
      }}
      dragHandleComponent={<DragHandle />}
    />
  ));
  
  const RowsList = SortableContainer(({items}) => (
    <div>
      {items.map((row, index) => (
        <SortableRow
          key={index}
          index={index}
          value={{columns: row.columns, index: index}}
        />))}
    </div>
  ));

  const MemoizedList = React.memo(({list, sortRows}) => (
    <RowsList
      axis="y"
      distance={10}
      items={list}
      onSortEnd={({oldIndex, newIndex}) => sortRows(oldIndex, newIndex, sectionIndex)}
      useDragHandle
    />
  ), shouldMemo);

  return (
    <ContentConsumer>
      {({content, sortRows}) => (
        <MemoizedList
          list={content[sectionIndex].rows}
          sortRows={sortRows}
        />
      )}
    </ContentConsumer>
  );
};

SortableRows.propTypes = {
  sectionIndex: PropTypes.number.isRequired,
};

export default SortableRows;