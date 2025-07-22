'use client';

import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { AppContext } from '@/contexts/AppContext';
import { LogOut, User, Globe, Moon, Sun } from 'lucide-react';

export const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const { state, dispatch, t } = useContext(AppContext);

  return (
    <header className={`${state.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-sm border-b`}>
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('appTitle')}</h1>
        
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <select
            value={state.locale}
            onChange={(e) => dispatch({ type: 'SET_LOCALE', payload: e.target.value as any })}
            className={`px-3 py-1 rounded border ${
              state.theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="hi">Hindi</option>
          </select>

          {/* Theme Toggle */}
          <button
            onClick={() => dispatch({ 
              type: 'SET_THEME', 
              payload: state.theme === 'light' ? 'dark' : 'light' 
            })}
            className={`p-2 rounded-full ${
              state.theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            title={state.theme === 'light' ? t('darkMode') : t('lightMode')}
          >
            {state.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <User size={20} />
            <span className="text-sm">{auth.user?.name}</span>
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-700 p-2"
              title={t('logout')}
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};