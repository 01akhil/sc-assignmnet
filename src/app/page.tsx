'use client';

import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { TodoList } from '@/components/todo/TodoList';
import { LoadingScreen } from '@/components/common/LoadingScreen';

export default function Home() {
  const { auth } = useContext(AuthContext);

  if (auth.isLoading) {
    return <LoadingScreen />;
  }

  if (!auth.isAuthenticated) {
    return <LoginForm />;
  }

  return <TodoList />;
}