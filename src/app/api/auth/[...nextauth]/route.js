import { ConnectDB } from "@/lib/ConnectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                if (!email || !password) {
                    throw new Error("Email and password are required");
                }

                try {
                    const db = await ConnectDB();
                    const currentUser = await db.collection("users").findOne({ email });

                    if (!currentUser) {
                        throw new Error("User not found");
                    }

                    const matchedPass = bcrypt.compareSync(password, currentUser.password);
                    if (!matchedPass) {
                        throw new Error("Invalid credentials");
                    }

                    return currentUser;
                } catch (error) {
                    console.error("Authorize Error:", error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/login", // Custom login page
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
