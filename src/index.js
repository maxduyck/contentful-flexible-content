import React, { useEffect } from 'react';
import '@contentful/forma-36-react-components/dist/styles.css';
import { SectionForm, SortableSections } from 'components';
import { ConfigProvider, ContentProvider } from 'contexts';
// import './index.css';

const ContentfulFlexibleContent = ({
  columnsPerRow,
  elements,
  sdk,
}) => {
  useEffect(() => {
    sdk.window.startAutoResizer();
  }, []);

  return (
    <ConfigProvider
    columnsPerRow={columnsPerRow}
      elements={elements}
    >
      <ContentProvider sdk={sdk}>
        <SortableSections />
        <SectionForm />
      </ContentProvider>
    </ConfigProvider>
  );
};

export default ContentfulFlexibleContent;
