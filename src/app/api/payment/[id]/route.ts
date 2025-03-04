import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener un inventario por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payment = await prisma.payment.findUnique({ where: { PaymentID: params.id } });

    if (!payment) {
      return NextResponse.json({ message: "Pago no encontrado" }, { status: 404 });
    }

    return NextResponse.json(payment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo el Pago", error }, { status: 500 });
  }
}

// Actualizar un inventario por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { OrderID, PaymentMethodID, Amount} = await req.json();

    const updatedPayment = await prisma.payment.update({
      where: { PaymentID: params.id },
      data: {OrderID, PaymentMethodID, Amount, PaymentDate: new Date()},
    });

    return NextResponse.json({ message: "Pago actualizado con éxito", updatedPayment }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error actualizando el Pago", error }, { status: 500 });
  }
}

// Eliminar un inventario por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.payment.delete({ where: { PaymentID: params.id } });
    return NextResponse.json({ message: "Pago eliminado con éxito" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error eliminando el Pago", error }, { status: 500 });
  }
}
