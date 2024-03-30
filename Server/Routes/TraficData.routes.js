import express from 'express';
import { saveTrafficData, getAllTrafficData,saveDeviceType,getDeviceType,savePageData,getPageData } from '../Controllers/WebsiteData.controller.js';

const TraficRouter = express.Router();

// Save traffic data
TraficRouter.post('/save-traffic-data', saveTrafficData);

// Get all traffic data
TraficRouter.post('/get-traffic-data', getAllTrafficData);


// Save device type
TraficRouter.post('/save-device-type', saveDeviceType);
// get device type
TraficRouter.get('/get-device-type', getDeviceType);




// save page type
TraficRouter.post('/save-page-data', savePageData);
// get page type
TraficRouter.get('/get-page-data', getPageData);

export default TraficRouter;