import React, { useState } from "react";
import { watchlist } from "../data/data";
import BuyActionWindow from "./BuyActionWindow";
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz } from "@mui/icons-material";
import { Tooltip, Grow } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const WatchList = () => {
  const [popup, setPopup] = useState({ type: null, uid: null });
  const [showChart, setShowChart] = useState(true);

  const showPopup = (type, uid) => {
    setPopup({ type, uid });
  };

  const closePopup = () => {
    setPopup({ type: null, uid: null });
  };

  // Prepare chart data for watchlist prices
  const priceChartData = {
    labels: watchlist.map(stock => stock.name),
    datasets: [
      {
        label: 'Price (₹)',
        data: watchlist.map(stock => stock.price),
        borderColor: 'rgb(56, 126, 209)',
        backgroundColor: 'rgba(56, 126, 209, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Prepare chart data for percentage change
  const percentChartData = {
    labels: watchlist.map(stock => stock.name),
    datasets: [
      {
        label: 'Change (%)',
        data: watchlist.map(stock => parseFloat(stock.percent.replace('%', ''))),
        backgroundColor: watchlist.map(stock => 
          stock.isDown ? 'rgba(220, 53, 69, 0.8)' : 'rgba(40, 167, 69, 0.8)'
        ),
        borderColor: watchlist.map(stock => 
          stock.isDown ? 'rgba(220, 53, 69, 1)' : 'rgba(40, 167, 69, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        borderColor: '#387ed1',
        borderWidth: 2,
        callbacks: {
          label: function(context) {
            if (context.dataset.label === 'Price (₹)') {
              return 'Price: ₹' + context.parsed.y.toLocaleString('en-IN', { maximumFractionDigits: 2 });
            } else {
              return 'Change: ' + context.parsed.y.toFixed(2) + '%';
            }
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: '600',
          },
          color: '#6c757d',
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: '600',
          },
          color: '#6c757d',
          callback: function(value) {
            if (value >= 1000) {
              return '₹' + (value / 1000).toFixed(1) + 'k';
            }
            return '₹' + value;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        backgroundColor: '#387ed1',
        borderColor: '#ffffff',
        borderWidth: 2,
      },
      line: {
        borderWidth: 3,
        tension: 0.4,
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        borderColor: '#387ed1',
        borderWidth: 2,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            const color = value >= 0 ? '#28a745' : '#dc3545';
            return 'Change: ' + value.toFixed(2) + '%';
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: '600',
          },
          color: '#6c757d',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: '600',
          },
          color: '#6c757d',
          callback: function(value) {
            return value.toFixed(2) + '%';
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 6,
        borderSkipped: false,
      },
    },
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search eg: infy, bse, gold mcx"
          className="search"
        />
        <span className="counts" style={{
          fontSize: "0.75rem",
          color: "#6c757d",
          fontWeight: "600",
          whiteSpace: "nowrap",
          background: "#ffffff",
          padding: "6px 12px",
          borderRadius: "8px",
          border: "1px solid #e9ecef"
        }}>
          {watchlist.length} / 50
        </span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => (
          <li key={index}>
            <div className="item">
              <p style={{ 
                color: stock.isDown ? "#dc3545" : "#28a745",
                fontWeight: "700",
                fontSize: "0.95rem"
              }}>
                {stock.name}
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <Tooltip title="Buy" placement="top" arrow TransitionComponent={Grow}>
                  <button
                    onClick={() => showPopup("buy", stock.name)}
                    style={{ 
                      background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                      color: "white",
                      padding: "8px 18px",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #218838 0%, #1aa179 100%)";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(40, 167, 69, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #28a745 0%, #20c997 100%)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    Buy
                  </button>
                </Tooltip>
                <Tooltip title="Sell" placement="top" arrow TransitionComponent={Grow}>
                  <button
                    onClick={() => showPopup("sell", stock.name)}
                    style={{ 
                      background: "linear-gradient(135deg, #dc3545 0%, #e83e8c 100%)",
                      color: "white",
                      padding: "8px 18px",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #c82333 0%, #d91a72 100%)";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(220, 53, 69, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #dc3545 0%, #e83e8c 100%)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    Sell
                  </button>
                </Tooltip>
              </div>
            </div>

            {popup.uid === stock.name && popup.type && (
              <BuyActionWindow type={popup.type} uid={popup.uid} onClose={closePopup} />
            )}
          </li>
        ))}
      </ul>

      {/* Chart Toggle Button */}
      <div className="watchlist-chart-header">
        <h4 className="watchlist-chart-title">Watchlist Charts</h4>
        <button
          onClick={() => setShowChart(!showChart)}
          className="watchlist-chart-toggle"
        >
          {showChart ? 'Hide' : 'Show'} Charts
        </button>
      </div>

      {/* Charts Section */}
      {showChart && (
        <div className="watchlist-charts-wrapper">
          <div className="watchlist-chart-card">
            <h5 className="watchlist-chart-card-title">Price Trend</h5>
            <div className="watchlist-chart-container">
              <Line data={priceChartData} options={chartOptions} />
            </div>
          </div>
          <div className="watchlist-chart-card">
            <h5 className="watchlist-chart-card-title">Daily Change (%)</h5>
            <div className="watchlist-chart-container">
              <Bar data={percentChartData} options={barChartOptions} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchList;
