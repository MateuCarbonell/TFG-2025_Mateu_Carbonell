"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState(""); // Estado para email
  const [password, setPassword] = useState(""); // Estado para contraseña
  const [name, setName] = useState(""); // Estado para nombre
  const [userType, setUserType] = useState("cliente"); // Estado para tipo de usuario
  const [message, setMessage] = useState(""); // Estado para mensaje
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Llamar a la función de login del contexto
        // login(data.user); // Suponiendo que el backend devuelve los datos del usuario CON ESTO NO HACE LOGIN

        // Redirigir al dashboard (unificado)
        router.push("../dashboard");
      } else {
        setMessage(data.error || "Invalid credentials");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Actualizar el estado de 'name'
            required
          />
        </div>
        <div>
          <label>Tipo de usuario:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)} // Actualizar el estado de 'userType'
          >
            <option value="cliente">Usuario</option>
            <option value="proveedor">Proveedor</option>
          </select>
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
