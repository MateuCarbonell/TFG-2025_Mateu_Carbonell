// src/app/page.js
"use client"; // Asegúrate de usar esto en el archivo de cliente

import { UserProvider } from "./context/UserContext"; // Importa el UserProvider

export default function Page({ children }) {
  return (
    <UserProvider>
      {children}{" "}
      {/* Esto envuelve todo el contenido de la página con el UserProvider */}
    </UserProvider>
  );
}
