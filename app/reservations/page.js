// app/reservations/page.js
"use client";
import { useState, useEffect } from "react";

export default function ReservationsPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [reservationDate, setReservationDate] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch("/api/services");
      const data = await response.json();
      setServices(data);
    };

    fetchServices();
  }, []);

  const handleReservationSubmit = async () => {
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: selectedService.id,
        reservationDate,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Reserva realizada con éxito");
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      <h1>Reservar un Servicio</h1>
      <select onChange={(e) => setSelectedService(JSON.parse(e.target.value))}>
        <option value="">Selecciona un servicio</option>
        {services.map((service) => (
          <option key={service.id} value={JSON.stringify(service)}>
            {service.type} - {service.location}
          </option>
        ))}
      </select>
      {selectedService && (
        <>
          <input
            type="datetime-local"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
          />
          <button onClick={handleReservationSubmit}>Realizar Reserva</button>
        </>
      )}
    </div>
  );
}
