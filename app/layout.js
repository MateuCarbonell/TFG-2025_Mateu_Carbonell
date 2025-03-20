// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header>
          <h1>Mi Aplicación Next.js</h1>
          <nav>
            <ul>
              <li>
                <a href="/">Inicio</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2023 Mi Aplicación</p>
        </footer>
      </body>
    </html>
  );
}
