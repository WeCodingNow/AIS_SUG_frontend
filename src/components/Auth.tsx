import React from 'react';
import { useSelector } from '../store/store';
import { LOGGED_IN } from '../store/auth/types';

interface AuthProps {
  fallback?: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({fallback, children }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return <>{loggedIn === LOGGED_IN ? children : fallback}</>;
};

export default Auth;
