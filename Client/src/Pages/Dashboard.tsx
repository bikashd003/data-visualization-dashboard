import { lazy, Suspense, useContext } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
const LineChart = lazy(() => import("../Components/LineChart"));

const BarChartComponent = lazy(() => import("../Components/BarChartComponent"));
const PieChart = lazy(() => import("../Components/PieChart"));
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Navbar from "../Components/Navbar";
import { DataContext } from "../Context/ContextStore";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";


const drawerWidth = 200;
const Dashboard = () => {
  const { open, setOpen } = useContext(DataContext)!;

  const handleMenuClick = () => {
    setOpen(!open);
  };
  const handleItemClick = () => {
    setOpen(false);
  }
  return (
    <>
      <Navbar onMenuClick={handleMenuClick} />
      <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
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
      <List sx={{padding:"1vw"}}>
        {['Dashboard', 'Analytics', 'Settings'].map((text) => (
          <ListItem
            key={text}
            sx={{
              cursor: 'pointer',
              borderRadius:"50px",
              '&:hover': {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
            onClick={handleItemClick}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
      <Grid container spacing={2} paddingLeft={4} paddingRight={4} paddingTop={2}>
        <Grid item xs={12} md={6} lg={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              User Traffic
            </Typography>
            <Suspense fallback={<div>Loading...</div>}>
              <LineChart />
            </Suspense>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Device Breakdown
            </Typography>
            <Suspense fallback={<div>Loading...</div>}>
              <PieChart />
            </Suspense>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top Pages by Views
            </Typography>
            <Suspense fallback={<div>Loading...</div>}>
              <BarChartComponent />
            </Suspense>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
