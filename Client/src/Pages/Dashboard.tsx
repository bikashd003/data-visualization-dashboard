import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LineChart from '../Components/LineChart';
import BarChartComponent from '../Components/BarChartComponent';
import PieChart from '../Components/PieChart';
import Navbar from '../Components/Navbar';
import {Drawer, List, ListItem, ListItemText } from '@mui/material';

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Navbar onMenuClick={handleMenuClick} />
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleMenuClick}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <List>
          <ListItem  key="Dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem  key="Analytics">
            <ListItemText primary="Analytics" />
          </ListItem>
          <ListItem  key="Settings">
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    
      <Grid container spacing={3} >
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              User Traffic
            </Typography>
            <LineChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top Pages by Views
            </Typography>
            <BarChartComponent />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Device Breakdown
            </Typography>
            <PieChart />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;