import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 🔹 GET: Obtener todos los productos
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json({ message: "Error en el servidor", error }, { status: 500 });
  }
}

// 🔹 POST: Crear un nuevo producto
export async function POST(req: NextRequest) {
  try {
    const { name, price, description, stock } = await req.json();

    if (!name || !price || !description || !stock ) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: { name, price, description, stock },
    });

    return NextResponse.json({ message: "Producto creado con éxito", product }, { status: 201 });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return NextResponse.json({ message: "Error en el servidor", error }, { status: 500 });
  }
}
