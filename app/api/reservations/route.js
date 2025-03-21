// app/api/services/route.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { type, location, price, availability } = await request.json();

    const services = await prisma.service.findMany({
      where: {
        AND: [
          type ? { type: { contains: type, mode: "insensitive" } } : {},
          location
            ? { location: { contains: location, mode: "insensitive" } }
            : {},
          price ? { price: { lte: price } } : {},
          availability
            ? { availability: { contains: availability, mode: "insensitive" } }
            : {},
        ],
      },
    });

    return new Response(JSON.stringify(services), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
