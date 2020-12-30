import dayjs from 'dayjs';
import { FC, useMemo } from 'react';

import { HistoryChart } from '../Charts';
import { useSalesData } from '../Data';
import { Loading } from '../Loading';
import { DateState, UpdateStatePartially } from './Context';

export const LocalHistoryChart: FC<
  {
    cacheId?: string;
    updateState: UpdateStatePartially;
  } & DateState
> = ({ cacheId = 'simpleCache', startDate, endDate, updateState }) => {
  const { data, isFetching } = useSalesData({ cacheId, startDate, endDate });

  const { dataX, dataY } = useMemo(() => {
    const dataX = data?.items.map(({ date }) => date) ?? [];
    const dataY = data?.items.map(({ cash }) => Number.parseInt(cash, 10)) ?? [];

    return { dataX, dataY };
  }, [data]);

  return (
    <div className="position--relative display--table">
      <Loading visible={isFetching} />
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
