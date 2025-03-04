import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener una categoría por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const optionValues = await prisma.optionValue.findUnique({ where: { ValueID: id } });

    if (!optionValues) {
      return NextResponse.json({ message: "Valores de la Opcion no encontrada" }, { status: 404 });
    }

    return NextResponse.json(optionValues, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al obtener los Valores de la Opcion" }, { status: 500 });
  }
}

// Actualizar una categoría por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const {Value, OptionID} = await req.json();

    const updatedOptionValue = await prisma.optionValue.update({
      where: { ValueID: id },
      data: { Value, OptionID },
    });

    return NextResponse.json({ message: "Valores de la Opcion actualizada con éxito", updatedOptionValue }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al actualizar los Valores de la Opcion" }, { status: 500 });
  }
}

// Eliminar una categoría por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    await prisma.optionValue.delete({ where: { ValueID: id } });

    return NextResponse.json({ message: "Los Valores de la Opcion eliminados con éxito" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al eliminar los Valores de la Opcion" }, { status: 500 });
  }
}
