import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { googleLogout } from "@react-oauth/google";
import { DataContext } from "../Context/ContextStore";
import { useNavigate } from "react-router-dom";

const drawerWidth = 200;

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { open, setOpen, selectedItem, setSelectedItem } =
    useContext(DataContext)!;
  const navigate = useNavigate();
  const handleItemClick = (text: string) => {
    setSelectedItem(text);
    setOpen(false);
    if (text === "Dashboard") {
      navigate("/dashboard");
    }
    if (text === "Products") {
      navigate("/products");
    }
  };
  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    googleLogout();
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {selectedItem === "Dashboard" ? "Dashboard" : "Products"}
          </Typography>
          <div style={{ marginLeft: "auto" }}>
            <IconButton
              color="inherit"
              aria-label="account"
              aria-controls="avatar-menu"
              aria-haspopup="true"
              onClick={handleAvatarClick}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="avatar-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "#2E2559",
            width: drawerWidth,
            color: "#fff",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <List sx={{ padding: "1vw" }}>
          {["Dashboard", "Products"].map((text) => (
            <ListItem
              key={text}
              sx={{
                cursor: "pointer",
                marginBottom: "5px",
                borderRadius: "50px",
                "&:hover": {
                  backgroundColor: "#504973",
                },
                backgroundColor:
                  selectedItem === text ? "#504973" : "transparent",
              }}
              onClick={() => handleItemClick(text)}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
