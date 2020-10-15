import React from 'react';
import PropTypes from 'prop-types';
import { SectionHeading } from '@contentful/forma-36-react-components';
import { ColumnForm } from 'components';
import { EditorBuilder } from 'components';
import { useConfig, ContentConsumer } from 'contexts';
// import { elements } from '../ContentEditors/index';
import { style } from './style';

const Column = ({dragHandleComponent, index}) => {
  const { section, row, column } = index;
  const { elements } = useConfig();

  return (
    <div style={style.column}>
      <div style={style.head}>
        {dragHandleComponent}
        <SectionHeading style={style.headline}>
          Column {column + 1}
        </SectionHeading>
      </div>
      <ContentConsumer>
        {({content}) => {
          const current = content[section].rows[row].columns[column].value;
          const columnCount = content[section].rows[row].columns.length;
          const elementKey = content[section].rows[row].columns[column].element;
          const element = (elementKey !== null)
            && elements.find(item => item.key === elementKey);

          return element
            ? <EditorBuilder
                current={current}
                element={element}
                index={index}
              />
            : <ColumnForm index={index} columnCount={columnCount} />;
        }}
      </ContentConsumer>
    </div>
  );
};

Column.propTypes = {
  index: PropTypes.shape({
    column: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    section: PropTypes.number.isRequired,
  }).isRequired,
};

export default Column;