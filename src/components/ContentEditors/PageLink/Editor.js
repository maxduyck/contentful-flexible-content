import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { EntityList, EntityListItem, TextLink } from '@contentful/forma-36-react-components';
import { ContentConsumer } from '../../ContentContext';

const Consumed = ({
  current,
  index,
  sdk,
  updateContent,
}) => {
  const [page, setPage] = useState(null);

  const setPageInfo = async entry => {
    const page = await Promise.resolve(sdk.space.getEntry(entry.sys.id));
    setPage({
      title: page.fields.displayName[sdk.locales.default],
      description: page.fields.slug[sdk.locales.default],
      contentType: page.sys.contentType.sys.id,
      thumbnailUrl: 'mainImage' in page.fields
        ? page.fields.mainImage[sdk.locales.default][0].url
        : null,
    })
  };

  useEffect(() => {
    if (current) {
      setPageInfo(current.entry);
    }
  }, []);

  return <>
    {page && <EntityList>
      <EntityListItem
        title={page.title}
        description={page.description}
        contentType={page.contentType}
        thumbnailUrl={page.thumbnailUrl}
      />
    </EntityList>}
    <TextLink
      icon="Link"
      linkType="primary"
      onClick={() => {
        sdk.dialogs.selectSingleEntry({
          contentTypes: [sdk.contentType.sys.id],
        })
        .then(select => {
          setPageInfo(select);
          updateContent({entry: select}, index);
        })
      }}
      style={{marginTop: 10}}
    >
      Select page
    </TextLink>
  </>
};

const Editor = ({current, index, showPreview}) => (
  <ContentConsumer>
    {({sdk, updateContent}) => <Consumed
      current={current}
      index={index}
      sdk={sdk}
      showPreview={showPreview}
      updateContent={updateContent}
    />}
  </ContentConsumer>
);

Editor.propTypes = {
  current: PropTypes.object,
  index: PropTypes.shape({
    column: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    section: PropTypes.number.isRequired,
  }).isRequired,
};

export default Editor;