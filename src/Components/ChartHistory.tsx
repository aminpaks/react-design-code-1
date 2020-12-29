import { useEffect } from 'react';

declare const Plotly: any;

export default function ChartHistory({ startDate, endDate, items }: any) {
  useEffect(() => {
    console.log(items);
    const chartDiv = document.getElementById('chart');
    if (items?.length > 0) {
      console.log(items);
      Plotly.newPlot(
        chartDiv,
        [
          {
            x: items.map((v: any) => v.date),
            y: items.map((v: any) => v.cash),
            type: 'scatter',
            mode: 'markers',
          },
        ],
        {
          // title: "A Fancy Plot",
          height: '100%',
          xaxis: {
            type: 'date',
            range: [startDate, endDate],
          },
        },
        {
          responsive: true,
        },
      );
    }
  }, [startDate, endDate, items]);

  return (
    <div>
      <div id="chart" />
    </div>
  );
}
