import { ConnectDB } from "@/lib/ConnectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

export const authOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
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
                    const usersCollection = db.collection("users");
                    const currentUser = await usersCollection.findOne({ email });

                    if (!currentUser) {
                        throw new Error("User not found");
                    }

                    const matchedPass = bcrypt.compareSync(password, currentUser.password);
                    if (!matchedPass) {
                        throw new Error("Invalid credentials");
                    }

                    return { ...currentUser, id: currentUser._id.toString() }; // Ensure ID is string
                } catch (error) {
                    console.error("Authorize Error:", error);
                    throw new Error("Authentication failed");
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    pages: {
        signIn: "/login", // Custom login page
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google" || account.provider === "github") {
                try {
                    const db = await ConnectDB();
                    const usersCollection = db.collection("users");

                    const existingUser = await usersCollection.findOne({ email: user.email });

                    if (!existingUser) {
                        const newUser = {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            type: "oauth",
                            createdAt: new Date(),
                        };

                        await usersCollection.insertOne(newUser);
                    }
                    return true;
                } catch (error) {
                    console.error("Sign-in Error:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, account, user }) {
            if (user) {
                token.type = user?.type || "default"; // Ensure type is set
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.type = token.type;
                session.user.id = token.id;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
