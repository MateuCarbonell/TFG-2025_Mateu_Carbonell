import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { name, email, password, userType } = await request.json();

    // Validación de userType
    if (userType !== "proveedor" && userType !== "cliente") {
      return new Response(
        JSON.stringify({
          error: "Invalid user type. Must be 'proveedor' or 'cliente'",
        }),
        { status: 400 }
      );
    }

    // Comprobar si el email ya está en uso
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already registered" }),
        { status: 400 }
      );
    }

    // Crear el nuevo usuario
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        userType,
      },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
