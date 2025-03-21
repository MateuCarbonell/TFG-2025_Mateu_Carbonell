// src/app/dashboard/page.js
"use client";

import { useRouter } from "next/navigation"; // Importar el hook useRouter
import { useUser } from "../context/UserContext"; // Importar el hook para acceder al contexto

export default function Dashboard() {
  const { user } = useUser(); // Acceder a los datos del usuario
  const router = useRouter(); // Usar el hook useRouter

  // Verificar si los datos del usuario existen
  console.log("Datos del usuario:", user);

  if (!user) {
    console.log("No hay usuario, redirigiendo...");
    router.push("/login"); // Redirigir al login si el usuario no está autenticado
    return <div>Loading...</div>; // Puedes agregar un estado de carga si es necesario
  }

  console.log("Usuario autenticado, mostrando dashboard...");

  return (
    <div>
      <h1>Dashboard</h1>
      {user.userType === "cliente" ? (
        <div>
          <h2>Bienvenido, Cliente</h2>
          <h1>Dashboard Cliente</h1>
        </div>
      ) : user.userType === "proveedor" ? (
        <div>
          <h2>Bienvenido, Proveedor</h2>
          <h1>Dashboard Proveedor</h1>
          {/* Contenido específico para el proveedor */}
        </div>
      ) : (
        <div>Tipo de usuario desconocido</div>
      )}
    </div>
  );
}
