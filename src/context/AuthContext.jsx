import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('ec_current_user');
    return u ? JSON.parse(u) : null;
  });

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('ec_users') || '[]');
    if (users.find((u) => u.email === email)) return { error: 'Email already registered.' };
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem('ec_users', JSON.stringify(users));
    const { password: _, ...safe } = newUser;
    setUser(safe);
    localStorage.setItem('ec_current_user', JSON.stringify(safe));
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('ec_users') || '[]');
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { error: 'Invalid email or password.' };
    const { password: _, ...safe } = found;
    setUser(safe);
    localStorage.setItem('ec_current_user', JSON.stringify(safe));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ec_current_user');
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);