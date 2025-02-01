import { ConnectDB } from "@/lib/ConnectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url); //way of getting query param
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const db = await ConnectDB();
        const orderCollection = db.collection("orders");
        const myBookings = await orderCollection.find({ email }).toArray();

        return NextResponse.json({ myBookings }, { status: 200 });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
};
