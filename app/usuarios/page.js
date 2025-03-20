// src/app/usuarios/page.js
"use client"; // Directiva que marca este archivo como un componente del cliente
import { useEffect, useState } from "react";

export default function UsuariosPage() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch("/usuarios");
        if (!response.ok) {
          throw new Error("Error al obtener los servicios");
        }
        const data = await response.json();
        setServicios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Servicios</h1>
      <ul>
        {servicios.map((servicio) => (
          <li key={servicio.id_servicio}>
            <h3>{servicio.nombre_servicio}</h3>
            <p>{servicio.descripcion}</p>
            <p>Precio: {servicio.precio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
