export async function GET(request) {
  const { serviceType, location, priceRange } = await request.json();

  const services = await prisma.servicio.findMany({
    where: {
      tipoServicio: { contains: serviceType },
      ubicacion: { contains: location },
      precio: { lte: priceRange }, // less than or equal
    },
  });

  return new Response(JSON.stringify(services), { status: 200 });
}
