import React from 'react';
import PropTypes from 'prop-types';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { ContentConsumer } from '../../contexts/ContentContext';
import Body from './Body';
import Head from './Head';
import { style } from './style';

const Section = ({
  dragHandleComponent,
  index,
}) => (
  <ContentConsumer>
    {({sdk, content, deleteSection, toggleSection}) => {
      const section = content[index];

      let elCount = 0;
      for (let row of section.rows) {
        for (let column of row.columns) {
          if (column.element && column.value) {
            elCount++;
          }
        }
      }

      return (
        <div css={style.section}>
          <Head
            anchor={section.anchor}
            deleteSection={deleteSection}
            dragHandleComponent={dragHandleComponent}
            elementCount={elCount}
            index={index}
            isOpen={section.contentfulTabOpen}
            sdk={sdk}
            toggleSection={toggleSection}
            title={section.title}
          />
          <Body
            index={index}
            isOpen={section.contentfulTabOpen}
          />
        </div>
      );
    }}
  </ContentConsumer>
);

Section.propTypes = {
  dragHandleComponent: PropTypes.node,
  index: PropTypes.number.isRequired,
};

export default Section;
