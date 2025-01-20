


import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AuthReducer from '../reducer/AuthReducer';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  
  const initialState = {
    isAuthenticated: false,
    user: null,
  };

  
  const storedUser = localStorage.getItem('user');
  const storedAuthState = localStorage.getItem('isAuthenticated');

  
  if (storedUser && storedAuthState === 'true') {
    initialState.isAuthenticated = true;
    initialState.user = JSON.parse(storedUser);
  }

  
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  
  const login = (user) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN', payLoad: user });
  };

  
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  
  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    }
  }, [state.isAuthenticated, state.user]);

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
