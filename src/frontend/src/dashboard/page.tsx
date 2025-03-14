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

Chart.register(CategoryScale);

export const data = {
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
      data: [50, 147, 93, 82, 72, 105, 89, 75, 123, 204],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const labels = ["1", "2", "3", "4", "5", "6", "7"];
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
      data: [11, 16, 7, 3, 14],
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

const barData = {
  labels: labels,
  datasets: [
    {
      label: "Cost per €100,000",
      data: [65, 59, 80, 81, 56, 55, 40],
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

const bubbleData = {
  datasets: [
    {
      label: "First Dataset",
      data: [
        {
          x: 20,
          y: 30,
          r: 15,
        },
        {
          x: 40,
          y: 10,
          r: 10,
        },
      ],
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
};

const Dashboard = () => {
  return (
    <div>
      <h1 className="ml-10 mt-10 mb-5 text-3xl font-semibold">Dashboard</h1>
      <p className="ml-10">Visualise all current running processes</p>

      <div className="flex">
        <div className="w-[40%] h-[40%] p-10 m-auto">
          <Line
            datasetIdKey="234fs32"
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  label: "",
                  data: [5, 6, 7, 2, 1, 4, 9],
                },
                {
                  label: "",
                  data: [1, 3, 9, 3, 8, 7, 2],
                },
              ],
            }}
          />
        </div>
        <div className="p-10 m-auto w-[40%] h-[40%]">
          <Radar data={data}></Radar>
        </div>
      </div>
      <div className="flex">
        <div className="p-10 m-auto w-[40%] h-[40%]">
          <Bar data={barData}></Bar>
        </div>
        <div className="p-10 m-auto w-[40%] h-[40%]">
          <PolarArea data={polarData}></PolarArea>
        </div>
      </div>
      <div className="flex">
        <div className="p-10 m-auto w-[40%] h-[40%]">
          <Doughnut data={barData}></Doughnut>
        </div>
        <div className="p-10 m-auto w-[40%] h-[40%]">
          <Bubble data={bubbleData}></Bubble>
        </div>
      </div>
      <div className="flex">
        <div className="p-10 m-auto w-[40%] h-[40%]">
          <Scatter data={barData}></Scatter>
        </div>
        <div className="p-10 m-auto w-[40%] h-[40%]">
          <Pie data={barData}></Pie>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
