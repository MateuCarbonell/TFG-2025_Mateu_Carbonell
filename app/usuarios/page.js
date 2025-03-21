"use client";

import { useEffect, useState } from "react";

// Componente para mostrar los usuarios
export default function UsuariosPage() {
  const [users, setUsers] = useState([]);

  // Obtener los datos de la API
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/usuarios");
      const data = await response.json();
      setUsers(data);
    }

    fetchUsers();
  }, []); // sin condicion el useEffect ya que solo se ejecuta una vez

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
