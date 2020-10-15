import React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@kunukn/react-collapse';
import { RowForm, SortableRows } from 'components';
import { style } from './style';

const Body = React.memo(({
  index,
  isOpen,
}) => (
  <Collapse
    isOpen={isOpen}
    transition="height 0.2s cubic-bezier(.4, 0, .2, 1)"
  >
    <div style={style.body}>
      <SortableRows sectionIndex={index} />
      <RowForm sectionIndex={index} />
    </div>
  </Collapse>
));

Body.propTypes = {
  index: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Body;