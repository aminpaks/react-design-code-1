import dayjs from 'dayjs';
import { createContext, FC, useCallback, useContext, useState } from 'react';

export interface DateState {
  startDate: string;
  endDate: string;
  apiStartDate?: string;
  apiEndDate?: string;
}
export type UpdateStatePartially = (partialState: Partial<Record<keyof DateState, string>>) => void;
export type StateContextType = [DateState, UpdateStatePartially];

const initialContextValue: StateContextType = [{} as DateState, () => {}];

const SalesContext = createContext(initialContextValue);
const ConferencesContext = createContext(initialContextValue);

const todayDate = dayjs().startOf('day');
const initialDateState: DateState = {
  startDate: todayDate.add(-10, 'day').toISOString(),
  endDate: todayDate.toISOString(),
};

export const SalesStateProvider: FC = ({ children }) => {
  const [state, setState] = useState(initialDateState);
  const updateStatePartially = useCallback(
    (partialState: Partial<Record<keyof DateState, string>>) =>
      setState((s) => {
        return { ...s, ...partialState };
      }),
    []
  );

  return (
    <SalesContext.Provider value={[state, updateStatePartially]}>{children}</SalesContext.Provider>
  );
};

export const useSaleState = () => {
  return useContext(SalesContext);
};

export const useConferencesState = () => {
  return useContext(ConferencesContext);
};
