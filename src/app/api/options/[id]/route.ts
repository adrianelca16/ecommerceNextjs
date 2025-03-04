import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener una categoría por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const option = await prisma.option.findUnique({ where: { OptionID: id } });

    if (!option) {
      return NextResponse.json({ message: "Opcion no encontrada" }, { status: 404 });
    }

    return NextResponse.json(option, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al obtener la Opcion" }, { status: 500 });
  }
}

// Actualizar una categoría por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const {Name, ProductID} = await req.json();

    const updatedOption = await prisma.option.update({
      where: { OptionID: id },
      data: { Name, ProductID },
    });

    return NextResponse.json({ message: "Opcion actualizada con éxito", updatedOption }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al actualizar la opcion" }, { status: 500 });
  }
}

// Eliminar una categoría por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    await prisma.option.delete({ where: { OptionID: id } });

    return NextResponse.json({ message: "Opcion eliminada con éxito" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al eliminar la opcion" }, { status: 500 });
  }
}
