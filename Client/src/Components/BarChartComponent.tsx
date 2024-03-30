import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import { Container } from "@mui/material";
import { API } from "../Helpers/Api";
const BarChartComponent = () => {
  const [data, setData] = useState([]);
  const [barWidth, setBarWidth] = useState(getInitialBarWidth());

  useEffect(() => {
    const handleResize = () => {
      setBarWidth(getInitialBarWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [barWidth]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/get-page-data`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function getInitialBarWidth() {
    return window.innerWidth >= 1000
      ? 1000
      : window.innerWidth < 1000 && window.innerWidth >756
      ? 350
      : window.innerWidth - 100;
  }

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <BarChart
        width={barWidth}
        height={300}
        data={data}
        margin={{
          top: 25,
          right: 10,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="pageName" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="pageViews" fill="#8884d8" name="Page Views" />
        <Bar dataKey="avgTimeOnPage" fill="#82ca9d" name="Avg Time on Page" />
      </BarChart>
    </Container>
  );
};

export default BarChartComponent;
