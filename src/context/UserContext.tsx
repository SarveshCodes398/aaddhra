import React, { createContext, useContext, useState, useEffect } from "react";

export type Role = "worker" | "client" | null;
export type Country = "India" | "USA" | "UK" | "UAE" | "Singapore";

interface User {
  email: string;
  role: Role;
  country: Country;
  name?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("aaddhra_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const setUser = (u: User | null) => {
    setUserState(u);
    if (u) localStorage.setItem("aaddhra_user", JSON.stringify(u));
    else localStorage.removeItem("aaddhra_user");
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, logout, isAuthenticated: !!user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
