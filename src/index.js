import React, { useEffect } from 'react';
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
  useEffect(() => {
    sdk.window.startAutoResizer();
  }, []);

  return (
    <ConfigProvider
      columnsPerRow={columnsPerRow}
      elements={elements}
    >
      <ContentProvider
        sdk={sdk}
        hasSections={hasSections}
      >
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
