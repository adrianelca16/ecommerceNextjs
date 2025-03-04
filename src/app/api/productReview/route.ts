import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los inventarios
export async function GET() {
  try {
    const productReview = await prisma.productReview.findMany();
    return NextResponse.json(productReview, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo los Comentarios de los Productos", error }, { status: 500 });
  }
}

// Crear un nuevo inventario
export async function POST(req: NextRequest) {
  try {
    const { UserID, ProductID, Qualification,Comment } = await req.json();

    if (!ProductID || !UserID || !Qualification || !Comment) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const productReview = await prisma.productReview.create({
      data: { 
        ProductID, UserID, Qualification, Comment, ReviewDate: new Date() },
    });

    return NextResponse.json({ message: "Comentario del Producto creado con éxito", productReview }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creando el Comentario del Producto", error }, { status: 500 });
  }
}
