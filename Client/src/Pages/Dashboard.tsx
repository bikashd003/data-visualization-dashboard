import { lazy,Suspense } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
const LineChart = lazy(() => import('../Components/LineChart'));

const BarChartComponent = lazy(() => import('../Components/BarChartComponent'));
const PieChart = lazy(() => import('../Components/PieChart')); 

import Box from '@mui/material/Box';
import PersistentDrawerLeft from "../Components/PersistantDrawer"
const Dashboard = () => {

  return (
    <>
 <Box sx={{ display: 'flex' }}>
    <PersistentDrawerLeft />
      <Grid container spacing={2} padding={4} marginTop={5} >
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
      </Grid>
      </Box>
    </>
  );
};

export default Dashboard;