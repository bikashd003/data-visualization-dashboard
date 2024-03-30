import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { API } from "../Helpers/Api";
import axios from "axios";
const PieChart = () => {
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const fetchData = async () => {
    await axios
      .get(`${API}/get-device-type`)
      .then((res) => {
        setLabels(res.data.map((item: any) => item.deviceType));
        setChartData(res.data.map((item: any) => item.visitors));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 2)",
          "rgba(54, 162, 235, 2)",
          "rgba(255, 206, 86, 2)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
     <div style={{ display: "flex", justifyContent: "center", height: "40vh" }}>
      <Chart type="pie" data={data} />
    </div>
    </>
  );
};

export default PieChart;
