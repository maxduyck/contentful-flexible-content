import React from 'react';
import PropTypes from 'prop-types';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import Body from './Body';
import Head from './Head';
import { ContentConsumer, useConfig } from '../../contexts/index';
import { style } from './style';

const Row = ({
  dragHandleComponent,
  columns,
  index,
}) => {
  const { section, row } = index;
  const { hasSections } = useConfig();

  return (
    <ContentConsumer>
      {({sdk, content, deleteRow, toggleRow}) => {
        const root = hasSections ? content[section].rows : content;
        const isOpen = root[row].contentfulTabOpen;

        return (
          <div css={style.row}>
            <Head
              dragHandleComponent={dragHandleComponent}
              columns={columns}
              deleteRow={deleteRow}
              index={index}
              isOpen={isOpen}
              sdk={sdk}
              toggleRow={toggleRow}
            />
            <Body
              columns={columns}
              index={index}
              isOpen={isOpen}
            />
          </div>
        );
      }}
    </ContentConsumer>
  );
};

Row.propTypes = {
  dragHandleComponent: PropTypes.node,
  columns: PropTypes.array.isRequired,
  index: PropTypes.shape({
    row: PropTypes.number.isRequired,
    section: PropTypes.number,
  }).isRequired,
};

export default Row;
