import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las categorías
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al obtener categorías" }, { status: 500 });
  }
}

// Crear una nueva categoría
export async function POST(req: NextRequest) {
  try {
    const { Name, Description } = await req.json();

    if (!Name) {
      return NextResponse.json({ message: "El nombre es obligatorio" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        Name,
        Description,
      },
    });

    return NextResponse.json({ message: "Categoría creada con éxito", category }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al crear la categoría" }, { status: 500 });
  }
}
