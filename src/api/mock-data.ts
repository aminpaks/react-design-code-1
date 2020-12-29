import dayjs from 'dayjs';

const todayDate = dayjs().startOf('day');

export interface IData {
  items: { id: string; date: string; cash: string; nb: number }[];
  currency: string;
}

export const mockSales: IData = {
  items: [
    {
      id: '1000',
      date: '2020-01-01',
      cash: '1532',
      nb: 30,
    },
    {
      id: '1001',
      date: '2020-02-01',
      cash: '1688',
      nb: 10,
    },
    {
      id: '1002',
      date: '2020-03-01',
      cash: '120',
      nb: 3,
    },
    {
      id: '1003',
      date: todayDate.add(-5, 'day').format('YYYY-MM-DD'),
      cash: '320',
      nb: 13,
    },
    {
      id: '1004',
      date: todayDate.add(-2, 'month').format('YYYY-MM-DD'),
      cash: '420',
      nb: 11,
    },
  ],
  currency: 'US$',
};

export const mockConferences = {
  items: [
    {
      date: '2020-05-01',
      cash: '1532',
      nb: 30,
    },
    {
      date: '2020-07-10',
      cash: '150',
      nb: 1,
    },
  ],
  currency: 'US$',
};
