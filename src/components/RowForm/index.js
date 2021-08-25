import React, { useState } from 'react';
import PropTypes from 'prop-types';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import {
  Button,
  Form,
  Option,
  Select,
} from '@contentful/forma-36-react-components';
import { useConfig } from '../../contexts/ConfigContext';
import { ContentConsumer } from '../../contexts/ContentContext';
import { style } from './style';

const RowForm = ({
  sectionIndex,
}) => {
  const [columns, setColumns] = useState('1');
  const { columnsPerRow } = useConfig();

  return (
    <ContentConsumer>
      {({addRow}) => (
        <Form
          css={style.form}
          onSubmit={() => addRow({section: sectionIndex}, columns)}
        >
          <Select
            css={style.select}
            name="columns"
            onChange={e => setColumns(e.currentTarget.value)}
            value={columns}
            width="medium"
          >
            {columnsPerRow && columnsPerRow.map(n => (
              <Option key={n} value={n.toString()}>{n} column{n > 1 ? 's' : ''}</Option>
            ))}
          </Select>
          <Button
            buttonType="positive"
            css={style.button}
            icon="EmbeddedEntryBlock"
            type="submit"
          >
            Create new row
          </Button>
        </Form>
      )}
    </ContentConsumer>
  );
};

RowForm.propTypes = {
  sectionIndex: PropTypes.number,
};

export default RowForm;
