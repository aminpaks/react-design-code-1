import dayjs from 'dayjs';
import { IData, mockSales } from './mock-data';

function filterFakeResponse(startDate: string, endDate: string): IData {
  const result = {
    ...mockSales,
    items: mockSales.items.filter(({ date }) => {
      const d = dayjs(date);
      return d.isAfter(startDate) && d.isBefore(endDate);
    }),
  };
  return result;
}

function delay(milliseconds = 1000) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export const getSales = (startDate: string, endDate: string) => {
  console.log('API fetching...');
  return delay().then(() => filterFakeResponse(startDate, endDate));
};
