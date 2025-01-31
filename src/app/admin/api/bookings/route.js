import { ConnectDB } from "@/lib/ConnectDB";

export const GET = async () => {
    try {
        const db = await ConnectDB();
        const ordersCollection = db.collection("orders");
        const res = await ordersCollection.find().toArray();
        return new Response(JSON.stringify({ message: "Orders found", data: res }), { status: 200 });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
    }
};
