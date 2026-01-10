import React, { useEffect, useState } from "react";
import apiClient from "../config/axios";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await apiClient.get("/api/holdings");
        setHoldings(res.data);
      } catch (err) {
        console.error("Error fetching holdings:", err);
      }
    };
  
    fetchHoldings();
  }, []);

  // Calculate totals
  const totalInvestment = holdings.reduce((sum, stock) => sum + (stock.avg * stock.qty), 0);
  const totalCurrentValue = holdings.reduce((sum, stock) => sum + (stock.price * stock.qty), 0);
  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercent = totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : 0;

  // Prepare chart data for value distribution (Doughnut)
  const valueDistributionData = {
    labels: holdings.map(stock => stock.name),
    datasets: [
      {
        label: 'Current Value',
        data: holdings.map(stock => stock.price * stock.qty),
        backgroundColor: [
          '#667eea',
          '#764ba2',
          '#f093fb',
          '#f5576c',
          '#4facfe',
          '#00f2fe',
          '#43e97b',
          '#38f9d7',
          '#fa709a',
          '#fee140',
          '#30cfd0',
          '#330867',
          '#a8edea',
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  // Prepare chart data for P&L (Bar Chart)
  const pnlData = {
    labels: holdings.map(stock => stock.name),
    datasets: [
      {
        label: 'P&L (₹)',
        data: holdings.map(stock => {
          const curValue = stock.price * stock.qty;
          return curValue - (stock.avg * stock.qty);
        }),
        backgroundColor: holdings.map(stock => {
          const curValue = stock.price * stock.qty;
          const pnl = curValue - (stock.avg * stock.qty);
          return pnl >= 0 ? 'rgba(40, 167, 69, 0.8)' : 'rgba(220, 53, 69, 0.8)';
        }),
        borderColor: holdings.map(stock => {
          const curValue = stock.price * stock.qty;
          const pnl = curValue - (stock.avg * stock.qty);
          return pnl >= 0 ? 'rgba(40, 167, 69, 1)' : 'rgba(220, 53, 69, 1)';
        }),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += '₹' + context.parsed.toLocaleString('en-IN', { maximumFractionDigits: 2 });
            }
            return label;
          }
        }
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
        callbacks: {
          label: function(context) {
            let label = 'P&L: ';
            if (context.parsed.y !== null) {
              label += '₹' + context.parsed.y.toLocaleString('en-IN', { maximumFractionDigits: 2 });
            }
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + value.toLocaleString('en-IN');
          },
        },
      },
    },
  };

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      {/* Charts Section */}
      <div className="holdings-charts-container">
        <div className="chart-card">
          <h4 className="chart-title">Value Distribution</h4>
          <div className="chart-wrapper">
            <Doughnut data={valueDistributionData} options={chartOptions} />
          </div>
        </div>
        <div className="chart-card">
          <h4 className="chart-title">Profit & Loss</h4>
          <div className="chart-wrapper">
            <Bar data={pnlData} options={barChartOptions} />
          </div>
        </div>
      </div>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {totalCurrentValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 style={{ color: totalPnL >= 0 ? '#28a745' : '#dc3545' }}>
            {totalPnL.toLocaleString('en-IN', { maximumFractionDigits: 2 })} ({totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
