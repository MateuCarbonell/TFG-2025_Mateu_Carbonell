import "./styles/globals.css"; // Asegúrate de que esta importación sea correcta
import { Roboto } from "next/font/google";

// Usando la fuente Roboto
const roboto = Roboto({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>Alt Bookings</title>
      </head>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
