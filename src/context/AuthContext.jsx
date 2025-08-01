import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user session
    const timer = setTimeout(() => {
      const mockUser = localStorage.getItem('user');
      setUser(mockUser ? JSON.parse(mockUser) : null);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const login = (credentials) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: 1,
          email: credentials.email,
          role: credentials.email.includes('admin') ? 'admin' : 'student',
          name: credentials.email.split('@')[0]
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(mockUser);
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);