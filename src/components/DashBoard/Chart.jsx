import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useAttendance } from "../../contexts/AttendanceContext";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function DashboardChart() {

  const {earlyGraph, lateGraph, getGraphData} = useAttendance()

  const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "On Time",
        data: earlyGraph,
        backgroundColor: "rgba(60, 179, 113, 0.7)",
      },
      {
        label: "Late",
        data: lateGraph,
        backgroundColor: "rgba(255, 0, 0)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Days",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "No of Employees",
        },
        min: 0,
        max: 60,
      },
    },
  };

  useEffect(()=>{
    getGraphData()
  },[])
  return (
    <div className="bg-white border rounded-xl p-4 w-full lg:w-[80%]">
      <h2 className="font-lexend text-xl mb-4">
        Weekly Attendance Data
      </h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default DashboardChart;
