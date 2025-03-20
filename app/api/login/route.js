// app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Inicio de sesión exitoso", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
