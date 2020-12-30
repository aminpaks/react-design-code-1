import { FC } from 'react';
import { useSaleState } from './Context';
import { LocalHistoryChart } from './GamesHistoryChart';

const Sales: FC = () => {
  const [state, updateState] = useSaleState();
  const { startDate, endDate } = state;
  console.log('Render Games/Sales', startDate, endDate);
  return (
    <div>
      <h1>Sales</h1>
      <hr />
      <LocalHistoryChart {...state} updateState={updateState} />
    </div>
  );
};

export default Sales;
