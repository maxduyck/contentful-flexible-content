import React from 'react';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { Icon } from '@contentful/forma-36-react-components';
import { SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => (
  <Icon
    icon="Drag"
    color="muted"
    css={{
      background: 'transparent',
      boxSizing: 'border-box',
      cursor: 'grab',
      height: '100%',
      padding: 6,
      position: 'absolute',
      top: 0,
      transition: 'background .2s ease-in-out',
      width: 30,

      '&:hover': {
        background: '#d3dce0',
      }
    }}
  />
));

export default DragHandle;
