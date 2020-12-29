import { IData, mockSales } from './mock-data';

function filterFakeResponse(startDate: Date, endDate: Date): IData {
  const result = {
    ...mockSales,
    items: mockSales.items.filter((item) => {
      const d = new Date(item.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start.getTime() <= d.getTime() && d.getTime() <= end.getTime()) {
        return true;
      }

      return false;
    }),
  };
  return result;
}

function delay(milliseconds = 1000) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export const getSales = (startDate: Date, endDate: Date) => {
  return delay().then(() => filterFakeResponse(startDate, endDate));
};
