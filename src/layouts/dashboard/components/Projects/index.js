import { Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const REACT_APP_BACKEND_API_ENDPOINT = process.env.REACT_APP_BACKEND_API_ENDPOINT;

function Projects() {
  const jwtToken = sessionStorage.getItem("jwtToken");
  const [topProductMonth, setTopProductMonth] = useState([]);

  useEffect(() => {
    const fetchRevenue = async () => {
      if (!jwtToken) {
        return;
      } else {
        try {
          const response = await axios.get(
            `${REACT_APP_BACKEND_API_ENDPOINT}/api/manager/revenue`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          setTopProductMonth(response.data.top_products?.top_10_products_month || []);
        } catch (error) {}
      }
    };
    fetchRevenue();
  }, [jwtToken]);

  const chartData = {
    labels: topProductMonth.map((item) => item.product_name),
    datasets: [
      {
        label: "",
        data: topProductMonth.map((item) => item.total_quantity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 71, 0.6)",
          "rgba(139, 69, 19, 0.6)",
          "rgba(0, 255, 255, 0.6)",
          "rgba(255, 165, 0, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 71, 1)",
          "rgba(139, 69, 19, 1)",
          "rgba(0, 255, 255, 1)",
          "rgba(255, 165, 0, 1)",
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 71, 1)",
          "rgba(139, 69, 19, 1)",
          "rgba(0, 255, 255, 1)",
          "rgba(255, 165, 0, 1)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      tooltip: {
        callbacks: {
          enabled: false,
          label: function (tooltipItem) {
            return "$" + tooltipItem.raw.toLocaleString("en-US");
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "$" + value.toLocaleString("en-US");
          },
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: false,
        },
      },
      x: {
        ticks: {
          color: "#F5F5F5",
          callback: function (value, index) {
            return index + 1;
          },
        },
        grid: {
          color: "#F5F5F5",
          drawBorder: false,
          drawOnChartArea: false,
          display: false,
        },
      },
    },
  };

  return (
    <div
      style={{
        marginTop: "75px",
        position: "relative",
        width: "100%",
        height: "360px",
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
        borderRadius: "15px",
        boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          width: "90%",
          height: "85%",
          padding: "20px",
          background: "#4C585B",
          borderRadius: "12px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
          position: "absolute",
          top: "28%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.05)",
          zIndex: 2,
        }}
      >
        <Bar data={chartData} options={options} />
      </div>
      <div style={{ marginTop: "280px", width: "100%", marginLeft: "35px" }}>
        <p style={{ color: "#333", fontWeight: "bold", fontSize: "0.85em" }}>
          <strong>Top 10</strong> best-selling products of the month
        </p>
        <p style={{ color: "#73777B", fontWeight: "150", fontSize: "0.7em" }}></p>
        <Divider />
      </div>
    </div>
  );
}

export default Projects;
