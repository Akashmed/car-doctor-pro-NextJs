import { ConnectDB } from "@/lib/ConnectDB";

export const POST = async (request) => {
    try {
        const info = await request.json();
        const db = await ConnectDB();
        const ordersCollection = db.collection('orders');
        const res = await ordersCollection.insertOne({...info, status:'pending'});
        return new Response(JSON.stringify({ message: 'Order booked for response', data: res }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringfy({ message: 'something went wrong' }), { status: 404 })
    }
}