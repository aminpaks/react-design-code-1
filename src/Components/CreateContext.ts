import {
  createContext as reactCreateContext,
  createElement,
  FC,
  useCallback,
  useContext as reactUseContext,
  useState,
} from 'react';
import produce from 'immer';

export const createContext = <T>(displayName: string, defaultValue: T) => {
  const context = reactCreateContext([
    defaultValue,
    <U extends object>(callback: (state: T & U) => void) => {},
  ] as const);

  const Provider: FC = ({ children }) => {
    const [state, setState] = useState(defaultValue);
    const handleUpdate = useCallback(
      (callback: any) => {
        const updatedState = produce(state, callback);
        if (updatedState !== state) {
          setState(updatedState);
        }
      },
      [state]
    );

    return createElement(context.Provider, { value: [state, handleUpdate] }, children);
  };
  Provider.displayName = displayName;

  const useContext = () => {
    return reactUseContext(context);
  };

  return {
    context,
    Provider,
    useContext,
  };
};
