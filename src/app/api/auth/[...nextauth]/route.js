import { ConnectDB } from "@/lib/ConnectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
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
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    pages: {
        signIn: "/login", // Custom login page
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === 'google' || account.provider === 'github') {
                const { email, name, image } = user
                try {
                    const db = await ConnectDB();
                    const usersCollection = db.collection('users');
                    const userExists = await usersCollection.findOne({ email })
                    if (userExists) {
                        return user;
                    } else {
                        const res = await usersCollection.insertOne(user);
                        return res;
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                return user;
            }
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
