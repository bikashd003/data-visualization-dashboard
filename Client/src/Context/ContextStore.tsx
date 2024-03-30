import React, { createContext, useState } from "react";

interface DataContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DataProvider = ({ children }:any) => {
  const [open, setOpen] = useState(false);



  return <DataContext.Provider value={{open,setOpen}}>{children}</DataContext.Provider>;
};

export { DataContext, DataProvider };
