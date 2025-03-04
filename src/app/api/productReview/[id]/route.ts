import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener un inventario por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productReview = await prisma.productReview.findUnique({ where: { ReviewID: params.id } });

    if (!productReview) {
      return NextResponse.json({ message: "Comentario del Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(productReview, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo el Comentario del Producto", error }, { status: 500 });
  }
}

// Actualizar un inventario por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const {UserID, ProductID, Qualification,Comment } = await req.json();

    const updatedProductReview = await prisma.productReview.update({
      where: { ReviewID: params.id },
      data: {UserID, ProductID , Qualification, Comment , ReviewDate: new Date() },
    });

    return NextResponse.json({ message: "Comentario actualizado con éxito", updatedProductReview }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error actualizando el Comentario", error }, { status: 500 });
  }
}

// Eliminar un inventario por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.productReview.delete({ where: { ReviewID: params.id } });
    return NextResponse.json({ message: "Comentario eliminado con éxito" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error eliminando el Comentario", error }, { status: 500 });
  }
}
