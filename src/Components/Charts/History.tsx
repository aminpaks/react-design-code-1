import dayjs from 'dayjs';
import { FC, useMemo } from 'react';
import Plot from 'react-plotly.js';

export const HistoryChart: FC<{
  x: string[];
  y: number[];
}> = ({ x, y }) => {
  const xAxisRange = useMemo(() => {
    const first = x[0];
    const last = x[x.length - 1];
    return [dayjs(first).add(-1, 'month').toISOString(), dayjs(last).add(1, 'month').toISOString()];
  }, [x]);

  return (
    <div>
      <Plot
        data={[
          {
            x,
            y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
          { type: 'bar', x, y },
        ]}
        layout={{
          width: 800,
          height: 620,
          title: 'A Fancy Plot',
          xaxis: {
            type: 'date',
            range: xAxisRange,
          },
        }}
      />
    </div>
  );
};
