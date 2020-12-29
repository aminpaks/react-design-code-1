import dayjs from 'dayjs';
import { FC } from 'react';
import Plot from 'react-plotly.js';
import { DateRange } from '../../types';

export const HistoryChart: FC<
  DateRange & {
    x: string[];
    y: number[];
  }
> = ({ startDate, endDate, x, y }) => {
  // useEffect(() => {
  //   console.log(items);
  //   const chartDiv = document.getElementById('chart');
  //   if (items?.length > 0) {
  //     console.log(items);
  //     Plotly.newPlot(
  //       chartDiv,
  //       [
  //         {
  //           x: items.map((v: any) => v.date),
  //           y: items.map((v: any) => v.cash),
  //           type: 'scatter',
  //           mode: 'markers',
  //         },
  //       ],
  //       {
  //         // title: "A Fancy Plot",
  //         height: '100%',
  //         xaxis: {
  //           type: 'date',
  //           range: [startDate, endDate],
  //         },
  //       },
  //       {
  //         responsive: true,
  //       },
  //     );
  //   }
  // }, [startDate, endDate, items]);

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
            range: [
              dayjs(startDate).add(-1, 'month').toISOString(),
              dayjs(endDate).add(1, 'month').toISOString(),
            ],
          },
        }}
      />
    </div>
  );
};
