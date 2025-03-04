import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "tu_secreto_super_seguro"; // Usa variables de entorno

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { Email, Password } = body;

    if (!Email || !Password) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { Email } });

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
    }

    // Generar token JWT
    const token = jwt.sign({ userId: user.UserID, email: user.Email }, SECRET_KEY, {
      expiresIn: "7d", // Expira en 7 días
    });

    return NextResponse.json(
      {
        message: "Login exitoso",
        token,
        user: { id: user.UserID, name: user.Name, email: user.Email },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en el servidor", error }, { status: 500 });
  }
}
