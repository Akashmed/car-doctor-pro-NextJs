import { MongoClient, ServerApiVersion } from "mongodb";

let db;

export const ConnectDB = () => {
    if (db) return db;
    try {
        const uri = process.env.MONGO_URI
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        db = client.db('carDoctorPro')
        return db;
    } catch (error) {
        console.log(error)
    }
}