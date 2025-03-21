// src/context/UserContext.js
"use client";

import { createContext, useContext, useState } from "react";

// Crear el contexto
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Guardar los datos del usuario
  };

  const logout = () => {
    setUser(null); // Eliminar los datos del usuario
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto en otros componentes
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser utilizado dentro de un UserProvider");
  }
  return context;
};
