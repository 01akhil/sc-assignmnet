export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  theme: 'light' | 'dark';
  locale: 'en' | 'es' | 'fr'|'hi';
}

export type AppAction = 
  | { type: 'ADD_TODO'; payload: { text: string; userId: string } }
  | { type: 'UPDATE_TODO'; payload: { id: string; text: string } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LOCALE'; payload: 'en' | 'es' | 'fr' |'hi'}
  | { type: 'LOAD_TODOS'; payload: Todo[] }
  | { type: 'CLEAR_COMPLETED' };