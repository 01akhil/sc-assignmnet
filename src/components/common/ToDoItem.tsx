'use client';

import { useState, useContext } from 'react';
import { AppContext } from '@/contexts/AppContext';
import { Todo } from '@/lib/constants/types';
import { Check, Trash2, Edit, Save, X } from 'lucide-react';

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { dispatch, t } = useContext(AppContext);

  const handleSave = () => {
    if (editText.trim()) {
      dispatch({ type: 'UPDATE_TODO', payload: { id: todo.id, text: editText.trim() } });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={`flex items-center space-x-3 p-4 border rounded-lg ${
      todo.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
    }`}>
      <button
        onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        title={t('toggleComplete')}
      >
        {todo.completed && <Check size={16} />}
      </button>

      {isEditing ? (
        <div className="flex-1 flex items-center space-x-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            autoFocus
          />
          <button
            onClick={handleSave}
            className="text-green-600 hover:text-green-700 p-1"
            title={t('save')}
          >
            <Save size={18} />
          </button>
          <button
            onClick={handleCancel}
            className="text-gray-600 hover:text-gray-700 p-1"
            title={t('cancel')}
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <>
          <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.text}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700 p-1"
            title={t('editTodo')}
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
            className="text-red-600 hover:text-red-700 p-1"
            title={t('deleteTodo')}
          >
            <Trash2 size={18} />
          </button>
        </>
      )}
    </div>
  );
};