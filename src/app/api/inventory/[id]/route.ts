import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener un inventario por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const inventory = await prisma.inventory.findUnique({ where: { InventoryID: params.id } });

    if (!inventory) {
      return NextResponse.json({ message: "Inventario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(inventory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo el inventario", error }, { status: 500 });
  }
}

// Actualizar un inventario por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { InitialStock, Entries, Exits, EndStock, UpdateDate } = await req.json();

    const updatedInventory = await prisma.inventory.update({
      where: { InventoryID: params.id },
      data: { InitialStock, Entries, Exits, EndStock, UpdateDate: new Date(UpdateDate) },
    });

    return NextResponse.json({ message: "Inventario actualizado con éxito", updatedInventory }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error actualizando el inventario", error }, { status: 500 });
  }
}

// Eliminar un inventario por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.inventory.delete({ where: { InventoryID: params.id } });
    return NextResponse.json({ message: "Inventario eliminado con éxito" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error eliminando el inventario", error }, { status: 500 });
  }
}
