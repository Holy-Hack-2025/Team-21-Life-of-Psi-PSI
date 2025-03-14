import React, { useEffect, useState } from 'react';
import {
  Line,
  Radar,
  Bar,
  Bubble,
  Doughnut,
  PolarArea,
  Scatter,
  Pie,
} from "react-chartjs-2";
import { Chart, CategoryScale } from "chart.js/auto";

// Register the category scale for Chart.js
Chart.register(CategoryScale);

// Define a generic type for the dashboard data
type DashboardData = Record<string, any>;

const Dashboard = () => {
  // Initial state for snapshot data (if needed)
  const [snapshotData, setSnapshotData] = useState<DashboardData | null>(null);
  // State for real-time data simulation
  const [realtimeData, setRealtimeData] = useState<DashboardData>({
    temperature: Array(10).fill(0),
    polarData: Array(5).fill(0),
    cost: Array(7).fill(0)
  });

  // 1. Fetch snapshot data once on mount (if required)
  useEffect(() => {
    fetch('http://localhost:8000/process_data')
      .then((response) => response.json())
      .then((data: DashboardData) => {
        console.log('Snapshot data:', data);
        setSnapshotData(data);
      })
      .catch((error) => {
        console.error('Error fetching snapshot data:', error);
      });
  }, []);

  // 2. Simulate real-time data using a sine function
  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      // Generate temperature data (10 points) using sine wave oscillation.
      const newTemperature = Array.from({ length: 10 }, (_, index) =>
        Math.sin(angle + index * 0.5) * 10 + 50  // oscillates between ~40 and ~60
      );

      // Generate polarData (5 points)
      const newPolarData = Array.from({ length: 5 }, (_, index) =>
        Math.sin(angle + index) * 5 + 20  // oscillates between ~15 and ~25
      );

      // Generate cost data (7 points)
      const newCost = Array.from({ length: 7 }, (_, index) =>
        Math.sin(angle + index * 0.3) * 2 + 10  // oscillates between ~8 and ~12
      );

      // Update the realtimeData state
      setRealtimeData({
        temperature: newTemperature,
        polarData: newPolarData,
        cost: newCost
      });

      angle += 0.1;
    }, 1000); // update every 1 second

    return () => clearInterval(interval);
  }, []);

  // Chart data definitions based on realtimeData
  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Temperature",
        data: realtimeData.temperature,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Temperature (copy)",
        data: realtimeData.temperature,
      },
    ],
  };

  const radarData = {
    labels: [
      "Coke Ovens",
      "Blast Furnace",
      "Stoves",
      "Sinter Plant",
      "Lime Plant",
      "Bos",
      "Power Plant",
      "Oxygen Plant",
      "Blowers",
      "Stover",
    ],
    datasets: [
      {
        label: "Temperature",
        data: realtimeData.temperature,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        label: "Cost per €100,000",
        data: realtimeData.cost,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const polarData = {
    labels: [
      "Cog Flow",
      "BF Temperature",
      "Fuel Gas Flow",
      "Sinter Output",
      "Lime Plant",
    ],
    datasets: [
      {
        label: "",
        data: realtimeData.polarData,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };

  const bubbleData = {
    datasets: [
      {
        label: "First Dataset",
        data: [
          { x: 20, y: 30, r: 15 },
          { x: 40, y: 10, r: 10 },
        ],
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return (
    <div>
      <h1 className="ml-10 mt-10 mb-5 text-3xl font-semibold">Dashboard</h1>
      <p className="ml-10">Visualise all current running processes</p>

      <div className="flex">
        <div className="w-[40%] h-[40%] p-10 m-auto">
          <Line datasetIdKey="234fs32" data={lineChartData} />
        </div>
        <div className="p-10 m-auto w-[40%] h-[40%]">
          <Radar data={radarData} />
        </div>
      </div>
      <div className="flex">
        <div className="p-10 m-auto w-[40%] h-[40%]">
          <Bar data={barData} />
        </div>
        <div className="p-10 m-auto w-[40%] h-[40%]">
          <PolarArea data={polarData} />
        </div>
      </div>
      <div className="flex">
        <div className="p-10 m-auto w-[40%] h-[40%]">
          <Doughnut data={barData} />
        </div>
        <div className="p-10 m-auto w-[40%] h-[40%]">
          <Bubble data={bubbleData} />
        </div>
      </div>
      <div className="flex">
        <div className="p-10 m-auto w-[40%] h-[40%]">
          <Scatter data={barData} />
        </div>
        <div className="p-10 m-auto w-[40%] h-[40%]">
          <Pie data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
