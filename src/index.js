import React, { useEffect } from 'react';
import { locations } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import RowForm from './components/RowForm/index';
import SectionForm from './components/SectionForm/index';
import SortableRows from './components/SortableRows/index';
import SortableSections from './components/SortableSections/index';
import { ConfigProvider, ContentProvider } from './contexts/index';
// import './index.css';

const ContentfulFlexibleContent = ({
  columnsPerRow = [ 2 ],
  elements,
  sdk,
  hasSections = false,
}) => {
  if (!sdk.location.is(locations.LOCATION_ENTRY_FIELD)) {
    return null;
  }

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, []);

  return (
    <ConfigProvider
      columnsPerRow={columnsPerRow}
      elements={elements}
      hasSections={hasSections}
    >
      <ContentProvider sdk={sdk}>
        {hasSections
          ? <>
              <SortableSections />
              <SectionForm />
            </>
          : <>
              <SortableRows />
              <RowForm />
            </>}
      </ContentProvider>
    </ConfigProvider>
  );
};

export default ContentfulFlexibleContent;
