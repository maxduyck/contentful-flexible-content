import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Option,
  Select,
} from '@contentful/forma-36-react-components';
import { useConfig, ContentConsumer } from 'contexts';
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
          onSubmit={() => addRow(sectionIndex, columns)}
          style={style.form}
        >
          <Select
            name="columns"
            onChange={e => setColumns(e.currentTarget.value)}
            style={style.select}
            value={columns}
            width="medium"
          >
            {columnsPerRow && columnsPerRow.map(n => (
              <Option key={n} value={n}>{n} column{n > 1 ? 's' : ''}</Option>
            ))}
          </Select>
          <Button
            buttonType="positive"
            icon="EmbeddedEntryBlock"
            style={style.button}
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
  sectionIndex: PropTypes.number.isRequired,
};

export default RowForm;