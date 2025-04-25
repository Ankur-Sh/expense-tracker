import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './Dashboard.css';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale);

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [monthlyData, setMonthlyData] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5001/api/expenses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => setExpenses(res.data))
        .catch(error => console.error("Error fetching expenses:", error));
    }
  }, [token]);

  useEffect(() => {
    const categorySummary = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    setCategoryData(categorySummary);

    const monthlySummary = expenses.reduce((acc, curr) => {
      const month = new Date(curr.date).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + curr.amount;
      return acc;
    }, {});
    setMonthlyData(monthlySummary);
  }, [expenses]);


  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
        hoverOffset: 4,
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Object.values(monthlyData),
        backgroundColor: '#2a9d8f',
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Expenses by Category',
        font: {
          size: 16,
        },
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
      title: {
        display: true,
        text: 'Expenses by Month',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount',
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h2>Expense Dashboard</h2>
      <div className="charts-container">
        <div className="chart-wrapper">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
        <div className="chart-wrapper">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;