import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los inventarios
export async function GET() {
  try {
    const paymentMethod = await prisma.paymentMethod.findMany();
    return NextResponse.json(paymentMethod, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo los Metodos de Pagos", error }, { status: 500 });
  }
}

// Crear un nuevo inventario
export async function POST(req: NextRequest) {
  try {
    const { Name, Description } = await req.json();

    if ( !Name || !Description ) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const paymentMethod = await prisma.paymentMethod.create({
      data: { 
        Name, Description},
    });

    return NextResponse.json({ message: "Metodo de Pago creado con éxito", paymentMethod }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creando el Comentario del Producto", error }, { status: 500 });
  }
}
