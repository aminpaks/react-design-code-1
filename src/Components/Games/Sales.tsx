import { FC } from 'react';
import { useSaleState } from './Context';
import { LocalChartHistory } from './LocalChartHistory';

const Sales: FC = () => {
  const [state, updateState] = useSaleState();
  const { startDate, endDate } = state;
  console.log('Render Games/Sales', startDate, endDate);
  return (
    <div>
      <h1>Sales</h1>
      <hr />
      <LocalChartHistory {...state} updateState={updateState} />
    </div>
  );
};

export default Sales;
