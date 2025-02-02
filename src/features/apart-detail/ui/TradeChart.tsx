import { FC, useEffect, useRef } from "react";

import { GetApartResponseTradeItem } from "@/entities/apart";

import { useTradeChart } from "../hooks/useTradeChart";
import { createChart } from "../services/chart";
import Box from "./Box";
import css from "./TradeChart.module.css";

interface TradeChartProps {
  tradeItems: GetApartResponseTradeItem[];
}

const TradeChart: FC<TradeChartProps> = ({ tradeItems }) => {
  const beforeChartData = useRef<{ months: string[]; tradeAmounts: number[] }>({ months: [], tradeAmounts: [] });
  const chartData = useTradeChart({ tradeItems });

  useEffect(() => {
    if (beforeChartData.current === chartData) {
      return;
    }

    if (chartData.months.length > 0 && chartData.tradeAmounts.length > 0) {
      createChart("trade-chart", { labels: chartData.months, data: chartData.tradeAmounts });
    }

    beforeChartData.current = chartData;
  }, [chartData]);

  return (
    <Box title="월별 실거래가(단위: 백만원)" className={css.tradeChart}>
      <div className={css.chartWrap}>
        <canvas id="trade-chart" />
      </div>
    </Box>
  );
};

export default TradeChart;
