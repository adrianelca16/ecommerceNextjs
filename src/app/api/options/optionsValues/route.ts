import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las categorías
export async function GET() {
  try {
    const optionsValues = await prisma.optionValue.findMany();
    return NextResponse.json(optionsValues, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al obtener los Valores de als Opciones" }, { status: 500 });
  }
}

// Crear una nueva categoría
export async function POST(req: NextRequest) {
  try {
    const { OptionID, Value } = await req.json();
    if (!OptionID || !Value ) {
      return NextResponse.json({ message: "Los campos son obligatorios" }, { status: 400 });
    }

    const optionValues = await prisma.optionValue.create({
      data: {
        OptionID,
        Value,
        CreationDate: new Date()
      },
    });

    return NextResponse.json({ message: "Valores de la Opcion creado con éxito", optionValues }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al crear los Valors de la Opcion" }, { status: 500 });
  }
}
