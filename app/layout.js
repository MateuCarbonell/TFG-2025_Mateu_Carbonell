// src/app/layout.js

import { UserProvider } from "./context/UserContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
