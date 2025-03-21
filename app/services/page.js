"use client";

import { useState } from "react";

export default function SearchServices() {
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/services", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceType,
        location,
        priceRange,
      }),
    });
    const data = await response.json();
    // Muestra los servicios disponibles
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
        placeholder="Tipo de servicio"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Ubicación"
      />
      <input
        type="text"
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        placeholder="Rango de precio"
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
