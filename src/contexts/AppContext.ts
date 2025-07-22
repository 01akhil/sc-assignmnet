import { createContext } from 'react';
import { AppState } from '../lib/constants/types';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<any>;
  t: (key: string) => string;
}

export const AppContext = createContext<AppContextType>({
  state: { todos: [], filter: 'all', theme: 'light', locale: 'en' },
  dispatch: () => {},
  t: (key) => key
});