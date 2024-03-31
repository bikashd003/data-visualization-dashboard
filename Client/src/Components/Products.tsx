import { useEffect, useContext } from "react";
import { DataContext } from "../Context/ContextStore";
import Navbar from "./Navbar";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Stack,
  Rating,
  Alert,
  Snackbar,
} from "@mui/material";
import { API } from "../Helpers/Api";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Cards from "./Cards";
import EditModal from "./EditModal";
import FilterProduct from "./FilterProduct";

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  rating: number;
}
const Products: React.FC = () => {
  const {
    open,
    setOpen,
    rows,
    setRows,
    page,
    setPage,
    perPage,
    totalPages,
    setTotalPages,
    setAnchorEl,
    snackbarOpen,
    setSnackbarOpen,
    setSelectedRow,
    sortingCriteria,
    setOpenModal,
    success,setTotalProducts,setTopThreeProducts
  } = useContext(DataContext)!;

  const handleMenuClick = () => {
    setOpen(!open);
  };

  const fetchProductsData = async () => {
    try {
      const response = await axios.get(`${API}/get-products`, {
        params: {
          page,
          limit: perPage,
          sortBy: sortingCriteria,
        },
      });
      setRows(response.data.products);
      setTotalPages(response.data.totalPages);
      setTotalProducts(response.data.totalProducts)
      setTopThreeProducts(response.data.topThreeRatingProducts)
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  };
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditRow = (row: Product) => {
    setSelectedRow(row);
    setOpenModal(true);
    handleCloseMenu();
  };

  const handleDeleteRow = async (id: string) => {
    await axios
      .delete(`${API}/delete-product/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    handleCloseMenu();
  };

  useEffect(() => {
    fetchProductsData();
  }, [page, success, sortingCriteria]);
  return (
    <>
      <Navbar onMenuClick={handleMenuClick} />
      <div style={{ padding: "1vw", margin: "2vw" }}>
        <Cards />
        <div
          style={{
            marginTop: "1.5vw"
          }}
        >
          <FilterProduct />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{backgroundColor:"gray"}}>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Ratings</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: Product, id: number) => (
                  <TableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.brand}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.stock}</TableCell>
                    <TableCell>
                      <Rating
                        name="simple-controlled"
                        value={row.rating}
                        precision={0.5}
                      />
                    </TableCell>
                    <TableCell>
                      <span
                        style={{ color: "green", cursor: "pointer" }}
                        onClick={() => handleEditRow(row)}
                      >
                        <EditIcon />
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleDeleteRow(row._id)}
                      >
                        <DeleteIcon />
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Stack
              spacing={2}
              sx={{ justifyContent: "center", padding: "1rem" }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </TableContainer>
        </div>
        <EditModal />
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          severity="success"
          onClose={() => setSnackbarOpen(false)}
          variant="filled"
          sx={{ width: "100%" }}
        >
          Product update successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default Products;
