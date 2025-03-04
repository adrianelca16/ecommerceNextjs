import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener un inventario por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const viewedProduct = await prisma.viewedProduct.findUnique({ where: { ViewedID: params.id } });

    if (!viewedProduct) {
      return NextResponse.json({ message: "Producto Visto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(viewedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo el Producto Visto", error }, { status: 500 });
  }
}

// Actualizar un inventario por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const {UserID, ProductID } = await req.json();

    const updatedViewedProduct = await prisma.viewedProduct.update({
      where: { ViewedID: params.id },
      data: {UserID, ProductID , ViewDate: new Date() },
    });

    return NextResponse.json({ message: "Producto Visto actualizado con éxito", updatedViewedProduct }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error actualizando el inventario", error }, { status: 500 });
  }
}

// Eliminar un inventario por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.viewedProduct.delete({ where: { ViewedID: params.id } });
    return NextResponse.json({ message: "Producto Visto eliminado con éxito" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error eliminando el Producto Visto", error }, { status: 500 });
  }
}
