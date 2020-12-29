const currentMinus2 = new Date();
currentMinus2.setDate(currentMinus2.getDate() - 2);

export interface IData {
  items: { date: string; cash: string; nb: number }[];
  currency: string;
}

export const mockSales: IData = {
  items: [
    {
      date: '2020-01-01',
      cash: '1532',
      nb: 30,
    },
    {
      date: '2020-02-01',
      cash: '1688',
      nb: 10,
    },
    {
      date: '2020-03-01',
      cash: '120',
      nb: 3,
    },
    {
      date: String(currentMinus2),
      cash: '320',
      nb: 13,
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
      date: String(currentMinus2),
      cash: '150',
      nb: 1,
    },
  ],
  currency: 'US$',
};
