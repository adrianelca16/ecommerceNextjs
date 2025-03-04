import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener un inventario por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const paymentMethod = await prisma.paymentMethod.findUnique({ where: { PaymentMethodID: params.id } });

    if (!paymentMethod) {
      return NextResponse.json({ message: "Metodo de Pago no encontrado" }, { status: 404 });
    }

    return NextResponse.json(paymentMethod, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo el Metodo de Pago", error }, { status: 500 });
  }
}

// Actualizar un inventario por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { Name, Description } = await req.json();

    const updatedMethodPayment = await prisma.paymentMethod.update({
      where: { PaymentMethodID: params.id },
      data: {Name, Description},
    });

    return NextResponse.json({ message: "Metodo de Pago actualizado con éxito", updatedMethodPayment }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error actualizando el Metodo de Pago", error }, { status: 500 });
  }
}

// Eliminar un inventario por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.paymentMethod.delete({ where: { PaymentMethodID: params.id } });
    return NextResponse.json({ message: "Metod de pago eliminado con éxito" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error eliminando el Metodo de Pago", error }, { status: 500 });
  }
}
