'use client';

import { useState, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { AppContext } from '@/contexts/AppContext';
import { TodoItem } from '@/components/common/ToDoItem';
import { Header } from '@/components/common/Header';
import { Plus } from 'lucide-react';

export const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const { auth } = useContext(AuthContext);
  const { state, dispatch, t } = useContext(AppContext);

  const filteredTodos = state.todos.filter(todo => {
    switch (state.filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const activeTodosCount = state.todos.filter(todo => !todo.completed).length;

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() && auth.user) {
      dispatch({
        type: 'ADD_TODO',
        payload: { text: newTodo.trim(), userId: auth.user.id }
      });
      setNewTodo('');
    }
  };

  return (
    <div className={`min-h-screen ${state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* SSR Demo Info */}
        <div className={`mb-6 p-4 rounded-lg ${
          state.theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-blue-50 text-blue-700'
        }`}>
          <p className="text-sm">
            {t('serverRendered')}: {new Date().toLocaleTimeString()}
          </p>
        </div>

        {/* Add Todo Form */}
        <div>
          <div className="flex space-x-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder={t('addTodo')}
              className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                state.theme === 'dark' 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={handleAddTodo}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>{t('addButton')}</span>
            </button>
          </div>
        </div>

        {/* Filters */}
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

        {/* Todo Items */}
        <div className="space-y-2">
          {filteredTodos.length === 0 ? (
            <div className={`text-center py-12 ${
              state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <p className="text-lg">{t('noTodos')}</p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          )}
        </div>

        {/* Clear Completed */}
        {state.todos.some(todo => todo.completed) && (
          <div className="mt-6 text-center">
            <button
              onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
              className="px-4 py-2 text-red-600 hover:text-red-700 font-medium"
            >
              Clear Completed
            </button>
          </div>
        )}
      </main>
    </div>
  );
};