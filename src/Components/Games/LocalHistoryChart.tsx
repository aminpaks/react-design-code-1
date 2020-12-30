import dayjs from 'dayjs';
import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';

import { tryCatch } from '../../Utils';
import { HistoryChart } from '../Charts';
import { getSales, IData } from '../../api';
import { DateState, UpdateStatePartially } from './Context';
import { mergeFakeApiResponses } from '../../api/utils';

export const LocalHistoryChart: FC<
  {
    cacheId?: string;
    updateState: UpdateStatePartially;
  } & DateState
> = ({
  cacheId = 'simpleCache',
  startDate,
  endDate,
  apiStartDate = startDate,
  apiEndDate = endDate,
  updateState,
}) => {
  const { data, isFetching } = useQuery(
    [cacheId, apiStartDate, apiEndDate],
    (): Promise<IData> =>
      getSales(apiStartDate, apiEndDate).then(
        mergeFakeApiResponses(tryCatch(() => data, { items: [], currency: '' } as IData))
      ),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const { dataX, dataY } = useMemo(() => {
    const dataX = data?.items.map(({ date }) => date) ?? [];
    const dataY = data?.items.map(({ cash }) => Number.parseInt(cash, 10)) ?? [];

    return { dataX, dataY };
  }, [data]);

  return (
    <div>
      {isFetching && <div>Loading...</div>}
      <div>
        <div>Start date: {dayjs(startDate).format('MMMM DD, YYYY')}</div>
        <div>End date: {dayjs(endDate).format('MMMM DD, YYYY ')}</div>
      </div>
      <HistoryChart x={dataX} y={dataY} />

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
