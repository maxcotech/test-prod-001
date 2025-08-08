import React, { createContext, useCallback, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState({});


  const fetchItems = useCallback(async (loader, query = {limit: 10, skip: 0 }) => {
    try {
      const controller = new AbortController()
      loader?.(true);
      const res = await fetch(`http://localhost:4001/api/items?limit=${query.limit}&skip=${query.skip}${(query.q)?`&q=${query.q}`:""}`, { signal: controller.signal }); // Intentional bug: backend ignores limit
      const json = await res.json();
      setItems(json);
      return () => {
        controller.abort()
      };
    }
    catch (e) {
      console.error(e);
      return null;
    }
    finally {
      loader?.(false)
    }

  }, []);

  return (
    <DataContext.Provider value={{ items, fetchItems }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);