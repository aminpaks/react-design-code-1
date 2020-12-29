import { useState } from 'react';
import { useQuery } from 'react-query';

import ChartHistory from '../ChartHistory';
import { getSales } from '../../api/fake-api';
import { IData } from '../../api/mock-data';

const last10Days = 10;

function getDefault() {
  let endDate = new Date();
  let startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - last10Days);

  return {
    startDate: startDate,
    endDate: startDate,
  };
}

const initialDates = getDefault();

type RT<T> = T extends (...args: unknown[]) => infer R ? R : T;

const tryCatch = <T extends () => unknown, U>(fn: T, fallback: U): NonNullable<RT<T>> | RT<U> => {
  try {
    return fn() as NonNullable<RT<T>>;
  } catch {
    return typeof fallback === 'function' ? fallback() : fallback;
  }
};

export default function SalesChartHistory() {
  const [state, setDates] = useState(initialDates);
  const { startDate, endDate } = state;
  console.log({ startDate, endDate });

  // Queries
  const { data } = useQuery(
    ['sales', startDate, endDate],
    async (): Promise<IData> => {
      const d = await getSales(startDate, endDate);
      const oldData = tryCatch(() => data, { items: [], currency: '' } as IData);

      return {
        ...oldData,
        ...d,
        items: [...oldData.items, ...d.items],
      };
    },
    {
      suspense: true,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  function addPastData() {
    const endDate_ = new Date(state.startDate);
    const startDate_ = new Date(endDate_);
    startDate_.setDate(startDate_.getDate() - 180);

    setDates((s) => ({
      ...s,
      startDate: startDate_,
      endDate: endDate_,
    }));
  }

  return (
    <div>
      <ChartHistory items={data?.items} startDate={startDate} endDate={endDate} />

      <button onClick={addPastData}>add past 6 months</button>
    </div>
  );
}
