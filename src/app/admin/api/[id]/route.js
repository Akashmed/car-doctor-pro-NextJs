import { ConnectDB } from "@/lib/ConnectDB";
import { ObjectId } from "mongodb";

export const PATCH = async (request, { params }) => {
    try {
        const { id } = await params;
        const info = await request.json();
        const db = await ConnectDB();
        const ordersCollection = db.collection("orders");

        // Ensure `id` is used as a query filter (assuming it is an ObjectId)
        const res = await ordersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: info.status } }
        );

        if (res.matchedCount === 0) {
            return new Response(JSON.stringify({ message: "Order not found" }), { status: 404 });
        }

        return new Response(
            JSON.stringify({ message: "Order confirmed", data: res }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in PATCH request:", error);
        return new Response(
            JSON.stringify({ message: "Something went wrong", error: error.message }),
            { status: 500 }
        );
    }
};
