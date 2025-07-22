'use client';

import { useContext } from 'react';
import { AppContext } from '@/contexts/AppContext';

export const TodoFilters = () => {
  const { state, dispatch, t } = useContext(AppContext);

  const activeTodosCount = state.todos.filter(todo => !todo.completed).length;

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-2">
        {(['all', 'active', 'completed'] as const).map(filter => (
          <button
            key={filter}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: filter })}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              state.filter === filter
                ? 'bg-blue-600 text-white'
                : state.theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t(`${filter}Todos`)}
          </button>
        ))}
      </div>

      <div className={`text-sm ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {activeTodosCount} {t('todoStats')}
      </div>
    </div>
  );
};