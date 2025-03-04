import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los inventarios
export async function GET() {
  try {
    const payment = await prisma.payment.findMany();
    return NextResponse.json(payment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo los Pago", error }, { status: 500 });
  }
}

// Crear un nuevo inventario
export async function POST(req: NextRequest) {
  try {
    const { OrderID, PaymentMethodID, Amount } = await req.json();

    if ( !OrderID || !PaymentMethodID || Amount) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const payment = await prisma.payment.create({
      data: { 
        OrderID, PaymentMethodID, Amount, PaymentDate : new Date() },
    });

    return NextResponse.json({ message: "Pago creado con éxito", payment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creando el Pago", error }, { status: 500 });
  }
}
