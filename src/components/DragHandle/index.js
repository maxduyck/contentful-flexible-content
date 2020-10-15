import React, { useState } from 'react';
import { Icon } from '@contentful/forma-36-react-components';
import { SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => {
  const [isHover, setHover] = useState(false);

  return (
    <Icon
      icon="Drag"
      color="muted"
      style={{
        background: isHover ? '#d3dce0' : 'transparent',
        boxSizing: 'border-box',
        cursor: 'grab',
        height: '100%',
        padding: 6,
        position: 'absolute',
        top: 0,
        transition: 'background .2s ease-in-out',
        width: 30,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
});

export default DragHandle;