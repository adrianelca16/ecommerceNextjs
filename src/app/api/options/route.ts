import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las categorías
export async function GET() {
  try {
    const options = await prisma.option.findMany();
    return NextResponse.json(options, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al obtener las opciones" }, { status: 500 });
  }
}

// Crear una nueva categoría
export async function POST(req: NextRequest) {
  try {
    const { Name, ProductID } = await req.json();
    if (!Name || !ProductID) {
      return NextResponse.json({ message: "Los campos son obligatorios" }, { status: 400 });
    }

    const option = await prisma.option.create({
      data: {
        Name,
        ProductID,
      },
    });

    return NextResponse.json({ message: "Opcion creada con éxito", option }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al crear la opcion" }, { status: 500 });
  }
}
