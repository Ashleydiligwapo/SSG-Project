import { React, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { AbsoluteCenter } from "@chakra-ui/react";
ChartJS.register(ArcElement, Tooltip, Legend);
function ChartData({ data }) {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (data && length > 0) {
      const labels = data.map(() => item.name);
      const values = data.map((item) => item.total);
      //   const quantitynumber = data.map((item) => item.quantity);
      const ctx = document.getElementById("myChart").getContext("2d");
      const newChart = new Chart(ctx, {
        type: "bar", // Replace with desired chart type
        data: {
          labels: labels,
          datasets: [
            {
              label: "Data from MongoDB",
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
      });
      setChart(newChart);
    }
  }, [data]);
  return <canvas id="myChart" width="400" height="400"></canvas>;
}

export default ChartData;
