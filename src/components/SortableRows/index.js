
import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { useConfig } from '../../contexts/ConfigContext';
import { ContentConsumer } from '../../contexts/ContentContext';
import DragHandle from '../DragHandle/index';
import Row from '../Row/index';

const SortableRows = ({sectionIndex}) => {
  const { hasSections } = useConfig();

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
      {items && items.map((row, index) => (
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
          list={hasSections ? content[sectionIndex].rows : content}
          sortRows={sortRows}
        />
      )}
    </ContentConsumer>
  );
};

SortableRows.propTypes = {
  sectionIndex: PropTypes.number,
};

export default SortableRows;
