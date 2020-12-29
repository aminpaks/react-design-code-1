import { IData } from './mock-data';

export const mergeFakeApiResponses = (
  { items: oldItems } = { items: [], currency: '' } as IData
) => ({ items: newItems, ...rest }: IData) => {
  return {
    ...rest,
    items: newItems
      .reduce(
        (acc, item) => {
          const { id: newItemId } = item;
          if (!acc.find(({ id }) => id === newItemId)) {
            acc.push(item);
          }
          return acc;
        },
        [...oldItems]
      )
      .sort(({ date: x }, { date: y }) => String(x).localeCompare(String(y))),
  };
};
