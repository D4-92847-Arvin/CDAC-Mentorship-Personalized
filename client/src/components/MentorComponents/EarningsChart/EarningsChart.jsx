import { Bar } from "react-chartjs-2";
import "./EarningsChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function EarningsChart({ showBadge = true }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#374151',
        bodyColor: '#0d9488',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `amount : ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          color: '#9ca3af'
        }
      },
      y: {
        grid: {
          color: '#f3f4f6',
          drawBorder: false
        },
        border: {
          display: false
        },
        ticks: {
          color: '#9ca3af',
          stepSize: 1500
        },
        min: 0,
        max: 6000
      }
    }
  };

  const data = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [{
      data: [2200, 3000, 2800, 3900, 3200, 4200],
      backgroundColor: "#0d9488",
      borderRadius: 6,
      barThickness: 40
    }]
  };

  return (
    <div className="earnings-chart-wrapper">
      {showBadge && (
        <span className="chart-badge">Last 6 Months</span>
      )}
      <div className="earnings-chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default EarningsChart;
