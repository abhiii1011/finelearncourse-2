import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const signup = (email, password, username) => {
    const exists = users.some(user => user.email === email);
    if (exists) {
      return { success: false, message: "Email already registered" };
    }

    const newUser = { username, email, password };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, message: "Account created successfully" };
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true, message: "Login successful" };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setCurrentUser(null);
  };
// Inside AuthProvider (below logout)
const enrollCourse = (course) => {
  if (!currentUser) return;

  const updatedUser = {
    ...currentUser,
    enrolledCourses: [...(currentUser.enrolledCourses || []), course],
  };

  setCurrentUser(updatedUser);

  const updatedUsers = users.map((user) =>
    user.email === currentUser.email ? updatedUser : user
  );

  setUsers(updatedUsers);
};

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
