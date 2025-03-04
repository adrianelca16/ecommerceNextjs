import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los inventarios
export async function GET() {
  try {
    const coupon = await prisma.coupon.findMany();
    return NextResponse.json(coupon, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo los Cupones", error }, { status: 500 });
  }
}

// Crear un nuevo inventario
export async function POST(req: NextRequest) {
  try {
    const { Code, Description, Discount,StartDate, EndDate, MinimumPurchase } = await req.json();

    if (!Code || !Description || !Discount || !StartDate || !EndDate|| !MinimumPurchase ) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const coupon = await prisma.coupon.create({
      data: { 
        Code, Description, Discount, StartDate, EndDate, MinimumPurchase },
    });

    return NextResponse.json({ message: "Cupon creado con éxito", coupon }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creando el Cupon", error }, { status: 500 });
  }
}
