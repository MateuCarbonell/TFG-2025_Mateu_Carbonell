import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Si decides usar bcrypt para encriptar las contraseñas

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Buscar al usuario por su email
    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 400,
      });
    }

    // Verificar la contraseña (si usas bcrypt para encriptar la contraseña)
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 400,
      });
    }

    // Redirigir según el tipo de usuario
    const userType = user.userType;

    // Redirigir a la URL según el tipo de usuario
    if (userType === "proveedor") {
      return new Response(
        JSON.stringify({ redirectTo: "/proveedor/dashboard" }),
        { status: 200 }
      );
    } else if (userType === "cliente") {
      return new Response(
        JSON.stringify({ redirectTo: "/cliente/dashboard" }),
        { status: 200 }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error during login" }), {
      status: 500,
    });
  }
}
