import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los inventarios
export async function GET() {
  try {
    const inventories = await prisma.inventory.findMany();
    return NextResponse.json(inventories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo los inventarios", error }, { status: 500 });
  }
}

// Crear un nuevo inventario
export async function POST(req: NextRequest) {
  try {
    const { ProductID, InitialStock, Entries, Exits, EndStock, UpdateDate } = await req.json();

    if (!ProductID || InitialStock === undefined || Entries === undefined || Exits === undefined || EndStock === undefined || !UpdateDate) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const inventory = await prisma.inventory.create({
      data: { ProductID, InitialStock, Entries, Exits, EndStock, UpdateDate: new Date(UpdateDate) },
    });

    return NextResponse.json({ message: "Inventario creado con éxito", inventory }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creando inventario", error }, { status: 500 });
  }
}
