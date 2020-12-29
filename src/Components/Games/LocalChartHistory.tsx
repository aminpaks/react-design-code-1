import dayjs from 'dayjs';
import { FC } from 'react';
import { useQuery } from 'react-query';

// import ChartHistory from '../ChartHistory';
import { tryCatch } from '../../Utils';
import { getSales, IData } from '../../api';
import { DateState, UpdateStatePartially } from './Context';

export const LocalChartHistory: FC<
  {
    updateState: UpdateStatePartially;
  } & DateState
> = ({ startDate, endDate, apiStartDate = startDate, apiEndDate = endDate, updateState }) => {
  // Queries
  const { data, isLoading } = useQuery(
    ['sales', apiStartDate, apiEndDate],
    async (): Promise<IData> => {
      const d = await getSales(apiStartDate, apiEndDate);
      const oldData = tryCatch(() => data, { items: [], currency: '' } as IData);

      return {
        ...oldData,
        ...d,
        items: [...oldData.items, ...d.items],
      };
    },
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div>
        <div>Start date: {dayjs(startDate).toString()}</div>
        <div>End date: {dayjs(endDate).toString()}</div>
      </div>
      {/* <ChartHistory items={data?.items} startDate={startDate} endDate={endDate} /> */}

      <button
        onClick={() => {
          const updatedStartDate = dayjs(startDate).add(-180, 'day').toISOString();

          updateState({ startDate: updatedStartDate });
        }}
      >
        add past 6 months
      </button>
    </div>
  );
};
