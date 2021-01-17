import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import arrayMove from 'array-move';
import { useConfig } from './index';
import InitError from '../components/initError/index';

const ContentContext = createContext(null);
const useContent = () => useContext(ContentContext);

const ContentProvider = ({sdk, children}) => {
  const { columnsPerRow, hasSections } = useConfig();

  // const [content, setContent] = useState(sdk.field.getValue() || []);
  // sdk.field.setValue({ content: [] })
  const [value, setValue] = useState(sdk.field.getValue() || { content: [] });
  const [initError, setInitError] = useState(false);
  const [ready, setReady] = useState(false);

  const init = async () => {
    const current = sdk.field.getValue();
    if (!current.config) {
      await sdk.field.setValue({ ...current, config: { columnsPerRow, hasSections }});
      return setReady(true);
    }
    if (current.config.hasSections !== hasSections && current.content.length) {
      setInitError(true);
      return setReady(true);
    }
    await sdk.field.setValue({ ...current, config: { columnsPerRow, hasSections }});
    return setReady(true);
  };

  const resetContent = async () => {
    setReady(false);
    const resetVal = {
      content: [],
      config: { columnsPerRow, hasSections },
    };
    await sdk.field.setValue(resetVal);
    setValue(resetVal);
    setInitError(false);
    return init();
  };
  
  const onValueChange = value => {
    console.log(value);
    value && setValue(value);
  };

  useEffect(() => {
    init();
    const contentChangeHandler = sdk.field.onValueChanged(onValueChange);
    return contentChangeHandler;
  }, []);

  return (
    <ContentContext.Provider value={{
      sdk,
      content: value.content,

      addElement: (elementKey, {section, row, column}) => {
        const newContent = value.content;
        if (hasSections) {
          newContent[section].rows[row].columns[column].element = elementKey;
        } else {
          newContent[row].columns[column].element = elementKey;
        }
        sdk.field.setValue({ ...value, content: newContent });
      },

      addRow: ({section}, columnsCount) => {
        let newContent = value.content;
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
            ...value.content[section].rows,
            newRow,
          ];
        } else {
          newContent = [
            ...value.content,
            newRow,
          ];
        }
        sdk.field.setValue({ ...value, content: newContent });
      },

      addSection: (title, anchor) => {
        const newSection = {
          title: title,
          anchor: anchor,
          rows: [],
          contentfulTabOpen: true,
        };
        const newContent = [ ...value.content, newSection];
        sdk.field.setValue({ ...value, content: newContent });
      },

      deleteElement: ({section, row, column}) => {
        const newContent = value.content;
        if (hasSections) {
          newContent[section].rows[row].columns[column].element = null;
          newContent[section].rows[row].columns[column].value = null;
        } else {
          newContent[row].columns[column].element = null;
          newContent[row].columns[column].value = null;
        }
        sdk.field.setValue({ ...value, content: newContent });
      },

      deleteRow: ({section, row}) => {
        const rows = hasSections ? content[section].rows : content;
        const newRows = rows.filter((item, i) => i !== row);
        const newContent = value.content;
        if (hasSections) {
          newContent[section].rows = newRows;
        } else {
          newContent = newRows;
        }
        sdk.field.setValue({ ...value, content: newContent });
      },

      deleteSection: index => {
        const newContent = value.content.filter((item, i) => i !== index);
        sdk.field.setValue({ ...value, content: newContent });
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
        const newContent = value.content;
        if (hasSections) {
          newContent[section].rows[row].columns = arrayMove(rowColumns, oldIndex, newIndex);
        } else {
          newContent[row].columns = arrayMove(rowColumns, oldIndex, newIndex);
        }
        sdk.field.setValue({ ...value, content: newContent });
      },

      sortRows: (oldIndex, newIndex, section) => {
        const newContent = value.content;
        if (hasSections) {
          newContent[section].rows = arrayMove(content[section].rows, oldIndex, newIndex);
        } else {
          newContent = arrayMove(value.content, oldIndex, newIndex);
        }
        sdk.field.setValue({ ...value, content: newContent });
      },

      sortSections: (oldIndex, newIndex) => {
        const newContent = arrayMove(value.content, oldIndex, newIndex);
        sdk.field.setValue({ ...value, content: newContent });
      },

      toggleColumn: ({section, row, column}, state) => {
        const newContent = value.content;
        if (hasSections) {
          newContent[section].rows[row].columns[column].contentfulTabOpen = state;
        } else {
          newContent[row].columns[column].contentfulTabOpen = state;
        }
        sdk.field.setValue({ ...value, content: newContent });
      },

      toggleRow: ({section, row}, state) => {
        const newContent = value.content;
        if (hasSections) {
          newContent[section].rows[row].contentfulTabOpen = state;
        } else {
          newContent[row].contentfulTabOpen = state;
        }
        sdk.field.setValue({ ...value, content: newContent });
      },

      toggleSection: (section, state) => {
        const newContent = value.content;
        newContent[section].contentfulTabOpen = state;
        sdk.field.setValue({ ...value, content: newContent });
      },

      updateContent: (val, {section, row, column}) => {
        const newContent = value.content;
        if (hasSections) {
          newContent[section].rows[row].columns[column].value = val;
        } else {
          newContent[row].columns[column].value = val;
        }
        sdk.field.setValue({ ...value, content: newContent });
      },

      updateSection: (title, anchor, index) => {
        const newContent = value.content;
        newContent[index].title = title;
        newContent[index].anchor = anchor;
        sdk.field.setValue({ ...value, content: newContent });
      },
      
    }}>
      {ready && !initError && children}
      {ready && initError && <InitError reset={resetContent} />}
    </ContentContext.Provider>
  );
};

const ContentConsumer = ContentContext.Consumer;

export {
  ContentConsumer,
  ContentProvider,
  useContent,
};
