import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { locations } from 'contentful-ui-extensions-sdk';
import arrayMove from 'array-move';

const ContentContext = createContext(null);
const useContent = () => useContext(ContentContext);

const ContentProvider = ({sdk, hasSections, children}) => {

  if (!sdk.location.is(locations.LOCATION_ENTRY_FIELD)) {
    return null;
  }

  const [content, setContent] = useState(sdk.field.getValue() || []);
  
  const onContentChange = content => {
    content && setContent(content);
  };

  useEffect(() => {
    const contentChangeHandler = sdk.field.onValueChanged(onContentChange);
    return contentChangeHandler;
  }, []);

  return (
    <ContentContext.Provider value={{
      sdk,
      content,

      addElement: (elementKey, {section, row, column}) => {
        const newContent = content;
        if (hasSections) {
          newContent[section].rows[row].columns[column].element = elementKey;
        } else {
          newContent[row].columns[column].element = elementKey;
        }
        sdk.field.setValue(newContent);
      },

      addRow: ({section}, columnsCount) => {
        let newContent = content;
        const newRow = {
          columns: [],
          contentfulTabOpen: true,
        };
        for (let i = 0; i < columnsCount; i++) {
          newRow.columns[i] = {
            element: null,
            value: null,
          };
        }
        if (hasSections) {
          newContent[section].rows = [
            ...content[section].rows,
            newRow,
          ];
        } else {
          newContent = [
            ...content,
            newRow,
          ];
        }
        sdk.field.setValue(newContent);
      },

      addSection: (title, anchor) => {
        const newSection = {
          title: title,
          anchor: anchor,
          rows: [],
          contentfulTabOpen: true,
        };
        const newContent = [ ...content, newSection];
        sdk.field.setValue(newContent);
      },

      deleteElement: ({section, row, column}) => {
        const newContent = content;
        if (hasSections) {
          newContent[section].rows[row].columns[column].element = null;
          newContent[section].rows[row].columns[column].value = null;
        } else {
          newContent[row].columns[column].element = null;
          newContent[row].columns[column].value = null;
        }
        sdk.field.setValue(newContent);
      },

      deleteRow: ({section, row}) => {
        const rows = hasSections ? content[section].rows : content;
        const newRows = rows.filter((item, i) => i !== row);
        const newContent = content;
        if (hasSections) {
          newContent[section].rows = newRows;
        } else {
          newContent = newRows;
        }
        sdk.field.setValue(newContent);
      },

      deleteSection: index => {
        const newContent = content.filter((item, i) => i !== index);
        sdk.field.setValue(newContent);
      },

      openExtension: (element, current, callback) => {
        sdk.dialogs.openExtension({
          id: element.Editor,
          title: element.label,
          shouldCloseOnOverlayClick: true,
          shouldCloseOnEscapePress: true,
          parameters: {
            current: current,
          },
        }).then(callback)
      },

      sortColumns: (oldIndex, newIndex, {section, row}) => {
        const rowColumns = hasSections
          ? content[section].rows[row].columns
          : content[row].columns;
        const newContent = content;
        if (hasSections) {
          newContent[section].rows[row].columns = arrayMove(rowColumns, oldIndex, newIndex);
        } else {
          newContent[row].columns = arrayMove(rowColumns, oldIndex, newIndex);
        }
        sdk.field.setValue(newContent);
      },

      sortRows: (oldIndex, newIndex, section) => {
        const newContent = content;
        if (hasSections) {
          newContent[section].rows = arrayMove(content[section].rows, oldIndex, newIndex);
        } else {
          newContent = arrayMove(content, oldIndex, newIndex);
        }
        sdk.field.setValue(newContent);
      },

      sortSections: (oldIndex, newIndex) => {
        const newContent = arrayMove(content, oldIndex, newIndex);
        sdk.field.setValue(newContent);
      },

      toggleColumn: ({section, row, column}, state) => {
        const newContent = content;
        if (hasSections) {
          newContent[section].rows[row].columns[column].contentfulTabOpen = state;
        } else {
          newContent[row].columns[column].contentfulTabOpen = state;
        }
        sdk.field.setValue(newContent);
      },

      toggleRow: ({section, row}, state) => {
        const newContent = content;
        if (hasSections) {
          newContent[section].rows[row].contentfulTabOpen = state;
        } else {
          newContent[row].contentfulTabOpen = state;
        }
        sdk.field.setValue(newContent);
      },

      toggleSection: (section, state) => {
        const newContent = content;
        newContent[section].contentfulTabOpen = state;
        sdk.field.setValue(newContent);
      },

      updateContent: (value, {section, row, column}) => {
        const newContent = content;
        if (hasSections) {
          newContent[section].rows[row].columns[column].value = value;
        } else {
          newContent[row].columns[column].value = value;
        }
        sdk.field.setValue(newContent);
      },

      updateSection: (title, anchor, index) => {
        const newContent = content;
        newContent[index].title = title;
        newContent[index].anchor = anchor;
        sdk.field.setValue(newContent);
      },
      
    }}>
      {children}
    </ContentContext.Provider>
  );
};

const ContentConsumer = ContentContext.Consumer;

export {
  ContentConsumer,
  ContentProvider,
  useContent,
};
