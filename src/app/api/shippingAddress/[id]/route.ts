import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener un inventario por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const shippingAddress = await prisma.shippingAddress.findUnique({ where: { AddressID: params.id } });

    if (!shippingAddress) {
      return NextResponse.json({ message: "Direccion no encontrada" }, { status: 404 });
    }

    return NextResponse.json(shippingAddress, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo la Direccion", error }, { status: 500 });
  }
}

// Actualizar un inventario por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const {UserID, Address, City,State, ZipCode, Country } = await req.json();

    const updatedShippingAddress = await prisma.shippingAddress.update({
      where: { AddressID: params.id },
      data: {UserID, Address, City,State, ZipCode, Country},
    });

    return NextResponse.json({ message: "Direccion actualizada con éxito", updatedShippingAddress }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error actualizando la Direccion", error }, { status: 500 });
  }
}

// Eliminar un inventario por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.shippingAddress.delete({ where: { AddressID: params.id } });
    return NextResponse.json({ message: "Direccion eliminada con éxito" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error eliminando la Direccion", error }, { status: 500 });
  }
}
