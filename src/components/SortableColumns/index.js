
import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { ContentConsumer } from 'contexts';
import { DragHandle, Column } from 'components';

const SortableColumns = ({index}) => {
  const { section, row } = index;
  const shouldMemo = (prev, next) => {
    if (next.list.length !== prev.list.length) {
      return false;
    }
    return false;
  };

  const SortableColumn = SortableElement(({value}) => (
    <Column
      key={value.index}
      index={{
        section,
        row,
        column: value.index,
      }}
      dragHandleComponent={<DragHandle />}
    />
  ));
  
  const ColumnsList = SortableContainer(({items}) => (
    <div>
      {items.map((row, index) => (
        <SortableColumn
          key={index}
          index={index}
          value={{columns: row.columns, index: index}}
        />))}
    </div>
  ));

  const MemoizedList = React.memo(({list, sortColumns}) => (
    <ColumnsList
      axis="y"
      distance={10}
      items={list}
      onSortEnd={({oldIndex, newIndex}) => sortColumns(oldIndex, newIndex, index)}
      useDragHandle
    />
  ), shouldMemo);

  return (
    <ContentConsumer>
      {({content, sortColumns}) => (
        <MemoizedList
          list={content[section].rows[row].columns}
          sortColumns={sortColumns}
        />
      )}
    </ContentConsumer>
  );
};

SortableColumns.propTypes = {
  sectionIndex: PropTypes.number.isRequired,
};

export default SortableColumns;