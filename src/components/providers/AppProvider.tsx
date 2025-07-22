'use client';

import { useState, useEffect, useReducer, useCallback, useContext } from 'react';
import { AppContext } from '@/contexts/AppContext';
import { AuthContext } from '@/contexts/AuthContext';
import { AppState, AppAction } from '@/lib/constants/types';
import { appReducer } from '@/lib/reducers/appReducer';
import { translations } from '@/lib/constants/translations';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, {
    todos: [],
    filter: 'all',
    theme: 'light',
    locale: 'en'
  });

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    const savedLocale = localStorage.getItem('locale') as 'en' | 'es' | 'fr' || 'en';

    if (savedTodos.length > 0) {
      dispatch({ type: 'LOAD_TODOS', payload: savedTodos });
    }
    dispatch({ type: 'SET_THEME', payload: savedTheme });
    dispatch({ type: 'SET_LOCALE', payload: savedLocale });
  }, [auth.user]);

  useEffect(() => {
    if (auth.user) {
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  }, [state.todos, auth.user]);

  useEffect(() => {
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem('locale', state.locale);
  }, [state.locale]);

//   const t = useCallback((key: string): string => {
//     return translations[state.locale][key] || key;
//   }, [state.locale]);

const t = useCallback((key: string): string => {
  return (translations[state.locale] as Record<string, string>)[key] || key;
}, [state.locale]);

  return (
    <AppContext.Provider value={{ state, dispatch, t }}>
      {children}
    </AppContext.Provider>
  );
};