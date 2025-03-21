// app/api/login/route.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Archivo de API de Usuarios

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
