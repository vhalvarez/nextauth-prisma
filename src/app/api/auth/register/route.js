import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db";

export async function POST(request) {
    try {
        const { email, password, username } = await request.json();

        const emailFound = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (emailFound) {
            return NextResponse.json(
                {
                    message: "Email already exists",
                },
                {
                    status: 400,
                }
            );
        }

        const userFound = await db.user.findUnique({
            where: {
                username,
            },
        });

        if (userFound) {
            return NextResponse.json(
                {
                    message: "User already exists",
                },
                {
                    status: 400,
                }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                username,
            },
        });

        const { password: _, ...user } = newUser;

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}
