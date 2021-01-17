import React, { createContext, useContext } from 'react';

const ConfigContext = createContext(null);
const useConfig = () => useContext(ConfigContext);

const ConfigProvider = ({
  children,
  columnsPerRow,
  elements,
  hasSections,
}) => {
  const columnsPerRowLimited = columnsPerRow.filter(item => item <= 6);
  console.log('config hasSections', hasSections);
  return (
    <ConfigContext.Provider value={{
      columnsPerRow: [...new Set(columnsPerRowLimited)],
      elements,
      hasSections,
    }}>
      {children}
    </ConfigContext.Provider>
  );
};

const ConfigConsumer = ConfigContext.Consumer;

export {
  ConfigConsumer,
  ConfigProvider,
  useConfig,
};
