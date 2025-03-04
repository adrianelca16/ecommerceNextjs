import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los inventarios
export async function GET() {
  try {
    const viewedProduct = await prisma.viewedProduct.findMany();
    return NextResponse.json(viewedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo los Productos Vistos", error }, { status: 500 });
  }
}

// Crear un nuevo inventario
export async function POST(req: NextRequest) {
  try {
    const { UserID, ProductID } = await req.json();

    if (!ProductID || !UserID) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const viewedProduct = await prisma.viewedProduct.create({
      data: { 
        ProductID, UserID, ViewDate: new Date() },
    });

    return NextResponse.json({ message: "Inventario creado con éxito", viewedProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creando inventario", error }, { status: 500 });
  }
}
