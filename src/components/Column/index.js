import React from 'react';
import PropTypes from 'prop-types';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { SectionHeading } from '@contentful/forma-36-react-components';
// import { ColumnForm } from 'components';
import ColumnForm from '../ColumnForm/index';
import EditorBuilder from '../EditorBuilder/index';
import { ContentConsumer, useConfig } from '../../contexts/index';
// import { elements } from '../ContentEditors/index';
import { style } from './style';

const Column = ({
  dragHandleComponent,
  index,
  singleColumn = false,
}) => {
  const { section, row, column } = index;
  const { elements, hasSections } = useConfig();

  return (
    <div css={style.column}>
      {!singleColumn && (
        <div css={style.head}>
          {dragHandleComponent}
          <SectionHeading css={style.headline}>
            Column {column + 1}
          </SectionHeading>
        </div>
      )}
      <ContentConsumer>
        {({content}) => {
          const root = hasSections ? content[section].rows : content;
          const current = root[row].columns[column].value;
          const columnCount = root[row].columns.length;
          const elementKey = root[row].columns[column].element;
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
    section: PropTypes.number,
  }).isRequired,
};

export default Column;
