import { useQuery } from 'react-query';
import { getSales, IData } from '../../api';
import { mergeFakeApiResponses } from '../../api';
import { DateRange } from '../../types';
import { tryCatch } from '../../Utils';

export const useSalesData = ({
  cacheId = 'sales',
  startDate,
  endDate,
}: DateRange & { cacheId: string }) => {
  const queryResult = useQuery(
    [cacheId, startDate, endDate],
    (): Promise<IData> =>
      getSales(startDate, endDate).then(
        mergeFakeApiResponses(tryCatch(() => queryResult.data, { items: [], currency: 'CAD' }))
      ),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return queryResult;
};
