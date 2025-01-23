import { CategoryScale, Chart, LineController, LineElement, LinearScale, PointElement, Tooltip } from "chart.js";
import { FC, useCallback, useEffect, useRef } from "react";

import { useTradeChart } from "../hooks/useTradeChart";
import Box from "../ui/Box";
import css from "./TradeChart.module.css";

interface TradeChartProps {}

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Tooltip);

const TradeChart: FC<TradeChartProps> = () => {
  const registeredChart = useRef(false);
  const scrollContainer = useRef(null);

  const { months, tradeAmounts } = useTradeChart();

  const createTradeChart = useCallback(() => {
    const ctx = (document.getElementById("trade-chart") as HTMLCanvasElement).getContext("2d");

    if (!ctx || registeredChart.current) {
      return;
    }

    const data = {
      labels: months,
      datasets: [
        {
          data: tradeAmounts,
          borderColor: "#6366f1",
          backgroundColor: "#6366f1",
          borderWidth: 2,
          pointRadius: 2,
          tension: 0.2,
        },
      ],
    };

    const config = {
      type: "line" as const,
      data: data,
      options: {
        responsive: true,
        plugins: {
          tooltip: { enabled: true },
        },
      },
    };

    new Chart(ctx, config);
  }, [months, tradeAmounts]);

  useEffect(() => {
    if (registeredChart.current) {
      setTimeout(() => {
        registeredChart.current = false;
      }, 1000);

      return;
    }

    createTradeChart();

    registeredChart.current = true;
  }, [createTradeChart]);

  return (
    <Box title="실거래가 추이(단위: 백만원)" className={css.tradeChart}>
      <div ref={scrollContainer} className={css.chartWrap}>
        <canvas id="trade-chart" />
      </div>
    </Box>
  );
};

export default TradeChart;
