'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const page = () => {
    const [bookings, setBookings] = useState([]);
    const session = useSession();
    const email  = session?.data?.user?.email;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myBookings/api?email=${email}`);
                const data = await response.json();
                setBookings(data?.myBookings);
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [])
    console.log(bookings);
    return (
        <div className="w-full">
            <div className="overflow-x-auto container md:w-[90%] mx-auto bg-base-200 rounded-xl">
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
                            bookings.length > 0 && bookings.map((booking, indx) => (
                                <tr key={indx}>
                                    <th>{indx + 1}</th>
                                    <td>{booking?.first_name}</td>
                                    <td>{booking?.email}</td>
                                    <td>{booking?.message}</td>
                                    <td>{booking?.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default page;