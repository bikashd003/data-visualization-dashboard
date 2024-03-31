import { createContext, useState } from "react";

export interface DataContextType {
  open: boolean;
  setOpen: (value: boolean) => void;
  selectedItem: string;
  setSelectedItem: (value: string) => void;
  rows: Product[];
  setRows: (value: Product[]) => void;
  page: number;
  setPage: (value: number) => void;
  perPage: number;
  totalPages: number;
  setTotalPages: (value: number) => void;
  anchorEl: null | HTMLElement;
  setAnchorEl: (value: null | HTMLElement) => void;
  selectedRow: Product | null;
  setSelectedRow: (value: Product | null) => void;
  sortingCriteria: string;
  setSortingCriteria: (value: string) => void;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  snackbarOpen: boolean;
  setSnackbarOpen: (value: boolean) => void;
  success: boolean;
  setSuccess: (value: boolean) => void;
}
interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  rating: number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: any) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [rows, setRows] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Product | null>(null);
  const [sortingCriteria, setSortingCriteria] = useState<string>("relevance");
  const [openModal, setOpenModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <DataContext.Provider
      value={{
        open,
        setOpen,
        selectedItem,
        setSelectedItem,
        rows,
        setRows,
        page,
        setPage,
        perPage,
        totalPages,
        setTotalPages,
        anchorEl,
        setAnchorEl,
        selectedRow,
        setSelectedRow,
        sortingCriteria,
        setSortingCriteria,
        openModal,
        setOpenModal,
        snackbarOpen,
        setSnackbarOpen,
        success, setSuccess
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
