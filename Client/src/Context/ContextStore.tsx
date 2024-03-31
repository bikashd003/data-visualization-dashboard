import React, { createContext, useState } from "react";

interface DataContextType {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DataProvider:React.FC = ({ children }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <DataContext.Provider value={{ open, setOpen }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
