import TrafficData from '../Models/TraficData.models.js';
import deviceTypeModels from "../Models/DeviceType.models.js"
import Page from "../Models/PageData.models.js"


//these saveTrafficData,saveDeviceType,savePageData constoller is used for only adding dummy data
//in real time we will use postman for adding data in database.
//we will use this controller for adding data in database for testing purpose.
const saveTrafficData = async (req, res) => {
    try {
        const { date, pageViews, uniqueVisitors, sessions } = req.body;
        const newTrafficData = new TrafficData({ date, pageViews, uniqueVisitors, sessions });
        const savedTrafficData = await newTrafficData.save();
        res.status(201).json(savedTrafficData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const saveDeviceType = async (req, res) => {
    try {
        const { deviceType, visitors } = req.body;
        const newDeviceType = new deviceTypeModels({ deviceType, visitors })
        const savedDeviceType = await newDeviceType.save();
        res.status(201).json(savedDeviceType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}
const savePageData = async (req, res) => {
    try {
        const { pageName, pageViews, avgTimeOnPage } = req.body;
        const newPageData = new Page({ pageName, pageViews, avgTimeOnPage })
        const savedPageData = await newPageData.save();
        res.status(201).json(savedPageData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}





/*
**************************************************
**************************************************
**************************************************
*/

//these getAllTrafficData,getDeviceType,getPageData constoller is used for only getting dummy data

const getAllTrafficData = async (req, res) => {
    try {
        const { year } = req.body;
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31`);
        const trafficData = await TrafficData.find({ date: { $gte: startDate, $lte: endDate } });
        res.status(200).json(trafficData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getDeviceType = async (req, res) => {
    try {
        const deviceType = await deviceTypeModels.find();
        res.status(201).json(deviceType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}
const getPageData = async (req, res) => {
    try {
        const deviceType = await Page.find();
        res.status(201).json(deviceType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}
export { saveTrafficData, getAllTrafficData, saveDeviceType, getDeviceType, savePageData, getPageData };