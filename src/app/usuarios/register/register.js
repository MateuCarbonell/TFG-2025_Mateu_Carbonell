'use client'; // Esto indica que el código se ejecuta en el cliente

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('cliente'); // 'cliente' o 'proveedor'
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

    // Validar que todos los campos estén completos
    if (!name || !email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const response = await fetch('/usuarios/register', {
      method: 'POST', // Realizar una solicitud POST
      body: JSON.stringify({ name, email, password, userType }),
      headers: {
        'Content-Type': 'application/json', // Indicar que estamos enviando datos JSON
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Si el registro es exitoso, redirigir a la página de login
      router.push('/login');
    } else {
      // Si ocurre un error, mostrar el mensaje de error
      setError(data.error || 'Algo salió mal');
    }
  };

  return (
    <div>
      <h2>Registrar Usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="userType">Tipo de Usuario</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="cliente">Cliente</option>
            <option value="proveedor">Proveedor</option>
          </select>
        </div>

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterForm;
