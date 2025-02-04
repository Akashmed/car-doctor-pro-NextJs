import { ConnectDB } from "@/lib/ConnectDB";

export const GET = async () => {
    const db = await ConnectDB();
    const servicesCollection = db.collection("services");

    try {
        const services = await servicesCollection.find().toArray();

        return new Response(JSON.stringify({ services }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://car-doctor-pro-next-js-seven.vercel.app", // Allow your frontend
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Failed to fetch services" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://car-doctor-pro-next-js-seven.vercel.app",
            }
        });
    }
};
