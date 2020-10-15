import React from 'react';
import PropTypes from 'prop-types';
import { ContentConsumer } from 'contexts';
import Body from './Body';
import Head from './Head';
import { style } from './style';

const Row = ({
  dragHandleComponent,
  columns,
  index,
}) => {
  const { section, row } = index;

  return (
    <ContentConsumer>
      {({sdk, content, invertColumns, deleteRow, toggleRow}) => {
        const isOpen = content[section].rows[row].contentfulTabOpen;

        return (
          <div style={style.row}>
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
              invertColumns={invertColumns}
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
    section: PropTypes.number.isRequired,
  }).isRequired,
};

export default Row;