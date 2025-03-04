import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener una categoría por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const category = await prisma.category.findUnique({ where: { CategoryID: id } });

    if (!category) {
      return NextResponse.json({ message: "Categoría no encontrada" }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al obtener la categoría" }, { status: 500 });
  }
}

// Actualizar una categoría por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { Name, Description } = await req.json();

    const updatedCategory = await prisma.category.update({
      where: { CategoryID: id },
      data: { Name, Description },
    });

    return NextResponse.json({ message: "Categoría actualizada con éxito", updatedCategory }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al actualizar la categoría" }, { status: 500 });
  }
}

// Eliminar una categoría por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    await prisma.category.delete({ where: { CategoryID: id } });

    return NextResponse.json({ message: "Categoría eliminada con éxito" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al eliminar la categoría" }, { status: 500 });
  }
}
