export default function ServicesLayout({ children }) {
  return (
    <div>
      <h1>Servicios</h1>
      <nav>
        <ul>
          <li>
            <a href="/services/service1">Servicio 1</a>
          </li>
          <li>
            <a href="/services/service2">Servicio 2</a>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
}
