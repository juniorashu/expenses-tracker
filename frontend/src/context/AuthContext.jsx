import { createContext, useContext } from 'react';
import { getAuth } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth(); // initialized elsewhere
  return <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
