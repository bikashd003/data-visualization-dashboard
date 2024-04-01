import "chart.js/auto";
import { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";
import { API } from "../Helpers/Api";
import { TextField, MenuItem } from "@mui/material";

const LineChart = () => {
  const [labels, setLabels] = useState([]);
  const [pageViews, setPageViews] = useState([]);
  const [uniqueVisitors, setUniqueVisitors] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [year, setYear] = useState(moment(Date.now()).format("YYYY"));

  const fetchData = async () => {
    await axios
      .post(`${API}/get-traffic-data`, { year: year },{ headers: { Authorization: `${sessionStorage.getItem("token")}` }})
      .then((res) => {
        setLabels(res.data.map((item: any) => moment(item.date).format("MMM")));
        setPageViews(res.data.map((item: any) => item.pageViews));
        setUniqueVisitors(res.data.map((item: any) => item.uniqueVisitors));
        setSessions(res.data.map((item: any) => item.sessions));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, [year]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Page views",
        data: pageViews,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Unique visitors",
        data: uniqueVisitors,
        fill: false,
        borderColor: "#742774",
      },
      {
        label: "Sessions",
        data: sessions,
        fill: false,
        borderColor: "#154187",
      },
    ],
  };
  return (
    <>
        <div style={{ display:"flex",flexWrap:"wrap",justifyContent:"space-between" }}>
          <div style={{height: "40vh",flex:"2 0 0"}}>
          <Chart type="line" data={data} />
          </div>
          <div style={{flex:"1 0 0"}}>

          <TextField
          fullWidth
          select
          value={year}
          label="Year"
          onChange={(e) => setYear(e.target.value)}
          margin="normal"
        >
          <MenuItem value="2024">2024</MenuItem>
          <MenuItem value="2023">2023</MenuItem>
        </TextField>
          </div>
        </div>
      
    </>
  );
};

export default LineChart;
