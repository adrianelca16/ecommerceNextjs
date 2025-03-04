import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener un inventario por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const coupon = await prisma.coupon.findUnique({ where: { CouponID: params.id } });

    if (!coupon) {
      return NextResponse.json({ message: "Cupon no encontrado" }, { status: 404 });
    }

    return NextResponse.json(coupon, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo el Cupon", error }, { status: 500 });
  }
}

// Actualizar un inventario por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const {Code, Description, Discount,StartDate, EndDate, MinimumPurchase} = await req.json();

    const coupon = await prisma.coupon.update({
      where: { CouponID: params.id },
      data: {Code, Description, Discount, StartDate, EndDate, MinimumPurchase  },
    });

    return NextResponse.json({ message: "Cupon actualizado con éxito", coupon }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error actualizando el Cupon", error }, { status: 500 });
  }
}

// Eliminar un inventario por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.coupon.delete({ where: { CouponID: params.id } });
    return NextResponse.json({ message: "Cupon eliminado con éxito" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error eliminando el Cupon", error }, { status: 500 });
  }
}
