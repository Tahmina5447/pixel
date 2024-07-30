import axios from "axios";
import React, { useEffect, useState } from "react";
import server_url from "../../../../lib/config";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const OrderChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server_url}/order`); // Replace with your API endpoint for fetching order data
        const orders = response.data.data.result;

        const orderCounts = orders.reduce((acc, order) => {
          const date = new Date(order.date);
          const formattedDate = `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`;
          if (acc[formattedDate]) {
            acc[formattedDate] += 1;
          } else {
            acc[formattedDate] = 1;
          }
          return acc;
        }, {});

        const dates = Object.keys(orderCounts);
        const counts = Object.values(orderCounts);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: "Orders",
              data: counts,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="p-3 md:p-8 rounded-md bg-white shadow-md h-full">
      <h2 className="text-2xl font-bold mb-5">Order Graph</h2>
      {chartData && <Line options={options} data={chartData} />}
    </div>
  );
};

export default OrderChart;
