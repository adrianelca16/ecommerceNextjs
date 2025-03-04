import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Crear un nuevo rol
export async function POST(req: NextRequest) {
  try {
    const { Name } = await req.json();

    if (!Name) {
      return NextResponse.json({ message: "El nombre del rol es obligatorio" }, { status: 400 });
    }

    const roleExists = await prisma.rol.findUnique({ where: { Name } });

    if (roleExists) {
      return NextResponse.json({ message: "El rol ya existe" }, { status: 400 });
    }

    const role = await prisma.rol.create({ data: { Name } });

    return NextResponse.json({ message: "Rol creado con éxito", role }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en el servidor", error }, { status: 500 });
  }
}

// Obtener todos los roles
export async function GET() {
  try {
    const roles = await prisma.rol.findMany();
    return NextResponse.json({ roles }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en el servidor", error }, { status: 500 });
  }
}
