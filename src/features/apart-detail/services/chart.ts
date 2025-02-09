import {
  CategoryScale,
  Chart,
  ChartConfiguration,
  ChartItem,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Tooltip);

const createChartContext = (elementId: string): ChartItem | null => {
  const chartContainer = document.getElementById(elementId) as HTMLCanvasElement | null;

  if (!chartContainer) {
    return null;
  }

  return chartContainer.getContext("2d");
};

const createChartConfig = ({ labels, data }: { labels: string[]; data: number[] }): ChartConfiguration => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        borderColor: "#6366f1",
        backgroundColor: "#6366f1",
        borderWidth: 2,
        pointRadius: 2,
        tension: 0.1,
      },
    ],
  };

  return {
    type: "line",
    data: chartData,
    options: {
      responsive: true,
      interaction: {
        mode: "nearest",
        intersect: false,
      },
      plugins: {
        tooltip: { enabled: true },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => (typeof value === "number" ? `${value / 10}억` : value),
            font: { size: 10 },
          },
        },
        x: {
          ticks: {
            font: { size: 10 },
          },
        },
      },
    },
  };
};

export const createChart = (elementId: string, chartData: { labels: string[]; data: number[] }): void => {
  const context = createChartContext(elementId);
  const config = createChartConfig(chartData);

  if (context) {
    new Chart(context, config);
  }
};
