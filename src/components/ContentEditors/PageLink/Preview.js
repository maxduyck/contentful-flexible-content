import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Paragraph, Spinner } from '@contentful/forma-36-react-components';
import { ContentConsumer } from '../../ContentContext';
import { style } from './style';

const Consumed = ({current, sdk}) => {
  const [page, setPage] = useState(null);

  const getPage = async () => {
    const page = await Promise.resolve(sdk.space.getEntry(current.entry));
    setPage({
      title: page.fields.title[sdk.locales.default],
      slug: page.fields.slug[sdk.locales.default],
    });
  };

  useEffect(() => {
    getPage();
  }, []);

  return page
    ? <>
      <Paragraph><b>Title: </b>{page.title}</Paragraph>
      <Paragraph><b>Slug: </b>{page.slug}</Paragraph>
      </>
    : <Spinner size="small" />
}

const Preview = ({current}) => (
  <ContentConsumer>
    {({sdk}) => <Consumed
      current={current}
      sdk={sdk}
    />}
  </ContentConsumer>
);

Preview.propTypes = {
  current: PropTypes.object.isRequired,
};

export default Preview;