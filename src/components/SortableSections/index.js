import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import DragHandle from '../DragHandle/index';
import Section from '../Section/index';
import { ContentConsumer } from '../../contexts/index';

const SortableSections = () => {
  const shouldMemo = (prev, next) => {
    if (next.list.length !== prev.list.length) {
      return false;
    }
    if (next.list.find((item, i) => item.title !== prev.list[i].title)) {
      return false;
    }
    return true;
  };

  const SortableSection = SortableElement(({value}) => (
    <Section
      key={value}
      index={value}
      dragHandleComponent={<DragHandle />}
    />
  ));
  
  const SectionsList = SortableContainer(({items}) => (
    <div>
      {items && items.map((item, index) => (
        <SortableSection
          key={index}
          index={index}
          value={index}
        />))}
    </div>
  ));

  const MemoizedList = React.memo(({list, sortSections}) => (
    <SectionsList
      axis="y"
      distance={20}
      items={list}
      onSortEnd={({oldIndex, newIndex}) => sortSections(oldIndex, newIndex)}
      useDragHandle
    />
  ), shouldMemo);

  return (
    <ContentConsumer>
      {({content, sortSections}) => (
        <MemoizedList
          list={content}
          sortSections={sortSections}
        />
      )}
    </ContentConsumer>
  );
};

export default SortableSections;
