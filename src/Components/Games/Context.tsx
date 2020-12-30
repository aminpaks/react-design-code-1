import dayjs from 'dayjs';
import { createContext, FC, useCallback, useContext, useState } from 'react';
import { createContext as createSimpleContext } from '../CreateContext';

export interface DateState {
  startDate: string;
  endDate: string;
  apiStartDate?: string;
  apiEndDate?: string;
}
export type UpdateStatePartially = (partialState: Partial<Record<keyof DateState, string>>) => void;
export type StateContextType = [DateState, UpdateStatePartially];

const initialContextValue: StateContextType = [{} as DateState, () => {}];

/**
 * Old fashioned low-level React context creation
 */
const SalesContext = createContext(initialContextValue);

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

/**
 * Simplified usage of creating a context
 */
const {
  Provider: ConferencesStateProvider,
  useContext: useConferencesState,
} = createSimpleContext('ConferencesState', { ...initialDateState, isChecked: false });

export { ConferencesStateProvider, useConferencesState };
