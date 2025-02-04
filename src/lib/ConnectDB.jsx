import { MongoClient, ServerApiVersion } from "mongodb";

let client;
let db;

export const ConnectDB = async () => {
    if (db) return db; // Return existing connection

    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MongoDB connection URI is missing!");
        }

        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        await client.connect(); // Ensure the client is properly connected
        db = client.db("carDoctorPro");
        return db;
    } catch (error) {
        throw new Error("Database connection failed");
    }
};
