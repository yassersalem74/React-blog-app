import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state for login status and current user
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [currentUserId, setCurrentUserId] = useState(() => {
    const storedUserId = localStorage.getItem('currentUserId');
    return storedUserId ? JSON.parse(storedUserId) : null;
  });

  // Update local storage whenever login status changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // Update local storage whenever current user changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('currentUserId', JSON.stringify(currentUser.id));
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserId');
    }
  }, [currentUser]);

  // Function to handle login process to get currentUser
  const login = (user) => {
    if (user) {
      setCurrentUser(user);
      setCurrentUserId(user.id);
      setIsLoggedIn(true);
    } else {
      alert("Invalid email or password");
    }
  };

  // Function to handle logout process to remove currentUser and isLogged in from localStorage
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserId');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentUserId(null);
  };

  // Provide the context values to children components
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, currentUser, currentUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

// Validate props
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};