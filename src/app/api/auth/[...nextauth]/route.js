import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import bcrypt from "bcrypt";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "alvarez3197@gmail.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!userFound) throw new Error('No user found');

                const matchPassword = await bcrypt.compare(
                    credentials.password,
                    userFound.password
                );

                if (!matchPassword) throw new Error('Wrong password');

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
        signOut: '/',
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
