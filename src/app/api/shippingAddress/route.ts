import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los inventarios
export async function GET() {
  try {
    const shippingAddress = await prisma.shippingAddress.findMany();
    return NextResponse.json(shippingAddress, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo las direcciones de las Tiendas", error }, { status: 500 });
  }
}

// Crear un nuevo inventario
export async function POST(req: NextRequest) {
  try {
    const { UserID, Address, City,State, ZipCode, Country } = await req.json();

    if (!Address || !UserID || !City || !State || !ZipCode || !Country){
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const shippingAddress = await prisma.shippingAddress.create({
      data: { 
        Address, UserID, City, State,ZipCode, Country },
    });

    return NextResponse.json({ message: "Direccion creada con éxito", shippingAddress }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creando la Direccion", error }, { status: 500 });
  }
}
