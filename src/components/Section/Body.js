import React from 'react';
import PropTypes from 'prop-types';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import Collapse from '@kunukn/react-collapse';
import RowForm from '../RowForm/index';
import SortableRows from '../SortableRows/index';
import { style } from './style';

const Body = React.memo(({
  index,
  isOpen,
}) => (
  <Collapse
    isOpen={isOpen}
    transition="height 0.2s cubic-bezier(.4, 0, .2, 1)"
  >
    <div css={style.body}>
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
