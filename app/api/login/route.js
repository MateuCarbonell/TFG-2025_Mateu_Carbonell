// app/api/login/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Buscar el usuario por email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // Si el usuario no existe
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Verificar si la contraseña coincide (en texto claro)
    if (user.password !== password) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Devolver los datos del usuario, incluyendo el userType
    const userData = {
      id: user.id,
      email: user.email,
      userType: user.userType,
    };

    return new Response(JSON.stringify({ user: userData }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
