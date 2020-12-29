import dayjs from 'dayjs';
import { FC } from 'react';
import { useQuery } from 'react-query';

import { tryCatch } from '../../Utils';
import { HistoryChart } from '../Charts';
import { getSales, IData } from '../../api';
import { DateState, UpdateStatePartially } from './Context';

export const LocalChartHistory: FC<
  {
    updateState: UpdateStatePartially;
  } & DateState
> = ({ startDate, endDate, apiStartDate = startDate, apiEndDate = endDate, updateState }) => {
  const { data, isLoading } = useQuery(
    ['sales', apiStartDate, apiEndDate],
    async (): Promise<IData> => {
      const d = await getSales(apiStartDate, apiEndDate);
      const oldData = tryCatch(() => data, { items: [], currency: '' } as IData);

      return {
        ...oldData,
        ...d,
        items: d.items
          .reduce(
            (acc, item) => {
              const { id: newItemId } = item;
              if (!acc.find(({ id }) => id === newItemId)) {
                console.log('new item', item);
                acc.push(item);
              }
              return acc;
            },
            [...oldData.items]
          )
          .sort(({ date: x }, { date: y }) => String(x).localeCompare(String(y))),
      };
    },
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div>
        <div>Start date: {dayjs(startDate).toString()}</div>
        <div>End date: {dayjs(endDate).toString()}</div>
      </div>
      <HistoryChart
        startDate={startDate}
        endDate={endDate}
        x={data?.items.map(({ date }) => date) ?? []}
        y={data?.items.map(({ cash }) => Number(cash)) ?? []}
      />

      <button
        onClick={() => {
          const updatedStartDate = dayjs(startDate).add(-6, 'month').toISOString();

          updateState({ startDate: updatedStartDate });
        }}
      >
        add past 6 months
      </button>
    </div>
  );
};
