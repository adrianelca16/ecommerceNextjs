import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Crear un usuario
export async function POST(req: NextRequest) {
  try {
    const { Name, Email, Password, Phone, Address, RolID } = await req.json();

    if (!Name || !Email || !Password || !Phone || !Address || !RolID) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const userExists = await prisma.user.findUnique({ where: { Email } });
    if (userExists) {
      return NextResponse.json({ message: "El email ya está registrado" }, { status: 400 });
    }

    const rolExists = await prisma.rol.findUnique({ where: { RolID } });
    if (!rolExists) {
      return NextResponse.json({ message: "El rol especificado no existe" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await prisma.user.create({
      data: {
        Name,
        Email,
        Password: hashedPassword,
        Phone,
        Address,
        RolID,
        RegisterDate: new Date(),
      },
    });

    return NextResponse.json({ message: "Usuario registrado con éxito", user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en el servidor", error }, { status: 500 });
  }
}

// Obtener todos los usuarios
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { rol: true }, // Incluir datos del rol
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en el servidor", error }, { status: 500 });
  }
}
