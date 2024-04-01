import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { DataContext, DataContextType } from "../Context/ContextStore";
import { API } from "../Helpers/Api";
import axios from "axios";
import StarRateSharpIcon from "@mui/icons-material/StarRateSharp";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import InventoryIcon from "@mui/icons-material/Inventory";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  rating: number;
}

const EditModal: React.FC = () => {
  const context = useContext(DataContext) as DataContextType;
  const { selectedRow, openModal, setOpenModal, setSnackbarOpen, setSuccess } =
    context;
  const [editedRow, setEditedRow] = useState<Product | null>(null);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    if (selectedRow) {
      setEditedRow(selectedRow);
    }
  }, [selectedRow]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedRow) return;
    const { name, value } = e.target;
    setEditedRow({ ...editedRow, [name]: value });
  };

  const handleUpdate = async () => {
    if (!editedRow) return;
    try {
     await axios.put(`${API}/update-product/${selectedRow?._id}`, editedRow,{ headers: { Authorization: `${sessionStorage.getItem("token")}` } });
      setSnackbarOpen(true);
      setSuccess(true);
      handleClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ mb: 2, color: "primary.main" }}
          >
            Edit Product
          </Typography>
          {editedRow && (
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Product Name"
                name="name"
                value={editedRow.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ProductionQuantityLimitsIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Brand"
                name="brand"
                value={editedRow.brand}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BrandingWatermarkIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                value={editedRow.price.toString()}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Stock"
                name="stock"
                type="number"
                value={editedRow.stock.toString()}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InventoryIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Rating"
                name="rating"
                type="number"
                value={editedRow.rating.toString()}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <StarRateSharpIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                  startIcon={<SaveAltIcon />}
                >
                  Update
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default EditModal;
