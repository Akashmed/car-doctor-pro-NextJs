"use client";
import { useEffect, useState } from "react";

const AllBookings = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:3000/admin/api/bookings");
                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await response.json();
                setOrders(data?.data); // Save fetched data to state
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []); // Dependency array ensures this runs once

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/api/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Approved' }),
            });

            if (!response.ok) {
                throw new Error('Failed to update the status');
            }

            const updatedData = await response.json();
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === id ? { ...order, status: "Approved" } : order
                )
            );
        } catch (error) {
            console.error("Error approving the order:", error.message);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody className="text-black">
                    {/* row 1 */}
                    {
                        orders.length > 0 && orders.map((order, indx) => (
                            <tr key={indx}>
                                <th>{indx + 1}</th>
                                <td>{order?.first_name}</td>
                                <td>{order?.email}</td>
                                <td>{order?.message}</td>
                                <td>{order?.status === 'pending' ? <button onClick={() => handleApprove(order._id)} className="btn btn-primary">Approve</button> : <span className="text-green-700 font-serif">Approved</span>}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllBookings;
